import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    __id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { typeObject, default: {} }
}, { minimize: false })

const user = mongoose.models.user || mongoose.model('user', userSchema)


export default user