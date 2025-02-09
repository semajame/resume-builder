export interface Resume {
  id: string
  name: string
  email: string
  summary: string
  location: string
  phone?: string
  education: Record<string, any>[]
  experience: Record<string, any>[]
  skills: Record<string, any>[]
  certifications: Record<string, any>[]
  projects: Record<string, any>[]
  created_at: string
  isPresent: boolean // ✅ Change from `false` to `boolean`
}
