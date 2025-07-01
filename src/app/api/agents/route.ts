import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Agent =
  | 'marketing-calendar'
  | 'post-ideas'
  | 'post-text-scripts'
  | 'image-generation'
  | 'seo-optimization';

interface AgentRequest {
  agent: Agent;
  inputs: Record<string, any>;
}

// Agent-specific system prompts
const systemRoles: Record<Agent, string> = {
  'marketing-calendar': `You are a digital content strategist specialized in creating personalized content posting schedules based on strategic business information.
Your role is to:
- Create realistic posting schedules aligned with business goals and operational resources
- Adapt content ideas to available time, team.
- Generate schedules that drive sales, engagement, and brand positioning
- Organize results in clear table format for easy execution
- Consider multiple platforms: Instagram, WhatsApp, TikTok, Facebook, YouTube
- Include Feed, Stories, Reels, and other placements as appropriate
Each schedule item must include: Day, Channel, Placement, Format, Content Type, and Idea Description.`,

  'post-ideas': `You are a creative marketing expert who generates two creative, practical, and engaging content ideas for each scheduled post.
Your role is to:
- Create ideas that respect the defined topic, format, platform, and brand tone
- Ensure ideas are tailored to user's reality (low budget, smartphone filming, limited time)
- Make suggestions easy to execute and creative
- Consider the strategic objective (sales, authority, engagement)
- Provide two different approaches for each post to avoid creative blocks
- Maintain consistency with brand voice and target audience expectations`,

  'post-text-scripts': `You are an intelligent copywriter who transforms content ideas into persuasive, light, and sales-oriented texts.
Your role is to:
- Create compelling social media captions focused on connection, desire, and conversions
- Write website copy, product descriptions, and landing page content
- Generate detailed scripts for AI image generation
- Maintain communication consistency using brand data
- Adapt language and structure according to post format
- Include impactful headlines, clear CTAs, relevant emojis, and strategic hashtags
- Create detailed prompts for visual content generation`,

  'image-generation': `You are a visual content creator who transforms detailed prompts into unique AI-generated images.
Your role is to:
- Generate high-quality visual content for social media, ads, and websites
- Apply brand identity including colors, style, and visual elements
- Incorporate logos or product images when provided
- Adapt to desired visual styles (realistic, illustrated, minimalist, commercial, futuristic)
- Create images optimized for different formats (feed, story, banner)
- Ensure images align with brand positioning and marketing goals
- Generate compelling visuals that drive engagement and conversions`,

  'seo-optimization': `You are an SEO specialist for social media who optimizes content and profiles for maximum organic discovery.
Your role is to:
Content Optimization:
- Rewrite captions with relevant keywords for better discovery
- Suggest 5-10 strategic hashtags per post
- Improve CTAs to be more objective and conversion-focused
- Ensure alignment with platform algorithms
- Provide alternative optimized captions when needed

Profile Optimization:
- Create clear, strategic, and persuasive bios
- Recommend relevant profile names and usernames
- Suggest organized highlights by theme
- Recommend effective link-in-bio strategies
- Provide keywords for channel names and descriptions across platforms`,
};

