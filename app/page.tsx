import ResumeForm from '../app/components/ResumeForm'
import ModeToggle from '../app/components/mode-toggle'
import Footer from './components/Footer'
import Header from './components/Header'
import LandingPage from './components/LandingPage'

export default function Home() {
  return (
    <div className='font-[family-name:var(--font-geist-sans)] relative '>
      {/* <div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div> */}

      <div className='p-10 '>
        <div className='mb-10 flex justify-between items-center'>
          <div>
            <h1 className='text-5xl font-bold mb-2'>Resume Builder</h1>
            <p className='text-lg'>
              Create your own and ready to use professional resume in minutes!
            </p>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
        <ResumeForm />
      </div>
      <Footer />
    </div>
  )
}
