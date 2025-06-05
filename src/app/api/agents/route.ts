import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Agent = 'marketing' | 'strategy' | 'organization';
type TaskKind = 'text' | 'image';

interface AgentRequest {
  agent: Agent;
  function: string;
  inputs: Record<string, any>;
  task?: TaskKind;
}

// Agent-specific system prompts
const systemRoles: Record<Agent, string> = {
  marketing:
    'You are a marketing assistant that creates content, ads, and strategy plans.',
  strategy:
    'You are a business strategist who helps define growth, brand, and positioning.',
  organization:
    'You are a productivity expert creating checklists, workflows, and planners.',
};

const multiOutputFunctions: Record<Agent, string[]> = {
  marketing: ['Social Post', 'Story Creation'],
  strategy: [],
  organization: [],
};

// Dynamically generate a GPT-friendly prompt
export function buildPrompt(
  agent: Agent,
  func: string,
  inputs: Record<string, any>
): string {
  switch (agent) {
    case 'marketing':
      switch (func) {
        case 'Content-Calendar':
          return `Create a monthly content calendar for ${inputs.brandName}, a brand in the ${inputs.industry} industry. 
                  The calendar should align with the brand's business goals, such as ${inputs.businessGoals}. 
                  Suggest post ideas for each week that are tailored to the selected platforms: ${inputs.platforms.join(', ')}. 
                  Include a balance of promotional, educational, and engaging content that helps the brand grow online and connect with its audience. 
                  The calendar should follow a posting frequency of ${inputs.postFrequency}, and ensure content diversity throughout the period. 
                  Make sure the suggestions are platform-specific and follow current trends.`;

        case 'Social-Post':
          return `Write a high-performing social media post for ${inputs.brandName}, a company in the ${inputs.industry} industry. 
                  The post should align with the business goals: ${inputs.businessGoals}, and be crafted for the following platforms: ${inputs.platforms.join(', ')}. 
                  It must appeal to the target audience, which consists of ${inputs.targetAudience}, and use a ${inputs.tone} tone of voice. 
                  Highlight the key product or service features: ${inputs.productDescription}, while making the message concise and engaging. 
                  The post should encourage interaction and match the style of each platform. ${inputs.includeImage ? 'Also, suggest an appropriate image idea that complements the message.' : ''}`;
        
        case 'Story-Creation':
          return `Craft a compelling short-form story or ad narrative for ${inputs.brandName}, operating in the ${inputs.industry} sector. 
                  The story should support the brand's business goals: ${inputs.businessGoals}, 
                  and clearly communicate the value of its product: ${inputs.productDescription}. 
                  Write it to engage ${inputs.targetAudience} using a ${inputs.tone} tone, and include the following keywords naturally: ${inputs.keywords.join(', ')}. 
                  The story should align with the advertising objective: ${inputs.adObjective}, whether it's generating awareness, driving clicks, or converting leads. 
                  Keep the structure emotionally appealing, with a clear hook, problem, and resolution. 
                  ${inputs.includeImage ? 'Include a suggestion for an image that enhances the story visually.' : ''}`;

        case 'Ad-Copy':
          return `Write persuasive ad copy for ${inputs.brandName}, a business in the ${inputs.industry} industry. 
                  The copy should promote ${inputs.productDescription} and speak directly to ${inputs.targetAudience}. 
                  Use a ${inputs.tone} tone that resonates with this audience and supports the advertising objective: ${inputs.adObjective}. 
                  Integrate the following keywords in a natural and effective way: ${inputs.keywords.join(', ')}. 
                  Make sure the copy is optimized for the selected platforms: ${inputs.platforms.join(', ')}, considering their tone, format, and character limits. 
                  Include a strong call-to-action that motivates the audience to take the next step.`;

        case 'SEO-Optimization':
          return `Optimize a product or service description for SEO for ${inputs.brandName}, a company in the ${inputs.industry} space. 
                  The content should focus on ${inputs.productDescription} and target ${inputs.targetAudience}. 
                  Ensure it fits the tone of voice: ${inputs.tone}, and is suitable for digital platforms like ${inputs.platforms.join(', ')}. 
                  Incorporate relevant SEO practices such as keyword placement, meta description suggestions, and scannable formatting. 
                  The result should help the content rank better in search engines and attract qualified traffic. 
                  Make the language both search-engine friendly and naturally engaging to readers.`;
      }
      break;

    case 'organization':
      switch (func) {
        case 'daily-checklist':
          return `Create a personalized daily checklist for a ${inputs.role} who works ${inputs.workingHours} per day. 
                  The checklist should cover responsibilities like: ${inputs.responsibilities.join(', ')} and include both unique and recurring tasks such as: ${inputs.tasks.join(', ')} and ${inputs.recurringTasks.join(', ')}. 
                  Structure the checklist by time slots or priority to improve focus and efficiency. 
                  Also, consider collaboration with team members: ${inputs.teamMembers.join(', ')} when assigning or planning tasks. 
                  Make sure the checklist balances work responsibilities with breaks or transitions. It should help the role stay productive and on track without being overwhelming.`;

        case 'weekly-planner':
          return `Generate a structured weekly planner for a ${inputs.role} with ${inputs.workingHours} working hours per week. 
                  This person is responsible for: ${inputs.responsibilities.join(', ')}, and they collaborate with: ${inputs.teamMembers.join(', ')}. 
                  The planner should help accomplish the following weekly goals: ${inputs.weeklyGoals.join(', ')}. 
                  Organize the schedule to include recurring tasks: ${inputs.recurringTasks.join(', ')} and allocate focused time for deep work, meetings, and collaboration. 
                  Each day should have a purpose and help the role prioritize important outcomes. 
                  The planner must be practical, time-aware, and adaptable for unexpected tasks.`;


        case 'task-delegation':
          return `Design a task delegation strategy for a ${inputs.role} who oversees the following responsibilities: ${inputs.responsibilities.join(', ')}. 
                  The goal is to delegate the tasks: ${inputs.tasks.join(', ')} efficiently among the team: ${inputs.teamMembers.join(', ')}. 
                  Provide a delegation plan that assigns tasks based on skills, workload balance, and deadlines. 
                  The deadline for task completion is ${inputs.deadline}, so ensure time sensitivity is factored in. 
                  Suggest communication checkpoints and clear ownership to ensure accountability. 
                  The plan should help the role stay focused on high-impact work while empowering team members.`;

        case 'support-workflow':
          return `Create a support workflow for a ${inputs.role} working with a team of: ${inputs.teamMembers.join(', ')}. 
                  This workflow should handle customer interactions across these channels: ${inputs.customerChannels.join(', ')}. 
                  It must efficiently address common customer issues such as: ${inputs.commonIssues.join(', ')}. 
                  Design the flow to route inquiries, assign support roles, and provide standard responses or escalation procedures. 
                  Include a structure for ticket management, response time benchmarks, and customer satisfaction follow-ups. 
                  The goal is to streamline support while keeping the experience smooth and responsive.`;

        case 'sop-template':
          return `Generate a Standard Operating Procedure (SOP) template for a ${inputs.role} who is responsible for: ${inputs.responsibilities.join(', ')}. 
                  The SOP should include steps for recurring tasks: ${inputs.recurringTasks.join(', ')} 
                  and support consistent service across customer channels: ${inputs.customerChannels.join(', ')}. 
                  Each SOP section should have a clear title, step-by-step actions, tools/resources needed, and escalation points. 
                  Make it easy for new team members to follow and ensure compliance. 
                  This SOP should also include notes or tips for improving task consistency and reducing service errors.`;
      }
      break;

    case 'strategy':
      switch (func) {
        case 'brand-positioning':
          return `Develop a comprehensive brand positioning strategy for ${inputs.businessName}. 
                  Start by aligning the strategy with the mission: "${inputs.missionStatement}", 
                  and integrate the brand's core values: ${inputs.brandValues.join(', ')}. 
                  Analyze how the brand differentiates itself from competitors such as: ${inputs.competitors.join(', ')}. 
                  Clearly define what makes the brand unique, its tone of voice, and the emotional or practical promise it delivers to customers. 
                  This positioning should guide all messaging, visuals, and marketing to ensure consistency and recognition. 
                  Include key attributes and how they appeal to the target audience.`;

        case 'audience-definition':
          return `Define the core target audience for ${inputs.businessName} based on its product or service: "${inputs.productOverview}". 
                  Describe the ideal customer by demographics, psychographics, behaviors, and motivations as outlined in: ${inputs.audienceDescription}. 
                  Address their core pain points: ${inputs.painPoints.join(', ')} and what they're seeking from a solution. 
                  Also include how they currently interact with content or brands through these channels: ${inputs.channels.join(', ')}. 
                  The definition should help in shaping product design, messaging tone, and outreach campaigns. 
                  The goal is to give a crystal-clear view of who the brand is serving and why.`;

        case 'value-proposition':
          return `Craft a clear and compelling value proposition for ${inputs.businessName}. 
                  The product or service offers: "${inputs.productOverview}", and serves customers described as: ${inputs.audienceDescription}. 
                  Address how the brand uniquely solves the following pain points: ${inputs.painPoints.join(', ')}. 
                  Emphasize the core benefits offered: ${inputs.benefits.join(', ')}, and explain why these benefits matter most to the target audience. 
                  The value proposition should be concise, impactful, and usable in pitches, websites, and ads. 
                  Make sure it communicates both the emotional and functional value in a single, easy-to-grasp statement.`;

        case 'pricing-strategy':
          return `Design a strategic pricing plan for ${inputs.businessName}, whose mission is: "${inputs.missionStatement}". 
                  The base cost of the offering is ${inputs.baseCost}, and comparable offerings from competitors (${inputs.competitors.join(', ')}) are priced at: ${inputs.competitorPricing}. 
                  Factor in the unique benefits the product offers: ${inputs.benefits.join(', ')}, and the brand's market positioning goals. 
                  Recommend pricing tiers, models (e.g., subscription, freemium, one-time), and explain the rationale. 
                  The strategy should reflect brand value perception while remaining competitive and profitable. 
                  Also consider psychological pricing techniques and market elasticity.`;

        case 'growth-plan':
          return `Create a detailed growth plan for ${inputs.businessName}, which is currently in the "${inputs.stage}" stage. 
                  The company's mission is: "${inputs.missionStatement}", and growth goals include: ${inputs.goals.join(', ')}. 
                  The available budget is ${inputs.budget}, and the business currently uses the following channels: ${inputs.channels.join(', ')}. 
                  Propose scalable strategies across product, marketing, sales, and partnerships. 
                  Suggest how to maximize performance with the allocated budget using content types like: ${inputs.contentTypes.join(', ')}. 
                  This plan should focus on realistic, trackable actions over the next quarter or year.`;


        case 'content-plan':
          return `Develop a content strategy for ${inputs.businessName} aligned with the goals: ${inputs.goals.join(', ')}. 
                  The business is currently in the "${inputs.stage}" stage and uses the following channels for distribution: ${inputs.channels.join(', ')}. 
                  Recommend content types such as: ${inputs.contentTypes.join(', ')} that best serve the audience at this stage. 
                  Ensure that the plan supports brand awareness, engagement, lead generation, or customer education depending on the business's primary objectives. 
                  Provide guidance on content themes, publishing frequency, and storytelling approach. The final plan should be actionable, scalable, and aligned with the brand's voice and goals.`;
      }
      break;
  }

  return `Help generate output for "${func}" with inputs: ${JSON.stringify(inputs)}.`;
}


