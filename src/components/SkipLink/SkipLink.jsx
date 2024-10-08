/**
 * Mighty Code.
 *
 * @module /src/components/Header/SkipLink/SkipLink.jsx
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
  const ref = useRef();

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
   * @returns {null} Hides the link after a short delay.
   */
  const delayHideLink = () => {
    // Link should remain visible for a short time after losing focus
    setTimeout(() => {
      // Reset top to trigger CSS transition
      ref.current.style.top = "-48px";
    }, 2000)
  }

  /**
   * Triggered on focus of "Skip to main content" link.
   * @returns {null} Shows the link.
   */
  const showLink = () => {
    // Set link top to 0 to trigger CSS transition
    ref.current.style.top = 0;
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