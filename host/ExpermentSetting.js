import React, { Component } from 'react'
import { connect } from 'react-redux'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';

const mapStateToProps ({ gamemode, rounds}) => ({
  gamemode,
  rounds
})

class ExperimentSetting extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
export default connect()(ExperimentSetting)
