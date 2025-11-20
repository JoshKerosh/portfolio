import mongoose, { Schema, Model } from 'mongoose'
import { Skill } from '@/types'

const SkillSchema = new Schema<Skill>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Languages'],
    },
    level: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String },
    yearsOfExperience: { type: Number },
    featured: { type: Boolean, default: false },
    description: { type: String },
    projects: [{ type: String }], // IDs de proyectos donde se usó
    order: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

// Indexes para búsquedas eficientes
SkillSchema.index({ category: 1, order: 1 });
SkillSchema.index({ featured: 1 });
SkillSchema.index({ level: -1 });

export const SkillModel: Model<Skill> =
  mongoose.models.Skill || mongoose.model<Skill>('Skill', SkillSchema)
