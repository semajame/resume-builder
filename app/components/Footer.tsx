import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <div className='my-10 px-10 flex justify-between items-center'>
      <div className='flex gap-4'>
        <Link
          href='https://www.facebook.com/jsev.12'
          aria-label='Go to James facebook'
        >
          <Facebook />
        </Link>
        <Link
          href='https://www.instagram.com/jaymesevilla/'
          aria-label='Go to James instagram'
        >
          <Instagram />
        </Link>
      </div>
      <div>
        <h1 className='text-sm dark:text-gray-200'>
          Developed by <span className='font-bold'>James.</span>
        </h1>
      </div>
    </div>
  )
}

export default Footer
