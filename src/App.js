import React, { useState, useEffect } from 'react';
import DateSelector from './components/DateSelector';
import ContentCalendar from './components/ContentCalendar';
import PageFilter from './components/PageFilter';
import ExportButton from './components/ExportButton';
import StatsOverview from './components/StatsOverview';
import { generateDummyData, distributePosts } from './utils/dataUtils';
import './App.css';

function App() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [pages, setPages] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  // Load dummy data on component mount
  useEffect(() => {
    const dummyData = generateDummyData();
    setPages(dummyData);
    setFilteredPages(dummyData);
  }, []);

  // Filter pages based on selected categories and pages
  useEffect(() => {
    let filtered = pages;
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(page => selectedCategories.includes(page.category));
    }
    
    if (selectedPages.length > 0) {
      filtered = filtered.filter(page => selectedPages.includes(page.id));
    }
    
    setFilteredPages(filtered);
  }, [pages, selectedCategories, selectedPages]);

  const handleDateSelection = (dates) => {
    setSelectedDates(dates);
  };

  const handleGenerateCalendar = () => {
    if (selectedDates.length === 0) {
      setError('Please select at least one date for scheduling posts.');
      return;
    }

    if (filteredPages.length === 0) {
      setError('Please select at least one page or category to schedule posts.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const distributed = distributePosts(filteredPages, selectedDates);
      setScheduledPosts(distributed);
    } catch (err) {
      setError('Error generating calendar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (categories) => {
    setSelectedCategories(categories);
  };

  const handlePageFilter = (pageIds) => {
    setSelectedPages(pageIds);
  };

  const handleExport = () => {
    if (Object.keys(scheduledPosts).length === 0) {
      setError('No posts scheduled. Please generate a calendar first.');
      return;
    }
    // Export functionality will be handled by ExportButton component
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Social Media Content Calendar</h1>
          <p>Schedule and manage your social media posts with intelligent distribution</p>
        </header>

        {error && (
          <div className="error">
            {error}
            <button className="btn btn-secondary" onClick={() => setError(null)}>
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-2">
          <div className="card">
            <h2>Page & Category Selection</h2>
            <PageFilter
              pages={pages}
              selectedCategories={selectedCategories}
              selectedPages={selectedPages}
              onCategoryFilter={handleCategoryFilter}
              onPageFilter={handlePageFilter}
            />
          </div>

          <div className="card">
            <h2>Date Selection</h2>
            <DateSelector
              selectedDates={selectedDates}
              onDateSelection={handleDateSelection}
            />
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Content Calendar</h2>
            <div>
              <button
                className="btn btn-success"
                onClick={handleGenerateCalendar}
                disabled={loading || selectedDates.length === 0 || filteredPages.length === 0}
              >
                {loading ? 'Generating...' : 'Generate Calendar'}
              </button>
              {Object.keys(scheduledPosts).length > 0 && (
                <ExportButton
                  scheduledPosts={scheduledPosts}
                  pages={filteredPages}
                  selectedDates={selectedDates}
                />
              )}
            </div>
          </div>

          {Object.keys(scheduledPosts).length > 0 && (
            <StatsOverview scheduledPosts={scheduledPosts} pages={filteredPages} />
          )}

          <ContentCalendar
            selectedDates={selectedDates}
            scheduledPosts={scheduledPosts}
            pages={filteredPages}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 