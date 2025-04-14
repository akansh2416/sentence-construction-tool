
# Sentence Construction Tool

This interactive web application helps users practice constructing sentences by filling in blanks with appropriate words. The app features a timer, multiple-choice options, and a comprehensive feedback system.

## Features

- Interactive sentence construction with blank spaces
- Multiple word options for each blank
- 30-second timer per question
- Ability to unselect words by clicking on filled blanks
- Automatic advancement when time runs out
- Comprehensive results screen with feedback
- Score calculation and performance metrics

## Technical Implementation

- Built with Vite, React, and TypeScript
- Styled with Tailwind CSS and shadcn/ui components
- Responsive design for various screen sizes
- Uses JSON Server for the backend API

## Running the Application

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the JSON Server (in a separate terminal):
   ```
   npx json-server --watch db.json
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Deployment

The application can be deployed to platforms like Vercel or Netlify. Before deployment, make sure to:

1. Set up a proper API endpoint for production
2. Build the application:
   ```
   npm run build
   ```

## Acknowledgments

- Design inspiration from the provided Figma design
- Question data structure based on the provided JSON sample
