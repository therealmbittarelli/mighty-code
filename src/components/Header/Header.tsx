/**
 * Mighty Code
 *
 * @module /src/components/Header/Header.tsx
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// Components
import SkipLink from '../SkipLink/SkipLink.tsx';

// CSS
import './Header.css';


//------------------------------------------------------------------------------
// Interfaces
//------------------------------------------------------------------------------
interface Link {
  copy: string;
  linkHref: string;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

interface HeaderProps {
  links?: Link[];
}

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component Header
 * @description The site's header component.
 */
const Header: React.FC<HeaderProps> = ({ links = [] }) => {

  /**
   * Generates a linked logo.
   * @returns {JSX.Element} Logo link jsx.
   */
  const generateLogo = (): JSX.Element => {
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
   * @returns {JSX.Element[]} JSX for header nav links.
   */
  const generateNavLinks = (): JSX.Element[] | undefined => {
    // Don't render nav links if no links data is available
    if (links.length === 0) {
      return;
    }

    // Initialize an array to hold nav link jsx
    let jsx: Array<JSX.Element> = [];

    // Build a list item nav link for each menu option
    for (let link of links) {

      // Add desktop/mobile-only class, as appropriate
      let dynamicClass: string = '';
      if (!link?.showOnMobile) {
        dynamicClass = 'desktop-only';
      }
      if (!link?.showOnDesktop) {
        dynamicClass = 'mobile-only';
      }

      // Build nav link
      jsx.push(
        <li
          key={link.copy.toLowerCase().replaceAll(' ', '-')}
          className={dynamicClass}>
          <a
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