import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

const Sale = mongoose.models.Sale || mongoose.model('Sale', saleSchema);
export default Sale as mongoose.Model<any>;

