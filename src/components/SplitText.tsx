import { useState, useEffect } from 'react';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = '', delay = 0 }: Props) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const characters = text.split('');

  return (
    <span className={`inline-flex flex-wrap overflow-visible py-1 ${className}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: shouldAnimate ? 1 : 0,
            transform: shouldAnimate ? 'translateY(0)' : 'translateY(30px)',
            filter: shouldAnimate ? 'blur(0px)' : 'blur(6px)',
            transition: `all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay + index * 0.12}s`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
