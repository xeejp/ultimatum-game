import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
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

function* nextPageSaga() {
  while(true) {
    yield take(`${nextPage}`)
    sendData('NEXT_PAGE')
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
  yield fork(nextPageSaga)
  yield fork(prevPageSaga)
  yield fork(fetchContentsSaga)
  yield fork(changeRoundsSaga)
  yield fork(changeGameModeSaga)
}

export default saga
