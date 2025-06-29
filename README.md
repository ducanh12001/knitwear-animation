# Knitwear Animation Website

## Overview

This is a modern e-commerce website for knitwear products (sweaters, jackets, etc.) featuring smooth animations, seamless user experience, optimized for both desktop and mobile devices.

The website is built with React + TypeScript, Vite, GSAP animations, Context API, custom hooks, and follows best practices for code structure, SEO, and accessibility.

## Key Features

### 🏠 Homepage
- **Main Banner**: Image slider with smooth transitions
- **Featured Products**: Display products by gender and collections
- **Roadmap**: Timeline showcasing brand development journey
- **Limited Collections**: Special products with limited availability
- **Slider Section**: Image and title display with animations

### 🛍️ Product Catalog
- **Gender-based Filtering**: Separate filters for Men/Women
- **Collections**: Different product lines (4-Season, High-Altitude, etc.)
- **Product Cards**: Display basic info, images, pricing
- **Responsive Design**: Optimized for mobile and desktop

### 📦 Product Details
- **Image Gallery**: Slideshow with navigation
- **Detailed Information**: Description, sizing, colors
- **Heat Indicator**: Temperature rating for each product
- **Special Features**: WHOLEGARMENT®, Dyeing Process, Yarn, Gorpcore
- **Image Modal**: Polaroid-style viewer with animations

### 🛒 Shopping Cart & Checkout
- **Shopping Cart**: Add/remove products, update quantities
- **Cart Modal**: Display list and total
- **Checkout Form**: Shipping information, payment details
- **Payment Methods**: Stripe integration
- **Order Confirmation**: Order summary

### 🔐 Account System
- **Login/Register**: Modal forms with validation
- **Account Management**: Personal info, order history
- **Password Recovery**: Email reset form

### 🍪 Cookie Consent
- **Notification Banner**: GDPR compliant
- **Customization Modal**: Allow users to choose cookie types
- **ConsentScript**: Load scripts based on consent
- **Analytics Tracking**: Google Analytics integration

### 🎨 Animation & UX
- **Page Transitions**: Smooth page change effects
- **Scroll Animations**: GSAP with Lenis smooth scrolling
- **Hover Effects**: Interactive animations
- **Loading States**: Skeleton loading, spinners
- **Custom Cursor**: Customized cursor
- **Scroll Circle**: Scroll-to-top button with progress

### 📱 Responsive & Accessibility
- **Mobile-first**: Optimized for all devices
- **Keyboard Navigation**: Keyboard navigation support
- **Screen Reader**: ARIA labels, semantic HTML
- **Focus Management**: Focus management for modals, forms

## Technologies Used

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library
- **Lenis** - Smooth scrolling
- **React Router** - Client-side routing

### State Management
- **React Context API** - Global state
- **Custom Hooks** - Reusable logic
- **Local Storage** - Data persistence

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type safety
- **Prettier** - Code formatting

## Project Structure

```
src/
├── components/           # React components
│   ├── atoms/           # Basic components (Button, Input, etc.)
│   ├── organisms/       # Complex components (Header, Footer, Modal)
│   ├── pages/           # Page-specific components
│   └── others/          # Utility components (Cookie, SEO, etc.)
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Main page components
├── services/            # API services
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── constant/            # Constants, routes, validation
├── assets/              # Images, fonts, videos
└── styles/              # Global styles
```

## Installation & Setup

### System Requirements
- Node.js 18+ 
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Code Quality Check
```bash
npm run lint
```

## Notable Features

### 🎯 Performance
- **Code Splitting**: Lazy loading for pages
- **Image Optimization**: WebP format, responsive images
- **Bundle Optimization**: Tree shaking, minification

### 🔒 Security
- **XSS Protection**: User input sanitization
- **CSRF Protection**: Token-based authentication
- **Secure Headers**: Content Security Policy

### 📊 Analytics
- **Google Analytics**: Page views, events tracking
- **Performance Monitoring**: Core Web Vitals
- **Error Tracking**: Console error logging

### 🌐 SEO
- **Meta Tags**: Dynamic meta description, title
- **Open Graph**: Social media sharing
- **Structured Data**: JSON-LD markup
- **Sitemap**: Auto-generated sitemap

## Deployment

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
- Connect repository
- Set build command: `npm run build`
- Set output directory: `dist`

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push branch: `git push origin feature/new-feature`
5. Create Pull Request

### Code Standards
- Use TypeScript strict mode
- Follow ESLint rules
- Write meaningful commit messages
- Add tests for new features

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

If you have issues or questions, please:
- Create an issue on GitHub
- Contact the development team
- Check detailed documentation

---

**Made with ❤️ by Development Team**
