import { useState } from 'react'

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>{text}</button>

const Anecdote = ({ anecdote, votes }) => (
  <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
)

const MaxAnecdote = ({ anecdotes, anecdoteVotes }) => {
  const index = indexOfMax(anecdoteVotes);

  return (
    <>
      <Anecdote anecdote={anecdotes[index]} votes={anecdoteVotes[index]} />
    </>
  )
}

const App = () => {

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
    const copy = [...anecdoteVotes];
    copy[position] += 1;
    setAnecdoteVotes(copy);
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      <Button onClick={() => vote(selected)} text="Vote" />
      <Button onClick={selectRandom} text="Next anecdote" /><br />
      <Anecdote anecdote={anecdotes[selected]} votes={anecdoteVotes[selected]} />
      <h1>Anecdote with most votes</h1>
      <MaxAnecdote anecdotes={anecdotes} anecdoteVotes={anecdoteVotes} />
    </div>
  )
}

function indexOfMax(arr) {
  if (arr.length == 0) {
    return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

export default App