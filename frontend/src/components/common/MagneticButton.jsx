import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Subtle Magnetic interaction wrapper for major CTA buttons on desktop.
 * Gracefully disabled on mobile & touch devices.
 */
export const MagneticButton = ({
  children,
  to,
  onClick,
  type = 'button',
  className = '',
  strength = 18,
  ...props
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Disable on mobile/touch screens
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;

    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Small bounded translation
    const x = (distanceX / rect.width) * strength;
    const y = (distanceY / rect.height) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.15s ease-out',
  };

  if (to) {
    return (
      <Link
        ref={buttonRef}
        to={to}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};
