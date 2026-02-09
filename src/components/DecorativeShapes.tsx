import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Shape Types
type ShapeType = 'star' | 'circle' | 'square' | 'triangle' | 'cross' | 'polygon';

// Helper to generate random shapes
const generateShapes = (count: number) => {
  const colors = ['#ff69b4', '#a3e635', '#facc15', '#8b5cf6', '#3b82f6', '#ef4444', '#f97316', '#ffffff'];
  const types: ShapeType[] = ['star', 'circle', 'square', 'triangle', 'cross', 'polygon'];

  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    type: types[Math.floor(Math.random() * types.length)],
    x: Math.random() * 100, // percentage
    y: Math.random() * 100, // percentage
    size: Math.random() * 80 + 40, // 40px to 120px
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2,
    duration: Math.random() * 10 + 10, // 10-20s float duration
  }));
};

const ShapeSVG = ({ type, color }: { type: ShapeType; color: string }) => {
  switch (type) {
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="black" strokeWidth="2" />
        </svg>
      );
    case 'circle':
      return (
        <div
          className="w-full h-full rounded-full border-4 border-black box-border"
          style={{ backgroundColor: color, boxShadow: '4px 4px 0px 0px black' }}
        />
      );
    case 'square':
      return (
        <div
          className="w-full h-full border-4 border-black box-border"
          style={{ backgroundColor: color, boxShadow: '4px 4px 0px 0px black' }}
        />
      );
    case 'triangle':
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <path d="M12 2L22 22H2L12 2Z" stroke="black" strokeWidth="2" />
        </svg>
      );
    case 'cross':
      return (
        <div className="relative w-full h-full flex items-center justify-center drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
           <div className="absolute w-[25%] h-full bg-black border-2 border-black" style={{ backgroundColor: color }}></div>
           <div className="absolute w-full h-[25%] bg-black border-2 border-black" style={{ backgroundColor: color }}></div>
        </div>
      );
    case 'polygon':
       return (
        <svg viewBox="0 0 100 100" fill={color} className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
           <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" stroke="black" strokeWidth="4" />
        </svg>
       );
    default:
      return null;
  }
};

export const DecorativeShapes: React.FC = () => {
  const [shapes, setShapes] = useState<ReturnType<typeof generateShapes>>([]);

  useEffect(() => {
    // Generate shapes only on client to avoid hydration mismatch
    setShapes(generateShapes(15));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{
            opacity: 0.8,
            scale: 1,
            y: [0, -40, 0],
            rotate: [shape.rotation, shape.rotation + 45, shape.rotation],
          }}
          transition={{
            opacity: { duration: 0.5, delay: shape.delay },
            scale: { duration: 0.5, delay: shape.delay, type: 'spring' },
            y: {
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror"
            },
            rotate: {
              duration: shape.duration * 1.5,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          style={{
            position: 'absolute',
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          className="mix-blend-multiply"
        >
          <ShapeSVG type={shape.type} color={shape.color} />
        </motion.div>
      ))}
    </div>
  );
};
