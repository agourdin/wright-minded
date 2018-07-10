function groupByKeys(array, f) {
  var groups = {};
  array.forEach(function(o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}

function groupQuestionsByGroupWithinSection(section) {
  return groupByKeys(section, function(s) {
    return [s.question_type.question_type_group];
  });
}

function groupQuestionsByTypeWithinGroup(group) {
  return groupByKeys(group, function(q) {
    return [q.question_type];
  });
}

function groupTestBySectionGroupAndType(sections) {
  var groupedSections = [];
  for (var s in sections) {
    groupedSections.push(groupQuestionsByGroupWithinSection(sections[s]));
  }

  var newSections = [];
  for (s in groupedSections) {
    var section = [];
    for (var g in groupedSections[s]) {
      section.push(groupQuestionsByTypeWithinGroup(groupedSections[s][g]));
    }
    newSections.push(section);
  }
  return newSections;
}

function organizeSection(section) {
  var sectionNum = section[0][0][0].section_num;
  var sectionName = section[0][0][0].section_name;
  var sectionObj = {
    section_num: sectionNum,
    section_name: sectionName,
    question_type_groups: []
  };
  section.forEach(function(question_type_group) {
    var questionTypeGroupName =
      question_type_group[0][0].question_type.question_type_group
        .question_type_group;
    var questionTypeGroupObj = {
      question_type_group: questionTypeGroupName,
      question_types: []
    };
    question_type_group.forEach(function(question_type) {
      var questionTypeName = question_type[0].question_type.question_type;
      var questionTypeObj = {
        question_type: questionTypeName,
        questions: []
      };
      question_type.forEach(function(question) {
        questionTypeObj.questions.push(question);
      });
      questionTypeGroupObj.question_types.push(questionTypeObj);
    });
    sectionObj.question_type_groups.push(questionTypeGroupObj);
  });
  return sectionObj;
}

function countCorrectByQuestionType(questionType) {
  var obj = {
    question_type: questionType.question_type,
    total: 0,
    correct: 0
  };
  var questions = questionType.questions;
  obj.total = questions.length;
  var count = 0;
  for (var i = 0; i < obj.total; i++) {
    if (questions[i].correct === true) {
      count += 1;
    }
  }
  obj.correct = count;
  return obj;
}

function countCorrectByQuestionTypeGroup(questionTypeGroup) {
  var obj = {
    question_type_group: questionTypeGroup.question_type_group,
    total: 0,
    correct: 0,
    question_types: []
  };
  var questionTypes = questionTypeGroup.question_types;
  for (var i = 0; i < questionTypes.length; i++) {
    var qt_obj = countCorrectByQuestionType(questionTypes[i]);
    obj.total += qt_obj.total;
    obj.correct += qt_obj.correct;
    obj.question_types.push(qt_obj);
  }
  obj.question_types.sort(function(a, b) {
    var textA = a.question_type.toUpperCase();
    var textB = b.question_type.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return obj;
}

function countCorrectBySection(section) {
  var obj = {
    section: section.section_name,
    total: 0,
    correct: 0,
    question_type_groups: []
  };
  var questionTypeGroups = section.question_type_groups;
  for (var i = 0; i < questionTypeGroups.length; i++) {
    var qtg_obj = countCorrectByQuestionTypeGroup(questionTypeGroups[i]);
    obj.total += qtg_obj.total;
    obj.correct += qtg_obj.correct;
    obj.question_type_groups.push(qtg_obj);
  }
  obj.question_type_groups.sort(function(a, b) {
    var textA = a.question_type_group.toUpperCase();
    var textB = b.question_type_group.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return obj;
}

function countCorrect(scoredGroupedTest) {
  var scores = [];
  for (var i = 0; i < scoredGroupedTest.length; i++) {
    scores.push(countCorrectBySection(scoredGroupedTest[i]));
  }
  return scores;
}

function combineAndCountMathSections(scoredTest) {
  var newMathSection = [].concat(scoredTest[2]).concat(scoredTest[3]);
  var groupedMathSection = groupQuestionsByGroupWithinSection(newMathSection);
  var mathSection = [];
  for (var g in groupedMathSection) {
    mathSection.push(groupQuestionsByTypeWithinGroup(groupedMathSection[g]));
  }
  var organizedMathSection = organizeSection(mathSection);
  newMathSection = countCorrectBySection(organizedMathSection);
  newMathSection.section = 'Math Combined';
  return newMathSection;
}

export default function aggregateTest(scoredTest) {
  var mathCombined = combineAndCountMathSections(scoredTest);
  // var scoredGroupedTest = countCorrect(
  //   groupTestBySectionGroupAndType(scoredTest)
  // );
  var groupedScoredTest = groupTestBySectionGroupAndType(scoredTest);
  var organizedTest = [];
  for (var s in groupedScoredTest) {
    organizedTest.push(organizeSection(groupedScoredTest[s]));
  }
  return countCorrect(organizedTest).concat(mathCombined);
}
