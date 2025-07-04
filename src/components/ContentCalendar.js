import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

const ContentCalendar = ({ selectedDates, scheduledPosts, pages }) => {
  const getCurrentMonthDates = () => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    return eachDayOfInterval({ start, end });
  };

  const getNextMonthDates = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const start = startOfMonth(nextMonth);
    const end = endOfMonth(nextMonth);
    return eachDayOfInterval({ start, end });
  };

  const getMonthDates = (monthOffset = 0) => {
    const now = new Date();
    const targetMonth = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    const start = startOfMonth(targetMonth);
    const end = endOfMonth(targetMonth);
    return eachDayOfInterval({ start, end });
  };

  const getDayClass = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const isSelected = selectedDates.includes(dateStr);
    const hasPosts = scheduledPosts[dateStr] && scheduledPosts[dateStr].length > 0;
    
    let className = 'calendar-day';
    
    if (isSelected && hasPosts) {
      className += ' selected has-posts';
    } else if (isSelected) {
      className += ' selected';
    } else if (hasPosts) {
      className += ' has-posts';
    }
    
    return className;
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

  const renderCalendarMonth = (monthOffset = 0) => {
    const dates = getMonthDates(monthOffset);
    const monthName = format(dates[0], 'MMMM yyyy');
    
    // Get the first day of the month to determine padding
    const firstDay = dates[0];
    const dayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Create padding for the first week
    const padding = [];
    for (let i = 0; i < dayOfWeek; i++) {
      padding.push(<div key={`padding-${i}`} className="calendar-day" style={{ background: '#f8f9fa' }}></div>);
    }

    return (
      <div className="calendar-month">
        <div className="calendar-month-header">{monthName}</div>
        <div className="calendar-weekdays">
          <div className="calendar-weekday">Sun</div>
          <div className="calendar-weekday">Mon</div>
          <div className="calendar-weekday">Tue</div>
          <div className="calendar-weekday">Wed</div>
          <div className="calendar-weekday">Thu</div>
          <div className="calendar-weekday">Fri</div>
          <div className="calendar-weekday">Sat</div>
        </div>
        <div className="calendar-grid">
          {padding}
          {dates.map((date) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const dayPosts = scheduledPosts[dateStr] || [];
            
            return (
              <div key={dateStr} className={getDayClass(date)}>
                <div className="calendar-day-header">
                  {format(date, 'd')}
                  {dayPosts.length > 0 && (
                    <span className="post-count">{dayPosts.length}</span>
                  )}
                </div>
                
                {dayPosts.length > 0 && (
                  <div className="post-details">
                    {dayPosts.slice(0, 3).map((post, index) => {
                      const page = pages.find(p => p.id === post.pageId);
                      return (
                        <div key={index} className={`post-item ${page?.category?.toLowerCase()}`}>
                          <div className="post-detail-item">
                            <strong>{page?.name}</strong>
                          </div>
                          <div className="post-detail-item">
                            <span className={`badge ${getCategoryBadgeClass(page?.category)}`}>
                              {page?.category}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {dayPosts.length > 3 && (
                      <div className="post-detail-item">
                        +{dayPosts.length - 3} more posts
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (selectedDates.length === 0) {
    return (
      <div className="loading">
        <p>Please select dates to view the content calendar.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="calendar-controls">
        <h3>Content Calendar View</h3>
        <div>
          <strong>Selected Dates:</strong> {selectedDates.length} | 
          <strong> Total Posts:</strong> {Object.values(scheduledPosts).flat().length}
        </div>
      </div>

      {renderCalendarMonth(0)} {/* Current month */}
      {renderCalendarMonth(1)} {/* Next month */}
      
      {Object.keys(scheduledPosts).length > 0 && (
        <div className="card">
          <h3>Detailed Schedule</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Page Name</th>
                <th>Category</th>
                <th>Followers</th>
                <th>Post Type</th>
                <th>Estimated Metrics</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(scheduledPosts).map(([date, posts]) =>
                posts.map((post, index) => {
                  const page = pages.find(p => p.id === post.pageId);
                  return (
                    <tr key={`${date}-${index}`}>
                      <td>{format(new Date(date), 'MMM dd, yyyy')}</td>
                      <td>
                        <strong>{page?.name}</strong>
                        <br />
                        <small>{page?.profileLink}</small>
                      </td>
                      <td>
                        <span className={`badge ${getCategoryBadgeClass(page?.category)}`}>
                          {page?.category}
                        </span>
                      </td>
                      <td>{page?.followers?.toLocaleString()}</td>
                      <td>{post.postType}</td>
                      <td>
                        <div>Likes: {post.estimatedLikes?.toLocaleString()}</div>
                        <div>Views: {post.estimatedViews?.toLocaleString()}</div>
                        <div>Shares: {post.estimatedShares?.toLocaleString()}</div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContentCalendar; 