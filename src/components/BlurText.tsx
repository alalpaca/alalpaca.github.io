import { useState, useEffect } from 'react';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function BlurText({ text, className = '', delay = 0 }: Props) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const words = text.split(' ');

  return (
    <p className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block mr-[0.3em]"
          style={{
            opacity: shouldAnimate ? 1 : 0,
            transform: shouldAnimate ? 'translateY(0)' : 'translateY(8px)',
            filter: shouldAnimate ? 'blur(0px)' : 'blur(12px)',
            transition: `all 0.9s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay + index * 0.12}s`,
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
