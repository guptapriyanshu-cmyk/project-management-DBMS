import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  deliveryTime: { type: String, required: true },
}, { timestamps: true });

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
export default Supplier as mongoose.Model<any>;
