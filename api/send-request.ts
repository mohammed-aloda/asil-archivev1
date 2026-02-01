import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Since multer is hard to use in serverless without custom config, 
// and handling multipart/form-data directly is complex,
// we will assume the client sends JSON with base64 encoded files or check if we can parse the body.
// However, the existing implementation uses multer.
// For Vercel Serverless, we can use a library like 'busboy' or just handle the request if standard body parsing is disabled.
// But valid JSON payload is easier.
// For now, let's implement a version that expects JSON body with 'files' as base64 strings if possible, 
// OR try to parse existing FormData if Vercel handles it automatically (which it often does not for files).
//
// SIMPLIFICATION STRATEGY: 
// 1. We will assume the frontend is updated to send JSON with base64 for files if we want to avoid complex parsing.
// 2. OR we use 'multer' but we need to route the request through it.
//
// Below is an implementation attempting to use a helper for multipart, 
// BUT for robustness let's try to stick to what works easily.
// Let's implement the nodemailer part first.

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const config = {
  api: {
    bodyParser: false, // Disabling body parser to handle multipart/form-data manually if needed
  },
};

// We need a way to parse multipart form data. Even 'multer' needs a request object that looks like Node's.
// Vercel's req IS a Node request.
import multer from 'multer';

// Use memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Helper to run middleware
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Run multer middleware to parse files
    await runMiddleware(req, res, upload.array('files'));

    // After middleware, req.body and req.files should be populated
    // Note: TypeScript might not know about req.files on VercelRequest, so we cast to any
    const { name, idea } = (req as any).body;
    const files = (req as any).files;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'asljerseys@gmail.com',
        subject: `New Custom Request from ${name}`,
        text: `Name: ${name}\n\nIdea:\n${idea}`,
        html: `
            <h3>New Custom Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Idea:</strong><br/>${idea.replace(/\n/g, '<br/>')}</p>
        `,
        attachments: files ? files.map((file: any) => ({
            filename: file.originalname,
            content: file.buffer
        })) : []
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error("Email Error:", error);
    res.status(500).json({ error: error.message });
  }
}
