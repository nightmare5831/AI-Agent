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
        case 'content-calendar':
          return `Develop a strategic and well-structured monthly content calendar for ${inputs.brandName}, a company operating in the ${inputs.industry} industry. 
                  The calendar must align with the brand's business goals, including objectives like ${inputs.businessGoals}, and support consistent online growth and engagement. 
                  Provide weekly post suggestions that are platform-specific, with tailored messaging for ${inputs.platforms.join(', ')}, reflecting best practices for each channel. 
                  Ensure content variety by including a thoughtful mix of promotional posts (product/service highlights), educational posts (tips, how-tos, insights), and community-driven or interactive content (polls, user engagement, behind-the-scenes). 
                  The plan should adhere to the desired posting frequency: ${inputs.postFrequency}, maintaining a steady flow of content while avoiding audience fatigue. 
                  Highlight key themes or mini-campaigns throughout the month that support broader marketing objectives, seasonal trends, or upcoming events. 
                  Suggest content formats suitable for each platform, such as Reels for Instagram, carousels for LinkedIn, or short-form videos for TikTok. 
                  Incorporate relevant hashtags, content hooks, or storytelling angles where appropriate to improve reach and discovery. 
                  Each entry in the calendar should include a post idea or title, content type, platform, and suggested posting date for ease of execution. 
                  Overall, the calendar should feel cohesive, aligned with the brand's voice, and optimized for engagement, visibility, and long-term growth.`;

        case 'social-post':
          return `Craft a compelling and platform-optimized social media post for ${inputs.brandName}, a brand operating in the ${inputs.industry} industry. 
                  The post must directly support the business goals of ${inputs.businessGoals}, helping to drive visibility, engagement, or conversions as appropriate. 
                  Tailor the content for use across the following platforms: ${inputs.platforms.join(', ')}, ensuring that formatting, tone, and structure fit the norms of each. 
                  The post should resonate with the brand's target audience - ${inputs.targetAudience} - using a ${inputs.tone} voice that matches their preferences and expectations. 
                  Emphasize the key product or service features with a focus on value, uniqueness, and emotional appeal, drawing from this description: "${inputs.productDescription}". 
                  Use language that is concise, scroll-stopping, and actionable, while remaining authentic to the brand's identity and tone. 
                  Include a clear and compelling call to action that encourages likes, comments, shares, or conversions depending on the platform. 
                  Where appropriate, integrate trending hashtags, emojis, or cultural references that boost discoverability without appearing forced. 
                  The post should also be visually oriented - suggest appropriate formatting or visual cues to complement the copy style and enhance attention. 
                  ${inputs.includeImage ? 'Additionally, provide a creative suggestion for an image or visual concept that pairs well with the message and aligns with both brand identity and platform standards.' : ''}`;
        
        case 'story-creation':
          return `Craft a captivating, mobile-first short-form story or ad narrative for ${inputs.brandName}, a business in the ${inputs.industry} sector. 
                  The story should strongly align with the brand's core business goals: ${inputs.businessGoals}, whether focused on brand awareness, customer acquisition, or product promotion. 
                  Center the story around this product or service: "${inputs.productDescription}", showcasing its most compelling benefits and unique selling points. 
                  Structure the narrative with a strong hook to grab attention, followed by a relatable problem, and conclude with a clear, emotionally satisfying resolution. 
                  Use a ${inputs.tone} tone throughout to connect authentically with the brand's ideal audience: ${inputs.targetAudience}. 
                  Naturally incorporate the following keywords into the story: ${inputs.keywords.join(', ')}, using them to reinforce the core message and improve discoverability. 
                  Make sure the narrative flows seamlessly across platforms like Instagram Stories, Reels, or Facebook Story Ads, with each frame or section standing strong yet contributing to a cohesive whole. 
                  Align the story's framing with the advertising objective: "${inputs.adObjective}", whether that's to spark interest, encourage engagement, or drive immediate action. 
                  Keep the language emotionally engaging, easy to consume, and adaptable for both static and video-based formats. 
                  ${inputs.includeImage ? 'Also, include a visual direction or image suggestion that enhances the narrative and reflects the brand identity in a story-friendly layout.' : ''}`;

        case 'ad-copy':
          return `Write high-converting ad copy for ${inputs.brandName}, a brand in the ${inputs.industry} industry, designed to promote the following offering: ${inputs.productDescription}. 
                  The copy should speak directly to the needs, interests, and motivations of ${inputs.targetAudience}, and be written in a ${inputs.tone} tone that aligns with the brand voice and audience expectations. 
                  Clearly highlight what makes this product or service valuable or unique, focusing on the strongest benefit or solution it delivers. 
                  Integrate these keywords seamlessly into the message to improve relevance and visibility: ${inputs.keywords.join(', ')}. 
                  Ensure the ad copy matches the norms and best practices of the target platforms: ${inputs.platforms.join(', ')}, including length, formatting style, and content restrictions. 
                  The language should be engaging, emotionally compelling, and action-driven from the opening line to the call-to-action. 
                  Consider the stage of the customer journey and match the copy to the advertising objective: ${inputs.adObjective}, whether it's to build awareness, generate leads, or close sales. 
                  Use persuasive techniques like social proof, urgency, or exclusivity if appropriate, while maintaining authenticity. 
                  Structure the message for easy reading - use punchy sentences, bullet points (if applicable), and a strong hook. 
                  End with a clear, compelling call-to-action that motivates the reader to take immediate action, such as “Get Started Today”, “Shop Now”, or “Learn More”.`;

        case 'seo-optimization':
          return `Optimize the following product or service description for ${inputs.brandName}, a business operating in the ${inputs.industry} industry. 
                  The focus should be on promoting ${inputs.productDescription} in a way that appeals to ${inputs.targetAudience} while maintaining a ${inputs.tone} tone of voice consistent with the brand's communication style. 
                  Ensure the copy is tailored for high performance across digital platforms such as ${inputs.platforms.join(', ')}, taking into account current SEO best practices. 
                  Include strategic placement of keywords throughout the content without compromising natural readability or engagement. 
                  Suggest a compelling meta title and meta description that improve visibility in search engine results and boost click-through rates. 
                  Organize the content using scannable formatting - including subheadings, bullet points, or short paragraphs to improve readability. 
                  Use semantic variations of the main keywords to increase contextual relevance and improve overall search ranking. 
                  Ensure the optimized copy answers common search intents or questions related to the product or service, enhancing its value to readers and search engines. 
                  Emphasize clarity, originality, and relevance to help attract qualified traffic and reduce bounce rates. 
                  The final output should strike a balance between technical SEO effectiveness and natural, persuasive storytelling that resonates with human readers.`;
      }
      break;

    case 'organization':
      switch (func) {
        case 'daily-checklist':
          return `Create a personalized daily checklist for a ${inputs.role} who works ${inputs.workingHours} hours per day. 
                  The checklist should comprehensively cover their key responsibilities, including ${inputs.responsibilities.join(', ')}, and incorporate both unique tasks such as ${inputs.tasks.join(', ')} and recurring tasks like ${inputs.recurringTasks.join(', ')}. 
                  Organize the checklist by clearly defined time slots or priority levels to help improve focus, time management, and overall efficiency throughout the day. 
                  Ensure that the checklist includes scheduled breaks and transition periods to maintain productivity without causing burnout. 
                  Take into account collaboration opportunities with team members, specifically ${inputs.teamMembers.join(', ')}, by highlighting tasks that require coordination or handoffs. 
                  The checklist should balance individual work with teamwork and allow flexibility to adapt to any urgent or unexpected tasks. 
                  Provide a logical flow from morning to end-of-day activities to support a structured workday. 
                  Format the output so it can be easily exported as a downloadable PDF or CSV, facilitating daily use and review. 
                  Finally, aim for a practical and actionable checklist that empowers the role to stay on track, prioritize effectively, and achieve daily goals with confidence.`;

        case 'weekly-planner':
          return `Create a detailed and well-structured weekly planner for a ${inputs.role} who works ${inputs.workingHours} hours each week. 
                  This individual is accountable for the following key responsibilities: ${inputs.responsibilities.join(', ')}, 
                  and frequently collaborates with team members such as ${inputs.teamMembers.join(', ')} to ensure smooth workflow and communication. 
                  The planner should be designed to help accomplish the specified weekly goals: ${inputs.weeklyGoals.join(', ')}, by breaking them down into daily priorities that are clear and manageable. 
                  Integrate recurring tasks like ${inputs.recurringTasks.join(', ')} throughout the week to maintain consistency and reinforce routines. 
                  Allocate focused time blocks for deep work sessions, meetings, and collaborative activities to optimize productivity and balance different work modes. 
                  Ensure each day has a defined purpose, enabling the user to focus on impactful tasks and efficiently track progress. 
                  Include buffer periods for flexibility, allowing the planner to adapt to unexpected urgent tasks or changes in priorities without disrupting the overall schedule. 
                  The planner should be realistic in terms of time allocation, preventing overload and promoting sustainable work habits. 
                  Present the schedule in a clean, practical format suitable for both digital use and printable formats, enabling easy tracking and updates. Overall, the planner must support productivity, organization, and motivation throughout the entire week.`;

        case 'task-delegation':
          return `Design a comprehensive task delegation strategy for a ${inputs.role} responsible for the following key duties: ${inputs.responsibilities.join(', ')}. 
                  The objective is to efficiently delegate the tasks: ${inputs.tasks.join(', ')} among the team members: ${inputs.teamMembers.join(', ')}. 
                  Develop a plan that assigns tasks by carefully considering each team member's skills, current workload, and the urgency of each task. 
                  The deadline for completing these tasks is ${inputs.deadline}, so ensure that time sensitivity and task prioritization are clearly incorporated. 
                  Include recommendations for communication checkpoints, such as regular progress updates or briefings, to maintain transparency and accountability throughout the process. 
                  Define clear ownership for each task to prevent overlaps or gaps and to foster responsibility within the team. 
                  The delegation plan should also enable the ${inputs.role} to focus on high-impact activities by offloading routine or specialized tasks effectively. 
                  Consider potential risks or bottlenecks and suggest contingency measures to keep the workflow smooth. 
                  Present the plan in a structured format that can be easily shared and referenced by all stakeholders. 
                  Overall, the strategy should empower the team, improve productivity, and ensure timely task completion without overburdening any individual.`;

        case 'support-workflow':
          return `Create a comprehensive support workflow for a ${inputs.role} who leads a team consisting of: ${inputs.teamMembers.join(', ')}. 
                  This workflow should effectively manage customer interactions across multiple channels, including: ${inputs.customerChannels.join(', ')}, ensuring seamless communication. 
                  It must efficiently address common customer issues such as: ${inputs.commonIssues.join(', ')}, providing clear and actionable solutions. 
                  Design the workflow to intelligently route inquiries to the appropriate team members based on expertise and availability. 
                  Assign specific support roles and responsibilities to ensure accountability and timely responses. 
                  Include standardized response templates and escalation procedures for handling complex or unresolved cases. 
                  Incorporate a robust ticket management system with clearly defined stages, enabling efficient tracking and prioritization of requests. 
                  Set response time benchmarks to maintain service quality and customer satisfaction standards. 
                  Build in follow-up processes to gather feedback and measure customer satisfaction post-resolution. 
                  The overall goal is to streamline support operations, enhance team coordination, and deliver a smooth, responsive customer experience at all touchpoints.`;

        case 'sop-template':
          return `Generate a comprehensive Standard Operating Procedure (SOP) template for a ${inputs.role} responsible for the following duties: ${inputs.responsibilities.join(', ')}. 
                  The SOP should clearly outline the steps for recurring tasks, including ${inputs.recurringTasks.join(', ')}, to ensure consistency and efficiency. 
                  It must also support uniform service delivery across all customer channels such as ${inputs.customerChannels.join(', ')}. 
                  Structure the SOP with clearly defined sections, each having a descriptive title, detailed step-by-step instructions, and a list of necessary tools or resources. 
                  Include specific escalation points within each section to address potential issues promptly and maintain service quality. 
                  The language should be straightforward and accessible, making it easy for new team members to understand and follow without prior experience. 
                  Provide notes or best practice tips aimed at enhancing task consistency and minimizing errors or service disruptions. 
                  Emphasize compliance with relevant policies or standards to ensure reliable performance. 
                  Format the SOP for ease of use, allowing quick reference during daily operations or training sessions. 
                  Ultimately, the SOP should serve as a practical guide that improves operational reliability and supports continuous improvement.`;
      }
      break;

    case 'strategy':
      switch (func) {
        case 'brand-positioning':
          return `Develop a comprehensive brand positioning strategy for ${inputs.businessName} that aligns closely with its mission statement: "${inputs.missionStatement}." 
                  Begin by thoroughly integrating the brand's core values, which include: ${inputs.brandValues.join(', ')}, to ensure authenticity and consistency across all touchpoints. 
                  Conduct a detailed analysis of key competitors such as ${inputs.competitors.join(', ')}, highlighting how ${inputs.businessName} differentiates itself within the market. 
                  Clearly articulate the unique attributes that set the brand apart, including its distinctive tone of voice and the emotional or practical promise it makes to customers. 
                  Define the brand's positioning statement in a way that can effectively guide all messaging, visual identity, and marketing efforts. 
                  Emphasize how this positioning fosters brand recognition, trust, and loyalty among the target audience. 
                  Identify key brand attributes and explain how these resonate with the audience's needs, values, and aspirations. 
                  Include strategic recommendations for maintaining consistency across digital and offline channels. 
                  The final positioning strategy should be actionable, measurable, and adaptable to evolving market conditions. 
                  Provide the output in a structured format suitable for presentation and internal alignment.`;

        case 'audience-definition':
          return `Define the core target audience for ${inputs.businessName} based on its product or service described as: "${inputs.productOverview}." 
                  Provide a detailed profile of the ideal customer, including demographics such as age, gender, location, and income level. 
                  Include psychographic characteristics like values, interests, lifestyle, and personality traits, as well as behaviors and motivations relevant to their decision-making. 
                  Address their primary pain points and challenges, specifically: ${inputs.painPoints.join(', ')}, and clarify what they seek in a solution to these problems. 
                  Analyze how this audience currently interacts with content and brands, detailing their preferred channels of engagement such as ${inputs.channels.join(', ')}. 
                  Highlight their typical content consumption habits and responsiveness to various marketing approaches. 
                  The audience definition should be comprehensive enough to inform product design, brand messaging, tone of voice, and targeted outreach campaigns. 
                  Emphasize why understanding this audience deeply is crucial for aligning business efforts with customer needs. 
                  Deliver the output as a clear, actionable persona profile that guides strategic decisions across departments. 
                  The goal is to provide a crystal-clear and empathetic understanding of who the brand serves and how best to connect with them.`;

        case 'value-proposition':
          return `Craft a clear, concise, and compelling value proposition for ${inputs.businessName} that effectively communicates the unique value of its product or service, described as: "${inputs.productOverview}." 
                  This offering is designed to serve customers characterized as: ${inputs.audienceDescription}. 
                  Identify how the brand distinctively addresses and solves the key pain points faced by this audience, specifically: ${inputs.painPoints.join(', ')}. 
                  Highlight the core benefits provided by the product or service, including ${inputs.benefits.join(', ')}, and explain why these benefits are critically important to the target customers' needs and desires. 
                  The value proposition should balance both emotional appeal and functional utility, making it resonate on a deeper level while remaining easy to understand. 
                  Ensure the statement is impactful and versatile enough to be effectively used across pitches, websites, advertisements, and marketing materials. 
                  Focus on clarity and differentiation, ensuring the brand stands out in a competitive market. 
                  The output should be a polished, memorable sentence or short paragraph that succinctly conveys why customers should choose this brand over alternatives. 
                  Aim for language that motivates trust, interest, and engagement from the intended audience.`;

        case 'pricing-strategy':
          return `Design a comprehensive and strategic pricing plan for ${inputs.businessName}, whose mission is: "${inputs.missionStatement}." 
                  Begin by considering the base cost of the product or service, which is ${inputs.baseCost}, 
                  and analyze competitor pricing within the market, including offerings from ${inputs.competitors.join(', ')} priced at ${inputs.competitorPricing}. 
                  Take into account the unique benefits and value propositions that the product delivers, such as ${inputs.benefits.join(', ')}, as well as the brand's overall market positioning and long-term goals. 
                  Recommend appropriate pricing tiers that could include models like subscription, freemium, one-time purchase, or hybrid options, and clearly explain the reasoning behind each choice. 
                  Ensure the pricing structure reflects the perceived value of the brand while maintaining competitiveness and profitability in the target market. 
                  Incorporate psychological pricing techniques, such as charm pricing or anchoring, to optimize customer appeal and willingness to pay. Evaluate market elasticity to understand how price changes may affect demand and revenue. 
                  Consider potential pricing adjustments for different customer segments or use cases to maximize reach and profitability. 
                  Provide a clear, actionable summary that outlines the pricing plan and supports strategic decision-making for launch and growth phases.`;

        case 'growth-plan':
          return `Create a detailed and strategic growth plan for ${inputs.businessName}, which is currently in the "${inputs.stage}" stage of development. 
                  The company's mission is: "${inputs.missionStatement}," and its growth objectives include: ${inputs.goals.join(', ')}. 
                  Taking into account the available budget of ${inputs.budget}, and the current marketing and sales channels utilized such as ${inputs.channels.join(', ')}, develop scalable strategies that span product development, marketing initiatives, sales efforts, and partnership opportunities. Outline specific tactics to maximize performance within the allocated budget, leveraging content formats like ${inputs.contentTypes.join(', ')} to engage the target audience effectively.
                  Emphasize realistic and measurable actions that can be tracked and adjusted over the next quarter or year to ensure progress toward the stated goals. Include recommendations for resource allocation, key performance indicators (KPIs), and potential risks with mitigation plans. The growth plan should balance short-term wins with long-term sustainability, supporting both customer acquisition and retention. Provide clear milestones and timelines to help the team monitor execution and success. Format the output as a practical roadmap that guides cross-functional teams toward aligned growth efforts.`;


        case 'content-plan':
          return `Develop a comprehensive content strategy for ${inputs.businessName} that aligns with its primary business goals: ${inputs.goals.join(', ')}. The company is currently in the "${inputs.stage}" stage and actively distributes content through channels including: ${inputs.channels.join(', ')}. Recommend the most effective content types, such as ${inputs.contentTypes.join(', ')}, that will resonate with the target audience at this stage of growth and support key objectives. The strategy should prioritize activities that drive brand awareness, audience engagement, lead generation, or customer education, depending on the business's focus. Provide detailed guidance on core content themes and topics that reflect the brand's voice and values. Outline an optimal publishing frequency and calendar to maintain consistency and maximize audience reach. Suggest storytelling techniques and formats that enhance authenticity, emotional connection, and message clarity. Include recommendations for performance tracking and key metrics to measure the effectiveness of the content efforts. The final content plan should be actionable and scalable, enabling the marketing team to adapt and evolve it as the business grows. Ensure that the strategy fosters long-term brand loyalty and supports cross-channel integration for maximum impact.s.`;
      }
      break;
  }

  return `Help generate output for "${func}" with inputs: ${JSON.stringify(inputs)}.`;
}


