import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WordEntry from './word_entry.js'
import Title from './title.js'
import TestPortal from './test_portal.js'
import reportWebVitals from './reportWebVitals';

const wordEntry = <WordEntry />;
const title = <Title />;
const testPortal = <TestPortal />;

ReactDOM.render(
    title,
    document.getElementById('Title'),
);

ReactDOM.render(
    wordEntry,
    document.getElementById('WordEntry')
);

ReactDOM.render(
  testPortal,
  document.getElementById('TestPortal')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
