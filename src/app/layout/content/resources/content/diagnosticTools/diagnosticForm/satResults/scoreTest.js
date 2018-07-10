import scoreUserAnswer from './scoreUserAnswer';
import cleanTestUserAnswers from './cleanTestUserAnswers';

export default function scoreTest(sections) {
  var cleanedSections = cleanTestUserAnswers(sections);
  // Add a 'correct' field with null to every question
  cleanedSections.forEach(function(section) {
    section.forEach(function(question) {
      question.correct = null;
    });
  });

  // // GROUP QUESTIONS BY QUESTION_TYPE_GROUP WITHIN A SECTION
  // var groupedSections = [];
  // for (var s in cleanedSections) {
  //   var section = groupByKeys(cleanedSections[s], function(s) {
  //     return [s.question_type.question_type_group];
  //   });
  //   groupedSections.push(section);
  // }
  //
  // // GROUP QUESTIONS BY QUESTION_TYPE WITHIN A QUESTION_TYPE_GROUP
  // var newSections = [];
  // for (s in groupedSections) {
  //   section = [];
  //   for (var g in groupedSections[s]) {
  //     var group = groupByKeys(groupedSections[s][g], function(q) {
  //       return [q.question_type];
  //     });
  //     section.push(group);
  //   }
  //   newSections.push(section);
  // }

  var scoredTest = [];
  cleanedSections.forEach(function(section) {
    section.forEach(q => {
      scoreUserAnswer(q);
    });
  });
  return cleanedSections;
  // newSections.forEach(function(section) {
  //   var sectionNum = section[0][0][0].section_num;
  //   var sectionName = section[0][0][0].section_name;
  //   var sectionObj = {
  //     section_num: sectionNum,
  //     section_name: sectionName,
  //     question_type_groups: []
  //   };
  //   section.forEach(function(question_type_group) {
  //     var questionTypeGroupName =
  //       question_type_group[0][0].question_type.question_type_group
  //         .question_type_group;
  //     var questionTypeGroupObj = {
  //       question_type_group: questionTypeGroupName,
  //       question_types: []
  //     };
  //     question_type_group.forEach(function(question_type) {
  //       var questionTypeName = question_type[0].question_type.question_type;
  //       var questionTypeObj = {
  //         question_type: questionTypeName,
  //         questions: []
  //       };
  //       question_type.forEach(function(question) {
  //         let scoredQuestion = scoreUserAnswer(question);
  //         questionTypeObj.questions.push(scoredQuestion);
  //       });
  //       questionTypeGroupObj.question_types.push(questionTypeObj);
  //     });
  //     sectionObj.question_type_groups.push(questionTypeGroupObj);
  //   });
  //   scoredTest.push(sectionObj);
  // });
  // return scoredTest;
}
