import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = '', delay = 0 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const characters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    }),
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

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap overflow-visible py-1 ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
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
