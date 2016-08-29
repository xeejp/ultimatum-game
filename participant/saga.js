import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
  finishAllocating,
  changeNowRound,
  submitAlloTemp,
  changeAlloTemp,
  responseOK,
  redoAllcating,
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

function* responseOKSaga() {
  while(true) {
    const { payload } = yield take(`${responseOK}`)
    sendData('RESPONSE_OK', payload)
  }
}

function* redoAllcatingSaga() {
  while(true) {
    yield take(`${redoAllcating}`)
    sendData('REDO_ALLOCATING')
  }
}

function* responseNGSaga() {
  while(true) {
    const { payload } = yield take(`${responseNG}`)
    sendData('RESPONSE_NG', payload)
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
  yield fork(responseOKSaga)
  yield fork(redoAllcatingSaga)
  yield fork(responseNGSaga)
}

export default saga
