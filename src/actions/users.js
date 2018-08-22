export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addUserAnswer ( userAnswer ) {
  const { authedUser, qid, answer } = userAnswer;

  return {
      type: ADD_USER_ANSWER,
      authedUser,
      qid,
      answer,
  }
}

export function addUserQuestion ( question ){
  const { author, id } = question;

  return {
    type: ADD_USER_QUESTION,
    authedUser: author,
    qid: id,
  }
}
