import { FormProvider, useForm } from 'react-hook-form';
import { MMKVGetFormString, storage } from '../clients/mmkv';

export interface FormContext {
  voluntario: {
    nome: string
    campus: string
    culto: string
  }
  vida: {
    nome: string
    idade: string
    sexo: 'MASCULINO' | 'FEMININO'
    estadoCivil: 'CASADO(A)' | 'SOLTEIRO(A)' | 'VIÚVO(A)'
    telefone1: string
    telefone2: string
    rua: string
    bairro: string
    cidade: string
    email: string
    redeSocial: string
    celula: string
  }
}

export const AppFormContextProvider= ({children}: {children: any}) => {
  const methods = useForm<FormContext>({
    defaultValues: {
      voluntario: {
        nome: MMKVGetFormString('voluntario.nome'),
        campus: MMKVGetFormString('voluntario.campus'),
      },
      vida: {
        telefone1: '819',
        telefone2: 'Não',
        cidade: 'Cabo de St. Agostinho'
      }
    },
    reValidateMode: 'onChange',
  })

  // console.log(methods.watch())

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}

// export default AppFormContextProvider