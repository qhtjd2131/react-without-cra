import React from "react";
import "./App.css";
import styled from "styled-components";

//styled-components
const Square = styled.div`
  width: 200px;
  height: 200px;
  background-color: violet;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

//data
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];

//components
const TestStyledComponent = () => {
  return (
    <Square>
      {sumTwoInt({ num1: 5, num2: 12 })}
      {printString("TEST")}

      <span>{sumArr(arr1)}</span>
      <span>{doubleArr(arr1)}</span>
    </Square>
  );
};

//functions
const sumTwoInt = ({ num1, num2 }: sumTwoIntProps) => {
  return num1 + num2;
};

const sumArr = (arr: number[]) => {
  let sum = 0;
  arr.forEach((num) => {
    sum += num;
  });
  return sum;
};

const doubleArr = (arr: number[]) => {
  return arr.map((num) => {
    let num_tmp = num * 2;
    return num_tmp;
  });
};

const printString = (str: string) => {
  return str;
};

//interface
interface sumTwoIntProps {
  num1: number;
  num2: number;
}

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="app">React App Without CRA!-----!</div>
      <TestStyledComponent />
    </div>
  );
};

export default App;
