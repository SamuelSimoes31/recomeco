import { FieldPathByValue } from 'react-hook-form';
import { ImageSourcePropType } from 'react-native';
import { FormContext } from '../hooks/FormContext';

export type Culto = {
  nome: string
  imagem: ImageSourcePropType
}

export const CULTOS : Culto[] = [
  {
    nome: 'Domingo 17:00',
    imagem: require(`../assets/cultos/domingo-17.jpeg`),
  },
  {
    nome: 'Domingo 19:30',
    imagem: require(`../assets/cultos/domingo-1930.jpeg`),
  },
  {
    nome: 'Culto da Quarta',
    imagem: require(`../assets/cultos/quarta.jpeg`),
  },
  {
    nome: 'Amor a Dois',
    imagem: require(`../assets/cultos/amor-a-dois.jpeg`),
  },
  {
    nome: 'Todas por Um',
    imagem: require(`../assets/cultos/todas-por-um.jpeg`),
  },
  {
    nome: 'Todos por Um',
    imagem: require(`../assets/cultos/todos-por-um.jpeg`),
  },
  {
    nome: 'Start',
    imagem: require(`../assets/cultos/start.jpeg`),
  },
  {
    nome: 'Connect',
    imagem: require(`../assets/cultos/connect.jpeg`),
  },{
    nome: 'Up',
    imagem: require(`../assets/cultos/up.jpeg`),
  },
]

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
  'vida.email': 'Email',
  'vida.redeSocial': 'Rede Social',
  'vida.celula': 'Participa de célula',
  'voluntario.culto': 'Culto',
  'voluntario.nome': 'Voluntário',
  'vida.observacoes': 'Observações',
  'voluntario.campus': 'Campus',
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
  const flatValues = flattenObject(values)
  flatValues['voluntario.campus'] = flatValues['voluntario.campus'] + ' / ' + flatValues['voluntario.culto']
  delete flatValues['voluntario.culto']

  let message = ''
  Object.entries(flatValues).forEach(([key,value]) => {
    message = message.concat(encodeURI(`*${WHATSAPP_MESSAGES_ENTRIES[key]}:* ${value}\n`))
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
