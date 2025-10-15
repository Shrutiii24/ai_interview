import {ReactNode} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import ResumeUploadDialog from '@/components/ResumeUploadDialog'

const rootlayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='root-layout'>
      <nav className="fixed inset-x-0 top-0 z-50 bg-black flex items-center justify-between px-8 py-5 shadow-md"> 
        <Link href='/' className='flex items-center gap-2'>
        <Image src="/logo.svg" alt="logo" width={38} height={32}/>
        <h2 className='text-primary-100'>HireReady</h2>
        </Link>

         <div className="flex items-center font-sans gap-4">
          <ResumeUploadDialog
         trigger={
        <Button className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide flex items-center gap-2">
         Upload Resume
        </Button>
      }/>

          <Button asChild variant="outline" className="ml-9 text-white border-indigo-400 bg-transparent">
            <Link href="/sign_in">Login</Link>
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white">
            <Link href="/sign_up">Register</Link>
          </Button>
        </div>
      </nav>
      {/* push content below fixed header */}
      <div className="pt-9" />
      {children}
    </div>
  )
}

export default rootlayout
