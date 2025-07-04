// Example configuration file
// Copy this to config.js and modify as needed

export const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN || ''}`
    }
  },

  // Application Configuration
  app: {
    maxDates: parseInt(process.env.REACT_APP_MAX_DATES) || 31,
    defaultPostsPerPage: parseInt(process.env.REACT_APP_DEFAULT_POSTS_PER_PAGE) || 10,
    maxFollowers: parseInt(process.env.REACT_APP_MAX_FOLLOWERS) || 1000000
  },

  // Feature Flags
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS !== 'false',
    export: process.env.REACT_APP_ENABLE_EXPORT !== 'false',
    filtering: process.env.REACT_APP_ENABLE_FILTERING !== 'false'
  },

  // UI Configuration
  ui: {
    theme: process.env.REACT_APP_THEME || 'light',
    language: process.env.REACT_APP_LANGUAGE || 'en',
    dateFormat: 'MMM dd, yyyy',
    timeFormat: 'HH:mm'
  },

  // Categories
  categories: ['Meme', 'Edit', 'Bollywood'],

  // Post Types
  postTypes: ['Static', 'Reel', 'FB', 'Twitter', 'Story'],

  // Engagement Rate Multipliers
  engagementRates: {
    Static: { likes: 0.03, views: 0.15, comments: 0.005, shares: 0.002, reach: 0.25, impressions: 0.3 },
    Reel: { likes: 0.05, views: 0.4, comments: 0.008, shares: 0.004, reach: 0.6, impressions: 0.8 },
    FB: { likes: 0.02, views: 0.1, comments: 0.003, shares: 0.001, reach: 0.2, impressions: 0.25 },
    Twitter: { likes: 0.015, views: 0.08, comments: 0.002, shares: 0.0008, reach: 0.15, impressions: 0.2 },
    Story: { likes: 0.01, views: 0.2, comments: 0.001, shares: 0.0005, reach: 0.3, impressions: 0.35 }
  },

  // Category Multipliers
  categoryMultipliers: {
    Meme: { likes: 1.2, views: 1.1, comments: 1.3, shares: 1.4, reach: 1.1, impressions: 1.1 },
    Edit: { likes: 1.1, views: 1.2, comments: 1.1, shares: 1.2, reach: 1.2, impressions: 1.2 },
    Bollywood: { likes: 1.0, views: 1.0, comments: 1.0, shares: 1.0, reach: 1.0, impressions: 1.0 }
  }
};

export default config; 