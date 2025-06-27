import { Agent } from '@/lib/agent';

export const agents: Agent[] = [
  {
    id: 'marketing-strategy',
    title: 'Marketing Strategy',
    description: 'Get personalized marketing strategy with step-by-step guidance from an AI marketing consultant.',
    icon: '🎯',
    questions: [
      {
        id: 'brand-name',
        question: 'What is the name of your brand or business?',
        type: 'text',
        placeholder: 'Enter your brand or business name',
        required: true
      },
      {
        id: 'product-service',
        question: 'What exactly do you sell or offer?',
        type: 'textarea',
        placeholder: 'e.g., online baking courses, residential painting services, women\'s fitness clothing, marketing consulting for freelancers. Be specific and include examples if possible.',
        required: true
      },
      {
        id: 'target-audience',
        question: 'Who is your ideal audience?',
        type: 'textarea',
        placeholder: 'Describe age, profession, pain points, desires, location, level of knowledge about the topic, etc. This helps make content more attractive and relevant.',
        required: true
      },
      {
        id: 'differentiator',
        question: 'What is your main differentiator or promise?',
        type: 'textarea',
        placeholder: 'Why should someone buy from you and not someone else? Examples: more personal service, affordable price, faster delivery, exclusive product, differentiated support, etc.',
        required: true
      },
      {
        id: 'marketing-goals',
        question: 'What is your main goal with marketing? (you can choose more than one)',
        type: 'select',
        placeholder: 'Select your primary marketing goal',
        options: [
          'Generate more sales',
          'Grow followers and authority',
          'Capture leads for nurturing',
          'Position the brand as a reference',
          'Attract customers to a physical store',
          'Promote new releases or promotions'
        ],
        required: true
      },
      {
        id: 'communication-tone',
        question: 'What tone do you want to convey in your communication?',
        type: 'select',
        placeholder: 'Select your preferred communication tone',
        options: [
          'Professional and trustworthy',
          'Fun and relaxed',
          'Friendly and welcoming',
          'Creative and bold',
          'Traditional and safe'
        ],
        required: true
      },
      {
        id: 'video-appearance',
        question: 'Are you or someone from your team willing to appear in videos and photos?',
        type: 'select',
        placeholder: 'Select your comfort level with appearing in content',
        options: [
          'Yes, I can appear frequently',
          'Yes, but I prefer to appear occasionally',
          'I don\'t want to appear'
        ],
        required: true
      },
      {
        id: 'social-platforms',
        question: 'Do you already sell on social media? Which platforms do you use or plan to use?',
        type: 'text',
        placeholder: 'e.g., Instagram, Facebook, WhatsApp, YouTube, TikTok, LinkedIn...',
        required: true
      },
      {
        id: 'limitations',
        question: 'Are there any important limitations we should consider?',
        type: 'textarea',
        placeholder: 'e.g., Little time to record, no designer, don\'t like video, no website, don\'t want to appear, limited budget, etc.',
        required: false
      },
      {
        id: 'focus-products',
        question: 'What are your most important products or services (that you want to focus on first)?',
        type: 'textarea',
        placeholder: 'List your priority products/services for marketing focus',
        required: true
      },
      {
        id: 'positioning-status',
        question: 'Do you already have a clear positioning or do you want help defining it?',
        type: 'select',
        placeholder: 'Select your positioning status',
        options: [
          'I already have a clear positioning',
          'I have an idea, but need help refining it',
          'I don\'t have one yet, I want help defining it'
        ],
        required: true
      },
      {
        id: 'competitors',
        question: 'Do you have competitors you admire or want to differentiate from?',
        type: 'textarea',
        placeholder: 'Share names, links, or profiles of competitors you admire or want to differentiate from',
        required: false
      },
      {
        id: 'three-month-goals',
        question: 'What results do you want to achieve with marketing in the next 3 months?',
        type: 'textarea',
        placeholder: 'e.g., more sales, more followers, more authority, opening new channels, specific numbers...',
        required: true
      }
    ]
  },
  {
    id: 'marketing-calendar',
    title: 'Marketing Calendar',
    description: 'Create organized content calendars with strategic timing and themes.',
    icon: '📅',
    questions: [
      {
        id: 'posts-per-week',
        question: 'How many posts do you want per week?',
        type: 'select',
        placeholder: 'Select number of posts per week',
        options: ['3 posts', '5 posts', '7 posts', '10 posts', '14 posts'],
        required: true
      },
      {
        id: 'content-formats',
        question: 'Which content formats do you want to use? (You can select more than one)',
        type: 'multiselect',
        placeholder: 'Select content formats',
        options: ['Video', 'Image', 'Carousel', 'Plain Text', 'Mixed (text + image or video)'],
        required: true
      },
      {
        id: 'priority-platform',
        question: 'Do you have any priority social media platform?',
        type: 'select',
        placeholder: 'Select your priority platform',
        options: ['Instagram', 'Facebook', 'TikTok', 'WhatsApp', 'YouTube', 'LinkedIn', 'Twitter', 'No specific priority'],
        required: false
      }
    ]
  },
  {
    id: 'post-ideas',
    title: 'Post Ideas',
    description: 'Generate creative and engaging social media post concepts based on your strategy and schedule.',
    icon: '💡',
    questions: [
      {
        id: 'creative-style',
        question: 'What creative style do you prefer for your content ideas?',
        type: 'select',
        placeholder: 'Select your preferred creative style',
        options: [
          'Simple and direct',
          'Creative and bold',
          'Educational and informative',
          'Fun and entertaining',
          'Professional and polished'
        ],
        required: true
      },
      {
        id: 'content-themes',
        question: 'Which content themes resonate most with your audience? (You can select multiple)',
        type: 'multiselect',
        placeholder: 'Select content themes',
        options: [
          'Behind-the-scenes',
          'Tips and tutorials',
          'Customer testimonials',
          'Product showcases',
          'Industry trends',
          'Personal stories',
          'Challenges and solutions',
          'Community highlights'
        ],
        required: true
      },
      {
        id: 'filming-comfort',
        question: 'How comfortable are you with creating different types of content?',
        type: 'select',
        placeholder: 'Select your comfort level',
        options: [
          'Love being on camera - bring on the videos!',
          'Prefer behind-the-scenes and product shots',
          'Better with graphics and text-based content',
          'Mix of everything but keep it simple'
        ],
        required: true
      }
    ]
  },
  {
    id: 'post-text',
    title: 'Post Text & Scripts',
    description: 'Write compelling copy and video scripts for your content.',
    icon: '✍️',
    questions: [
      {
        id: 'content-type',
        question: 'What type of content do you want to create?',
        type: 'multiselect',
        placeholder: 'Select content types (you can choose multiple)',
        options: [
          'Social Media Caption',
          'Page Copy (Website/WhatsApp)',
          'AI Image Generation Script',
          'AI Video Generation Script'
        ],
        required: true
      },
      {
        id: 'selected-idea',
        question: 'Which content idea from the previous step do you want to develop?',
        type: 'select',
        placeholder: 'Select a content idea to develop',
        options: [
          'Monday - The Activewear Fitting Room Reality Check',
          'Tuesday - Flash Sale Alert with Personal Touch',
          'Wednesday - Unboxing New Collection with Excitement'
        ],
        required: true
      },
      {
        id: 'copy-focus',
        question: 'What should be the main focus of your copy?',
        type: 'select',
        placeholder: 'Select your copy focus',
        options: [
          'Drive immediate sales',
          'Build brand awareness',
          'Educate audience',
          'Increase engagement',
          'Generate leads'
        ],
        required: true
      },
      {
        id: 'cta-preference',
        question: 'What type of call-to-action do you prefer?',
        type: 'select',
        placeholder: 'Select your CTA preference',
        options: [
          'Direct sales (Buy now, Shop today)',
          'Engagement (Comment, Share, Tag)',
          'Traffic (Visit website, Link in bio)',
          'Lead generation (DM us, Sign up)',
          'Soft approach (Save this post, Follow for more)'
        ],
        required: true
      }
    ]
  },
  {
    id: 'image-generation',
    title: 'Image Generation',
    description: 'Create stunning visuals and graphics for your marketing campaigns.',
    icon: '🎨',
    questions: [
      {
        id: 'image-type',
        question: 'What type of image do you need?',
        type: 'select',
        placeholder: 'Select image type',
        options: ['Social Media Post', 'Blog Header', 'Product Photo', 'Infographic', 'Banner Ad', 'Logo Design'],
        required: true
      },
      {
        id: 'visual-style',
        question: 'What visual style do you prefer?',
        type: 'select',
        placeholder: 'Select visual style',
        options: ['Modern/Minimalist', 'Bold/Colorful', 'Professional/Corporate', 'Creative/Artistic', 'Clean/Simple'],
        required: true
      },
      {
        id: 'color-scheme',
        question: 'Do you have preferred colors or brand colors?',
        type: 'text',
        placeholder: 'e.g., Blue and white, Brand colors, Warm tones...',
        required: false
      },
      {
        id: 'image-content',
        question: 'Describe what should be shown in the image',
        type: 'textarea',
        placeholder: 'Describe the subject, scene, objects, or concepts to include...',
        required: true
      }
    ]
  },
  {
    id: 'video-generation',
    title: 'Video Generation',
    description: 'Produce engaging video content and promotional materials.',
    icon: '🎬',
    questions: [
      {
        id: 'video-type',
        question: 'What type of video are you creating?',
        type: 'select',
        placeholder: 'Select video type',
        options: ['Explainer Video', 'Product Demo', 'Social Media Video', 'Advertisement', 'Tutorial', 'Testimonial'],
        required: true
      },
      {
        id: 'video-length',
        question: 'How long should the video be?',
        type: 'select',
        placeholder: 'Select video length',
        options: ['15-30 seconds', '30-60 seconds', '1-2 minutes', '2-5 minutes', '5+ minutes'],
        required: true
      },
      {
        id: 'video-style',
        question: 'What style of video do you want?',
        type: 'select',
        placeholder: 'Select video style',
        options: ['Animated', 'Live Action', 'Screen Recording', 'Slideshow', 'Mixed Media'],
        required: true
      },
      {
        id: 'video-message',
        question: 'What is the main message or story?',
        type: 'textarea',
        placeholder: 'Describe the key message, story, or information to convey...',
        required: true
      }
    ]
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Optimize your content for better search engine visibility.',
    icon: '🔍',
    questions: [
      {
        id: 'target-keywords',
        question: 'What are your target keywords?',
        type: 'text',
        placeholder: 'e.g., digital marketing, social media management...',
        required: true
      },
      {
        id: 'content-type-seo',
        question: 'What type of content are you optimizing?',
        type: 'select',
        placeholder: 'Select content type',
        options: ['Website Page', 'Blog Post', 'Product Page', 'Landing Page', 'Category Page'],
        required: true
      },
      {
        id: 'target-audience-seo',
        question: 'Who is your target audience?',
        type: 'textarea',
        placeholder: 'Describe your ideal reader/customer and their search intent...',
        required: true
      },
      {
        id: 'competitors',
        question: 'Who are your main competitors?',
        type: 'text',
        placeholder: 'List competitor websites or brands...',
        required: false
      }
    ]
  }
];