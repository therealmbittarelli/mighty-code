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
import './Header.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component Header
 * @description The site's header component.
 *
 * @param {array} links - Object containing data for the top-level "Overview" link, as well as an array of second-level nav items. Optional.
 */
const Header = ({ links = [] }) => {

  /**
   * Generates a linked logo.
   * @returns {jsx} Logo link jsx.
   */
  const generateLogo = () => {
    return (
      <a
        className="logo-link"
        href="/"
        aria-label="Maggie Bittarelli's Personal Site"
      >
        <img
          src="/uploads/mighty-mags.webp"
          alt="Mighty Code"
          className="logo"
        />
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
          className={dynamicClass}>
          <a
            key={link.copy.toLowerCase().replaceAll(' ', '-')}
            href={link.linkHref} 
            className="nav-link"
            aria-label={link.copy}
          >
            <p className="link-copy">{link.copy}</p>
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
        {
          links.length > 0 &&
            <nav className="nav">
              <ul className="nav-links">
                {generateNavLinks()}
              </ul>
            </nav>
        }
      </div>
    </header>
  )
}

export default Header;