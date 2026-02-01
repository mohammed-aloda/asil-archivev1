import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  // Instant movement using MotionValues (no spring lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Keep a slight spring only for rotation to prevent jitter
  const rotateSpring = useSpring(0, { damping: 20, stiffness: 200 });
  const [rotation, setRotation] = useState(0);
  const [isTextHover, setIsTextHover] = useState(false);
  const prevPosition = useRef({ x: 0, y: 0 });

  // Check for hover on text elements directly in the mouse handler to allow for dynamic DOM changes (like search box unmounting)
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Check target element to decide if we should hide the custom cursor
      // We want to hide it on text inputs so the native I-beam cursor shows
      const target = e.target as HTMLElement;
      let isText = false;

      if (target) {
        const tagName = target.tagName.toUpperCase();
        const isContentEditable = target.isContentEditable;

        if (tagName === 'TEXTAREA' || isContentEditable) {
          isText = true;
        } else if (tagName === 'INPUT') {
          // Check input types that are text-based
          const inputType = (target as HTMLInputElement).type.toLowerCase();
          const textTypes = ['text', 'password', 'email', 'search', 'number', 'tel', 'url'];
          if (textTypes.includes(inputType) || !inputType) {
            isText = true;
          }
        }
      }

      setIsTextHover(isText);

      // Calculate angle
      const deltaX = clientX - prevPosition.current.x;
      const deltaY = clientY - prevPosition.current.y;

      if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        // 135 degrees offset to align paper plane tip
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        setRotation(angle + 45);
      }

      // Update position instantly
      cursorX.set(clientX - 12); // Center offset
      cursorY.set(clientY - 12);
      rotateSpring.set(rotation);

      prevPosition.current = { x: clientX, y: clientY };
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [cursorX, cursorY, rotateSpring, rotation]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] text-white hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        rotate: rotateSpring,
        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))", // Slight shadow for visibility on white backgrounds
        opacity: isTextHover ? 0 : 1 // Hide custom cursor when hovering text inputs
      }}
    >
      {/* Paper Plane SVG Icon - Pure White, No Transparency */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="white"
        stroke="black"
        strokeWidth="1"
        className="text-white drop-shadow-md"
        style={{ transform: 'rotate(-45deg)' }} // Initial rotation correction for this specific path
      >
        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
};

export default CustomCursor;
