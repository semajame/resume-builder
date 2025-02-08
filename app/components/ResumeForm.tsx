'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'

export default function ResumeForm() {
  const [resume, setResume] = useState<{
    name: string
    email: string
    phone: string
    education: string
    experience: {
      company: string
      position: string
      start_date: string
      end_date: string
      job_description: string
    }[]
    skills: string
    summary: string
    location: string
    certificates: string
    projects: string
  }>({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: [], // Explicitly set as an array
    skills: '',
    summary: '',
    location: '',
    certificates: '',
    projects: '',
  })

  const [experience, setExperience] = useState({
    company: '',
    position: '',
    start_date: '',
    end_date: '',
    job_description: '',
    isPresent: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResume({ ...resume, [e.target.name]: e.target.value })
  }

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target
    setExperience((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox separately
      end_date: name === 'isPresent' && checked ? 'Present' : prev.end_date, // Update end_date if checked
    }))
  }

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
        isPresent: false,
      }) // Reset input fields
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('resumes').insert([resume])
    if (error) console.error('Error adding resume:', error)
    else alert('Resume added successfully!')
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className='flex min-h-screen gap-5'>
      {/* FORM */}
      <form onSubmit={handleSubmit} className='w-2/5 space-y-4 p-4'>
        <Tabs defaultValue='personal' className='w-full'>
          <TabsList className='w-full flex justify-between'>
            <TabsTrigger value='personal' className='w-full'>
              Personal
            </TabsTrigger>
            <TabsTrigger value='experience' className='w-full'>
              {' '}
              Experience
            </TabsTrigger>
            <TabsTrigger value='education' className='w-full'>
              Education
            </TabsTrigger>
          </TabsList>

          {/* Personal Tab */}
          <TabsContent value='personal' className='space-y-4'>
            <h1 className='text-2xl font-medium my-5'>Personal Information</h1>
            <div>
              <Label>Full Name</Label>
              <Input
                type='text'
                name='name'
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
                value={resume.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type='text'
                name='location'
                value={resume.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Summary</Label>
              <Textarea
                name='summary'
                value={resume.summary}
                onChange={handleChange}
                required
              />
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value='experience' className='space-y-4'>
            <h1 className='text-2xl font-medium mt-4'>Experience</h1>
            <div>
              <Label>Company</Label>
              <Input
                type='text'
                name='company'
                value={experience.company}
                onChange={handleExperienceChange}
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type='text'
                name='position'
                value={experience.position}
                onChange={handleExperienceChange}
              />
            </div>
            <div className='flex gap-4'>
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
                  value={experience.end_date}
                  onChange={handleExperienceChange}
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
                    isPresent: checked as boolean, // Ensure it's a boolean
                    end_date: checked ? 'Present' : '', // Reset end_date if unchecked
                  }))
                }
              />
              <Label htmlFor='terms1'>Currently Working Here</Label>
            </div>
            <div>
              <Label>Job Description</Label>
              <Textarea
                name='job_description'
                value={experience.job_description}
                onChange={handleExperienceChange}
              />
            </div>
            <Button type='button' onClick={addExperience}>
              Add Experience
            </Button>

            {/* Display Added Experiences */}
            {resume.experience.length > 0 && (
              <div className='mt-4 '>
                <h3 className='font-semibold'>Added Experiences</h3>
                {resume.experience.map((exp, index) => (
                  <div key={index} className='border p-2 mt-2 rounded-md'>
                    <p>
                      <strong>{exp.company}</strong> - {exp.position}
                    </p>
                    <p className='text-sm'>
                      {exp.start_date} to {exp.end_date}
                    </p>
                    <p className='text-sm'>{exp.job_description}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value='education' className='space-y-4'>
            <h1 className='text-2xl font-medium my-5'>Education</h1>
            <Label>Education</Label>
            <Textarea
              name='education'
              value={resume.education}
              onChange={handleChange}
            />
          </TabsContent>
        </Tabs>
        <Button type='submit'>Save Resume</Button>
      </form>

      {/* LIVE PREVIEW */}
      <div className='w-3/5 border p-10 rounded-md'>
        <h2 className='text-lg font-semibold'>
          {resume.name || <span className='text-gray-400'>Your Name</span>}
        </h2>
        <p className='text-sm'>
          {resume.email || (
            <span className='text-gray-400'>your@email.com</span>
          )}{' '}
          |{' '}
          {resume.phone || <span className='text-gray-400'>Phone Number</span>}{' '}
          | {resume.location || <span className='text-gray-400'>Location</span>}
        </p>

        <p className='text-sm my-4'>
          {resume.summary || (
            <span className='text-gray-400'>Your summary goes here...</span>
          )}
        </p>

        <h3 className='font-semibold mt-4 text-2xl'>Experience</h3>
        <hr className='mt-2 mb-5' />

        <div className='flex flex-col gap-2'>
          {resume.experience.length > 0 ? (
            resume.experience.map((exp, index) => (
              <div key={index} className='text-sm'>
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
                  <div>
                    <p>{exp.job_description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-400'>Your work experience...</p>
          )}
        </div>

        <h3 className='font-semibold mt-4 text-2xl'>Education</h3>
        <hr className='mt-2 mb-5' />

        <p className='text-sm'>
          {resume.education || (
            <span className='text-gray-400'>Your education details...</span>
          )}
        </p>

        <h3 className='font-semibold mt-4 text-2xl'>Skills</h3>
        <hr className='mt-2 mb-5' />

        <p className='text-sm'>
          {resume.skills || (
            <span className='text-gray-400'>Your skills...</span>
          )}
        </p>

        <h3 className='font-semibold mt-4 text-2xl'>Projects</h3>
        <hr className='mt-2 mb-5' />

        <p className='text-sm'>
          {resume.projects || (
            <span className='text-gray-400'>Your projects...</span>
          )}
        </p>

        <h3 className='font-semibold mt-4 text-2xl'>Certificates</h3>
        <hr className='mt-2 mb-5' />

        <p className='text-sm'>
          {resume.certificates || (
            <span className='text-gray-400'>Your certificates...</span>
          )}
        </p>
      </div>
    </div>
  )
}
