# AI Hairstyle Synthesis Website Project

## Project Overview
AI-powered hairstyle synthesis website that generates images of users with different hairstyles using Gemini 2.5 Flash API. Focus on maximum speed and simplicity.

## Language Configuration
- **Code Language**: English (all code, comments, documentation, UI text)
- **Communication Language**: Korean (conversations with user/developer)
- **Website Content**: English (user-facing content, UI labels, error messages)

## Tech Stack (Simplified for Speed)

### Frontend
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context API + useState (no external state library)
- **Form Handling**: React Hook Form + Zod (validation)
- **Data Fetching**: Native fetch API (no React Query)

### Backend
- **API**: Next.js API Routes (Serverless)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (for user images)
- **Authentication**: Supabase Auth (email login only)

### AI/ML
- **Image Generation**: Google Gemini 2.5 Flash API
- **Image Processing**: Client-side processing for optimization

### Payment
- **Payment Gateway**: Stripe (basic integration)
- **Payment Processing**: Client-side completion handling (no webhooks initially)

### Infrastructure
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Domain**: Vercel Domains

### Monitoring (Minimal)
- **Error Tracking**: Vercel built-in logging (no Sentry initially)
- **Analytics**: Vercel Analytics

## Development Priorities

### Phase 1: Core Infrastructure + Landing Page
1. Next.js project setup with TypeScript
2. Supabase project configuration
3. Basic landing page with hero section
4. Authentication pages (login/signup)
5. Stripe basic setup
6. Responsive design with Tailwind CSS

### Key Features for MVP
1. **Landing Page**: Hero section, features, pricing, CTA
2. **User Authentication**: Email signup/login via Supabase
3. **Payment System**: Stripe integration for credit-based model
4. **Image Upload**: Face photo upload functionality
5. **AI Generation**: Gemini 2.5 Flash integration for hairstyle synthesis
6. **Download System**: Processed image download

## Performance Requirements
- **Landing Page Load**: < 1 second
- **Image Generation**: < 10 seconds
- **Payment Processing**: < 3 seconds
- **Mobile Responsive**: All devices
- **Bundle Size**: Keep minimal with code splitting

## Development Guidelines
- Prioritize simplicity over complexity
- Use built-in solutions before adding libraries
- Focus on core functionality first
- Optimize for development speed
- Implement features incrementally

## Environment Variables Needed
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Gemini AI
GEMINI_API_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

## File Structure
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   ├── api/
│   │   ├── auth/
│   │   ├── generate/
│   │   └── stripe/
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── auth/
│   │   ├── landing/
│   │   └── dashboard/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── stripe.ts
│   │   ├── gemini.ts
│   │   └── utils.ts
│   └── types/
├── public/
└── styles/
```

## Commands to Remember
```bash
# Development
npm run dev

# Build
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```