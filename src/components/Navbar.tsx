import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full bg-transparent border-color-dark-secondary frosted-glass'>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent translucent-border'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex shring-0'>
            <span className='text-color-light-primary text-5xl font-bold pokemon-font'>Logo</span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-10">
              <a href="#" className="text-color-light-secondary text-2xl hover:bg-color-dark-secondary hover:bg-opacity-30 px-3 py-2 pokemon-font pixelated-corners">Home</a>
              <a href="#" className="text-color-light-secondary text-2xl hover:bg-color-dark-secondary hover:bg-opacity-30 px-3 py-2 pokemon-font pixelated-corners-2steps-4px">About</a>
              <a href="#" className="text-color-light-secondary text-2xl hover:bg-color-dark-secondary hover:bg-opacity-30 px-3 py-2 pokemon-font pixelated-corners-3steps-4px-2">Contact</a>
            </div>
          </div>
          <div>
            {/* // TODO : what can be at the right? */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar