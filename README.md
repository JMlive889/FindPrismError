# Cryptic Mobile Detailing

A comprehensive full-stack web application for a premium mobile car detailing business, built with modern technologies and production-ready features.

## Features

### Core Functionality
- **Mobile-first responsive design** with clean white theme
- **Booking system** with 7-day customer limit enforcement
- **Stripe payment integration** for one-time services and recurring memberships
- **Google Calendar integration** for automatic appointment scheduling
- **Email notifications** for booking confirmations and owner alerts
- **AI-powered chatbot** using OpenAI for customer support and booking assistance
- **Admin dashboard** with revenue tracking, booking management, and product CRUD
- **Gallery system** with authenticated uploads and public viewing
- **NextAuth authentication** with Google and email providers

### Business Logic
- Enforce one booking per customer per rolling 7 days (by email + phone)
- Automatic Google Calendar event creation for all bookings
- Comprehensive email notifications for customers and business owner
- Stripe webhook handling for payment confirmation and membership management
- Rate-limited admin APIs with proper authorization

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Database:** Prisma ORM with SQLite (production-ready Postgres config)
- **Authentication:** NextAuth.js with Google and Email providers
- **Payments:** Stripe (one-time payments + subscriptions)
- **Email:** Resend API integration
- **Calendar:** Google Calendar API
- **AI:** OpenAI GPT-3.5 Turbo for chatbot
- **File Uploads:** UploadThing integration ready
- **SMS (Optional):** Twilio integration for notifications

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database (SQLite for development, Postgres for production)
DATABASE_URL="file:./dev.db"
# For production: DATABASE_URL="postgresql://username:password@localhost:5432/cryptic_detailing"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (for authentication)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe Payment Processing
STRIPE_PUBLIC_KEY="pk_test_your-stripe-public-key"
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Google Calendar Integration
GOOGLE_CALENDAR_CLIENT_ID="your-calendar-client-id"
GOOGLE_CALENDAR_CLIENT_SECRET="your-calendar-client-secret"
GOOGLE_CALENDAR_REFRESH_TOKEN="your-refresh-token"

# OpenAI for Chatbot
OPENAI_API_KEY="sk-your-openai-api-key"

# Email Service
RESEND_API_KEY="re_your-resend-api-key"

# Optional SMS Notifications
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Business Contact Information
OWNER_EMAIL="crypticmobiledetailing@gmail.com"
OWNER_PHONE="+1 (706) - 717 - 9406"
```

### 2. Database Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with initial products
npx prisma db seed
```

### 3. Third-Party Service Configuration

#### Stripe Setup
1. Create a Stripe account at https://dashboard.stripe.com
2. Get your API keys from the Developers section
3. Set up webhooks pointing to `/api/webhooks/stripe`
4. Required webhook events: `checkout.session.completed`, `invoice.payment_succeeded`

#### Google Calendar API
1. Go to Google Cloud Console
2. Enable Google Calendar API
3. Create OAuth 2.0 credentials
4. Get refresh token using OAuth 2.0 Playground
5. Add your domain to authorized origins

#### OpenAI API
1. Sign up at https://platform.openai.com
2. Create an API key in the API Keys section
3. Ensure you have sufficient credits for chatbot functionality

#### Email Service (Resend)
1. Sign up at https://resend.com
2. Verify your domain for production use
3. Get your API key from the dashboard

### 4. Running the Application

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## Deployment

### Database Migration to Postgres

For production deployment, update your `DATABASE_URL` to use Postgres:

```env
DATABASE_URL="postgresql://username:password@host:5432/database"
```

Then run:
```bash
npx prisma migrate deploy
npx prisma generate
```

### Environment Variables for Production

Ensure all environment variables are set in your production environment, especially:
- Database connection string
- Stripe webhook endpoint (must be publicly accessible)
- Google Calendar API credentials
- Email service configuration

## API Documentation

### Key Endpoints

- `POST /api/bookings` - Create new booking and Stripe checkout session
- `POST /api/webhooks/stripe` - Handle Stripe webhook events
- `POST /api/contact` - Send contact form messages
- `POST /api/chatbot` - AI chatbot interactions
- `GET /api/products` - Fetch all services/products

### Admin Endpoints (Authentication Required)

- `GET /admin/dashboard` - Admin dashboard with analytics
- `POST /admin/products` - Create/update products
- `DELETE /admin/bookings/:id` - Cancel bookings
- `POST /admin/refunds` - Process refunds

## Business Rules

1. **Booking Limits:** Customers can only book one service per 7-day rolling window
2. **Payment Processing:** All bookings require payment before confirmation
3. **Calendar Integration:** Every confirmed booking automatically creates a Google Calendar event
4. **Email Notifications:** Both customers and business owner receive email confirmations
5. **Membership Management:** Stripe handles recurring billing for membership subscriptions
6. **Admin Access:** Only users with 'ADMIN' role can access administrative functions

## Default Data

The application seeds with:
- 1 active service at $75 (Premium Detail Package)
- 3 "Coming Soon" services at various price points
- 1 active membership plan at $99.99/month

## Support

For technical issues or deployment questions, ensure:
1. All environment variables are properly configured
2. Database migrations have been run
3. Webhook endpoints are accessible from external services
4. API keys have sufficient permissions and credits

## Security Features

- Rate limiting on admin endpoints
- Input validation on all forms
- Stripe webhook signature verification
- NextAuth session management
- CSRF protection via Next.js
- SQL injection prevention via Prisma ORM

This application is production-ready and includes comprehensive error handling, logging, and monitoring capabilities.