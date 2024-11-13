/**
 * Mighty Code
 *
 * @module /src/components/TriviaWidget/TriviaWidget.jsx
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// CSS
import './TriviaWidget.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component TriviaWidget
 * @description The site's TriviaWidget component.
 *
 * @param {array} data - Array containing data for the widget, including questions, options, and answers. Required.
 */
const TriviaWidget = ({ data }) => {

  // If no trivia data is available, don't render this component
  if (data.length < 1) {
    return;
  }

  /**
   * Generates options for the trivia question.
   * @returns {jsx} Trivia options jsx.
   */
  const generateOptions = (options) => {
    // Initialize an array to hold jsx for each option
    let jsx = [];

    // Generate jsx for each option
    for (let i=0; i < options.length; i++) {
      jsx.push(
        <li
          key={options[i].toLowerCase().replaceAll(' ', '-')}
          class="trivia-option"
        >
          {options[i]}
        </li>
      )
    }

    return jsx;
  }

  /**
   * Generates the content of the trivia card, back and front.
   * @returns {jsx} Trivia card jsx.
   */
  const generateTriviaItem = () => {
    // Choose a random index number
    let index = Math.floor(Math.random() * 8);

    // Grab the trivia item corresponding to the random index number
    let triviaItem = data.questions[index];

    // Don't render if there's no trivia data available
    if (!triviaItem) {
      return;
    }

    // Return the back and front of the trivia card
    return (
      <div id="trivia-card">
        <div id="front">
          <p>{triviaItem.question}</p>
          <ul id="trivia-options">
            {generateOptions(triviaItem.options)}
          </ul>
        </div>
        <div id="back">
          <p>{triviaItem.answer}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {generateTriviaItem()}
    </>
  )

}

export default TriviaWidget;