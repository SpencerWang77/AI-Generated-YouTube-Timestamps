# AI Timestamp Generator

Welcome to Spencer's first software project! This is a web application that generates AI-powered timestamps for YouTube videos using React and Firebase.

## 🎯 Overview

The AI Timestamp Generator is a React-based web application that allows users to input a YouTube video URL and automatically generate intelligent timestamps using the Bumpups API. The app features a clean, modern UI with video playback, clickable timestamps, and a history feature to save and reload previous timestamp generations.

<img width="1440" height="779" alt="image" src="https://github.com/user-attachments/assets/7ee7c642-8179-49e5-b77f-bafa138ddcb7" />
<img width="1440" height="779" alt="image" src="https://github.com/user-attachments/assets/bd3ffc75-6c2c-4ee5-ae1e-96a4ad96d883" />

## ✨ Features

- **YouTube Video Integration**: Enter any YouTube video URL and fetch video metadata
- **AI-Powered Timestamps**: Generate intelligent timestamps using the Bumpups API
- **Interactive Video Player**: Embedded YouTube player with clickable timestamps that jump to specific moments
- **History Management**: Automatically saves timestamp generations to localStorage (up to 50 items)
- **Responsive Design**: Modern UI with FontAwesome icons and smooth user experience
- **Firebase Integration**: Backend powered by Firebase Cloud Functions for secure API calls

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0
- **React DOM** 19.2.0
- **FontAwesome** - Icons and UI elements
- **Firebase SDK** - Analytics and Functions integration

### Backend
- **Firebase Cloud Functions** (Python 3.12)
- **Bumpups API** - AI timestamp generation
- **YouTube Data API v3** - Video metadata

### Deployment
- **Firebase Hosting** - Frontend hosting
- **Firebase Functions** - Backend serverless functions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Python** 3.12
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Firebase account** with a project set up

## 🚀 Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd my-react-app
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase Functions**:
   ```bash
   cd functions
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cd ..
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
REACT_APP_API_KEY=your_firebase_api_key
REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_APP_ID=your_app_id
REACT_APP_MEASUREMENT_ID=your_measurement_id

# YouTube Data API
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
```

Create a `.env` file in the `functions/` directory:

```env
# Bumpups API Key
BUMPUPS_API_KEY=your_bumpups_api_key
```

### Firebase Setup

1. **Initialize Firebase** (if not already done):
   ```bash
   firebase login
   firebase init
   ```

2. **Configure Firebase project**:
   - Select your Firebase project
   - Enable Hosting and Functions
   - Follow the prompts to complete setup

## 🎮 Usage

### Development Mode

1. **Start the React development server**:
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

2. **Run Firebase Functions locally** (optional, for testing):
   ```bash
   cd functions
   source venv/bin/activate
   firebase emulators:start --only functions
   ```

### Using the App

1. **Enter a YouTube URL**: Paste a YouTube video URL in the input field
2. **Generate Video Info**: Click "Generate" to fetch video metadata and display the video player
3. **Generate Timestamps**: Click "Generate Timestamps" to create AI-powered timestamps
4. **Navigate Timestamps**: Click on any timestamp to jump to that moment in the video
5. **View History**: Access previously generated timestamps from the History section

## 📁 Project Structure

```
my-react-app/
├── public/                 # Static assets
├── src/
│   ├── unAuth/
│   │   ├── components/     # React components
│   │   │   ├── Bumpups.js  # Bumpups component
│   │   │   ├── Footer.js   # Footer component
│   │   │   ├── History.js  # History management
│   │   │   ├── NavBar.js   # Navigation bar
│   │   │   ├── results.js  # Timestamp results display
│   │   │   └── Timestamp.js # Main timestamp generator
│   │   ├── LandingPage.js  # Main landing page
│   │   └── LandingPage.css
│   ├── App.js             # Root component
│   ├── firebase.js        # Firebase configuration
│   └── index.js           # Entry point
├── functions/
│   ├── main.py            # Firebase Cloud Functions
│   ├── requirements.txt   # Python dependencies
│   └── venv/              # Python virtual environment
├── firebase.json          # Firebase configuration
└── package.json          # Node.js dependencies
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🏗️ Building for Production

Create an optimized production build:
```bash
npm run build
```

The build folder will contain the production-ready files.

## 🚢 Deployment

### Deploy to Firebase

1. **Build the React app**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

   Or deploy separately:
   ```bash
   firebase deploy --only hosting    # Deploy frontend
   firebase deploy --only functions  # Deploy backend functions
   ```

### Environment Variables in Firebase

For production, set environment variables in Firebase Functions:

```bash
firebase functions:config:set bumpups.api_key="your_api_key"
```

Or use the newer method with `.env` files (recommended for Python functions).

## 📝 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🔧 Troubleshooting

### Common Issues

1. **Firebase Functions not available**: Ensure Firebase is properly initialized and your `.env` file is configured
2. **YouTube API errors**: Verify your `REACT_APP_YOUTUBE_API_KEY` is valid and has the YouTube Data API v3 enabled
3. **Bumpups API errors**: Check that `BUMPUPS_API_KEY` is set correctly in the functions `.env` file
4. **LocalStorage issues**: The app uses localStorage for history - ensure your browser allows it

## 📄 License

This project is private and personal.

## 👤 Author

**Spencer Wang**

---

Built with ❤️ using React and Firebase
