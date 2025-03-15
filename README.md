# MyBlocks

A streamlined platform that bridges the gap between designers and developers by providing a gallery of UI components with code access and visual previews. Visit us at [myblocks.dev](https://myblocks.dev).

## Project Overview

MyBlocks serves as a centralized hub where teams can:

- Browse and search components in a visual gallery
- Upload and share components
- Preview components in light and dark modes
- Access and copy component code
- Tag and categorize components for easy discovery

The platform solves collaboration challenges between design and development teams by creating a shared visual language and resource repository.

## Tech Stack

### Frontend
- **Next.js**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Component library built on Radix UI primitives
- **TypeScript**: For type safety

### Interactive Features
- **Sandpack**: For code display
- **React-Live**: For basic component preview rendering

### Backend & Data
- **Supabase**: Authentication, database, and storage
- **PostgreSQL**: Relational database (provided by Supabase)
- **Supabase Storage**: File storage for component assets

### Deployment
- **Vercel**: Hosting and deployment platform

# Database Architecture - MyBlocks

## Overview

MyBlocks uses a Supabase PostgreSQL database with a profile-based architecture to create a clean separation between authentication and application data. This design provides better security, maintainability, and extensibility.

## Schema Design

The database is organized around these main entities:

### Authentication & User Management

- **auth.users**: Managed by Supabase Auth - contains credentials and basic user info
- **profiles**: Bridge table connecting auth.users to application data
  - Contains user profile information (name, avatar, etc.)
  - Created automatically when a user registers

### Component Management

- **components**: Core table for UI components
  - Connected to profiles via profile_id
  - Contains main component code and metadata
  - Has privacy controls (is_public flag)
  - Tracks framework and render mode preferences
  - References the entry file for multi-file components

- **component_files**: Additional files for components
  - Allows multi-file components
  - Connected to components via component_id
  - Contains metadata about file type, language and order

- **component_dependencies**: External package dependencies
  - Tracks npm packages required by components
  - Contains version information

- **file_relationships**: Tracks dependencies between files
  - Maps import relationships
  - Enables proper bundling and visualization

### Organization

- **tags**: Reusable labels for components
  - Global tag repository shared across users

- **component_tags**: Junction table connecting components to tags
  - Allows many-to-many relationship

- **collections**: Groups of related components
  - Personal collections owned by users (via profile_id)
  - Contains metadata like name, description

- **collection_components**: Junction table for collections and components
  - Allows many-to-many relationship

## Relationship Diagram
auth.users (Supabase Auth)
↓
profiles
↙        ↘
components  collections
↙  ↓      ↘     ↓
|  |       |    |
↓  ↓       ↓    ↓
component_files  collection_components
↕     ↓           ↑
|     |           |
↓     ↓           |
file_relationships |
|
component_dependencies  component_tags
↑
tags
Copy
## Security Model

### Row-Level Security Policies

Row-level security (RLS) policies ensure:

1. Users can only see their own profiles
2. Users can see either:
   - Their own components
   - Public components shared by others
3. Users can only modify their own data
4. Tags are globally visible but components using them remain private

### Functions & Triggers

- **handle_new_user()**: Automatically creates a profile when a user registers
- **handle_profile_update()**: Synchronizes profile updates back to auth.users metadata
- **update_updated_at_column()**: Keeps last-modified timestamps current
- **update_component_entry_file()**: Updates component entry file references

## MyBlocks MVP Features

### Component Gallery
- Grid view of components with basic search functionality
- Simple filtering by tags
- Basic sorting options (newest, popular)

### Component Detail Page
- Code display with syntax highlighting
- Basic component preview
- Light/dark mode toggle
- Tag display
- Copy code functionality

### Upload Components
- Simple form-based component upload
- Basic metadata: name, description, tags
- Code input

### User Features
- Supabase authentication (sign up/login)
- Basic user profiles
- Ability to view owned components

## Development Roadmap

### Phase 1: Core Repository
- Authentication
- Component gallery
- Component detail view
- Basic component upload

### Phase 2: Enhanced Features
- Component previews
- Light/dark mode toggle
- Tagging system

### Phase 3: User Experience
- Favorites functionality
- Improved search and filtering
- Basic user profiles

## Future Enhancements (Post-MVP)
- Version history
- Interactive prop editing
- Collections and organization
- Responsive testing
- Advanced export options
- Collaboration features

## License

[MIT](https://choosealicense.com/licenses/mit/)