import express from "express";
import { inngest } from "../inngest/index.js";

const router = express.Router();

router.post("/clerk", async (req, res) => {
    const event = req.body;
    console.log("📩 Clerk webhook received:", event.type);

    try {
        await inngest.send({
            name: `clerk/${event.type}`, // clerk.user.created → clerk/user.created
            data: event.data,
        });

        res.status(200).json({ received: true });
    } catch (err) {
        console.error("❌ Failed to send event to Inngest:", err.message);
        res.status(500).json({ error: "Failed to forward event" });
    }
});

export default router;
