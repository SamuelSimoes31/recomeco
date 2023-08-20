import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormContext } from "react-hook-form";
import Input from '../../components/Input';
import { Button } from 'react-native-paper';
import RadioGroup from '../../components/RadioGroup';
import { FormContext } from '../../hooks/FormContext';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultStyles } from '../../utils/styles';
import { Stack, useRouter } from 'expo-router';

export default function cadastro() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormContext>();
  const onSubmit = (data: any) => {
    console.log(data)
    router.back()
  };

  return (
    <ScrollView>
      <Stack.Screen options={{ title: "Cadastro" }} />
      <View style={[defaultStyles.container, {gap: 8}]}>
        <Input
          name='vida.nome'
          label={'NOME COMPLETO'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.idade'
          label={'IDADE'}
          placeholder='Insira um valor'
          required
          keyboardType='number-pad'
        />
        <RadioGroup
          name='vida.sexo'
          label='SEXO'
          options={['MASCULINO', 'FEMININO']}
          required
        />
        <RadioGroup
          name='vida.estadoCivil'
          label='ESTADO CIVIL'
          options={['CASADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)']}
          required
        />
        <Input
          name='vida.telefone1'
          label={'Telefone 1'}
          required
          keyboardType='number-pad'
          rules={{
            minLength: {value: 11, message: 'Número deve ter 11 caracteres'},
          }}
          maxLength={11}
        />
        <Input
          name='vida.telefone2'
          label={'Telefone 1'}
          keyboardType='number-pad'
          // rules={{
          //   minLength: {value: 11, message: 'Número deve ter 11 caracteres'},
          // }}
          maxLength={11}
        />
        <Input
          name='vida.rua'
          label={'ENDEREÇO(Av, rua, nº, complemento)'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.bairro'
          label={'BAIRRO'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.cidade'
          label={'CIDADE'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.email'
          label={'EMAIL'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.redeSocial'
          label={'REDE SOCIAL'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.celula'
          label={'PARTICIPA DE CÉLULA?'}
          placeholder='Caso seja SIM, qual CÉLULA, LÍDER, REDE?'
          required
        />
        <Input
          name='vida.observacoes'
          label={'OBSERVAÇÕES'}
          placeholder='Insira um valor'
        />
        <Button mode='contained' style={{marginTop: 24}} onPress={handleSubmit(onSubmit)} >Salvar</Button>

      </View>
    </ScrollView>
  );
}