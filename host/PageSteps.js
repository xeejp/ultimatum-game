import React from 'react'
import { connect } from 'react-redux'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import ExperimentSetting from './ExpermentSetting.js'
import MatchingButton from './MatchingButton.js'
import { getPageName } from 'util/index'
import { submitPage, prevPage, nextPage } from './actions'

const pages = ["waiting", "description", "experiment", "result"]

const style = {
  margin: 12,
};

const mapStateToProps = ({ page, participants }) => ({
  page,
  participantsLength: Object.keys(participants).length
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

  handleNext = () => {
    const { dispatch, page } = this.props
    dispatch(submitPage(pages[pages.indexOf(page)+1]))
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        finished: page == pages[3]
      }))
    }
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
    switch (page) {
      case 0:
        return (
          <div>
            <p>
              現在の参加者は{this.props.participantsLength}人です。
            </p>
            <ExperimentSetting />
          </div>
        );
      case 1:
        return (
          <div>
            <p>
              参加者側に説明を表示しています。
            </p>
          </div>
        );
      case 2:
        return (
          <p>
            実験中です。
          </p>
        );
      case 3:
        return (
          <p>
            結果を表示しています。
          </p>
        );
    }
  }

  renderContent() {
    const { page } = this.props
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(pages.indexOf(page))}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
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
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state
    const { page } = this.props

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={pages.indexOf(page)}>
        {pages.map( (page, i) => (
            <Step key={i}>
              <StepLabel>{getPageName(page)}</StepLabel>
            </Step>
        ))}
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PageSteps);
