import { FormContext } from '../hooks/FormContext';


//export const GOOGLE_FORM_ENTRIES :Record<Exclude<FieldPathByValue<FormContext, string>, 'id'>,number> = {
export const GOOGLE_FORM_ENTRIES :Record<string,number> = {
  'vida.nome': 1981735571,
  'vida.idade': 978933836,
  'vida.sexo': 1505175568,
  'vida.estadoCivil': 550843938,
  'vida.telefone1': 1687686240,
  'vida.telefone2': 1640386025,
  'vida.rua': 1252938284,
  'vida.bairro': 1316404051,
  'vida.cidade': 224229620,
  'vida.email': 390493169,
  'vida.redeSocial': 1531927057,
  'vida.celula': 1016897638,
  'voluntario.culto': 26503110,
  'voluntario.nome': 1038554481,
  'vida.observacoes': 474898689,
  'voluntario.campus': 26503110,
  'CONVERSAO': 691748290,
}

export const WHATSAPP_MESSAGES_ENTRIES :Record<string,string> = {
  'vida.nome': 'Nome',
  'vida.idade': 'Idade',
  'vida.sexo': 'Sexo',
  'vida.estadoCivil': 'Estado Civil',
  'vida.telefone1': 'Telefone 1',
  'vida.telefone2': 'Telefone 2',
  'vida.rua': 'Endereço',
  'vida.bairro': 'Bairro',
  'vida.cidade': 'Cidade',
  'vida.estadoPais': 'Estado/Pais',
  'vida.email': 'Email',
  'vida.redeSocial': 'Rede Social',
  'vida.participaCelula': 'Participa de célula',
  'vida.celula': 'Célula',
  'voluntario.campus': 'Campus',
  'voluntario.culto': 'Culto',
  'voluntario.nome': 'Voluntário',
  'vida.observacoes': 'Observações',
}

const RECOMECO_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSer9CgfTH3HjEdHlVUauC9LH6EeCOhIBaNq8NVGwh3WrVagFw/viewform?usp=pp_url'

const WHATSAPP_NUMBER = '5581985860368'

export const buildFormURL = (values: FormContext) => {
  const flatValues = flattenObject(values)
  flatValues['voluntario.campus'] = flatValues['voluntario.campus'] + ' / ' + flatValues['voluntario.culto']
  delete flatValues['voluntario.culto']

  let entries = ''
  Object.entries(flatValues).forEach(([key,value]) => {
    entries = entries.concat(`&entry.${GOOGLE_FORM_ENTRIES[key]}=${encodeURI(value as string)}`)
  })

  return RECOMECO_FORM_URL + entries + `&entry.${GOOGLE_FORM_ENTRIES['CONVERSAO']}=${encodeURI('PRESENCIAL')}`
}


export const buildWhatsappMessageUrl = (values: FormContext) => {
  console.log(values)
  const flatValues = flattenObject(values)

  let message = ''
  Object.entries(WHATSAPP_MESSAGES_ENTRIES).forEach(([key,value]) => {
    if(flatValues[key]){
      message = message.concat(encodeURI(`*${value}:* ${flatValues[key]}\n`))
    }
  })

  // return 'whatsapp://send?text=' + message + '&phone=' + WHATSAPP_NUMBER
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message
}

const flattenObject = (obj: any, prefix = '') =>
  Object.keys(obj).reduce((acc: any, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});
