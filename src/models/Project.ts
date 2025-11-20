import mongoose, { Schema, Model } from 'mongoose'
import { Project } from '@/types'

const ProjectSchema = new Schema<Project>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    technologies: [{ type: String }],
    image: { type: String, required: true },
    images: [{ type: String }],
    githubUrl: { type: String },
    liveUrl: { type: String },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { 
      type: String, 
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed'
    },
    role: { type: String },
    teamSize: { type: Number },
    challenges: [{ type: String }],
    solutions: [{ type: String }],
    outcomes: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

// Indexes para búsquedas eficientes
ProjectSchema.index({ featured: 1, order: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ technologies: 1 });

export const ProjectModel: Model<Project> =
  mongoose.models.Project || mongoose.model<Project>('Project', ProjectSchema)
