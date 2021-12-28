import React, {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {

  // brings data from provider
  const {feedback} = useContext(FeedbackContext)

  //calculata avarage rating
  let avarage = feedback.reduce((acc, curr) => {
    return acc + curr.rating
  }, 0) / feedback.length

  // Prevents avarage to be 3.3333 etc.
  // Regular expression => if there is .0 on the end then replace that with ''
  avarage = avarage.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      {/* If there is no feedback display 0 insted of NaN for avarage rating */}
      <h4>Avarage rating: {isNaN(avarage) ? 0 : avarage}</h4>
    </div>
  )
}

export default FeedbackStats