function buildImagePrompt(agent: Agent, func: string, inputs: Record<string, any>): string {
  if (agent === 'marketing') {
    switch (func) {
      case 'Social-Post':
        return `Create a visually impactful social media post for ${inputs.brandName}, a brand operating in the ${inputs.industry} industry. 
                The design should reflect a ${inputs.tone} tone that aligns with the brand's personality and emotionally connects with the target audience: ${inputs.targetAudience}. 
                Incorporate visual storytelling to showcase the essence of the product: "${inputs.productDescription}", using symbolic, illustrative, or lifestyle imagery that enhances its perceived value. 
                Ensure the composition is optimized for high engagement on platforms like ${inputs.platforms.join(', ')}, using native design patterns and visual trends specific to each. 
                The layout should be bold, legible, and mobile-first, with enough whitespace and visual hierarchy to guide the viewer's eye naturally. 
                Include visual elements that support the brand's current business goals: ${inputs.businessGoals}, whether it's awareness, conversions, or community building. 
                Use modern design aesthetics from the industry - such as minimalism, vibrant gradients, or authentic photography - to improve visual appeal and relatability. 
                Where appropriate, embed subtle branding cues like the company logo, tagline, or color palette to maintain brand consistency. 
                Emphasize a clear focal point or action-driven message that invites engagement (e.g., clicks, shares, saves). 
                The final image should be polished, professional, and tailored to drive maximum visibility and emotional response on social media.`;

      case 'Story-Creation':
        return `Design a high-impact, mobile-first story sequence for ${inputs.brandName}, crafted specifically for Instagram or Facebook Stories. 
                This brand is positioned in the ${inputs.industry} industry and seeks to accomplish the following business goals through this content: ${inputs.businessGoals}. 
                The visual tone should be clearly ${inputs.tone}, resonating with the emotional preferences and lifestyle of the target audience: ${inputs.targetAudience}. 
                Center the entire 3–5 frame story around the brand's featured product or service: "${inputs.productDescription}", and use aspirational lifestyle visuals, metaphorical illustrations, or conceptual graphics to bring its value to life. 
                Integrate keywords like ${inputs.keywords.join(', ')} into the design as visual motifs, animated overlays, or stylized text to enhance thematic consistency. 
                Each frame should offer a unique visual hook while contributing to a seamless and compelling narrative arc from beginning to end. 
                Make use of vertical design conventions - full-screen imagery, top-bottom visual flow, and mobile-optimized spacing - to ensure clarity and impact. 
                Include platform-native elements like emojis, stickers, or subtle animation references (if applicable) to boost authenticity and relatability. 
                The final frame must feature a prominent and visually distinct CTA that reflects the brand's current ad objective: "${inputs.adObjective}", using cues like “Swipe Up,” “Try Free,” or “Tap to Shop”. 
                Overall, the story should feel immersive, brand-aligned, and conversion-driven while remaining visually cohesive and emotionally engaging.`;
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
    } = (await req.json()) as AgentRequest;

    if (!agent || !func || !inputs || !systemRoles[agent]) {
      return NextResponse.json(
        { error: 'Missing or invalid data' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(agent, func, inputs);
    const needsImage = multiOutputFunctions[agent]?.includes(func);

    console.log('prompt', prompt, 'needsImage', needsImage)
    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //   messages: [
    //     { role: 'system', content: systemRoles[agent] },
    //     { role: 'user', content: prompt },
    //   ],
    //   temperature: 0.7,
    // });

    // const content = completion.choices[0].message?.content || 'No response.';
    // const result = parseOutput(content);

    // if (needsImage) {
    //   const imagePrompt = buildImagePrompt(agent, func, inputs);
    //   const image = await openai.images.generate({
    //     prompt: imagePrompt,
    //     n: 1,
    //     size: '1024x1024',
    //   });

    //   return NextResponse.json({
    //     type: 'combined',
    //     script: result,
    //     imageUrl: image.data[0].url,
    //   });
    // }

    return NextResponse.json({ type: 'text', prompt });
  } catch (err: any) {
    console.error('Agent API error:', err);
    return NextResponse.json(
      { error: err.message || 'Unexpected error' },
      { status: 500 }
    );
  }
}
