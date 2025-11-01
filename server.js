// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { inngest, functions } from './inngest/index.js';
import { serve } from 'inngest/express';

const app = express();

// Connect to MongoDB
await connectDB();

app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => res.send('Server is running'));

// Inngest routes
app.use('/api/inngest', serve({ client: inngest, functions }));

// Export the app instead of listening
export default app;
