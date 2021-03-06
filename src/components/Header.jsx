import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Header({text, bgColor, textColor}) {

  const headerStyle = {
    backgroundColor: bgColor,
    color: textColor,
  }

  return (
    <header style={headerStyle}>
      <div className="container">
        <Link to='/'>
          <h3>{text}</h3>
        </Link>
      </div>    
    </header>
  )
}

export default Header

Header.defaultProps = {
  text: 'Feedback UI',
  bgColor: 'rgba(0,0,0,0.4)',
  textColor: '#ff6a95'
}

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}