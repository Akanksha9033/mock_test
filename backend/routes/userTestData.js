


// const express = require('express');
// const router = express.Router();
// const StudentTestData = require('../models/StudentTestData');
// const MockTest = require('../models/MockTest');
// const User = require('../models/User');

// // ✅ GET RESULT WITH ENRICHED QUESTIONS FOR SOLUTION PAGE
// router.get('/results/:id', async (req, res) => {
//     try {
//         console.log('▶ [GET /api/results/:id] params:', req.params);

//         const result = await StudentTestData.findById(req.params.id);
//         if (!result) {
//             console.warn('⚠ No result found for id:', req.params.id);
//             return res.status(404).json({ error: 'Result not found' });
//         }
//         console.log('✅ Found result:', result);

//         const test = await MockTest.findById(result.testId);
//         console.log('✅ Loaded test:', test);

//         const allResults = await StudentTestData.find({ testId: result.testId });
//         console.log('✅ Loaded all results count:', allResults.length);

//         const totalQuestions = result.detailedAnswers.length;
//         const correct = result.detailedAnswers.filter(a => a.isCorrect).length;
//         const incorrect = result.detailedAnswers.filter(a => a.selectedAnswer && !a.isCorrect).length;
//         const skipped = result.detailedAnswers.filter(a => a.selectedAnswer === null).length;
//         const score = result.score || 0;

//         const sorted = allResults.sort((a, b) => (b.score || 0) - (a.score || 0));
//         const rank = sorted.findIndex(r => r._id.toString() === result._id.toString()) + 1;
//         const topper = sorted[0]?.score || 0;
//         const average = sorted.length > 0
//             ? (sorted.reduce((acc, r) => acc + (r.score || 0), 0) / sorted.length).toFixed(2)
//             : "0.00";

//         const topperCorrectCount = sorted[0]?.detailedAnswers
//             ? sorted[0].detailedAnswers.filter(a => a.isCorrect).length
//             : 0;
//         const topperAccuracy = totalQuestions > 0
//             ? ((topperCorrectCount / totalQuestions) * 100).toFixed(2)
//             : "0.00";

//         const averageCorrectCount = sorted.reduce((acc, r) => {
//             if (!r.detailedAnswers) return acc;
//             return acc + r.detailedAnswers.filter(a => a.isCorrect).length;
//         }, 0);
//         const averageAccuracy = (sorted.length > 0 && totalQuestions > 0)
//             ? ((averageCorrectCount / (sorted.length * totalQuestions)) * 100).toFixed(2)
//             : "0.00";

//         const topicMap = {};
//         for (const ans of result.detailedAnswers) {
//             for (const tag of ans.tags || []) {
//                 if (!topicMap[tag]) topicMap[tag] = { tag, total: 0, correct: 0 };
//                 topicMap[tag].total += 1;
//                 if (ans.isCorrect) topicMap[tag].correct += 1;
//             }
//         }
//         const topicReport = Object.values(topicMap);

//         const difficultyStats = { Easy: 0, Medium: 0, Intense: 0 };
//         const difficultyScore = { Easy: 0, Medium: 0, Intense: 0 };
//         for (const ans of result.detailedAnswers) {
//             const level = ans.difficulty || 'Medium';
//             difficultyStats[level] += 1;
//             if (ans.isCorrect) difficultyScore[level] += (ans.marks || 1);
//         }

//         // ✅ UPDATED enrichedQuestions mapping
//         const enrichedQuestions = (test?.questions || []).map((q) => {
//           const qId = q._id?.toString() || q.questionNumber?.toString();
//           const attempt = result.answers?.[qId];
        
//           // Normalize correctAnswer to array
//           let correctAnswer;
//           if (Array.isArray(q.answer)) {
//             correctAnswer = q.answer.map(a => String(a));
//           } else if (typeof q.answer === 'string' && q.answer.includes(',')) {
//             correctAnswer = q.answer.split(',').map(a => a.trim());
//           } else {
//             correctAnswer = [String(q.answer)];
//           }
        
//           return {
//             ...q.toObject?.() || q,
//             selectedAnswer: attempt?.selectedOption ?? null,
//             correctAnswer: correctAnswer,
//             isCorrect: attempt?.isCorrect ?? null,
//             explanation: q.explanation || null,
//             options: q.options || [],
//             definitions: q.questionType === 'Drag and Drop' ? q.definitions || [] : undefined,
//             terms: q.questionType === 'Drag and Drop' ? q.terms || [] : undefined,
//             answer: q.questionType === 'Drag and Drop' ? q.answer || [] : undefined,
//           };
//         });
        
        
        

//         const yourAccuracy = totalQuestions > 0 ? ((correct / totalQuestions) * 100).toFixed(2) : "0.00";

//         await StudentTestData.findByIdAndUpdate(req.params.id, {
//             testTitle: test?.title || 'Mock Test',
//             totalMarks: test?.questions?.length || 0,
//             correct,
//             incorrect,
//             skipped,
//             rank,
//             topper,
//             average,
//             yourAccuracy,
//             topperAccuracy,
//             averageAccuracy,
//             topicReport,
//             difficultyStats,
//             difficultyScore,
//         });

//         res.json({
//             testTitle: test?.title || 'Mock Test',
//             totalMarks: test?.questions?.length || 0,
//             score,
//             correct,
//             incorrect,
//             skipped,
//             rank,
//             topper,
//             average,
//             yourAccuracy,
//             topperAccuracy,
//             averageAccuracy,
//             topicReport,
//             difficultyStats,
//             difficultyScore,
//             questions: enrichedQuestions,
//             answers: result?.answers || {}
//         });

