export const getAddressLabels = (string: string) => {
  switch(string) {
    case 'street':
      return 'Rua'
    case 'city': 
      return 'Cidade'
    case 'state':
      return 'Estado'
    case 'zip':
      return 'CEP'
    default: 
      return ''
  }
}

export const getRaceSessions = (string: string) => {
  switch(string) {
    case 'qualyMinutes':
      return 'Qualy'
    case 'raceMinutes': 
      return 'Corrida'
    case 'practiceTime':
      return 'Treino'
    case 'raceLaps':
      return 'Voltas'
    default: 
      return ''
  }
}