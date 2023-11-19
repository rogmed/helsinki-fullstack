const Header = ({ text }) => <h1>{text}</h1>


const Total = ({ course }) => {
  let total = 0;
  course.parts.forEach(part => {
    total += part.exercises
  });

  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(p => <Part key={p.id} part={p} />)}
  </>

const Course = ({ course }) =>
  <>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total course={course} />
  </>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App