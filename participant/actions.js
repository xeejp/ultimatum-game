import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const finishAllocating = createAction('FINISH_ALLOCATING', allo_temp => allo_temp)
export const changeNowRound = createAction('CHANGE_NOW_ROUND')

export const changeAlloTemp = createAction('CHANGE_ALLO_TEMP')
export const submitAlloTemp = createAction('SUBMIT_ALLO_TEMP')

export const responseOK = createAction('PRESPONSE_OK')
export const responseNG = createAction('PRESPONSE_NG')
export const finishJudging = createAction('FINISH_JUDGING')
