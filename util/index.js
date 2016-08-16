export function getPageName(page) {
  switch(page) {
    case 'waiting':     return "待機と設定"
    case 'description': return "説明"
    case 'experiment':  return "実験"
    case 'result':      return "結果"
  }
}
