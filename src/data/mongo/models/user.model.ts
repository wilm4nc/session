import mongoose from 'mongoose';


const userSchema = new mongoose.Schema( {

  name: {
    type: String,
    required: [ true, 'Name is required' ]
  },
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: true,
    trim: true,
    lowercase: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ]
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE','USER_ROLE']
  },
  permissions: {
    type: [String], // Array para permisos específicos
    default: []
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Referencia a la colección de empresas
  },
  lastLogin: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }

} );

// Middleware para actualizar el campo `updatedAt` en cada actualización del documento
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});




export const UserModel = mongoose.model('User', userSchema);

