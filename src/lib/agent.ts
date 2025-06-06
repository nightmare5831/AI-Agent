export const getRequiredFieldsMarketing = (selectedFunctionality: string) => {
  switch (selectedFunctionality) {
    case 'content-calendar':
      return [
        'brandName',
        'industry',
        'businessGoals',
        'platforms',
        'postFrequency',
      ];
    case 'social-post':
      return [
        'brandName',
        'industry',
        'businessGoals',
        'platforms',
        'targetAudience',
        'tone',
        'productDescription',
      ];
    case 'story-creation':
      return [
        'brandName',
        'industry',
        'businessGoals',
        'productDescription',
        'targetAudience',
        'tone',
        'keywords',
        'adObjective',
      ];
    case 'ad-copy':
      return [
        'brandName',
        'industry',
        'productDescription',
        'targetAudience',
        'tone',
        'keywords',
        'adObjective',
        'platforms',
      ];
    case 'seo-optimization':
      return [
        'brandName',
        'industry',
        'productDescription',
        'targetAudience',
        'platforms',
        'tone',
      ];
    default:
      return [];
  }
};

export const getRequiredFieldsOrganization = (
  selectedFunctionality: string
) => {
  switch (selectedFunctionality) {
    case 'daily-checklist':
      return [
        'role',
        'workingHours',
        'responsibilities',
        'teamMembers',
        'tasks',
        'recurringTasks',
      ];
    case 'weekly-planner':
      return [
        'role',
        'workingHours',
        'responsibilities',
        'teamMembers',
        'weeklyGoals',
        'recurringTasks',
      ];
    case 'task-delegation':
      return ['role', 'teamMembers', 'tasks', 'responsibilities', 'deadline'];
    case 'support-workflow':
      return ['role', 'teamMembers', 'customerChannels', 'commonIssues'];
    case 'sop-template':
      return ['role', 'responsibilities', 'recurringTasks', 'customerChannels'];
    default:
      return [];
  }
};

export const getRequiredFieldsStrategy = (selectedFunctionality: string) => {
  switch (selectedFunctionality) {
    case 'brand-positioning':
      return ['businessName', 'missionStatement', 'brandValues', 'competitors'];
    case 'audience-definition':
      return [
        'businessName',
        'productOverview',
        'audienceDescription',
        'painPoints',
        'channels',
      ];
    case 'value-proposition':
      return [
        'businessName',
        'productOverview',
        'audienceDescription',
        'painPoints',
        'benefits',
      ];
    case 'pricing-strategy':
      return [
        'businessName',
        'baseCost',
        'competitorPricing',
        'benefits',
        'competitors',
        'missionStatement',
      ];
    case 'growth-plan':
      return [
        'businessName',
        'stage',
        'goals',
        'budget',
        'channels',
        'missionStatement',
        'contentTypes',
      ];
    case 'content-plan':
      return ['businessName', 'contentTypes', 'goals', 'stage', 'channels'];
    default:
      return [];
  }
};
