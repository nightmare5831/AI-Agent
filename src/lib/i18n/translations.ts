// translations.ts

export const translations: any = {
  'en': {
    // Auth Section
    auth: {
      signin: {
        title: 'Sign In Your Account',
        email: 'Email',
        password: 'Password',
        forgotPassword: 'Forgot password?',
        signInButton: 'Sign in',
        signingIn: 'Signing in...',
        orContinueWith: 'Or continue with',
        google: 'Google',
        apple: 'Apple',
        dontHaveAccount: "Don't have an account?",
        signUpLink: 'Sign up',
        successMessage: 'Successfully signed in!'
      },
      signup: {
        title: 'Create Your Account',
        fullName: 'Full Name',
        email: 'Email',
        password: 'Password',
        createAccountButton: 'Create account',
        creatingAccount: 'Creating account...',
        orContinueWith: 'Or continue with',
        google: 'Google',
        apple: 'Apple',
        alreadyHaveAccount: 'Already have an account?',
        signInLink: 'Sign in',
        successMessage: 'Account created successfully! Please signIn'
      },
      security: {
        changePassword: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmNewPassword: 'Confirm New Password',
        updatePassword: 'Update Password',
        twoFactorAuth: 'Two-Factor Authentication',
        dangerZone: 'Danger Zone',
        deleteAccount: 'Delete Account'
      }
    },

    // Dashboard Section
    dashboard: {
      welcome: 'Welcome back',
      overview: "Here's an overview of your account and recent activity",
      currentPlan: 'Current Plan',
      creditsRemaining: 'Credits Remaining',
      usageThisMonth: 'Usage This Month',
      planDetails: 'Plan Details',
      recentCreditUsage: 'Recent Credit Usage',
      totalUsers: 'Total Users',
      activeSubscriptions: 'Active Subscriptions',
      userManagement: 'User Management',
      systemSettings: 'System Settings',
      adminTitle: 'Admin Dashboard',
      adminSubtitle: 'Monitor and manage users, subscriptions and credit usage'
    },

    // Navigation
    navigation: {
      dashboard: 'Dashboard',
      users: 'Users',
      credits: 'Credits',
      agents: 'Agents',
      usageHistory: 'Usage History',
      settings: 'Settings',
      logout: 'Log out'
    },

    // User Section
    user: {
      agents: {
        title: 'AI Agents',
        subtitle: 'Transform your content marketing with intelligent AI agents',
        activeProject: 'Active Project',
        create: 'Create',
        delete: 'Delete',
        deleteProject: 'Delete Project',
        cancel: 'Cancel'
      },
      credits: {
        title: 'Purchase Credits & Upgrade Plan',
        subtitle: 'Upgrade your plan or purchase additional credits to continue using our services',
        currentPlan: 'Your Current Plan',
        currentPlanDescription: 'You are currently on the {plan} plan with {credits} credits remaining.',
        upgradePlan: 'Upgrade Your Plan',
        purchaseCredits: 'Purchase Additional Credits',
        selectPlan: 'Select Plan',
        currentPlanButton: 'Current Plan',
        purchaseNow: 'Purchase Now',
        referralProgram: 'Referral Program',
        planDetails: 'Plan Details',
        creditDetails: 'Credit Details',
        plan: 'Plan',
        price: 'Price',
        nextBilling: 'Next Billing',
        monthlyCredits: 'Monthly Credits',
        currentBalance: 'Current Balance',
        resetDate: 'Reset Date',
        recommended: 'Recommended',
        bestValue: 'Best Value',
        credits: 'credits',
        perCredit: 'per credit',
        lowCreditsWarning: 'You have less than 10 credits remaining. Consider purchasing additional credits to avoid interruptions.',
        referralDescription: 'Invite your friends and get 50 free credits for each successful referral. Your friends will also receive 25 free credits on signup.',
        copyLink: 'Copy Link',
        subscriptionSuccess: 'Subscription created successfully!',
        subscriptionError: 'Failed to create Subscription. Please try again.',
        creditPurchaseSuccess: 'Credit purchased successfully!',
        includesCreditsPerMonth: 'Includes {credits} credits per month',
        selectPlanButton: 'Select Plan',
        bestValueBadge: 'Best Value',
        creditsUnit: 'credits',
        perCreditText: 'per credit',
        purchaseNowButton: 'Purchase Now',
        // Plan names
        monthlyPlan: 'Monthly Plan',
        annualPlan: 'Annual Plan',
        extraPack: 'Extra Pack',
        // Intervals
        month: 'month',
        annual: 'annual',
        // Features
        aiCredits: '{credits} AI Credits',
        allAiAgents: 'All AI Agents',
        aiSchedulingBot: 'AI Scheduling Bot',
        prioritySupport: 'Priority Support',
        dayHistory: '{days}-day History'
      },
      usage: {
        title: 'Credit Usage History',
        subtitle: 'Track and analyze your AI credit usage',
        summary: 'Usage Summary',
        monthlyAllocation: 'Monthly Allocation',
        usedThisMonth: 'Used this Month',
        remainingBalance: 'Remaining Balance',
        usageTrend: 'Usage Trend',
        activityLog: 'Activity Log',
        resetDate: 'Resets on May 26, 2025',
        percentageUsed: 'of your monthly limit',
        creditsUnit: 'Credits',
        expireWarning: 'Will expire if not used',
        usageTrendDescription: 'Daily credit usage over time',
        activityLogDescription: 'Detailed record of your AI agent usage',
        export: 'Export',
        success: 'success',
        failed: 'failed',
        timeRanges: {
          sevenDays: '7-days',
          thirtyDays: '30-days',
          ninetyDays: '90-days'
        },
        tableHeaders: {
          date: 'Date',
          agent: 'Agent',
          activity: 'Activity',
          creditsUsed: 'Credits Used',
          status: 'Status'
        }
      }
    },

    // Agents Section
    agents: {
      results: 'Agent Results',
      noResults: 'No results yet. Run any agent to see results here.',
      clearAll: 'Clear All',
      socialMediaCaption: 'Social Media Caption',
      pageCopy: 'Page Copy',
      aiImageGeneration: 'AI Image Generation Script',
      marketingStrategy: 'Marketing Strategy Summary',
      contentSchedule: 'Your 7-Day Content Schedule',
      
      // Marketing Strategy Agent
      marketingStrategyAgent: {
        title: 'Marketing Strategy',
        description: 'Get personalized marketing strategy with step-by-step guidance from an AI marketing consultant.',
        questionCounter: 'Question {current} of {total}',
        aiConsultant: '🤖 AI Marketing Consultant',
        pleaseProvideComplete: 'Please provide a complete and specific answer.',
        previous: 'Previous',
        test: 'Test',
        next: 'Next',
        complete: 'Complete',
        consultationCompleted: '🎯 Strategic consultation completed! Ready to generate your business summary.',
        analyzingCreating: 'Analyzing & Creating Summary...',
        generateSummary: 'Generate Strategic Summary',
        successfullyGenerated: 'Successfully Generated! 🎉',
        strategicSummary: 'Strategic Business Summary:',
        startOver: 'Start Over',
        insufficientCredits: 'Insufficient Credit balance, please charge this!',
        
        // Questions
        questions: {
          brandName: 'What is the name of your brand or business?',
          brandNamePlaceholder: 'Enter your brand or business name',
          
          productService: 'What exactly do you sell or offer?',
          productServicePlaceholder: 'e.g., online baking courses, residential painting services, women\'s fitness clothing, marketing consulting for freelancers. Be specific and include examples if possible.',
          
          targetAudience: 'Who is your ideal audience?',
          targetAudiencePlaceholder: 'Describe age, profession, pain points, desires, location, level of knowledge about the topic, etc. This helps make content more attractive and relevant.',
          
          differentiator: 'What is your main differentiator or promise?',
          differentiatorPlaceholder: 'Why should someone buy from you and not someone else? Examples: more personal service, affordable price, faster delivery, exclusive product, differentiated support, etc.',
          
          marketingGoals: 'What is your main goal with marketing? (you can choose more than one)',
          marketingGoalsPlaceholder: 'Select your primary marketing goal',
          
          communicationTone: 'What tone do you want to convey in your communication?',
          communicationTonePlaceholder: 'Select your preferred communication tone',
          
          socialPlatforms: 'Do you already sell on social media? Which platforms do you use or plan to use?',
          socialPlatformsPlaceholder: 'e.g., Instagram, Facebook, WhatsApp, YouTube, TikTok, LinkedIn...',
          
          limitations: 'Are there any important limitations we should consider?',
          limitationsPlaceholder: 'e.g., Little time to record, no designer, don\'t like video, no website, don\'t want to appear, limited budget, etc.',
          
          focusProducts: 'What are your most important products or services (that you want to focus on first)?',
          focusProductsPlaceholder: 'List your priority products/services for marketing focus',
          
          positioningStatus: 'Do you already have a clear positioning or do you want help defining it?',
          positioningStatusPlaceholder: 'Select your positioning status',
          
          competitors: 'Do you have competitors you admire or want to differentiate from?',
          competitorsPlaceholder: 'Share names, links, or profiles of competitors you admire or want to differentiate from',
          
          threeMonthGoals: 'What results do you want to achieve with marketing in the next 3 months?',
          threeMonthGoalsPlaceholder: 'e.g., more sales, more followers, more authority, opening new channels, specific numbers...'
        },
        
        // Options
        options: {
          marketingGoals: [
            'Generate more sales',
            'Grow followers and authority',
            'Capture leads for nurturing',
            'Position the brand as a reference',
            'Attract customers to a physical store',
            'Promote new releases or promotions'
          ],
          
          communicationTone: [
            'Professional and trustworthy',
            'Fun and relaxed',
            'Friendly and welcoming',
            'Creative and bold',
            'Traditional and safe'
          ],
          
          positioningStatus: [
            'I already have a clear positioning',
            'I have an idea, but need help refining it',
            'I don\'t have one yet, I want help defining it'
          ]
        }
      },
      
      marketingCalendarAgent: {
        title: 'Marketing Calendar',
        description: 'Create organized content calendars with strategic timing and themes.',
        emptyStrategy: 'Empty marketing-strategy!. Please create that!',
        insufficientCredits: 'Insufficient Credit balance, please charge this!',
        successMessage: 'Marketing-Calendar result successfully created!',
        successSaved: 'Marketing-Calendar result successfully saved!',
        yourSchedule: 'Your 7-Day Content Schedule:',
        successfullyGenerated: 'Successfully! Generated! 🎉',
        startOver: 'Start Over',
        regenerateSchedule: 'Regenerate Schedule',
        questionCounter: 'Question {current} of {total}',
        previous: 'Previous',
        next: 'Next',
        complete: 'Complete',
        allCompleted: 'All questions completed! ✅',
        creating: 'Creating Schedule...',
        generateSchedule: 'Generate 7-Day Schedule',
        
        // Questions
        questions: {
          postsPerWeek: 'How many posts do you want per week?',
          postsPerWeekPlaceholder: 'Select number of posts per week',
          contentFormats: 'Which content formats do you want to use? (You can select more than one)',
          contentFormatsPlaceholder: 'Select content formats',
          priorityPlatform: 'Do you have any priority social media platform?',
          priorityPlatformPlaceholder: 'Select your priority platform'
        },
        
        // Options
        options: {
          posts: ['3 posts', '5 posts', '7 posts', '10 posts', '14 posts'],
          formats: ['Image', 'Carousel', 'Plain Text', 'Mixed (text + image)'],
          platforms: ['Instagram', 'Facebook', 'TikTok', 'WhatsApp', 'YouTube', 'LinkedIn', 'Twitter', 'No specific priority']
        }
      },
      
      postIdeasAgent: {
        title: 'Post Ideas',
        description: 'Generate creative and engaging social media post concepts based on your strategy and schedule.',
        insufficientCredits: 'Insufficient Credit balance, please charge this!',
        emptyCalendar: 'Empty marketing-calendar!. Please create Schedule!',
        successMessage: 'PostIdeas successfully created!',
        successSaved: 'PostIdeas successfully saved!',
        questionCounter: 'Question {current} of {total}',
        creativeStrategist: '💡 Creative Strategist',
        previous: 'Previous',
        next: 'Next',
        complete: 'Complete',
        usingData: 'Using Data From Previous Agents:',
        brand: 'Brand',
        product: 'Product',
        schedule: 'Schedule',
        postsFrom: '{count} posts from Marketing Calendar',
        allCompleted: 'All questions completed! ✅',
        generating: 'Generating Creative Ideas...',
        generateIdeas: 'Generate Content Ideas',
        creativeContent: 'Creative Content Ideas (2 per post):',
        successfullyGenerated: 'Successfully Generated! 🎉',
        startOver: 'Start Over',
        regenerateIdeas: 'Regenerate Ideas',
        
        // Questions
        questions: {
          creativeStyle: 'What creative style do you prefer for your content ideas?',
          creativeStylePlaceholder: 'Select your preferred creative style',
          contentThemes: 'Which content themes resonate most with your audience? (You can select multiple)',
          contentThemesPlaceholder: 'Select content themes',
          filmingComfort: 'How comfortable are you with creating different types of content?',
          filmingComfortPlaceholder: 'Select your comfort level'
        },
        
        // Options
        options: {
          creativeStyle: [
            'Simple and direct',
            'Creative and bold',
            'Educational and informative',
            'Fun and entertaining',
            'Professional and polished'
          ],
          contentThemes: [
            'Behind-the-scenes',
            'Tips and tutorials',
            'Customer testimonials',
            'Product showcases',
            'Industry trends',
            'Personal stories',
            'Challenges and solutions',
            'Community highlights'
          ],
          filmingComfort: [
            'Prefer behind-the-scenes and product shots',
            'Better with graphics and text-based content',
            'Mix of everything but keep it simple'
          ]
        }
      },
      
      postTextAgent: {
        title: 'Post Text & Scripts',
        description: 'Write compelling copy scripts for your content.',
        insufficientCredits: 'Insufficient Credit balance, please charge this!',
        emptyPostIdeas: 'Empty post-ideas!. Please create Post Ideas!',
        successMessage: 'Post Scripts successfully created!',
        successSaved: 'Post Scripts successfully saved!',
        questionCounter: 'Question {current} of {total}',
        copywriterAI: '✍️ Copywriter AI',
        previous: 'Previous',
        next: 'Next',
        complete: 'Complete',
        allCompleted: 'All questions completed! ✅',
        generating: 'Writing Professional Scripts...',
        generateScripts: 'Generate Copy Scripts',
        copyScripts: 'Professional Copy Scripts:',
        successfullyGenerated: 'Successfully Generated! 🎉',
        startOver: 'Start Over',
        regenerateScripts: 'Regenerate Scripts',
        
        questions: {
          contentType: 'What type of content do you want to create?',
          contentTypePlaceholder: 'Select content types',
          selectedIdea: 'Which content idea from the previous step do you want to develop?',
          selectedIdeaPlaceholder: 'Select a content idea to develop',
          copyFocus: 'What should be the main focus of your copy?',
          copyFocusPlaceholder: 'Select your copy focus',
          ctaPreference: 'What type of call-to-action do you prefer?',
          ctaPreferencePlaceholder: 'Select your CTA preference'
        },
        
        options: {
          contentTypes: ['Social Media Caption', 'Page Copy (Website/WhatsApp)', 'AI Image Generation Script'],
          copyFocus: ['Drive immediate sales', 'Build brand awareness', 'Educate audience', 'Increase engagement', 'Generate leads'],
          ctaPreference: ['Direct sales (Buy now, Shop today)', 'Engagement (Comment, Share, Tag)', 'Traffic (Visit website, Link in bio)', 'Lead generation (DM us, Sign up)', 'Soft approach (Save this post, Follow for more)']
        }
      },
      
      imageGenerationAgent: {
        title: 'Image Generation',
        description: 'Create stunning visuals and graphics for your marketing campaigns.',
        insufficientCredits: 'Insufficient Credit balance, please charge this!',
        successMessage: 'Image Generation successfully created!',
        successSaved: 'Image Generation successfully saved!',
        questionCounter: 'Question {current} of {total}',
        visualCreator: '🎨 Visual Creator AI',
        previous: 'Previous',
        next: 'Next',
        complete: 'Complete',
        allCompleted: 'All questions completed! ✅',
        generating: 'Generating Visual Content...',
        generateImages: 'Generate Images',
        visualContent: 'Generated Visual Content:',
        successfullyGenerated: 'Successfully Generated! 🎉',
        startOver: 'Start Over',
        regenerateImages: 'Regenerate Images',
        
        questions: {
          prompt: 'What image would you like to generate? Describe it in detail.',
          promptPlaceholder: 'Describe the image you want to generate in detail...',
          visualStyle: 'What visual style do you prefer?',
          visualStylePlaceholder: 'Choose visual style',
          imageFormat: 'What format should the image be?',
          imageFormatPlaceholder: 'Select image format',
          includeLogo: 'Do you want to include a logo in the image?',
          includeLogoPlaceholder: 'Include logo?',
          logoPosition: 'Where should the logo be positioned?',
          logoPositionPlaceholder: 'Choose logo position',
          includeProduct: 'Do you want to include a product image?',
          includeProductPlaceholder: 'Include product image?',
          campaignName: 'What is the campaign name for this image?',
          campaignNamePlaceholder: 'Enter campaign name'
        },
        
        options: {
          visualStyle: ['Realistic', 'Illustrated', 'Minimalist', 'Commercial', 'Futuristic'],
          imageFormat: ['Square (Feed)', 'Vertical (Story/Reel)', 'Horizontal (Cover/Banner)'],
          includeLogo: ['Yes', 'No'],
          logoPosition: ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right'],
          includeProduct: ['Yes', 'No']
        }
      },
      
      seoOptimizationAgent: {
        title: 'SEO Optimization',
        description: 'Optimize your content and profile for better search engine visibility and social media reach.',
        insufficientCredits: 'Insufficient Credit balance, please charge this!',
        successMessage: 'SEO Optimization successfully created!',
        successSaved: 'SEO Optimization successfully saved!',
        questionCounter: 'Question {current} of {total}',
        seoSpecialist: '🔍 SEO Specialist AI',
        previous: 'Previous',
        next: 'Next',
        complete: 'Complete',
        allCompleted: 'All questions completed! ✅',
        generating: 'Optimizing Content...',
        generateOptimization: 'Generate SEO Optimization',
        seoContent: 'SEO Optimization Results:',
        successfullyGenerated: 'Successfully Generated! 🎉',
        startOver: 'Start Over',
        regenerateOptimization: 'Regenerate Optimization',
        
        questions: {
          optimizationType: 'What would you like to optimize?',
          optimizationTypePlaceholder: 'Select optimization type',
          caption: 'Caption or Post Text',
          captionPlaceholder: 'Enter your current post caption...',
          targetPlatform: 'Target Platform',
          targetPlatformPlaceholder: 'Select target platform',
          mainTheme: 'Main Theme of Content',
          mainThemePlaceholder: 'e.g., anxiety and productivity',
          postObjective: 'Post Objective',
          postObjectivePlaceholder: 'Select post objective',
          brandName: 'Brand or Professional Name',
          brandNamePlaceholder: 'Your brand/professional name',
          niche: 'Niche / Field of Activity',
          nichePlaceholder: 'e.g., Fitness Coach, Digital Marketing',
          idealAudience: 'Ideal Audience',
          idealAudiencePlaceholder: 'Describe your target audience',
          toneOfVoice: 'Tone of Voice',
          toneOfVoicePlaceholder: 'Select tone of voice',
          primaryContact: 'Primary Contact Channel',
          primaryContactPlaceholder: 'Select contact channel'
        },
        
        options: {
          optimizationType: ['Content Optimization', 'Profile Optimization'],
          targetPlatform: ['Instagram', 'TikTok', 'Facebook', 'YouTube Shorts'],
          postObjective: ['Attract', 'Sell', 'Educate', 'Engage'],
          toneOfVoice: ['Casual', 'Technical', 'Institutional', 'Other'],
          primaryContact: ['WhatsApp', 'Link in Bio', 'DM', 'Other']
        }
      }
    },

    // Home Section
    home: {
      header: {
        features: 'Features',
        testimonials: 'Testimonials',
        about: 'About',
        dashboard: 'Dashboard',
        signIn: 'Sign In',
        getStarted: 'Get Started'
      },
      hero: {
        title: 'Transform Your Business with AI-Powered Automation',
        subtitle: 'Streamline your operations, enhance customer engagement, and boost productivity with our intelligent automation platform.',
        learnMore: 'Learn More',
        aiPoweredTools: 'AI-Powered Tools',
        studentEngagement: 'Student Engagement',
        detailedAnalytics: 'Detailed Analytics',
        business: 'Business',
        users: 'users',
        satisfaction: 'Satisfaction'
      },
      features: {
        badge: 'Key Capabilities',
        title: 'AI-Powered Automation for Smart Businesses',
        subtitle: 'Automate your business operations through WhatsApp with advanced AI agents that understand context and provide intelligent responses.',
        ctaTitle: 'Ready to transform your business with AI?',
        ctaSubtitle: 'Discover how our platform automates marketing, customer service, and business processes through intelligent WhatsApp integration.',
        exploreFeatures: 'Explore all features'
      },
      testimonials: {
        badge: 'Success stories',
        title: 'Trusted by Businesses',
        subtitle: 'See how our AI automation tools are helping businesses streamline operations and improve customer engagement.',
        viewAll: 'View all testimonials'
      },
      footer: {
        brandName: 'Smart Agent',
        description: 'Empowering businesses with intelligent automation and seamless customer engagement through AI-powered solutions.',
        solutions: 'Solutions',
        company: 'Company',
        resources: 'Resources',
        legal: 'Legal',
        allRightsReserved: 'All rights reserved',
        bottomText: 'Crafted with innovation to power business automation and customer engagement.'
      }
    },

    // Sidebar
    sidebar: {
      settings: 'Settings'
    },

    // Common
    common: {
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      close: 'Close',
      open: 'Open',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      reset: 'Reset',
      clear: 'Clear',
      apply: 'Apply',
      select: 'Select',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name'
    }
  },

  'pt': {
    // Auth Section
    auth: {
      signin: {
        title: 'Faça Login na Sua Conta',
        email: 'Email',
        password: 'Senha',
        forgotPassword: 'Esqueceu a senha?',
        signInButton: 'Entrar',
        signingIn: 'Entrando...',
        orContinueWith: 'Ou continue com',
        google: 'Google',
        apple: 'Apple',
        dontHaveAccount: 'Não tem uma conta?',
        signUpLink: 'Cadastre-se',
        successMessage: 'Login realizado com sucesso!'
      },
      signup: {
        title: 'Crie Sua Conta',
        fullName: 'Nome Completo',
        email: 'Email',
        password: 'Senha',
        createAccountButton: 'Criar conta',
        creatingAccount: 'Criando conta...',
        orContinueWith: 'Ou continue com',
        google: 'Google',
        apple: 'Apple',
        alreadyHaveAccount: 'Já tem uma conta?',
        signInLink: 'Entrar',
        successMessage: 'Conta criada com sucesso! Por favor, faça login'
      },
      security: {
        changePassword: 'Alterar Senha',
        currentPassword: 'Senha Atual',
        newPassword: 'Nova Senha',
        confirmNewPassword: 'Confirmar Nova Senha',
        updatePassword: 'Atualizar Senha',
        twoFactorAuth: 'Autenticação de Dois Fatores',
        dangerZone: 'Zona de Perigo',
        deleteAccount: 'Excluir Conta'
      }
    },

    // Dashboard Section
    dashboard: {
      welcome: 'Bem-vindo de volta',
      overview: 'Aqui está uma visão geral da sua conta e atividades recentes',
      currentPlan: 'Plano Atual',
      creditsRemaining: 'Créditos Restantes',
      usageThisMonth: 'Uso Este Mês',
      planDetails: 'Detalhes do Plano',
      recentCreditUsage: 'Uso Recente de Créditos',
      totalUsers: 'Total de Usuários',
      activeSubscriptions: 'Assinaturas Ativas',
      userManagement: 'Gerenciamento de Usuários',
      systemSettings: 'Configurações do Sistema',
      adminTitle: 'Painel Admin',
      adminSubtitle: 'Monitore e gerencie usuários, assinaturas e uso de créditos'
    },

    // Navigation
    navigation: {
      dashboard: 'Painel',
      users: 'Usuários',
      credits: 'Créditos',
      agents: 'Agentes',
      usageHistory: 'Histórico de Uso',
      settings: 'Configurações',
      logout: 'Sair'
    },

    // User Section
    user: {
      agents: {
        title: 'Agentes AI',
        subtitle: 'Transforme seu marketing de conteúdo com agentes AI inteligentes',
        activeProject: 'Projeto Ativo',
        create: 'Criar',
        delete: 'Excluir',
        deleteProject: 'Excluir Projeto',
        cancel: 'Cancelar'
      },
      credits: {
        title: 'Comprar Créditos e Atualizar Plano',
        subtitle: 'Atualize seu plano ou compre créditos adicionais para continuar usando nossos serviços',
        currentPlan: 'Seu Plano Atual',
        currentPlanDescription: 'Você está atualmente no plano {plan} com {credits} créditos restantes.',
        upgradePlan: 'Atualizar Seu Plano',
        purchaseCredits: 'Comprar Créditos Adicionais',
        selectPlan: 'Selecionar Plano',
        currentPlanButton: 'Plano Atual',
        purchaseNow: 'Comprar Agora',
        referralProgram: 'Programa de Indicação',
        planDetails: 'Detalhes do Plano',
        creditDetails: 'Detalhes dos Créditos',
        plan: 'Plano',
        price: 'Preço',
        nextBilling: 'Próxima Cobrança',
        monthlyCredits: 'Créditos Mensais',
        currentBalance: 'Saldo Atual',
        resetDate: 'Data de Reset',
        recommended: 'Recomendado',
        bestValue: 'Melhor Valor',
        credits: 'créditos',
        perCredit: 'por crédito',
        lowCreditsWarning: 'Você tem menos de 10 créditos restantes. Considere comprar créditos adicionais para evitar interrupções.',
        referralDescription: 'Convide seus amigos e ganhe 50 créditos grátis para cada indicação bem-sucedida. Seus amigos também receberão 25 créditos grátis no cadastro.',
        copyLink: 'Copiar Link',
        subscriptionSuccess: 'Assinatura criada com sucesso!',
        subscriptionError: 'Falha ao criar Assinatura. Tente novamente.',
        creditPurchaseSuccess: 'Crédito comprado com sucesso!',
        includesCreditsPerMonth: 'Inclui {credits} créditos por mês',
        selectPlanButton: 'Selecionar Plano',
        bestValueBadge: 'Melhor Valor',
        creditsUnit: 'créditos',
        perCreditText: 'por crédito',
        purchaseNowButton: 'Comprar Agora',
        // Plan names
        monthlyPlan: 'Plano Mensal',
        annualPlan: 'Plano Anual',
        extraPack: 'Pacote Extra',
        // Intervals
        month: 'mês',
        annual: 'anual',
        // Features
        aiCredits: '{credits} Créditos AI',
        allAiAgents: 'Todos os Agentes AI',
        aiSchedulingBot: 'Bot de Agendamento AI',
        prioritySupport: 'Suporte Prioritário',
        dayHistory: 'Histórico de {days} dias'
      },
      usage: {
        title: 'Histórico de Uso de Créditos',
        subtitle: 'Acompanhe e analise o uso dos seus créditos AI',
        summary: 'Resumo de Uso',
        monthlyAllocation: 'Alocação Mensal',
        usedThisMonth: 'Usado Este Mês',
        remainingBalance: 'Saldo Restante',
        usageTrend: 'Tendência de Uso',
        activityLog: 'Registro de Atividades',
        resetDate: 'Reinicia em 26 de maio de 2025',
        percentageUsed: 'do seu limite mensal',
        creditsUnit: 'Créditos',
        expireWarning: 'Expirará se não for usado',
        usageTrendDescription: 'Uso diário de créditos ao longo do tempo',
        activityLogDescription: 'Registro detalhado do uso do seu agente AI',
        export: 'Exportar',
        success: 'sucesso',
        failed: 'falha',
        timeRanges: {
          sevenDays: '7-dias',
          thirtyDays: '30-dias',
          ninetyDays: '90-dias'
        },
        tableHeaders: {
          date: 'Data',
          agent: 'Agente',
          activity: 'Atividade',
          creditsUsed: 'Créditos Usados',
          status: 'Status'
        }
      }
    },

    // Agents Section
    agents: {
      results: 'Resultados do Agente',
      noResults: 'Nenhum resultado ainda. Execute qualquer agente para ver os resultados aqui.',
      clearAll: 'Limpar Tudo',
      socialMediaCaption: 'Legenda de Mídia Social',
      pageCopy: 'Cópia da Página',
      aiImageGeneration: 'Script de Geração de Imagem AI',
      marketingStrategy: 'Resumo da Estratégia de Marketing',
      contentSchedule: 'Sua Programação de Conteúdo de 7 Dias',
      
      // Marketing Strategy Agent
      marketingStrategyAgent: {
        title: 'Estratégia de Marketing',
        description: 'Obtenha uma estratégia de marketing personalizada com orientação passo a passo de um consultor de marketing AI.',
        questionCounter: 'Pergunta {current} de {total}',
        aiConsultant: '🤖 Consultor de Marketing AI',
        pleaseProvideComplete: 'Por favor, forneça uma resposta completa e específica.',
        previous: 'Anterior',
        test: 'Testar',
        next: 'Próximo',
        complete: 'Concluir',
        consultationCompleted: '🎯 Consulta estratégica concluída! Pronto para gerar seu resumo empresarial.',
        analyzingCreating: 'Analisando e Criando Resumo...',
        generateSummary: 'Gerar Resumo Estratégico',
        successfullyGenerated: 'Gerado com Sucesso! 🎉',
        strategicSummary: 'Resumo Estratégico Empresarial:',
        startOver: 'Começar Novamente',
        insufficientCredits: 'Saldo de créditos insuficiente, por favor recarregue!',
        
        // Questions
        questions: {
          brandName: 'Qual é o nome da sua marca ou negócio?',
          brandNamePlaceholder: 'Digite o nome da sua marca ou negócio',
          
          productService: 'O que exatamente você vende ou oferece?',
          productServicePlaceholder: 'ex: cursos online de confeitaria, serviços de pintura residencial, roupas fitness femininas, consultoria de marketing para freelancers. Seja específico e inclua exemplos se possível.',
          
          targetAudience: 'Quem é seu público ideal?',
          targetAudiencePlaceholder: 'Descreva idade, profissão, dores, desejos, localização, nível de conhecimento sobre o tema, etc. Isso ajuda a tornar o conteúdo mais atraente e relevante.',
          
          differentiator: 'Qual é seu principal diferencial ou promessa?',
          differentiatorPlaceholder: 'Por que alguém deveria comprar de você e não de outra pessoa? Exemplos: atendimento mais pessoal, preço acessível, entrega mais rápida, produto exclusivo, suporte diferenciado, etc.',
          
          marketingGoals: 'Qual é seu principal objetivo com marketing? (você pode escolher mais de um)',
          marketingGoalsPlaceholder: 'Selecione seu objetivo principal de marketing',
          
          communicationTone: 'Que tom você quer transmitir na sua comunicação?',
          communicationTonePlaceholder: 'Selecione seu tom de comunicação preferido',
          
          socialPlatforms: 'Você já vende nas redes sociais? Quais plataformas usa ou planeja usar?',
          socialPlatformsPlaceholder: 'ex: Instagram, Facebook, WhatsApp, YouTube, TikTok, LinkedIn...',
          
          limitations: 'Existem limitações importantes que devemos considerar?',
          limitationsPlaceholder: 'ex: Pouco tempo para gravar, sem designer, não gosta de vídeo, sem site, não quer aparecer, orçamento limitado, etc.',
          
          focusProducts: 'Quais são seus produtos ou serviços mais importantes (que você quer focar primeiro)?',
          focusProductsPlaceholder: 'Liste seus produtos/serviços prioritários para foco de marketing',
          
          positioningStatus: 'Você já tem um posicionamento claro ou quer ajuda para definir?',
          positioningStatusPlaceholder: 'Selecione seu status de posicionamento',
          
          competitors: 'Você tem concorrentes que admira ou quer se diferenciar?',
          competitorsPlaceholder: 'Compartilhe nomes, links ou perfis de concorrentes que admira ou quer se diferenciar',
          
          threeMonthGoals: 'Que resultados você quer alcançar com marketing nos próximos 3 meses?',
          threeMonthGoalsPlaceholder: 'ex: mais vendas, mais seguidores, mais autoridade, abertura de novos canais, números específicos...'
        },
        
        // Options
        options: {
          marketingGoals: [
            'Gerar mais vendas',
            'Crescer seguidores e autoridade',
            'Capturar leads para nutrição',
            'Posicionar a marca como referência',
            'Atrair clientes para loja física',
            'Promover lançamentos ou promoções'
          ],
          
          communicationTone: [
            'Profissional e confiável',
            'Divertido e descontraído',
            'Amigável e acolhedor',
            'Criativo e ousado',
            'Tradicional e seguro'
          ],
          
          positioningStatus: [
            'Já tenho um posicionamento claro',
            'Tenho uma ideia, mas preciso de ajuda para refinar',
            'Ainda não tenho, quero ajuda para definir'
          ]
        }
      },
      
      marketingCalendarAgent: {
        title: 'Calendário de Marketing',
        description: 'Crie calendários de conteúdo organizados com timing e temas estratégicos.',
        emptyStrategy: 'Estratégia de marketing vazia!. Por favor, crie uma!',
        insufficientCredits: 'Saldo de créditos insuficiente, por favor recarregue!',
        successMessage: 'Resultado do Calendário de Marketing criado com sucesso!',
        successSaved: 'Resultado do Calendário de Marketing salvo com sucesso!',
        yourSchedule: 'Sua Programação de Conteúdo de 7 Dias:',
        successfullyGenerated: 'Gerado com Sucesso! 🎉',
        startOver: 'Começar Novamente',
        regenerateSchedule: 'Regenerar Programação',
        questionCounter: 'Pergunta {current} de {total}',
        previous: 'Anterior',
        next: 'Próximo',
        complete: 'Concluir',
        allCompleted: 'Todas as perguntas concluídas! ✅',
        creating: 'Criando Programação...',
        generateSchedule: 'Gerar Programação de 7 Dias',
        
        // Questions
        questions: {
          postsPerWeek: 'Quantas postagens você quer por semana?',
          postsPerWeekPlaceholder: 'Selecione o número de postagens por semana',
          contentFormats: 'Quais formatos de conteúdo você quer usar? (Você pode selecionar mais de um)',
          contentFormatsPlaceholder: 'Selecione formatos de conteúdo',
          priorityPlatform: 'Você tem alguma plataforma de mídia social prioritária?',
          priorityPlatformPlaceholder: 'Selecione sua plataforma prioritária'
        },
        
        // Options
        options: {
          posts: ['3 postagens', '5 postagens', '7 postagens', '10 postagens', '14 postagens'],
          formats: ['Imagem', 'Carrossel', 'Texto Simples', 'Misto (texto + imagem)'],
          platforms: ['Instagram', 'Facebook', 'TikTok', 'WhatsApp', 'YouTube', 'LinkedIn', 'Twitter', 'Sem prioridade específica']
        }
      },
      
      postIdeasAgent: {
        title: 'Ideias de Posts',
        description: 'Gere conceitos criativos e envolventes de posts para redes sociais baseados em sua estratégia e programação.',
        insufficientCredits: 'Saldo de créditos insuficiente, por favor recarregue!',
        emptyCalendar: 'Calendário de marketing vazio!. Por favor, crie uma Programação!',
        successMessage: 'Ideias de Posts criadas com sucesso!',
        successSaved: 'Ideias de Posts salvas com sucesso!',
        questionCounter: 'Pergunta {current} de {total}',
        creativeStrategist: '💡 Estrategista Criativo',
        previous: 'Anterior',
        next: 'Próximo',
        complete: 'Concluir',
        usingData: 'Usando Dados de Agentes Anteriores:',
        brand: 'Marca',
        product: 'Produto',
        schedule: 'Programação',
        postsFrom: '{count} posts do Calendário de Marketing',
        allCompleted: 'Todas as perguntas concluídas! ✅',
        generating: 'Gerando Ideias Criativas...',
        generateIdeas: 'Gerar Ideias de Conteúdo',
        creativeContent: 'Ideias de Conteúdo Criativo (2 por post):',
        successfullyGenerated: 'Gerado com Sucesso! 🎉',
        startOver: 'Começar Novamente',
        regenerateIdeas: 'Regenerar Ideias',
        
        // Questions
        questions: {
          creativeStyle: 'Qual estilo criativo você prefere para suas ideias de conteúdo?',
          creativeStylePlaceholder: 'Selecione seu estilo criativo preferido',
          contentThemes: 'Quais temas de conteúdo mais ressoam com seu público? (Você pode selecionar vários)',
          contentThemesPlaceholder: 'Selecione temas de conteúdo',
          filmingComfort: 'Quão confortável você está com a criação de diferentes tipos de conteúdo?',
          filmingComfortPlaceholder: 'Selecione seu nível de conforto'
        },
        
        // Options
        options: {
          creativeStyle: [
            'Simples e direto',
            'Criativo e ousado',
            'Educativo e informativo',
            'Divertido e entretenimento',
            'Profissional e polido'
          ],
          contentThemes: [
            'Bastidores',
            'Dicas e tutoriais',
            'Depoimentos de clientes',
            'Mostruário de produtos',
            'Tendências do setor',
            'Histórias pessoais',
            'Desafios e soluções',
            'Destaques da comunidade'
          ],
          filmingComfort: [
            'Prefiro bastidores e fotos de produtos',
            'Melhor com gráficos e conteúdo baseado em texto',
            'Mix de tudo, mas mantendo simples'
          ]
        }
      },
      
      postTextAgent: {
        title: 'Textos e Scripts',
        description: 'Escreva scripts de copy convincentes para seu conteúdo.',
        insufficientCredits: 'Saldo de créditos insuficiente, por favor recarregue!',
        emptyPostIdeas: 'Ideias de posts vazias!. Por favor, crie Ideias de Posts!',
        successMessage: 'Scripts de Posts criados com sucesso!',
        successSaved: 'Scripts de Posts salvos com sucesso!',
        questionCounter: 'Pergunta {current} de {total}',
        copywriterAI: '✍️ Copywriter AI',
        previous: 'Anterior',
        next: 'Próximo',
        complete: 'Concluir',
        allCompleted: 'Todas as perguntas concluídas! ✅',
        generating: 'Escrevendo Scripts Profissionais...',
        generateScripts: 'Gerar Scripts de Copy',
        copyScripts: 'Scripts de Copy Profissionais:',
        successfullyGenerated: 'Gerado com Sucesso! 🎉',
        startOver: 'Começar Novamente',
        regenerateScripts: 'Regenerar Scripts',
        
        questions: {
          contentType: 'Que tipo de conteúdo você quer criar?',
          contentTypePlaceholder: 'Selecione tipos de conteúdo',
          selectedIdea: 'Qual ideia de conteúdo da etapa anterior você quer desenvolver?',
          selectedIdeaPlaceholder: 'Selecione uma ideia de conteúdo para desenvolver',
          copyFocus: 'Qual deve ser o foco principal do seu copy?',
          copyFocusPlaceholder: 'Selecione o foco do seu copy',
          ctaPreference: 'Que tipo de call-to-action você prefere?',
          ctaPreferencePlaceholder: 'Selecione sua preferência de CTA'
        },
        
        options: {
          contentTypes: ['Legenda de Mídia Social', 'Copy de Página (Website/WhatsApp)', 'Script de Geração de Imagem AI'],
          copyFocus: ['Gerar vendas imediatas', 'Construir consciência de marca', 'Educar audiência', 'Aumentar engajamento', 'Gerar leads'],
          ctaPreference: ['Vendas diretas (Compre agora, Compre hoje)', 'Engajamento (Comente, Compartilhe, Marque)', 'Tráfego (Visite o site, Link na bio)', 'Geração de leads (Mande DM, Inscreva-se)', 'Abordagem suave (Salve este post, Siga para mais)']
        }
      },
      
      imageGenerationAgent: {
        title: 'Geração de Imagens',
        description: 'Crie visuais impressionantes e gráficos para suas campanhas de marketing.',
        insufficientCredits: 'Saldo de créditos insuficiente, por favor recarregue!',
        successMessage: 'Geração de Imagens criada com sucesso!',
        successSaved: 'Geração de Imagens salva com sucesso!',
        questionCounter: 'Pergunta {current} de {total}',
        visualCreator: '🎨 Criador Visual AI',
        previous: 'Anterior',
        next: 'Próximo',
        complete: 'Concluir',
        allCompleted: 'Todas as perguntas concluídas! ✅',
        generating: 'Gerando Conteúdo Visual...',
        generateImages: 'Gerar Imagens',
        visualContent: 'Conteúdo Visual Gerado:',
        successfullyGenerated: 'Gerado com Sucesso! 🎉',
        startOver: 'Começar Novamente',
        regenerateImages: 'Regenerar Imagens',
        
        questions: {
          prompt: 'Que imagem você gostaria de gerar? Descreva em detalhes.',
          promptPlaceholder: 'Descreva a imagem que você quer gerar em detalhes...',
          visualStyle: 'Que estilo visual você prefere?',
          visualStylePlaceholder: 'Escolha o estilo visual',
          imageFormat: 'Qual formato a imagem deve ter?',
          imageFormatPlaceholder: 'Selecione o formato da imagem',
          includeLogo: 'Você quer incluir um logo na imagem?',
          includeLogoPlaceholder: 'Incluir logo?',
          logoPosition: 'Onde o logo deve ser posicionado?',
          logoPositionPlaceholder: 'Escolha a posição do logo',
          includeProduct: 'Você quer incluir uma imagem de produto?',
          includeProductPlaceholder: 'Incluir imagem de produto?',
          campaignName: 'Qual é o nome da campanha para esta imagem?',
          campaignNamePlaceholder: 'Digite o nome da campanha'
        },
        
        options: {
          visualStyle: ['Realista', 'Ilustrado', 'Minimalista', 'Comercial', 'Futurista'],
          imageFormat: ['Quadrado (Feed)', 'Vertical (Story/Reel)', 'Horizontal (Capa/Banner)'],
          includeLogo: ['Sim', 'Não'],
          logoPosition: ['Superior Esquerdo', 'Superior Direito', 'Inferior Esquerdo', 'Inferior Direito'],
          includeProduct: ['Sim', 'Não']
        }
      },
      
      seoOptimizationAgent: {
        title: 'Otimização SEO',
        description: 'Otimize seu conteúdo e perfil para melhor visibilidade nos mecanismos de busca e alcance nas redes sociais.',
        insufficientCredits: 'Saldo de créditos insuficiente, por favor recarregue!',
        successMessage: 'Otimização SEO criada com sucesso!',
        successSaved: 'Otimização SEO salva com sucesso!',
        questionCounter: 'Pergunta {current} de {total}',
        seoSpecialist: '🔍 Especialista SEO AI',
        previous: 'Anterior',
        next: 'Próximo',
        complete: 'Concluir',
        allCompleted: 'Todas as perguntas concluídas! ✅',
        generating: 'Otimizando Conteúdo...',
        generateOptimization: 'Gerar Otimização SEO',
        seoContent: 'Resultados da Otimização SEO:',
        successfullyGenerated: 'Gerado com Sucesso! 🎉',
        startOver: 'Começar Novamente',
        regenerateOptimization: 'Regenerar Otimização',
        
        questions: {
          optimizationType: 'O que você gostaria de otimizar?',
          optimizationTypePlaceholder: 'Selecione o tipo de otimização',
          caption: 'Legenda ou Texto do Post',
          captionPlaceholder: 'Digite sua legenda atual do post...',
          targetPlatform: 'Plataforma Alvo',
          targetPlatformPlaceholder: 'Selecione a plataforma alvo',
          mainTheme: 'Tema Principal do Conteúdo',
          mainThemePlaceholder: 'ex: ansiedade e produtividade',
          postObjective: 'Objetivo do Post',
          postObjectivePlaceholder: 'Selecione o objetivo do post',
          brandName: 'Nome da Marca ou Profissional',
          brandNamePlaceholder: 'Seu nome de marca/profissional',
          niche: 'Nicho / Área de Atuação',
          nichePlaceholder: 'ex: Coach de Fitness, Marketing Digital',
          idealAudience: 'Público Ideal',
          idealAudiencePlaceholder: 'Descreva seu público-alvo',
          toneOfVoice: 'Tom de Voz',
          toneOfVoicePlaceholder: 'Selecione o tom de voz',
          primaryContact: 'Canal de Contato Principal',
          primaryContactPlaceholder: 'Selecione o canal de contato'
        },
        
        options: {
          optimizationType: ['Otimização de Conteúdo', 'Otimização de Perfil'],
          targetPlatform: ['Instagram', 'TikTok', 'Facebook', 'YouTube Shorts'],
          postObjective: ['Atrair', 'Vender', 'Educar', 'Engajar'],
          toneOfVoice: ['Casual', 'Técnico', 'Institucional', 'Outro'],
          primaryContact: ['WhatsApp', 'Link na Bio', 'DM', 'Outro']
        }
      }
    },

    // Home Section
    home: {
      header: {
        features: 'Recursos',
        testimonials: 'Depoimentos',
        about: 'Sobre',
        dashboard: 'Painel',
        signIn: 'Entrar',
        getStarted: 'Começar'
      },
      hero: {
        title: 'Transforme Seu Negócio com Automação Alimentada por AI',
        subtitle: 'Otimize suas operações, melhore o engajamento do cliente e aumente a produtividade com nossa plataforma de automação inteligente.',
        learnMore: 'Saiba Mais',
        aiPoweredTools: 'Ferramentas AI',
        studentEngagement: 'Engajamento do Estudante',
        detailedAnalytics: 'Análises Detalhadas',
        business: 'Negócio',
        users: 'usuários',
        satisfaction: 'Satisfação'
      },
      features: {
        badge: 'Capacidades Principais',
        title: 'Automação Alimentada por AI para Negócios Inteligentes',
        subtitle: 'Automatize suas operações comerciais através do WhatsApp com agentes AI avançados que entendem contexto e fornecem respostas inteligentes.',
        ctaTitle: 'Pronto para transformar seu negócio com AI?',
        ctaSubtitle: 'Descubra como nossa plataforma automatiza marketing, atendimento ao cliente e processos comerciais através da integração inteligente do WhatsApp.',
        exploreFeatures: 'Explorar todos os recursos'
      },
      testimonials: {
        badge: 'Histórias de sucesso',
        title: 'Confiado por Negócios',
        subtitle: 'Veja como nossas ferramentas de automação AI estão ajudando negócios a otimizar operações e melhorar o engajamento do cliente.',
        viewAll: 'Ver todos os depoimentos'
      },
      footer: {
        brandName: 'Smart Agent',
        description: 'Capacitando negócios com automação inteligente e engajamento de cliente perfeito através de soluções alimentadas por AI.',
        solutions: 'Soluções',
        company: 'Empresa',
        resources: 'Recursos',
        legal: 'Legal',
        allRightsReserved: 'Todos os direitos reservados',
        bottomText: 'Criado com inovação para alimentar automação comercial e engajamento do cliente.'
      }
    },

    // Sidebar
    sidebar: {
      settings: 'Configurações'
    },

    // Common
    common: {
      cancel: 'Cancelar',
      save: 'Salvar',
      edit: 'Editar',
      delete: 'Excluir',
      confirm: 'Confirmar',
      yes: 'Sim',
      no: 'Não',
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      warning: 'Aviso',
      info: 'Informação',
      close: 'Fechar',
      open: 'Abrir',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      reset: 'Redefinir',
      clear: 'Limpar',
      apply: 'Aplicar',
      select: 'Selecionar',
      back: 'Voltar',
      next: 'Próximo',
      submit: 'Enviar',
      logout: 'Sair',
      login: 'Entrar',
      register: 'Registrar',
      email: 'Email',
      password: 'Senha',
      fullName: 'Nome Completo'
    }
  },

  'es': {
    // Auth Section
    auth: {
      signin: {
        title: 'Iniciar Sesión en Tu Cuenta',
        email: 'Email',
        password: 'Contraseña',
        forgotPassword: '¿Olvidaste tu contraseña?',
        signInButton: 'Iniciar sesión',
        signingIn: 'Iniciando sesión...',
        orContinueWith: 'O continúa con',
        google: 'Google',
        apple: 'Apple',
        dontHaveAccount: '¿No tienes una cuenta?',
        signUpLink: 'Registrarse',
        successMessage: '¡Sesión iniciada exitosamente!'
      },
      signup: {
        title: 'Crear Tu Cuenta',
        fullName: 'Nombre Completo',
        email: 'Email',
        password: 'Contraseña',
        createAccountButton: 'Crear cuenta',
        creatingAccount: 'Creando cuenta...',
        orContinueWith: 'O continúa con',
        google: 'Google',
        apple: 'Apple',
        alreadyHaveAccount: '¿Ya tienes una cuenta?',
        signInLink: 'Iniciar sesión',
        successMessage: '¡Cuenta creada exitosamente! Por favor, inicia sesión'
      },
      security: {
        changePassword: 'Cambiar Contraseña',
        currentPassword: 'Contraseña Actual',
        newPassword: 'Nueva Contraseña',
        confirmNewPassword: 'Confirmar Nueva Contraseña',
        updatePassword: 'Actualizar Contraseña',
        twoFactorAuth: 'Autenticación de Dos Factores',
        dangerZone: 'Zona de Peligro',
        deleteAccount: 'Eliminar Cuenta'
      }
    },

    // Dashboard Section
    dashboard: {
      welcome: 'Bienvenido de vuelta',
      overview: 'Aquí tienes una vista general de tu cuenta y actividad reciente',
      currentPlan: 'Plan Actual',
      creditsRemaining: 'Créditos Restantes',
      usageThisMonth: 'Uso Este Mes',
      planDetails: 'Detalles del Plan',
      recentCreditUsage: 'Uso Reciente de Créditos',
      totalUsers: 'Total de Usuarios',
      activeSubscriptions: 'Suscripciones Activas',
      userManagement: 'Gestión de Usuarios',
      systemSettings: 'Configuraciones del Sistema',
      adminTitle: 'Panel de Administración',
      adminSubtitle: 'Monitorea y gestiona usuarios, suscripciones y uso de créditos'
    },

    // Navigation
    navigation: {
      dashboard: 'Panel',
      users: 'Usuarios',
      credits: 'Créditos',
      agents: 'Agentes',
      usageHistory: 'Historial de Uso',
      settings: 'Configuraciones',
      logout: 'Cerrar sesión'
    },

    // User Section
    user: {
      agents: {
        title: 'Agentes AI',
        subtitle: 'Transforma tu marketing de contenido con agentes AI inteligentes',
        activeProject: 'Proyecto Activo',
        create: 'Crear',
        delete: 'Eliminar',
        deleteProject: 'Eliminar Proyecto',
        cancel: 'Cancelar'
      },
      credits: {
        title: 'Comprar Créditos y Actualizar Plan',
        subtitle: 'Actualiza tu plan o compra créditos adicionales para continuar usando nuestros servicios',
        currentPlan: 'Tu Plan Actual',
        currentPlanDescription: 'Actualmente estás en el plan {plan} con {credits} créditos restantes.',
        upgradePlan: 'Actualizar Tu Plan',
        purchaseCredits: 'Comprar Créditos Adicionales',
        selectPlan: 'Seleccionar Plan',
        currentPlanButton: 'Plan Actual',
        purchaseNow: 'Comprar Ahora',
        referralProgram: 'Programa de Referidos',
        planDetails: 'Detalles del Plan',
        creditDetails: 'Detalles de Créditos',
        plan: 'Plan',
        price: 'Precio',
        nextBilling: 'Próxima Facturación',
        monthlyCredits: 'Créditos Mensuales',
        currentBalance: 'Saldo Actual',
        resetDate: 'Fecha de Reset',
        recommended: 'Recomendado',
        bestValue: 'Mejor Valor',
        credits: 'créditos',
        perCredit: 'por crédito',
        lowCreditsWarning: 'Tienes menos de 10 créditos restantes. Considera comprar créditos adicionales para evitar interrupciones.',
        referralDescription: 'Invita a tus amigos y obtén 50 créditos gratis por cada referido exitoso. Tus amigos también recibirán 25 créditos gratis al registrarse.',
        copyLink: 'Copiar Enlace',
        subscriptionSuccess: '¡Suscripción creada exitosamente!',
        subscriptionError: 'Error al crear la Suscripción. Inténtalo de nuevo.',
        creditPurchaseSuccess: '¡Crédito comprado exitosamente!',
        includesCreditsPerMonth: 'Incluye {credits} créditos por mes',
        selectPlanButton: 'Seleccionar Plan',
        bestValueBadge: 'Mejor Valor',
        creditsUnit: 'créditos',
        perCreditText: 'por crédito',
        purchaseNowButton: 'Comprar Ahora',
        // Plan names
        monthlyPlan: 'Plan Mensual',
        annualPlan: 'Plan Anual',
        extraPack: 'Paquete Extra',
        // Intervals
        month: 'mes',
        annual: 'anual',
        // Features
        aiCredits: '{credits} Créditos AI',
        allAiAgents: 'Todos los Agentes AI',
        aiSchedulingBot: 'Bot de Programación AI',
        prioritySupport: 'Soporte Prioritario',
        dayHistory: 'Historial de {days} días'
      },
      usage: {
        title: 'Historial de Uso de Créditos',
        subtitle: 'Rastrea y analiza el uso de tus créditos AI',
        summary: 'Resumen de Uso',
        monthlyAllocation: 'Asignación Mensual',
        usedThisMonth: 'Usado Este Mes',
        remainingBalance: 'Saldo Restante',
        usageTrend: 'Tendencia de Uso',
        activityLog: 'Registro de Actividades',
        resetDate: 'Se reinicia el 26 de mayo de 2025',
        percentageUsed: 'de tu límite mensual',
        creditsUnit: 'Créditos',
        expireWarning: 'Expirará si no se usa',
        usageTrendDescription: 'Uso diario de créditos a lo largo del tiempo',
        activityLogDescription: 'Registro detallado del uso de tu agente AI',
        export: 'Exportar',
        success: 'éxito',
        failed: 'falló',
        timeRanges: {
          sevenDays: '7-días',
          thirtyDays: '30-días',
          ninetyDays: '90-días'
        },
        tableHeaders: {
          date: 'Fecha',
          agent: 'Agente',
          activity: 'Actividad',
          creditsUsed: 'Créditos Utilizados',
          status: 'Estado'
        }
      }
    },

    // Agents Section
    agents: {
      results: 'Resultados del Agente',
      noResults: 'No hay resultados aún. Ejecuta cualquier agente para ver los resultados aquí.',
      clearAll: 'Limpiar Todo',
      socialMediaCaption: 'Leyenda de Redes Sociales',
      pageCopy: 'Copia de Página',
      aiImageGeneration: 'Script de Generación de Imagen AI',
      marketingStrategy: 'Resumen de Estrategia de Marketing',
      contentSchedule: 'Tu Programación de Contenido de 7 Días',
      
      // Marketing Strategy Agent
      marketingStrategyAgent: {
        title: 'Estrategia de Marketing',
        description: 'Obtenga una estrategia de marketing personalizada con orientación paso a paso de un consultor de marketing AI.',
        questionCounter: 'Pregunta {current} de {total}',
        aiConsultant: '🤖 Consultor de Marketing AI',
        pleaseProvideComplete: 'Por favor, proporcione una respuesta completa y específica.',
        previous: 'Anterior',
        test: 'Probar',
        next: 'Siguiente',
        complete: 'Completar',
        consultationCompleted: '🎯 ¡Consulta estratégica completada! Listo para generar tu resumen empresarial.',
        analyzingCreating: 'Analizando y Creando Resumen...',
        generateSummary: 'Generar Resumen Estratégico',
        successfullyGenerated: '¡Generado con Éxito! 🎉',
        strategicSummary: 'Resumen Estratégico Empresarial:',
        startOver: 'Comenzar de Nuevo',
        insufficientCredits: '¡Saldo de créditos insuficiente, por favor recarga!',
        
        // Questions
        questions: {
          brandName: '¿Cuál es el nombre de tu marca o negocio?',
          brandNamePlaceholder: 'Ingresa el nombre de tu marca o negocio',
          
          productService: '¿Qué vendes o ofreces exactamente?',
          productServicePlaceholder: 'ej: cursos online de repostería, servicios de pintura residencial, ropa fitness femenina, consultoría de marketing para freelancers. Sé específico e incluye ejemplos si es posible.',
          
          targetAudience: '¿Quién es tu audiencia ideal?',
          targetAudiencePlaceholder: 'Describe edad, profesión, dolores, deseos, ubicación, nivel de conocimiento sobre el tema, etc. Esto ayuda a hacer el contenido más atractivo y relevante.',
          
          differentiator: '¿Cuál es tu principal diferenciador o promesa?',
          differentiatorPlaceholder: '¿Por qué alguien debería comprar de ti y no de otra persona? Ejemplos: servicio más personal, precio accesible, entrega más rápida, producto exclusivo, soporte diferenciado, etc.',
          
          marketingGoals: '¿Cuál es tu principal objetivo con marketing? (puedes elegir más de uno)',
          marketingGoalsPlaceholder: 'Selecciona tu objetivo principal de marketing',
          
          communicationTone: '¿Qué tono quieres transmitir en tu comunicación?',
          communicationTonePlaceholder: 'Selecciona tu tono de comunicación preferido',
          
          socialPlatforms: '¿Ya vendes en redes sociales? ¿Qué plataformas usas o planeas usar?',
          socialPlatformsPlaceholder: 'ej: Instagram, Facebook, WhatsApp, YouTube, TikTok, LinkedIn...',
          
          limitations: '¿Hay limitaciones importantes que debemos considerar?',
          limitationsPlaceholder: 'ej: Poco tiempo para grabar, sin diseñador, no me gusta el video, sin sitio web, no quiero aparecer, presupuesto limitado, etc.',
          
          focusProducts: '¿Cuáles son tus productos o servicios más importantes (en los que quieres enfocarte primero)?',
          focusProductsPlaceholder: 'Lista tus productos/servicios prioritarios para enfoque de marketing',
          
          positioningStatus: '¿Ya tienes un posicionamiento claro o quieres ayuda para definirlo?',
          positioningStatusPlaceholder: 'Selecciona tu estado de posicionamiento',
          
          competitors: '¿Tienes competidores que admiras o de los que quieres diferenciarte?',
          competitorsPlaceholder: 'Comparte nombres, enlaces o perfiles de competidores que admiras o de los que quieres diferenciarte',
          
          threeMonthGoals: '¿Qué resultados quieres lograr con marketing en los próximos 3 meses?',
          threeMonthGoalsPlaceholder: 'ej: más ventas, más seguidores, más autoridad, apertura de nuevos canales, números específicos...'
        },
        
        // Options
        options: {
          marketingGoals: [
            'Generar más ventas',
            'Crecer seguidores y autoridad',
            'Capturar leads para nutrición',
            'Posicionar la marca como referencia',
            'Atraer clientes a tienda física',
            'Promover lanzamientos o promociones'
          ],
          
          communicationTone: [
            'Profesional y confiable',
            'Divertido y relajado',
            'Amigable y acogedor',
            'Creativo y audaz',
            'Tradicional y seguro'
          ],
          
          positioningStatus: [
            'Ya tengo un posicionamiento claro',
            'Tengo una idea, pero necesito ayuda para refinarlo',
            'Aún no tengo, quiero ayuda para definirlo'
          ]
        }
      },
      
      marketingCalendarAgent: {
        title: 'Calendario de Marketing',
        description: 'Crea calendarios de contenido organizados con timing y temas estratégicos.',
        emptyStrategy: '¡Estrategia de marketing vacía!. ¡Por favor, crea una!',
        insufficientCredits: '¡Saldo de créditos insuficiente, por favor recarga!',
        successMessage: '¡Resultado del Calendario de Marketing creado con éxito!',
        successSaved: '¡Resultado del Calendario de Marketing guardado con éxito!',
        yourSchedule: 'Tu Programación de Contenido de 7 Días:',
        successfullyGenerated: '¡Generado con Éxito! 🎉',
        startOver: 'Comenzar de Nuevo',
        regenerateSchedule: 'Regenerar Programación',
        questionCounter: 'Pregunta {current} de {total}',
        previous: 'Anterior',
        next: 'Siguiente',
        complete: 'Completar',
        allCompleted: '¡Todas las preguntas completadas! ✅',
        creating: 'Creando Programación...',
        generateSchedule: 'Generar Programación de 7 Días',
        
        // Questions
        questions: {
          postsPerWeek: '¿Cuántas publicaciones quieres por semana?',
          postsPerWeekPlaceholder: 'Selecciona el número de publicaciones por semana',
          contentFormats: '¿Qué formatos de contenido quieres usar? (Puedes seleccionar más de uno)',
          contentFormatsPlaceholder: 'Selecciona formatos de contenido',
          priorityPlatform: '¿Tienes alguna plataforma de redes sociales prioritaria?',
          priorityPlatformPlaceholder: 'Selecciona tu plataforma prioritaria'
        },
        
        // Options
        options: {
          posts: ['3 publicaciones', '5 publicaciones', '7 publicaciones', '10 publicaciones', '14 publicaciones'],
          formats: ['Imagen', 'Carrusel', 'Texto Simple', 'Mixto (texto + imagen)'],
          platforms: ['Instagram', 'Facebook', 'TikTok', 'WhatsApp', 'YouTube', 'LinkedIn', 'Twitter', 'Sin prioridad específica']
        }
      },
      
      postIdeasAgent: {
        title: 'Ideas de Publicaciones',
        description: 'Genera conceptos creativos y atractivos de publicaciones para redes sociales basados en tu estrategia y programación.',
        insufficientCredits: '¡Saldo de créditos insuficiente, por favor recarga!',
        emptyCalendar: '¡Calendario de marketing vacío!. ¡Por favor, crea una Programación!',
        successMessage: '¡Ideas de Publicaciones creadas con éxito!',
        successSaved: '¡Ideas de Publicaciones guardadas con éxito!',
        questionCounter: 'Pregunta {current} de {total}',
        creativeStrategist: '💡 Estratega Creativo',
        previous: 'Anterior',
        next: 'Siguiente',
        complete: 'Completar',
        usingData: 'Usando Datos de Agentes Anteriores:',
        brand: 'Marca',
        product: 'Producto',
        schedule: 'Programación',
        postsFrom: '{count} publicaciones del Calendario de Marketing',
        allCompleted: '¡Todas las preguntas completadas! ✅',
        generating: 'Generando Ideas Creativas...',
        generateIdeas: 'Generar Ideas de Contenido',
        creativeContent: 'Ideas de Contenido Creativo (2 por publicación):',
        successfullyGenerated: '¡Generado con Éxito! 🎉',
        startOver: 'Comenzar de Nuevo',
        regenerateIdeas: 'Regenerar Ideas',
        
        // Questions
        questions: {
          creativeStyle: '¿Qué estilo creativo prefieres para tus ideas de contenido?',
          creativeStylePlaceholder: 'Selecciona tu estilo creativo preferido',
          contentThemes: '¿Qué temas de contenido resuenan más con tu audiencia? (Puedes seleccionar varios)',
          contentThemesPlaceholder: 'Selecciona temas de contenido',
          filmingComfort: '¿Qué tan cómodo estás con la creación de diferentes tipos de contenido?',
          filmingComfortPlaceholder: 'Selecciona tu nivel de comodidad'
        },
        
        // Options
        options: {
          creativeStyle: [
            'Simple y directo',
            'Creativo y audaz',
            'Educativo e informativo',
            'Divertido y entretenido',
            'Profesional y pulido'
          ],
          contentThemes: [
            'Detrás de escenas',
            'Consejos y tutoriales',
            'Testimonios de clientes',
            'Presentación de productos',
            'Tendencias de la industria',
            'Historias personales',
            'Desafíos y soluciones',
            'Destacados de la comunidad'
          ],
          filmingComfort: [
            'Prefiero detrás de escenas y fotos de productos',
            'Mejor con gráficos y contenido basado en texto',
            'Mezcla de todo pero manteniéndolo simple'
          ]
        }
      },
      
      postTextAgent: {
        title: 'Textos y Scripts',
        description: 'Escribe scripts de copy convincentes para tu contenido.',
        insufficientCredits: '¡Saldo de créditos insuficiente, por favor recarga!',
        emptyPostIdeas: '¡Ideas de publicaciones vacías!. ¡Por favor, crea Ideas de Publicaciones!',
        successMessage: '¡Scripts de Publicaciones creados con éxito!',
        successSaved: '¡Scripts de Publicaciones guardados con éxito!',
        questionCounter: 'Pregunta {current} de {total}',
        copywriterAI: '✍️ Copywriter AI',
        previous: 'Anterior',
        next: 'Siguiente',
        complete: 'Completar',
        allCompleted: '¡Todas las preguntas completadas! ✅',
        generating: 'Escribiendo Scripts Profesionales...',
        generateScripts: 'Generar Scripts de Copy',
        copyScripts: 'Scripts de Copy Profesionales:',
        successfullyGenerated: '¡Generado con Éxito! 🎉',
        startOver: 'Comenzar de Nuevo',
        regenerateScripts: 'Regenerar Scripts',
        
        questions: {
          contentType: '¿Qué tipo de contenido quieres crear?',
          contentTypePlaceholder: 'Selecciona tipos de contenido',
          selectedIdea: '¿Qué idea de contenido del paso anterior quieres desarrollar?',
          selectedIdeaPlaceholder: 'Selecciona una idea de contenido para desarrollar',
          copyFocus: '¿Cuál debe ser el enfoque principal de tu copy?',
          copyFocusPlaceholder: 'Selecciona el enfoque de tu copy',
          ctaPreference: '¿Qué tipo de call-to-action prefieres?',
          ctaPreferencePlaceholder: 'Selecciona tu preferencia de CTA'
        },
        
        options: {
          contentTypes: ['Leyenda de Redes Sociales', 'Copy de Página (Website/WhatsApp)', 'Script de Generación de Imagen AI'],
          copyFocus: ['Generar ventas inmediatas', 'Construir conciencia de marca', 'Educar audiencia', 'Aumentar engagement', 'Generar leads'],
          ctaPreference: ['Ventas directas (Compra ahora, Compra hoy)', 'Engagement (Comenta, Comparte, Etiqueta)', 'Tráfico (Visita el sitio web, Link en bio)', 'Generación de leads (Envía DM, Regístrate)', 'Enfoque suave (Guarda este post, Síguenos para más)']
        }
      },
      
      imageGenerationAgent: {
        title: 'Generación de Imágenes',
        description: 'Crea visuales impresionantes y gráficos para tus campañas de marketing.',
        insufficientCredits: '¡Saldo de créditos insuficiente, por favor recarga!',
        successMessage: '¡Generación de Imágenes creada con éxito!',
        successSaved: '¡Generación de Imágenes guardada con éxito!',
        questionCounter: 'Pregunta {current} de {total}',
        visualCreator: '🎨 Creador Visual AI',
        previous: 'Anterior',
        next: 'Siguiente',
        complete: 'Completar',
        allCompleted: '¡Todas las preguntas completadas! ✅',
        generating: 'Generando Contenido Visual...',
        generateImages: 'Generar Imágenes',
        visualContent: 'Contenido Visual Generado:',
        successfullyGenerated: '¡Generado con Éxito! 🎉',
        startOver: 'Comenzar de Nuevo',
        regenerateImages: 'Regenerar Imágenes',
        
        questions: {
          prompt: '¿Qué imagen te gustaría generar? Descríbela en detalle.',
          promptPlaceholder: 'Describe la imagen que quieres generar en detalle...',
          visualStyle: '¿Qué estilo visual prefieres?',
          visualStylePlaceholder: 'Elige el estilo visual',
          imageFormat: '¿Qué formato debe tener la imagen?',
          imageFormatPlaceholder: 'Selecciona el formato de imagen',
          includeLogo: '¿Quieres incluir un logo en la imagen?',
          includeLogoPlaceholder: '¿Incluir logo?',
          logoPosition: '¿Dónde debe posicionarse el logo?',
          logoPositionPlaceholder: 'Elige la posición del logo',
          includeProduct: '¿Quieres incluir una imagen de producto?',
          includeProductPlaceholder: '¿Incluir imagen de producto?',
          campaignName: '¿Cuál es el nombre de la campaña para esta imagen?',
          campaignNamePlaceholder: 'Ingresa el nombre de la campaña'
        },
        
        options: {
          visualStyle: ['Realista', 'Ilustrado', 'Minimalista', 'Comercial', 'Futurista'],
          imageFormat: ['Cuadrado (Feed)', 'Vertical (Story/Reel)', 'Horizontal (Portada/Banner)'],
          includeLogo: ['Sí', 'No'],
          logoPosition: ['Superior Izquierdo', 'Superior Derecho', 'Inferior Izquierdo', 'Inferior Derecho'],
          includeProduct: ['Sí', 'No']
        }
      },
      
      seoOptimizationAgent: {
        title: 'Optimización SEO',
        description: 'Optimiza tu contenido y perfil para mejor visibilidad en motores de búsqueda y alcance en redes sociales.',
        insufficientCredits: '¡Saldo de créditos insuficiente, por favor recarga!',
        successMessage: '¡Optimización SEO creada con éxito!',
        successSaved: '¡Optimización SEO guardada con éxito!',
        questionCounter: 'Pregunta {current} de {total}',
        seoSpecialist: '🔍 Especialista SEO AI',
        previous: 'Anterior',
        next: 'Siguiente',
        complete: 'Completar',
        allCompleted: '¡Todas las preguntas completadas! ✅',
        generating: 'Optimizando Contenido...',
        generateOptimization: 'Generar Optimización SEO',
        seoContent: 'Resultados de Optimización SEO:',
        successfullyGenerated: '¡Generado con Éxito! 🎉',
        startOver: 'Comenzar de Nuevo',
        regenerateOptimization: 'Regenerar Optimización',
        
        questions: {
          optimizationType: '¿Qué te gustaría optimizar?',
          optimizationTypePlaceholder: 'Selecciona el tipo de optimización',
          caption: 'Leyenda o Texto de la Publicación',
          captionPlaceholder: 'Ingresa tu leyenda actual de la publicación...',
          targetPlatform: 'Plataforma Objetivo',
          targetPlatformPlaceholder: 'Selecciona la plataforma objetivo',
          mainTheme: 'Tema Principal del Contenido',
          mainThemePlaceholder: 'ej: ansiedad y productividad',
          postObjective: 'Objetivo de la Publicación',
          postObjectivePlaceholder: 'Selecciona el objetivo de la publicación',
          brandName: 'Nombre de Marca o Profesional',
          brandNamePlaceholder: 'Tu nombre de marca/profesional',
          niche: 'Nicho / Área de Actividad',
          nichePlaceholder: 'ej: Coach de Fitness, Marketing Digital',
          idealAudience: 'Audiencia Ideal',
          idealAudiencePlaceholder: 'Describe tu audiencia objetivo',
          toneOfVoice: 'Tono de Voz',
          toneOfVoicePlaceholder: 'Selecciona el tono de voz',
          primaryContact: 'Canal de Contacto Principal',
          primaryContactPlaceholder: 'Selecciona el canal de contacto'
        },
        
        options: {
          optimizationType: ['Optimización de Contenido', 'Optimización de Perfil'],
          targetPlatform: ['Instagram', 'TikTok', 'Facebook', 'YouTube Shorts'],
          postObjective: ['Atraer', 'Vender', 'Educar', 'Involucrar'],
          toneOfVoice: ['Casual', 'Técnico', 'Institucional', 'Otro'],
          primaryContact: ['WhatsApp', 'Link en Bio', 'DM', 'Otro']
        }
      }
    },

    // Home Section
    home: {
      header: {
        features: 'Características',
        testimonials: 'Testimonios',
        about: 'Acerca de',
        dashboard: 'Panel',
        signIn: 'Iniciar Sesión',
        getStarted: 'Comenzar'
      },
      hero: {
        title: 'Transforma Tu Negocio con Automatización Impulsada por AI',
        subtitle: 'Optimiza tus operaciones, mejora el compromiso del cliente y aumenta la productividad con nuestra plataforma de automatización inteligente.',
        learnMore: 'Aprende Más',
        aiPoweredTools: 'Herramientas AI',
        studentEngagement: 'Compromiso del Estudiante',
        detailedAnalytics: 'Análisis Detallados',
        business: 'Negocio',
        users: 'usuarios',
        satisfaction: 'Satisfacción'
      },
      features: {
        badge: 'Capacidades Clave',
        title: 'Automatización Impulsada por AI para Negocios Inteligentes',
        subtitle: 'Automatiza tus operaciones comerciales a través de WhatsApp con agentes AI avanzados que entienden el contexto y proporcionan respuestas inteligentes.',
        ctaTitle: '¿Listo para transformar tu negocio con AI?',
        ctaSubtitle: 'Descubre cómo nuestra plataforma automatiza marketing, servicio al cliente y procesos comerciales a través de la integración inteligente de WhatsApp.',
        exploreFeatures: 'Explorar todas las características'
      },
      testimonials: {
        badge: 'Historias de éxito',
        title: 'Con la Confianza de Negocios',
        subtitle: 'Ve cómo nuestras herramientas de automatización AI están ayudando a los negocios a optimizar operaciones y mejorar el compromiso del cliente.',
        viewAll: 'Ver todos los testimonios'
      },
      footer: {
        brandName: 'Smart Agent',
        description: 'Empoderando negocios con automatización inteligente y compromiso de cliente sin problemas a través de soluciones impulsadas por AI.',
        solutions: 'Soluciones',
        company: 'Empresa',
        resources: 'Recursos',
        legal: 'Legal',
        allRightsReserved: 'Todos los derechos reservados',
        bottomText: 'Creado con innovación para impulsar la automatización comercial y el compromiso del cliente.'
      }
    },

    // Sidebar
    sidebar: {
      settings: 'Configuraciones'
    },

    // Common
    common: {
      cancel: 'Cancelar',
      save: 'Guardar',
      edit: 'Editar',
      delete: 'Eliminar',
      confirm: 'Confirmar',
      yes: 'Sí',
      no: 'No',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      warning: 'Advertencia',
      info: 'Información',
      close: 'Cerrar',
      open: 'Abrir',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      reset: 'Restablecer',
      clear: 'Limpiar',
      apply: 'Aplicar',
      select: 'Seleccionar',
      back: 'Atrás',
      next: 'Siguiente',
      submit: 'Enviar',
      logout: 'Cerrar sesión',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      email: 'Email',
      password: 'Contraseña',
      fullName: 'Nombre Completo'
    }
  }
};