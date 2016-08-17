export function getPageName(page) {
  switch(page) {
    case 'waiting':     return "待機と設定"
    case 'description': return "説明"
    case 'experiment':  return "実験"
    case 'result':      return "結果"
  }
}
export function getGamemodeName(gamemode) {
  switch(gamemode) {
    case 'ultimatum': return "最後通牒ゲーム"
    case 'dictator' : return "独裁者ゲーム"
  }
}

export function getRoleName(role) {
  switch(role) {
    case "proposer":  return "提案者"
    case "dictator":  return "独裁者"
    case "responder": return "受け手"
    default:          return "不参加"
  }
}
