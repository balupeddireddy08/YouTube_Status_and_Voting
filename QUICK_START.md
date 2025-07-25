# Quick Start Guide: YouTube Content Roadmap

This guide provides a quick overview of the project structure and how to maintain the YouTube Content Roadmap website.

## Project Structure

- `src/`: Contains all the source code
  - `components/`: Reusable UI components
    - `Navbar.jsx`: Navigation bar component
    - `ThemeToggle.jsx`: Dark/light mode toggle
    - `UpcomingVideo.jsx`: Individual video card with progress tracking
    - `UpcomingVideos.jsx`: Container component for all video cards
  - `pages/`: Page components
    - `Home.jsx`: Main landing page
    - `NotFound.jsx`: 404 page
  - `services/`: Business logic and data handling
    - `videoService.js`: Handles video data operations and persistence
  - `App.jsx`: Main application component with routing
  - `main.jsx`: Application entry point

## Data Structure

Each video object has the following structure:

```javascript
{
  id: 1,
  title: "Video Title",
  description: "Video description...",
  expectedReleaseDate: "June 15, 2024",
  thumbnail: "url-to-thumbnail" || null,
  progress: [
    { id: 'resource', completed: true, percentage: 100 },
    { id: 'content', completed: true, percentage: 100 },
    { id: 'recording', completed: false, percentage: 50 },
    { id: 'editing', completed: false, percentage: 0 },
    { id: 'finalizing', completed: false, percentage: 0 }
  ]
}
```

## Updating Video Data

To update the videos or their progress:

1. Open `src/services/videoService.js`
2. Modify the `videoData` array at the top of the file
3. For each video you want to update:
   - Update the title, description, or expectedReleaseDate as needed
   - Update progress by changing the `completed` and `percentage` values
   - Set `completed: true` when a step is 100% complete

Example of updating progress:

```javascript
// To mark "Video Recording" as 75% complete:
{ id: 'recording', completed: false, percentage: 75 }

// To mark "Video Recording" as complete:
{ id: 'recording', completed: true, percentage: 100 }
```

4. Save the file
5. Rebuild and redeploy the site with `npm run build` and `npm run deploy`

## Adding a New Video

To add a new video:

1. Open `src/services/videoService.js`
2. Add a new object to the `videoData` array with a unique ID
3. Make sure to include all required fields (id, title, description, expectedReleaseDate, progress)

Example:

```javascript
{
  id: 6, // Make sure this is unique
  title: "Your New Video Title",
  description: "Description of your new video",
  expectedReleaseDate: "August 1, 2024",
  thumbnail: null,
  progress: [
    { id: 'resource', completed: false, percentage: 20 },
    { id: 'content', completed: false, percentage: 0 },
    { id: 'recording', completed: false, percentage: 0 },
    { id: 'editing', completed: false, percentage: 0 },
    { id: 'finalizing', completed: false, percentage: 0 }
  ]
}
```

## Adding Video Thumbnails

Videos can have thumbnails by updating the `thumbnail` field of a video object. If no thumbnail is provided, a default YouTube icon will be displayed.

To add a YouTube thumbnail:
```javascript
thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg"
```

## Local Storage Behavior

The application uses local storage to remember video data between visits. When first loaded, it populates local storage with the default data from `videoService.js`.

If you need to force all users to see the latest data (after you've updated `videoService.js`), you can add a version field to the local storage key:

```javascript
// Change this in src/services/videoService.js
const STORAGE_KEY = 'youtube_videos_progress_v2'; // Increment version number
```

## Deployment

### Build for Production:

```bash
npm run build
```

This will create a `dist` folder with production-ready assets.

### Deploy to GitHub Pages:

```bash
npm run deploy
```

### For GitHub Pages custom domain:

If you're using a custom domain with GitHub Pages:

1. Create a `CNAME` file in the `public` folder with your domain
2. Make sure your domain's DNS settings point to GitHub Pages

## Development Tips

- Use `npm run dev` to start the development server
- The application is built with React 18 and uses React hooks extensively
- Animations are handled by Framer Motion
- For styling, the project uses Tailwind CSS 