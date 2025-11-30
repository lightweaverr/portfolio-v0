'use client'

import React from 'react'
import LiquidGlass from './LiquidGlass/LiquidGlass';
import Image from 'next/image';

const LandingPage = () => {

  return (
    <div className='w-full min-h-screen flex flex-col relative'>


      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center px-4 pt-24 pb-20 md:pt-50'>
        <div className='w-full max-w-4xl flex flex-col items-center '>

          {/* Pokedex Image */}
          <div className='w-full max-w-[27rem] md:max-w-[35rem] lg:max-w-[40rem] mb-4 md:mb-8'>
            <div className='relative w-full aspect-square left-[-20%]'>

              <Image
                src="/images/pokedex.png"
                alt="Pokedex"
                width={500}
                height={500}
                className='object-contain pixelated'
                priority
                unoptimized
                style={{
                  imageRendering: 'pixelated',
                }}
              />

            </div>
          </div>

          {/* First Glass Card - Name */}
          <LiquidGlass
            blurAmount={0}
            saturation={160}
            aberrationIntensity={10}
            className='rounded-3xl shadow-2xl  w-full max-w-2xl'
          >
            <div className='px-8 md:px-12 py-6 md:py-8 text-center'>
              <h1 className='pokemon-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-wide'>
                Hi, I am Ronit
              </h1>
            </div>
          </LiquidGlass>

          {/* Second Glass Card - Tagline */}
          <LiquidGlass
            blurAmount={0}
            saturation={160}
            className='rounded-3xl shadow-2xl  w-full max-w-xl'
          >
            <div className='px-6 md:px-10 py-5 md:py-6 text-center'>
              <p className='pokemon-font text-xl sm:text-2xl md:text-3xl text-white/90'>
                I make pixels behave
              </p>
            </div>
          </LiquidGlass>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce'>
        <LiquidGlass
          blurAmount={0}
          saturation={150}
          className='rounded-full shadow-xl '
        >
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className='p-3 md:p-4 hover:scale-110 transition-transform'
            aria-label='Scroll down'
          >
            <svg
              className='w-6 h-6 md:w-8 md:h-8 text-white '
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
            </svg>
          </button>
        </LiquidGlass>
      </div>

    </div>
  )
}

export default LandingPage;