import { FormContext } from '../hooks/FormContext'


//export const GOOGLE_FORM_ENTRIES :Record<Exclude<FieldPathByValue<FormContext, string>, 'id'>,number> = {
export const GOOGLE_FORM_ENTRIES: Record<string, number> = {
  'vida.nome': 2005620554,
  'vida.idade': 1065046570,
  'vida.sexo': 1166974658,
  'vida.estadoCivil': 1045781291,
  'vida.telefone1': 1974093124,
  'vida.telefone2': 1700597708,
  'vida.rua': 773746128,
  'vida.bairro': 225051009,
  'vida.cidade': 1099749443,
  'vida.email': 1453591276,
  'vida.redeSocial': 1032433154,
  'vida.celula': 1813669429,
  'vida.estadoPais': 1452519748,
  'vida.participaCelula': 531175026,
  'voluntario.culto': 738391434,
  'voluntario.nome': 1662748463,
  'vida.observacoes': 1879273873,
  'voluntario.campus': 738391434,
  'vida.primeiraConversao': 1485377681,
  'vida.reconciliacao': 2067122527,
  'vida.antigaIgreja': 990716761,
  'CONVERSAO': 839337160,
}

export const WHATSAPP_MESSAGES_ENTRIES: Record<string, string> = {
  'vida.nome': 'Nome',
  'vida.idade': 'Idade',
  'vida.sexo': 'Sexo',
  'vida.estadoCivil': 'Estado Civil',
  'vida.telefone1': 'Telefone 1',
  'vida.telefone2': 'Telefone 2',
  'vida.redeSocial': 'Rede Social',
  'vida.email': 'Email',
  'vida.rua': 'Endereço',
  'vida.bairro': 'Bairro',
  'vida.cidade': 'Cidade',
  'vida.estadoPais': 'Estado/Pais',
  'vida.participaCelula': 'Participa de célula',
  'vida.celula': 'Célula',
  'vida.primeiraConversao': 'Primeira conversão',
  'vida.reconciliacao': 'Reconciliação',
  'vida.antigaIgreja': 'Antiga igreja',
  'vida.observacoes': 'Observações',
  'voluntario.campus': 'Campus',
  'voluntario.culto': 'Culto',
  'voluntario.nome': 'Voluntário',
}

const RECOMECO_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSerGoKRijPIOFJx2pE43rZNToQbhHiPDvptNZ0YOndSIrYMFQ/viewform?mode=html'

const WHATSAPP_NUMBER = '5581986176839'

export const buildFormURL = (values: FormContext) => {
  const flatValues = flattenObject(values)
  flatValues['voluntario.campus'] = flatValues['voluntario.campus'] + ' / ' + flatValues['voluntario.culto']
  delete flatValues['voluntario.culto']

  let entries = ''
  Object.entries(flatValues).forEach(([key, value]) => {
    if (value) entries = entries.concat(`&entry.${GOOGLE_FORM_ENTRIES[key]}=${encodeURI(value as string)}`)
  })

  return RECOMECO_FORM_URL + entries + `&entry.${GOOGLE_FORM_ENTRIES['CONVERSAO']}=${encodeURI('PRESENCIAL')}`
}


export const buildWhatsappMessageUrl = (values: FormContext) => {
  const flatValues = flattenObject(values)

  let message = ''
  Object.entries(WHATSAPP_MESSAGES_ENTRIES).forEach(([key, value]) => {
    if (flatValues[key]) {
      message = message.concat(encodeURI(`*${value}:* ${flatValues[key]}\n`))
    }
  })

  // return 'whatsapp://send?text=' + message + '&phone=' + WHATSAPP_NUMBER
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message
}

const flattenObject = (obj: any, prefix = '') =>
  Object.keys(obj).reduce((acc: any, k) => {
    const pre = prefix.length ? prefix + '.' : ''
    if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k))
    else acc[pre + k] = obj[k]
    return acc
  }, {})
