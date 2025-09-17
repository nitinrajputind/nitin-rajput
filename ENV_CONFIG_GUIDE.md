# 🔧 Smart Contact Form Configuration

## 🎯 **How It Works**

Your contact form now automatically chooses the best email service based on your deployment:

- **🖥️ Local Development:** Uses Nodemailer (full email features)
- **☁️ Vercel/Netlify:** Uses Nodemailer (server-side API routes)
- **📄 GitHub Pages:** Uses Formspree (static hosting compatible)

## ⚙️ **Environment Variables**

### **🔄 Switching Between Services**

**Use Formspree (for GitHub Pages):**
```env
NEXT_PUBLIC_USE_FORMSPREE=true
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

**Use Nodemailer (for Vercel/local):**
```env
NEXT_PUBLIC_USE_FORMSPREE=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_EMAIL=nitinrajput971625@gmail.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 🚀 **Deployment Configurations**

### **📄 For GitHub Pages**

**Create `.env.local`:**
```env
# Use Formspree for GitHub Pages
NEXT_PUBLIC_USE_FORMSPREE=true
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

**Setup Steps:**
1. Go to [Formspree.io](https://formspree.io/) and create account
2. Create new form, get endpoint URL
3. Add to `.env.local` as shown above
4. Build and deploy: `npm run build && npm run export`

### **☁️ For Vercel Deployment**

**Create `.env.local`:**
```env
# Use Nodemailer for Vercel
NEXT_PUBLIC_USE_FORMSPREE=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_EMAIL=nitinrajput971625@gmail.com
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
```

**Setup Steps:**
1. Add all environment variables to Vercel dashboard
2. Get Gmail App Password
3. Deploy to Vercel

### **🌐 For Netlify Deployment**

**Create `.env.local`:**
```env
# Use Nodemailer for Netlify
NEXT_PUBLIC_USE_FORMSPREE=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_EMAIL=nitinrajput971625@gmail.com
NEXTAUTH_URL=https://your-site.netlify.app
NEXTAUTH_SECRET=your-secret-key
```

**Setup Steps:**
1. Add all environment variables to Netlify dashboard
2. Get Gmail App Password
3. Deploy to Netlify

### **🖥️ For Local Development**

**Create `.env.local`:**
```env
# Use Nodemailer for local development
NEXT_PUBLIC_USE_FORMSPREE=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_EMAIL=nitinrajput971625@gmail.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 🎯 **Smart Features**

### **✅ Automatic Service Selection**
```typescript
// The form automatically detects which service to use
const useFormspree = process.env.NEXT_PUBLIC_USE_FORMSPREE === 'true';

if (useFormspree) {
  // Use Formspree for GitHub Pages
} else {
  // Use Nodemailer for Vercel/local
}
```

### **📧 Service-Specific Features**

**Formspree Benefits:**
- ✅ Works with static hosting (GitHub Pages)
- ✅ No server required
- ✅ Built-in spam protection
- ✅ Free tier (50 submissions/month)

**Nodemailer Benefits:**
- ✅ Full control over email templates
- ✅ Auto-reply functionality
- ✅ Custom email designs
- ✅ No third-party dependencies

### **🔍 Debug Information**

The form logs which service it's using:
```
Console: "Using Formspree for form submission"
Console: "Using Nodemailer API for form submission"
```

## 🛠️ **Setup Instructions**

### **Step 1: Choose Your Deployment**
- **GitHub Pages** → Use Formspree
- **Vercel/Netlify** → Use Nodemailer
- **Local Development** → Use Nodemailer

### **Step 2: Configure Environment**
Create `.env.local` with the appropriate configuration above

### **Step 3: Get Required Credentials**

**For Formspree:**
1. Sign up at [Formspree.io](https://formspree.io/)
2. Create form, get endpoint URL

**For Nodemailer:**
1. Enable 2FA on Gmail
2. Generate App Password at [Google App Passwords](https://myaccount.google.com/apppasswords)

### **Step 4: Test**
1. Start development server: `npm run dev`
2. Submit test form
3. Check console logs to verify correct service
4. Check your email inbox

## 🎉 **Benefits of This Setup**

✅ **Flexible Deployment** - Works with any hosting platform
✅ **Environment-Aware** - Automatically chooses best service
✅ **Easy Switching** - Change one environment variable
✅ **Fallback Ready** - Graceful error handling for both services
✅ **Development Friendly** - Full email testing in local environment

## 🔧 **Quick Switch Commands**

**Switch to Formspree:**
```bash
echo "NEXT_PUBLIC_USE_FORMSPREE=true" >> .env.local
echo "NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id" >> .env.local
```

**Switch to Nodemailer:**
```bash
echo "NEXT_PUBLIC_USE_FORMSPREE=false" >> .env.local
# Add all SMTP variables...
```

Your contact form is now smart and adapts to any deployment scenario! 🚀
