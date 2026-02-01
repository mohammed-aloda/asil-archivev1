import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const LogoAnimation: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            await controls.start("visible");
            if (onComplete) {
                setTimeout(onComplete, 2000); // Wait a bit after animation
            }
        };
        sequence();
    }, [controls, onComplete]);

    // Animation variants
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2.5,
                ease: "easeInOut",
            }
        }
    };

    const fillVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                delay: 2, // Fade in fill after strokes
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-asl-cream">
            <motion.svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 595.28 841.89"
                className="w-48 h-auto"
            >
                <defs>
                    <style>
                        {`.st0{fill:#c39f58;}`}
                    </style>
                </defs>

                {/* Main large hook shape */}
                <motion.path
                    d="M468.46,589.74c11.83,6.97,73.69,35.31,77.22,44.66-1.42,22,6.79,68.8-3.93,86.79l-88.78,91.25H139.8s-89.52-98.48-89.52-98.48c-4.11-63.93-3.78-128.51.36-192.32l154.94-168.49c6.16-7.54,4.3-17.05,5.15-25.93,9.22-1.51,71.62-74.39,77.68-67.27l-2.79,123.86-159.71,171.68v177.65s293.95,0,293.95,0c3.55,0,48.59-48.23,48.59-51.78v-91.61Z"
                    className="st0"
                    variants={pathVariants}
                    initial="hidden"
                    animate={controls}
                    fill="transparent"
                    stroke="#C2B280"
                    strokeWidth="3"
                />
                {/* Fill animation for main shape */}
                <motion.path
                    d="M468.46,589.74c11.83,6.97,73.69,35.31,77.22,44.66-1.42,22,6.79,68.8-3.93,86.79l-88.78,91.25H139.8s-89.52-98.48-89.52-98.48c-4.11-63.93-3.78-128.51.36-192.32l154.94-168.49c6.16-7.54,4.3-17.05,5.15-25.93,9.22-1.51,71.62-74.39,77.68-67.27l-2.79,123.86-159.71,171.68v177.65s293.95,0,293.95,0c3.55,0,48.59-48.23,48.59-51.78v-91.61Z"
                    className="st0"
                    variants={fillVariants}
                    initial="hidden"
                    animate={controls}
                />

                {/* Inner detailed shapes (Group) */}
                <g>
                    <motion.path
                        d="M137.07,720.38v-158.53s159.94-176.24,159.94-176.24c8.29-45.7-.58-92.61,2.92-138.88l77.72-71.25v239.78s-159.35,173.63-159.35,173.63c-8.36,16.96,1.69,44.41-4.95,60.37-1.8,4.32-59.82,63.81-65.09,67.15-3.77,2.39-5.9,4.92-11.18,3.95Z"
                        className="st0"
                        variants={pathVariants}
                        initial="hidden"
                        animate={controls}
                        fill="transparent"
                        stroke="#C2B280"
                        strokeWidth="3"
                    />
                    <motion.path
                        d="M137.07,720.38v-158.53s159.94-176.24,159.94-176.24c8.29-45.7-.58-92.61,2.92-138.88l77.72-71.25v239.78s-159.35,173.63-159.35,173.63c-8.36,16.96,1.69,44.41-4.95,60.37-1.8,4.32-59.82,63.81-65.09,67.15-3.77,2.39-5.9,4.92-11.18,3.95Z"
                        className="st0"
                        variants={fillVariants}
                        initial="hidden"
                        animate={controls}
                    />

                    <motion.path
                        d="M379.24,540.35c12.78,8.31,74.65,35.25,77.72,47.35,1.82,7.17.52,82.91-1.59,90.12-2.36,8.05-33.65,32.44-38.57,42.69l-252.64-.13c-5.63-4.55,69.26-71.93,72.48-79.65h142.6s0-100.37,0-100.37Z"
                        className="st0"
                        variants={pathVariants}
                        initial="hidden"
                        animate={controls}
                        fill="transparent"
                        stroke="#C2B280"
                        strokeWidth="3"
                    />
                    <motion.path
                        d="M379.24,540.35c12.78,8.31,74.65,35.25,77.72,47.35,1.82,7.17.52,82.91-1.59,90.12-2.36,8.05-33.65,32.44-38.57,42.69l-252.64-.13c-5.63-4.55,69.26-71.93,72.48-79.65h142.6s0-100.37,0-100.37Z"
                        className="st0"
                        variants={fillVariants}
                        initial="hidden"
                        animate={controls}
                    />
                </g>

                {/* Top diamond shape */}
                <motion.rect
                    x="238.95"
                    y="54.01"
                    width="119.65"
                    height="121.89"
                    transform="translate(6.24 244.96) rotate(-45)"
                    className="st0"
                    variants={pathVariants}
                    initial="hidden"
                    animate={controls}
                    fill="transparent"
                    stroke="#C2B280"
                    strokeWidth="3"
                />
                <motion.rect
                    x="238.95"
                    y="54.01"
                    width="119.65"
                    height="121.89"
                    transform="translate(6.24 244.96) rotate(-45)"
                    className="st0"
                    variants={fillVariants}
                    initial="hidden"
                    animate={controls}
                />
            </motion.svg>
        </div>
    );
};

export default LogoAnimation;
