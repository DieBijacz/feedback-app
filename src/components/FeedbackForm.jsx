import React, {useState, useContext, useEffect} from 'react'
import RatingSelect from './RatingSelect'
import Button from './shared/Button'
import Card from './shared/Card'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  const handleTextChange = (e) => {
    // VALIDATION
    if(text == '') {
      setBtnDisabled(true)
      setMessage(null)
      // checks if there is text but not long enough
    } else if(text !== '' && text.trim().length <= 10) {
      setBtnDisabled(true)
      setMessage('Text must be at least 10 characters')
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }

    // sets text to be dispalyed as input value
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validation on length
    if(text.trim().length > 10){
      // creates new feedback
      const newFeedback = {
        text,
        rating,
      }

      // Check if data in form comes from editing feedback
      // if ture then update feedback
      // else create and add newFeedback
      if(feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback);
      }
      // clear text field in form
      setText('')
    }
  }

  // Brings editing feedback data to form
  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => {
          setRating(rating)
        }} />
        <div className="input-group">
          <input onChange={handleTextChange} value={text} type="text" placeholder='Write a review'/>
          {/* Passes customization ass props */}
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>

        {/* If there is a message then display it in a div */}
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )}

export default FeedbackForm
