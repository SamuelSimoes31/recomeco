import { ImageSourcePropType } from 'react-native';

export type Culto = {
  nome: string
  imagem: ImageSourcePropType
  valor: string
}

export const cultos : Culto[] = [
  {
    nome: 'Domingo 17:00',
    imagem: require(`../assets/cultos/domingo-17.jpeg`),
    valor: 'domingo-17'
  },
  {
    nome: 'Domingo 19:30',
    imagem: require(`../assets/cultos/domingo-1930.jpeg`),
    valor: 'domingo-1930'
  },
  {
    nome: 'Quarta',
    imagem: require(`../assets/cultos/quarta.jpeg`),
    valor: 'quarta'
  },
  {
    nome: 'Amor a Dois',
    imagem: require(`../assets/cultos/amor-a-dois.jpeg`),
    valor: 'amor-a-dois'
  },
  {
    nome: 'Todas por Um',
    imagem: require(`../assets/cultos/todas-por-um.jpeg`),
    valor: 'todas-por-um'
  },
  {
    nome: 'Todos por Um',
    imagem: require(`../assets/cultos/todos-por-um.jpeg`),
    valor: 'todos-por-um'
  },
  {
    nome: 'Start',
    imagem: require(`../assets/cultos/start.jpeg`),
    valor: 'start'
  },
  {
    nome: 'Connect',
    imagem: require(`../assets/cultos/connect.jpeg`),
    valor: 'connect'
  },
]