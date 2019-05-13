export function currencyFilter(val) {
  switch(val) {
    case 0: return 'USD'
    case 1: return 'AUD'
    case 2: return 'CAD'
    default: '/'
  }
}

export function conditionFilter(val) {
  switch(val) {
    case 0: return 'New'
    case 1: return 'Used'
    case 2: return 'Refurbished'
    default: '/'
  }
}