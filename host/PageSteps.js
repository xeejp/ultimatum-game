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
  submitPage,
  prevPage,
  nextPage,
  reset,
} from './actions'


const mapStateToProps = ({ page, game_round, game_progress, pairs }) => ({
  page,
  game_round,
  game_progress,
  pairs
})

class PageSteps extends React.Component {

  state = {
    loading: false,
    finished: false
  }

  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 10);
    });
  };

  changePage = (page) => {
    const { dispatch } = this.props
    dispatch(submitPage(page))
  }

  handleNext = () => {
    const { dispatch, page } = this.props
    dispatch(nextPage())
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        finished: page == pages[3]
      }))
    }
    if(pages[3] == page) dispatch(reset())
  };

  handlePrev = () => {
    const { dispatch } = this.props
    dispatch(prevPage())
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
      }))
    }
  };

  getStepContent(page) {
    const {game_round, pairs, game_progress } = this.props
    switch (page) {
      case 0:
        return (
          <div>
            <p>参加者側に待機画面を表示しています。</p>
            <ExperimentSetting />
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
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={pages[3] === page ? 'リセット' : '次へ'}
            primary={pages[3] === page ? false : true}
            secondary={pages[3] === page ? true : false}
            onTouchTap={this.handleNext}
          />
          <MatchingButton
            style={{float:"right"}}
          />
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state
    const { page } = this.props
    const buttons = []
    for (let i = 0; i < pages.length; i ++) {
      buttons[i] = (
        <Step key={i}>
        <StepButton
        onClick={this.changePage.bind(this, pages[i])}
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
      <ExpandTransition loading={loading} open={true}>
        <div style={{margin: '8px 20px'}}>{this.getStepContent(pages.indexOf(page))}</div>
      </ExpandTransition>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PageSteps);
