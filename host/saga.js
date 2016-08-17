import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
  match,
  submitPage,
  prevPage,
  nextPage,
  submitGameRound,
  changeGameRound,
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

function* changeGameRoundSaga() {
  while(true) {
    const { payload } = yield take(`${submitGameRound}`)
    sendData('CHANGE_GAME_ROUND', payload)
    yield put(changeGameRound(payload))
  }
}

function* changeGameModeSaga() {
  while(true) {
    const { payload } = yield take(`${submitGameMode}`)
    sendData('CHANGE_GAME_MODE', payload)
    yield put(changeGameMode(payload))
  }
}

function* saga() {
  yield fork(matchSaga)
  yield fork(nextPageSaga)
  yield fork(prevPageSaga)
  yield fork(fetchContentsSaga)
  yield fork(changeGameRoundSaga)
  yield fork(changeGameModeSaga)
}

export default saga
