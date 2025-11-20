# Gmail App Password Setup Guide

To enable the contact form to send emails to your Gmail account (jjl1089@gmail.com), you need to create a Gmail App Password.

## Steps to Create Gmail App Password:

### 1. Enable 2-Step Verification (if not already enabled)
   - Go to your Google Account: https://myaccount.google.com/
   - Navigate to **Security** in the left sidebar
   - Scroll down to **How you sign in to Google**
   - Click on **2-Step Verification**
   - Follow the steps to enable it (you'll need your phone for verification)

### 2. Create an App Password
   - After enabling 2-Step Verification, go back to **Security**
   - Scroll down to **How you sign in to Google**
   - Click on **2-Step Verification**
   - Scroll to the bottom and click **App passwords**
   - You might need to sign in again
   - Select **Mail** as the app
   - Select **Other (Custom name)** as the device
   - Enter a name like "Portfolio Contact Form"
   - Click **Generate**
   - Google will show you a 16-character password (e.g., "abcd efgh ijkl mnop")

### 3. Update Your .env.local File
   - Open the file: `c:\Users\jjl10\Desktop\potfolio\.env.local`
   - Find the line: `EMAIL_PASS=your_app_password_here`
   - Replace `your_app_password_here` with the 16-character password (remove the spaces)
   - Example: `EMAIL_PASS=abcdefghijklmnop`

### 4. Save and Restart
   - Save the `.env.local` file
   - Restart your development server (Ctrl+C to stop, then `npm run dev` to start)

## Testing the Contact Form

1. Visit http://localhost:3000/contact
2. Fill out the contact form
3. Submit the form
4. Check your email at jjl1089@gmail.com - you should receive the message!

## Troubleshooting

### If emails aren't sending:
- Make sure 2-Step Verification is enabled
- Verify the app password is correct (no spaces)
- Check that the `.env.local` file is saved
- Restart the development server
- Check the browser console and terminal for error messages

### Security Note:
- Never share your app password publicly
- Never commit the `.env.local` file to GitHub (it's already in .gitignore)
- If you think your app password was exposed, delete it in Google Account settings and create a new one

## Current Configuration

Your `.env.local` should look like this:

```env
MONGODB_URI=mongodb+srv://Joshua:j0shk3r0sh@mymongodb.hteve5f.mongodb.net/portfolio?retryWrites=true&w=majority&appName=MyMongoDB

# Email Configuration (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=jjl1089@gmail.com
EMAIL_PASS=your_16_character_app_password_here
EMAIL_TO=jjl1089@gmail.com
```

Replace `your_16_character_app_password_here` with your actual Gmail app password!
