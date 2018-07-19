export default function scoreUserAnswer(question) {
  var inputType = question.input_type;
  var userAnswer = question.user_answer;
  var correctAnswer = question.answer;
  if (inputType === 'bubble') {
    question.correct = userAnswer === correctAnswer;
  } else if (inputType === 'gridin') {
    if (typeof userAnswer === 'string') {
      question.correct = false;
    } else {
      if (!isNaN(correctAnswer * 1)) {
        question.correct = userAnswer === correctAnswer * 1;
      } else {
        let correctAnswerArr = correctAnswer.split(' ');
        if (
          correctAnswerArr.includes('>') ||
          correctAnswerArr.includes('<') ||
          correctAnswerArr.includes('<=') ||
          correctAnswerArr.includes('>=')
        ) {
          correctAnswerArr[2] = userAnswer;
          const doMath = {
            '<': function(x, y) {
              return x < y;
            },
            '>': function(x, y) {
              return x > y;
            },
            '<=': function(x, y) {
              return x <= y;
            },
            '>=': function(x, y) {
              return x >= y;
            }
          };
          question.correct =
            doMath[correctAnswerArr[1]](
              correctAnswerArr[0] * 1,
              correctAnswerArr[2]
            ) &&
            doMath[correctAnswerArr[3]](
              correctAnswerArr[2],
              correctAnswerArr[4] * 1
            );
        } else {
          for (var i = 0; i < correctAnswerArr.length; i++) {
            correctAnswerArr[i] = +correctAnswerArr[i];
          }
          question.correct = correctAnswerArr.includes(userAnswer);
        }
      }
    }
  }
  return question;
}
