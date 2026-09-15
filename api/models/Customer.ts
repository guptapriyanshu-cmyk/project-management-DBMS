import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  loyaltyPoints: { type: Number, default: 0 },
  status: { type: String, default: 'Active' },
}, { timestamps: true });

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
export default Customer as mongoose.Model<any>;

