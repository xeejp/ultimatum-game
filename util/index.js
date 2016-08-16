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
