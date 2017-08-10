import React from 'react'
import PropTypes from 'prop-types'

const frame_types = {
  'user_search': () => {
    <div>user_search</div>
  }
  'other': () => {
    <div>other</div>
  }
}

class MainScreen extends React.Component {
  const type = frame_types.none;
  render () {
    
  }


}

MainScreen.propTypes = {

}

export default MainScreen;
