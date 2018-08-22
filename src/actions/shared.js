import { getInitialData, saveQuestionAnswer } from '../util/api'
import { receiveQuestions, addQuestionAnswer } from './questions'
import { setAuthedUser } from './authedUser'
import { receiveUsers, addUserAnswer } from './users'

// const AUTHED_ID = 'tylermcginnis'
// const AUTHED_ID = ''

export function handleInitialData (AUTHED_ID) {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(setAuthedUser(AUTHED_ID));
      })
  }
}

export function updateQuestionAnswer( questionAnswer, disableSubmit ){
  return ( dispatch ) => {
    disableSubmit(true);

    saveQuestionAnswer(questionAnswer)
      .then( () => {
        dispatch(addQuestionAnswer(questionAnswer));
        dispatch(addUserAnswer(questionAnswer));
      })
      .catch( ()=> {
        disableSubmit(false);
      });
  }
}
