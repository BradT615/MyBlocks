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

## Database Architecture - MyBlocks

## Overview

MyBlocks uses a Supabase PostgreSQL database with a profile-based architecture to create a clean separation between authentication and application data. This design provides better security, maintainability, and extensibility.

## Schema Design

The database is organized around these main entities:

### Authentication & User Management

- **auth.users**: Managed by Supabase Auth - contains credentials and basic user info
- **profiles**: Bridge table connecting auth.users to application data
  - Contains user profile information (name, avatar, etc.)
  - Created automatically when a user registers via a database trigger

### Automatic Profile Creation

When a new user signs up, a database trigger automatically creates a corresponding profile record:

```sql
-- Function to create a profile when a new user signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, created_at, updated_at)
  values (
    new.id, 
    new.raw_user_meta_data ->> 'full_name', 
    new.raw_user_meta_data ->> 'avatar_url',
    now(),
    now()
  );
  return new;
end;
$$;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

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

## Enhanced Component System Implementation Checklist

### 1. Database Setup
- [x] Run SQL script to add framework and entry_file columns
- [x] Create component_dependencies table
- [x] Add new columns to component_files table
- [x] Create file_relationships table
- [x] Add entry file foreign key constraint
- [x] Create update trigger function
- [x] Configure Row Level Security on new tables
- [x] Verify all tables and relationships

### 2. Backend API Updates
- [x] Update component fetch API to include related files
- [x] Update component fetch API to include dependencies
- [x] Create API endpoint for fetching component dependencies
- [x] Create API endpoint for managing file relationships
- [ ] Update component creation to handle entry file designation
- [ ] Update error handling for multi-file components

### 3. Component Upload UI Enhancements
- [ ] Add framework selection dropdown to upload form
- [ ] Add render mode selection to upload form
- [ ] Enhance file upload to support multiple files
- [ ] Add UI for designating entry file
- [ ] Create file ordering interface
- [ ] Add file type selection for each uploaded file

### 4. Dependency Management UI
- [ ] Create dependency search/selection interface
- [ ] Add UI for specifying package versions
- [ ] Create visual indicator for selected dependencies
- [ ] Add dependency removal functionality
- [ ] Implement dependency validation

### 5. File Relationship UI
- [ ] Create UI for visualizing file relationships
- [ ] Add interface for defining import paths
- [ ] Implement auto-detection of imports from code
- [ ] Add validation for circular dependencies
- [ ] Create visual feedback for relationship status

### 6. Enhanced Renderer Setup
- [ ] Install and configure Sandpack
- [ ] Create basic file bundling logic
- [ ] Set up dependency injection system
- [ ] Implement framework-specific rendering options
- [ ] Create fallback rendering for unsupported cases

### 7. Component Detail Page Updates
- [ ] Update page to handle multi-file components
- [ ] Create tabbed interface for multiple files
- [ ] Display dependencies section
- [ ] Enhance preview with framework-specific options
- [ ] Add file relationship visualization

### 8. Testing and Deployment
- [ ] Test creating single-file components
- [ ] Test creating multi-file components
- [ ] Test component with external dependencies
- [ ] Test file relationship functionality
- [ ] Test rendering in different frameworks
- [ ] Deploy updated system

## Future Enhancements (Post-MVP)
- Version history
- Interactive prop editing
- Collections and organization
- Responsive testing
- Advanced export options
- Collaboration features

## License

[MIT](https://choosealicense.com/licenses/mit/)