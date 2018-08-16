export function formatQuestionInfo (question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatar: avatarURL,
    hasAnswered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    answerOne: optionOne.votes.includes(authedUser),
    answerTwo: optionTwo.votes.includes(authedUser),
    votesTotal: optionOne.votes.length + optionTwo.votes.length,
    votesOne: optionOne.votes.length,
    votesTwo: optionTwo.votes.length
  }
}
