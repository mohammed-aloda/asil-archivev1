import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  // Instant movement using MotionValues (no spring lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Keep a slight spring only for rotation to prevent jitter
  const rotateValue = useMotionValue(0);
  const rotateSpring = useSpring(rotateValue, { damping: 20, stiffness: 200 });
  const opacityValue = useMotionValue(1);
  const prevPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const target = e.target as HTMLElement;
      let isText = false;

      if (target) {
        const tagName = target.tagName.toUpperCase();
        if (tagName === 'TEXTAREA' || target.isContentEditable) {
          isText = true;
        } else if (tagName === 'INPUT') {
          const inputType = (target as HTMLInputElement).type.toLowerCase();
          const textTypes = ['text', 'password', 'email', 'search', 'number', 'tel', 'url'];
          if (textTypes.includes(inputType) || !inputType) {
            isText = true;
          }
        }
      }

      opacityValue.set(isText ? 0 : 1);

      // Calculate angle
      const deltaX = clientX - prevPosition.current.x;
      const deltaY = clientY - prevPosition.current.y;

      if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        rotateValue.set(angle + 45);
      }

      // Update position instantly
      cursorX.set(clientX - 12); // Center offset
      cursorY.set(clientY - 12);

      prevPosition.current = { x: clientX, y: clientY };
    };

    // Use passive listener for better scroll performance
    window.addEventListener("mousemove", mouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [cursorX, cursorY, rotateValue, opacityValue]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] text-white hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        rotate: rotateSpring,
        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
        opacity: opacityValue
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="white"
        stroke="black"
        strokeWidth="1"
        className="text-white drop-shadow-md"
        style={{ transform: 'rotate(-45deg)' }}
      >
        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
};

export default CustomCursor;
