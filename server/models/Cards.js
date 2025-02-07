import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    icon: { type: String },
    amount: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
},
    { timestamps: true }
);

export default mongoose.model('Card', CardSchema);
