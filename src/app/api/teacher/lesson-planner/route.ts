import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
// import { writeFile } from 'fs/promises';
// import path from 'path';

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

const conditionNames = {
  adhd: 'ADHD (Attention Deficit Hyperactivity Disorder)',
  autism: 'Autism',
  downSyndrome: 'Down Syndrome',
  dyslexia: 'Dyslexia',
  hearingImpairment: 'Hearing Impairment',
  visualImpairment: 'Visual Impairment',
} as const;

const skills = [
  'reading_comprehension',
  'listening_comprehension',
  'writing_production',
  'speaking_production',
  'written_interaction',
  'oral_interaction',
  'mediation',
  'balanced',
];

export async function POST(req: Request) {
  let triggerPrompt = '';
  // let digitaltoolPrompt = '';
  let searchedURL = '';
  let searchedURL1 = '';
  let grammarPrompt = '';
  let endingRitualPrompt = '';
  let text = '';
  let text1 = '';
  let startingRetual_text = '';
  try {
    const body = await req.json();
    const { language } = body;

    const targetLanguage = languageMap[language] || 'English';

    // Format functions
    const formatSkill = (skill: string) => {
      if (skill === 'balanced') {
        return 'balance the skills';
      }
      return skill
        .split('_')
        .map((word) => word.toLowerCase())
        .join(' ');
    };
    console.log(body.prerequisites);

    const formattedText = `Prioritized Skills of language content are ${body.prerequisites}`;

    const formatActivity = (activity: string) => {
      return activity
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    // Safely format skills and activities
    const formatArrayToString = (
      arr: string[] | undefined,
      formatFn: (str: string) => string
    ) => {
      if (!Array.isArray(arr) || arr.length === 0) return '';
      return arr.map(formatFn).join(', ');
    };

    // Format communication activities
    const activitiesText = formatArrayToString(
      body.communication,
      formatActivity
    );
    const finalCommunicationPrompt = activitiesText
      ? `Communication Activities are ${activitiesText}`
      : 'Communication Activities are not specified';

    // Determine document type
    let documentType = 'Semi Authentic'; // default value
    const languageLevel = body.classroom?.language_level;

    if (languageLevel) {
      if (languageLevel === 'B1') {
        documentType = 'Fabricated';
      } else if (['B2', 'C1', 'C2'].includes(languageLevel)) {
        documentType = 'Authentic';
      }
    }

    if (body.document_format === 'video') {
      const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${encodeURIComponent(body.title)}&key=${process.env.YOUTUBE_API_KEY}`;
      const response = await fetch(SEARCH_URL);
      const data = await response.json();
      const videoLinks = data.items.map((item: any) => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
      searchedURL = videoLinks[0].url;
      searchedURL1 = videoLinks[1].url;
    }
    if (body.document_format === 'audio') {
      const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=audio&maxResults=1&q=${encodeURIComponent(body.title)}&key=${process.env.YOUTUBE_API_KEY}`;
      const response = await fetch(SEARCH_URL);
      const data = await response.json();
      const audioLinks = data.items.map((item: any) => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
      searchedURL = audioLinks[0].url;
    }
    if (body.document_format === 'text') {
      const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
        body.title
      )}&key=${process.env.CUSTOM_SEARCH_API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}`;
      const response = await fetch(googleSearchUrl);
      const data = await response.json();

      // Filter out YouTube links and map the remaining items
      const textLinks = data.items
        .filter((item: any) => !item.link.includes('youtube.com'))
        .map((item: any) => ({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
        }));

      // Make sure we have results after filtering
      if (textLinks.length > 0) {
        searchedURL = textLinks[0].link;
      } else {
        // Handle case where all results were YouTube links
        searchedURL = null; // or provide a default value
      }
    }

    if (body.document_format === 'image') {
      const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(body.title)}&key=${process.env.CUSTOM_SEARCH_API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&searchType=image`;
      const response = await fetch(googleSearchUrl);
      const data = await response.json();
      const imageLinks = data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        image: item.image.thumbnailLink || item.link,
      }));
      searchedURL = imageLinks[0].link;
    }
    triggerPrompt = `Please refer to the following link: ${searchedURL}`;

    //================================Equipment====================
    // if (body.classroom.equipment.internet === false) {
    //   digitaltoolPrompt =
    //     'An interactive activity to mobilize knowledge (quiz, riddles, collective game, etc.).';
    //   endingRitualPrompt = `• Consolidation of learning or introduction of the next theme, according to what is indicated below (never invent the theme).
    // '${body.ending_ritual.reviewContent.enabled ? body.ending_ritual.reviewContent.content : body.ending_ritual.introduceTheme.content}'
    // Provide examples of short and fun activities. Consider classroom equipment.`;
    // } else {
    //   digitaltoolPrompt =
    //     'An interactive activity to mobilize knowledge (quiz, riddles, collective game, etc.). Use of interactive digital tools (Kahoot, Quizlet Live, Wooclap, Mentimeter, Wordwall, Quizizz, Learningapps, etc.) according to the technical equipment available indicated below.';
    //   endingRitualPrompt = `• Consolidation of learning or introduction of the next theme, according to what is indicated below (never invent the theme).
    //         '${body.ending_ritual.reviewContent.enabled ? body.ending_ritual.reviewContent.content : body.ending_ritual.introduceTheme.content}'
    //         • Short and playful activity (word cloud, mini-interactive game, riddle). Consider classroom equipment.`;
    // }

    //================================ Grammar =====================================
    if (body.grammar === 'deductive') {
      grammarPrompt = `Provide a deductive explanation of the language content of the lesson information provided above, and provide a variety of practice problems. Also provide examples of vocabulary and drill activities appropriate for students who are ${body.classroom.age_learner} years old and have a level of English of ${body.classroom.language_level}.`;
    }
    if (body.grammar === 'inductive') {
      grammarPrompt = `Provide a inductive explanation of the language content of the lesson information provided above, and provide a variety of practice problems. Also provide examples of vocabulary and drill activities appropriate for students who are ${body.classroom.age_learner} years old and have a level of English of ${body.classroom.language_level}.`;
    }

    //============================= Lesson Type =====================================
    if (body.lessontype === 'Private Lesson') {
      const students_list = body.classroom.students
        .map((student: any, index: any) => `${student.full_name}`)
        .join(', ');
      text =
        'Please create individual lesson plans for the following students.\n';
      text +=
        'When creating lesson plans, you must indicate the names of the students.\n';
      text += `There are students named ${students_list} in the ${body.classroom.class_name} classroom.\n\n`;
      body.classroom.students.forEach((student: any) => {
        // Find learning consideration that is true
        const learningConsideration = Object.entries(
          student.learningconsiderations
        ).find(([_, value]) => value === true);

        const condition = learningConsideration
          ? conditionNames[
              learningConsideration[0] as keyof typeof conditionNames
            ]
          : 'No specific learning considerations';

        // Add student section
        text += `- ${student.full_name} has ${condition} and his level is "Average."\n`;
        text += "This student's skills are:\n";

        // Add skills
        text += `Grammar: ${student.grammar}/10\n`;
        text += `Vocabulary: ${student.vocabulary}/10\n`;
        text += `Phonetics: ${student.phonetics}/10\n`;
        text += `Listening: ${student.listening}/10\n`;
        text += `Speaking: ${student.Speaking}/10\n`;
        text += `Reading: ${student.reading}/10\n`;
        text += `Writing: ${student.writing}/10\n`;
        text += `Interacting: ${student.interacting}/10\n\n`;
      });
      text1 = `Based on the lesson information and classroom information above, create a detailed individual lesson plan for each students in classroom '${body.title}', but follow this structure strictly:`;
    } else {
      text1 =
        'Based on the class information and classroom information mentioned above, please create a detailed lesson plan according to the following format.';
    }
    //==================================Starting Ritual================================
    if (body.beginning_ritual.reviewContent.enabled) {
      startingRetual_text = `Starting ritual to review content: ${body.beginning_ritual.reviewContent.content}`;
    } else {
      startingRetual_text = `Starting ritual to introduce: ${body.beginning_ritual.introduceTheme.content}`;
    }
    //=================================Ending Ritual===================================
    if (body.ending_ritual.reviewContent.enabled) {
      endingRitualPrompt = `Ending ritual to review content: ${body.ending_ritual.reviewContent.content}`;
    } else {
      endingRitualPrompt = `Ending ritual to introduce: ${body.ending_ritual.introduceTheme.content}`;
    }
    const prompt = `Information about lesson and classroom is as follows:
- Lesson information
Lesson title: ${body.title}
Classroom name: ${body.classroom.class_name}
Lesson type: ${body.lessontype}(One-on-One) with 'Bob' student
Communicative objectivies: ${body.objectives}
Linguistic content to learn: ${body.languagecontent}
Language competence to prioritize: ${formattedText}
Learning path: ${body.learningpath}
Starting ritual: ${startingRetual_text}
vocabulary: ${body.vocabulary}
Phonetics: ${body.phonetics}
Communicative activities: ${body.communication
      .map((word: any, index: any) => `${word}`)
      .join(', ')}
Final task: ${body.finaltask}
End ritual: ${body.ending_ritual.reviewContent.enabled ? body.ending_ritual.reviewContent.content : body.ending_ritual.introduceTheme.content}
- Classroom Information
Classroom name: ${body.classroom.class_name}
Age of learners: ${body.classroom.age_learner}
Subject: ${body.classroom.subject}
Language level: ${body.classroom.language_level}
Session duration: ${body.classroom.session_duration}
Class problems: discipline ${body.classroom.discipline}/10, Motivation ${body.classroom.lack_motivation}/10, Low attendance ${body.classroom.low_turnout}/10, lack of space ${body.classroom.lack_space}/10, cultural barrier ${body.classroom.cultural}/10
Equipment: phone ${body.classroom.equipment.phones}, Internet ${body.classroom.equipment.internet}, tablet ${body.classroom.equipment.tablets}, projector ${body.classroom.equipment.projector}, interactive board ${body.classroom.equipment.board}, television ${body.classroom.equipment.tv}.
${text}
${text1}
    
1.Beginning ritual
${startingRetual_text}
2.Trigger document
• First support serving as a trigger for the theme and learning objectives.
Starter Document
Type
•Authentic
•Fabricated
•Semi-authentic
Starter Document
Format
•Text
•Image
•Video
•Audio
${triggerPrompt}
• Always propose a short excerpt of the support as an example.
Authentic: Provide an existing link related to the lesson, 
the students' level, and age (do not invent).
• Written or oral comprehension:
 o General questions to capture the main idea.
 o Detailed questions to deepen understanding.
 
3.Linguistic exploitation
${grammarPrompt}
4.Complementary document
• Oral or written production activity according to the preferences indicated below.
${formattedText}
5.Phonetics activity
• Identify from the theme’s lexicon (or user preferences) sounds to work on. Provide examples and present the sound in the International Phonetic Alphabet in brackets.
• Phonetics exercise (listen and repeat, associated gestures) and playful version.
6.Oral interaction
• Activity: Create a role-playing scenario or a structured peer discussion adapted to the learners' level (${body.classroom.language_level}).
Students should work in pairs or small groups, with clear instructions:
Example: A student introduces their family using target vocabulary and grammar.
Follow-up: Peers ask and answer questions about family members' age and physical appearance.
• Give detailed instructions.
7.Mediation activity
• Activity aimed at developing mediation skills according to the CEFR, including reformulation, synthesis, explanation.
8.Final task
• Mobilization of acquired knowledge for a varied production (writing, presentation, etc.).
• Creative, collaborative, or individual activity.
• Allows assessing achievements and course objectives.
9.End ritual
${endingRitualPrompt}
• After each exercise or activity, indicate to use our "Differentiated Resource Generator" tool (+ active link to the tool) to design the activity.
10.Additional resources
• Provide concrete resource suggestions.
The principles that must be systematically respected are as follows:
• Logical progression between steps (clear pedagogical scenario).
• Clarity, precision, and adaptation to language level in instructions and examples.
• Always activate links and make URLs visible. If you don't have internet, try another option.
• In production activities, specify a realistic context.
• For each exercise or activity, provide a short example adapted to age and level.
• Never exploit the complementary document as a simple written production model. It must bring a different added value from the first support.
• Describe a concrete and contextualized task.
• Digital tools must be relevant: Wooclap for word clouds/polls, Wordwall or Learningapps for interactive games, Quizlet for flashcards, Kahoot or Quizizz for quizzes, etc.
• After each support (except video and additional resources), indicate to use our "Differentiated Resource Generator" tool (+ active link to the tool) to design the support. If the support is an audio, indicate using the "AI Audio Generator" tool. If the support is a video, provide an existing YouTube link (not invented) adapted to the theme, language, and level.
• At the end of the lesson plan, always finish with “Do you want to create a pedagogical project on this theme? Use our ‘Project Generator’ tool” (+ active link to the tool).
`;
    // const filename = 'lesson_prompt1.json';
    // const filePath = path.join(process.cwd(), 'result.json');
    // const jsonString = JSON.stringify(body, null, 2);
    // await writeFile(filePath, jsonString);

    // Create stream from OpenAI
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert educational consultant specializing in lesson planning. Provide detailed, practical, and engaging lesson plans that follow modern pedagogical principles. Generate the entire response in ${targetLanguage}.
          When creating a lesson plan, do not create special characters in the title.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
      temperature: 0.7,
    });

    // Create a ReadableStream
    const textEncoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
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
        } catch (error) {
          controller.error(error);
        }
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
    console.error('Error generating lesson plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate lesson plan' },
      { status: 500 }
    );
  }
}
