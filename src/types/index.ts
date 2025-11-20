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
  status?: 'completed' | 'in-progress' | 'planned'
  role?: string
  teamSize?: number
  startDate?: Date
  endDate?: Date
  challenges?: string[]
  solutions?: string[]
  outcomes?: string[]
  order?: number
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
  description?: string
  projects?: string[]
  order?: number
  tags?: string[]
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
  status?: 'active' | 'expired' | 'in-progress'
  featured?: boolean
  order?: number
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
