interface ScheduleRow {
  day: string;
  channel: string;
  placement: string;
  format: string;
  contentType: string;
  description: string;
}

export const mockStrategy = ` 
    📄 STRATEGIC BUSINESS SUMMARY

    • Brand Name: GreenBloom Naturals
    • Product/Service: Organic skincare products made from locally sourced herbs
    • Target Audience: Health-conscious women aged 25 ~ 45 who prefer sustainable beauty solutions
    • Differentiators: 100% plastic-free packaging, vegan ingredients, and personalized skincare routines
    • Marketing Goals: Increase brand awareness, grow Instagram following by 40%, boost repeat purchases
    • Communication Tone: Friendly, informative, and empowering
    • Appears in Videos: Founder & skincare specialists
    • Channels Used: Instagram, TikTok, YouTube, and Pinterest
    • Limitations: Limited ad budget, no international shipping (yet)
    • Focus Products: Herbal Face Serum, Eco-Friendly Cleanser, Natural Lip Balm
    • Positioning Status: Emerging brand with strong eco-conscious appeal
    • Competitors: Lush, Herbivore Botanicals, The Ordinary
    • 3-Month Goals: Launch new campaign, onboard 20 micro-influencers, achieve 5K email subscribers

    🎯 This strategic foundation will be used by all other AI agents to create personalized content that aligns with your business goals and brand identity.
    `;

export const mockSchedule: ScheduleRow[] = [
  {
    day: 'Monday',
    channel: 'Instagram',
    placement: 'Feed',
    format: 'Carousel',
    contentType: 'Educational',
    description: 'Discover benefits of our Herbal Face Serum',
  },
  {
    day: 'Tuesday',
    channel: 'Facebook',
    placement: 'Broadcast List',
    format: 'Image',
    contentType: 'Social Proof',
    description: 'Customer testimonial: Why Sarah loves our cleanser',
  },
  {
    day: 'Wednesday',
    channel: 'WhatsApp',
    placement: 'Broadcast',
    format: 'Plain Text',
    contentType: 'Tip',
    description: '3 steps to a natural glow with eco skincare',
  },
  {
    day: 'Thursday',
    channel: 'Instagram',
    placement: 'Story',
    format: 'Image',
    contentType: 'Behind-the-scenes',
    description: 'Meet our founder creating eco-friendly beauty',
  },
  {
    day: 'Friday',
    channel: 'TikTok',
    placement: 'Feed',
    format: 'Plain Text',
    contentType: 'Engagement',
    description: `What's your skincare ritual? Comment below!`,
  },
  {
    day: 'Saturday',
    channel: 'Instagram',
    placement: 'Feed',
    format: 'Image',
    contentType: 'Product Showcase',
    description: 'New arrival: Natural Lip Balm in zero waste jar',
  },
  {
    day: 'Sunday',
    channel: 'Facebook',
    placement: 'Feed',
    format: 'Carousel',
    contentType: 'Offer',
    description: 'Repost customer content featuring your brand',
  },
];

