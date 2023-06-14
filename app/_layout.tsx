import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';

export interface FormContext {
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

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#db4437',
    onPrimary: "#ffffff",
    surfaceDisabled: "#201a191e",
    onSurfaceDisabled: "#201a1960",
  }
}

export default function Layout() {
  const methods = useForm<FormContext>({
    defaultValues: {
      telefone1: '819',
      telefone2: 'Não',
      cidade: 'Cabo de St. Agostinho'
    },
    reValidateMode: 'onChange',
  })

  return (
    <FormProvider {...methods}>
      <PaperProvider >
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'white'
          }
        }} />
      </PaperProvider>
    </FormProvider>
  );
}
