"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export function TestimonialCard({ handleShuffle, testimonial, position, src, author }: {
  handleShuffle: () => void;
  testimonial: string;
  position: string;
  src: string;
  author: string;
}) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e, info) => {
        // No longer needed
      }}
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > 50) {
          handleShuffle();
        }
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[450px] w-[300px] sm:w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-[#343C43] bg-[#171A1F]/80 p-6 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <img
        src={src}
        alt={`Avatar of ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-[#5EC6FF] bg-slate-200 object-cover"
      />
      <span className="text-center text-lg italic text-gray-300">"{testimonial}"</span>
      <span className="text-center text-sm font-medium text-[#5EC6FF]">{author}</span>
    </motion.div>
  );
}

export function ShuffleCards({ testimonials }: { testimonials: any[] }) {
  const [positions, setPositions] = React.useState(["front", "middle", "back"]);

  const handleShuffle = () => {
    const newPositions = [...positions];
    const first = newPositions.shift();
    if (first) newPositions.push(first);
    setPositions(newPositions);
  };

  return (
    <div className="grid place-content-center overflow-hidden py-12 text-slate-50 w-full relative z-20">
      <div className="relative -ml-[60px] sm:-ml-[100px] md:-ml-[175px] h-[450px] w-[300px] sm:w-[350px]">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
            handleShuffle={handleShuffle}
            position={positions[index]}
          />
        ))}
      </div>
    </div>
  );
}
