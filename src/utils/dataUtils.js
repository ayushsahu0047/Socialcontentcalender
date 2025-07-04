// Generate dummy data for social media pages
export const generateDummyData = () => {
  const categories = ['Meme', 'Edit', 'Bollywood'];
  const pageNames = [
    '@FunnyMemesDaily', '@ViralEdits', '@BollywoodBuzz',
    '@ComedyCentral', '@CreativeEdits', '@MovieMania',
    '@LaughOutLoud', '@ArtisticVibes', '@CinemaSpotlight',
    '@HumorHub', '@VisualMagic', '@FilmFever',
    '@JokeJunction', '@DesignDreams', '@StarStruck',
    '@ComedyCorner', '@EditEmpire', '@MovieMagic',
    '@LaughLab', '@CreativeCorner', '@BollywoodBeats'
  ];

  const pages = [];
  
  for (let i = 0; i < 21; i++) {
    const category = categories[i % categories.length];
    const followers = Math.floor(Math.random() * 1000000) + 10000; // 10K to 1M followers
    
    pages.push({
      id: `page_${i + 1}`,
      name: pageNames[i],
      category: category,
      followers: followers,
      profileLink: `https://instagram.com/${pageNames[i].substring(1)}`,
      postCount: Math.floor(Math.random() * 50) + 10 // 10-60 posts
    });
  }

  return pages;
};

// Distribute posts across selected dates with follower-based prioritization
export const distributePosts = (pages, selectedDates) => {
  if (selectedDates.length === 0 || pages.length === 0) {
    return {};
  }

  // Sort pages by follower count (descending) for prioritization
  const sortedPages = [...pages].sort((a, b) => b.followers - a.followers);
  
  // Calculate total posts to distribute
  const totalPosts = sortedPages.reduce((sum, page) => sum + page.postCount, 0);
  
  // Initialize distribution object
  const distribution = {};
  selectedDates.forEach(date => {
    distribution[date] = [];
  });

  // Distribute posts with balanced category distribution
  const categoryCounts = {};
  const postTypes = ['Static', 'Reel', 'FB', 'Twitter', 'Story'];
  
  sortedPages.forEach(page => {
    // Calculate how many posts this page should have on each date
    const postsPerDate = Math.ceil(page.postCount / selectedDates.length);
    
    for (let i = 0; i < page.postCount; i++) {
      // Find the date with the least posts for this category
      const targetDate = findBestDateForPost(page.category, distribution, selectedDates);
      
      if (targetDate) {
        const postType = postTypes[Math.floor(Math.random() * postTypes.length)];
        
        // Generate estimated metrics based on follower count and post type
        const metrics = generateEstimatedMetrics(page.followers, postType, page.category);
        
        const post = {
          pageId: page.id,
          scheduledDate: targetDate,
          postType: postType,
          postLink: `https://instagram.com/p/${generateRandomId()}`,
          ...metrics
        };
        
        distribution[targetDate].push(post);
      }
    }
  });

  return distribution;
};

// Find the best date for a post based on category balance
const findBestDateForPost = (category, distribution, selectedDates) => {
  let bestDate = selectedDates[0];
  let minCategoryCount = Infinity;
  
  selectedDates.forEach(date => {
    const datePosts = distribution[date] || [];
    const categoryCount = datePosts.filter(post => {
      // We need to find the page for this post to get its category
      // For now, we'll use a simple approach
      return true; // This will be refined when we have the actual page data
    }).length;
    
    if (categoryCount < minCategoryCount) {
      minCategoryCount = categoryCount;
      bestDate = date;
    }
  });
  
  return bestDate;
};

// Generate estimated metrics based on follower count, post type, and category
const generateEstimatedMetrics = (followers, postType, category) => {
  // Base engagement rates (percentage of followers)
  const baseEngagementRates = {
    Static: { likes: 0.03, views: 0.15, comments: 0.005, shares: 0.002, reach: 0.25, impressions: 0.3 },
    Reel: { likes: 0.05, views: 0.4, comments: 0.008, shares: 0.004, reach: 0.6, impressions: 0.8 },
    FB: { likes: 0.02, views: 0.1, comments: 0.003, shares: 0.001, reach: 0.2, impressions: 0.25 },
    Twitter: { likes: 0.015, views: 0.08, comments: 0.002, shares: 0.0008, reach: 0.15, impressions: 0.2 },
    Story: { likes: 0.01, views: 0.2, comments: 0.001, shares: 0.0005, reach: 0.3, impressions: 0.35 }
  };

  // Category multipliers
  const categoryMultipliers = {
    Meme: { likes: 1.2, views: 1.1, comments: 1.3, shares: 1.4, reach: 1.1, impressions: 1.1 },
    Edit: { likes: 1.1, views: 1.2, comments: 1.1, shares: 1.2, reach: 1.2, impressions: 1.2 },
    Bollywood: { likes: 1.0, views: 1.0, comments: 1.0, shares: 1.0, reach: 1.0, impressions: 1.0 }
  };

  const baseRates = baseEngagementRates[postType] || baseEngagementRates.Static;
  const multipliers = categoryMultipliers[category] || categoryMultipliers.Bollywood;

  // Add some randomness (±20%)
  const randomFactor = () => 0.8 + Math.random() * 0.4;

  return {
    estimatedLikes: Math.floor(followers * baseRates.likes * multipliers.likes * randomFactor()),
    estimatedViews: Math.floor(followers * baseRates.views * multipliers.views * randomFactor()),
    estimatedComments: Math.floor(followers * baseRates.comments * multipliers.comments * randomFactor()),
    estimatedShares: Math.floor(followers * baseRates.shares * multipliers.shares * randomFactor()),
    estimatedReach: Math.floor(followers * baseRates.reach * multipliers.reach * randomFactor()),
    estimatedImpressions: Math.floor(followers * baseRates.impressions * multipliers.impressions * randomFactor())
  };
};

// Generate random ID for post links
const generateRandomId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 11; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Calculate category distribution for a given date
export const getCategoryDistribution = (posts, pages) => {
  const distribution = {};
  
  posts.forEach(post => {
    const page = pages.find(p => p.id === post.pageId);
    const category = page?.category || 'Unknown';
    
    if (!distribution[category]) {
      distribution[category] = 0;
    }
    distribution[category]++;
  });
  
  return distribution;
};

// Calculate total metrics for a given date
export const getDateMetrics = (posts) => {
  return posts.reduce((metrics, post) => ({
    likes: (metrics.likes || 0) + (post.estimatedLikes || 0),
    views: (metrics.views || 0) + (post.estimatedViews || 0),
    comments: (metrics.comments || 0) + (post.estimatedComments || 0),
    shares: (metrics.shares || 0) + (post.estimatedShares || 0),
    reach: (metrics.reach || 0) + (post.estimatedReach || 0),
    impressions: (metrics.impressions || 0) + (post.estimatedImpressions || 0)
  }), {});
}; 