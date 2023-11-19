const Header = ({ text }) => <h1>{text}</h1>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(p => <Part key={p.id} part={p} />)}
  </>

const Total = ({ course }) => {
  const parts = course.parts;
  const total = parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

const Course = ({ course }) =>
  <>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total course={course} />
  </>

const Courses = ({ courses }) =>
  courses.map(course =>
    <Course key={course.id} course={course} />
  )

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App