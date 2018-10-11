import React from 'react'
import { connect } from 'react-redux'

import {
  Step,
  Stepper,
  StepButton,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider'

import { getPageName, pages } from '../util/index'

import { changePage } from './actions'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ page, game_round, game_progress, pairs }) => ({
  page,
  game_round,
  game_progress,
  pairs,
})

class PageSteps extends React.Component {
  handleChangePage(page) {
    const { dispatch } = this.props
    dispatch(changePage(page))
  }

  handleNext ()  {
    const { dispatch, page } = this.props
    var next = pages[0]
    for(let i = 0; i < pages.length - 1; i++){
      if(page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    dispatch(changePage(next))
  };

  handlePrev ()  {
    const { dispatch, page } = this.props
    let prev = pages[0]
    for(let i = 1; i < pages.length; i++){
      if(page == pages[i]) {
        prev = pages[(i - 1) % pages.length]
        break
      }
    }
    dispatch(changePage(prev))
  }

  renderButtons() {
    const { page } = this.props
    return (
      <div style={{margin: '16px 18px'}}>
        <FlatButton
          label={ReadJSON().static_text["back"]}
          disabled={pages[0] == page}
          onClick={this.handlePrev.bind(this)}
          style={{marginRight: "12px"}}
        />
        <span style={{marginLeft: "3%"}}>
          <RaisedButton
            label={pages[3] === page ? ReadJSON().static_text["continue"] : ReadJSON().static_text["next"]}
            primary={true}
            onClick={this.handleNext.bind(this)}
          />
        </span>
      </div>
    );
  }

  render() {
    const { page } = this.props
    const buttons = []
    for (let i = 0; i < pages.length; i ++) {
      buttons[i] = (
        <Step key={i}>
        <StepButton
        onClick={this.handleChangePage.bind(this, pages[i])}
        >{getPageName(pages[i])}</StepButton>
        </Step>
      )
    }
    return (
      <div style={{width: '100%',  margin: 'auto'}}>
      <Stepper activeStep={pages.indexOf(page)} linear={false}>
        {buttons}
      </Stepper>
      {this.renderButtons()}
          <Divider
            style={{
              marginTop: "5%",
              marginBottom: "5%"
            }}
          />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PageSteps);
