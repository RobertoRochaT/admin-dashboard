import mongoose from 'mongoose';

const ConsultSchema = new mongoose.Schema({
    user: { type: String, required: true },
    query: { type: String, required: true },
    responseTime: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Campo para la fecha de consulta
});

const Consults = mongoose.model('Consults', ConsultSchema);

export default Consults;
