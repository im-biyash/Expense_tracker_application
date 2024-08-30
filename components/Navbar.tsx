
'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '../components/ui/button'

import { ModeToggle } from '../components/Mode-toogle'
const Navbar = () => {
  return (
    <div className="my-2 p-2">
     <nav className='flex justify-between items-center'>
        <ul className='flex flex-grow justify-center gap-2'>
          <Link href= {'/'}>
            <li>Home</li>
          </Link>
               <Link href={'/dashboard'}>
            <li>Dashboard</li>
            </Link>
        
        </ul>
        <div className='flex gap-2 p-2 mr-3'>
  <Link href={'/login'}>
        <Button variant="default">Login into see</Button>
        </Link>
        <Link href={'/signup'}>
        <Button variant="default">Signup</Button>
        </Link>
        </div>
        <div className="flex-shrink-0 mr-2 sm:mr-5">
        <ModeToggle />
      </div>
     </nav>
    </div>
  )
}

export default Navbar
