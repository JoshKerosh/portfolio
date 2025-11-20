export interface Project {
  _id?: string
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  images?: string[]
  githubUrl?: string
  liveUrl?: string
  category: string
  featured: boolean
  createdAt?: Date
}

export interface BlogPost {
  _id?: string
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readTime: number
  tags: string[]
  coverImage: string
  published: boolean
  createdAt?: Date
}

export interface Skill {
  _id?: string
  id: string
  name: string
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Languages'
  level: number
  icon?: string
  yearsOfExperience?: number
  featured: boolean
  createdAt?: Date
}

export interface Certification {
  _id?: string
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  description: string
  skills: string[]
  image?: string
  createdAt?: Date
}

export interface ContactMessage {
  _id?: string
  name: string
  email: string
  subject: string
  message: string
  createdAt?: Date
}
