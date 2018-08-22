import { RECEIVE_QUESTIONS, ADD_QUESTION_ANSWER, ADD_NEW_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          optionOne: action.answer === 'optionOne'
            ? {
                ...state[action.qid].optionOne,
                votes: state[action.qid].optionOne.votes.concat(action.authedUser),
              }
            : state[action.qid].optionOne,
          optionTwo: action.answer === 'optionTwo'
            ? {
                ...state[action.qid].optionTwo,
                votes: state[action.qid].optionTwo.votes.concat(action.authedUser),
              }
            : state[action.qid].optionTwo,
        }
      }
    case ADD_NEW_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    default :
      return state
  }
}
