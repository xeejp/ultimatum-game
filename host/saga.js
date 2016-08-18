import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
  match,
  submitPage,
  changePage,
  prevPage,
  nextPage,
  changeGameRound,
  incGameRound,
  decGameRound,
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

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${submitPage}`)
    sendData('CHANGE_PAGE', payload)
    if (payload == 'description') {
      yield put(match())
    }
    // yield put(changePage(payload))
  }
}

function* nextPageSaga() {
  const pages = ["waiting", "description", "experiment", "result"]
  while (true) {
    yield take(`${nextPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 0; i < pages.length - 1; i ++) {
      if (page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}

function* prevPageSaga() {
  const pages = ["waiting", "description", "experiment", "result"]
  while (true) {
    yield take(`${prevPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 1; i < pages.length; i ++) {
      if (page == pages[i]) {
        next = pages[(i - 1) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}
function* incGameRoundSaga() {
  while(true) {
    yield take(`${incGameRound}`)
    const game_round = yield select(( { game_round }) => game_round)
    yield put(changeGameRound(game_round + 1))
  }
}

function* decGameRoundSaga() {
  while(true) {
    yield take(`${decGameRound}`)
    const game_round = yield select(( { game_round }) =>  game_round)
    let next = (game_round <= 1)? 1 : game_round -1
    yield put(changeGameRound(next))
  }
}

function* changeGameRoundSaga() {
  while(true) {
    const { payload } = yield take(`${changeGameRound}`)
    sendData('CHANGE_GAME_ROUND', payload)
  }
}

function* changeGameModeSaga() {
  while(true) {
    const { payload } = yield take(`${submitGameMode}`)
    sendData('CHANGE_GAME_MODE', payload)
  }
}

function* saga() {
  yield fork(matchSaga)
  yield fork(changePageSaga)
  yield fork(nextPageSaga)
  yield fork(prevPageSaga)
  yield fork(fetchContentsSaga)
  yield fork(changeGameRoundSaga)
  yield fork(incGameRoundSaga)
  yield fork(decGameRoundSaga)
  yield fork(changeGameModeSaga)
}

export default saga
