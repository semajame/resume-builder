export interface Resume {
  id: string
  name: string
  email: string
  summary: string
  location: string
  phone?: string
  education: Record<string, any>[]
  experience: Record<string, any>[]
  skills: string[]
  certifications: string
  projects: string
  created_at: string
}
