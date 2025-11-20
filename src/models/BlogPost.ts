import mongoose, { Schema, Model } from 'mongoose'
import { BlogPost } from '@/types'

const BlogPostSchema = new Schema<BlogPost>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: Number, required: true },
    tags: [{ type: String }],
    coverImage: { type: String, required: true },
    published: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

export const BlogPostModel: Model<BlogPost> =
  mongoose.models.BlogPost || mongoose.model<BlogPost>('BlogPost', BlogPostSchema)
