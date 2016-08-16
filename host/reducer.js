import { nextPage, prevPage } from './actions'

const initialState = {
  rounds: 1,
  page: "waiting",
  gamemode: "ultimatum",
  participants: {},
  pairs: {}
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'update contents': return action.payload
    case 'change page': return Object.assign({}, state, {
      page: action.payload
    })
    default: return state
  }
}
export default reducer
