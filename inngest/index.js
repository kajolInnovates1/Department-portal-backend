import { Inngest } from "inngest";
import connectDB from "../configs/db.js";
import User from "../models/User.js";

// Create the Inngest client
export const inngest = new Inngest({ id: "department-portal-app" });

/* ===========================================================
   🧩 1. USER CREATE FUNCTION
   =========================================================== */
const syncUserCreation = inngest.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event, step }) => {
        console.log("🔥 Inngest triggered: clerk/user.created");

        // ✅ Ensure MongoDB connection
        await connectDB();

        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        let username = email_addresses[0].email_address.split("@")[0];

        // Check existing username
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            username += Math.floor(Math.random() * 10000);
        }

        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            full_name: `${first_name} ${last_name}`,
            profile_picture: image_url,
            username,
        };

        try {
            await User.create(userData);
            console.log("✅ User created in MongoDB:", userData.email);
        } catch (err) {
            console.error("❌ User creation failed:", err.message);
        }
    }
);

/* ===========================================================
   🧩 2. USER UPDATE FUNCTION
   =========================================================== */
const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event, step }) => {
        console.log("🟡 Inngest triggered: clerk/user.updated");

        // ✅ Ensure MongoDB connection
        await connectDB();

        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const updatedUserData = {
            email: email_addresses[0].email_address,
            full_name: `${first_name} ${last_name}`,
            profile_picture: image_url,
        };

        try {
            await User.findByIdAndUpdate(id, updatedUserData);
            console.log("🟡 User updated:", id);
        } catch (err) {
            console.error("❌ User update failed:", err.message);
        }
    }
);

/* ===========================================================
   🧩 3. USER DELETE FUNCTION
   =========================================================== */
const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-with-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event, step }) => {
        console.log("🗑️ Inngest triggered: clerk/user.deleted");

        // ✅ Ensure MongoDB connection
        await connectDB();

        const { id } = event.data;

        try {
            await User.findByIdAndDelete(id);
            console.log("🗑️ User deleted:", id);
        } catch (err) {
            console.error("❌ User deletion failed:", err.message);
        }
    }
);

// Export all functions together
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