// Helper function to ensure array format
function ensureArray(value: any): string[] {
  if (Array.isArray(value)) {
    return value.map(String);
  }
  if (typeof value === 'string') {
    if (value.includes(',')) {
      return value
        .split(',')
        .map((item) => item.trim().replace(/^["']|["']$/g, ''));
    }
    return [value.replace(/^["']|["']$/g, '')];
  }
  return [];
}

// Helper function to safely join arrays
function safeJoin(value: any, separator: string = ', '): string {
  const array = ensureArray(value);
  return array.join(separator);
}

// Dynamically generate a GPT-friendly prompt
function buildPrompt(agent: Agent, inputs: Record<string, any>): string {
  switch (agent) {
    case 'marketing-calendar':
      return `Based on the following business strategy, create exactly ${inputs['post-per-week']} content posts for a weekly schedule. 
        Use only these content formats: ${inputs['content-formats']}. ${inputs['priority-platform'] !== 'No specific priority' ? `Prioritize ${inputs['priority-platform']} but include other suitable platforms.` : 'Distribute across Instagram, WhatsApp, TikTok, and Facebook as appropriate.'}
        ${inputs['marketing-strategy']}
        Create a structured weekly schedule with these exact fields for each post:
        - day: (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
        - channel: (Instagram, WhatsApp, TikTok, Facebook, YouTube)
        - placement: (Feed, Story, Reels, Broadcast List, etc.)
        - format: (Image, Carousel, Plain Text, Video, Text + Image, Poll)
        - contentType: (Tip, Offer, Behind-the-scenes, Engagement, Social Proof, Entertaining, Customer Repost, Educational, Product Showcase)
        - description: (Specific actionable content idea in 8-12 words)

        Ensure content variety includes tips, offers, social proof, behind-the-scenes, engagement posts, and entertaining content. Each description should be specific to the brand's products/services and target audience. Balance sales-focused content with value-driven and engagement-focused posts. Consider optimal posting days for each platform and content type to maximize reach and conversion potential.`;
      break;

    case 'post-ideas':
      return `Based on the brand strategy and content schedule provided, generate TWO DIFFERENT sets of creative and practical content ideas for each scheduled post. Focus on these content themes: ${inputs['content-themes']}. Apply a ${inputs['creative-style']} approach to all ideas, while considering the filming preference: ${inputs['filming-comfort']}.
        ${inputs['marketing-strategy']}
        Content Schedule: ${JSON.stringify(inputs['schedule'])}
        For each scheduled post, create TWO DISTINCT content idea variations that respect the specified format, platform, and content type while maintaining brand consistency. Each idea should align with the preferred content themes and serve the strategic marketing goals (brand awareness, follower growth, repeat purchases).
        Consider the brand's friendly, informative, and empowering tone while incorporating eco-conscious messaging and product benefits. Make suggestions practical for implementation within the brand's operational limitations and suitable for the target platforms.
        IMPORTANT: Return your response as a valid JSON object with TWO separate option sets with the following structure for each day of the week that has scheduled content:
        {
          "option1": {
            "Monday": {
              "title": "Creative title for the content",
              "description": "Detailed practical description of how to create this content, including specific actions, props, settings, or filming instructions",
              "hook": "Attention-grabbing opening line or caption starter that connects with the target audience",
              "cta": "Clear call-to-action that drives engagement or conversions"
            },
            "Tuesday": {
              "title": "Creative title for the content",
              "description": "Detailed practical description of how to create this content",
              "hook": "Attention-grabbing opening line or caption starter",
              "cta": "Clear call-to-action"
            }
          },
          "option2": {
            "Monday": {
              "title": "DIFFERENT creative title for the same scheduled content",
              "description": "ALTERNATIVE detailed practical description with different approach, props, settings, or filming instructions",
              "hook": "DIFFERENT attention-grabbing opening line or caption starter",
              "cta": "ALTERNATIVE clear call-to-action"
            },
            "Tuesday": {
              "title": "DIFFERENT creative title for the same scheduled content",
              "description": "ALTERNATIVE detailed practical description with different approach",
              "hook": "DIFFERENT attention-grabbing opening line or caption starter",
              "cta": "ALTERNATIVE clear call-to-action"
            }
          }
        }
        Only include days that have scheduled content. Each content idea should be specific to the scheduled post's format (video, image, carousel, etc.), platform (Instagram, TikTok, etc.), and content type (tip, offer, social proof, etc.).
        Ensure both options are distinctly different in approach, creativity, and execution while serving the same strategic purpose. Make sure the JSON is properly formatted and valid. Do not include any additional text outside the JSON object.`;
      break;

    case 'post-text-scripts':
      {
        const contentType = inputs['content-type'];

        let basePrompt = `You are an intelligent copywriter who transforms content ideas into persuasive, light, and sales-oriented texts. Based on the brand strategy and selected content idea, create compelling content focused on ${inputs['copy-focus']} with a ${inputs['cta-preference']} call-to-action approach.
          ${inputs['marketing-strategy']}
          Selected Content Idea: ${JSON.stringify(inputs['selected-idea'])}

          Ensure the final content:
          - Respects the eco-conscious messaging and sustainable values
          - Incorporates product benefits naturally without being overly salesy
          - Is optimized for the specified platforms and audience engagement
          - Drives the desired action while building brand awareness and authority
          - Considers the brand's limitations (limited ad budget, no international shipping)
          - Aligns with the brand's friendly, informative, and empowering tone

          IMPORTANT: Generate actual content and return ONLY a valid JSON object with the exact structure below:`;

        if (
          contentType === 'Social Media Caption' ||
          contentType === 'caption'
        ) {
          basePrompt += `
            For Social Media Caption, create:
            - headline: Write an actual attention-grabbing opening line
            - copy: Write actual persuasive caption text (2-3 sentences)
            - cta: Write an actual call-to-action optimized for ${inputs['cta-preference']}
            - hashtags: Provide actual array of 8-12 strategic hashtags

            JSON structure:
            {
              "headline": "your actual headline here",
              "copy": "your actual caption copy here", 
              "cta": "your actual call-to-action here",
              "hashtags": ["actual", "hashtag1", "hashtag2", "etc"]
            }`;
        } else if (contentType === 'Page Copy (Website/WhatsApp)' || contentType === 'pageCopy') {
          basePrompt += `
            For Page Copy, create:
            - title: Write an actual compelling main title
            - subtitle: Write an actual supporting subtitle
            - content: Write actual comprehensive page content with benefits and social proof
            - cta: Write an actual call-to-action button text

            JSON structure:
            {
              "title": "your actual title here",
              "subtitle": "your actual subtitle here",
              "content": "your actual page content here",
              "cta": "your actual CTA text here"
            }`;
        } else if (
          contentType === 'AI Image Generation Script' ||
          contentType === 'imageScript'
        ) {
          basePrompt += `
            For AI Image Script, create actual descriptions for:
            - objective: State the actual primary goal
            - format: Specify actual image format
            - scene: Describe actual environment/setting
            - character: Describe actual person and clothing
            - expression: Specify actual facial expression and body language
            - style: Choose actual visual style
            - colors: Define actual color palette
            - logo: Specify actual logo placement
            - elements: List actual additional visual elements
            - orientation: Choose actual orientation
            - finalPrompt: Write complete, detailed AI image generation prompt

            JSON structure:
            {
              "objective": "actual objective here",
              "format": "actual format here",
              "scene": "actual scene description here",
              "character": "actual character description here",
              "expression": "actual expression description here",
              "style": "actual style here",
              "colors": "actual colors here",
              "logo": "actual logo placement here",
              "elements": "actual elements here",
              "orientation": "actual orientation here",
              "finalPrompt": "actual complete AI prompt here"
            }`;
        }

        basePrompt += `
          Return ONLY the JSON object with actual generated content. Do not include any explanatory text, markdown formatting, or additional fields.`;

        return basePrompt;
      }
      break;
    case 'image-generation':
      return ``;
      break;
    case 'seo-optimization':
      return ``;
      break;
  }

  return `Help generate output for with inputs: ${JSON.stringify(inputs)}.`;
}

function buildImagePrompt(agent: Agent, inputs: Record<string, any>): string {
  if (agent === 'image-generation') {
    return `Create a visually impactful social media post for ${inputs.brandName}, a brand operating in the ${inputs.industry} industry. 
                The design should reflect a ${inputs.tone} tone that aligns with the brand's personality and emotionally connects with the target audience: ${inputs.targetAudience}. 
                Incorporate visual storytelling to showcase the essence of the product: "${inputs.productDescription}", using symbolic, illustrative, or lifestyle imagery that enhances its perceived value. 
                Ensure the composition is optimized for high engagement on platforms like ${safeJoin(inputs.platforms)}, using native design patterns and visual trends specific to each. 
                The layout should be bold, legible, and mobile-first, with enough whitespace and visual hierarchy to guide the viewer's eye naturally. 
                Include visual elements that support the brand's current business goals: ${inputs.businessGoals}, whether it's awareness, conversions, or community building. 
                Use modern design aesthetics from the industry - such as minimalism, vibrant gradients, or authentic photography - to improve visual appeal and relatability. 
                Where appropriate, embed subtle branding cues like the company logo, tagline, or color palette to maintain brand consistency. 
                Emphasize a clear focal point or action-driven message that invites engagement (e.g., clicks, shares, saves). 
                The final image should be polished, professional, and tailored to drive maximum visibility and emotional response on social media.`;
  }
  return `A visual representation for ${inputs.inputs.brandName || inputs.businessName}.`;
}

function parseOutput(text: string) {
  const lines = text.trim().split('\n').filter(Boolean);
  return lines.length > 1 ? lines : text;
}

// Main POST handler
export const POST = async (request: Request) => {
  try {
    const { agent, inputs } = (await request.json()) as AgentRequest;

    if (!agent || !inputs || !systemRoles[agent]) {
      return NextResponse.json(
        { error: 'Missing or invalid data' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(agent, inputs);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemRoles[agent] },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message?.content || 'No response.';
    const result = parseOutput(content);

    // if (needsImage) {
    //   const imagePrompt = buildImagePrompt(agent, inputs);
    //   const image = await openai.images.generate({
    //     model: 'dall-e-3',
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

    return NextResponse.json({ type: 'text', script: result });
  } catch (err: any) {
    console.error('Agent API error:', err);
    return NextResponse.json(
      { error: err.message || 'Unexpected error' },
      { status: 500 }
    );
  }
};
