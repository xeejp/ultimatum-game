import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const finishAllocating = createAction('FINISH_ALLOCATING', allo_temp => allo_temp)
export const changeNowRound = createAction('CHANGE_NOW_ROUND')

export const changeChartRound = createAction('CHANGE_CHART_ROUND', chart_round => chart_round)

export const changeAlloTemp = createAction('CHANGE_ALLO_TEMP')
export const submitAlloTemp = createAction('SUBMIT_ALLO_TEMP')

export const responseOK = createAction('RESPONSE_OK')
export const responseNG = createAction('RESPONSE_NG')

export const fallSnackBarFlags = createAction('FALL_SNACK_BAR_FLAGS')
export const fallSnackBarFlags2 = createAction('FALL_SNACK_BAR_FLAGS2')
