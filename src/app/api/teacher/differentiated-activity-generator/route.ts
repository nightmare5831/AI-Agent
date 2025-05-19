import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { join } from 'path';
import {
  mkdirSync,
  writeFileSync,
  writeFile,
  readFileSync,
  unlinkSync,
} from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';
import pdf from 'pdf-extraction';
import os from 'os';
import { log } from 'console';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const languageMap: { [key: string]: string } = {
  de: 'German',
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
};

async function extractTextWithOpenAI(
  fileBuffer: Buffer,
  fileType: string
): Promise<string> {
  // Convert file to base64
  const base64File = fileBuffer.toString('base64');
  console.log('called!');

  // Determine the appropriate content type for the base64 data
  let contentTypePrefix = '';
  if (fileType.includes('image')) {
    contentTypePrefix = `data:${fileType};base64,`;
  } else {
    // For PDFs, we'll try to render the first page as an image
    // This is a fallback that might work for some PDFs but not all
    contentTypePrefix = 'data:application/pdf;base64,';
  }

  // Use OpenAI's gpt-4o model to extract text
  const textExtractionResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content:
          'You are a document text extractor. Extract all text content from the provided document or image, preserving the formatting as much as possible.',
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Extract all text from this document/image:' },
          {
            type: 'image_url',
            image_url: {
              url: `${contentTypePrefix}${base64File}`,
            },
          },
        ],
      },
    ],
    max_tokens: 4096,
  });

  return textExtractionResponse.choices[0]?.message?.content || '';
}

