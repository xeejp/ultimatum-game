import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
} from './actions.js'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('FETCH_CONTENTS')
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
}

export default saga
