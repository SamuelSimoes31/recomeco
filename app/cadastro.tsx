import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import Input from '../components/Input';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import RadioGroup from '../components/RadioGroup';

interface FormValues {
  nome: string;
  idade: number;
  sexo: string;
  estadoCivil: string;
  telefone1: string;
  telefone2: string;
  rua: string
  bairro: string
  cidade: string
  email: string
  redeSocial: string
  celula: string
}

export default function cadastro() {
  const { control, handleSubmit, formState, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      telefone1: '819',
      telefone2: 'Não'
    }
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <View style={styles.container}>
      <Input
        name='nome'
        label={'NOME COMPLETO'}
        control={control as any}
        formState={formState}
      />
      <Input
        name='idade'
        label={'Idade'}
        control={control as any}
        formState={formState}
      />
      <RadioGroup
        name='sexo'
        label='SEXO'
        options={['MASCULINO', 'FEMININO']}
        setValue={setValue}
        watch={watch}
      />
      <RadioGroup
        name='estadoCivil'
        label='ESTADO CIVIL'
        options={['CASADO(A)', 'SOLTEIRO(A)', 'VIÚVO(A)']}
        setValue={setValue}
        watch={watch}
      />
      <Input
        name='telefone1'
        label={'Telefone 1'}
        control={control as any}
        formState={formState}
      />
      <Input
        name='telefone2'
        label={'Telefone 2'}
        control={control as any}
        formState={formState}
      />
      <Button mode='contained' onPress={handleSubmit(onSubmit)} >Submit</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: 'center',
    width: '100%',
    maxHeight: '60%',
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
