import mongoose, { Document, Schema } from "mongoose";


export interface User extends Document {
    name: string;
    email: string;
    password: string;
}
const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
}, { timestamps: true })

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel