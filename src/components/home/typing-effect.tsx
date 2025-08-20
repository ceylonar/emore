'use client';

import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
}

export default function TypingEffect({ text, speed = 50, delay = 0 }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const startTimeout = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping || !text) {
      return;
    }
    
    setDisplayedText(''); // Reset on text change

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [isTyping, text, speed]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
}
