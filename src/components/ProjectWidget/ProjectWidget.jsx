/**
 * Mighty Code
 *
 * @module /src/components/ProjectWidget/ProjectWidget.jsx
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// Libraries
import React, { useState } from 'react';

// CSS
import styles from './ProjectWidget.module.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component ProjectWidget
 * @description A tabbed widget that displays project descriptions.
 *
 * @param {array} projects - Object containing data for the top-level "Overview" link, as well as an array of second-level nav items. Required.
 */
const ProjectWidget = ({ projects }) => {

  const [selectedButton, setSelectedButton] = useState('tab-0'); // the id of the selected button
  const [projectNumber, setProjectNumber] = useState(0); // the number found in the id of each project's button

  /**
   * Handles a user's click on a project button.
   * @param {event} evt - A click event on a project button.
   * @returns {null} Sets state values to reflect the currently active/selected project.
   */
  const handleClick = (evt) => {
    evt.preventDefault();

    // Update selectedButton state with the target's id
    setSelectedButton(evt.target.id);

    // Update projectNumber state by pulling the number used in the target's id
    let tabNumber = evt.target.id.split('-')[1];
    setProjectNumber(tabNumber);

    // Render the selected project's description
    generateProjectDescription(tabNumber);
  }

  /**
   * Generates formatted description paragraphs; enables line breaks from the received JSON data.
   * @returns {jsx} Formatted project description jsx.
   */
  const formatDescription = (description) => {
    // Split project descriptions at '\n' to enable line break effects
    return description.split('\n').map((line, index) => 
      (
        <React.Fragment key={index}>
          {line}
          <br></br>
        </React.Fragment>
      )
    );
  };

  /**
   * Generates the description of the project, including heading, link, copy, and tags.
   * @returns {jsx} Project description jsx.
   */
  const generateProjectDescription = () => {
    return (
        <div
          key={projects[projectNumber].name}
          role="tabpanel"
          aria-labelledby={selectedButton}
          className={styles.projectDescription}
        >

          <h3 className={styles.projectName}>{projects[projectNumber].name}</h3>
          <span>
            <a
              className={styles.visitLink}
              href={projects[projectNumber].linkLive}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visit
            </a>
          </span>
          <p className={styles.description}>
            {projects[projectNumber].description && formatDescription(projects[projectNumber].description)}
          </p>
          <ul className={styles.descriptionLinksList}>
            {generateDescriptionLinks(projects[projectNumber].descriptionLinks, projects[projectNumber].name)}
          </ul>

          <ul className={styles.tagList}>
            {generateTags(projects[projectNumber])}
          </ul>

        </div>
    );
  }

  /**
   * Generates bulleted list links containing information about my participation in a given project, as available.
   * @param {array} links - An array of description bullet links.
   * @param {string} projectName - The name of the project.
   * @returns {jsx} List item project description links jsx.
   */
  const generateDescriptionLinks = (links, projectName) => {
    // Initialize array to hold description links jsx to be returned
    let jsx = [];

    // Initialize counter for use as each `<li>`'s React key
    let count = 0;

    // Generate a description link
    for (let link of links) {
      jsx.push(
        <li
          key={`description-${projectName.toLowerCase().replaceAll(' ', '-')}-${count}`}
          className={styles.descriptionLinkItem}
        >
          <a
            href={`${link.href}`}
            rel="noreferrer noopener"
            target="_blank"
            className={styles.descriptionLink}
          >
            {link.siteName}
          </a>
        </li>
      );
      count++;
    }

    return jsx;
  }

  /**
   * Generates a button for each featured project.
   * @returns {jsx} JSX for a list of project buttons.
   */
  const generateProjectButtons = () => {
    // Initialize array to hold button jsx to be returned
    let jsx = [];

    // For each project, create a button
    for (let i=0; i < projects.length; i++) {
      // Set even or odd class for styling purposes
      let evenOddClassName = i % 2 !== 0 ? 'even' : 'odd';

      // Set selected class on the currently selected button
      let selectedClass = selectedButton === `tab-${i}` ? 'selected' : '';

      // Build button jsx
      jsx.push(
        <li key={`tab-${i}`} className={styles.listItem}>
          <button
            className={[styles.buttonTab, selectedClass].join(' ')}
            onClick={(evt) => handleClick(evt)}
            id={`tab-${i}`}
            aria-current={selectedButton === `tab-${i}` ?
              true :
              false
            }
          >
            <span
              className={[styles.buttonName, styles[`${evenOddClassName}`]].join(' ')}
            >
              {projects[i].name}
            </span>
          </button>
        </li>
      );
    }

    return jsx;
  }

  /**
   * Generates pill-styled tags for each technology used on a project.
   * @param {object} project - An object containing project data.
   * @returns {jsx} Jsx for tags that highlight technologies used on a project.
   */
  const generateTags = (project) => {
    // Initialize array to hold tag jsx to be returned
    let jsx = [];

    // Create a tag for each technology used
    for (let tag of project.tags) {
      jsx.push(
        <li key={`${project.name}-${tag}`} className={styles.tag}>
          {tag}
        </li>
      );
    }

    return jsx;
  }

  // Return the Project Widget
  return (
    <div className={styles.projectWidget}>
      <div>
        <h2>Projects</h2>
        <ul className={styles.projectButtons}>
          {generateProjectButtons()}
        </ul>
      </div>

      <div>
        {generateProjectDescription()}
      </div>
    </div>
  );

}

export default ProjectWidget;