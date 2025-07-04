# Social Media Content Calendar

A comprehensive web-based content calendar application that dynamically schedules social media posts based on API data. Users can select random dates, and the system will distribute content accordingly with intelligent follower-based prioritization.

## 🚀 Features

### Core Functionality
- **Dynamic Calendar Generation**: Users select random dates for content posting
- **Follower-Based Prioritization**: Pages with more followers get higher priority in post allocation
- **Balanced Category Distribution**: Ensures fair distribution across different page categories
- **Real-time Performance Metrics**: Track likes, views, reach, impressions, and shares

### User Interface
- **Modern React UI**: Beautiful, responsive design with gradient backgrounds
- **Interactive Date Selection**: Multiple ways to select dates (random generation, individual selection)
- **Page & Category Filtering**: Filter by specific categories or individual pages
- **Visual Calendar Grid**: Custom calendar UI showing scheduled posts
- **Performance Dashboard**: Comprehensive statistics and metrics overview

### Excel Export Functionality
- **Overview Sheet**: Category-wise post distribution and total metrics
- **Date-wise Sheets**: Individual sheets for each scheduled date
- **Category-wise Sheets**: Separate sheets for each content category
- **Comprehensive Data**: Includes all performance metrics and post details

## 🛠️ Technology Stack

- **Frontend Framework**: React.js 18
- **State Management**: React Hooks (useState, useEffect)
- **Date Handling**: date-fns
- **Excel Export**: SheetJS (xlsx)
- **Date Picker**: react-datepicker
- **Styling**: Custom CSS with modern design patterns

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-media-content-calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage Guide

### 1. Page & Category Selection
- **Filter by Category**: Select specific categories (Meme, Edit, Bollywood)
- **Filter by Pages**: Choose individual pages from the list
- **Search Functionality**: Search pages by name or category
- **Selection Summary**: View real-time statistics of your selections

### 2. Date Selection
- **Random Date Generation**: Set date range and number of dates
- **Individual Date Selection**: Add specific dates manually
- **Date Management**: Remove dates or clear all selections
- **Visual Feedback**: Selected dates are highlighted

### 3. Calendar Generation
- **Generate Calendar**: Click to distribute posts across selected dates
- **Follower Prioritization**: Higher follower pages get better placement
- **Category Balance**: Even distribution across all categories
- **Performance Metrics**: Real-time calculation of estimated engagement

### 4. Calendar View
- **Monthly Calendar**: View current and next month
- **Post Indicators**: Visual indicators for days with scheduled posts
- **Post Details**: Hover to see post information
- **Detailed Schedule**: Table view with all scheduled posts

### 5. Performance Overview
- **Overall Statistics**: Total posts, likes, views, shares, etc.
- **Category Breakdown**: Performance metrics by category
- **Date-wise Metrics**: Daily performance summary
- **Visual Charts**: Easy-to-read statistics cards

### 6. Excel Export
- **Export Options**: Choose which sheets to include
- **Overview Sheet**: Summary, category breakdown, and date-wise summary
- **Date-wise Sheets**: Individual sheets for each scheduled date
- **Category-wise Sheets**: Separate sheets for each content category
- **Automatic Naming**: Timestamped filenames for easy organization

## 📊 Data Structure

### Page Object
```javascript
{
  id: "page_1",
  name: "@FunnyMemesDaily",
  category: "Meme",
  followers: 500000,
  profileLink: "https://instagram.com/FunnyMemesDaily",
  postCount: 25
}
```

### Post Object
```javascript
{
  pageId: "page_1",
  scheduledDate: "2024-01-15",
  postType: "Reel",
  postLink: "https://instagram.com/p/ABC123",
  estimatedLikes: 15000,
  estimatedViews: 120000,
  estimatedComments: 800,
  estimatedShares: 400,
  estimatedReach: 250000,
  estimatedImpressions: 300000
}
```

## 🎨 Customization

### Styling
- Modify `src/index.css` for global styles
- Update `src/App.css` for component-specific styles
- Customize color schemes and gradients

### Data Generation
- Edit `src/utils/dataUtils.js` to modify dummy data generation
- Adjust engagement rate calculations
- Add new categories or post types

### Export Format
- Modify `src/components/ExportButton.js` to change Excel export format
- Add new sheets or modify existing ones
- Customize column headers and data structure

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_endpoint
REACT_APP_MAX_DATES=31
REACT_APP_DEFAULT_POSTS_PER_PAGE=10
```

### API Integration
To integrate with real API data:
1. Replace `generateDummyData()` in `src/utils/dataUtils.js`
2. Update API endpoints in components
3. Modify data structure to match your API response

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/repository-name"` to `package.json`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
4. Run `npm run deploy`

### Deploy to Netlify/Vercel
- Connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the code comments
- Review the component structure for implementation details

## 🔮 Future Enhancements

- [ ] Real-time API integration
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Automated posting integration
- [ ] Advanced scheduling algorithms
- [ ] Mobile app version
- [ ] Dark mode theme
- [ ] Multi-language support

---

**Built with ❤️ using React.js** 