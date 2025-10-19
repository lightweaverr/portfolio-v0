'use client';

import React, { useEffect, useRef, useState } from 'react';
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

  // Character sprite management based on scroll state
  const [isScrolling, setIsScrolling] = useState(false);
  const [spriteSrc, setSpriteSrc] = useState('/images/character-rest.png');
  const rafIdRef = useRef<number | null>(null);
  const frameCountRef = useRef(0);
  const walkToggleRef = useRef(false); // false -> right, true -> left
  const scrollStopTimerRef = useRef<number | undefined>(undefined);

  // Start/stop walking animation on scroll
  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
      // Consider scrolling stopped after a short idle period
      scrollStopTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 120);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll as any);
      if (scrollStopTimerRef.current) window.clearTimeout(scrollStopTimerRef.current);
    };
  }, []);

  // RAF-driven frame alternation while scrolling
  useEffect(() => {
    if (!isScrolling) {
      // Stop animating and reset to rest sprite
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      setSpriteSrc('/images/character-rest.png');
      frameCountRef.current = 0;
      return;
    }

    const tick = () => {
      frameCountRef.current += 1;
      // Swap every 4 frames
      if (frameCountRef.current % 8 === 0) {
        walkToggleRef.current = !walkToggleRef.current;
        setSpriteSrc(walkToggleRef.current ? '/images/character-left.png' : '/images/character-right.png');
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    // Ensure we begin in a walking pose immediately
    walkToggleRef.current = false;
    setSpriteSrc('/images/character-right.png');
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
  }, [isScrolling]);

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
              src={spriteSrc}
              alt="Character"
              className="w-full h-full object-contain"
              style={{
                imageRendering: 'pixelated',
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};



export default ScrollingTimeline;

