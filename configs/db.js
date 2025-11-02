import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('databse is connected'))
        await mongoose.connect(`${process.env.MONGODB_URL}/DepartmentProject`);
    } catch (error) {
        console.log(error.message)
    }
};

export default connectDB
