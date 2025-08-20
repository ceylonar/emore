'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
}

export function TypingEffect({ text, typingSpeed = 50 }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text, typingSpeed]);

  return (
    <span ref={containerRef}>
      {displayedText}
      {isTyping && <span className="animate-ping">|</span>}
    </span>
  );
}
