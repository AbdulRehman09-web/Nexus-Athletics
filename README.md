# Nexus Athletics — AI-Powered Premium Gym & Fitness Ecosystem

A production-ready, immersive 3D AI-powered gym SaaS website built with Next.js 14, React Three Fiber, GSAP, Prisma, and OpenAI.

## 🚀 Features

### Frontend
- **Cinematic 3D Hero** - Interactive WebGL gym environment with scroll-driven storytelling
- **Custom Cursor** - Magnetic hover effects with contextual labels
- **Scroll Animations** - GSAP ScrollTrigger powered cinematic transitions
- **Responsive Design** - Mobile-first, works on 360px to ultrawide
- **Design System** - Tailwind CSS with custom design tokens
- **Accessibility** - WCAG 2.1 AA compliant, reduced motion support

### Backend
- **PostgreSQL + Prisma** - Type-safe database with comprehensive schema
- **JWT Authentication** - Access/refresh tokens with httpOnly cookies
- **REST API** - Trainers, Services, Memberships, Bookings, Classes
- **Admin Dashboard** - CRUD for all entities with role-based access

### AI Features
- **AI Fitness Assistant** - Streaming chat with gym knowledge base
- **RAG Architecture** - Context-aware responses from structured data
- **Hallucination Resistance** - Strict knowledge base boundaries

### SEO/GEO
- **Schema.org** - Organization, LocalBusiness, Service, Person, FAQ
- **Meta Tags** - Open Graph, Twitter Cards, canonical URLs
- **Sitemap/Robots** - Auto-generated
- **AI-Readable Content** - Structured for LLM retrieval

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, CSS Variables, PostCSS |
| 3D | Three.js, React Three Fiber, Drei, Postprocessing |
| Animation | GSAP, ScrollTrigger, Framer Motion |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT, bcryptjs, httpOnly cookies |
| AI | OpenAI GPT-4o-mini, Streaming |
| Validation | Zod |
| Forms | React Hook Form, Hookform Resolvers |
| State | Zustand, SWR |
| Icons | Lucide React |

## 📦 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- pnpm (recommended) or npm

### Installation

```bash
# Clone and install
git clone https://github.com/AbdulRehman09-web/Nexus-Athletics.git
cd nexus-athletics
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Database
pnpm db:generate
pnpm db:push
pnpm db:seed

# Development
pnpm dev
```

Visit `http://localhost:3000`

### Demo Credentials
- **Admin**: admin@nexusathletics.com / admin123
- **Trainers**: alex.carter@nexusathletics.com / trainer123 (and others)

## 📁 Project Structure

```
nexus-athletics/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Demo data seeding
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Auth endpoints
│   │   │   ├── trainers/     # Trainer CRUD
│   │   │   ├── services/     # Service CRUD
│   │   │   ├── memberships/  # Membership CRUD
│   │   │   ├── chatbot/      # AI assistant
│   │   │   └── admin/        # Admin endpoints
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── ui/               # Base UI components
│   │   ├── layout/           # Layout components
│   │   ├── three/            # 3D components
│   │   ├── sections/         # Page sections
│   │   ├── chatbot/          # Chatbot UI
│   │   └── forms/            # Form components
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client
│   │   ├── auth.ts           # Auth utilities
│   │   └── utils.ts          # Helper functions
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript types
│   └── styles/               # Additional styles
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🗄 Database Schema

Key models:
- **User** - Members, trainers, admins with roles
- **Trainer** - Profiles with specializations, certifications, availability
- **Service** - 12 training services with categories
- **MembershipPlan** - BASIC/PRO/ELITE tiers
- **Membership** - User subscriptions with status
- **Class** - Scheduled group classes
- **Booking** - Personal training & class bookings
- **Program** - Multi-week training programs
- **Testimonial** - Member reviews
- **FAQ** - Categorized questions
- **BlogPost** - SEO content
- **ChatSession/Message** - AI conversation history
- **KnowledgeBase** - RAG source documents
- **GymLocation** - Physical location data
- **SiteSettings** - Global configuration

## 🔐 Authentication

### Token Flow
1. Login → Returns access (7d) + refresh (30d) tokens in httpOnly cookies
2. Access token in Authorization header for API calls
3. Refresh endpoint rotates tokens
4. Logout clears cookies

### Roles
- `MEMBER` - Default, can book, view own data
- `TRAINER` - Can view own schedule, clients
- `ADMIN` - Full CRUD on content
- `SUPER_ADMIN` - User management, delete permissions

## 🤖 AI Chatbot

### Architecture
```
User → Frontend Chat UI → /api/chatbot → OpenAI + Knowledge Base → Response
```

### Knowledge Base Structure
```typescript
{
  gym: { name, address, hours, contact, amenities },
  trainers: [{ name, specializations, certifications, bio }],
  memberships: { BASIC, PRO, ELITE with features/pricing },
  services: [{ name, description, benefits, price }],
  faqs: [{ question, answer, category }]
}
```

### Features
- Streaming responses
- Session persistence
- Context awareness
- Hallucination guardrails
- Fallback to contact info

## 🎨 Design System

### Colors
- **Base**: `nexus-950` (#09090b) to `nexus-50` (#fafafa)
- **Accent**: Gold (`#D4A843`), Copper (`#B87333`), Bronze (`#CD7F32`)
- **Surfaces**: Semi-transparent layers with backdrop blur

### Typography
- **Display**: Space Grotesk (headlines, numbers)
- **Body**: DM Sans (UI, content)
- **Mono**: JetBrains Mono (code, data)

### Spacing Scale
- Base: 4px (0.25rem)
- Sections: `py-18 md:py-24 lg:py-32`

### Animations
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out)
- **Durations**: 300ms (micro), 500ms (standard), 700ms (macro)
- **Reduced Motion**: Disables all non-essential animation

## 📱 Responsive Breakpoints

| Size | Width | Columns |
|------|-------|---------|
| Mobile | < 640px | 1 |
| Tablet | 640-1023px | 2 |
| Desktop | 1024-1439px | 3 |
| Wide | 1440-1919px | 4 |
| Ultra | ≥ 1920px | 5-6 |

## ⚡ Performance

### 3D Optimization
- Quality detection (GPU tier)
- Particle count scaling
- Lazy-loaded scenes
- `prefers-reduced-motion` support

### Next.js
- Image optimization (AVIF/WebP)
- Font optimization (next/font)
- Code splitting (dynamic imports)
- Bundle analysis (`@next/bundle-analyzer`)

### Targets
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- 60fps animations

## 🔍 SEO/GEO Checklist

- [x] Semantic HTML5
- [x] Heading hierarchy (h1→h6)
- [x] Meta titles/descriptions
- [x] Open Graph + Twitter Cards
- [x] JSON-LD Schema.org
- [x] Sitemap.xml + robots.txt
- [x] Canonical URLs
- [x] Alt text for all images
- [x] FAQPage schema
- [x] LocalBusiness schema
- [x] Person schema (trainers)
- [x] Service schema
- [x] AI-readable structured content
- [x] Conversational query coverage

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Connect repo to Vercel
# Add environment variables
# Deploy
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables (Production)
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="32+ char random string"
OPENAI_API_KEY="sk-..."
NEXTAUTH_URL="https://yourdomain.com"
```

### Database Migration
```bash
pnpm db:migrate deploy
```

## 🧪 Testing

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Build verification
pnpm build

# Database studio
pnpm db:studio
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📞 Support

- Email: hello@nexusathletics.com
- Issues: GitHub Issues
- Docs: `/docs` (when available)

---

Built with ❤️ for the future of fitness.