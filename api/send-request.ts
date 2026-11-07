import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { rejectBadPost } from './_lib/security.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB (Vercel caps request bodies at ~4.5MB)
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif', 'application/pdf'];

// Use memory storage with limits so the endpoint can't be abused with huge or dangerous uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: MAX_FILES, fileSize: MAX_FILE_SIZE, fields: 10, fieldSize: 20000 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only images or PDF files can be attached.'));
  },
});

// Escape user input before putting it into the HTML email
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanFilename(name: string): string {
  return String(name || 'attachment').replace(/[^\w.\- ]+/g, '_').slice(0, 100);
}

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
  // 5 requests per hour per IP (stops spam floods to the inbox)
  if (rejectBadPost(req, res, { name: 'send-request', limit: 5, windowMs: 60 * 60 * 1000 })) return;

  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing EMAIL_USER or EMAIL_PASS environment variables');
    return res.status(500).json({
      error: 'Email service not configured. Please contact the administrator.'
    });
  }

  try {
    // Create transporter inside handler to ensure env vars are available
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Run multer middleware to parse files
    try {
      await runMiddleware(req, res, upload.array('files', MAX_FILES));
    } catch (uploadError: any) {
      const msg = uploadError?.code === 'LIMIT_FILE_SIZE'
        ? 'Each file must be under 4MB.'
        : uploadError?.code === 'LIMIT_FILE_COUNT'
          ? `You can attach up to ${MAX_FILES} files.`
          : uploadError?.message === 'Only images or PDF files can be attached.'
            ? uploadError.message
            : 'Could not read the uploaded files.';
      return res.status(400).json({ error: msg });
    }

    const body = (req as any).body || {};
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
    const idea = typeof body.idea === 'string' ? body.idea.trim().slice(0, 5000) : '';
    const files = ((req as any).files || []) as any[];

    // Honeypot: real visitors never see or fill the "website" field; bots do.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return res.status(200).json({ message: 'Email sent successfully' });
    }

    if (!name || !idea) {
      return res.status(400).json({ error: 'Name and idea are required.' });
    }

    // Strip line breaks so the name can't inject extra email headers
    const safeSubjectName = name.replace(/[\r\n]+/g, ' ');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'asljerseys@gmail.com',
      subject: `New Custom Request from ${safeSubjectName}`,
      text: `Name: ${name}\n\nIdea:\n${idea}`,
      html: `
        <h3>New Custom Request</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Idea:</strong><br/>${escapeHtml(idea).replace(/\n/g, '<br/>')}</p>
      `,
      attachments: files.map((file: any) => ({
        filename: cleanFilename(file.originalname),
        content: file.buffer
      }))
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error("Email Error:", error);
    res.status(500).json({ error: 'Could not send your request. Please try again later.' });
  }
}
