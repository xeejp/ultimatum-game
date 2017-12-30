import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { reset } from './actions'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({}) => ({
})

class ResetButton extends Component {
  handleClick() {
    const { dispatch } = this.props
    dispatch(reset())
    sendData('RESET')
  }

  render() {
    return (
      <RaisedButton
        label={ReadJSON().static_text["reset"]}
        style={{marginRight: "12px", float: "right"}}
        secondary={true}
        onClick={this.handleClick.bind(this)}
      />
    )
  }
}

export default connect(mapStateToProps)(ResetButton)  