async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  try {
    if (fileBuffer instanceof Uint8Array && !(fileBuffer instanceof Buffer)) {
      fileBuffer = Buffer.from(fileBuffer);
    }

    const pdfData = await pdf(fileBuffer);
    const extractedText = pdfData.text || '';

    return extractedText;
  } catch (error) {
    console.error('PDF extraction error details:', error);
  }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    const isMultipartFormData =
      contentType.includes('multipart/form-data') ||
      contentType.includes('multipart/form-data; boundary=');
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const jsonData = formData.get('data') as string;
      if (!jsonData) {
        return NextResponse.json(
          { error: 'Missing form data' },
          { status: 400 }
        );
      }
      const body = JSON.parse(jsonData);

      console.log('body = ', body);

      let extractedText = '';

      if (file) {
        const fileBytes = await file.arrayBuffer();
        const fileBuffer = Buffer.from(fileBytes);

        const tempDir = os.tmpdir();
        const tempFilePath = join(tempDir, file.name);

        // Write the file to disk
        writeFileSync(tempFilePath, fileBuffer);

        const fileType = file.type;

        // Extract text from PDF/Image

        if (fileType.includes('pdf')) {
          const uploadedFileBuffer = readFileSync(tempFilePath);
          extractedText = await extractTextFromPDF(uploadedFileBuffer);
        } else if (fileType.includes('image')) {
          extractedText = await extractTextWithOpenAI(fileBuffer, fileType);
        } else {
          return NextResponse.json(
            { error: 'Unsupported file type' },
            { status: 400 }
          );
        }

        unlinkSync(tempFilePath);

        console.log('extractedText = ', extractedText);
      }
      const { language } = body;
      const targetLanguage = languageMap[language] || 'English';
      const system_prompt = `You are an educational professional who designs creative and student-specific activities. We provide differentiated activity ideas tailored to age, level, and subject. Create a ${body.exercise_type} activity for ${targetLanguage} students, focusing on the following topic: ${body.theme}. The activity should be engaging and suitable for the specified level. Use the extracted text as a reference for the activity. Ensure that the activity is appropriate for the target audience and aligns with their learning objectives.`;

      let user_prompt = '';
      let prompt_1 = '';
      let prompt_2 = '';
      let prompt_3 = '';
      let prompt_final = '';

      if (body.exercise_type === 'language') {
        if (body.simplify && body.theme !== '' && body.select_language !== '') {
          prompt_1 = `You are an expert in foreign language didactics. 
            Your role is to simplify a grammar or vocabulary activity to make it accessible to learners at a lower CEFR level, while maintaining the pedagogical coherence and usefulness of the task. 
            Your task is not simply to simplify the vocabulary or sentences used, but to rethink the activity itself from a pedagogical point of view. 
            ➡️ Even if this prompt is written in English, your response (instructions, explanations, and the redesigned activity) must always be written in the original language of the activity provided (e.g., French, Spanish, etc.). 
            🎯 NEW ADDITION: The activity must be adapted to include a **coherent theme throughout**, based on the following theme: ${body.theme} 
            Every sentence, example, and context in the activity must reflect this theme clearly and naturally. 
            ⚠️ **Important**: Adapting to a theme must never increase the linguistic complexity. Only use **simple, high-frequency words** that are accessible to learners at the target level. Avoid technical terms, domain-specific vocabulary, or uncommon expressions that may make the activity harder than the original version. 
            🔍 Step-by-step instructions:
            1️⃣ Identify the linguistic difficulty with the learner's native language: ${body.select_language} (⚠️ Do not display this section in your response, but take it into account in your analysis.). Identify the language point targeted (e.g., past tense, use of “some,” dative case). Pinpoint the main sources of difficulty for learners: 
            → Morphological complexity (e.g., agreement, irregular forms, gender, number).
            → Syntactic complexity (e.g., word order, embedded structures). 
            → Semantic or usage-related challenges (e.g., false friends, context-specific meanings). 
            → Potential interference with the learner’s native language.
            2️⃣ Analyze the activity type Describe the type of activity (gap-fill, transformation, sorting, multiple choice, etc.). Evaluate its cognitive load: 
            → Does it combine several grammar points at once? 
            → Does it require implicit knowledge? Determine whether the task demands explicit rule application or implicit recognition. (💡 Present this part concisely.)
            3️⃣ Pedagogically simplify the activity Reduce the complexity progressively, without dropping more than one CEFR level (e.g., B1 → A2, not B1 → A1). Do not simply simplify the words or sentences: also simplify the structure and scope of the exercise: Focus on only one language point at a time. Start with regular, high-frequency forms that are morphologically transparent. Use only regular forms at first (e.g., regular verbs, base vocabulary). Avoid agreement rules or exceptions in early stages. Rewrite the instructions so that they are clear, direct, and understandable at the target level. (💡 This step must be the main focus of your analysis.) 
            4️⃣ Propose a simplified and pedagogically sequenced version with minimum of 3 exercices. Rewrite the activity using a clear progression of difficulty. You may change the type of exercise if it helps comprehension (e.g., from gap-fill to matching or sorting). 
            If needed, break the task into multiple steps: 
              Step 1: introduce the structure with only regular and familiar forms. 
              Step 2: add 2–3 frequent irregular or exception cases. 
              Step 3: gradually introduce more complex rules with visual or contextual support. 
              Step 4: use classification or recognition tasks before open production. Provide visual or grammatical support if useful (e.g., tables, boxed examples, reminders of rules). 
              📌 Sample analysis (for illustration): 
                Original activity: Gap-fill exercise combining different grammatical rules. 
                Identified difficulties: Involves multiple grammatical systems or irregular forms. Requires choosing between two constructions or rules. Demands agreement, word order, or contextual interpretation. 
              Simplification proposal: 
                Step 1: use only one structure with regular forms. 
                Step 2: add a few frequent irregularities or exceptions. 
                Step 3: provide visual cues or support. 
                Step 4: include sorting or recognition tasks before applying the structure in full sentences. 
                ✅ Expected outcome: An exercise that has been redesigned from a pedagogical and didactic perspective, not just linguistically simplified. The learner should not only be able to complete the task successfully but also understand what they are doing, and be able to reproduce the structure in basic production tasks. 
                🆚 ➕ Contrastive support (based on the learner's native language) At the end of your response, add a clearly structured support section in the original language of the activity comparing the grammar or vocabulary point to the learner’s native language (${body.select_language}). 
                💡 The explanations, examples, and learning tips in this section must be fully aligned with the language point and pedagogical simplification chosen for the activity. If the activity focuses only on one auxiliary, one verb type, or one structure, do not introduce more advanced forms in this section. All information must reinforce the learner’s progress without creating unnecessary confusion. 
                This contrastive section must include the following three parts: 
                  ✅ Part 1: Simple contrastive explanation 
                  → Explain how the target grammar or vocabulary works in the language of the activity. 
                  → Compare it with the learner’s native language. 
                  → Use clear, concrete, and accessible language. 
                  → Highlight similarities and differences. 
                  → Point out typical errors caused by interference between the two languages. 
                  → Use “vous” in French, “tu” in Spanish or English, etc. 
                  → Keep your explanation consistent with the simplified forms and scope of the activity. 
                  ✅ Part 2: Examples from the activity 
                  → Provide 2 to 4 examples taken directly from the simplified activity. 
                  → Translate them into the learner’s native language 
                  → Visually highlight the target grammar structure in both languages for easy comparison. 
                  → Choose simple and representative examples. 
                  ✅ Part 3: Practical learning tips 
                  → Give 2 or 3 very practical and focused tips, only related to this specific grammar or vocabulary point. 
                  → The tips should help the learner avoid common mistakes or remember the structure better. 
                  → Do not include general learning advice. 
                  → Make sure the tips are directly relevant to the level and progression used in the simplified activity. 
                  → If the activity works only with regular forms or a single auxiliary, the tips should only refer to those choices.`;
        } else if (body.simplify && body.theme !== '') {
          prompt_1 = `You are an expert in foreign language didactics. Your role is to simplify a grammar or vocabulary activity to make it accessible to learners at a lower CEFR level, while maintaining the pedagogical coherence and usefulness of the task. Your task is not simply to simplify the vocabulary or sentences used, but to rethink the activity itself from a pedagogical point of view. 
            ➡️ Even if this prompt is written in English, your response (instructions, explanations, and the redesigned activity) must always be written in the original language of the activity provided (e.g., French, Spanish, etc.).
            ⚽️ NEW ADDITION: The entire activity must be rewritten **with a coherent theme throughout**, based on the following variable: ${body.theme}
            Adapt every example, sentence and context to fit this theme as naturally and clearly as possible, while still focusing on the same grammar or vocabulary point.  
            **⚠️ Important: This thematic adaptation must not increase the complexity of the language used. Always use simple, high-frequency words related to the theme. Avoid any technical vocabulary or terms that would make the activity harder to read than the original version.**

            🔍 Step-by-step instructions:
            1️⃣ Identify the linguistic difficulty (⚠️ Do not display this section in your response, but take it into account in your analysis.)  
            Identify the language point targeted (e.g., past tense, use of “some,” dative case).  
            Pinpoint the main sources of difficulty for learners:  
            → Morphological complexity (e.g., agreement, irregular forms, gender, number).  
            → Syntactic complexity (e.g., word order, embedded structures).  
            → Semantic or usage-related challenges (e.g., false friends, context-specific meanings).  
            → Potential interference with the learner’s native language.  

            2️⃣ Analyze the activity type  
            Describe the type of activity (gap-fill, transformation, sorting, multiple choice, etc.).  
            Evaluate its cognitive load:  
            → Does it combine several grammar points at once?  
            → Does it require implicit knowledge?  
            Determine whether the task demands explicit rule application or implicit recognition. (💡 Present this part concisely.)

            3️⃣ Pedagogically simplify the activity  
            Reduce the complexity progressively, without dropping more than one CEFR level (e.g., B1 → A2, not B1 → A1).  
            Do not simply simplify the words or sentences: also simplify the structure and scope of the exercise:  
            Focus on only one language point at a time.  
            Start with regular, high-frequency forms that are morphologically transparent.  
            Use only regular forms at first (e.g., regular verbs, base vocabulary).  
            Avoid agreement rules or exceptions in early stages.  
            Rewrite the instructions so that they are clear, direct, and understandable at the target level. (💡 This step must be the main focus of your analysis.)

            4️⃣ Propose a simplified and pedagogically sequenced version  
            Rewrite the activity using a clear progression of difficulty.  
            You may change the type of exercise if it helps comprehension (e.g., from gap-fill to matching or sorting).  
            If needed, break the task into multiple steps:  
            Step 1: introduce the structure with only regular and familiar forms.  
            Step 2: add 2–3 frequent irregular or exception cases.  
            Step 3: gradually introduce more complex rules with visual or contextual support.  
            Step 4: use classification or recognition tasks before open production.  
            Provide visual or grammatical support if useful (e.g., tables, boxed examples, reminders of rules).

            ✅ Expected outcome:  
            An exercise that has been redesigned from a pedagogical and didactic perspective, not just linguistically simplified. The learner should not only be able to complete the task successfully but also understand what they are doing, and be able to reproduce the structure in basic production tasks.`;
        } else if (body.simplify && body.select_language !== '') {
          prompt_1 = `
            You are an expert in foreign language didactics. 
            Your role is to simplify a grammar or vocabulary activity to make it accessible to learners at a lower CEFR level, while maintaining the pedagogical coherence and usefulness of the task. 
            Your task is not simply to simplify the vocabulary or sentences used, but to rethink the activity itself from a pedagogical point of view. 
            ➡️ Even if this prompt is written in English, your response (instructions, explanations, and the redesigned activity) must always be written in the original language of the activity provided (e.g., French, Spanish, etc.). 
            🔍 Step-by-step instructions:
            1️⃣ Identify the linguistic difficulty (⚠️ Do not display this section in your response, but take it into account in your analysis.) Identify the language point targeted (e.g., past tense, use of “some,” dative case). Pinpoint the main sources of difficulty for learners: 
            → Morphological complexity (e.g., agreement, irregular forms, gender, number). 
            → Syntactic complexity (e.g., word order, embedded structures). 
            → Semantic or usage-related challenges (e.g., false friends, context-specific meanings). 
            → Potential interference with the learner’s native language.
            2️⃣ Analyze the activity type Describe the type of activity (gap-fill, transformation, sorting, multiple choice, etc.). Evaluate its cognitive load: 
            → Does it combine several grammar points at once? 
            → Does it require implicit knowledge? Determine whether the task demands explicit rule application or implicit recognition. (💡 Present this part concisely.)
            3️⃣ Pedagogically simplify the activity Reduce the complexity progressively, without dropping more than one CEFR level (e.g., B1 → A2, not B1 → A1). Do not simply simplify the words or sentences: also simplify the structure and scope of the exercise: Focus on only one language point at a time. Start with regular, high-frequency forms that are morphologically transparent. Use only regular forms at first (e.g., regular verbs, base vocabulary). Avoid agreement rules or exceptions in early stages. Rewrite the instructions so that they are clear, direct, and understandable at the target level. (💡 This step must be the main focus of your analysis.)
            4️⃣ Propose a simplified and pedagogically sequenced version Rewrite the activity using a clear progression of difficulty. You may change the type of exercise if it helps comprehension (e.g., from gap-fill to matching or sorting). You must include at least 3 exercises in the simplified version. These 3 or more exercises should follow a pedagogical progression to gradually reach the level of the original activity. 
            For example: 
            → Exercise 1: focus on the simplest auxiliary ("avoir"). 
            → Exercise 2: identify when to use "avoir" or "être". 
            → Exercise 3: practice using both in context. (This is only one example — your progression should apply to any grammar or vocabulary topic and to any language.) 
              If needed, break the task into multiple steps: 
              Step 1: introduce the structure with only regular and familiar forms. 
              Step 2: add 2–3 frequent irregular or exception cases. 
              Step 3: gradually introduce more complex rules with visual or contextual support. 
              Step 4: use classification or recognition tasks before open production. Provide visual or grammatical support if useful (e.g., tables, boxed examples, reminders of rules). 
              📌 Sample analysis (for illustration): 
                Original activity: Gap-fill exercise combining different grammatical rules. 
                Identified difficulties: Involves multiple grammatical systems or irregular forms. Requires choosing between two constructions or rules. Demands agreement, word order, or contextual interpretation. 
                Simplification proposal: 
                  Step 1: use only one structure with regular forms. 
                  Step 2: add a few frequent irregularities or exceptions. 
                  Step 3: provide visual cues or support. 
                  Step 4: include sorting or recognition tasks before applying the structure in full sentences. 
                    ✅ Expected outcome: An exercise that has been redesigned from a pedagogical and didactic perspective, not just linguistically simplified. The learner should not only be able to complete the task successfully but also understand what they are doing, and be able to reproduce the structure in basic production tasks. 
                    🆚 ➕ Contrastive support (based on the learner's native language) At the end of your response, add a clearly structured support section in the original language of the activity (not English), comparing the grammar or vocabulary point to the learner’s native language (${body.select_language}). 
                    💡 The explanations, examples, and learning tips in this section must be fully aligned with the language point and pedagogical simplification chosen for the activity. If the activity focuses only on one auxiliary, one verb type, or one structure, do not introduce more advanced forms in this section. All information must reinforce the learner’s progress without creating unnecessary confusion. 
                    This contrastive section must include the following three parts: 
                    ✅ Part 1: Simple contrastive explanation 
                    → Explain how the target grammar or vocabulary works in the language of the activity. 
                    → Compare it with the learner’s native language.
                    → Use clear, concrete, and accessible language. 
                    → Highlight similarities and differences. 
                    → Point out typical errors caused by interference between the two languages. 
                    → Use “vous” in French, “tu” in Spanish or English, etc. 
                    → Keep your explanation consistent with the simplified forms and scope of the activity. 
                    ✅ Part 2: Examples from the activity 
                    → Provide 2 to 4 examples taken directly from the simplified activity. 
                    → Translate them into the learner’s native language. 
                    → Visually highlight the target grammar structure in both languages for easy comparison. 
                    → Choose simple and representative examples. 
                    ✅ Part 3: Practical learning tips 
                    → Give 2 or 3 very practical and focused tips, only related to this specific grammar or vocabulary point. 
                    → The tips should help the learner avoid common mistakes or remember the structure better. 
                    → Do not include general learning advice. 
                    → Make sure the tips are directly relevant to the level and progression used in the simplified activity. 
                    → If the activity works only with regular forms or a single auxiliary, the tips should only refer to those choices.
          `;
        } else if (body.simplify) {
          prompt_1 = `
            You are an expert in foreign language didactics. 
            Your role is to simplify a grammar or vocabulary activity to make it accessible to learners at a lower CEFR level, while maintaining the pedagogical coherence and usefulness of the task. 
            Your task is not simply to simplify the vocabulary or sentences used, but to rethink the activity itself from a pedagogical point of view. 
            ➡️ Even if this prompt is written in English, your response (instructions, explanations, and the redesigned activity) must always be written in the original language of the activity provided (e.g., French, Spanish, etc.). 
            🔍 Step-by-step instructions: 
              1️⃣ Identify the linguistic difficulty (⚠️ Do not display this section in your response, but take it into account in your analysis.) Identify the language point targeted (e.g., past tense, use of “some,” dative case). 
              Pinpoint the main sources of difficulty for learners: 
              → Morphological complexity (e.g., agreement, irregular forms, gender, number). 
              → Syntactic complexity (e.g., word order, embedded structures). 
              → Semantic or usage-related challenges (e.g., false friends, context-specific meanings). 
              → Potential interference with the learner’s native language.
              2️⃣ Analyze the activity type Describe the type of activity (gap-fill, transformation, sorting, multiple choice, etc.). Evaluate its cognitive load: 
              → Does it combine several grammar points at once? → Does it require implicit knowledge? Determine whether the task demands explicit rule application or implicit recognition. (💡 Present this part concisely.)
              3️⃣ Pedagogically simplify the activity Reduce the complexity progressively, without dropping more than one CEFR level (e.g., B1 → A2, not B1 → A1). Do not simply simplify the words or sentences: also simplify the structure and scope of the exercise: Focus on only one language point at a time. Start with regular, high-frequency forms that are morphologically transparent. Use only regular forms at first (e.g., regular verbs, base vocabulary). Avoid agreement rules or exceptions in early stages. Rewrite the instructions so that they are clear, direct, and understandable at the target level. (💡 This step must be the main focus of your analysis.)
              4️⃣ Propose a simplified and pedagogically sequenced version Rewrite the activity using a clear progression of difficulty. You may change the type of exercise if it helps comprehension (e.g., from gap-fill to matching or sorting). If needed, break the task into multiple steps: 
              Step 1: introduce the structure with only regular and familiar forms. 
              Step 2: add 2–3 frequent irregular or exception cases. 
              Step 3: gradually introduce more complex rules with visual or contextual support. Step 4: use classification or recognition tasks before open production. Provide visual or grammatical support if useful (e.g., tables, boxed examples, reminders of rules). 
              📌 Sample analysis (for illustration): Original activity: Gap-fill exercise combining different grammatical rules. Identified difficulties: Involves multiple grammatical systems or irregular forms. Requires choosing between two constructions or rules. Demands agreement, word order, or contextual interpretation. Simplification proposal: 
              Step 1: use only one structure with regular forms. 
              Step 2: add a few frequent irregularities or exceptions. 
              Step 3: provide visual cues or support. 
              Step 4: include sorting or recognition tasks before applying the structure in full sentences. 
              ✅ Expected outcome: An exercise that has been redesigned from a pedagogical and didactic perspective, not just linguistically simplified. The learner should not only be able to complete the task successfully but also understand what they are doing, and be able to reproduce the structure in basic production tasks.
          `;
        } else if (body.theme !== '' && body.select_language !== '') {
          prompt_1 = `
            You are an expert in foreign language didactics. 
            Your role is to adapt a grammar or vocabulary activity by keeping its level of difficulty equivalent to the original (same CEFR level), while maintaining the pedagogical coherence and usefulness of the task. 
            Your task is not to simplify the vocabulary or grammar structures, but to **adjust the content** to match a new theme, while making sure the activity remains equally accessible to learners. 
            It must never become more difficult than the original. 
            ➡️ Even if this prompt is written in English, your response (instructions, explanations, and the redesigned activity) must always be written in the original language of the activity provided (e.g., French, Spanish, etc.). 
            🎯 THEME ADAPTATION: The activity must be rewritten with a **coherent theme throughout**, based on the following theme: ${body.theme}. Every sentence, example, and context in the activity must reflect this theme clearly and naturally. 
              ⚠️ **Important**: This thematic adaptation must **never increase the linguistic or cognitive complexity**. Always use **simple, high-frequency words** related to the theme. Avoid technical vocabulary or niche expressions, even if the theme suggests them. If a thematic adaptation would increase difficulty, change the context to something simpler within the same theme. 
            🔍 Step-by-step instructions:
              1️⃣ Identify the linguistic difficulty (⚠️ Do not display this section in your response, but take it into account in your analysis.) Identify the language point targeted (e.g., past tense, use of “some,” dative case). Pinpoint the main sources of difficulty for learners: 
              → Morphological complexity (e.g., agreement, irregular forms, gender, number). 
              → Syntactic complexity (e.g., word order, embedded structures). 
              → Semantic or usage-related challenges (e.g., false friends, context-specific meanings). 
              → Potential interference with the learner’s native language.
              2️⃣ Analyze the activity type Describe the type of activity (gap-fill, transformation, sorting, multiple choice, etc.). 
              Evaluate its cognitive load: 
              → Does it combine several grammar points at once? 
              → Does it require implicit knowledge? Determine whether the task demands explicit rule application or implicit recognition. (💡 Present this part concisely.)
              3️⃣ Adapt the activity with a new theme Keep the level and difficulty of the activity the same. Change only the context and content (lexical items, situations, examples), using the theme as a reference. Ensure that the vocabulary used remains simple and frequent, even within the theme. Rephrase instructions if needed for clarity, but do not simplify or increase the level. 
              💡 The goal is to create a parallel version of the activity that is **thematically different but pedagogically identical** in scope and challenge.
              4️⃣ Provide a pedagogically coherent version with the new theme Rewrite the activity in its adapted version. Keep the original structure and sequencing unless a minor change helps maintain clarity with the new theme. Use images, visual or grammatical supports if present in the original. Maintain a consistent tone and level throughout. Do not add new grammatical points or concepts. 
              ✅ Expected outcome: An activity that maintains the original level and purpose while being set in a different theme. It should be just as accessible and effective for learners, with no added complexity. 
              🆚 ➕ Contrastive support (based on the learner's native language) At the end of your response, add a clearly structured support section in the original language of the activity comparing the grammar or vocabulary point to the learner’s native language: ${body.select_language}. 
              💡 The explanations, examples, and learning tips in this section must be fully aligned with the language point and pedagogical simplification chosen for the activity. If the activity focuses only on one auxiliary, one verb type, or one structure, do not introduce more advanced forms in this section. All information must reinforce the learner’s progress without creating unnecessary confusion. This contrastive section must include the following three parts: 
              ✅ Part 1: Simple contrastive explanation 
              → Explain how the target grammar or vocabulary works in the language of the activity. 
              → Compare it with the learner’s native language greek
              → Use clear, concrete, and accessible language. 
              → Highlight similarities and differences. 
              → Point out typical errors caused by interference between the two languages. 
              → Use “vous” in French, “tu” in Spanish or English, etc. 
              → Keep your explanation consistent with the simplified forms and scope of the activity. 
              ✅ Part 2: Examples from the activity 
              → Provide 2 to 4 examples taken directly from the simplified activity. 
              → Translate them into the learner’s native language 
              → Visually highlight the target grammar structure in both languages for easy comparison. 
              → Choose simple and representative examples. 
              ✅ Part 3: Practical learning tips 
              → Give 2 or 3 very practical and focused tips, only related to this specific grammar or vocabulary point. 
              → The tips should help the learner avoid common mistakes or remember the structure better. 
              → Do not include general learning advice. 
              → Make sure the tips are directly relevant to the level and progression used in the simplified activity. 
              → If the activity works only with regular forms or a single auxiliary, the tips should only refer to those choices.
          `;
        } else if (body.theme !== '') {
          prompt_1 = `
            You are an expert in foreign language didactics. 
            Your role is to adapt a grammar or vocabulary activity by keeping its level of difficulty equivalent to the original (same CEFR level), while maintaining the pedagogical coherence and usefulness of the task. 
            Your task is not to simplify the vocabulary or grammar structures, but to adjust the content to match a new theme, while making sure the activity remains equally accessible to learners. 
            It must never become more difficult than the original. 
            ➡️ Even if this prompt is written in English, your response (instructions, explanations, and the redesigned activity) must always be written in the original language of the activity provided (e.g., French, Spanish, etc.). 
            🎯 THEME ADAPTATION: The activity must be rewritten with a coherent theme throughout, based on the following variable: ${body.theme} (examples: school, football, food, travel, etc.). Every sentence, example, and context in the activity must reflect this theme clearly and naturally. 
              ⚠️ Important: This thematic adaptation must never increase the linguistic or cognitive complexity. Always use simple, high-frequency words related to the theme. Avoid technical vocabulary or niche expressions, even if the theme suggests them. If a thematic adaptation would increase difficulty, change the context to something simpler within the same theme. 
            🔍 Step-by-step instructions:
              1️⃣ Identify the linguistic difficulty (⚠️ Do not display this section in your response, but take it into account in your analysis.) Identify the language point targeted (e.g., past tense, use of “some,” dative case). Pinpoint the main sources of difficulty for learners: → Morphological complexity (e.g., agreement, irregular forms, gender, number). 
              → Syntactic complexity (e.g., word order, embedded structures). 
              → Semantic or usage-related challenges (e.g., false friends, context-specific meanings). 
              → Potential interference with the learner’s native language.
              2️⃣ Analyze the activity type Describe the type of activity (gap-fill, transformation, sorting, multiple choice, etc.). Evaluate its cognitive load: 
              → Does it combine several grammar points at once? 
              → Does it require implicit knowledge? Determine whether the task demands explicit rule application or implicit recognition. (💡 Present this part concisely.)
              3️⃣ Adapt the activity with a new theme Keep the level and difficulty of the activity the same. Change only the context and content (lexical items, situations, examples), using the theme as a reference. Ensure that the vocabulary used remains simple and frequent, even within the theme. Rephrase instructions if needed for clarity, but do not simplify or increase the level. 
              💡 The goal is to create a parallel version of the activity that is thematically different but pedagogically identical in scope and challenge.
              4️⃣ Provide a pedagogically coherent version with the new theme Rewrite the activity in its adapted version. Keep the original structure and sequencing unless a minor change helps maintain clarity with the new theme. Use images, visual or grammatical supports if present in the original. Maintain a consistent tone and level throughout. Do not add new grammatical points or concepts. 
              ⚠️ It is not necessary in your output to include the pedagogical remark section. 
              ✅ Expected outcome: An activity that maintains the original level and purpose while being set in a different theme. It should be just as accessible and effective for learners, with no added complexity.`;
        } else if (body.select_language !== '') {
          prompt_1 = `
            You are a specialist in foreign language didactics. 
            Your task is to analyze and reframe an existing grammar or vocabulary activity, without changing its theme or level of difficulty. 
            You must preserve the original task exactly as it is, without simplifying or enriching the language. 
            The grammar structure, vocabulary level, and task type must remain the same. 
            ➡️ Although this prompt is written in English, your full response (instructions, explanations, and the activity itself) must always be written in the original language of the activity provided (e.g., French, Spanish, etc.). 
            🎯 OBJECTIVE: Keep the activity identical in content and level, but add a final pedagogical support section, designed to help learners better understand the grammar or vocabulary point through a contrastive approach based on their native language: ${body.select_language} 
              – the learner’s mother tongue, to be used as a basis for the contrastive support. 
            🧩 🧠 STEP-BY-STEP INSTRUCTIONS:
              1️⃣ Start directly by reproducing the original activity exactly 
                → Keep the original instructions, examples, sentences, and wording without any modifications. 
                → Maintain the same context, theme, difficulty level, and structure. 
                ⚠️ Do not introduce new vocabulary, contexts, or grammar points.
              2️⃣ ADD A FINAL SECTION: 
                ✨ Contrastive Support. You must now write a final support section entirely in the language of the activity, with the following three clearly structured parts: 
                ✅ Part 1: Simple contrastive explanation 
                → Compare the grammar or vocabulary point in the target language and in the learners’ native language 
                → Use very clear and basic language. 
                → Show how it works in both languages, and explain key differences or similarities. 
                → If the language of the activity is French, address the learner with “vous.” If the activity is in English or Spanish, address them with “tu.” 
                → If possible, name common mistakes that speakers of NATIVE LANGUAGE tend to make with this point. 
                → 🆕 Say: “cela peut vous poser des difficultés” instead of “cela peut tromper les apprenants.” 
                ✅ Part 2: Examples from the exercise 
                → Select 2–4 real examples from the activity. 
                → Translate them into the learners’ native language to show how the same idea is expressed differently. 
                → Clearly underline the key structure in both versions to make the comparison easy. 
                ✅ Part 3: Tips to improve 
                → Offer 2–3 very practical learning tips to help learners get better at using this specific grammar or vocabulary point. 
                → Keep tips short, actionable, and specific to this structure (e.g., “Always check the auxiliary,” “Say it aloud to hear if it sounds correct,” etc.). 
                → Do not give general learning advice — focus only on the target point. 
                ✅ FINAL OUTCOME Your final output must include: The original activity, unchanged. A clearly separated final section offering well-structured, concrete contrastive support in the same language as the activity. The learner should walk away with a better understanding of how this grammar or vocabulary works in the target language compared to their native language and be able to apply that knowledge.
          `;
        }
      } else if (body.exercise_type === 'communicative-skills') {
        if (body.simplify && body.skill !== '' && body.modification.modify) {
          prompt_2 = `You are a specialist in foreign language didactics. Simplify the activity for a lower language level, and Transform the activity into a new communication skill: ${body.skill}. 
          🧩 Part 1 
          –Simplification Simplify the activity to make it accessible to learners one CEFR level below the original (e.g., B1 → A2), but never lower than that. 
          • If the activity includes a written text or an audio transcript, you must rewrite it using: 
          - More frequent, everyday vocabulary (avoiding rare, formal, abstract, or polysemous words); 
          - Short, direct sentences with one idea per sentence to reduce cognitive load; 
          - Simplified grammatical structures (use common tenses and avoid complex syntax). 
          • The simplified version must retain all essential information required to complete the activity and maintain internal coherence. 
          • Instructions and questions must be rewritten to be clearer and easier to understand. 
          - Prefer simple task formats (e.g. multiple-choice, true/false, matching) when it improves accessibility. 
          - Always keep the same number of questions as in the original activity. • For MCQs: 
          - Do not copy wording from the original text in the correct answer. The question itself must not be made more complex as a result—on the contrary, it should be simplified. Some individual words from the text may be reused if necessary, but never full phrases. 
          - All options (correct and incorrect) must be logical, of similar length, and coherent with the context. Avoid absurd or meaningless distractors that could never realistically answer the question (e.g., suggesting that a play was performed before a film adaptation because the cinema was closed). 
          • For writing or speaking tasks: provide a clear, concrete context and simple success tips adapted to the level. 
          • For grammar and vocabulary tasks: focus on frequent forms and avoid exceptions, idioms, or rare expressions. 
          • The result must be pedagogically consistent, fully functional, and more accessible without losing the purpose or substance of the original task. 
          🎯 Part 2 
          - Skill Transformation You must transform the activity so that it targets the new communication skill: ${body.skill}
          • First, identify the original skill (reading, listening, writing, speaking, etc.).
          • Then adapt the support and the task to match the new skill: 
          - If the activity is based on a written text and the target skill is listening or speaking, rewrite the content as a script for a dialogue, monologue, or announcement. 
          - If the support is visual (e.g. image, poster, infographic), transform it into a suitable support for the new skill, while preserving all relevant information and communicative intent. 
          - If no support is provided, adapt only the instructions and activity format while preserving the original communicative objective. 
          • Do not alter the content, complexity, CEFR level, communicative purpose, or target audience. 
          • Adapt the questions or tasks to the new skill: 
          - For example, written comprehension questions become listening comprehension questions; writing instructions become oral tasks, etc. 
          - Maintain the same number of questions and preserve the focus and intent of each one. • Ensure the activity remains pedagogically coherent and aligned with CEFR conventions: 
          - For levels A1-A2: use simple dialogues, clear speech, basic grammar and lexicon. 
          - From B1 onward: you may use longer texts, more natural speech, or semi-authentic formats like podcasts or radio programs—provided they are clearly contextualized (e.g. “This is a podcast about…”). 
          However, when an activity is simplified to a lower CEFR level (e.g. B1 → A2), the type of support must match the simplified level, not the original one. For instance, a B1 reading task transformed into an A2 listening task must result in a short, simple dialogue or announcement—not a podcast or radio program. 
          • The final version must be delivered entirely in the language of the original activity. If the source uses a bilingual format (e.g., instructions in English, task in French), keep that format.
          `;
        } else if (
          body.simplify &&
          body.theme !== '' &&
          body.modification.modify
        ) {
          prompt_2 = `You are a specialist in foreign language didactics. Simplify the activity for a lower CEFR level, and adapt the activity to a new thematic context: ${body.theme}. 
            🧩 Part 1 
            1) Simplification Your adaptation must make the activity more accessible to learners one CEFR level below the original (e.g., B1 → A2), but never lower. If the activity includes a text or audio transcript, rewrite it by: 
            - Replacing rare, abstract, overly formal, or ambiguous vocabulary with common, concrete, and natural alternatives; 
            - Using short sentences with one idea per sentence to reduce information density; 
            - Favoring simple and frequent grammatical structures. 
            2) All essential information must be preserved only if it remains appropriate to the new thematic context. If not, you may adapt or replace ideas to ensure logical coherence. Instructions and questions must be simplified: 
            - Use clear and concise formats (MCQ, true/false, matching), with one question per instruction; 
            - Always keep the same number of questions as in the original. For MCQs: 
            - Do not reuse entire phrases from the source text in the correct answer. The question itself must not be made more complex—on the contrary, it should be simplified. Some words from the text may be reused, but never full sentences. 
            - All answer choices (correct and incorrect) must be logically coherent, of similar length, and appropriate to the context. Avoid absurd or irrelevant distractors. For writing or speaking tasks: rewrite instructions using simple language, clarify the context, and include tips appropriate to the target level. For grammar, vocabulary, or phonetics tasks: simplify content while maintaining the learning objective. Avoid irregular, idiomatic, or highly specific structures. 
            🎯 Part 2 
            Thematic adaptation You must change the theme of the activity while keeping the same skill, structure, and level of complexity (as simplified in Part 1). The most important principle is to maintain thematic and narrative coherence in the new context. 
            → You are allowed to modify or replace certain ideas from the original text if they do not make sense in the new theme. 
            → Always prioritize the internal logic and realism of the new version. You must preserve the same types of linguistic structures as the original (e.g. tense, sentence structure, type of vocabulary), even if the content and storyline change. 
            → For example, if the original includes narration in the present and an unrealized plan in the past, the new version must include a similar structure, but not necessarily the same events. Do not change the type of activity: a reading task remains a reading task; a writing task remains a writing task. Maintain the same number of paragraphs, sections, and questions, as well as the same types of instructions (MCQ, matching, open-ended, etc.). The new thematic context must allow for the same linguistic and communicative functions (e.g. expressing time, location, preferences, justifications, etc.). Ensure full pedagogical and thematic coherence: the new context must feel natural, relevant, and meaningful for learners, while supporting the same grammar, vocabulary range, and communication purpose.
          `;
        } else if (body.simplify && body.modification.modify) {
          prompt_2 = `You are a specialist in foreign language didactics. Rewrite this activity to adapt it to foreign language learners with a higher level, regardless of the exercise type (grammar, vocabulary, phonetics, listening/reading comprehension, speaking/writing production, etc.).
            Important:
            • If the exercise includes a written text or an audio transcript, also modify this text to make it more complex.
            • Never exceed a difference of more than one CEFR level compared to the original activity (e.g.: A2 → B1, but not B2).
            • The complexification must remain subtle and progressive. Favor lexical enrichment, a slight increase in syntactic density (longer sentences, simple subordinate clauses), but avoid grammatical structures characteristic of a much higher level (e.g., conditional, subjunctive if it is not the target level).
            • All elements added or modified in the text must be relevant, useful, and coherent with the content. Avoid unnecessary additions.
            • Absolutely avoid double questions or multiple tasks in the same instruction.
            1️. Complexify the text or transcript (if present):
            • Enrich vocabulary with more precise or formal synonyms, while keeping a natural and coherent flow with the base text.
            • Slightly lengthen sentences with clear structures: simple subordinate clauses, impersonal or passive constructions, varied logical connectors.
            • Do not overload grammatically: stay strictly within the elements corresponding to the immediate higher level, without exceeding it.
            • If the text supports other exercises (grammar, vocabulary, production, etc.), ensure strong coherence between the text and the exercises.

            2️. Complexify the exercises according to their type:
            • Reading/Listening comprehension: Make instructions more refined, introducing tasks such as justification, analysis, comparison, or connecting information. Favor open-ended questions.
            • Writing/Speaking production: Provide instructions requiring more structuring, lexical diversity, argumentation, or reformulation, always adapted to the immediate higher level.
            • Grammar exercises: Increase the complexity of the rule being worked on. For example, include exceptions, special cases, or less regular structures specific to the higher level (e.g., adding an exception to a rule, integrating a less frequent case). Adapt these principles to each target language.
            • Vocabulary exercises: Enrich lexical diversity by introducing synonyms, collocations, idiomatic expressions, or specific orthographic/morphological difficulties.
            • Phonetics exercises: Introduce more complex phenomena or those specific to the higher level (e.g., fine sound distinctions, marked intonation, accentuation, depending on language specifics).
            • MCQ: Make the incorrect answers more subtle, integrating elements close to the text or instruction, while keeping them incorrect. Remove any double question.
          `;
        } else if (body.simplify && body.modification.keep) {
          prompt_2 = `You are a specialist in foreign language didactics. Keep the written text or audio transcript exactly as it is, if present in the original exercise, without modifying it, unless otherwise specified in the prompt. Complexify only the associated exercises, regardless of their type (grammar, vocabulary, phonetics, listening/reading comprehension, speaking/writing production, etc.).
              Important:
            • Never exceed a difference of more than one CEFR level compared to the text/transcript and original exercises (e.g.: from A2 to B1, but not B2).
            • The complexification must be light and progressive, without excessive overload, depending on the exercise type.
            • Absolutely avoid double questions or multiple tasks in the same instruction.

            Complexify the exercises according to their type:
            • Reading/Listening comprehension: Make the questions more refined by asking for justification, analysis, or connecting information. Favor open-ended questions, without modifying the text or transcript (unless otherwise specified).
            • Writing/Speaking production: Provide instructions requiring more organization, lexical diversity, argumentation, or structuring, without exceeding the immediate higher CEFR level.
            • Grammar exercises: Increase the complexity of the rule studied. For example, include exceptions, special cases, or less regular structures specific to the higher level (e.g., adding the auxiliary "to be" for a past tense exercise initially focused only on "to have"). Adapt this principle according to the language.
            • Vocabulary exercises: Enrich lexical diversity, propose more precise terms, synonyms, collocations, or exercises integrating orthographic or morphological difficulties adapted to the level.
            • Phonetics exercises: Introduce more complex phenomena or those specific to the higher level, taking into account characteristics specific to the target language (e.g., finer pronunciation, particular intonation, distinctions of similar sounds).
            • MCQ: Make the incorrect answers less obvious by using elements close to the text or instruction, while keeping them incorrect. Remove any double instruction.
          `;
        } else if (body.skill !== '' && body.modification.modify) {
          prompt_2 = `You are a specialist in foreign language didactics. Transform the provided exercise so that it becomes a ${body.skill} exercise.
              General principles:
            • Keep the themes, essential information, key vocabulary, and grammatical structures from the source document, but naturally adapt them to ${body.skill} production.
            • Maintain the same degree of difficulty and the same language level as the original exercise.
            • Do not create exercises mixing several skills.
            • Instructions must be simple, clear, precise, and well-suited to ${body.skill} production, without double instructions.
            Specific guidelines for ${body.skill} production:
            • Provide precise and realistic instructions, with a concrete context, adapted to non-native learners, often located outside the country where the target language is spoken.
            • The context can be:
              o Written correspondence with a friend or a native pen pal (e.g., "your French friend", "your English teacher", depending on the target language).
              o Participation in a readers' forum in a magazine or online.
              o A post on social media.
              o A reply to an advertisement, a formal letter, or a simple email.
            • The instruction must remain connected to the theme of the source document. The connection should be immediately identifiable and very clear, so that the learner can use the vocabulary and structures practiced, without reproducing them word for word.
            • Clearly guide the production steps: separate the different pieces of expected information if necessary, so that the learner correctly structures their text.
            Example:
            Instead of: "Describe your holidays in France."
            Prefer: "You went on holiday to the beach in France. Write a message to your French friend to explain what you did during your holidays, the people you met, and the weather. Share your impressions about the trip."
            Other recommendations:
            • Specify the expected length of the text according to the identified CEFR level (e.g., 60-80 words for A1/A2, 100-150 words for B1, etc.).
            • Clarify the objectives (e.g., narrate, give an opinion, describe).
            • Vocabulary and grammatical structures must match the level and remain natural for a learner.
          `;
        } else if (body.theme !== '' && body.modification.modify) {
          prompt_2 = `You are a specialist in foreign language didactics. You must rewrite this activity by keeping the same type of task (reading/listening comprehension, writing/speaking production, grammar, vocabulary, etc.) and the same level of difficulty, but changing the thematic context to match the one indicated in the variable below. The goal is to keep all pedagogical and linguistic functions of the original task (skills, vocabulary areas, communication objectives, grammar focus, etc.) while proposing a completely different theme: ${body.theme}

            🔒 Essential rules to follow:
            1️⃣ Preserve the target skill
            – If the original activity is a reading comprehension, the adapted version must also be a reading comprehension.
            – If it is a writing production, it must remain a writing production.
            → Never change the type of activity.
            2️⃣ Keep the CEFR level and difficulty
            – It is possible to slightly simplify the activity, but never make it more complex.
            – Ideally, the level of difficulty should remain the same.
            3️⃣ Preserve all communicative and linguistic objectives
            – Identify the exact purpose of the task (e.g. give practical information, describe a place, write an invitation, explain a rule, etc.) and reproduce this objective in the new version.
            – If the original task involves describing a sports event with time, price, location, target audience, and how to register, the adapted version (e.g. about a cultural event) must also allow the learner to work on time, price, location, audience, registration, etc.
            → All elements from the original instruction must be clearly present in the new exercise.
            4️⃣ Keep structural equivalence
            – Maintain the same number of paragraphs, sections, and questions.
            – Preserve the same type of instructions (e.g. multiple choice, open questions, matching).
            → You are changing the theme, not the structure.
            5️⃣ Keep the original target language
            – ⚠️ If the original activity is in French, the adapted version must also be in French, even though this prompt is written in English.
            → Always work in the same target language as the source activity.
            6️⃣ Ensure thematic and pedagogical coherence
            – The new theme must remain pedagogically relevant and must allow for the same communicative goals, grammatical structures, and lexical fields.
            → For example, an activity about going to a football match can be adapted to a trip to the theater or a museum, but it must still enable the learner to say what time it starts, how much it costs, how to sign up, etc.
            → This applies equally to writing or speaking production tasks: they must continue to develop the same skills and communicative goals, only in a different context.

            📝 Your output must include:
                • ✅ A rewritten version of the text or transcript (if present), or the task instructions
                • ✅ A rewritten version of the questions or prompts
                • ✅ A perfect match with the original skill, level, and objective
                • ✅ Integration of the new theme defined in the variable
          `;
        }
      }


      if (extractedText || body.generation_mode) {
        prompt_3 = `And the next is the referenced text to make a content of your activity. \n`;
        prompt_3 += extractedText || body.generation_mode;
        prompt_3 += `\n
          You should analysis above text to make differentiated activity contents, but it should be fit to the latest educational scholar requirements.
          And the most important thing on this content, is just to make all content of activity including analysis above, be written in a lanuage used in the above referenced text.
          The exercises should have 5 questions for students to study from them.
          Then, the content of questions should follow the next structure.
          Be careful not to make it systematic, but only when a grammar, lexicon or phonetic rule is explained in the original document: keep this element in the activity and modify it according to the user's requests.
          And the question type could be as following:
          -	Multiple Choice Questions (MCQ)
          -	True/False
          -	Open-ended Question
          -	Matching Question
          Especially, the true/false questions should vary the right answer for themselves.
          The subquestions of each question should follow the index of alphabetical sequence.
          ex: 
          1. question
          a. subquestion1
          b. subquestion2
          c. 
          
          On the structure of subqusetions, the romanic numbers(i, ii, iii, iv, v) must not be appeared on the indexing system at any case.
        `;
        if (body.select_language) {
          prompt_3 += `
            You should add the grammatic differences between the lanaguage used on above referenced text and ${body.select_language} so to make a good comprehenstion for the students without fail.
          `;
        }
        if (body.skill === 'reading') {
          prompt_3 += `
            * Add information which shows relative data links to this activity made from the referenced text.
            Offer an email, a message on Instagram, a message on the phone, etc.
            For the user to know about the links and could connect to the relative data with those.
          `;
        }
      }

      if (!body.personalization.adapt_to_interests && !body.personalization.send_to_students) {
        prompt_final = `
          On the activity you have made above, should have the response of the above questions for the teachers to see the results and check them.
        `;
      } else {
        prompt_final = `
          The response of above questions you have made, should be sent to the students so the response should not appeared for them to think about the questions only by themselves.
        `;
      }

      user_prompt = prompt_1 + '\n' + prompt_2 + '\n' + prompt_3 + '\n' + prompt_final;

      console.log('user_prompt = ', user_prompt);

      const stream = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: system_prompt,
          },
          {
            role: 'user',
            content: user_prompt,
          },
        ],
        stream: true,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      });

      // Create a ReadableStream that will be sent to the client
      let accumulatedJson = '';
      const textEncoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              accumulatedJson += content;
              controller.enqueue(
                textEncoder.encode(
                  `data: ${JSON.stringify({ content, accumulatedJson })}\n\n`
                )
              );
            }
          }
          controller.enqueue(textEncoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }
  } catch (error) {
    console.log('error', error);
    console.error('Error generating Assessment:', error);
    return NextResponse.json(
      { error: 'Failed to generate Assessment ' },
      { status: 500 }
    );
  }
}
