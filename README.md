# Professional Portfolio

A modern, full-stack portfolio application built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS. Features dark/light theme switching, responsive design, and a component-based architecture.

## 🚀 Features

- ✅ **Next.js 15** with App Router
- ✅ **TypeScript** for type safety
- ✅ **MongoDB** for data persistence
- ✅ **Dark/Light Theme** with next-themes
- ✅ **shadcn/ui** components
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **Framer Motion** animations (ready to use)
- ✅ **Pages**: Home, About, Projects, Skills, Certifications, Blog, Contact
- ✅ **Component Architecture** for reusability

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

## 🛠️ Installation & Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up MongoDB

**Option A: Local MongoDB**
```bash
# Download from https://www.mongodb.com/try/download/community
# Then start MongoDB:

# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 3. Seed the database

```bash
# Start development server
npm run dev

# Visit this URL to seed with sample data:
http://localhost:3000/api/seed
```

You should see: `{"message":"Database seeded successfully!"}`

### 4. View your portfolio

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                     # Next.js pages
│   ├── skills/             # Skills page with MongoDB
│   ├── certifications/     # Certifications page
│   ├── projects/           # Projects (to be completed)
│   ├── blog/               # Blog (to be completed)  
│   ├── api/seed/           # Database seeding
│   └── page.tsx            # Home page
├── components/
│   ├── layout/             # Header (with theme toggle), Footer
│   └── ui/                 # shadcn components
├── lib/
│   ├── mongodb.ts          # Database connection
│   └── seed.ts             # Sample data
├── models/                  # Mongoose schemas
└── types/                   # TypeScript types
```

## 🎨 Customization

### Update Your Content

Edit `src/lib/seed.ts` to change:
- Projects
- Skills  
- Certifications
- Blog posts

Then re-run: `http://localhost:3000/api/seed`

### Add More shadcn Components

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variable: `MONGODB_URI`
4. Deploy!

## 📚 Tech Stack

- Next.js 15, React 19, TypeScript
- MongoDB + Mongoose
- Tailwind CSS + shadcn/ui
- next-themes (dark/light mode)
- Framer Motion
- lucide-react icons

## 🎯 TODO

- [ ] Create About page
- [ ] Create Contact form page
- [ ] Create Blog detail pages
- [ ] Create Project detail pages
- [ ] Add animations
- [ ] Add image uploads

---

**Built with Next.js and MongoDB**
