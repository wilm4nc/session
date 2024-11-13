import mongoose from 'mongoose';

const subscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['FREE', 'BASIC', 'PREMIUM'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  durationInDays: {
    type: Number,
    required: true, // Ejemplo: 30 para mensual, 365 para anual, etc.
  }
});

export const SubscriptionPlanModel = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);