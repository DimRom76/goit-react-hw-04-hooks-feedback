import { useState } from 'react';
import Section from './Components/Section';
import FeedbackOptions from './Components/FeedbackOptions';
import Statistics from './Components/Statistics';
import Notification from './Components/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const typeFeedBack = { good, neutral, bad };

  const handleIncrement = event => {
    const statisticName = event.target.name;

    switch (statisticName) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = totalFeedback => {
    return totalFeedback === 0 ? 0 : Math.round((good * 100) / totalFeedback);
  };

  const totalFeedback = countTotalFeedback();
  const positivFeedback = countPositiveFeedbackPercentage(totalFeedback);

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={typeFeedBack}
          onLeaveFeedback={handleIncrement}
        />
      </Section>
      <Section title="Statistics">
        {positivFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positivFeedback}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </div>
  );
}
