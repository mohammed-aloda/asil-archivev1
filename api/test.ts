import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Check if environment variables are available
    const hasEmailUser = !!process.env.EMAIL_USER;
    const hasEmailPass = !!process.env.EMAIL_PASS;
    const hasStripeKey = !!process.env.STRIPE_SECRET_KEY;
    const hasClientUrl = !!process.env.CLIENT_URL;

    res.status(200).json({
        message: 'API is working!',
        envCheck: {
            EMAIL_USER: hasEmailUser ? 'SET' : 'MISSING',
            EMAIL_PASS: hasEmailPass ? 'SET' : 'MISSING',
            STRIPE_SECRET_KEY: hasStripeKey ? 'SET' : 'MISSING',
            CLIENT_URL: hasClientUrl ? 'SET' : 'MISSING',
        },
        nodeVersion: process.version,
    });
}
