import React, { useEffect, useState } from 'react';
import { getContrastColor } from '../lib/colors';

interface ReviewCardProps {
  name: string;
  bio?: string;
  review: string;
  socialLink?: string;
  image?: { src: string; width: number; height: number; format: string } | string;
  index?: number;
  color?: string; // Participant's preferred color
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  bio,
  review,
  socialLink,
  image,
  index = 0,
  color // Optional color from participant
}) => {
  // If no color is provided, we default to white
  const cardBg = color || '#ffffff';

  // Calculate text color for high contrast
  const textColor = getContrastColor(cardBg);

  // Random rotation for "messy" look, seeded by index
  const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';

  return (
    <div
      className={`
        relative border-4 border-black p-6
        shadow-[8px_8px_0px_0px_black] hover:shadow-[12px_12px_0px_0px_white]
        transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0
        ${rotation} flex flex-col gap-4 h-full
      `}
      style={{
        backgroundColor: cardBg,
        color: textColor === 'white' ? '#fff' : '#000'
      }}
    >
      <div
        className="flex items-center gap-4 border-b-4 pb-4"
        style={{ borderColor: textColor === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
      >
        {image && (
          <div className="w-16 h-16 border-2 border-current overflow-hidden bg-gray-200 shrink-0 rounded-full">
             <img
               src={typeof image === 'string' ? image : image.src}
               alt={name}
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
             />
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold uppercase leading-none">{name}</h3>
          {bio && <p className="text-sm font-bold opacity-80 mt-1">{bio}</p>}
        </div>
      </div>

      <p className="font-mono text-lg font-bold flex-grow leading-tight">"{review}"</p>

      {socialLink && (
        <a
          href={socialLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            text-xs font-bold uppercase tracking-widest px-4 py-2 inline-block self-start
            border-2 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_current]
          `}
          style={{
            borderColor: textColor === 'white' ? '#fff' : '#000',
            color: textColor === 'white' ? '#fff' : '#000'
          }}
        >
          View Profile {'->'}
        </a>
      )}
    </div>
  );
};
