# UI Component Library

A comprehensive platform that bridges the gap between designers and developers by providing an interactive gallery of UI components with code access, visual previews, and design specifications.

## Project Overview

This UI Component Library serves as a centralized hub where teams can:

- Browse, search, and filter components in a visual gallery
- Upload and manage components with version tracking
- Preview components in different viewport sizes and themes
- Access and export component code with customizable props
- View design specifications including colors, typography, and spacing

The platform is designed to solve collaboration challenges between design and development teams by creating a shared visual language and resource repository.

## Tech Stack

### Frontend
- **Next.js**: React framework with App Router for server components and routing
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **Shadcn/UI**: Component library built on Radix UI primitives
- **TypeScript**: For type safety and improved developer experience

### Interactive Features
- **CodeMirror**: For code display and light editing
- **React-Live**: For real-time component preview rendering
- **Zustand**: Lightweight state management

### Backend & Data
- **Supabase**: Authentication, database, and storage solution built on PostgreSQL
- **Prisma**: Type-safe ORM for database interactions
- **PostgreSQL**: Relational database for component and user data (provided by Supabase)
- **Supabase Storage**: File storage for component assets

### Component Analysis
- **Babel**: For parsing React components
- **TypeScript Compiler API**: For analyzing component types and props
- **PostCSS**: For CSS analysis and transformation

### Deployment & Payments
- **Vercel/Netlify**: Hosting and deployment platform
- **GitHub Actions**: CI/CD pipeline
- **Stripe**: Payment processing and subscription management

## Getting Started

First, run the development server:

```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### Core Organization
- Visual Component Gallery
- Basic Search & Filter
- Simple Collections

### Component Management
- Component Upload
- Basic Metadata
- Version Tracking

### Visual Experience
- Interactive Preview
- Responsive View
- Light/Dark Mode Preview

### Developer Essentials
- Code View
- Basic Props Control
- Export Options

### Designer Essentials
- Visual Specs Panel
- Style Information
- Screenshot/Export

### User Management
- Basic Accounts
- Favorites
- Usage Limits
- Subscription Management

## License

[MIT](https://choosealicense.com/licenses/mit/)