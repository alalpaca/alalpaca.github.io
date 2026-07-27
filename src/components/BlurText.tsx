import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function BlurText({ text, className = '', delay = 0 }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const words = text.split(' ');

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 8,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  // Before hydration, render invisible placeholder to prevent flash
  if (!isMounted) {
    return (
      <p className={`opacity-0 ${className}`}>
        {text}
      </p>
    );
  }

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
