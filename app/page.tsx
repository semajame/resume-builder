import ResumeForm from '../app/components/ResumeForm'
import ModeToggle from '../app/components/mode-toggle'

export default function Home() {
  return (
    <div className='p-10 font-[family-name:var(--font-geist-sans)]'>
      <ModeToggle />
      <h1 className='text-2xl font-bold'>Resume Builder</h1>
      <ResumeForm />
    </div>
  )
}
