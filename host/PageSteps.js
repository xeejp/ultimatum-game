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
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';

import ExperimentSetting from './ExpermentSetting.js'
import MatchingButton from './MatchingButton.js'

import { getPageName, pages } from 'util/index'

import {
  changePage,
  reset,
  intoLoading,
  exitLoading,
} from './actions'


const mapStateToProps = ({ page, game_round, game_progress, pairs, loading }) => ({
  page,
  game_round,
  game_progress,
  pairs,
  loading,
})

class PageSteps extends React.Component {
  Async = (cb) => {
    const { dispatch } = this.props
    dispatch(intoLoading())
    this.asyncTimer = setTimeout(cb, 400)
  }

  handleChangePage = (page) => {
    const { dispatch, loading } = this.props
    dispatch(changePage(page))
    if (!loading) {
      this.Async(() => {
        dispatch(exitLoading())
      })
    }
  }

  handleNext = () => {
    const { dispatch, page, loading } = this.props
    var next = pages[0]
    for(let i = 0; i < pages.length - 1; i++){
      if(page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    dispatch(changePage(next))
    if (!loading) {
      this.Async(() => {
        dispatch(exitLoading())
      })
    }
    if(pages[3] == page) dispatch(reset())
  };

  handlePrev = () => {
    const { dispatch, page, loading} = this.props
    let prev = pages[0]
    for(let i = 1; i < pages.length; i++){
      if(page == pages[i]) {
        prev = pages[(i - 1) % pages.length]
        break
      }
    }
    dispatch(changePage(prev))
    if (!loading) {
      this.Async(() => {
        dispatch(exitLoading())
      })
    }
  }

  getStepContent(page) {
    const {game_round, pairs, game_progress } = this.props
    switch (page) {
      case 0:
        return (
          <div>
            <ExperimentSetting />
            <p>参加者側に待機画面を表示しています。</p>
          </div>
        );
      case 1:
        return <p>参加者側に説明を表示しています。</p>
      case 2:
        return (
          <div>
            <p>参加者側に実験画面を表示しています。</p>
            <p>現在の進捗: {Math.round(100 * game_progress / game_round * Object.keys(pairs).length)} %</p>
          </div>
        )
      case 3:
        return <p>参加者側に結果を表示しています。</p>
    }
  }

  renderButtons() {
    const { page } = this.props
    return (
      <div>
        <div style={{margin: '16px 18px'}}>
          <FlatButton
            label="戻る"
            disabled={pages[0] == page}
            onTouchTap={this.handlePrev}
            style={{marginRight: "12px"}}
          />
          <RaisedButton
            label={pages[3] === page ? 'リセット' : '次へ'}
            primary={pages[3] === page ? false : true}
            secondary={pages[3] === page ? true : false}
            onTouchTap={this.handleNext}
          />
          <MatchingButton />
        </div>
      </div>
    );
  }

  render() {
    const { page, loading } = this.props
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
      <ExpandTransition loading={loading} open={true} transitionDuration={100}>
        <div style={{margin: '8px 20px'}}>{this.getStepContent(pages.indexOf(page))}</div>
      </ExpandTransition>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PageSteps);
