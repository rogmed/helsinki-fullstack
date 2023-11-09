import { useState } from 'react'

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) =>
  <>{text} {value}</>

const Statistics = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;

  if (total == 0) {
    return (
      <p>No feedback given</p>
    )
  }

  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <StatisticLine text="good" value={good} /><br />
      <StatisticLine text="neutral" value={neutral} /><br />
      <StatisticLine text="bad" value={bad} /><br />
      <StatisticLine text="all" value={total} /><br />
      <StatisticLine text="average" value={average} /><br />
      <StatisticLine text="positive" value={positive + "%"} /><br />
    </div>
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
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics feedback={feedback} />
    </div>
  )
}

export default App