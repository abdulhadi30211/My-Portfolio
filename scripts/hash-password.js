const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function hashPassword() {
  const password = process.env.ADMIN_PASSWORD || 'Fg@112233@Hadi';
  const saltRounds = 10;
  
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('\n==========================================');
    console.log('Hashed Password for Admin User');
    console.log('==========================================');
    console.log(`Email: ${process.env.ADMIN_EMAIL || 'preabdulhadi@gmail.com'}`);
    console.log(`Original Password: ${password}`);
    console.log(`Hashed Password: ${hashedPassword}`);
    console.log('==========================================\n');
    console.log('IMPORTANT: Use this hashed password in your Supabase database:');
    console.log(`INSERT INTO admin_users (email, password_hash) VALUES ('${process.env.ADMIN_EMAIL || 'preabdulhadi@gmail.com'}', '${hashedPassword}');`);
    console.log('\nOr update the existing user:');
    console.log(`UPDATE admin_users SET password_hash = '${hashedPassword}' WHERE email = '${process.env.ADMIN_EMAIL || 'preabdulhadi@gmail.com'}';`);
    console.log('==========================================\n');
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

hashPassword();
