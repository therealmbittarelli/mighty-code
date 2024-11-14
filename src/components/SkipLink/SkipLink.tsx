/**
 * Mighty Code.
 *
 * @module /src/components/Header/SkipLink/SkipLink.tsx
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// Libraries
import { useEffect, useRef } from 'react';

// CSS
import './SkipLink.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component SkipLink
 * @description For keyboard users - this link skips navigation to the page's main content.
 */
const SkipLink = () => {

  // Reference to this component
  const ref = useRef<HTMLAnchorElement | null>(null);

  /**
   * Side effect:
   * - runs once on load
   * - listens for focus and blur on the link
   */
  useEffect(() => {
    // Listen for focus and blur
    ref.current?.addEventListener('focus', showLink);
    ref.current?.addEventListener('blur', delayHideLink);

    // Clean up - remove event listeners
    return () => {
      ref.current?.removeEventListener('focus', showLink);
      ref.current?.removeEventListener('blur', delayHideLink);
    }
  }, []);

  /**
   * Triggered when the "Skip to main content" link loses focus.
   */
  const delayHideLink = ():void => {
    // Link should remain visible for a short time after losing focus
    setTimeout(() => {
        if (ref.current && ref.current.style) {
          // Reset top to trigger CSS transition
          ref.current.style.top = "-48px";
        }
      }, 2000);
  }

  /**
   * Triggered on focus of "Skip to main content" link.
   */
  const showLink: () => void = () => {
    // Set link top to 0 to trigger CSS transition
    if (ref.current && ref.current.style) {
      ref.current.style.top = "0";
    }
  }


  return (
    <a href="#main-content"
        id="skip-link"
        ref={ref}
        data-ga-component="skip-link"
    >
      Skip to content
    </a>
  );
}

export default SkipLink;