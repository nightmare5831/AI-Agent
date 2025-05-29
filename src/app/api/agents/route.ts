import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type AgentType = 'marketing' | 'strategy' | 'organization';
type TaskType = 'text' | 'image';

interface AiTaskRequest {
  agentType: AgentType;
  userPrompt: string;
  taskType?: TaskType;
}

const systemPrompts: Record<AgentType, string> = {
  marketing: 'You are a marketing assistant who creates creative posts and campaigns.',
  strategy: 'You are a business strategist who helps build brand and growth plans.',
  organization: 'You are a productivity coach who generates checklists, briefings, and plans.',
};

export async function POST(req: Request) {
  try {
    const { agentType, userPrompt, taskType = 'text' } = (await req.json()) as AiTaskRequest;

    if (!agentType || !userPrompt || !systemPrompts[agentType]) {
      return NextResponse.json({ error: 'Invalid or missing request fields' }, { status: 400 });
    }

    // 🖼️ Image Generation with DALL·E
    if (taskType === 'image') {
      const imageResponse = await openai.images.generate({
        prompt: userPrompt,
        n: 1,
        size: '1024x1024',
      });

      return NextResponse.json({
        type: 'image',
        imageUrl: imageResponse.data[0].url,
      }, { status: 200 });
    }

    // ✍️ Text Completion with GPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompts[agentType] },
        { role: 'user', content: userPrompt },
      ],
    });

    const result = completion.choices[0].message?.content ?? 'No response generated';
    return NextResponse.json({ type: 'text', result }, { status: 200 });

  } catch (error: any) {
    console.error('OpenAI Error:', error);
    return NextResponse.json({ error: error?.message || 'Unexpected error' }, { status: 500 });
  }
}
