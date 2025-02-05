# Task Management App
This project is a task management application built using Next.js and MongoDB. It includes authentication using Auth.js with support for Google and GitHub third-party authentication.

## Features
## Authentication:
  Supports authentication via Auth.js with Google and GitHub.
Users can securely log in using their preferred method.

## Task Management:

  - Users can create, update, and delete tasks.
  - Each task includes:
      - Title
      - Description
      - Priority (high, medium, low)
      - Status (Not Started, In Process, Completed)
      - Percentage completed (0%, 25%, 50%, 75%, 100%)
## User-specific Data:
  - Tasks are fetched and managed based on the logged-in user.
Users only see tasks that belong to them, ensuring data privacy.

## Responsive Design:

  - The application is designed to be responsive, ensuring a seamless experience across different devices and screen sizes.
    
## Frontend:
  - Next.js
  - Tailwind CSS & Shadecn Ui

## Backend:
  - MongoDB
  - Auth.js for authentication

##  Acknowledgements
  - Next.js - React framework for production.
  - MongoDB - NoSQL database for storing task data.
  - Auth.js - Authentication library used for integrating Google and GitHub authentication.
  - Tailwind CSS & Shadecn UI - Used for styling components.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
