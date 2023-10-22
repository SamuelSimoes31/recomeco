import { FormProvider, useForm } from 'react-hook-form';
import { MMKVGetFormString, STORAGE_KEYS, storage } from '../clients/mmkv';

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
    estadoPais: string
    email: string
    redeSocial: string
    participaCelula: string
    celula: string
    observacoes: string
  }
  id: string
  acoes?: {
    enviarLider?: boolean
    enviarForm?: boolean
  }
}

export const defaultFormValue = {
  voluntario: {
    nome: MMKVGetFormString('voluntario.nome'),
    campus: MMKVGetFormString('voluntario.campus'),
    culto: MMKVGetFormString('voluntario.culto')
  },
  vida: {
    nome: MMKVGetFormString('vida.nome'),
    bairro: MMKVGetFormString('vida.bairro'),
    email: MMKVGetFormString('vida.email'),
    estadoCivil: MMKVGetFormString('vida.estadoCivil') as any,
    idade: MMKVGetFormString('vida.idade'),
    observacoes: MMKVGetFormString('vida.observacoes'),
    redeSocial: MMKVGetFormString('vida.redeSocial'),
    rua: MMKVGetFormString('vida.rua'),
    sexo: MMKVGetFormString('vida.sexo') as any,
    telefone1: MMKVGetFormString('vida.telefone1') ??'819',
    telefone2: MMKVGetFormString('vida.telefone2') ??'Não',
    cidade:  MMKVGetFormString('vida.cidade') ?? 'Cabo de St. Agostinho',
    estadoPais: MMKVGetFormString('vida.estadoPais') ?? 'PE - BRASIL',
    participaCelula: MMKVGetFormString('vida.participaCelula') as any,
    celula: MMKVGetFormString('vida.celula'),
  }
}

export const AppFormContextProvider= ({children}: {children: any}) => {
  // storage.clearAll()
  const methods = useForm<FormContext>({
    defaultValues: defaultFormValue,
    reValidateMode: 'onChange',
  })

  // console.log(methods.watch())
  // console.log(methods.formState.errors)

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}

// export default AppFormContextProvider