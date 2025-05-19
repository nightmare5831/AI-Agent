import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { language } = body;

    const targetLanguage = languageMap[language] || 'English';
    const system_prompt = `You are a professional education consultant who creates assignment questions for students. You provide detailed, practical and engaging assignment questions that follow modern educational principles. When generating, do not output Class Information, Assignment Information, or Lesson Information. Create a full response in ${targetLanguage}.`;
    let user_prompt = '';
    let sub_prompt = '';
    let audio_prompt = '';
    let reading_prompt = '';
    let writing_prompt = '';
    let speaking_prompt = '';
    let rule_1 = '';

    if (body.class.language_level === 'A1') {
      audio_prompt = `Audio or transcript of 45 to 50 words, strictly adapted to the course context and theme and corresponding to A1 level: Very simple expressions about the student, the people they know, and their surroundings. Questions, instructions, and guidelines. For example, daily expressions, questions, instructions, brief and simple guidelines.`;
      reading_prompt = `Text of 60 to 70 words, adapted to the course context and theme and corresponding to A1 level: Very simple texts, mainly short and simple descriptions, especially if they are illustrated.
Short and simple instructions, for example, postcards, SMS messages, very short and simple social media posts, and short and simple notices.`;
      writing_prompt = `Very short written samples; isolated words and very short elementary sentences.
For example, simple messages, notes, forms, and postcards, SMS, posters with very simple text, very simple messages on social media.
Example: numbers and dates, my own name, nationality, address, and other necessary personal information to fill out a simple form, for example, when traveling.
Simple and short sentences connected by "and" or "and then," for example.`;
      speaking_prompt = `Can produce simple isolated expressions about people and things.`;
      rule_1 = `- Grammatical structures:
                  • Exclusive use of simple verb forms adapted to the target language.
                  • Present tense as the main tense for all actions.
                  • Basic structures for negation and questions can be introduced, but without syntactic complexity.
                - Restrictions:
                  • No past or future tense unless the target language uses very simple and essential forms.
                  • No complex verb moods (subjunctive, conditional, advanced imperative).
                  • Avoid complex sentences: only the simplest subordinate clauses (e.g., "because", "and").`;
    }
    if (body.class.language_level === 'A2') {
      audio_prompt = `Audio or transcript of 60 to 70 words, strictly adapted to the course context and theme and corresponding to A2 level: Simple expressions and sentences on topics relevant to the student. Simple daily conversations and discussions. Common questions in the media.
For example, messages, common exchanges, guidelines, televised news.`;
      reading_prompt = `Text of 120 to 130 words, adapted to the course context and theme and corresponding to A2 level: Texts on familiar and concrete topics. Short and simple texts, for example, personal or routine business letters or faxes, most common signs and notices, classified ads, etc.`;
      writing_prompt = `Usually simple texts.
For example, simple personal letters, postcards, messages, notes, simple ads, and forms.
Texts that typically describe immediate needs, personal events, familiar places, hobbies, work, etc.
Texts usually composed of short elementary sentences.
Ability to use the most frequent connectors (for example: and, but, because) to link sentences.`;
      speaking_prompt = ` Can simply describe or present people, lifestyles, common activities, and likes or dislikes using short sequences of words or unconnected sentences.`;
      rule_1 = `- Grammatical structures:
                  • Present tense remains dominant, but introduction of past and future tenses to situate events over time, depending on their simplicity in the target language.
                  • Limited introduction of the most common past and future tenses (e.g., passé composé in French, past simple in Spanish, preterite in English).
                  • Use of time expressions to indicate chronology (e.g., "yesterday", "tomorrow").
                - Restrictions:
                  • No complex past or future tense forms. Only essential tenses in the taught language.
                  • No structures requiring an advanced mood (e.g., subjunctive in French, Konjunktiv II in German).
                  • Avoid overly complex syntax; prioritize short and simple sentences.`;
    }
    if (body.class.language_level === 'B1') {
      audio_prompt = `Audio or transcript of 500 to 600 words, strictly adapted to the course context and theme and corresponding to B2 level: All types of speech on familiar topics. Lectures, media programs, and films.
For example, technical discussions, reports, live interviews.`;
      reading_prompt = `Text of 300 to 350 words, adapted to the course context and theme and corresponding to B1 level: Simple and direct factual texts on topics related to personal interests. Common documents such as letters, brochures, and short official documents. Simple and direct press articles on familiar topics and descriptions of facts. Clearly written argumentative texts. Personal letters expressing feelings and wishes. Clear and direct instructions, clearly written for equipment.`;
      writing_prompt = `A coherent and understandable non-complex text where elements are connected.
Ability to convey simple information to friends, staff, etc., in daily life.
Ability to express simple and direct ideas without omitting anything.
Ability to give news, express thoughts on abstract or cultural topics such as cinema, music, etc.
Ability to describe in detail experiences, feelings, and facts.`;
      speaking_prompt = `Can provide a relatively fluent, direct, and clear description on various topics related to their field, structuring their speech in a linear enumeration.`;
      rule_1 = `- Grammatical structures:
                  • Ability to express opinions, but with still limited development.
                  • Mastery of the most common past and future tenses, allowing for storytelling and planning.
                  • Gradual introduction of more varied constructions, including simple subordinate clauses.
                - Restrictions:
                  • No detailed argumentation: ideas remain structured simply.
                  • Limited use of complex moods: no advanced use of subjunctive or conditional for nuanced expressions.
                  • Avoid overly sophisticated phrasing; maintain clarity and accessibility.`;
    }
    if (body.class.language_level === 'B2') {
      audio_prompt = `Audio or transcript of 500 to 600 words, strictly adapted to the course context and theme and corresponding to B2 level: All types of speech on familiar topics. Lectures, media programs, and films.
For example, technical discussions, reports, live interviews.`;
      reading_prompt = `Text of 425 to 450 words, adapted to the course context and theme and corresponding to B2 level: Correspondence related to personal interests, including specialized articles outside one’s domain and highly specialized sources within one’s field. Articles and reports on current issues written from a specific perspective.`;
      writing_prompt = `A variety of different texts.
Ability to effectively convey news and opinions and respond to those of others.
Ability to use a variety of linking words to clearly indicate the relationship between ideas.
Spelling and punctuation are reasonably correct.`;
      speaking_prompt = `Can systematically organize a description or presentation by highlighting key points and relevant elements.
Can develop a detailed presentation or talk on a wide range of topics related to their area of interest, structuring and justifying ideas with supporting arguments and relevant examples.`;
      rule_1 = `- Grammatical structures:
                 • Ability to argue and justify ideas with greater fluency.
                 • Use of almost all verb tenses, except for the most complex ones in the language.
                 • Introduction of more elaborate structures, such as varied subordinate clauses and nuanced moods.
                - Restrictions:
                 • Limit highly advanced grammatical forms: rarely used tenses, literary phrasing.
                 • Avoid excessively sophisticated formulations in standard language; prioritize natural usage.
              `;
    }
    if (body.class.language_level === 'C1') {
      audio_prompt = `Audio or transcript of 600 to 700 words, strictly adapted to the course context and theme and corresponding to C1 level: Oral discourse in general. Lectures, discussions, and debates. Public announcements. Complex technical information. Recorded documents and films.
For example, conversations between native speakers.`;
      reading_prompt = `Text of 500 to 600 words, adapted to the course context and theme and corresponding to C1 level: A wide range of complex texts of a social, professional, or academic nature. Complex instructions on an unfamiliar machine or on a procedure outside one’s field.`;
      writing_prompt = `A variety of different texts.
Ability to express oneself with clarity and precision, using language flexibly and effectively.
Ability to produce clear, fluent, and well-structured writing that demonstrates mastery of organizational patterns, connectors, and linking devices.`;
      speaking_prompt = `Can present or describe a complex topic by integrating additional arguments and developing specific aspects to reach a relevant conclusion.`;
      rule_1 = `- Grammatical structures:
                 • Mastery of complex structures, including multiple subordinate clauses and advanced passive constructions.
                 • Appropriate use of moods and verb tenses to express subtle nuances, such as the subjunctive or conditional where applicable.
                 • Effective use of logical connectors to structure coherent and detailed arguments.
              `;
    }
    if (body.class.language_level === 'C2') {
      audio_prompt = `Audio or transcript of 600 to 700 words, strictly adapted to the course context and theme and corresponding to C2 level: Any spoken language, whether live or recorded. Specialized lectures and presentations.`;
      reading_prompt = `Text of 600 to 700 words, adapted to the course context and theme and corresponding to C2 level: A wide range of long and complex texts—practically all forms of writing. Literary or non-literary works, abstract, structurally complex, or widely familiar texts.`;
      writing_prompt = `A variety of different texts.
Ability to convey subtle shades of meaning with precision.
Ability to write persuasively.
Ability to produce coherent and structured texts using the full range of organizational models and linking structures appropriately and completely.`;
      speaking_prompt = `Can produce an elaborate, fluent, and effectively structured speech, making it easier for the audience to identify and remember key points.`;
      rule_1 = `- Grammatical structures:
                 • Ability to use all grammatical structures of the language fluently and accurately, including idiomatic forms and colloquial expressions.
                 • Flexibility in adapting register and style according to the context and audience.
                 • Skill in reformulating complex ideas and concepts clearly and concisely.
              `;
    }

    if (body.assignment_type.assignment === 'Linguistic') {
      sub_prompt = `Generate ${language} language exercises in ${language}, adapted to a ${body.class.language_level} and students aged ${body.class.age_learner}, in connection with the theme ${body.content.assessment_content} and aligned with the objectives mentioned above. Vary the formats by including: 
      - Multiple-choice questions (MCQs) (three answer choices)
      - Fill-in-the-blank exercises (words to complete)
      - Sentence or text rewriting/transformation (grammatical or lexical modification)
      - Matching exercises (linking words/definitions or expressions/meanings)
      - Sentence reordering exercises (placing words in the correct order)
The exercises should assess grammar, conjugation, syntax, and vocabulary while ensuring coherence with the pedagogical objective and the targeted level.`;
    }
    if (body.assignment_type.assignment === 'Skills Based') {
      sub_prompt = `Generate ${language} language exercises in ${language}, adapted to a ${body.class.language_level} and students aged ${body.class.age_learner}, in connection with the theme ${body.content.assessment_content} and aligned with the objectives mentioned above. Alternate between skills and repeat some if necessary to reach the total number of exercises requested. Include only exercises focused on communication, without specific grammar, syntax, or vocabulary exercises. Integrate the following formats:
- Listening comprehension: ${audio_prompt}
- Reading comprehension: ${reading_prompt}
- Writing production: ${writing_prompt}
- Speaking production: ${speaking_prompt}
Please strictly follow the following rules:
${rule_1}
`;
    }
    if (body.assignment_type.assignment === 'Mixed') {
      sub_prompt = `Generate ${language} language exercises in ${language}, adapted to a ${body.class.language_level} and students aged ${body.class.age_learner}, in connection with the theme ${body.content.assessment_content} and aligned with the objectives mentioned above. Include at least one exercise for each communicative skill and complete the set with grammar, syntax, and vocabulary exercises to reach the total number of exercises requested. Integrate the following formats:
Communicative skills:
- Listening comprehension: ${audio_prompt}
- Reading comprehension: ${reading_prompt}
- Writing production: ${writing_prompt}
- Speaking production: ${speaking_prompt}
Linguistic exercises:
- Multiple-choice questions (MCQs) (three answer choices)
- Fill-in-the-blank exercises (words to complete)
- Sentence or text rewriting/transformation (grammatical or lexical modification)
- Matching exercises (linking words/definitions or expressions/meanings)
- Sentence reordering exercises (placing words in the correct order)
Please strictly follow the following rules:
${rule_1}.`;
    }
    user_prompt = `Create assignment questions for your students based on the following details:
1. Lesson Information
- Lesson Title: ${body.lesson.title}
- Lesson Type: ${body.lesson.lessontype}
- Communication Objective: ${body.lesson.objectives}
- Language Content: ${body.lesson.languagecontent}
2. Class Information
- Class Name: ${body.class.class_name}
- Age Group: ${body.class.age_learner}
- Subject Name: ${body.class.subject}
- English Language Level: ${body.class.language_level}
3. Assignment Information
- Type: ${body.assignment_type.type}
- Evaluation Type: ${body.assignment_type.assignment}
- Important Information: ${body.content.important_info}
- Assignment Content: ${body.content.assignment_content}
- Number of Questions: ${body.grading_system.questions_number}
4. Requirements:
- ${sub_prompt}
- Please create ${body.grading_system.questions_number} questions for each problem.
- Make the assignment adaptable for individual student levels.
Add:
Do not repeat the same exercise twice; vary the formats and instructions.
Always adapt to the age and language level of the class.
          `;
    console.log(system_prompt);
    console.log('=================================');
    console.log(user_prompt);

    // Create stream from OpenAI
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
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
    });

    // Create a ReadableStream that will be sent to the client
    const textEncoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(
              textEncoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
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
  } catch (error) {
    console.error('Error generating Assignment:', error);
    return NextResponse.json(
      { error: 'Failed to generate Assignment ' },
      { status: 500 }
    );
  }
}
