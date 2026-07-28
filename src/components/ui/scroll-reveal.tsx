'use client';

import { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

// Luxury Animation Easing [0.22, 1, 0.36, 1] as specified in design brief
const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const presets: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.94, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: keyof typeof presets;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'li' | 'header' | 'footer' | 'nav' | 'main';
}

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.65,
  className = '',
  once = true,
  amount = 0.15,
  as = 'div',
}: ScrollRevealProps) {
  const preset = presets[variant] || presets.fadeUp;

  const variants: Variants = {
    hidden: preset.hidden,
    visible: {
      ...preset.visible,
      transition: {
        duration,
        delay,
        ease: LUXURY_EASE,
      },
    },
  };

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: 'div' | 'section' | 'ul' | 'main';
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  delayChildren = 0.05,
  className = '',
  once = true,
  amount = 0.1,
  as = 'div',
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  variant?: keyof typeof presets;
  duration?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'span';
}

export function StaggerItem({
  children,
  variant = 'fadeUp',
  duration = 0.6,
  className = '',
  as = 'div',
}: StaggerItemProps) {
  const preset = presets[variant] || presets.fadeUp;

  const itemVariants: Variants = {
    hidden: preset.hidden,
    visible: {
      ...preset.visible,
      transition: {
        duration,
        ease: LUXURY_EASE,
      },
    },
  };

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent variants={itemVariants} className={className}>
      {children}
    </MotionComponent>
  );
}
