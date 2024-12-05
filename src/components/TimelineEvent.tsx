'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


interface TimelineEvent {
  year: number;
  description: string;
}

interface TimelineEventProps {
  event: TimelineEvent;
  index: number;
  totalEvents: number;
  scrollProgress: any;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, index, totalEvents, scrollProgress }) => {
  const eventRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (eventRef.current) {
      observer.observe(eventRef.current);
    }

    return () => {
      if (eventRef.current) {
        observer.unobserve(eventRef.current);
      }
    };
  }, []);

  const progress = useTransform(
    scrollProgress,
    [index / totalEvents, (index + 1) / totalEvents],
    [0, 1]
  );

  const x = useTransform(progress, [0, 1], [0, index % 2 === 0 ? 100 : -100]);

  return (
    <motion.div
      ref={eventRef}
      className={`absolute left-1/2 ${index % 2 === 0 ? 'ml-8' : 'mr-8 text-right'} w-64 p-4`}
      style={{
        top: `${(index + 1) * (100 / (totalEvents + 1))}%`,
        x: x
      }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold">{event.year}</h3>
      <p>{event.description}</p>
    </motion.div>
  );
};

export default TimelineEvent;