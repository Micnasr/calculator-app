import { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
]

function App() {

  //displayed calculator number
  const [calc, setCalc] = useState("");
  
  //previous number state
  const [snapshot, setSnapshot] = useState("");
  
  //which operation are you using
  const [operation, setOperation] = useState("");
  
  //if you are using an operation
  const [using, setUsing] = useState(false);


  const resetHandler = () => {
    setCalc("");
  }

  const invertHandler = () => {
    setCalc(parseFloat(calc) * -1);
  }

  const operationHandler = (operation) => {
    setSnapshot(calc);
    setOperation(operation);
    setUsing(true);
  }

  //handle the operation logic
  const equalHandler = () => {
    if (operation === "+"){
      setCalc(parseFloat(snapshot) + parseFloat(calc));
      setOperation("");
      setUsing(false);
    } else if (operation === "X"){
      setCalc(parseFloat(snapshot) * parseFloat(calc));
      setOperation("");
      setUsing(false);
    } else if (operation === "-"){
      setCalc(parseFloat(snapshot) - parseFloat(calc));
      setOperation("");
      setUsing(false);
    } else if (operation === "/"){
      setCalc(parseFloat(snapshot) / parseFloat(calc));
      setOperation("");
      setUsing(false);
    }
  }

  const percentHandler = () => {
    setCalc(parseFloat(calc)/100);
  }

  const addNumber = (num) => {
    
    if (using){
      setCalc("");
      setUsing(false);
    }
    setCalc(prevCalc => prevCalc + String(num));
  }

  return (
    <div>
      <p className='center'>Michael's Calculator</p>
      <Wrapper>
        <Screen value={calc}/>
        <ButtonBox>
          {
            //Map Array to Buttons
            btnValues.flat().map((btn, i) => {
              return (
                <Button 
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={ () =>{
                    if (btn === "C"){
                      resetHandler();
                    } else if (btn === "+-") {
                      invertHandler();
                    } else if ((btn === "+") || (btn === "-")|| (btn === "/") || (btn === "X")){
                      operationHandler(btn);
                    } else if (btn === "=") {
                      equalHandler();
                    } else if (btn === "%"){
                      percentHandler();
                    } else {
                      //if its a number add it
                      addNumber(btn);
                    }
                  }}
                />
              )
            })
          }
        </ButtonBox>
      </Wrapper>
    </div>
  );
}

export default App;
