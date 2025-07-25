# YouTube Content Roadmap

A website that provides transparency to your YouTube audience by showing the progress of upcoming videos. Each video has a detailed progress tracking system that shows the current stage of development.

## Features

- **Video Progress Tracking**: Track the progress of videos across multiple stages (Resource Gathering, Content Development, Recording, Editing, Finalizing).
- **Responsive Design**: Fully responsive design that works well on mobile, tablet, and desktop devices.
- **Dark/Light Mode**: Toggle between dark and light themes based on user preference.

## Progress Stages

Each video goes through the following stages:

1. **Resource Gathering**: Collecting research materials, references, and planning the content.
2. **Developing Content**: Creating scripts, outlines, and organizing the video structure.
3. **Video Recording**: Recording the actual video footage.
4. **Video Editing**: Editing the video, adding effects, transitions, and sound.
5. **Finalizing Edits**: Final review, making last-minute adjustments, and preparing for upload.

## Tech Stack

- React
- React Router
- Tailwind CSS
- Framer Motion for animations
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/balupeddireddy08/Youtube_Status_Website.git
   cd Youtube_Status_Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Updating Video Data

To update video information and progress, modify the `videoData` array in `src/services/videoService.js`. Each video follows this structure:

```javascript
{
  id: 1,
  title: "Video Title",
  description: "Video description...",
  expectedReleaseDate: "June 15, 2024",
  thumbnail: null, // or URL to thumbnail image
  progress: [
    { id: 'resource', completed: true, percentage: 100 },
    { id: 'content', completed: false, percentage: 60 },
    { id: 'recording', completed: false, percentage: 0 },
    { id: 'editing', completed: false, percentage: 0 },
    { id: 'finalizing', completed: false, percentage: 0 }
  ]
}
```

After updating the data, rebuild and redeploy the site.

## Deployment

To build for production:

```bash
npm run build
```

This will generate a `dist` folder with the production-ready files.

For GitHub Pages deployment:

```bash
npm run deploy
```

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Peddi Reddy Bala Gopal Reddy's YouTube Channel](https://www.youtube.com/@PEDDIREDDYBALAGOPALREDDY)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
