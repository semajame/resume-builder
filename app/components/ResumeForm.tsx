'use client'

import { useState } from 'react'
import { Ellipsis } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PdfDialog } from './PdfDialog'

export default function ResumeForm() {
  const [resume, setResume] = useState<{
    name: string
    email: string
    phone: string
    education: {
      school: string
      program: string
      start_date: string
      end_date: string
      isPresent: boolean
    }[]
    experience: {
      company: string
      position: string
      start_date: string
      end_date: string
      job_description: string
      isPresent: boolean
    }[]
    skills: string[] // ✅ Changed to an array
    summary: string
    location: string
    certificates: { name: string; issued_by: string; date: string }[] // ✅ Changed to an array of objects
    projects: { title: string; description: string; link?: string }[] // ✅ Changed to an array of objects
  }>({
    name: '',
    email: '',
    phone: '',
    education: [],
    experience: [],
    skills: [], // ✅ Now correctly an array
    summary: '',
    location: '',
    certificates: [], // ✅ Now correctly an array
    projects: [], // ✅ Now correctly an array
  })

  const [experience, setExperience] = useState({
    company: '',
    position: '',
    start_date: '',
    end_date: '',
    job_description: '',
    isPresent: false,
  })

  const [education, setEducation] = useState({
    school: '',
    program: '',
    start_date: '',
    end_date: '',
    isPresent: false,
  })

  const [projects, setProjects] = useState({
    title: '',
    description: '',
    link: '',
  })

  const [certificates, setCertificates] = useState({
    name: '',
    issued_by: '',
    date: '',
  })

  const [skillInput, setSkillInput] = useState('') // State for input field

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResume({ ...resume, [e.target.name]: e.target.value })
  }

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked // Type assertion

    setExperience((prev) => {
      let newEndDate = prev.end_date

      // If the user is typing in the end_date, don't override it immediately
      if (name === 'end_date' && !prev.isPresent) {
        newEndDate = value
      }

      // If the user checks the "Currently Working Here" checkbox, set end_date to "Present"
      if (name === 'isPresent') {
        newEndDate = checked ? 'Present' : ''
      }

      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        end_date: newEndDate,
      }
    })
  }

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked // Type assertion

    setEducation((prev) => {
      let newEndDate = prev.end_date

      if (name === 'end_date' && !prev.isPresent) {
        newEndDate = value
      }

      if (name === 'isPresent') {
        newEndDate = checked ? 'Present' : ''
      }

      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        end_date: newEndDate,
      }
    })
  }

  const handleProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProjects((prev) => ({
      ...prev,
      [name]: value, // ✅ Dynamically update the correct field
    }))
  }

  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCertificates((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ADD CERTFICATE
  const addCertificate = () => {
    if (
      !certificates.name.trim() ||
      !certificates.issued_by.trim() ||
      !certificates.date.trim()
    )
      return

    setResume((prev) => ({
      ...prev,
      certificates: [...prev.certificates, certificates], // Append the new certificate
    }))

    // Reset input fields
    setCertificates({ name: '', issued_by: '', date: '' })
  }

  // ADD PROJECTS
  const addProject = () => {
    if (!projects.title.trim() || !projects.description.trim()) return // Prevent empty input

    setResume((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...projects }], // ✅ Ensure a new object is added
    }))

    // Reset input fields after adding
    setProjects({ title: '', description: '', link: '' })
  }

  // ADD EXPERIENCE
  const addExperience = () => {
    if (experience.company && experience.position) {
      setResume((prev) => ({
        ...prev,
        experience: [...prev.experience, experience], // Append experience
      }))
      setExperience({
        company: '',
        position: '',
        start_date: '',
        end_date: '',
        job_description: '',
        isPresent: false, // ✅ Reset to false
      }) // Reset input fields
    }
  }

  // ADD EDUCATION
  const addEducation = () => {
    if (education.school && education.program) {
      setResume((prev) => ({
        ...prev,
        education: [...prev.education, education], // ✅ Append education correctly
      }))
      setEducation({
        school: '',
        program: '',
        start_date: '',
        end_date: '',
        isPresent: false,
      })
    }
  }

  // ADD SKILLS
  const addSkills = () => {
    if (!skillInput.trim()) return // Prevent empty input

    // Split input by commas, trim spaces, and filter out empty values
    const newSkills = skillInput
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill && !resume.skills.includes(skill.toLowerCase()))

    if (newSkills.length > 0) {
      setResume((prev) => ({
        ...prev,
        skills: [...prev.skills, ...newSkills], // Append new skills
      }))
    }

    setSkillInput('') // Clear input field
  }
  const removeItem = (field: keyof typeof resume, index: number) => {
    setResume((prev) => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? (prev[field] as any[]).filter((_, i) => i !== index) // Only apply filter if it's an array
        : prev[field], // Keep the value unchanged if it's not an array
    }))
  }

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'Present') return dateString

    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className='md:flex min-h-screen gap-5 md:flex-between '>
      {/* FORM */}
      <div className='w-full md:w-2/5 space-y-4 flex flex-col justify-between'>
        <Tabs defaultValue='personal' className='w-full'>
          <TabsList className='w-full flex md:justify-between '>
            <TabsTrigger value='personal' className='w-full '>
              Personal
            </TabsTrigger>
            <TabsTrigger value='experience' className='w-full'>
              {' '}
              Experience
            </TabsTrigger>
            <TabsTrigger value='education' className='w-full'>
              Education
            </TabsTrigger>

            <DropdownMenu>
              <DropdownMenuTrigger>
                {' '}
                <Ellipsis className='w-[80px]' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className=' border-none flex flex-col gap-2 mt-2 bg-gray-100  dark:bg-zinc-800'>
                <TabsTrigger
                  value='skills'
                  className='w-full border-none text-gray-500 dark:text-gray-300'
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value='projects'
                  className='w-full border-none bg-transparent text-gray-500 dark:text-gray-300'
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value='certificates'
                  className='w-full border-none bg-transparent text-gray-500 dark:text-gray-300'
                >
                  Certificates
                </TabsTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </TabsList>

          {/* Personal Tab */}
          <TabsContent value='personal' className='space-y-4'>
            <h1 className='text-2xl font-medium my-5'>Personal Information</h1>
            <div>
              <Label>Full Name</Label>
              <Input
                type='text'
                name='name'
                placeholder='John Doe'
                value={resume.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type='email'
                name='email'
                placeholder='johndoe@example.com'
                value={resume.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                type='tel'
                name='phone'
                placeholder='+1234567890'
                value={resume.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type='text'
                name='location'
                placeholder='New York, USA'
                value={resume.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Summary</Label>
              <Textarea
                name='summary'
                className='h-[100px]'
                placeholder='Briefly introduce yourself...'
                value={resume.summary}
                onChange={handleChange}
                required
              />
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value='experience' className='space-y-4 '>
            <h1 className='text-2xl font-medium my-5'>Experience</h1>
            <div>
              <Label>Company</Label>
              <Input
                type='text'
                name='company'
                placeholder='Google, Microsoft, etc.'
                value={experience.company}
                onChange={handleExperienceChange}
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type='text'
                name='position'
                placeholder='Software Engineer, Manager, etc.'
                value={experience.position}
                onChange={handleExperienceChange}
              />
            </div>
            <div className='flex gap-4 flex-col md:flex-row'>
              <div>
                <Label>Start Date</Label>
                <Input
                  type='date'
                  name='start_date'
                  value={experience.start_date}
                  onChange={handleExperienceChange}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type='date'
                  name='end_date'
                  value={experience.isPresent ? 'Present' : experience.end_date}
                  onChange={handleExperienceChange}
                  disabled={experience.isPresent}
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='terms1'
                name='isPresent'
                checked={experience.isPresent}
                onCheckedChange={(checked) =>
                  setExperience((prev) => ({
                    ...prev,
                    isPresent: checked as boolean,
                    end_date: checked ? 'Present' : '',
                  }))
                }
              />
              <Label htmlFor='terms1'>Currently Working Here</Label>
            </div>
            <div>
              <Label>Job Description</Label>
              <Textarea
                name='job_description'
                placeholder='Describe your responsibilities...'
                className='h-[100px]'
                value={experience.job_description}
                onChange={handleExperienceChange}
              />
            </div>
            <Button
              type='button'
              onClick={addExperience}
              aria-label='Add Experience'
            >
              Add Experience
            </Button>

            {resume.experience.length > 0 && (
              <div className='mt-4'>
                <h2 className='font-semibold'>Added Experiences</h2>
                {resume.experience.map((exp, index) => (
                  <div key={index} className='border p-2 mt-2 rounded-md'>
                    <p>
                      <strong>{exp.company}</strong> - {exp.position}
                    </p>
                    <p className='text-sm'>
                      {exp.start_date} to {exp.end_date}
                    </p>
                    <p className='text-sm'>{exp.job_description}</p>
                    <Button
                      onClick={() => removeItem('experience', index)}
                      className='bg-red-600  text-white my-2 hover:bg-red-700'
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value='education' className='space-y-4'>
            <h1 className='text-2xl font-medium my-5'>Education</h1>
            <div>
              <Label>School</Label>
              <Input
                type='text'
                name='school'
                placeholder='Harvard University, Stanford, etc.'
                value={education.school}
                onChange={handleEducationChange}
              />
            </div>
            <div>
              <Label>Program</Label>
              <Input
                type='text'
                name='program'
                placeholder='Computer Science, Business, etc.'
                value={education.program}
                onChange={handleEducationChange}
              />
            </div>
            <div className='flex gap-4 flex-col md:flex-row'>
              <div>
                <Label>Start Date</Label>
                <Input
                  type='date'
                  name='start_date'
                  value={education.start_date}
                  onChange={handleEducationChange}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type='date'
                  name='end_date'
                  value={education.isPresent ? 'Present' : education.end_date}
                  onChange={handleEducationChange}
                  disabled={education.isPresent}
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='education-present'
                name='isPresent'
                checked={education.isPresent}
                onCheckedChange={(checked) =>
                  setEducation((prev) => ({
                    ...prev,
                    isPresent: checked as boolean,
                    end_date: checked ? 'Present' : '',
                  }))
                }
              />
              <Label htmlFor='education-present'>Currently Studying Here</Label>
            </div>
            <Button
              type='button'
              onClick={addEducation}
              aria-label='Add Education'
            >
              Add Education
            </Button>

            {/* Display Added Skills */}
            {resume.education.length > 0 && (
              <ul className='flex flex-col gap-2 '>
                {resume.education.map((edu, index) => (
                  <li
                    key={index}
                    className='flex justify-between border items-center p-2 rounded-md gap-2'
                  >
                    <div>
                      <strong>{edu.school}</strong>
                      <p>{edu.program}</p>
                    </div>
                    <Button
                      onClick={() => removeItem('education', index)}
                      className='bg-red-600 dark:text-white hover:bg-red-700'
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value='skills' className='space-y-4'>
            <h1 className='text-2xl font-medium my-5'>Skills</h1>

            {/* Skill Input */}
            <div>
              <Label>Skill</Label>
              <Input
                type='text'
                name='skill'
                placeholder='Skill'
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)} // ✅ Correct input handling
              />
            </div>

            {/* Add Skill Button */}
            <Button type='button' onClick={addSkills} aria-label='Add Skill'>
              Add Skill
            </Button>

            {/* Display Added Skills */}
            {resume.skills.length > 0 && (
              <ul className='flex flex-col gap-2 '>
                {resume.skills.map((skill, index) => (
                  <li
                    key={index}
                    className='flex justify-between border items-center p-2 rounded-md'
                  >
                    {skill}
                    <Button
                      onClick={() => removeItem('skills', index)}
                      className='bg-red-600 dark:text-white hover:bg-red-700'
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value='projects' className='space-y-4'>
            <h1 className='text-2xl font-medium my-5'>Projects</h1>

            {/* Project Input */}
            <div>
              <Label>Title</Label>
              <Input
                type='text'
                name='title'
                value={projects.title}
                placeholder='e.g., Portfolio Website'
                onChange={handleProjectChange}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                name='description'
                value={projects.description}
                placeholder='Briefly describe your project'
                onChange={handleProjectChange}
                required
              />
            </div>

            <div>
              <Label>Link</Label>
              <Input
                type='text'
                name='link'
                value={projects.link}
                placeholder='e.g., https://myproject.com'
                onChange={handleProjectChange}
              />
            </div>

            {/* Add Project Button */}
            <Button type='button' onClick={addProject} aria-label='Add Project'>
              Add Project
            </Button>

            {resume.projects.length > 0 && (
              <div className='mt-4'>
                <h2 className='font-semibold'>Added Projects</h2>
                {resume.projects.map((project, index) => (
                  <div key={index} className='border p-2 mt-2 rounded-md'>
                    <p>
                      <strong>{project.title}</strong>
                    </p>

                    <p className='text-sm'>{project.description}</p>
                    <div className='flex justify-between items-center'>
                      {project.link && (
                        <a
                          href={project.link}
                          target='_blank'
                          className='text-blue-500 text-sm'
                        >
                          View Project
                        </a>
                      )}
                      <Button
                        onClick={() => removeItem('projects', index)}
                        className='bg-red-600 dark:text-white hover:bg-red-700'
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Certifcates Tab */}
          <TabsContent value='certificates' className='space-y-4'>
            <h1 className='text-2xl font-medium my-5'>Certificate</h1>
            <div>
              <Label>Certificate Name</Label>
              <Input
                type='text'
                name='name'
                value={certificates.name}
                onChange={handleCertificateChange}
                placeholder='e.g., AWS Certified Developer'
              />
            </div>

            <div>
              <Label>Issued By</Label>
              <Input
                type='text'
                name='issued_by'
                value={certificates.issued_by}
                onChange={handleCertificateChange}
                placeholder='e.g., Amazon Web Services'
              />
            </div>

            <div>
              <Label>Date</Label>
              <Input
                type='date'
                name='date'
                value={certificates.date}
                onChange={handleCertificateChange}
              />
            </div>

            <Button
              type='button'
              onClick={addCertificate}
              aria-label='Add Certificate'
            >
              Add Certificate
            </Button>

            {resume.certificates.length > 0 && (
              <div className='mt-4'>
                <h2 className='font-semibold'>Added Certificates</h2>
                {resume.certificates.map((cert, index) => (
                  <div key={index} className='border p-2 mt-2 rounded-md'>
                    <p>
                      <strong>{cert.name}</strong> - {cert.issued_by}
                    </p>
                    <p className='text-sm'>{cert.date}</p>
                    <Button
                      onClick={() => removeItem('certificates', index)}
                      className='bg-red-600 my-2 dark:text-white hover:bg-red-700'
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <PdfDialog resume={resume} />
      </div>

      {/* LIVE PREVIEW */}
      <div className='w-full md:w-3/5 border p-10 rounded-md h-auto times'>
        {resume.name || resume.email || resume.phone || resume.location ? (
          <>
            <h2 className='text-lg font-semibold'>{resume.name || ''}</h2>
            <p className='text-sm'>
              {resume.email || ''} {resume.email && resume.phone ? '|' : ''}{' '}
              {resume.phone || ''} {resume.phone && resume.location ? '|' : ''}{' '}
              {resume.location || ''}
            </p>
          </>
        ) : null}

        {resume.summary && <p className='text-sm my-4'>{resume.summary}</p>}

        {resume.experience.length > 0 && (
          <>
            <h2 className='font-semibold mt-4 text-xl'>EXPERIENCE</h2>
            <hr className='mt-2 mb-5' />
            <div className='flex flex-col gap-2'>
              {resume.experience.map((exp, index) => (
                <div key={index} className='text-md'>
                  <div>
                    <div className='flex justify-between'>
                      <p>
                        <strong>{exp.company}</strong> - {exp.position}
                      </p>
                      <p>
                        {formatDate(exp.start_date)} -{' '}
                        {exp.isPresent ? 'Present' : formatDate(exp.end_date)}
                      </p>
                    </div>
                    <p>{exp.job_description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {resume.education.length > 0 && (
          <>
            <h2 className='font-semibold mt-4 text-xl'>EDUCATION</h2>
            <hr className='mt-2 mb-5' />
            <div className='flex flex-col gap-2'>
              {resume.education.map((edu, index) => (
                <div key={index} className='text-md'>
                  <div>
                    <div className='flex justify-between'>
                      <p>
                        <strong>{edu.school}</strong> - {edu.program}
                      </p>
                      <p>
                        {formatDate(edu.start_date)} -{' '}
                        {edu.isPresent ? 'Present' : formatDate(edu.end_date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {resume.skills.length > 0 && (
          <>
            <h2 className='font-semibold mt-4 text-xl'>SKILLS</h2>
            <hr className='mt-2 mb-5' />
            <p className='text-sm'>{resume.skills.join(', ')}</p>
          </>
        )}

        {resume.projects.length > 0 && (
          <>
            <h2 className='font-semibold mt-4 text-xl'>PROJECTS</h2>
            <hr className='mt-2 mb-5' />
            <p className='text-md'>
              {resume.projects.map((project, index) => (
                <span key={index} className='block'>
                  <strong>{project.title}</strong>: {project.description}
                  {project.link && (
                    <>
                      {' '}
                      <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 underline'
                      >
                        {project.link}
                      </a>
                    </>
                  )}
                </span>
              ))}
            </p>
          </>
        )}

        {resume.certificates.length > 0 && (
          <>
            <h2 className='font-semibold mt-4 text-xl'>CERTIFICATES</h2>
            <hr className='mt-2 mb-5' />
            <div className='text-md'>
              {resume.certificates.map((cert, index) => (
                <p key={index}>
                  <span className='font-medium'>{cert.name}</span> –{' '}
                  {cert.issued_by} ({cert.date})
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
