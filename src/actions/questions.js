import { saveQuestion } from '../util/api'
import { addUserQuestion } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'

export function receiveQuestions( questions ){
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestionAnswer ( questionAnswer ){
  const { authedUser,qid,answer } = questionAnswer;

  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  }
}

function addNewQuestion( question ){
  return {
    type: ADD_NEW_QUESTION,
    question,
  }
}

export function updateNewQuestion ( question ) {
  return (dispatch) => {
    saveQuestion(question)
      .then((q) => {
        dispatch(addNewQuestion(q));
        dispatch(addUserQuestion(q));
      })
  }
}
