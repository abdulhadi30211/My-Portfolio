const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function setupAdmin() {
  const email = process.env.ADMIN_EMAIL || 'preabdulhadi@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'Fg@112233@Hadi';
  const saltRounds = 10;
  
  try {
    console.log('\n==========================================');
    console.log('🔐 Portfolio Admin Panel Setup');
    console.log('==========================================\n');
    
    console.log('Step 1: Generating secure password hash...');
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('✓ Password hashed successfully\n');
    
    console.log('Step 2: Database Setup Instructions\n');
    console.log('Go to your Supabase project dashboard and navigate to SQL Editor.\n');
    console.log('Copy and execute the following SQL statements:\n');
    console.log('------------------------------------------');
    console.log('-- Create tables and policies');
    console.log('-- (Run the content of supabase/schema.sql first)\n');
    console.log('-- Insert admin user with hashed password');
    console.log(`INSERT INTO admin_users (email, password_hash) 
VALUES ('${email}', '${hashedPassword}')
ON CONFLICT (email) DO NOTHING;\n`);
    console.log('------------------------------------------\n');
    
    console.log('Step 3: Environment Variables\n');
    console.log('Make sure your .env.local file contains:\n');
    console.log(`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url`);
    console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key`);
    console.log(`SUPABASE_SERVICE_ROLE_KEY=${process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_service_role_key'}`);
    console.log(`ADMIN_EMAIL=${email}`);
    console.log(`ADMIN_PASSWORD=${password}\n`);
    
    console.log('Step 4: Access Admin Panel\n');
    console.log('After setting up the database:');
    console.log('1. Run: npm run dev');
    console.log('2. Navigate to: http://localhost:3000/admin/login');
    console.log(`3. Login with:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);
    
    console.log('==========================================');
    console.log('✅ Setup Complete!');
    console.log('==========================================\n');
    
    console.log('📝 IMPORTANT NOTES:');
    console.log('- Never commit .env.local to version control');
    console.log('- Keep your SUPABASE_SERVICE_ROLE_KEY secret');
    console.log('- Change the default password after first login');
    console.log('- See ADMIN_SETUP.md for detailed instructions\n');
    
  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    process.exit(1);
  }
}

setupAdmin();
