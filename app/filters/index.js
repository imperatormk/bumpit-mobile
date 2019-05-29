export function conditionFilter(val) {
  switch(val) {
    case 0: return 'New'
    case 1: return 'Used'
    case 2: return 'Refurbished'
    default: '/'
  }
}