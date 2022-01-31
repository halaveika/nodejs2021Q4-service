export const getLogLvlVariable = (lvl: string | undefined):string => {
  switch (true) {
    case lvl === '0': return 'fatal'
    case lvl === '1': return 'error'
    case lvl === '2': return 'warn'
    case lvl === '3': return 'info'
    case lvl === '4': return 'debug'
    case lvl === '5': return 'trace'
    default:
     return 'silent'
  }
}