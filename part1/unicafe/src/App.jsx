import { useState } from 'react'

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) =>
  <tr><td>{text}</td><td>{value}</td></tr>

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
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + "%"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = { good, neutral, bad };

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [anecdoteVotes, setAnecdoteVotes] =
    useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length));

  const selectRandom = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  const vote = (position) => {
    const copy = { ...anecdoteVotes };
    copy[position] += 1;
    setAnecdoteVotes(copy);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <Statistics feedback={feedback} />
      <h1>Anecdotes</h1>
      <Button onClick={() => vote(selected)} text="Vote" />
      <Button onClick={selectRandom} text="Next anecdote" /><br />
      {anecdotes[selected]}<br />
      <p>has {anecdoteVotes[selected]} votes</p>
    </div>
  )
}

export default App