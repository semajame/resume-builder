interface Experience {
  company: string
  position: string
  start_date: string
  end_date: string
  job_description: string
  isPresent: boolean
}

interface Education {
  school: string
  program: string
  start_date: string
  end_date: string
  isPresent: boolean
}

interface Project {
  title: string
  description: string
  link: string
}

interface Certificate {
  name: string
  issued_by: string
  date: string
}

interface ResumeData {
  name: string
  email: string
  phone: string
  location: string
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  certificates: Certificate[]
}

interface PdfDialogProps {
  resume: ResumeData
}
