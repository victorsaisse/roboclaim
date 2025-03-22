# RoboClaim

A modern web application for extracting, processing, and analyzing data from various file types. Built with Next.js, Tailwind CSS, and a RESTful API backend.

## Features

- **File Upload and Processing**: Upload PDFs, images, CSV, and XLSX files (up to 5MB)
- **Automatic Data Extraction**: Extract data from uploaded files
- **File Management**: View, search, filter, and delete your processed files
- **User Authentication**: Secure login and registration
- **Dashboard Analytics**: View statistics about your uploaded files and processing metrics
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui
- **State Management**: Zustand, React Query
- **API Integration**: Axios, React Query
- **Authentication**: JWT-based authentication
- **Data Visualization**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/roboclaim.git
cd roboclaim
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure environment variables

```
cp .env.template .env
```

Edit the `.env` file and set your `NEXT_PUBLIC_BASE_URL` to point to your backend API server.

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Register or login to your account
2. Upload files through the dashboard
3. Wait for the system to process and extract data
4. View your files and extracted data in the Files section
5. Search, filter, and sort your processed files

## Deployment

This application can be easily deployed to Vercel:

```bash
npm run build
npm run start
```
