const Header = (props) => {
  return (
    <h1>{props.course}</h1>

  )
}

const Part = (props) => {
  return (
    <p>{props.title} {props.exercises}</p>
  )
}

const Content = (props) => {
  const parts = props.parts;
  console.log(parts);
  return (
    <div>
      <Part title={parts[0].name} exercises={parts[0].exercises} />
      <Part title={parts[1].name} exercises={parts[1].exercises} />
      <Part title={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  const parts = props.parts;
  let total = 0;
  parts.forEach(part => {
    total += part.exercises;
  });
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App