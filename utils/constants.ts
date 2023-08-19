import { ImageSourcePropType } from 'react-native';

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