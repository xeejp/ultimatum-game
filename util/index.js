export function getPageName(page) {
  switch(page) {
    case 'waiting'    : return "待機と設定"
    case 'description': return "説明"
    case 'experiment' : return "実験"
    case 'result'     : return "結果"
  }
}
export function getGamemodeName(game_mode) {
  switch(game_mode) {
    case 'ultimatum': return "最後通牒ゲーム"
    case 'dictator' : return "独裁者ゲーム"
  }
}

export function getRoleName(role) {
  switch(role) {
    case "visitor"  : return "見学者"
    case "proposer" : return "提案者"
    case "dictator" : return "独裁者"
    case "responder": return "受け手"
    default:          return "エラー"
  }
}

export const game_modes = [
  "ultimatum",
  "dictator"
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
  "judging"
]
