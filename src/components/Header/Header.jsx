/**
 * Mighty Code
 *
 * @module /src/components/Header/Header.jsx
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// Components
import SkipLink from '../SkipLink/SkipLink.jsx';

// CSS
import styles from './Header.module.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component Header
 * @description The site's header component.
 *
 * @param {array} links - Object containing data for the top-level "Overview" link, as well as an array of second-level nav items. Required.
 */
const Header = ({ links }) => {

  // If no nav link data is available, don't render this component
  if (links.length < 1) {
    return;
  }

  /**
   * Generates a linked logo.
   * @returns {jsx} Logo link jsx.
   */
  const generateLogo = () => {
    return (
      <a className={styles.logoLink} href="/" aria-label="Maggie Bittarelli's Personal Site">
        <img src="/uploads/mighty-mags.webp" alt="Mighty Code" className={styles.logo}/>
      </a>
    );
  }

  /**
   * Generates a list of nav links.
   * @returns {jsx} JSX for header nav links.
   */
  const generateNavLinks = () => {
    // Initialize an array to hold nav link jsx
    let jsx = [];

    // Build a list item nav link for each menu option
    for (let link of links) {

      // Add desktop/mobile-only class, as appropriate
      let dynamicClass;
      if (!link.showOnMobile) {
        dynamicClass = 'desktop-only';
      }
      if (!link.showOnDesktop) {
        dynamicClass = 'mobile-only';
      }

      // Build nav link
      jsx.push(
        <li
          key={link.copy.toLowerCase().replaceAll(' ', '-')}
          className={[styles.navLinkItem, dynamicClass].join(' ')}>
          <a
            key={link.copy.toLowerCase().replaceAll(' ', '-')}
            href={link.linkHref} 
            className={styles.navLink}
            aria-label={link.copy}
          >
            <p className={styles.linkCopy}>{link.copy}</p>
          </a>
        </li>
      );
    }

    return jsx;
  }

  return (
    <header id="header">
      <div>
        <SkipLink />

        {/* Logo */}
        {generateLogo()}

        {/* Nav Links */}
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            {generateNavLinks()}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;