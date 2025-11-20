import mongoose, { Schema, model, models } from 'mongoose';

// About Schema - Secciones de "About Me"
const AboutSchema = new Schema({
  section: {
    type: String,
    required: true,
    enum: ['intro', 'background', 'interests', 'goals', 'values'],
  },
  title: String,
  content: {
    type: String,
    required: true,
  },
  highlights: [String],
  order: {
    type: Number,
    default: 0,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Index for ordering and filtering
AboutSchema.index({ section: 1, order: 1 });
AboutSchema.index({ visible: 1 });

const About = models.About || model('About', AboutSchema);

export default About;
