import React from 'react'
import PropTypes from 'prop-types'

import InputBar from '../components/inputBar'

const frame_types = {
  'user_search': () => {
    return <InputBar />
  },
  'none': () => {
    return <div>none</div>
  }
}

class MainScreen extends React.Component {
  render () {
    const { frame_type } = this.props
    return frame_types[frame_type]()
  }
}

MainScreen.propTypes = {
  frame_type: PropTypes.string.isRequired
}

export default MainScreen;
