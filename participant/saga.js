import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
  finishAllocating,
  changeNowRound,
  submitAlloTemp,
  changeAlloTemp,
  responseOK,
  responseNG,
} from './actions.js'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('FETCH_CONTENTS')
  }
}

function* finishAllocatingSaga() {
  while(true) {
    const { payload } = yield take(`${finishAllocating}`)
    sendData('FINISH_ALLOCATING', payload)
  }
}

function* changeAlloTempSaga() {
  while(true) {
    const { payload } = yield take(`${submitAlloTemp}`)
    sendData('CHANGE_ALLO_TEMP', payload)
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(finishAllocatingSaga)
  yield fork(changeAlloTempSaga)
}

export default saga