//     } catch (err) {
//         console.error('❌ Error in GET /api/results/:id', err);
//         res.status(500).json({ error: 'Something went wrong.' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const StudentTestData = require('../models/StudentTestData');
const MockTest = require('../models/MockTest');
const User = require('../models/User');

// ✅ Get result with enriched questions for solution page
router.get('/results/:id', async (req, res) => {
  try {
    console.log('▶ [GET /api/results/:id] params:', req.params);

    const result = await StudentTestData.findById(req.params.id);
    if (!result) {
      console.warn('⚠ No result found for id:', req.params.id);
      return res.status(404).json({ error: 'Result not found' });
    }

    const test = await MockTest.findById(result.testId);
    const allResults = await StudentTestData.find({ testId: result.testId });

    const totalQuestions = result.detailedAnswers.length;
    const correct = result.detailedAnswers.filter(a => a.isCorrect).length;
    const incorrect = result.detailedAnswers.filter(a => a.selectedAnswer && !a.isCorrect).length;
    const skipped = result.detailedAnswers.filter(a => a.selectedAnswer === null).length;
    const score = result.score || 0;

    const sorted = allResults.sort((a, b) => (b.score || 0) - (a.score || 0));
    const rank = sorted.findIndex(r => r._id.toString() === result._id.toString()) + 1;
    const topper = sorted[0]?.score || 0;
    const average = sorted.length > 0
      ? (sorted.reduce((acc, r) => acc + (r.score || 0), 0) / sorted.length).toFixed(2)
      : "0.00";

    const topperCorrectCount = sorted[0]?.detailedAnswers
      ? sorted[0].detailedAnswers.filter(a => a.isCorrect).length
      : 0;
    const topperAccuracy = totalQuestions > 0
      ? ((topperCorrectCount / totalQuestions) * 100).toFixed(2)
      : "0.00";

    const averageCorrectCount = sorted.reduce((acc, r) => {
      if (!r.detailedAnswers) return acc;
      return acc + r.detailedAnswers.filter(a => a.isCorrect).length;
    }, 0);
    const averageAccuracy = (sorted.length > 0 && totalQuestions > 0)
      ? ((averageCorrectCount / (sorted.length * totalQuestions)) * 100).toFixed(2)
      : "0.00";

    const topicMap = {};
    for (const ans of result.detailedAnswers) {
      for (const tag of ans.tags || []) {
        if (!topicMap[tag]) topicMap[tag] = { tag, total: 0, correct: 0 };
        topicMap[tag].total += 1;
        if (ans.isCorrect) topicMap[tag].correct += 1;
      }
    }
    const topicReport = Object.values(topicMap);

    const difficultyStats = { Easy: 0, Medium: 0, Intense: 0 };
    const difficultyScore = { Easy: 0, Medium: 0, Intense: 0 };
    for (const ans of result.detailedAnswers) {
      const level = ans.difficulty || 'Medium';
      difficultyStats[level] += 1;
      if (ans.isCorrect) difficultyScore[level] += (ans.marks || 1);
    }

    const enrichedQuestions = (test?.questions || []).map((q) => {
      const qId = q._id?.toString() || q.questionNumber?.toString();
      const attempt = result.answers?.[qId];

      let correctAnswer;
      if (Array.isArray(q.answer)) {
        correctAnswer = q.answer.map(a => String(a));
      } else if (typeof q.answer === 'string' && q.answer.includes(',')) {
        correctAnswer = q.answer.split(',').map(a => a.trim());
      } else {
        correctAnswer = [String(q.answer)];
      }

      return {
        ...q.toObject?.() || q,
        selectedAnswer: attempt?.selectedOption ?? null,
        correctAnswer: correctAnswer,
        isCorrect: attempt?.isCorrect ?? null,
        explanation: q.explanation || null,
        options: q.options || [],
        definitions: q.questionType === 'Drag and Drop' ? q.definitions || [] : undefined,
        terms: q.questionType === 'Drag and Drop' ? q.terms || [] : undefined,
        answer: q.questionType === 'Drag and Drop' ? q.answer || [] : undefined,
      };
    });

    const yourAccuracy = totalQuestions > 0 ? ((correct / totalQuestions) * 100).toFixed(2) : "0.00";

    await StudentTestData.findByIdAndUpdate(req.params.id, {
      testTitle: test?.title || 'Mock Test',
      totalMarks: test?.questions?.length || 0,
      correct,
      incorrect,
      skipped,
      rank,
      topper,
      average,
      yourAccuracy,
      topperAccuracy,
      averageAccuracy,
      topicReport,
      difficultyStats,
      difficultyScore,
    });

    res.json({
      testTitle: test?.title || 'Mock Test',
      totalMarks: test?.questions?.length || 0,
      score,
      correct,
      incorrect,
      skipped,
      rank,
      topper,
      average,
      yourAccuracy,
      topperAccuracy,
      averageAccuracy,
      topicReport,
      difficultyStats,
      difficultyScore,
      questions: enrichedQuestions,
      answers: result?.answers || {}
    });
  } catch (err) {
    console.error('❌ Error in GET /api/results/:id', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// ✅ Fixed submit-test POST route
router.post('/submit-test', async (req, res) => {
  try {
    const { userId, testId, answers, score, markedForReviewMap, questionStatusMap, detailedAnswers } = req.body;

    const newResult = new StudentTestData({
      userId,
      testId,
      answers,
      score,
      markedForReviewMap,
      questionStatusMap,
      detailedAnswers,
    });

    const savedResult = await newResult.save();
    res.status(201).json({ message: 'Test submitted successfully', resultId: savedResult._id });
  } catch (err) {
    console.error('❌ Error submitting test:', err);
    res.status(500).json({ error: 'Failed to submit test' });
  }
});

module.exports = router;
