import { ReadJSON } from './ReadJSON'

export function getPageName(page) {
  switch(page) {
    case 'waiting'    : return ReadJSON().static_text["pages"][0]
    case 'description': return ReadJSON().static_text["pages"][1]
    case 'experiment' : return ReadJSON().static_text["pages"][2]
    case 'result'     : return ReadJSON().static_text["pages"][3]
  }
}

export function getRoleName(role) {
  switch(role) {
    case "visitor"  : return ReadJSON().static_text["roles"][0]
    case "proposer" : return ReadJSON().static_text["roles"][1]
    case "responder": return ReadJSON().static_text["roles"][2]
  }
}

export function getStateName(state) {
  switch(state) {
    case "allocating": return ReadJSON().static_text["stasus"][0]
    case "judging"   : return ReadJSON().static_text["stasus"][1]
    case "finished"  : return ReadJSON().static_text["stasus"][2]
  }
}

export const game_modes = [
  "ultimatum",
]
export const pages = [
  "waiting",
  "description",
  "experiment",
  "result"
]

export const roles = [
  "visitor",
  "proposer",
  "responder"
]

export const states = [
  "allocating",
  "judging",
  "finished"
]
