import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

interface HoverRevealProps {
  /** Exact full text to display ONLY when the element is truncated with '...' */
  text: string;
  /** Class name for the truncated text container (e.g. 'truncate') */
  className?: string;
}

/**
 * Smart Truncation-Only Tooltip:
 * Only appears on hover if the text inside is actually cut off with "..." (scrollWidth > clientWidth).
 * Displays ONLY the uncut text itself, without any extra titles or descriptions.
 */
export const HoverReveal: React.FC<HoverRevealProps> = ({
  text,
  className = 'truncate',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{
    x: number;
    y: number;
    placement: 'top' | 'bottom';
  }>({ x: 0, y: 0, placement: 'top' });
  const textRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    const el = textRef.current;
    if (!el) return;

    // Only show tooltip if the text is genuinely truncated ("...")
    const isTruncated = el.scrollWidth > el.clientWidth + 1;
    if (!isTruncated) {
      setIsOpen(false);
      return;
    }

    const rect = el.getBoundingClientRect();
    const rawCenterX = rect.left + rect.width / 2;
    const clampedX = Math.max(
      160,
      Math.min(window.innerWidth - 160, rawCenterX)
    );

    const placeBottom = rect.top < 80;
    const y = placeBottom ? rect.bottom + 8 : rect.top - 8;

    setCoords({
      x: clampedX,
      y,
      placement: placeBottom ? 'bottom' : 'top',
    });
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div
        ref={textRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {text}
      </div>
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: coords.placement === 'top' ? 4 : -4,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                }}
                transition={{ duration: 0.12 }}
                style={{
                  position: 'fixed',
                  left: coords.x,
                  top: coords.y,
                  transform:
                    coords.placement === 'top'
                      ? 'translate(-50%, -100%)'
                      : 'translate(-50%, 0%)',
                  zIndex: 9999,
                }}
                className="pointer-events-none w-max max-w-md rounded-xl bg-slate-950 border border-cyan-400 px-3.5 py-2 text-sm xl:text-base font-bold text-white shadow-2xl"
              >
                {text}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
