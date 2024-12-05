'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TimelineEvent from './TimelineEvent';


interface ScrollingTimelineProps {
  events: TimelineEvent[];
}

const ScrollingTimeline: React.FC<ScrollingTimelineProps> = ({ events }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [rootInView, setRootInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => { 
    const observer = new IntersectionObserver(
      ([entry]) => {
        setRootInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    return () => {
      if (rootRef.current) {
        observer.unobserve(rootRef.current);
      }
    };
  }, []);

  const imageY = useTransform(scrollYProgress, [0, 1], ["-280%", "1800%"]);

  return (


    <div className="min-h-screen flex">
      {/* Left half */}
      <div className="w-1/3 flex items-center justify-center py-20 frosted-glass m-10 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Left Side Content</h2>
          <p className="mt-4">This is the content on the left side.</p>
        </div>
      </div>

      {/* Right half */}
      <div ref={containerRef} className="w-2/3 flex items-center justify-center py-20 frosted-glass m-10 rounded-lg">
        <div className="text-center">
          <div  className="relative min-h-screen py-20">
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-500 origin-top"
              style={{ scaleY: lineHeight }}
            />


            <motion.img
              src="/images/character.png" 
              alt="Moving Icon"
              className="left-1/2 -translate-x-1/2" // Adjust size here
              style={{
                y: imageY,
                width: '64px', // Set your desired width
                height: '64px', // Set your desired height
                imageRendering: 'pixelated', // Ensures scaling uses nearest-neighbor
              }}
            />

            {events.map((event, index) => (
              <TimelineEvent
                key={index}
                event={event}
                index={index}
                totalEvents={events.length}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>



  );
};



export default ScrollingTimeline;