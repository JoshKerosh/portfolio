import mongoose, { Schema, model, models } from 'mongoose';

// Experience Schema - Experiencia laboral
const ExperienceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: String,
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
    default: 'full-time',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date, // null si es trabajo actual
  current: {
    type: Boolean,
    default: false,
  },
  duration: String, // "6 months", "1 year"
  description: {
    type: String,
    required: true,
  },
  responsibilities: [String],
  achievements: [String],
  technologies: [String],
  order: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Index for ordering by date
ExperienceSchema.index({ startDate: -1 });
ExperienceSchema.index({ order: 1 });

const Experience = models.Experience || model('Experience', ExperienceSchema);

export default Experience;
