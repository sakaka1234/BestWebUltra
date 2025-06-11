import React, { useState } from 'react';
import { COMMENTS } from '../../../constants/comment';
import { CommentCard } from '../../ui/card/comment-card';

export const CommentSection: React.FC = () => {
  const [start, setStart] = useState(0);
  const visibleCount = 4;

  const handlePrev = () => {
    setStart((prev) => (prev - 1 + COMMENTS.length) % COMMENTS.length);
  };
  const handleNext = () => {
    setStart((prev) => (prev + 1) % COMMENTS.length);
  };

  const visibleComments = Array.from({ length: visibleCount }, (_, i) => COMMENTS[(start + i) % COMMENTS.length]);

  return (
    <div className="py-16 px-12 bg-black">
      <div className=" mx-auto px-4">
        <div className="text-white mb-8">Hear what our customers say :)</div>
        <div className="flex gap-6 items-stretch">
          {visibleComments.map((c, idx) => (
            <CommentCard key={idx} {...c} className="flex-1" />
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center border border-white bg-gray-900 rounded-md text-white text-xl hover:bg-gray-700 transition-colors shadow-lg"
            aria-label="Previous"
          >
            {'<'}
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center border border-white bg-gray-900 rounded-md text-white text-xl hover:bg-gray-700 transition-colors shadow-lg"
            aria-label="Next"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};
