# Wix Headless Authentication Demo

This is a basic React/Next.js application that demonstrates OAuth authentication with Wix Headless.

## Project Setup

### Wix Studio Headless Configuration
- **Site ID**: `5b2c9f91-0e9c-4f31-914c-55943f6483dc`
- **OAuth App ID**: `1e064af1-97ee-4c5a-8631-8f951b2f0b15`
- **OAuth App Secret**: `c0fcfbf7-657a-4074-8386-19142bc5b410`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Wix Studio configuration:
```env
NEXT_PUBLIC_WIX_CLIENT_ID=1e064af1-97ee-4c5a-8631-8f951b2f0b15
NEXT_PUBLIC_WIX_SITE_ID=5b2c9f91-0e9c-4f31-914c-55943f6483dc
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- ✅ OAuth authentication with Wix
- ✅ Login/Signup functionality
- ✅ Session management
- ✅ Protected routes
- ✅ User profile display

## Deployment

This project can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting platform

## Project Structure

```
├── components/
│   ├── AuthButton.tsx
│   ├── LoginForm.tsx
│   └── UserProfile.tsx
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   ├── login.tsx
│   └── profile.tsx
├── lib/
│   └── wix-client.ts
└── middleware.ts
``` 