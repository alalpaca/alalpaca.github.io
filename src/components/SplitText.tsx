import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = '', delay = 0 }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const characters = text.split('');

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
      y: 30,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 120,
        duration: 0.8,
      },
    },
  };

  // Before hydration, render invisible placeholder to prevent flash
  if (!isMounted) {
    return (
      <span className={`inline-flex flex-wrap overflow-visible py-1 opacity-0 ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap overflow-visible py-1 ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
