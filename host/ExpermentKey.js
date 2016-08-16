import React, { Component } from 'react'
import { connect } from 'react-redux'

class ExperimentKey extends Component {
  render() {
    return (
      <h3>実験記号: <em>{_x_token}</em></h3>
    )
  }
}
export default connect()(ExperimentKey)
