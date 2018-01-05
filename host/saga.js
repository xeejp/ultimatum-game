import { put, take, call, select, fork } from 'redux-saga/effects'

import { delay } from "redux-saga";

import {
  fetchContents,
  showResults,
  match,
  changePage,
  changeGameRound,
  changeGameRedo,
  changeInfRedo,
  changeDescription
} from './actions.js'

import {
  pages,
} from '../util/index'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('FETCH_CONTENTS')
  }
}

function* matchSaga() {
  while (true) {
    yield take(`${match}`)
    yield call(sendData, 'MATCH')
  }
}

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${changePage}`)
    sendData('CHANGE_PAGE', payload)
    if (payload == 'description') {
      yield put(match())
    }
    if (payload == 'result') {
      yield put(showResults())
    }
  }
}

function* changeGameRoundSaga() {
  while(true) {
    const { payload } = yield take(`${changeGameRound}`)
    sendData('CHANGE_GAME_ROUND', payload)
  }
}

function* changeGameRedoSaga() {
  while(true) {
    const { payload } = yield take(`${changeGameRedo}`)
    sendData('CHANGE_GAME_REDO', payload)
  }
}

function* changeInfRedoSaga() {
  while(true) {
    const { payload } = yield take(`${changeInfRedo}`)
    sendData('CHANGE_INF_REDO', payload)
  }
}

function* changeDescriptionSaga() {
  while(true) {
    const { payload } = yield take(`${changeDescription}`)
    sendData('CHANGE_DESCRIPTION', payload)
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(matchSaga)
  yield fork(changePageSaga)
  yield fork(changeInfRedoSaga)
  yield fork(changeGameRedoSaga)
  yield fork(changeGameRoundSaga)
  yield fork(changeDescriptionSaga)
}

export default saga
