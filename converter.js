const fs = require('fs');

class Question {
  constructor(question) {
    this.question = question;
    this.answers = [];
  }
}

class Answer {
  constructor(content, isCorrect) {
    this.content = content;
    this.isCorrect = isCorrect;
    this.explanation = '';
  }
}

const questions = [];
let lines = fs.readFileSync('questions.txt', 'utf-8').split('\n');

for (let line of lines) {
  if (line.match(/^[a-zA-Z]/)) {
    questions.push(new Question(line));
  } else if (line.startsWith('+') || line.startsWith('-')) {
    let isCorrect = line.startsWith('+');
    line = line.slice(1);
    let answer = new Answer(line, isCorrect);
    questions[questions.length - 1].answers.push(answer);
  } else if (line.startsWith('(')) {
    let lastQuestion = questions[questions.length - 1];
    let lastAnswer = lastQuestion.answers[lastQuestion.answers.length - 1];
    lastAnswer.explanation = line;
  }
}

console.log(questions);
//save to questions.json
fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));