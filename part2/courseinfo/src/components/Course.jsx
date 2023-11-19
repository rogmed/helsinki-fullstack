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

export default Course