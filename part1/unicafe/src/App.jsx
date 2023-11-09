import { useState } from 'react'

const Statistics = (props) => {
  const { good, neutral, bad } = props.feedback;
  const total = good + neutral + bad;

  return (
    <p>
      good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {total}<br />
      average {(good + bad * -1) / total}<br />
      positive {(good / total) * 100}%
    </p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = { good, neutral, bad };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics feedback={feedback} />
    </div>
  )
}

export default App