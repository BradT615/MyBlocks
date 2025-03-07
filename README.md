# MyBlocks MVP

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

## Database Schema

The simplified database schema consists of the following main tables:

### components
- **id** (uuid, primary key)
- **name** (text)
- **description** (text)
- **code** (text)
- **language** (text)
- **is_public** (boolean)
- **owner_id** (uuid, foreign key to auth.users.id)
- **created_at** (timestamptz)

### tags
- **id** (uuid, primary key)
- **name** (text, unique)

### component_tags (junction table)
- **component_id** (uuid, foreign key to components.id)
- **tag_id** (uuid, foreign key to tags.id)
- **primary key** (component_id, tag_id)

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
- Multiple files per component
- Interactive prop editing
- Collections and organization
- Responsive testing
- Advanced export options
- Collaboration features

## License

[MIT](https://choosealicense.com/licenses/mit/)