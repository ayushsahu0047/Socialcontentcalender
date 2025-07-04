// Mock API service for demonstration purposes
// In a real application, this would be replaced with actual API calls

import { generateDummyData } from './dataUtils';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Fetch all pages
  async getPages() {
    await delay(500); // Simulate network delay
    return {
      success: true,
      data: generateDummyData(),
      message: 'Pages fetched successfully'
    };
  },

  // Fetch pages by category
  async getPagesByCategory(category) {
    await delay(300);
    const allPages = generateDummyData();
    const filteredPages = allPages.filter(page => page.category === category);
    
    return {
      success: true,
      data: filteredPages,
      message: `Pages for category ${category} fetched successfully`
    };
  },

  // Fetch pages by follower range
  async getPagesByFollowerRange(minFollowers, maxFollowers) {
    await delay(400);
    const allPages = generateDummyData();
    const filteredPages = allPages.filter(page => 
      page.followers >= minFollowers && page.followers <= maxFollowers
    );
    
    return {
      success: true,
      data: filteredPages,
      message: 'Pages filtered by follower range successfully'
    };
  },

  // Schedule posts
  async schedulePosts(pages, selectedDates) {
    await delay(1000); // Simulate processing time
    
    // This would typically send data to your backend
    const scheduledPosts = {};
    
    selectedDates.forEach(date => {
      scheduledPosts[date] = [];
    });

    // Simple distribution logic (in real app, this would be done on backend)
    pages.forEach((page, index) => {
      const dateIndex = index % selectedDates.length;
      const date = selectedDates[dateIndex];
      
      scheduledPosts[date].push({
        pageId: page.id,
        scheduledDate: date,
        postType: ['Static', 'Reel', 'FB', 'Twitter', 'Story'][Math.floor(Math.random() * 5)],
        postLink: `https://instagram.com/p/${Math.random().toString(36).substr(2, 9)}`,
        estimatedLikes: Math.floor(page.followers * 0.03 * (0.8 + Math.random() * 0.4)),
        estimatedViews: Math.floor(page.followers * 0.15 * (0.8 + Math.random() * 0.4)),
        estimatedComments: Math.floor(page.followers * 0.005 * (0.8 + Math.random() * 0.4)),
        estimatedShares: Math.floor(page.followers * 0.002 * (0.8 + Math.random() * 0.4)),
        estimatedReach: Math.floor(page.followers * 0.25 * (0.8 + Math.random() * 0.4)),
        estimatedImpressions: Math.floor(page.followers * 0.3 * (0.8 + Math.random() * 0.4))
      });
    });

    return {
      success: true,
      data: scheduledPosts,
      message: 'Posts scheduled successfully'
    };
  },

  // Get analytics data
  async getAnalytics(startDate, endDate) {
    await delay(600);
    
    return {
      success: true,
      data: {
        totalPosts: Math.floor(Math.random() * 100) + 50,
        totalLikes: Math.floor(Math.random() * 1000000) + 500000,
        totalViews: Math.floor(Math.random() * 5000000) + 2000000,
        totalShares: Math.floor(Math.random() * 100000) + 50000,
        totalReach: Math.floor(Math.random() * 2000000) + 1000000,
        totalImpressions: Math.floor(Math.random() * 3000000) + 1500000,
        categoryBreakdown: {
          Meme: {
            posts: Math.floor(Math.random() * 30) + 15,
            likes: Math.floor(Math.random() * 400000) + 200000,
            views: Math.floor(Math.random() * 2000000) + 1000000
          },
          Edit: {
            posts: Math.floor(Math.random() * 25) + 10,
            likes: Math.floor(Math.random() * 300000) + 150000,
            views: Math.floor(Math.random() * 1500000) + 750000
          },
          Bollywood: {
            posts: Math.floor(Math.random() * 20) + 8,
            likes: Math.floor(Math.random() * 250000) + 125000,
            views: Math.floor(Math.random() * 1200000) + 600000
          }
        }
      },
      message: 'Analytics data fetched successfully'
    };
  },

  // Export data
  async exportData(scheduledPosts, pages, selectedDates) {
    await delay(2000); // Simulate export processing
    
    return {
      success: true,
      data: {
        downloadUrl: 'data:text/csv;charset=utf-8,exported_data',
        filename: `social_media_calendar_${new Date().toISOString().split('T')[0]}.xlsx`
      },
      message: 'Data exported successfully'
    };
  }
};

// Error handling utility
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    error: error.message || 'An unexpected error occurred',
    data: null
  };
};

// API configuration
export const apiConfig = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN || ''}`
  }
}; 