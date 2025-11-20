import mongoose, { Schema, Model } from 'mongoose'
import { Certification } from '@/types'

const CertificationSchema = new Schema<Certification>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, required: true },
    expiryDate: { type: String },
    credentialId: { type: String },
    credentialUrl: { type: String },
    description: { type: String, required: true },
    skills: [{ type: String }],
    image: { type: String },
    status: {
      type: String,
      enum: ['active', 'expired', 'in-progress'],
      default: 'active'
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

// Indexes
CertificationSchema.index({ issuer: 1 });
CertificationSchema.index({ featured: 1, order: 1 });
CertificationSchema.index({ status: 1 });

export const CertificationModel: Model<Certification> =
  mongoose.models.Certification ||
  mongoose.model<Certification>('Certification', CertificationSchema)
