import mongoose, { Schema, model, models } from 'mongoose';

// Profile Schema - Información personal principal
const ProfileSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  location: {
    city: String,
    country: String,
    full: String,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: String,
  },
  socialMedia: {
    github: String,
    linkedin: String,
    twitter: String,
    portfolio: String,
  },
  availability: {
    status: {
      type: String,
      enum: ['available', 'not-available', 'limited'],
      default: 'available',
    },
    openTo: [String], // ['freelance', 'full-time', 'consulting']
  },
  stats: {
    yearsExperience: Number,
    projectsCompleted: Number,
    clientsServed: Number,
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

// Index for faster queries
ProfileSchema.index({ email: 1 });

const Profile = models.Profile || model('Profile', ProfileSchema);

export default Profile;
