import { useState } from "react";
const Home = ({ age }) => {
  const [score, setScore] = useState(0);

  const increment = () => {
    setScore(score + 1);
  };
  const decrement = () => {
    setScore(score + 1);
  };
  //   let names = "John";
  //   const handleClick = (name) => {
  //     alert(`Hello ${name}`);
  //   };
  //   if (age > 18) {
  //     return (
  //       <>
  //         <h1>
  //           Hello {names}, You are {age}
  //         </h1>
  //       </>
  //     );
  //   } else {
  //     return <h2>Welcome</h2>;
  //   }
  //   return age > 18 ? <h2>Hello {names}</h2> : <h2>Welcome</h2>;
  //   return (
  //     <>
  //       <h2>Hello Word</h2>
  //       <button onClick={() => handleClick("Stan")}>Click</button>
  //     </>
  //   );
  return (
    <>
      <p>{score}</p>
      <button onClick={increment}>Increment button</button>
      <button onClick={decrement}>Decrement button</button>
    </>
  );
};

export default Home;
