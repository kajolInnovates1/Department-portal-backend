import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, unique: true },
    full_name: { type: String, required: true },
    email: {
        type: String,
        required: true,

    },
    bio: { type: String, default: 'Hey there! I am using Department Portal' },
    phone: { type: String, unique: true },
    profile_picture: { type: String, default: '' },
    cover_photo: { type: String, default: '' }, // Optional: consolidate with profile_picture
    location: { type: String, default: '' },

    // Relationships: storing ObjectId references to other users
    followers: [{ type: String, ref: 'User' }],
    following: [{ type: String, ref: 'User' }],
    connections: [{ type: String, ref: 'User' }]
}, {
    timestamps: true,
    minimize: false
});

const User = mongoose.model('User', userSchema);

export default User
