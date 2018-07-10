import { LOG_USER_ANSWER } from '../types';

export default function logUserAnswer(step, question_num, user_answer) {
  var data = {};
  data.step = step;
  data.question_num = question_num;
  data.user_answer = user_answer;
  return {
    type: LOG_USER_ANSWER,
    payload: data
  };
}

// export default function logUserAnswer(step, question_num, user_answer) {
//   return (dispatch, getState) => {
//     const { diagnosticForm } = getState();
//     console.log(diagnosticForm);
//     var sections = diagnosticForm.sections;
//     sections[step][question_num].user_answer =
//       sections[step][question_num].user_answer === user_answer
//         ? undefined
//         : user_answer;
//     dispatch({
//       type: LOG_USER_ANSWER,
//       payload: sections
//     });
//   };
// }
