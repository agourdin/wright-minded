export default function cleanTestUserAnswers(sections) {
  for (var s in sections) {
    var section = sections[s];
    for (var q in section) {
      var userAnswer = section[q].user_answer;
      if (
        typeof userAnswer === 'string' ||
        userAnswer === null ||
        userAnswer === undefined
      ) {
        sections[s][q].user_answer = userAnswer;
      } else if (userAnswer.constructor === Array) {
        var cleanedAnswer = userAnswer.join('');
        if (
          cleanedAnswer.startsWith('/') ||
          // VV ADD BACK IN IF TRAILING DECIMALS ARE WRONG VV
          // cleanedAnswer.endsWith('.') ||
          cleanedAnswer.endsWith('/') ||
          cleanedAnswer === '.' ||
          cleanedAnswer === '/' ||
          cleanedAnswer === '' ||
          (userAnswer.includes('.') && userAnswer.includes('/')) ||
          userAnswer.indexOf('.') !== userAnswer.lastIndexOf('.') ||
          userAnswer.indexOf('/') !== userAnswer.lastIndexOf('/')
        ) {
          // cleanedAnswer;
          sections[s][q].user_answer = cleanedAnswer;
        } else {
          if (userAnswer.includes('/')) {
            var answerParts = userAnswer.join('').split('/');
            cleanedAnswer = answerParts[0] * 1 / (answerParts[1] * 1);
          } else if (userAnswer === null || userAnswer === undefined) {
            cleanedAnswer = null;
          } else {
            cleanedAnswer = cleanedAnswer * 1;
          }
          sections[s][q].user_answer = cleanedAnswer;
        }
      }
    }
  }
  return sections;
}
