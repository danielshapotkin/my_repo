import { useState } from 'react';
import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },  
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];
function Result({correct, tryAgain}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>{correct} из 10</h2>
      <a href = "/">
      <button onClick={tryAgain}>Попробовать снова</button>;
      </a>
    </div>
  );
}


function Game({ question, onClickVariant, step }) {
  const percentage = Math.round((step / questions.length) * 100); 

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li onClick={() => onClickVariant(index)} key={text}>
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}


function App() {
  const [step, setStep] = useState(0);// по умолчанию нулевой шаг
  const [correct, setCorrect] = useState(0);//по умолчанию 0 правильных вариантов ответа
  const question = questions[step]

  const onClickVariant = (index) =>{
    setStep(step + 1)
    if (index == question.correct)
    {
      setCorrect(correct + 1)
    }
  }
  const tryAgain =()=>{
setStep(0)
setCorrect(0)
  }
  return (
    <div className="App">
      {
      step != questions.length? <Game step={step} question = {question} onClickVariant={onClickVariant} /> : <Result correct = {correct} tryAgain = {tryAgain}></Result>
      }
    </div>
  );
}

export default App;
