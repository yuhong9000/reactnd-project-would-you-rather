import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {
  render() {
    const { hasId, id } = this.props;

    return (


        hasId
          ? <div>
              <ul>
                <li>
                  <Question id={id} display={false}/>
                </li>
              </ul>
            </div>
          : <div>
              404 not found!
            </div>


    )
  }
}

function mapStateToProps ({ questions }, props) {
  const { question_id } = props.match.params;

  return {
    id: question_id,
    hasId: Object.keys(questions).includes(question_id),
  }
}

export default connect(mapStateToProps)(QuestionPage)
