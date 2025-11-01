import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";
import clerkWebhookRouter from "./routes/webhook.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("✅ Server is running"));
app.use("/api/webhooks", clerkWebhookRouter);
app.use("/api/inngest", serve({ client: inngest, functions }));

// MongoDB + Server Start
const startServer = async () => {
    await connectDB();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();

// Vercel export
export default app;
