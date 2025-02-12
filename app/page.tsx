'use client'

import ResumeForm from '../app/components/ResumeForm'

import Footer from './components/Footer'

export default function Home() {
  return (
    <div className='font-[family-name:var(--font-geist-sans)] relative max-w-7xl mx-auto'>
      {/* <div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div> */}

      <div className='md:p-10 p-5'>
        <div className='mb-10'>
          <div>
            <h1 className='text-6xl tracking-tight font-bold mb-2 bg-gradient-to-t from-slate-900 to-gray-600 bg-clip-text text-transparent dark:from-slate-300 dark:to-gray-600'>
              Resume Builder
            </h1>
            <p className='text-lg'>
              Create your own and ready to use professional resume in minutes!
            </p>
          </div>
        </div>
        <ResumeForm />
      </div>
      <Footer />
    </div>
  )
}
