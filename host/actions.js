import { createAction } from 'redux-actions'

export const fetchContents = createAction('fetch contents')
export const prevPage = createAction('PREV_PAGE')
export const nextPage = createAction('NEXT_PAGE')
