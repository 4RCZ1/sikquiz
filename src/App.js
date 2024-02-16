import './App.css';
import Question from "./components/answers/Question";
import {useState} from "react";
import questions from "./static/questions.json";
import {Button, Input} from "@mui/material";
import _ from "lodash";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";

function App() {
  const [checked, setChecked] = useState([]);
  const [points, setPoints] = useState([]);
  const [validate, setValidate] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [inputValue, setInputValue] = React.useState(0);

  function updatePoints(index, newValue) {
    setPoints(points.map((item, i) => (i === index ? newValue : item)));
  }

  const generateNewQuiz = () => {
    const len = parseInt(inputValue);
    const newQuestions = [];
    for (let i = 0; i < len; i++) {
      const randomNumber = Math.floor(Math.random() * questions.length);
      const question = _.cloneDeep(questions[randomNumber]);
      const answers = []
      for (let j = 0; j < 4; j++) {
        const randomAnswer = Math.floor(Math.random() * question.answers.length);
        answers.push(question.answers[randomAnswer]);
      }
      question.answers = answers;
      newQuestions.push(question);
    }
    setValidate(false)
    setCurrentQuestions(newQuestions);
    setChecked(new Array(len).fill(new Array(4).fill(false)));
    setPoints(new Array(len).fill(0));
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <div className="MainContainer">
        <h1 style={{color: 'white'}}>Quiz</h1>
        <div style={{color: 'white'}}>
          <FormControlLabel
            control={<Input
              value={inputValue}
              id="lenInput"
              style={{margin: 10, color: 'white'}}
              onChange={handleInputChange}
            />}
            label="Number of questions"
            labelPlacement="start"
          />
          <Button variant="contained" style={{margin: 10}} onClick={generateNewQuiz}>Generate new quiz</Button>
        </div>
        {currentQuestions.map((question, index) => {
          const localUpdateChecked = (newValue) => {
            const newChecked = [...checked];
            newChecked[index] = newValue;
            setChecked(newChecked);
          }
          const localUpdatePoints = (newValue) => updatePoints(index, newValue);
          return <Question key={index} checkedStates={checked[index]} question={question} validate={validate}
                           setPoint={localUpdatePoints} updateChecked={localUpdateChecked}/>
        })}
      </div>
      {/*{validate && <h1 style={{color: 'white'}}>Total points: {points.reduce((a, b) => a + b, 0)}</h1>}*/}
      <Button variant="contained" onClick={() => {
        console.log(points)
        console.log('Total points: ' + points.reduce((a, b) => a + b, 0))
        setValidate(!validate)
      }}>Submit
      </Button>
    </div>
  );
}

export default App;
