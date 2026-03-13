# 🚀 Quick Start Guide - Portfolio Admin Panel

## ✅ What's Been Created

A complete admin panel for managing your portfolio projects has been integrated into your Next.js application.

### Features Implemented:
- ✅ Secure admin authentication with Supabase
- ✅ Hidden login page at `/admin/login/`
- ✅ Dashboard with project statistics
- ✅ Create, Edit, Delete projects
- ✅ Publish/Unpublish projects
- ✅ Real-time database integration
- ✅ Responsive design with dark mode support

### Files Created:
```
├── components/admin/
│   └── AdminLayout.tsx                    # Admin panel layout
├── contexts/
│   └── AdminAuthContext.tsx               # Authentication context
├── lib/
│   └── supabase.ts                        # Supabase client configuration
├── pages/admin/
│   ├── login.tsx                          # Admin login page
│   ├── dashboard.tsx                      # Main dashboard
│   ├── project-create.tsx                 # Create new project
│   └── project-edit.tsx                   # Edit existing project
├── scripts/
│   ├── hash-password.js                   # Password hashing utility
│   └── setup-admin.js                     # Complete setup script
├── supabase/
│   └── schema.sql                         # Database schema
├── .env.local                             # Environment variables (created)
├── ADMIN_SETUP.md                         # Detailed documentation
└── QUICK_START.md                         # This file
```

## 🔧 Setup Steps (Quick)

### 1. Configure Supabase Credentials

Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=em1xYmhxcnRucnR0aG9iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTAwNjU4MCwiZXhwIjoyMDgwNTgyNTgwfQ.oIxZHe6C_9wV1kfXG9_vZAIot8EMRfbUaUtzW6-_MGg
```

**How to get these:**
1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon public** key

### 2. Set Up Database

Run this command to see the SQL statements you need:

```bash
node scripts/setup-admin.js
```

Then:
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and run the content from `supabase/schema.sql`
4. Copy and run the INSERT statement shown by the setup script

### 3. Add Your Existing Projects (Optional)

To migrate your current 3 projects to the database, run this SQL in Supabase:

```sql
INSERT INTO projects (title, description, tags, github_url, live_url, image_url, alt_text, display_order, is_published) VALUES
('E-Commerce Platform', 'A full-featured online store with product listings, cart, and checkout functionality.', ARRAY['React', 'Node.js', 'MongoDB'], '#', 'https://liogi-store.vercel.app/', '/3.png', 'E-Commerce Platform Screenshot', 1, true),
('Task Management App', 'A productivity app for managing tasks with drag-and-drop functionality.', ARRAY['Next.js', 'Firebase', 'Tailwind CSS'], '#', 'https://curriculum-control-center.vercel.app/', '/2.png', 'Task Management App Screenshot', 2, true),
('Portfolio Website', 'A modern portfolio website with animations and dark mode support.', ARRAY['React', 'Framer Motion', 'CSS'], '#', 'https://abdulhadi-portfolio1.vercel.app/', '/1.png', 'Portfolio Website Screenshot', 3, true);
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Access Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Login credentials:
   - **Email:** `preabdulhadi@gmail.com`
   - **Password:** `Fg@112233@Hadi`

## 📋 Admin Panel Routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Secure login page |
| `/admin/dashboard` | Main dashboard (protected) |
| `/admin/project-create` | Create new project form |
| `/admin/project-edit?id=...` | Edit project form |

## 🎯 How It Works

### Frontend (Your Portfolio)
- The `Projects.jsx` component now fetches data from Supabase
- Only published projects (`is_published = true`) are shown
- Projects are ordered by `display_order` field
- Loading state while fetching data

### Backend (Admin Panel)
- Secure authentication using Supabase Auth
- Service role key for server-side operations
- Row Level Security (RLS) policies protect data
- Bcrypt password hashing for security

## 🔐 Security Features

✅ **Hidden Login Page**: Only accessible via direct URL `/admin/login/`  
✅ **Password Hashing**: Bcrypt with salt rounds  
✅ **Row Level Security**: Database-level access control  
✅ **Service Role Key**: Server-side operations only  
✅ **Protected Routes**: Redirects if not authenticated  
✅ **Environment Variables**: Secrets stored securely  

## 🎨 Using the Admin Panel

### Dashboard Overview
- **Statistics Cards**: Total, Published, Unpublished projects
- **Project Table**: All projects with preview images
- **Quick Actions**: 
  - 👁️ Toggle publish status
  - ✏️ Edit project
  - 🗑️ Delete project

### Creating a Project
1. Click "Add New Project" button
2. Fill in required fields (marked with *)
3. Add technologies as comma-separated values
4. Set display order (lower = appears first)
5. Check "Publish immediately" to make visible
6. Click "Create Project"

### Editing a Project
1. Click the pencil icon (✏️) on any project
2. Modify the details
3. Click "Update Project"

### Deleting a Project
1. Click the trash icon (🗑️)
2. Confirm deletion
3. ⚠️ **Warning**: This action cannot be undone

## 🐛 Troubleshooting

### Can't Login?
- Verify admin user exists in Supabase `admin_users` table
- Check email/password in `.env.local` match what you inserted
- Ensure password is properly hashed

### Projects Not Showing?
- Check `projects` table exists in Supabase
- Verify RLS policies are enabled
- Make sure projects have `is_published = true`
- Check browser console for errors

### Images Not Displaying?
- Use relative paths (`/1.png`) for local images
- Ensure images exist in `public/` folder
- For URLs, use full HTTPS links

## 📱 Mobile Responsive

The admin panel is fully responsive and works on:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop computers

## 🌙 Dark Mode

Automatic dark mode support based on system preferences or toggle in your portfolio.

## 🔄 Next Steps

1. **Change Default Password**: After first login, consider changing the password
2. **Add More Projects**: Use the admin panel to add your work
3. **Customize**: Modify styling in the admin components
4. **Deploy**: Push to production when ready

## 📞 Support

For detailed instructions, see [`ADMIN_SETUP.md`](./ADMIN_SETUP.md)

---

**Happy Managing! 🎉**
