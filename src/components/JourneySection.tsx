'use client';

import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';


const CHARACTER_SIZE = 60; // Assuming character sprite is 48x48px
const TILE_SIZE = 60; // Assuming tile is 32x32px
const PATH_LENGTH = 20; // Number of tiles to show


const ScrollingTimeline = ({ events }: any) => {
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 100,
    stiffness: 100
  });

  // Transform scroll progress to character position
  const characterY = useTransform(
    smoothProgress,
    [0, 1],
    ['-100%', '2000%']
  );

  // Generate tiles for the path
  const tiles = Array.from({ length: PATH_LENGTH }, (_, index) => ({
    id: index,
    initialY: 100 + (index * TILE_SIZE)
  }));

  return (
    <div className="flex w-full min-h-screen">
      {/* Left section - 1/3 width */}
      <div className="w-1/3 p-8">
        <h2 className="text-2xl font-bold mb-4">Side Content</h2>
        <p>Scroll to see the animation...</p>
      </div>

      {/* Right section - 2/3 width */}
      <div className="w-2/3 p-8 relative overflow-hidden">
        <div className="relative h-[200vh]"> {/* Extra height for scrolling */}
          {/* Path tiles */}

          {tiles.map((tile, index) => (

            <motion.div
              key={tile.id}
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                y: tile.initialY,
              }}
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: index * TILE_SIZE,
              }}
              viewport={{ once: true, margin: "100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
            >
              <img
                src="/images/tile.png"
                alt="Path tile"
                className="w-full h-full object-cover"
                style={{
                  imageRendering: 'pixelated',
                  WebkitImageRendering: 'pixelated',
                  MozImageRendering: 'pixelated',
                }}
              />
            </motion.div>
          ))}

          {/* Character */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              width: CHARACTER_SIZE,
              height: CHARACTER_SIZE,
              y: characterY,
            }}
          >
            <img
              src="/images/character.png"
              alt="Character"
              className="w-full h-full object-contain"
              style={{
                imageRendering: 'pixelated',
                WebkitImageRendering: 'pixelated',
                MozImageRendering: 'pixelated',
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};



export default ScrollingTimeline;

