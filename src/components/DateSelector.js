import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ selectedDates, onDateSelection }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 days from now
  const [numDates, setNumDates] = useState(7);

  const handleAddDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (!selectedDates.includes(formattedDate)) {
      onDateSelection([...selectedDates, formattedDate]);
    }
  };

  const handleRemoveDate = (dateToRemove) => {
    onDateSelection(selectedDates.filter(date => date !== dateToRemove));
  };

  const generateRandomDates = () => {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    while (dates.length < numDates) {
      const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
      const randomDate = new Date(randomTime);
      const formattedDate = format(randomDate, 'yyyy-MM-dd');
      
      if (!dates.includes(formattedDate)) {
        dates.push(formattedDate);
      }
    }
    
    onDateSelection(dates.sort());
  };

  const clearAllDates = () => {
    onDateSelection([]);
  };

  return (
    <div>
      <div className="date-picker-container">
        <div className="form-group">
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            className="form-control"
            dateFormat="MMM dd, yyyy"
          />
        </div>
        
        <div className="form-group">
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            className="form-control"
            dateFormat="MMM dd, yyyy"
            minDate={startDate}
          />
        </div>
        
        <div className="form-group">
          <label>Number of Dates:</label>
          <input
            type="number"
            min="1"
            max="31"
            value={numDates}
            onChange={(e) => setNumDates(parseInt(e.target.value) || 1)}
            className="form-control"
          />
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button className="btn btn-success" onClick={generateRandomDates}>
          Generate Random Dates
        </button>
        <button className="btn btn-secondary" onClick={clearAllDates}>
          Clear All Dates
        </button>
      </div>

      {selectedDates.length > 0 && (
        <div className="selected-dates">
          <h4>Selected Dates ({selectedDates.length}):</h4>
          {selectedDates.map((date) => (
            <div key={date} className="date-tag">
              <span>{format(new Date(date), 'MMM dd, yyyy')}</span>
              <button onClick={() => handleRemoveDate(date)}>×</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        <h4>Or Add Individual Dates:</h4>
        <div className="form-group">
          <DatePicker
            selected={null}
            onChange={handleAddDate}
            className="form-control"
            dateFormat="MMM dd, yyyy"
            placeholderText="Click to add a date"
            minDate={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelector; 