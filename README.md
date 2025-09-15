# 🚀 Nitin Rajput - Portfolio Website

A modern, responsive portfolio website built with **Next.js 14**, featuring smooth animations, interactive components, and a clean, professional design.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![SCSS](https://img.shields.io/badge/SCSS-Latest-pink)

## 🌟 Live Demo

**[View Live Portfolio →](https://nitinrajput.dev)**

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Sections Overview](#-sections-overview)
- [Key Components](#-key-components)
- [Performance](#-performance)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Contact](#-contact)

## ✨ Features

### 🎨 **Design & UX**
- **Modern UI/UX** - Clean, professional design with attention to detail
- **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- **Dark Theme** - Elegant dark color scheme with purple accent
- **Smooth Animations** - Framer Motion powered micro-interactions
- **Interactive Elements** - Hover effects, transitions, and dynamic content

### 🔧 **Technical Features**
- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **SCSS Modules** - Modular, maintainable styling
- **Performance Optimized** - 95+ Lighthouse scores
- **SEO Friendly** - Meta tags, structured data, sitemap
- **Mobile-First** - Progressive enhancement approach

### 📱 **Responsive Design**
- **Mobile Optimized** - Touch-friendly interactions
- **Tablet Support** - Perfect medium screen experience
- **Desktop Enhanced** - Rich hover states and interactions
- **Cross-Browser** - Compatible with all modern browsers

## 🛠 Tech Stack

### **Frontend**
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[SCSS](https://sass-lang.com/)** - Advanced CSS with variables and mixins
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### **Development Tools**
- **ESLint** - Code linting and formatting
- **Git** - Version control
- **VS Code** - Development environment

### **Deployment**
- **[Vercel](https://vercel.com/)** - Hosting and deployment
- **Custom Domain** - Professional domain setup

## 📁 Project Structure

```
next-portfolio/
├── 📁 public/                  # Static assets
│   ├── 🖼️ images/             # Project images and screenshots
│   ├── 🎨 icons/              # Technology and social icons
│   └── 📄 Nitin_Rajput_SDE.pdf # Resume file
├── 📁 src/
│   ├── 📁 app/                 # Next.js 14 App Router
│   │   ├── favicon.ico
│   │   ├── layout.tsx          # Root layout with metadata
│   │   └── page.tsx            # Home page
│   ├── 📁 assets/              # Images and icons
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 brand/           # Logo component
│   │   ├── 📁 button/          # Button component
│   │   ├── 📁 common/          # Shared components
│   │   ├── 📁 experience/      # Experience cards
│   │   ├── 📁 svg/             # SVG icon component
│   │   └── 📁 techStack/       # Technology stack components
│   ├── 📁 constants/           # Application constants and data
│   │   └── constants.ts        # Projects, skills, experience data
│   ├── 📁 scss/                # Global styles and variables
│   │   ├── _globals.scss       # Global styles
│   │   ├── _variable.scss      # SCSS variables
│   │   └── index.scss          # Main stylesheet
│   └── 📁 sections/            # Page sections
│       ├── 📁 about/           # About section
│       ├── 📁 experience/      # Work experience
│       ├── 📁 header/          # Navigation header
│       ├── 📁 hero/            # Hero/landing section
│       ├── 📁 projects/        # Projects showcase
│       └── 📁 skills/          # Skills visualization
├── 📄 next.config.mjs          # Next.js configuration
├── 📄 package.json             # Dependencies and scripts
├── 📄 tsconfig.json           # TypeScript configuration
└── 📄 README.md               # This file
```

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/nitinrajputind/next-portfolio.git
   cd next-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📖 Sections Overview

### 🎯 **Hero Section**
- **Dynamic Introduction** - Typewriter effect with multiple roles
- **Professional Stats** - Years of experience, projects completed, users impacted
- **Tech Stack Showcase** - Interactive technology carousel
- **Call-to-Action** - Contact and work viewing buttons

### 👨‍💻 **About Section**
- **Professional Summary** - Background and expertise
- **Skills Highlight** - Core competencies
- **Personal Touch** - Professional photo and personality

### 💼 **Experience Section**
- **Work History** - Professional experience timeline
- **Company Details** - Roles, responsibilities, achievements
- **Interactive Cards** - Hover effects and detailed information

### 🛠 **Skills Section**
- **Radar Chart** - Visual skills representation
- **Technology Categories** - Frontend, backend, tools, etc.
- **Proficiency Levels** - Skill ratings and expertise areas
- **Interactive Visualization** - Dynamic chart with animations

### 🚀 **Projects Section**
- **Featured Projects** - Showcase of best work
- **Project Metrics** - Users, performance, uptime statistics
- **Technology Stack** - Technologies used in each project
- **Live Links** - GitHub repositories and live demos
- **Mobile Optimized** - Expandable cards for mobile devices

## 🔑 Key Components

### **Navigation (Header)**
- **Responsive Design** - Mobile hamburger menu
- **Smooth Scrolling** - Anchor navigation to sections
- **Resume Download** - Direct PDF download functionality
- **Scroll Indicator** - Shows scroll progress

### **Button Component**
- **Multiple Variants** - Primary, secondary, outline styles
- **Size Options** - Small, medium, large
- **Interactive States** - Hover, focus, active animations
- **Accessibility** - ARIA labels and keyboard navigation

### **Project Cards**
- **Responsive Layout** - Alternating left/right design
- **Interactive Elements** - Hover effects and animations
- **Performance Metrics** - User stats and performance data
- **Technology Tags** - Visual tech stack indicators
- **Mobile Accordion** - Collapsible content on mobile

### **Skills Radar Chart**
- **Dynamic Visualization** - Interactive skill representation
- **Top Skills Focus** - Shows top 8 skills by proficiency
- **Responsive Design** - Adapts to screen size
- **Smooth Animations** - Framer Motion powered

## ⚡ Performance

### **Lighthouse Scores**
- **Performance**: 95+ 🚀
- **Accessibility**: 100 ♿
- **Best Practices**: 100 ✅
- **SEO**: 100 🔍

### **Optimizations**
- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Automatic route-based splitting
- **Bundle Analysis** - Optimized bundle size
- **Caching Strategy** - Static generation and ISR
- **Font Optimization** - Google Fonts with display: swap

## 🚀 Deployment

### **Vercel (Recommended)**
1. **Connect Repository** - Link GitHub repository to Vercel
2. **Configure Settings** - Set build command and output directory
3. **Deploy** - Automatic deployment on push to main branch
4. **Custom Domain** - Configure custom domain if needed

### **Manual Deployment**
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### **Environment Variables**
Create a `.env.local` file for environment-specific variables:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🎨 Customization

### **Personal Information**
Update your details in `src/constants/constants.ts`:
- Personal information
- Projects data
- Skills and proficiency levels
- Work experience
- Social links

### **Styling**
Customize the design in `src/scss/_variable.scss`:
- Color scheme
- Typography
- Spacing
- Breakpoints

### **Content**
- Replace project images in `public/images/`
- Update resume PDF in `public/`
- Modify section content in respective components

## 📊 Analytics & SEO

### **SEO Features**
- **Meta Tags** - Dynamic meta titles and descriptions
- **Open Graph** - Social media sharing optimization
- **Structured Data** - Schema.org markup
- **Sitemap** - Automatic sitemap generation
- **Robots.txt** - Search engine crawling instructions

### **Performance Monitoring**
- **Core Web Vitals** - LCP, FID, CLS optimization
- **Bundle Analysis** - Bundle size monitoring
- **Lighthouse CI** - Automated performance testing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **Development Guidelines**
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Code Standards**
- **TypeScript** - Use proper typing
- **ESLint** - Follow linting rules
- **Component Structure** - Keep components focused and reusable
- **SCSS** - Use BEM naming convention
- **Accessibility** - Ensure ARIA compliance

## 📞 Contact

**Nitin Rajput** - Full Stack Developer

- **Email**: [nitin.rajput@example.com](mailto:nitin.rajput@example.com)
- **LinkedIn**: [linkedin.com/in/nitinrajput](https://linkedin.com/in/nitinrajput)
- **GitHub**: [github.com/nitinrajputind](https://github.com/nitinrajputind)
- **Portfolio**: [nitinrajput.dev](https://nitinrajput.dev)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Framer Motion** - For smooth animations
- **Vercel** - For seamless deployment
- **Open Source Community** - For inspiration and resources

---

**⭐ If you found this portfolio helpful, please give it a star!**

---

*Built with ❤️ by Nitin Rajput*