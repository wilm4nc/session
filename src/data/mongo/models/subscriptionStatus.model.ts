import mongoose from 'mongoose';
const subscriptionStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    unique: true,
    enum: ['ACTIVE', 'EXPIRED', 'PENDING'],
  },
  description: {
    type: String,
  }
});

export const SubscriptionStatusModel = mongoose.model('SubscriptionStatus', subscriptionStatusSchema);