export const mockIdea = {
  option1: {
    Monday: {
      title: 'Unlock the Magic of Herbal Face Serum',
      description:
        "Create a visually stunning Instagram carousel post showcasing the key benefits of our Herbal Face Serum. Use a combination of high-quality images and minimal text overlays to highlight attributes such as 'Hydrates & Nourishes' and '100% Organic Ingredients'. Include a before-and-after skin glow comparison featuring a customer or team member's testimony.",
      hook: "Reveal your skin's true potential with nature's touch!",
      cta: 'Swipe to discover why our Herbal Face Serum is a must-have in your skincare routine.',
    },
    Tuesday: {
      title: "Sarah's Skin Story: A Cleanser Revolution",
      description:
        'Feature a customer testimonial with a close-up image and a quote highlighting the cleanser’s gentle yet effective properties and plastic-free peace of mind.',
      hook: "See why Sarah says our cleanser is her skin's new best friend!",
      cta: "Ready to revolutionize your skincare? Check out Sarah's story now!",
    },
    Wednesday: {
      title: 'Glow Naturally: 3 Effortless Steps',
      description:
        'Craft a plain text WhatsApp message outlining a simple 3-step skincare routine, including using the Herbal Face Serum for hydration.',
      hook: 'Achieve a radiant glow with these easy, eco-friendly steps!',
      cta: 'Try these steps today and share your glow-up story with us!',
    },
    Thursday: {
      title: 'Behind the Beauty: Eco-Friendly Creations',
      description:
        'Share an Instagram Story image of the founder in the lab or nature, talking about her passion for sustainability and innovation.',
      hook: 'Meet the mastermind behind your favorite eco-friendly beauty products!',
      cta: 'Follow our journey to crafting sustainable beauty solutions!',
    },
    Friday: {
      title: 'Share Your Skincare Ritual',
      description:
        'Post a plain text TikTok asking followers to comment their daily skincare rituals. Invite them to share tips and products they love, encouraging a community feel.',
      hook: "What's your secret to glowing skin? Let’s chat!",
      cta: 'Comment below with your skincare must-haves!',
    },
    Saturday: {
      title: 'Introducing: Zero Waste Lip Balm Delight',
      description:
        'Post a captivating image of the new Natural Lip Balm with eco-friendly packaging against a clean, scenic background to emphasize the natural aspect.',
      hook: 'Meet your new lip care obsession with a conscience!',
      cta: "Explore our zero waste lip balm and experience nature's best!",
    },
    Sunday: {
      title: 'Celebrate with GreenBloom: Share and Win!',
      description:
        'Create a Facebook carousel featuring a selection of user-generated content. Include a quote from the customer about their experience.',
      hook: 'Join our community of eco-beauty lovers!',
      cta: 'Share your own GreenBloom moment for a chance to be featured!',
    },
  },
  option2: {
    Monday: {
      title: "Herbal Face Serum: Your Skin's New Best Friend",
      description:
        "Design an Instagram carousel with a series of images showing the serum's texture, results, and reviews. Include minimal text highlights of its benefits and user reviews.",
      hook: 'Experience the ultimate in natural skincare with our Herbal Face Serum!',
      cta: 'Swipe through to see how our serum can transform your skin!',
    },
    Tuesday: {
      title: "Clean and Green: Sarah's Journey with Our Cleanser",
      description:
        "Create a single image post with a split-screen effect showing Sarah's skin before and after using the cleanser. Include her testimonial quote about her experience with the product.",
      hook: "Discover the cleanser that changed Sarah's skincare game!",
      cta: 'Learn more about why our cleanser is a customer favorite!',
    },
    Wednesday: {
      title: 'Eco-Friendly Glow-Up Routine',
      description:
        'Send a plain text WhatsApp message detailing a quick 3-step morning skincare routine using the Herbal Face Serum, with tips for optimal use.',
      hook: "Kickstart your day with a glow that's kind to your skin and the planet!",
      cta: 'Try out this routine and share your experience with us!',
    },
    Thursday: {
      title: 'Crafting Beauty, Sustainably',
      description:
        "Capture an Instagram Story image of the founder setting up in her workshop or sourcing materials, showing the process behind the brand's dedication to sustainability.",
      hook: 'See where our commitment to sustainability begins!',
      cta: 'Discover how we craft eco-friendly beauty solutions!',
    },
    Friday: {
      title: 'Your Skin, Your Ritual',
      description:
        'Create a plain text TikTok post inviting followers to comment their skincare routines and tips. Make it feel like an open conversation about what products they rely on for a natural glow.',
      hook: 'Tell us about your skincare ritual and discover new tips!',
      cta: 'Comment with your favorite skincare routines and products!',
    },
    Saturday: {
      title: 'Lip Care, Reimagined',
      description:
        'Showcase an image of the Natural Lip Balm with a nature-inspired background. Emphasize the zero waste packaging and nourishing ingredients.',
      hook: "Discover the lip balm that's as kind to the planet as it is to your lips!",
      cta: 'See how sustainable lip care can be both effective and eco-friendly!',
    },
    Sunday: {
      title: 'Join the GreenBloom Celebration',
      description:
        "Feature a Facebook carousel with curated reposts of customer content celebrating GreenBloom. Ensure it includes a customer's enthusiastic testimonial.",
      hook: 'Be part of our green beauty community!',
      cta: 'Share your GreenBloom moments and get featured!',
    },
  },
};
