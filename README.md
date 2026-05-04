<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/611569bf-7351-4226-9fe6-2fa92d6ae839

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

🏆 Sportify – AI Powered Sports Management Platform

Sportify is an advanced AI-powered sports management web application built to simplify team coordination, event scheduling, player management, and performance tracking.
The platform leverages modern web technologies along with Gemini AI integration to deliver intelligent insights and an interactive user experience for sports enthusiasts, coaches, and organizers.

This repository contains the complete source code required to run the application locally and deploy it seamlessly.

🚀 Live Application

You can view the deployed application directly on AI Studio:

🔗 AI Studio App Link:
https://ai.studio/apps/611569bf-7351-4226-9fe6-2fa92d6ae839

✨ Features
🧠 AI Integration using Gemini API
Smart suggestions
Automated sports insights
Intelligent content assistance
👥 Player & Team Management
Add/manage players
Team creation and organization
Role assignment
📅 Event Scheduling
Match planning
Practice sessions
Tournament management
📊 Performance Tracking Dashboard
Statistics monitoring
Progress reports
Team performance analytics
🎨 Modern Responsive UI
Mobile friendly
Interactive user interface
Smooth navigation
🛠️ Tech Stack Used
Technology	Purpose
React / Next.js	Frontend Framework
Node.js	Runtime Environment
Gemini API	AI Functionality
Tailwind CSS / CSS	Styling
AI Studio	Deployment Platform
📂 Project Structure
Sportify/
│── public/              # Static assets
│── src/                 # Main source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages/routes
│   ├── utils/           # Helper functions
│   └── styles/          # CSS files
│── .env.local           # Environment variables
│── package.json         # Dependencies and scripts
│── README.md            # Documentation
💻 Run Project Locally

Follow these steps to set up the project on your local machine.

1️⃣ Prerequisites

Make sure the following software is installed:

Node.js
npm (comes with Node.js)
2️⃣ Clone the Repository
git clone <your-repository-url>
cd Sportify
3️⃣ Install Dependencies

Run the following command to install all required packages:

npm install
4️⃣ Configure Environment Variables

Create a file named:

.env.local

Inside that file, add your Gemini API key:

GEMINI_API_KEY=your_gemini_api_key_here

Make sure you generate a valid Gemini API key before running the application.

5️⃣ Start Development Server

Run the application locally using:

npm run dev
6️⃣ Open in Browser

After the server starts successfully, open:

http://localhost:3000

You will now be able to access the Sportify application on your local system.

🌐 Deployment

This application is fully compatible with AI Studio deployment.

To deploy:

Push code to repository
Connect project with AI Studio
Add environment variables
Deploy instantly
🔐 Environment Variables Required
Variable Name	Description
GEMINI_API_KEY	API key used for Gemini AI services
📌 Important Notes
Ensure Node.js is installed before starting.
Internet connection is required for Gemini AI features.
Keep your API key private and never expose it publicly.
🤝 Contribution

Contributions, feature suggestions, and improvements are always welcome.
Feel free to fork this repository and submit pull requests.

📄 License

This project is developed for educational and innovation purposes.
