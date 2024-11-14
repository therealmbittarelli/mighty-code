/**
 * Mighty Code
 *
 * @module /src/components/TriviaWidget/TriviaWidget.tsx
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// CSS
import './TriviaWidget.css';

//------------------------------------------------------------------------------
// Interfaces
//------------------------------------------------------------------------------
interface DataProps {
  question: string;
  options: string[];
  answer: string;
}

interface DataPropsArray {
  questions: DataProps[];
};

interface TriviaWidgetProps {
  data: DataPropsArray;
}

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component TriviaWidget
 * @description The site's TriviaWidget component.
 */
const TriviaWidget: React.FC<TriviaWidgetProps> = ({ data }) => {

  // If no trivia data is available, don't render this component
  if (data.questions.length === 0) return null;

  /**
   * Generates JSX element options for the trivia question.
   * @param options -  Array of answer options related to a trivia question. 
   * @returns {JSX.Element} JSX element containing list item trivia options.
   */
  const generateOptions = (options: string[]): JSX.Element => {

    // Generate jsx for each option
    const jsxOptions = options.map((option) => (
      <li
        key={option.toLowerCase().replaceAll(' ', '-')}
        className="trivia-option"
      >
        {option}
      </li>
    ));

    return <>{jsxOptions}</>;
  }

  /**
   * Generates the content of the trivia card, back and front.
   * @returns {JSX.Element} Trivia card jsx.
   */
  const generateTriviaItem = (): JSX.Element | undefined => {
    // Choose a random index number from 0 to the number of trivia questions available
    const index: number = Math.floor(Math.random() * data.questions.length);
    // Grab the trivia item corresponding to the random index number
    const triviaItem: DataProps | undefined = data.questions[index];

    // Don't render if there's no trivia data available
    if (!triviaItem) {
      return;
    }

    // Return JSX for the back and front of the trivia card
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
    );
  }

  return (
    <>
      {generateTriviaItem()}
    </>
  )

}

export default TriviaWidget;