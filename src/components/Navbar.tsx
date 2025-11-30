import React from 'react'
import LiquidGlass from './LiquidGlass/LiquidGlass'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] max-w-6xl'>
      <LiquidGlass
        blurAmount={4}
        saturation={1.25}
        className='rounded-2xl shadow-2xl'
      >
        <div className='flex items-center justify-between px-4 md:px-8 py-4'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-12 h-12 md:w-14 md:h-14 shadow-lg rounded-md pixelated"
              unoptimized
              style={{
                imageRendering: 'pixelated',
              }}
            />
          </div>

          {/* Navigation Links */}
          <div className='flex gap-4 md:gap-8 items-center'>
            <Link href="#home" className='pokemon-font text-sm md:text-base text-white hover:text-yellow-300 transition-colors'>
              Home
            </Link>
            <Link href="#about" className='pokemon-font text-sm md:text-base text-white hover:text-yellow-300 transition-colors'>
              About
            </Link>
            <Link href="#contact" className='pokemon-font text-sm md:text-base text-white hover:text-yellow-300 transition-colors'>
              Contact
            </Link>
          </div>
        </div>
      </LiquidGlass>
    </nav>
  )
}

export default Navbar
