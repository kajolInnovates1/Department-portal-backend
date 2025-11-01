// /api/inngest.js
import { inngest, functions } from '../inngest/index.js';
import { serve } from 'inngest/express';
import connectDB from '../configs/db.js';

// MongoDB connection before serving requests
await connectDB();

// Export default serverless handler
export default serve({ client: inngest, functions });
