import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

const ExportButton = ({ scheduledPosts, pages, selectedDates }) => {
  const [exporting, setExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    overview: true,
    dateWise: true,
    categoryWise: true
  });

  const generateOverviewSheet = () => {
    // Calculate total metrics
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

    // Category breakdown
    const categoryBreakdown = {};
    Object.values(scheduledPosts).flat().forEach(post => {
      const page = pages.find(p => p.id === post.pageId);
      const category = page?.category || 'Unknown';
      
      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = {
          posts: 0,
          likes: 0,
          views: 0,
          comments: 0,
          shares: 0,
          reach: 0,
          impressions: 0
        };
      }
      
      categoryBreakdown[category].posts++;
      categoryBreakdown[category].likes += post.estimatedLikes || 0;
      categoryBreakdown[category].views += post.estimatedViews || 0;
      categoryBreakdown[category].comments += post.estimatedComments || 0;
      categoryBreakdown[category].shares += post.estimatedShares || 0;
      categoryBreakdown[category].reach += post.estimatedReach || 0;
      categoryBreakdown[category].impressions += post.estimatedImpressions || 0;
    });

    // Date-wise summary
    const dateWiseData = [];
    Object.entries(scheduledPosts).forEach(([date, posts]) => {
      let dateLikes = 0;
      let dateViews = 0;
      let dateComments = 0;
      let dateShares = 0;
      let dateReach = 0;
      let dateImpressions = 0;
      const dateCategories = {};

      posts.forEach(post => {
        const page = pages.find(p => p.id === post.pageId);
        const category = page?.category || 'Unknown';
        
        dateLikes += post.estimatedLikes || 0;
        dateViews += post.estimatedViews || 0;
        dateComments += post.estimatedComments || 0;
        dateShares += post.estimatedShares || 0;
        dateReach += post.estimatedReach || 0;
        dateImpressions += post.estimatedImpressions || 0;
        
        dateCategories[category] = (dateCategories[category] || 0) + 1;
      });

      dateWiseData.push({
        Date: format(new Date(date), 'MMM dd, yyyy'),
        Posts: posts.length,
        Categories: Object.entries(dateCategories).map(([cat, count]) => `${cat}: ${count}`).join(', '),
        Likes: dateLikes,
        Views: dateViews,
        Comments: dateComments,
        Shares: dateShares,
        Reach: dateReach,
        Impressions: dateImpressions
      });
    });

    return {
      'Summary': [
        { Metric: 'Total Posts', Value: Object.values(scheduledPosts).flat().length },
        { Metric: 'Scheduled Dates', Value: Object.keys(scheduledPosts).length },
        { Metric: 'Total Likes', Value: totalLikes },
        { Metric: 'Total Views', Value: totalViews },
        { Metric: 'Total Comments', Value: totalComments },
        { Metric: 'Total Shares', Value: totalShares },
        { Metric: 'Total Reach', Value: totalReach },
        { Metric: 'Total Impressions', Value: totalImpressions }
      ],
      'Category Breakdown': [
        { Category: 'Category', Posts: 'Posts', Likes: 'Likes', Views: 'Views', Comments: 'Comments', Shares: 'Shares', Reach: 'Reach', Impressions: 'Impressions' },
        ...Object.entries(categoryBreakdown).map(([category, metrics]) => ({
          Category: category,
          Posts: metrics.posts,
          Likes: metrics.likes,
          Views: metrics.views,
          Comments: metrics.comments,
          Shares: metrics.shares,
          Reach: metrics.reach,
          Impressions: metrics.impressions
        })),
        {
          Category: 'TOTAL',
          Posts: Object.values(categoryBreakdown).reduce((sum, m) => sum + m.posts, 0),
          Likes: totalLikes,
          Views: totalViews,
          Comments: totalComments,
          Shares: totalShares,
          Reach: totalReach,
          Impressions: totalImpressions
        }
      ],
      'Date-wise Summary': [
        { Date: 'Date', Posts: 'Posts', Categories: 'Categories', Likes: 'Likes', Views: 'Views', Comments: 'Comments', Shares: 'Shares', Reach: 'Reach', Impressions: 'Impressions' },
        ...dateWiseData.sort((a, b) => new Date(a.Date) - new Date(b.Date))
      ]
    };
  };

  const generateDateWiseSheets = () => {
    const sheets = {};
    
    Object.entries(scheduledPosts).forEach(([date, posts]) => {
      const sheetName = format(new Date(date), 'MMM dd');
      const sheetData = [
        {
          'Page Name': 'Page Name',
          'Profile Link': 'Profile Link',
          'Followers': 'Followers',
          'Date of Post': 'Date of Post',
          'Post Link': 'Post Link',
          'Post Type': 'Post Type',
          'Category': 'Category',
          'Likes': 'Likes',
          'Views': 'Views',
          'Comments': 'Comments',
          'Shares': 'Shares',
          'Reach': 'Reach',
          'Impressions': 'Impressions'
        }
      ];

      posts.forEach(post => {
        const page = pages.find(p => p.id === post.pageId);
        sheetData.push({
          'Page Name': page?.name || 'Unknown',
          'Profile Link': page?.profileLink || '',
          'Followers': page?.followers || 0,
          'Date of Post': format(new Date(date), 'MMM dd, yyyy'),
          'Post Link': post.postLink || '',
          'Post Type': post.postType || 'Static',
          'Category': page?.category || 'Unknown',
          'Likes': post.estimatedLikes || 0,
          'Views': post.estimatedViews || 0,
          'Comments': post.estimatedComments || 0,
          'Shares': post.estimatedShares || 0,
          'Reach': post.estimatedReach || 0,
          'Impressions': post.estimatedImpressions || 0
        });
      });

      sheets[sheetName] = sheetData;
    });

    return sheets;
  };

  const generateCategoryWiseSheet = () => {
    const categoryData = {};
    
    Object.values(scheduledPosts).flat().forEach(post => {
      const page = pages.find(p => p.id === post.pageId);
      const category = page?.category || 'Unknown';
      
      if (!categoryData[category]) {
        categoryData[category] = [];
      }
      
      categoryData[category].push({
        'Page Name': page?.name || 'Unknown',
        'Profile Link': page?.profileLink || '',
        'Followers': page?.followers || 0,
        'Date of Post': format(new Date(post.scheduledDate), 'MMM dd, yyyy'),
        'Post Link': post.postLink || '',
        'Post Type': post.postType || 'Static',
        'Likes': post.estimatedLikes || 0,
        'Views': post.estimatedViews || 0,
        'Comments': post.estimatedComments || 0,
        'Shares': post.estimatedShares || 0,
        'Reach': post.estimatedReach || 0,
        'Impressions': post.estimatedImpressions || 0
      });
    });

    const sheets = {};
    Object.entries(categoryData).forEach(([category, data]) => {
      sheets[`${category} Posts`] = [
        {
          'Page Name': 'Page Name',
          'Profile Link': 'Profile Link',
          'Followers': 'Followers',
          'Date of Post': 'Date of Post',
          'Post Link': 'Post Link',
          'Post Type': 'Post Type',
          'Likes': 'Likes',
          'Views': 'Views',
          'Comments': 'Comments',
          'Shares': 'Shares',
          'Reach': 'Reach',
          'Impressions': 'Impressions'
        },
        ...data
      ];
    });

    return sheets;
  };

  const handleExport = async () => {
    setExporting(true);
    
    try {
      const workbook = XLSX.utils.book_new();
      
      // Overview Sheet
      if (exportOptions.overview) {
        const overviewData = generateOverviewSheet();
        Object.entries(overviewData).forEach(([sheetName, data]) => {
          const worksheet = XLSX.utils.json_to_sheet(data);
          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        });
      }
      
      // Date-wise Sheets
      if (exportOptions.dateWise) {
        const dateSheets = generateDateWiseSheets();
        Object.entries(dateSheets).forEach(([sheetName, data]) => {
          const worksheet = XLSX.utils.json_to_sheet(data);
          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        });
      }
      
      // Category-wise Sheets
      if (exportOptions.categoryWise) {
        const categorySheets = generateCategoryWiseSheet();
        Object.entries(categorySheets).forEach(([sheetName, data]) => {
          const worksheet = XLSX.utils.json_to_sheet(data);
          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        });
      }
      
      // Generate filename
      const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
      const filename = `social_media_calendar_${timestamp}.xlsx`;
      
      // Save file
      XLSX.writeFile(workbook, filename);
      
      alert('Excel file exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting file. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleOptionChange = (option) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div className="export-section">
      <div className="export-options">
        <div className="export-option">
          <input
            type="checkbox"
            id="overview"
            checked={exportOptions.overview}
            onChange={() => handleOptionChange('overview')}
          />
          <label htmlFor="overview">Overview Sheet</label>
        </div>
        <div className="export-option">
          <input
            type="checkbox"
            id="dateWise"
            checked={exportOptions.dateWise}
            onChange={() => handleOptionChange('dateWise')}
          />
          <label htmlFor="dateWise">Date-wise Sheets</label>
        </div>
        <div className="export-option">
          <input
            type="checkbox"
            id="categoryWise"
            checked={exportOptions.categoryWise}
            onChange={() => handleOptionChange('categoryWise')}
          />
          <label htmlFor="categoryWise">Category-wise Sheets</label>
        </div>
      </div>
      
      <button
        className="btn btn-success"
        onClick={handleExport}
        disabled={exporting || Object.keys(exportOptions).every(key => !exportOptions[key])}
      >
        {exporting ? 'Exporting...' : 'Export to Excel'}
      </button>
    </div>
  );
};

export default ExportButton; 