import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import CategoryCard from './CategoryCard';
import { categoriesData } from '../data/categories';
import './CategorySection.css';

// 4 repeated sets to guarantee seamless infinite loop without blank gaps
const REPEATED_SETS = 4;
const TOTAL_UNIQUE = categoriesData.length; // 10
const repeatedCategories = Array.from({ length: REPEATED_SETS }, () => categoriesData).flat();

export default function CategorySection({ onSelectCategory }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef({ x: 0 });
  const dimensionsRef = useRef({ itemWidth: 0, gap: 16, stepWidth: 0, setWidth: 0, visibleCount: 8 });
  const autoSlideTimerRef = useRef(null);
  const activeTweenRef = useRef(null);
  const isInteractingRef = useRef(false);
  const dragDataRef = useRef({ startX: 0, startPos: 0, hasMoved: false, pointerId: null });
  const hasMovedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const getVisibleCount = (width) => {
    if (width >= 1024) return 8;
    if (width >= 768) return 4;
    if (width >= 481) return 3;
    return 2.3;
  };

  const getGap = (width) => {
    if (width >= 1024) return 16;
    if (width >= 768) return 16;
    if (width >= 481) return 12;
    return 10;
  };

  // Schedule auto-slide timer (4.5s)
  const scheduleAutoSlide = useCallback(() => {
    clearTimeout(autoSlideTimerRef.current);
    if (isInteractingRef.current) return;

    autoSlideTimerRef.current = setTimeout(() => {
      slideNext();
    }, 4500);
  }, []);

  // Slide left by one category step
  const slideNext = useCallback(() => {
    if (isInteractingRef.current) return;
    const { stepWidth, setWidth } = dimensionsRef.current;
    if (!stepWidth || !trackRef.current) return;

    if (activeTweenRef.current) {
      activeTweenRef.current.kill();
    }

    const targetX = posRef.current.x + stepWidth;

    activeTweenRef.current = gsap.to(posRef.current, {
      x: targetX,
      duration: 1.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (trackRef.current) {
          gsap.set(trackRef.current, { x: -posRef.current.x });
        }
      },
      onComplete: () => {
        // Seamless infinite wrap:
        // Set 0 is [0..9], Set 1 is [10..19], Set 2 is [20..29], Set 3 is [30..39].
        // When pos reaches or passes Set 2 start (20 * stepWidth), subtract setWidth (10 * stepWidth).
        while (posRef.current.x >= 20 * stepWidth) {
          posRef.current.x -= setWidth;
        }
        while (posRef.current.x < 10 * stepWidth) {
          posRef.current.x += setWidth;
        }
        if (trackRef.current) {
          gsap.set(trackRef.current, { x: -posRef.current.x });
        }
        scheduleAutoSlide();
      },
    });
  }, [scheduleAutoSlide]);

  // Dimension measurement and resize handling
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const updateDimensions = () => {
      const width = viewport.clientWidth;
      if (width <= 0) return;

      const visibleCount = getVisibleCount(width);
      const gap = getGap(width);
      const itemWidth = (width - (visibleCount - 1) * gap) / visibleCount;
      const stepWidth = itemWidth + gap;
      const setWidth = TOTAL_UNIQUE * stepWidth;

      const oldStepWidth = dimensionsRef.current.stepWidth;
      dimensionsRef.current = { itemWidth, gap, stepWidth, setWidth, visibleCount };

      viewport.style.setProperty('--category-item-width', `${itemWidth}px`);
      viewport.style.setProperty('--category-gap', `${gap}px`);

      if (!oldStepWidth) {
        // Initial setup: start at Set 1 (index 10) so the first 8 items are shown on desktop
        posRef.current.x = 10 * stepWidth;
      } else {
        // Maintain relative index on resize
        const currentIndex = posRef.current.x / oldStepWidth;
        posRef.current.x = currentIndex * stepWidth;
      }

      gsap.set(track, { x: -posRef.current.x });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(viewport);

    // Initial auto-slide
    scheduleAutoSlide();

    return () => {
      resizeObserver.disconnect();
      clearTimeout(autoSlideTimerRef.current);
      if (activeTweenRef.current) {
        activeTweenRef.current.kill();
      }
    };
  }, [scheduleAutoSlide]);

  // Pointer drag/swipe handling
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isInteractingRef.current = true;
    hasMovedRef.current = false;
    clearTimeout(autoSlideTimerRef.current);
    if (activeTweenRef.current) {
      activeTweenRef.current.kill();
    }

    dragDataRef.current = {
      startX: e.clientX,
      startPos: posRef.current.x,
      hasMoved: false,
      pointerId: e.pointerId,
    };
    // DO NOT call setPointerCapture here!
    // Capturing pointer on pointerdown redirects mouse click events away from child <a> elements on desktop.
  };

  const handlePointerMove = (e) => {
    if (!isInteractingRef.current || dragDataRef.current.pointerId !== e.pointerId) return;

    const dx = e.clientX - dragDataRef.current.startX;
    if (!dragDataRef.current.hasMoved && Math.abs(dx) > 5) {
      dragDataRef.current.hasMoved = true;
      hasMovedRef.current = true;
      setIsDragging(true);
      // ONLY capture pointer when actual drag movement occurs
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (err) {
        // Ignore
      }
    }

    if (dragDataRef.current.hasMoved) {
      const { stepWidth, setWidth } = dimensionsRef.current;
      if (!stepWidth) return;

      let newX = dragDataRef.current.startPos - dx;
      while (newX >= 20 * stepWidth) {
        newX -= setWidth;
        dragDataRef.current.startPos -= setWidth;
      }
      while (newX < 10 * stepWidth) {
        newX += setWidth;
        dragDataRef.current.startPos += setWidth;
      }

      posRef.current.x = newX;
      if (trackRef.current) {
        gsap.set(trackRef.current, { x: -newX });
      }
    }
  };

  const handlePointerUp = (e) => {
    if (dragDataRef.current.pointerId !== e.pointerId) return;

    if (dragDataRef.current.hasMoved) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignore
      }
    }

    isInteractingRef.current = false;

    const { stepWidth, setWidth } = dimensionsRef.current;
    if (stepWidth && dragDataRef.current.hasMoved) {
      // Snap to nearest category item smoothly
      const nearestIndex = Math.round(posRef.current.x / stepWidth);
      const snapTarget = nearestIndex * stepWidth;

      activeTweenRef.current = gsap.to(posRef.current, {
        x: snapTarget,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => {
          if (trackRef.current) {
            gsap.set(trackRef.current, { x: -posRef.current.x });
          }
        },
        onComplete: () => {
          while (posRef.current.x >= 20 * stepWidth) posRef.current.x -= setWidth;
          while (posRef.current.x < 10 * stepWidth) posRef.current.x += setWidth;
          if (trackRef.current) {
            gsap.set(trackRef.current, { x: -posRef.current.x });
          }
          setTimeout(() => {
            hasMovedRef.current = false;
            setIsDragging(false);
          }, 80);
          scheduleAutoSlide();
        },
      });
    } else {
      hasMovedRef.current = false;
      setIsDragging(false);
      scheduleAutoSlide();
    }
  };

  // Wheel handling for horizontal trackpad / shift+wheel
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let wheelTimer = null;

    const onWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!isHorizontal) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 2) return;

      e.preventDefault();

      isInteractingRef.current = true;
      clearTimeout(autoSlideTimerRef.current);
      if (activeTweenRef.current) {
        activeTweenRef.current.kill();
      }

      const { stepWidth, setWidth } = dimensionsRef.current;
      if (!stepWidth) return;

      let newX = posRef.current.x + delta;
      while (newX >= 20 * stepWidth) newX -= setWidth;
      while (newX < 10 * stepWidth) newX += setWidth;
      posRef.current.x = newX;

      if (trackRef.current) {
        gsap.set(trackRef.current, { x: -newX });
      }

      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        isInteractingRef.current = false;
        const nearestIndex = Math.round(posRef.current.x / stepWidth);
        const snapTarget = nearestIndex * stepWidth;

        activeTweenRef.current = gsap.to(posRef.current, {
          x: snapTarget,
          duration: 0.45,
          ease: 'power2.out',
          onUpdate: () => {
            if (trackRef.current) {
              gsap.set(trackRef.current, { x: -posRef.current.x });
            }
          },
          onComplete: () => {
            while (posRef.current.x >= 20 * stepWidth) posRef.current.x -= setWidth;
            while (posRef.current.x < 10 * stepWidth) posRef.current.x += setWidth;
            if (trackRef.current) {
              gsap.set(trackRef.current, { x: -posRef.current.x });
            }
            scheduleAutoSlide();
          },
        });
      }, 250);
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      viewport.removeEventListener('wheel', onWheel);
      clearTimeout(wheelTimer);
    };
  }, [scheduleAutoSlide]);

  const handleViewportClick = (e) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      return;
    }
    const card = e.target.closest('.category-card');
    if (!card) return;
    const href = card.getAttribute('href');
    if (href === '/shop/necklaces' || href === '/shop/earrings' || href === '/shop/second-studs' || href === '/shop/bracelets') {
      e.preventDefault();
      if (onSelectCategory) {
        onSelectCategory(href);
      }
    }
  };

  return (
    <section className="category-section" id="categories">
      <div className="container">
        {/* Section Heading with decorative flanking lines */}
        <div className="section-title-wrap">
          <span className="title-line"></span>
          <h2 className="section-title">SHOP BY CATEGORY</h2>
          <span className="title-line"></span>
        </div>

        {/* Carousel Viewport & Track */}
        <div className="category-carousel-wrapper">
          <div 
            className="category-carousel-viewport" 
            ref={viewportRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={handleViewportClick}
          >
            <div className="category-carousel-track" ref={trackRef}>
              {repeatedCategories.map((category, idx) => (
                <div key={`${category.id}-${idx}`} className="category-carousel-item">
                  <CategoryCard 
                    category={category} 
                    onSelectCategory={onSelectCategory}
                    isDragging={isDragging}
                    hasMovedRef={hasMovedRef}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
