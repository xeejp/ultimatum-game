import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
  match,
  submitPage,
  prevPage,
  nextPage,
  submitRounds,
  changeRounds,
  submitGameMode,
  changeGameMode,
} from './actions.js'

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

function* nextPageSaga() {
  while(true) {
    const { payload } = yield take(`${submitPage}`)
    sendData('NEXT_PAGE')
    if (payload == 'description') {
      yield put(match())
    }
  }
}

function* prevPageSaga() {
  while(true) {
    yield take (`${prevPage}`)
    sendData('PREV_PAGE')
  }
}

function* changeRoundsSaga() {
  while(true) {
    const { payload } = yield take(`${submitRounds}`)
    sendData('CHANGE_ROUNDS', payload)
    yield put(changeRounds(payload))
  }
}

function* changeGameModeSaga() {
  while(true) {
    const { payload } = yield take(`${submitGameMode}`)
    sendData('CHANGE_GAMEMODE', payload)
    yield put(changeGameMode(payload))
  }
}

function* saga() {
  yield fork(matchSaga)
  yield fork(nextPageSaga)
  yield fork(prevPageSaga)
  yield fork(fetchContentsSaga)
  yield fork(changeRoundsSaga)
  yield fork(changeGameModeSaga)
}

export default saga
