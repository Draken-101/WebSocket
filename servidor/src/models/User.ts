
import bcrypt from 'bcryptjs';

import { Schema, model, Document } from "mongoose";

interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    roles: string[]; 
}

const userSchema = new Schema<UserDocument>({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true 
    },
    password:{
        type:String,
        required: true
    },
    roles:[{
        ref: "Role",
        type:Schema.Types.ObjectId
    }]
});

userSchema.statics.encryptPassword = async (password) => { 
const salt = await bcrypt.genSalt(10)
 return await bcrypt.hash(password, salt)

}

userSchema.statics.comparePassword = async (password , receivedPassword) =>{
   return await bcrypt.compare(password , receivedPassword)

}

export default model<UserDocument>('User', userSchema);