function buildImagePrompt(agent: Agent, func: string, inputs: Record<string, any>): string {
  if (agent === 'marketing') {
    switch (func) {
      case 'Social-Post':
        return `Design a visually striking social media post for ${inputs.brandName}, a business in the ${inputs.industry} industry. 
                The graphic should clearly reflect the brand's ${inputs.tone} tone and be optimized for platforms like ${inputs.platforms.join(', ')}. 
                Visually communicate the essence of the product: "${inputs.productDescription}", using illustrative, symbolic, or lifestyle elements that will resonate with ${inputs.targetAudience}. 
                The design should align with the business goals: ${inputs.businessGoals}, and visually highlight any central themes or actions the brand wants to promote. 
                Include stylistic cues that match trending aesthetics within the industry, and make sure it's tailored for engagement — think bold, readable layouts, and shareable visuals. 
                If relevant, incorporate subtle branding elements like logos, slogans, or a consistent color palette to build recognition.`;

      case 'Story-Creation':
        return `Create a compelling mobile-first story design for ${inputs.brandName}, tailored for Instagram or Facebook Stories. 
                The brand operates in the ${inputs.industry} industry and aims to achieve: ${inputs.businessGoals}, with this content reflecting a ${inputs.tone} tone. 
                Use ${inputs.productDescription} as the core focus, and visualize it across 3-5 vertical frames using lifestyle imagery, aspirational scenes, or conceptual illustrations. 
                Include graphical elements or overlays inspired by the following keywords: ${inputs.keywords.join(', ')} to strengthen visual storytelling. 
                Each frame should be engaging on its own, but together they should form a cohesive story that captivates ${inputs.targetAudience}. 
                The final frame should include a strong, visual CTA matching the ad objective: "${inputs.adObjective}" (e.g., “Swipe Up”, “Try Now”, “Learn More”).`;
    }
  }

  return `A visual representation of ${func} for ${inputs.inputs.brandName || inputs.businessName}.`;
}


function parseOutput(text: string) {
  const lines = text.trim().split('\n').filter(Boolean);
  return lines.length > 1 ? { list: lines } : { text };
}

// Main POST handler
export async function POST(req: Request) {
  try {
    const {
      agent,
      function: func,
      inputs,
      task = 'text',
    } = (await req.json()) as AgentRequest;

    if (!agent || !func || !inputs || !systemRoles[agent]) {
      return NextResponse.json(
        { error: 'Missing or invalid data' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(agent, func, inputs);
    const needsImage = multiOutputFunctions[agent]?.includes(func);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemRoles[agent] },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message?.content || 'No response.';
    const result = parseOutput(content);

    if (needsImage) {
      // Optional: You can extract a prompt from the GPT response if structured
      const imagePrompt = buildImagePrompt(agent, func, inputs);
      const image = await openai.images.generate({
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
      });

      return NextResponse.json({
        type: 'combined',
        script: result,
        imageUrl: image.data[0].url,
      });
    }

    return NextResponse.json({ type: 'text', result });
  } catch (err: any) {
    console.error('Agent API error:', err);
    return NextResponse.json(
      { error: err.message || 'Unexpected error' },
      { status: 500 }
    );
  }
}
