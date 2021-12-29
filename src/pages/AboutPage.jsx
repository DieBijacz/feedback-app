import React from 'react'
import {Link} from 'react-router-dom'
import Card from '../components/shared/Card'
import {FaHome} from 'react-icons/fa'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About This project</h1>
        <h3>Love you Brad :D</h3>
      </div>
      <div className='home-link'>
        <Link to="/">
          <FaHome size={30} />
        </Link>  
      </div>
    </Card>
  )
}

export default AboutPage
