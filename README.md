# MyBlocks

A comprehensive platform that bridges the gap between designers and developers by providing an interactive gallery of UI components with code access, visual previews, and design specifications. Visit us at [myblocks.dev](https://myblocks.dev).

## Project Overview

MyBlocks serves as a centralized hub where teams can:

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
- **Sandpack**: For code display and light editing
- **React-Live**: For real-time component preview rendering
- **Zustand**: Lightweight state management

### Backend & Data
- **Supabase**: Authentication, database, and storage solution built on PostgreSQL
- **PostgreSQL**: Relational database for component and user data (provided by Supabase)
- **Supabase Storage**: File storage for component assets

### Deployment & Payments
- **Vercel**: Hosting and deployment platform
- **Stripe**: Payment processing and subscription management

## Database Schema

The database schema consists of the following main tables:

### components
- **id** (uuid, primary key)
- **name** (text)
- **description** (text)
- **code** (text)
- **preview_image_url** (text)
- **language** (text)
- **is_public** (boolean)
- **owner_id** (uuid, foreign key to auth.users.id)
- **created_at** (timestamptz)
- **updated_at** (timestamptz)

### tags
- **id** (uuid, primary key)
- **name** (text)
- **created_at** (timestamptz)

### component_tags (junction table)
- **id** (uuid, primary key)
- **component_id** (uuid, foreign key to components.id)
- **tag_id** (uuid, foreign key to tags.id)
- **created_at** (timestamptz)

### profiles
- **id** (uuid, primary key, linked to auth.users.id)
- **full_name** (text)
- **avatar_url** (text)
- **created_at** (timestamptz)
- **updated_at** (timestamptz)

The schema includes proper relationships:
- Components are owned by users (via owner_id → auth.users.id)
- Components can have multiple tags through the component_tags junction table
- User profiles are linked to authentication system (via id → auth.users.id)

# MyBlocks UI Design Overview

## Dashboard
The **dashboard** serves as the primary hub for navigating MyBlocks. It presents:
- A personalized welcome message and quick access to recent activity.
- A **search bar** for finding components quickly.
- An **overview panel** displaying uploaded components, version tracking, and popular collections.

## Component Gallery
The **Component Gallery** is the core of MyBlocks, providing a structured and interactive browsing experience:
- **Grid/List Views**: Users can switch between grid and list layouts for better visualization.
- **Filter & Sort Panel**: Filter by categories, tags, component types, or design frameworks.
- **Hover Previews**: Quick hover-based previews allow users to see component details without clicking.
- **Quick Actions**: Save to favorites, add to collections, or copy code directly.

## Component Detail Page
Each component has a dedicated **detail page**, offering:
- **Live Preview**: Real-time rendering of the component using React-Live.
- **Props Customization**: Interactive UI for tweaking component props.
- **Code View**: Displays the component's JSX/TSX with syntax highlighting.
- **Version History**: Access previous versions with changelogs.
- **Design Specs**: View typography, color palettes, spacing, and usage guidelines.
- **Export Options**: Download component files, copy styles, or get installation instructions.

## Upload & Manage Components
Users can upload and manage their UI components with:
- **Drag-and-Drop Uploader**: Simplifies adding new components.
- **Metadata Form**: Allows tagging, descriptions, and categorization.
- **Version Control**: Track changes and maintain different versions.
- **Access Control**: Set visibility (public, private, team-only).

## Theming & Preview Modes
MyBlocks supports various **theming and preview modes** to simulate real-world usage:
- **Light/Dark Mode Toggle**: Switch between themes dynamically.
- **Responsive Testing**: Preview components across different screen sizes.
- **Frame Simulation**: Mock component usage in different application layouts.

## User Account & Subscription Management
- **Profile Dashboard**: View saved components, collections, and account settings.
- **Subscription Management**: Upgrade plans, track usage limits, and manage billing (via Stripe).
- **Favorites & Collections**: Save and organize favorite components into collections.

## Additional Features
- **Collaboration Tools**: Commenting and sharing options for teams.
- **API Access**: Generate API keys for integrating components into external projects.
- **Accessibility Insights**: Automated checks for WCAG compliance.

This UI ensures a smooth, feature-rich experience for both designers and developers, making MyBlocks a powerful bridge between design and code.

### User Management
- Basic Accounts
- Favorites
- Usage Limits
- Subscription Management

## License

[MIT](https://choosealicense.com/licenses/mit/)