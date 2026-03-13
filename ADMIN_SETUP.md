# Portfolio Admin Panel Setup Guide

## Overview
This admin panel allows you to manage your portfolio projects directly through a secure interface connected to Supabase.

## Features
- 🔐 Secure admin login with authentication
- 📊 Dashboard with project statistics
- ➕ Create new projects
- ✏️ Edit existing projects
- 🗑️ Delete projects
- 👁️ Toggle project visibility (publish/unpublish)
- 🎨 Modern, responsive UI
- 🌙 Dark mode support

## Prerequisites
1. A Supabase account and project
2. Node.js installed on your system

## Setup Instructions

### Step 1: Configure Environment Variables

Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=em1xYmhxcnRucnR0aG9iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTAwNjU4MCwiZXhwIjoyMDgwNTgyNTgwfQ.oIxZHe6C_9wV1kfXG9_vZAIot8EMRfbUaUtzW6-_MGg
ADMIN_EMAIL=preabdulhadi@gmail.com
ADMIN_PASSWORD=Fg@112233@Hadi
```

**Important:** Replace `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your actual Supabase project credentials.

### Step 2: Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL schema from `supabase/schema.sql` file

The schema will create:
- `admin_users` table for storing admin credentials
- `projects` table for storing project data
- Proper Row Level Security policies
- Indexes for performance

### Step 3: Generate Password Hash

For security, passwords must be hashed before storing in the database. Run:

```bash
node scripts/hash-password.js
```

This will output a hashed password. Copy the INSERT or UPDATE SQL statement provided.

### Step 4: Insert Admin User into Database

1. Go to Supabase SQL Editor
2. Paste the SQL statement from Step 3 (with the hashed password)
3. Execute the query

Example:
```sql
INSERT INTO admin_users (email, password_hash) 
VALUES ('preabdulhadi@gmail.com', '$2a$10$YourHashedPasswordHere')
ON CONFLICT (email) DO NOTHING;
```

### Step 5: Initialize Default Projects (Optional)

You can add your existing projects to the database using this SQL:

```sql
INSERT INTO projects (title, description, tags, github_url, live_url, image_url, alt_text, display_order, is_published) VALUES
('E-Commerce Platform', 'A full-featured online store with product listings, cart, and checkout functionality.', ARRAY['React', 'Node.js', 'MongoDB'], '#', 'https://liogi-store.vercel.app/', '/3.png', 'E-Commerce Platform Screenshot', 1, true),
('Task Management App', 'A productivity app for managing tasks with drag-and-drop functionality.', ARRAY['Next.js', 'Firebase', 'Tailwind CSS'], '#', 'https://curriculum-control-center.vercel.app/', '/2.png', 'Task Management App Screenshot', 2, true),
('Portfolio Website', 'A modern portfolio website with animations and dark mode support.', ARRAY['React', 'Framer Motion', 'CSS'], '#', 'https://abdulhadi-portfolio1.vercel.app/', '/1.png', 'Portfolio Website Screenshot', 3, true);
```

### Step 6: Start the Development Server

```bash
npm run dev
```

## Accessing the Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Login with:
   - **Email:** preabdulhadi@gmail.com
   - **Password:** Fg@112233@Hadi

## Admin Panel Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard (redirects to login if not authenticated)
- `/admin/project-create` - Create new project
- `/admin/project-edit?id=<project_id>` - Edit existing project

## Using the Admin Panel

### Dashboard
- View all projects in a table format
- See project preview images
- Quick actions: publish/unpublish, edit, delete
- Statistics cards showing total, published, and unpublished projects

### Create Project
1. Click "Add New Project" button
2. Fill in the form:
   - Title (required)
   - Description (required)
   - Technologies/Skills (comma-separated, required)
   - GitHub URL (optional)
   - Live Demo URL (optional)
   - Image URL (required)
   - Alt Text (optional, defaults to title)
   - Display Order (optional, lower numbers appear first)
   - Check "Publish this project immediately" to make it visible
3. Click "Create Project"

### Edit Project
1. Click the edit icon (pencil) on any project in the dashboard
2. Modify the fields you want to change
3. Click "Update Project"

### Delete Project
1. Click the delete icon (trash) on any project
2. Confirm the deletion

### Publish/Unpublish
- Click the eye icon to toggle project visibility
- Published projects are visible on the main portfolio site
- Unpublished projects are hidden from public view

## Security Notes

- The admin panel uses Supabase Authentication
- Passwords are hashed using bcrypt before storage
- Row Level Security (RLS) policies protect your data
- The service role key should be kept secret (only used server-side)
- Never commit `.env.local` to version control

## Troubleshooting

### Cannot login
- Verify the admin user exists in Supabase database
- Check that the password hash is correct
- Ensure Supabase URL and keys are correct in `.env.local`

### Projects not loading
- Check that the `projects` table exists in Supabase
- Verify RLS policies are set up correctly
- Check browser console for errors

### Images not displaying
- Ensure image URLs are correct (can be relative paths like `/1.png` or full URLs)
- Check that images exist in the `public` folder if using relative paths

## Production Deployment

Before deploying to production:

1. Update Supabase credentials for production environment
2. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
3. Ensure the database schema is set up in production Supabase
4. Consider adding additional security measures (rate limiting, IP whitelisting, etc.)

## Support

If you encounter any issues, check the browser console and server logs for error messages.
