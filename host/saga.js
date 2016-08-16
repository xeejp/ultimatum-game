import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, prevPage, nextPage } from './actions.js'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('fetch contents')
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

function* saga() {
  yield fork(nextPageSaga)
  yield fork(prevPageSaga)
  yield fork(fetchContentsSaga)
}

export default saga
