function convertRawScore(rawScore, conversionChart, sectionType) {
  var conversion = conversionChart.find(x => x.num_correct === rawScore);
  var type = sectionType + '_score';
  return conversion[type];
}

export default function calculateOverallScores(
  aggregatedTest,
  conversionChart
) {
  var scores = {
    overall: 0,
    mathSectionScore: 0,
    readingAndWritingSectionScore: 0
  };
  var convertedReadingScore;
  var convertedWritingScore;
  var rawReadingScore = aggregatedTest.find(x => x.section === 'Reading')
    .correct;
  var rawWritingScore = aggregatedTest.find(x => x.section === 'Writing')
    .correct;
  var rawMathScore =
    aggregatedTest.find(x => x.section === 'Math No Calculator').correct +
    aggregatedTest.find(x => x.section === 'Math Calculator').correct;
  convertedReadingScore = convertRawScore(
    rawReadingScore,
    conversionChart,
    'reading'
  );
  convertedWritingScore = convertRawScore(
    rawWritingScore,
    conversionChart,
    'writing'
  );
  scores.mathSectionScore = convertRawScore(
    rawMathScore,
    conversionChart,
    'math'
  );
  scores.readingAndWritingSectionScore =
    (convertedReadingScore + convertedWritingScore) * 10;
  scores.overall =
    scores.mathSectionScore + scores.readingAndWritingSectionScore;
  return scores;
}
