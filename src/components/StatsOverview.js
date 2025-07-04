import React from 'react';
import { format } from 'date-fns';

const StatsOverview = ({ scheduledPosts, pages }) => {
  // Calculate total metrics across all dates
  const calculateTotalMetrics = () => {
    let totalLikes = 0;
    let totalViews = 0;
    let totalComments = 0;
    let totalShares = 0;
    let totalReach = 0;
    let totalImpressions = 0;

    Object.values(scheduledPosts).flat().forEach(post => {
      totalLikes += post.estimatedLikes || 0;
      totalViews += post.estimatedViews || 0;
      totalComments += post.estimatedComments || 0;
      totalShares += post.estimatedShares || 0;
      totalReach += post.estimatedReach || 0;
      totalImpressions += post.estimatedImpressions || 0;
    });

    return {
      totalLikes,
      totalViews,
      totalComments,
      totalShares,
      totalReach,
      totalImpressions
    };
  };

  // Calculate category breakdown
  const calculateCategoryBreakdown = () => {
    const breakdown = {};
    
    Object.values(scheduledPosts).flat().forEach(post => {
      const page = pages.find(p => p.id === post.pageId);
      const category = page?.category || 'Unknown';
      
      if (!breakdown[category]) {
        breakdown[category] = {
          count: 0,
          likes: 0,
          views: 0,
          comments: 0,
          shares: 0,
          reach: 0,
          impressions: 0
        };
      }
      
      breakdown[category].count++;
      breakdown[category].likes += post.estimatedLikes || 0;
      breakdown[category].views += post.estimatedViews || 0;
      breakdown[category].comments += post.estimatedComments || 0;
      breakdown[category].shares += post.estimatedShares || 0;
      breakdown[category].reach += post.estimatedReach || 0;
      breakdown[category].impressions += post.estimatedImpressions || 0;
    });

    return breakdown;
  };

  // Calculate date-wise metrics
  const calculateDateWiseMetrics = () => {
    const dateMetrics = {};
    
    Object.entries(scheduledPosts).forEach(([date, posts]) => {
      dateMetrics[date] = {
        posts: posts.length,
        likes: 0,
        views: 0,
        comments: 0,
        shares: 0,
        reach: 0,
        impressions: 0,
        categories: {}
      };

      posts.forEach(post => {
        const page = pages.find(p => p.id === post.pageId);
        const category = page?.category || 'Unknown';
        
        dateMetrics[date].likes += post.estimatedLikes || 0;
        dateMetrics[date].views += post.estimatedViews || 0;
        dateMetrics[date].comments += post.estimatedComments || 0;
        dateMetrics[date].shares += post.estimatedShares || 0;
        dateMetrics[date].reach += post.estimatedReach || 0;
        dateMetrics[date].impressions += post.estimatedImpressions || 0;
        
        if (!dateMetrics[date].categories[category]) {
          dateMetrics[date].categories[category] = 0;
        }
        dateMetrics[date].categories[category]++;
      });
    });

    return dateMetrics;
  };

  const totalMetrics = calculateTotalMetrics();
  const categoryBreakdown = calculateCategoryBreakdown();
  const dateWiseMetrics = calculateDateWiseMetrics();
  const totalPosts = Object.values(scheduledPosts).flat().length;

  const getCategoryBadgeClass = (category) => {
    switch (category.toLowerCase()) {
      case 'meme':
        return 'badge-meme';
      case 'edit':
        return 'badge-edit';
      case 'bollywood':
        return 'badge-bollywood';
      default:
        return 'badge';
    }
  };

  return (
    <div className="stats-summary">
      <h3>Performance Overview</h3>
      
      {/* Overall Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalPosts}</div>
          <div className="stat-label">Total Posts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{Object.keys(scheduledPosts).length}</div>
          <div className="stat-label">Scheduled Dates</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalMetrics.totalLikes.toLocaleString()}</div>
          <div className="stat-label">Total Likes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalMetrics.totalViews.toLocaleString()}</div>
          <div className="stat-label">Total Views</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalMetrics.totalShares.toLocaleString()}</div>
          <div className="stat-label">Total Shares</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalMetrics.totalReach.toLocaleString()}</div>
          <div className="stat-label">Total Reach</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="category-breakdown">
        <h4>Category-wise Distribution</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Posts</th>
              <th>Likes</th>
              <th>Views</th>
              <th>Comments</th>
              <th>Shares</th>
              <th>Reach</th>
              <th>Impressions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categoryBreakdown).map(([category, metrics]) => (
              <tr key={category}>
                <td>
                  <span className={`badge ${getCategoryBadgeClass(category)}`}>
                    {category}
                  </span>
                </td>
                <td>{metrics.count}</td>
                <td>{metrics.likes.toLocaleString()}</td>
                <td>{metrics.views.toLocaleString()}</td>
                <td>{metrics.comments.toLocaleString()}</td>
                <td>{metrics.shares.toLocaleString()}</td>
                <td>{metrics.reach.toLocaleString()}</td>
                <td>{metrics.impressions.toLocaleString()}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>
              <td>Total</td>
              <td>{totalPosts}</td>
              <td>{totalMetrics.totalLikes.toLocaleString()}</td>
              <td>{totalMetrics.totalViews.toLocaleString()}</td>
              <td>{totalMetrics.totalComments.toLocaleString()}</td>
              <td>{totalMetrics.totalShares.toLocaleString()}</td>
              <td>{totalMetrics.totalReach.toLocaleString()}</td>
              <td>{totalMetrics.totalImpressions.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Date-wise Breakdown */}
      <div className="category-breakdown">
        <h4>Date-wise Performance</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Posts</th>
              <th>Categories</th>
              <th>Likes</th>
              <th>Views</th>
              <th>Comments</th>
              <th>Shares</th>
              <th>Reach</th>
              <th>Impressions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(dateWiseMetrics)
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .map(([date, metrics]) => (
                <tr key={date}>
                  <td>{format(new Date(date), 'MMM dd, yyyy')}</td>
                  <td>{metrics.posts}</td>
                  <td>
                    {Object.entries(metrics.categories).map(([category, count]) => (
                      <div key={category}>
                        <span className={`badge ${getCategoryBadgeClass(category)}`}>
                          {category}: {count}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td>{metrics.likes.toLocaleString()}</td>
                  <td>{metrics.views.toLocaleString()}</td>
                  <td>{metrics.comments.toLocaleString()}</td>
                  <td>{metrics.shares.toLocaleString()}</td>
                  <td>{metrics.reach.toLocaleString()}</td>
                  <td>{metrics.impressions.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsOverview; 