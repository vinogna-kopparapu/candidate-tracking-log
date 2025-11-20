Job Application Tracker
Project Overview
Job Application Tracker is a comprehensive web application designed to help job seekers manage and organize their job application process efficiently. The application provides a user-friendly interface to track job applications from initial submission through various stages of the hiring process.
Key Features

User Authentication: Secure login system with authorization checks
Application Management:

Add, update, and delete job applications
Track application status across multiple stages


Comprehensive Tracking:

Record detailed information for each application
Monitor application progress


Responsive Design: User-friendly interface for easy job application management

Technologies Used
Frontend

React (Vite SPA)
Vanilla JavaScript
HTML5
CSS3

Backend

Node.js
Express.js
RESTful API services

Application Stages
The application supports multiple job application stages:

Applied
Interview
OfferAccepted
Rejected

Installation and Setup
Prerequisites

Node.js (latest stable version)
npm

Installation Steps

Clone the repository
Navigate to the project directory
Run npm install
Run npm run build
Start the application with npm start

Authentication
The application includes a simple authentication system:

Users must log in before accessing application features
Certain usernames (e.g., "dog") are deliberately blocked
No password checking is implemented

RESTful Services
The backend provides RESTful services with:

Multiple HTTP methods (GET, POST, PUT, DELETE)
Authorization checks
Input validation and sanitization

Security Considerations

Input sanitization to prevent XSS attacks
Authorization token/session management
No sensitive password storage


Additional Notes

The application does not use routing libraries
State management is handled through React's built-in state management
The application is designed to be intuitive and easy to use

