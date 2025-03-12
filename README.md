# MyBlocks

A streamlined platform that bridges the gap between designers and developers by providing a gallery of UI components with code access and visual previews. Visit us at [myblocks.dev](https://myblocks.dev).

## Project Overview

MyBlocks serves as a centralized hub where teams can:

- Browse and search components in a visual gallery
- Upload and share components with comprehensive dependency management
- Preview components in light and dark modes with live rendering
- Access and copy component code across multiple languages and frameworks
- Tag and categorize components for easy discovery
- Support complex multi-file components with proper file relationships

The platform solves collaboration challenges between design and development teams by creating a shared visual language and resource repository.

## Tech Stack

### Frontend
- **Next.js**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Component library built on Radix UI primitives
- **TypeScript**: For type safety

### Interactive Features
- **Sandpack**: For robust code rendering with dependency support
- **WebContainers**: For advanced component preview capabilities
- **Babel/TypeScript**: For code transpilation and transformation

### Backend & Data
- **Supabase**: Authentication, database, and storage
- **PostgreSQL**: Relational database with enhanced schema for component relationships
- **Supabase Storage**: File storage for component assets

### Deployment
- **Vercel**: Hosting and deployment platform

# Database Architecture - MyBlocks

## Overview

MyBlocks uses a Supabase PostgreSQL database with a profile-based architecture and an enhanced component system to support complex UI components with proper dependency management.

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
  - Contains main component metadata
  - Has privacy controls (is_public flag)
  - Tracks framework and render mode preferences
  - References the entry file for multi-file components

- **component_files**: Files that make up components
  - Supports multi-file components with proper relationships
  - Contains code, language, and file type information
  - Tracks which file is the entry point for the component

- **component_dependencies**: External package dependencies
  - Tracks npm packages and their versions
  - Associates dependencies with specific components
  - Supports proper rendering with third-party libraries

- **file_relationships**: Tracks relationships between files
  - Maps import statements between component files
  - Enables proper bundling and visualization of component structure

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

## Security Model

### Row-Level Security Policies

Row-level security (RLS) policies ensure:

1. Users can only see their own profiles
2. Users can see either:
   - Their own components
   - Public components shared by others
3. Users can only modify their own data
4. Tags are globally visible but components using them remain private

## Component Rendering System

The enhanced component system supports:

1. **Multi-file Components**: Components can consist of multiple related files with proper dependencies
2. **Third-party Dependencies**: Components can specify external npm packages they depend on
3. **Framework Flexibility**: Support for React, Vue, and other frameworks
4. **Language Support**: TypeScript, JavaScript, CSS, SCSS and more
5. **Sandboxed Execution**: Components render in isolated environments for safety and reliability

## Implementation Notes

### Component Upload Flow

1. User defines component metadata and dependencies
2. Files are uploaded with proper relationships
3. Entry file is specified for the component
4. External dependencies are registered
5. Component is stored with all necessary information for rendering

### Component Rendering Flow

1. Component and its files are retrieved from the database
2. Files are organized based on relationships
3. Dependencies are resolved
4. Component is rendered in a sandboxed environment
5. Live preview is generated with proper styling

### Query Pattern Examples

```sql
-- Get component with all its files and dependencies
SELECT 
  c.*,
  json_agg(DISTINCT cf.*) as files,
  json_agg(DISTINCT cd.*) as dependencies
FROM components c
LEFT JOIN component_files cf ON c.id = cf.component_id
LEFT JOIN component_dependencies cd ON c.id = cd.component_id
WHERE c.id = 'component-id'
GROUP BY c.id;

-- Get component entry file
SELECT cf.*
FROM component_files cf
JOIN components c ON cf.id = c.entry_file_id
WHERE c.id = 'component-id';

-- Get file relationships for a component
SELECT 
  fr.*,
  source.filename as source_filename,
  target.filename as target_filename
FROM file_relationships fr
JOIN component_files source ON fr.source_file_id = source.id
JOIN component_files target ON fr.target_file_id = target.id
WHERE source.component_id = 'component-id';

MyBlocks MVP Features
Component Gallery

Grid view of components with advanced search functionality
Filtering by tags, framework, and dependencies
Sorting options (newest, popular, complexity)

Component Detail Page

Code display with syntax highlighting for all component files
Live component preview with dependency support
Light/dark mode toggle and responsive testing
Tag and dependency display
Copy code functionality for individual files or entire component

Upload Components

Multi-file component upload
Dependency selection
Framework and language configuration
File relationship management

User Features

Supabase authentication (sign up/login)
User profiles with component statistics
Ability to view, edit, and manage owned components

Development Roadmap
Phase 1: Enhanced Schema & Backend

Implement new database schema
Create APIs for dependency management
Build file relationship tracking

Phase 2: Improved Component Renderer

Implement Sandpack integration
Support multiple files in preview
Add dependency resolution

Phase 3: Advanced Upload Interface

Create multi-file upload experience
Add dependency selection interface
Implement file relationship visualization

Phase 4: Framework & Language Support

Expand language support with proper code highlighting
Add framework-specific rendering capabilities
Implement specialized preview modes

Future Enhancements

Version history with visual diffs
Interactive prop editing
Component screenshots and thumbnails
Team collaboration features
Component analytics

License
MIT