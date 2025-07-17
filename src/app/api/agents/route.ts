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
  language?: string;
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
- Create engaging video scripts for social media videos
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

// Dynamically generate a GPT-friendly prompt
function buildPrompt(agent: Agent, inputs: Record<string, any>, language: string = 'en'): string {
  // Language instruction
  const languageInstruction = language === 'en' 
    ? '' 
    : language === 'pt' 
      ? 'IMPORTANT: Generate all content in Portuguese (Brazil). All text output should be in Portuguese.'
      : language === 'es'
        ? 'IMPORTANT: Generate all content in Spanish. All text output should be in Spanish.'
        : '';
  switch (agent) {
    case 'marketing-calendar':
      return `${languageInstruction}

Based on the following business strategy, create exactly ${inputs['post-per-week']} content posts for a weekly schedule. 
        Use only these content formats: ${inputs['content-formats']}. ${inputs['priority-platform'] !== 'No specific priority' ? `Prioritize ${inputs['priority-platform']} but include other suitable platforms.` : 'Distribute across Instagram, WhatsApp, TikTok, and Facebook as appropriate.'}
        ${inputs['marketing-strategy']}
        Create a structured weekly schedule with these exact fields for each post:
        - day: (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
        - channel: (Instagram, WhatsApp, TikTok, Facebook, YouTube)
        - placement: (Feed, Story, Reels, Broadcast List, etc.)
        - format: (Image, Carousel, Plain Text, Video, Mixed (text + image), Poll)
        - contentType: (Tip, Offer, Behind-the-scenes, Engagement, Social Proof, Entertaining, Customer Repost, Educational, Product Showcase)
        - description: (Specific actionable content idea in 8-12 words)

        Ensure content variety includes tips, offers, social proof, behind-the-scenes, engagement posts, and entertaining content. Each description should be specific to the brand's products/services and target audience. Balance sales-focused content with value-driven and engagement-focused posts. Consider optimal posting days for each platform and content type to maximize reach and conversion potential.`;
      break;

    case 'post-ideas':
      return `${languageInstruction}

Based on the brand strategy and content schedule provided, generate TWO COMPLETELY DIFFERENT and UNIQUE creative content ideas for each scheduled post. Each idea must be distinctly different in concept, approach, and execution. Focus on these content themes: ${inputs['content-themes']}. Apply a ${inputs['creative-style']} approach to all ideas, while considering the filming preference: ${inputs['filming-comfort']}.
        ${inputs['marketing-strategy']}
        Content Schedule: ${JSON.stringify(inputs['schedule'])}
        
        CRITICAL REQUIREMENTS:
        1. For each scheduled post, create TWO COMPLETELY DIFFERENT content ideas - never repeat or reuse the same concept
        2. Each idea must be tailored to the specific day's content type, format, and platform
        3. Ensure variety across all days - avoid similar concepts even for different days
        4. Each idea should serve the specific content type (tip, offer, behind-the-scenes, etc.) mentioned in the schedule
        5. Make each idea specific to the scheduled post's format (video, image, carousel, etc.) and platform (Instagram, TikTok, etc.)
        
        VARIETY GUIDELINES:
        - Use different angles: educational vs. emotional, product-focused vs. lifestyle, professional vs. casual
        - Vary content formats: tutorials, testimonials, behind-the-scenes, product showcases, user-generated content inspiration
        - Mix engagement types: questions, polls, challenges, tips, stories, demonstrations
        - Alternate between direct selling, brand awareness, community building, and educational content
        - Consider different visual approaches: close-ups vs. wide shots, studio vs. natural lighting, posed vs. candid
        
        IMPORTANT: Return your response as a valid JSON object with TWO separate option sets. Each day that has scheduled content MUST have completely unique ideas that don't repeat across any other day:
        {
          "option1": {
            "Monday": {
              "title": "Unique creative title specific to Monday's scheduled content type",
              "description": "Detailed practical description with specific actions, props, settings, or filming instructions that align with Monday's content type and format",
              "hook": "Attention-grabbing opening line that connects with target audience for this specific content",
              "cta": "Clear call-to-action that matches the content objective"
            },
            "Tuesday": {
              "title": "COMPLETELY DIFFERENT title for Tuesday's scheduled content - unique from Monday",
              "description": "ENTIRELY DIFFERENT approach with different props, settings, or filming instructions for Tuesday's specific content type",
              "hook": "UNIQUE opening line different from Monday's approach",
              "cta": "DISTINCT call-to-action for Tuesday's content objective"
            }
          },
          "option2": {
            "Monday": {
              "title": "ALTERNATIVE creative title for Monday - different from option1",
              "description": "COMPLETELY DIFFERENT approach from option1 with alternative props, settings, or filming instructions",
              "hook": "ALTERNATIVE opening line with different tone/approach from option1",
              "cta": "DIFFERENT call-to-action strategy from option1"
            },
            "Tuesday": {
              "title": "UNIQUE alternative title for Tuesday - different from all previous ideas",
              "description": "FRESH approach entirely different from Tuesday's option1 and Monday's ideas",
              "hook": "DISTINCT opening line unlike any previous hooks",
              "cta": "UNIQUE call-to-action different from all other CTAs"
            }
          }
        }
        
        Only include days that have scheduled content. Ensure ALL ideas are completely unique - no repetition of concepts, approaches, or similar language across any day or option. Each content idea must serve the strategic marketing goals while being distinctly different from all others. Make sure the JSON is properly formatted and valid. Do not include any additional text outside the JSON object.`;
      break;

    case 'post-text-scripts':
      {
        const contentType = inputs['content-type'];

        let basePrompt = `${languageInstruction}

You are an intelligent copywriter who transforms content ideas into persuasive, light, and sales-oriented texts. Based on the brand strategy and selected content idea, create compelling content focused on ${inputs['copy-focus']} with a ${inputs['cta-preference']} call-to-action approach.
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
        } else if (
          contentType === 'Page Copy (Website/WhatsApp)' ||
          contentType === 'pageCopy'
        ) {
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
        } else if (
          contentType === 'Video Script' ||
          contentType === 'videoScript'
        ) {
          basePrompt += `
            For Video Script, create:
            - hook: Write an actual attention-grabbing opening line (first 3 seconds)
            - introduction: Write actual intro that establishes context (5-10 seconds)
            - mainContent: Write actual main content in sections with timing
            - visualCues: Provide actual visual directions for each section
            - audioElements: Suggest actual background music/sound effects
            - captions: Write actual on-screen text overlays
            - transitions: Describe actual transition effects between scenes
            - cta: Write actual call-to-action for the end
            - duration: Specify actual total video duration
            - hashtags: Provide actual array of 8-12 strategic video hashtags

            JSON structure:
            {
              "hook": "your actual hook here",
              "introduction": "your actual introduction here",
              "mainContent": [
                {
                  "section": "section name",
                  "script": "actual script for this section",
                  "duration": "duration in seconds",
                  "visuals": "visual description"
                }
              ],
              "visualCues": "your actual visual directions here",
              "audioElements": "your actual audio suggestions here",
              "captions": ["actual", "caption", "overlays"],
              "transitions": "your actual transition descriptions here",
              "cta": "your actual CTA here",
              "duration": "total duration (e.g., 30 seconds)",
              "hashtags": ["actual", "video", "hashtags"]
            }`;
        }

        basePrompt += `
          Return ONLY the JSON object with actual generated content. Do not include any explanatory text, markdown formatting, or additional fields.`;

        return basePrompt;
      }
      break;
    case 'image-generation':
      return `${languageInstruction}

Create ${inputs['visual-style'].toLowerCase()} style image for "${inputs['campaign-name'] || 'Untitled Campaign'}". 
        Base concept: ${inputs['prompt']}
        
        Requirements:
        - Format: ${inputs['image-format']} with optimized composition
        - Style: ${inputs['visual-style']} aesthetic throughout
        ${
          inputs['include-logo'] === 'Yes'
            ? `- Include brand logo ${inputs['logo-position'] ? `positioned at ${inputs['logo-position']}` : 'with strategic placement'}`
            : '- No logo needed'
        }
        ${
          inputs['include-product'] === 'Yes'
            ? '- Feature product as focal point or key element'
            : '- Focus on conceptual/lifestyle imagery'
        }
        
        ${
          inputs['logoImage']
            ? `- Reference logo style and branding from uploaded logo image (maintain brand consistency)`
            : ''
        }
        ${
          inputs['productImage']
            ? `- Use uploaded product image as reference for product appearance, color, and styling`
            : ''
        }
        
        Design: Professional, high-engagement social media visual with clear hierarchy, modern trends, mobile-optimized layout, high contrast, and emotional storytelling. Ensure originality and commercial viability.
        
        ${
          inputs['logoImage'] || inputs['productImage']
            ? 'Note: Incorporate visual elements and styling from the reference images while maintaining the specified aesthetic style.'
            : ''
        }`;
      break;

    case 'seo-optimization':
      {
        const contentType = inputs['optimization-type'];
        if (contentType === 'Content Optimization') {
          return `${languageInstruction}

            You are a content optimization expert for social media platforms like Instagram, TikTok, Facebook, and YouTube Shorts.
            Based on the inputs below, improve the performance of the caption by enhancing SEO, platform engagement, and CTA strategy.

            Inputs:
            - Caption: ${inputs['caption']}
            - Main Theme: ${inputs['main-theme']}
            - Post Objective: ${inputs['post-objective']}
            - Target Platform: ${inputs['target-platform']}
            - Brand Tone: ${inputs['marketingStrategy']}

            IMPORTANT: Generate actual content and return ONLY a valid JSON object with the exact structure below:

            For Content Optimization, create actual optimized content for:
            - optimizedCaption: Rewrite the full caption with SEO-rich, attention-grabbing language that drives engagement
            - strategicHashtags: Provide an array of 8-12 strategic hashtags based on the platform and topic
            - improvedCTA: Write a persuasive and action-driven call-to-action aligned with the platform
            - alternativeCaption: Provide a completely different version of the caption for A/B testing
            - platformAlignment: Provide specific tips for optimizing content for the target platform

            JSON structure:
            {
              "optimizedCaption": "your actual optimized caption here",
              "strategicHashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6", "#hashtag7", "#hashtag8"],
              "improvedCTA": "your actual improved CTA here",
              "alternativeCaption": "your actual alternative caption here",
              "platformAlignment": "your actual platform-specific optimization tips here"
            }

            Return ONLY the JSON object with actual generated content. Do not include any explanatory text, markdown formatting, or additional fields outside the JSON structure.
          `;
        } else if (contentType === 'Profile Optimization') {
          return `${languageInstruction}

            You are a profile optimization expert for social platforms like Instagram, TikTok, and YouTube.
            Your goal is to improve a brand's social media profile to increase clarity, searchability, and conversion — turning profile visitors into loyal followers or customers.

            Inputs:
            - Brand Name: "${inputs['brandName']}"
            - Niche: "${inputs['niche']}"
            - Ideal Audience: "${inputs['idealAudience']}"
            - Tone of Voice: "${inputs['toneOfVoice']}"
            - Differentiators: "${inputs['differentiators']}"
            - Contact Channel: "${inputs['contactChannel']}"

            IMPORTANT: Generate actual content and return ONLY a valid JSON object with the exact structure below:

            For Profile Optimization, create:
            - suggestedBio: A concise, persuasive social media bio aligned with the brand tone and niche
            - suggestedUsername: A clear, professional, and searchable username
            - suggestedProfileName: A profile name that improves brand recognition and discoverability
            - instagramHighlights: 4–6 Instagram Highlight titles categorized by useful themes
            - linkInBioCTA: A compelling call-to-action directing users to the bio link (e.g., Linktree, WhatsApp, DM)
            - seoKeywords: 5–8 SEO-friendly keywords for TikTok or YouTube channel descriptions

            JSON structure:
            {
              "suggestedBio": "your actual suggested bio here",
              "suggestedUsername": "your actual suggested username here",
              "suggestedProfileName": "your actual suggested profile name here",
              "instagramHighlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4", "Highlight 5"],
              "linkInBioCTA": "your actual link in bio CTA here",
              "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
            }

            Return ONLY the JSON object with actual generated content. Do not include any explanatory text, markdown formatting, or additional fields outside the JSON structure.
          `;
        }
      }
      break;
    default:
      break;
  }

  return `Help generate output for with inputs: ${JSON.stringify(inputs)}.`;
}

function parseOutput(text: string) {
  const lines = text.trim().split('\n').filter(Boolean);
  return lines.length > 1 ? lines : text;
}

// Main POST handler
export const POST = async (request: Request) => {
  try {
    const { agent, inputs, language = 'en' } = (await request.json()) as AgentRequest;

    if (!agent || !inputs || !systemRoles[agent]) {
      return NextResponse.json(
        { error: 'Missing or invalid data' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(agent, inputs, language);
    if (agent === 'image-generation') {
      // If reference images are provided, use them to enhance the prompt
      let enhancedPrompt = prompt;

      if (inputs['logoImage'] || inputs['productImage']) {
        // Use vision API to analyze reference images first
        const content: Array<{
          type: 'text' | 'image_url';
          text?: string;
          image_url?: { url: string };
        }> = [
          {
            type: 'text',
            text: 'Analyze these reference images and provide a detailed description of their visual elements:',
          },
        ];

        // Add logo image if present
        if (inputs['logoImage']) {
          content.push({
            type: 'image_url',
            image_url: { url: inputs['logoImage'] },
          });
        }

        // Add product image if present
        if (inputs['productImage']) {
          content.push({
            type: 'image_url',
            image_url: { url: inputs['productImage'] },
          });
        }

        const visionResponse = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'You are a visual design expert. Analyze the provided reference images and describe their key visual elements, colors, style, and branding elements that should be incorporated into a new image generation.',
            },
            {
              role: 'user',
              content: content as any, // Type assertion to bypass strict typing
            },
          ],
          max_tokens: 500,
        });

        const imageDescription =
          visionResponse.choices[0].message?.content || '';

        // Enhance the prompt with analyzed image details
        enhancedPrompt = `${prompt}
        REFERENCE IMAGE ANALYSIS:
        ${imageDescription}
        
        IMPORTANT: Incorporate the visual elements, colors, and styling described above while maintaining the specified aesthetic and composition requirements.`;
      }
      
      // Generate the image with enhanced prompt
      const image = await openai.images.generate({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd', // Use HD quality for better results
      });

      return NextResponse.json({ type: 'image', image: image.data[0].url });
    }

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

    return NextResponse.json({ type: 'text', script: result });
  } catch (err: any) {
    console.error('Agent API error:', err);
    return NextResponse.json(
      { error: err.message || 'Unexpected error' },
      { status: 500 }
    );
  }
};
