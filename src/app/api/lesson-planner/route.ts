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
    const {
      subject,
      level,
      duration,
      classroom,
      objectives,
      prerequisites,
      studentInfo,
      preferences,
      language,
    } = body;
    console.log(body);

    const targetLanguage = languageMap[language] || 'English';

    const prompt = `Create a detailed lesson plan for teaching ${subject} by strictly following this structure::
1.Beginning ritual
• An interactive activity to mobilize knowledge (quiz, riddles, collective game, etc.).
• Use of interactive digital tools (Kahoot, Quizlet Live, Wooclap, Mentimeter, Wordwall, Quizizz, Learningapps, etc.) according to the technical equipment available indicated below.
2.Trigger document
• First support (text, image, video, or audio according to what is indicated below) serving as a trigger for the theme and learning objectives.
• Always propose a short excerpt of the support as an example.
• Written or oral comprehension:
 o General questions to capture the main idea.
 o Detailed questions to deepen understanding.
3.Linguistic exploitation
• Grammar: Inductive or deductive presentation of the grammar point indicated below + varied exercises.
• Lexicon: Introduction of vocabulary on the theme adapted to the level and age + training activity.
4.Complementary document
• Second support related to the theme. Never repeat the type of trigger support.
• Oral or written production activity according to the preferences indicated below.
5.Phonetics activity
• Identify from the theme’s lexicon (or user preferences) sounds to work on. Provide examples and present the sound in the International Phonetic Alphabet in brackets.
• Phonetics exercise (listen and repeat, associated gestures) and playful version.
6.Oral interaction
• Role-playing adapted to the level or discussions in pairs or small groups with pooling, according to the preferences indicated below.
• Give detailed instructions.
7.Mediation activity
• Activity to work on mediation competence according to the CEFR (search, summarize, explain, help).
8.Final task
• Mobilization of acquired knowledge for a varied production (writing, presentation, etc.).
• Creative, collaborative, or individual activity.
• Allows assessing achievements and course objectives.
9.End ritual
• Consolidation of learning or introduction of the next theme, according to what is indicated below (never invent the theme).
• Short and playful activity (word cloud, mini-interactive game, riddle).
10.Additional resources
• Provide concrete resource suggestions. Give links only for YouTube videos. Do not invent. Verifiable source.
The principles that must be systematically respected are as follows:
• Logical progression between steps (clear pedagogical scenario).
• Clarity, precision, and adaptation to language level in instructions and examples.
• Always activate links and make URLs visible.
• In production activities, specify a realistic context.
• For each exercise or activity, provide a short example adapted to age and level.
• Never exploit the complementary document as a simple written production model. It must bring a different added value from the first support.
• Do not summarize the final task as “mobilization of acquired knowledge for a fluid presentation.” Describe a concrete and contextualized task.
• All links must be active and visible with their full URL.
• Digital tools must be relevant: Wooclap for word clouds/polls, Wordwall or Learningapps for interactive games, Quizlet for flashcards, Kahoot or Quizizz for quizzes, etc.
• After each exercise or activity, indicate to use our "Differentiated Resource Generator" tool (+ active link to the tool) to design the activity.
• After each support (except video and additional resources), indicate to use our "Differentiated Resource Generator" tool (+ active link to the tool) to design the support. If the support is an audio, indicate using the "AI Audio Generator" tool. If the support is a video, provide an existing YouTube link (not invented) adapted to the theme, language, and level.
• At the end of the lesson plan, always finish with “Do you want to create a pedagogical project on this theme? Use our ‘Project Generator’ tool” (+ active link to the tool).
- You must create a concrete plan using the parameters created by the teacher, as shown below.
Lesson theme: ${subject}. Level ${level}, Duration ${duration} minutes, 
Learning objective: ${objectives}. 
Prerequisites: ${prerequisites}. 
Student information: ${studentInfo} 
Teaching preference: ${preferences}
Class: age ${classroom.age_learner} years, subject ${classroom.subject}, level ${classroom.language_level}, Duration ${classroom.session_duration} minutes.
Class problems: discipline ${classroom.discipline}/10, Motivation ${classroom.lack_motivation}/10, Low attendance ${classroom.low_turnout}/10, lack of space ${classroom.lack_space}/10, cultural barrier ${classroom.cultural}/10, Equipment: phone ${classroom.phones}, Internet ${classroom.internet}, IWB ${classroom.board}, tablet ${classroom.tablets}, projector ${classroom.projector}, television ${classroom.tv}

`;

    // Create stream from OpenAI
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert educational consultant specializing in lesson planning. Provide detailed, practical, and engaging lesson plans that follow modern pedagogical principles. Generate the entire response in ${targetLanguage}.`,
        },
        {
          role: 'user',
          content: prompt,
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
    console.error('Error generating lesson plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate lesson plan' },
      { status: 500 }
    );
  }
}
