import React, { useState, useEffect } from 'react';

const PageFilter = ({ 
  pages, 
  selectedCategories, 
  selectedPages, 
  onCategoryFilter, 
  onPageFilter 
}) => {
  const [showAllPages, setShowAllPages] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories from pages
  const categories = [...new Set(pages.map(page => page.category))];

  // Filter pages based on search term
  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group pages by category
  const pagesByCategory = categories.reduce((acc, category) => {
    acc[category] = filteredPages.filter(page => page.category === category);
    return acc;
  }, {});

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryFilter(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryFilter([...selectedCategories, category]);
    }
  };

  const handlePageToggle = (pageId) => {
    if (selectedPages.includes(pageId)) {
      onPageFilter(selectedPages.filter(id => id !== pageId));
    } else {
      onPageFilter([...selectedPages, pageId]);
    }
  };

  const handleSelectAllCategories = () => {
    onCategoryFilter(categories);
  };

  const handleClearAllCategories = () => {
    onCategoryFilter([]);
  };

  const handleSelectAllPages = () => {
    onPageFilter(filteredPages.map(page => page.id));
  };

  const handleClearAllPages = () => {
    onPageFilter([]);
  };

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
    <div>
      <div className="filter-section">
        <h3>Filter by Category</h3>
        <div style={{ marginBottom: '1rem' }}>
          <button className="btn btn-secondary" onClick={handleSelectAllCategories}>
            Select All Categories
          </button>
          <button className="btn btn-secondary" onClick={handleClearAllCategories}>
            Clear All Categories
          </button>
        </div>
        
        <div className="checkbox-group">
          {categories.map(category => (
            <div key={category} className="checkbox-item">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
              <label htmlFor={`category-${category}`}>
                <span className={`badge ${getCategoryBadgeClass(category)}`}>
                  {category}
                </span>
                <span style={{ marginLeft: '0.5rem' }}>
                  ({pages.filter(p => p.category === category).length} pages)
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Filter by Specific Pages</h3>
        <div className="form-group">
          <label>Search Pages:</label>
          <input
            type="text"
            placeholder="Search by page name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <button className="btn btn-secondary" onClick={handleSelectAllPages}>
            Select All Pages
          </button>
          <button className="btn btn-secondary" onClick={handleClearAllPages}>
            Clear All Pages
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowAllPages(!showAllPages)}
          >
            {showAllPages ? 'Hide Pages' : 'Show Pages'}
          </button>
        </div>

        {showAllPages && (
          <div>
            {categories.map(category => (
              <div key={category} style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#555' }}>
                  <span className={`badge ${getCategoryBadgeClass(category)}`}>
                    {category}
                  </span>
                  <span style={{ marginLeft: '0.5rem' }}>
                    ({pagesByCategory[category]?.length || 0} pages)
                  </span>
                </h4>
                
                <div className="checkbox-group">
                  {pagesByCategory[category]?.map(page => (
                    <div key={page.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={`page-${page.id}`}
                        checked={selectedPages.includes(page.id)}
                        onChange={() => handlePageToggle(page.id)}
                      />
                      <label htmlFor={`page-${page.id}`}>
                        <strong>{page.name}</strong>
                        <span style={{ marginLeft: '0.5rem', color: '#666' }}>
                          ({page.followers.toLocaleString()} followers)
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="stats-summary">
        <h3>Selection Summary</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{pages.length}</div>
            <div className="stat-label">Total Pages</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{selectedCategories.length}</div>
            <div className="stat-label">Selected Categories</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{selectedPages.length}</div>
            <div className="stat-label">Selected Pages</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {pages.filter(page => 
                selectedCategories.includes(page.category) || 
                selectedPages.includes(page.id)
              ).length}
            </div>
            <div className="stat-label">Pages to Schedule</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFilter; 