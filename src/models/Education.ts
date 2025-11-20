import mongoose, { Schema, model, models } from 'mongoose';

// Education Schema - Educación
const EducationSchema = new Schema({
  degree: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  location: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  graduationYear: String,
  gpa: Number,
  honors: String,
  description: String,
  achievements: [String],
  relevantCourses: [String],
  order: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Index for ordering
EducationSchema.index({ endDate: -1 });
EducationSchema.index({ order: 1 });

const Education = models.Education || model('Education', EducationSchema);

export default Education;
