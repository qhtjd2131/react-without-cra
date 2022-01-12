import React from "react";
import "./App.css";
import testimage from "./testimage2.png";
import testimage2 from "./194_bartsimpson1.jpg";
import testimage3 from "./check.svg";

const TestPNGImage = () => {
  return <img src={testimage} alt="" />;
};

const TestJPGImage = () => {
  return <img src={testimage2} alt="" />;
};
const TestURLImage = () => {
  return (
    <img
      src="https://user-images.githubusercontent.com/34260967/149068669-19c513da-cf57-48df-b6e4-4efa37db2869.png"
      alt=""
    />
  );
};

const TestSVGImage = () => {
  return <img src={testimage3} alt="" />;
};

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="app">React App Without CRA!-----!</div>
      <TestPNGImage />
      <TestJPGImage />
      <TestURLImage />
      <TestSVGImage />
    </div>
  );
};

export default App;

// const TestImage = () => {
//   return (
//     <img
//       src="https://user-images.githubusercontent.com/34260967/149068669-19c513da-cf57-48df-b6e4-4efa37db2869.png"
//       alt=""
//     />
//   );
// };
