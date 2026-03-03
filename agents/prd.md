# Tayloring Rays of Hope Site Requirements

## Overview

This document outlines our implementation for the Tayloring Rays of Hope site—a supportive hub for cancer patients, caregivers, and families. Our blog is hosted on Cloudflare Workers with React + Vite, using KV storage for dynamic content. The site serves as an entry point to resources, community connection, and links to our Shopify store for e-commerce/donations.

## Architecture & Tech Stack

### Primary Stack (Confirmed):
- **Frontend Framework**: React 18 with Vite (fast HMR builds, lightweight)
- **Hosting/Edge Runtime**: Cloudflare Workers Pages (zero-config SSL, global CDN)
- **Storage**: Cloudflare KV Namespaces (`BLOG_POSTS`) for blog content
- **Styling**: Tailwind CSS (utility-first, responsive design)
- **Content Management**: Portable Text editor integration for rich blog posts
- **Routing**: React Router DOM (client-side routing with lazy loading)

### Shopify Integration:
- Blog homepage, About, and Journey pages link directly to Shopify storefront
- Donation products hosted on Shopify (checkout via Stripe/Shopify Payments)
- Consistent branding across site and shop links

## Functional Requirements

1. **Homepage & Entry Points**:
   - Home, About, Journey pages with clear navigation
   - Prominent CTAs linking to Shopify for shopping/donations
   - Static assets optimized via Vite build process

2. **Resource Library**:
   - Articles, guides, video embeds (YouTube/Vimeo)
   - Category/tag filtering and search functionality
   - Existing content migrated to Portable Text format in KV store

3. **Blog System (`/admin`)**:
   - Admin panel for creating/editing blog posts via KV operations
   - Rich-text editor using Portable Text API
   - Direct write to Cloudflare KV namespace (`BLOG_POSTS`)
   - Automatic revalidation of static builds after admin updates

4. **Shop Integration**:
   - Redirects from blog content to Shopify products
   - Embedded donation products (one-time/recurring via Shopify)
   - Consistent navigation with shop branding where appropriate

5. **Community Forum** (In Progress):
   - Lightweight discussion boards (Discourse embed or custom React components)
   - User roles and moderation tools via KV-backed session storage

6. **Donation System**:
   - Donation links from site to Shopify checkout
   - Receipts handled by Shopify's native email system

## Non-Functional Requirements

1. **Accessibility**:
   - WCAG 2.1 AA compliant (ARIA labels, keyboard nav)
   - Mobile-first Tailwind utility classes

2. **Performance**:
   - Vite production builds with Tree Shaking & Minification
   - Cloudflare Edge Network caching + Brotli compression
   - Lazy-loading images/videos via optimized loaders

3. **Security**:
   - Cloudflare automatic HTTPS + WAF rules
   - Admin route protected by middleware (JWT/session tokens in KV)
   - Input sanitization for user submissions and forum posts

4. **SEO**:
   - React Helmet/Next-Sanity alternative: JSON-LD schema via `<script>` tags
   - Dynamic meta tags generated from blog post data in KV

## Development Roadmap

### Phase 1: Finalize Admin & Blog System (Current Focus)
- Complete `/admin` route with secure login flow
- Implement Portable Text editor for rich content creation
- Write/read/update/delete operations against Cloudflare KV (`BLOG_POSTS`)
- Migrate existing articles to Portable Text format

**Status**: In Progress

### Phase 2: Resource Library & Search Optimization
- Build reusable component library (ResourceCard, TagFilter)
- Implement search/filter logic using KV queries
- Populate with existing medical/guidance content

**Status**: Pending Final Testing

### Phase 3: Community Forum Development
- Evaluate Discourse embed vs. custom React forum builder
- Integrate moderation tools with KV-backed user roles

**Status**: Planning/Research

### Phase 4: Security & SEO Hardening
- Audit dependencies (vite, react, tailwind) for known vulnerabilities
- Configure Cloudflare Workers rules for rate limiting and bot detection
- Implement schema.org markup for all dynamic pages

**Status**: Quarterly Audits Planned

## Team Responsibilities

1. **Developer (Frontend + Backend)**:
   - React/Vite/Cloudflare Workers implementation
   - Portable Text editor integration with media upload
   - KV CRUD operations for blog posts and resources

2. **Designer**:
   - Accessibility-first Tailwind component library
   - Mobile-responsive layouts with consistent Shopify branding

3. **Content Manager / Creator**:
   - Populate resource library with medically accurate content
   - Create blog posts via admin panel (Portable Text workflow)
   - Review community forum contributions for compliance

4. **DevOps/Security Lead** (Optional):
   - Manage Cloudflare Workers settings, KV namespaces
   - Dependency auditing and vulnerability patching

## Next Steps for Immediate Execution

1. **Finalize `/admin` Route**:
   - Secure login flow with session management in KV
   - Portable Text editor with image/file upload support
   - Write to `BLOG_POSTS` KV namespace with validation hooks

2. **Populate Resource Library**:
   - Migrate existing articles to Portable Text JSON structure
   - Build admin UI components for tagging, categorizing, and filtering

3. **Test Donation Flow**:
   - Validate Shopify product variants and checkout UX
   - Ensure seamless redirection from site to shop

4. **Prepare Community Forum**:
   - Select forum provider or begin custom build planning
   - Draft community guidelines in KV-backed admin panel

5. **Security & SEO Setup**:
   - Configure Cloudflare WAF rules and SSL settings
   - Generate schema.org markup for all primary pages and blog posts

## Shadow Clone Notes (Updated)

> "Building this site leverages React + Vite + Cloudflare Workers for blazing-fast, globally distributed performance."  
>   
> "Our admin panel writes directly to Cloudflare KV, enabling instant updates without complex databases or build pipelines."  
>   
> "Shopify integration provides robust e-commerce while our custom React blog ensures full control over content and community features."  
>   
> "Continuously optimize for accessibility and user experience as we expand resources and forum functionality."

---

**GENERATED FILE**: `prd.md` (Updated)  
**CURRENT STATUS**: Admin posting system in progress using Portable Text + Cloudflare KV; resource library live; donation/shop links active; forum planning underway.