import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";
import clerkWebhookRouter from "./routes/webhook.js";

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => res.send("✅ Server is running"));

// Clerk webhook route → Inngest trigger করে
app.use("/api/webhooks", clerkWebhookRouter);

// Inngest route → functions serve করার জন্য
app.use("/api/inngest", serve({ client: inngest, functions }));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
