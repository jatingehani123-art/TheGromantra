"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
  showButtons = true,
  autoplayInterval = 3000,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
  showButtons?: boolean;
  autoplayInterval?: number;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Keyboard navigation (← / →) support
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  }, []);

  // Focus the container on mount for immediate keyboard usage
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (autoplay && !isHovered) {
      intervalRef.current = setInterval(handleNext, autoplayInterval);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [autoplay, isHovered, handleNext, autoplayInterval]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-live="polite"
      className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Image Column */}
        <div className="relative h-80 w-full" style={{ perspective: "800px" }}>
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => {
              const isCurrentlyActive = index === active;
              const rotateVal = ((index * 37) % 21) - 10;
              return (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    rotateY: rotateVal,
                  }}
                  animate={{
                    opacity: isCurrentlyActive ? 1 : 0.7,
                    scale: isCurrentlyActive ? 1 : 0.95,
                    rotateY: isCurrentlyActive ? 0 : rotateVal,
                    zIndex: isCurrentlyActive ? 40 : testimonials.length + 2 - index,
                    y: isCurrentlyActive ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    rotateY: rotateVal,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom pointer-events-none"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center border border-[#343c43] select-none"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Text + Buttons Column */}
        <div className="flex flex-col justify-between py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <h3 className="text-2xl font-bold text-white">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-[#5ec6ff] mt-1">
                {testimonials[active].designation}
              </p>
              <p className="text-lg text-gray-300 mt-8 leading-relaxed">
                {testimonials[active].quote}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - always visible, never covered */}
          {showButtons && (
            <div className="flex gap-4 pt-12 md:pt-4">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={handlePrev}
                className="h-10 w-10 rounded-full bg-[#1d4ed8]/20 border border-[#5ec6ff]/30 flex items-center justify-center hover:bg-[#1d4ed8]/40 transition-colors cursor-pointer active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ec6ff]"
              >
                <ArrowLeft className="h-5 w-5 text-[#5ec6ff]" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={handleNext}
                className="h-10 w-10 rounded-full bg-[#1d4ed8]/20 border border-[#5ec6ff]/30 flex items-center justify-center hover:bg-[#1d4ed8]/40 transition-colors cursor-pointer active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ec6ff]"
              >
                <ArrowRight className="h-5 w-5 text-[#5ec6ff]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
