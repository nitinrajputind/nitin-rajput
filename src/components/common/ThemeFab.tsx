"use client";
import React from "react";
import { useTheme } from "@/components/common/ThemeProvider";

export default function ThemeFab() {
  const { theme, toggleTheme } = useTheme();
  const onClick = () => {
    const btn = document.querySelector('.theme_fab') as HTMLElement | null;
    if (!btn) { toggleTheme(); return; }
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Colors for effect
    const nextBg = theme === 'dark' ? '#ffffff' : '#0b1220';

    // Create a radial ripple expanding from the FAB (fill)
    const rippleFill = document.createElement('div');
    rippleFill.className = 'theme_ripple';
    rippleFill.style.left = `${cx}px`;
    rippleFill.style.top = `${cy}px`;
    rippleFill.style.background = nextBg;

    // Create a concentric edge ripple for split effect
    const rippleEdge = document.createElement('div');
    rippleEdge.className = 'theme_ripple';
    rippleEdge.style.left = `${cx}px`;
    rippleEdge.style.top = `${cy}px`;
    rippleEdge.style.background = 'transparent';
    rippleEdge.style.border = '2px solid var(--theme-color)';

    // Ensure size covers farthest corner
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxX = Math.max(cx, vw - cx);
    const maxY = Math.max(cy, vh - cy);
    const radius = Math.hypot(maxX, maxY);
    const diameter = radius * 2;
    const commonSize = `${diameter}px`;
    const applyBaseStyles = (el: HTMLDivElement) => {
      el.style.width = commonSize;
      el.style.height = commonSize;
      el.style.position = 'fixed';
      el.style.borderRadius = '50%';
      el.style.pointerEvents = 'none';
      el.style.transform = 'translate(-50%, -50%) scale(0)';
      el.style.transition = 'transform 650ms ease, opacity 650ms ease';
      el.style.zIndex = '9999';
    };
    applyBaseStyles(rippleFill);
    applyBaseStyles(rippleEdge);
    rippleFill.style.opacity = '0.22';
    rippleEdge.style.opacity = '0.45';

    document.body.appendChild(rippleFill);
    document.body.appendChild(rippleEdge);

    // Animate
    requestAnimationFrame(() => {
      rippleFill.style.transform = 'translate(-50%, -50%) scale(1)';
      rippleFill.style.opacity = '0';
      // Edge starts slightly later to create a split look
      setTimeout(() => {
        rippleEdge.style.transform = 'translate(-50%, -50%) scale(1)';
        rippleEdge.style.opacity = '0';
      }, 60);
    });

    // Toggle mid-animation for a seamless reveal
    window.setTimeout(() => { toggleTheme(); }, 280);
    window.setTimeout(() => { rippleFill.remove(); rippleEdge.remove(); }, 720);
  };

  return (
    <button
      aria-label="Toggle theme"
      aria-pressed={theme === 'light'}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="theme_fab"
      onClick={onClick}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {theme === 'dark' ? (
          // Moon
          <path d="M21 12.79C20.24 13.08 19.42 13.24 18.57 13.24C14.66 13.24 11.5 10.08 11.5 6.17C11.5 5.32 11.66 4.5 11.95 3.74C7.85 4.99 5 8.71 5 13C5 17.97 9.03 22 14 22C18.29 22 22.01 19.15 23.26 15.05C22.5 15.34 21.68 15.5 20.83 15.5C20.16 15.5 19.5 15.42 18.86 15.27C19.61 14.64 20.26 13.78 21 12.79Z" fill="currentColor"/>
        ) : (
          // Sun
          <g fill="currentColor">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        )}
      </svg>
    </button>
  );
}


