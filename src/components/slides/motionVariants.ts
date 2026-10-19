import type { Variants } from 'motion/react';

export type SlideTransitionStyle = 'cube' | 'fade-scale';

export interface SlideTransitionCustom {
  direction: number;
  style: SlideTransitionStyle;
}

/**
 * Dramatic Keynote-grade slide stage variants supporting:
 * 1. 'cube': 3D Slide-Cube rotation along the Y-axis with depth scaling
 * 2. 'fade-scale': Cinematic depth zoom with smooth vertical settle
 */
export const slideStageVariants: Variants = {
  initial: ({ direction, style }: SlideTransitionCustom) => {
    if (style === 'cube') {
      return {
        opacity: 0,
        rotateY: direction > 0 ? 74 : -74,
        x: direction > 0 ? '54%' : '-54%',
        scale: 0.86,
        transformOrigin: direction > 0 ? 'left center' : 'right center',
      };
    }
    return {
      opacity: 0,
      scale: 0.86,
      y: direction > 0 ? 28 : -28,
      transformOrigin: 'center center',
    };
  },
  animate: ({ style }: SlideTransitionCustom) => {
    if (style === 'cube') {
      return {
        opacity: 1,
        rotateY: 0,
        x: '0%',
        scale: 1,
        transformOrigin: 'center center',
        transition: {
          type: 'spring',
          stiffness: 210,
          damping: 26,
          mass: 0.9,
        },
      };
    }
    return {
      opacity: 1,
      scale: 1,
      y: 0,
      transformOrigin: 'center center',
      transition: {
        type: 'spring',
        stiffness: 230,
        damping: 26,
        mass: 0.85,
      },
    };
  },
  exit: ({ direction, style }: SlideTransitionCustom) => {
    if (style === 'cube') {
      return {
        opacity: 0,
        rotateY: direction > 0 ? -74 : 74,
        x: direction > 0 ? '-54%' : '54%',
        scale: 0.86,
        transformOrigin: direction > 0 ? 'right center' : 'left center',
        transition: {
          duration: 0.28,
          ease: [0.32, 0, 0.67, 0],
        },
      };
    }
    return {
      opacity: 0,
      scale: 1.07,
      y: direction > 0 ? -20 : 20,
      transformOrigin: 'center center',
      transition: {
        duration: 0.24,
        ease: [0.32, 0, 0.67, 0],
      },
    };
  },
};

/**
 * Staggered container & card variants for internal slide elements
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 24,
    },
  },
};
