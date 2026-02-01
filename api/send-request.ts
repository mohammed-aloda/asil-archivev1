import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    await runMiddleware(req, res, upload.array('files'));

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
        <p><strong>Idea:</strong><br/>${idea ? idea.replace(/\n/g, '<br/>') : ''}</p>
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
