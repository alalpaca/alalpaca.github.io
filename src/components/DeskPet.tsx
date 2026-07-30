import { useState, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import './DeskPet.css';

// Bilingual greetings for the speech bubble
const greetings = {
  en: [
    "Hi! I'm Felix 👋",
    "Thanks for visiting!",
    "Check out my projects ↗",
    "Built with Astro + React ✨",
  ],
  zh: [
    "嗨！我是 Felix 👋",
    "感谢来访！",
    "看看我的项目吧 ↗",
    "用 Astro + React 构建 ✨",
  ],
};

export default function DeskPet() {
  const prefersReduced = useReducedMotion();
  const [pose, setPose] = useState<'stand' | 'sit'>('stand');
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Detect language from URL
  const getLang = useCallback((): 'en' | 'zh' => {
    if (typeof window === 'undefined') return 'en';
    return window.location.pathname.startsWith('/zh') ? 'zh' : 'en';
  }, []);

  // Pick a random greeting
  const getGreeting = useCallback(() => {
    const lang = getLang();
    const msgs = greetings[lang];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }, [getLang]);

  // Entrance animation + auto-greet after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // appear 2s after page load

    const greetTimer = setTimeout(() => {
      if (!hasGreeted) {
        const lang = getLang();
        setBubbleText(lang === 'zh' ? '嗨！我是 Felix 👋' : "Hi! I'm Felix 👋");
        setShowBubble(true);
        setHasGreeted(true);
        setTimeout(() => setShowBubble(false), 4000);
      }
    }, 3500); // greet 3.5s after page load

    return () => {
      clearTimeout(timer);
      clearTimeout(greetTimer);
    };
  }, [getLang, hasGreeted]);

  // Scroll-based pose switching
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      if (window.scrollY > threshold) {
        setPose('sit');
      } else {
        setPose('stand');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click handler — show random greeting
  const handleClick = () => {
    setBubbleText(getGreeting());
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3500);
  };

  // Minimize/restore toggle
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    setShowBubble(false);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  if (!isVisible) return null;

  // Minimized state: small clickable dot
  if (isMinimized) {
    return (
      <motion.button
        className="desk-pet__minimized"
        onClick={handleRestore}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        title="Show pet"
        aria-label="Show desk pet"
      >
        <img
          src="/images/pet/stand.png"
          alt=""
          className="desk-pet__minimized-img"
        />
      </motion.button>
    );
  }

  // Breathing animation (idle)
  const breatheAnimation = prefersReduced
    ? {}
    : {
        y: [0, -4, 0],
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

  // Hover animation
  const hoverAnimation = isHovered
    ? { scale: 1.08, rotate: [0, -3, 3, -2, 0] }
    : { scale: 1, rotate: 0 };

  return (
    <motion.div
      className="desk-pet"
      initial={{ opacity: 0, y: 60, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.2 }}
    >
      {/* Close/minimize button */}
      <button
        className="desk-pet__close"
        onClick={handleMinimize}
        aria-label="Minimize pet"
        title="Minimize"
      >
        ×
      </button>

      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            className="desk-pet__bubble"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <span>{bubbleText}</span>
            <div className="desk-pet__bubble-tail" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character */}
      <motion.div
        className="desk-pet__character"
        animate={{ ...breatheAnimation, ...hoverAnimation }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={pose}
            src={pose === 'stand' ? '/images/pet/stand.png' : '/images/pet/sit.png'}
            alt="Desk pet"
            className="desk-pet__img"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
