# Setup Instructions

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create Environment File

Create a `.env.local` file in the root directory with your Wix Studio configuration:

```env
NEXT_PUBLIC_WIX_CLIENT_ID=1e064af1-97ee-4c5a-8631-8f951b2f0b15
NEXT_PUBLIC_WIX_SITE_ID=5b2c9f91-0e9c-4f31-914c-55943f6483dc
```

## Step 3: Run Development Server

```bash
npm run dev
```

## Step 4: Test Authentication

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Sign In / Sign Up"
3. Complete the Wix authentication flow
4. You should be redirected back and see your user profile

## Wix Studio Headless Configuration

Your Wix Studio Headless project is already set up with:

- **Site ID**: `5b2c9f91-0e9c-4f31-914c-55943f6483dc`
- **OAuth App ID**: `1e064af1-97ee-4c5a-8631-8f951b2f0b15`
- **Allowed Domains**: `localhost:3000` and `*.github.io`

## Features Included

✅ OAuth authentication with Wix  
✅ Login/Signup functionality  
✅ Session management with cookies  
✅ User profile display  
✅ Responsive UI with Tailwind CSS  
✅ TypeScript support  

## Deployment

To deploy to GitHub Pages:

1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Update the OAuth app allowed domains to include your GitHub Pages URL
4. Build and deploy: `npm run build`

## Troubleshooting

- Make sure your `.env.local` file is created with the correct values
- Check that the OAuth app is properly configured in your Wix dashboard
- Ensure you're running on `localhost:3000` for development
- Check browser console for any authentication errors 