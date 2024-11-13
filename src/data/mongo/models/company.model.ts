import mongoose, { Schema } from 'mongoose';


const companySchema = new mongoose.Schema({
  nit: {
    type: String,
    required: [true, 'Company nit is required']
  },
  
  name: {
    type: String,
    required: [true, 'Company name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  // Referencia a los planes de suscripción
  subscriptionPlan: {    
    type: Schema.Types.ObjectId,
    ref: 'SubscriptionPlan',
    required: false,
  },

  // Referencia a los estados de suscripción
  subscriptionStatus: {
    type: String,
    ref: 'SubscriptionStatus',
    enum: ['ACTIVE', 'EXPIRED', 'PENDING'], // Definir los posibles estados directamente
    required: true,
    default: 'PENDING',
  },
  subscriptionPaymentDate: {
    type: Date,
  },
  subscriptionExpiresAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },  
  
  user: {    
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

// Middleware para actualizar el campo `updatedAt` en cada modificación del documento
companySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Método para verificar si la suscripción está activa
companySchema.methods.isSubscriptionActive = function() {
  // Aquí puedes implementar la lógica basada en el estado referenciado
  return this.subscriptionExpiresAt > new Date();
};

export const CompanyModel = mongoose.model('Company', companySchema);