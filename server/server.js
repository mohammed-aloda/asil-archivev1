require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Email Configuration
const nodemailer = require('nodemailer');
const multer = require('multer');

// Configure Multer (Memory Storage for attachments)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Routes
app.get('/', (req, res) => {
    res.send("ASIL API is running...");
});

// Create Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { cart, currency = 'CAD' } = req.body; // Default to CAD

        if (!cart || cart.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const exchangeRate = currency === 'CAD' ? 1.40 : 1;

        // Map cart items to Stripe line items
        const lineItems = cart.map((item) => ({
            price_data: {
                currency: currency.toLowerCase(),
                product_data: {
                    name: item.name,
                    description: `${item.size} - ${item.category}`,
                },
                // Convert price to currency, then to cents
                unit_amount: Math.round(item.price * exchangeRate * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/#/shop?success=true`, // Redirect to Shop with success flag
            cancel_url: `${process.env.CLIENT_URL}/#/checkout?canceled=true`,
            shipping_address_collection: {
                allowed_countries: ['CA', 'US', 'GB', 'FR', 'AE', 'SA', 'QA'], // Added common regions, customize as needed
            },
            phone_number_collection: {
                enabled: true,
            },
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Sync Product to Stripe
app.post('/api/products/sync-stripe', async (req, res) => {
    try {
        const product = req.body;

        // 1. Create Product in Stripe
        const stripeProduct = await stripe.products.create({
            name: product.name,
            description: product.description,
            // Stripe requires public URLs. If localhost, send empty array to avoid error.
            // images: (product.image && !product.image.includes('localhost') && product.image.startsWith('http')) ? [product.image] : [],
            images: [], // TEMPORARY FIX: Disable images to prevent "Invalid URL" errors during dev
        });

        // 2. Create Price in Stripe
        const stripePrice = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: Math.round(product.price * 100), // Convert to cents
            currency: 'cad', // Defaulting to CAD for now as per previous context
        });

        res.json({
            stripeProductId: stripeProduct.id,
            stripePriceId: stripePrice.id
        });
    } catch (error) {
        console.error("Stripe Sync Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Send Custom Request Email
app.post('/api/send-request', upload.array('files'), async (req, res) => {
    try {
        const { name, idea } = req.body;
        const files = req.files;

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
            attachments: files.map(file => ({
                filename: file.originalname,
                content: file.buffer
            }))
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
