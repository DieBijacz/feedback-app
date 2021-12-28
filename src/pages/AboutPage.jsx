import React from 'react'
import {Link} from 'react-router-dom'
import Card from '../components/shared/Card'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About This project</h1>
        <h3>Love you Brad :D</h3>
      </div>
      <p>
        <Link to="/">Home</Link>  
      </p>
    </Card>
  )
}

export default AboutPage
