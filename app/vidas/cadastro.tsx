import React, { useMemo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useFormContext } from "react-hook-form";
import Input from '../../components/Input';
import { Button } from 'react-native-paper';
import RadioGroup from '../../components/RadioGroup';
import { FormContext } from '../../hooks/FormContext';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultStyles } from '../../utils/styles';
import { Stack, useRouter } from 'expo-router';
import { STORAGE_KEYS, storage } from '../../clients/mmkv';
import { useVidasContext } from '../../hooks/VidasContext';

export default function cadastro() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormContext>();
  const { addVida, cancelVida, idVidaAtual } = useVidasContext();

  if (!idVidaAtual) return null;

  const onSubmit = (data: any) => {
    addVida(data);
    router.push('/vidas');
  };

  const onCancel = () => {
    Alert.alert(
      'Tem certeza que deseja cancelar?',
      'Todos os dados serão perdidos!!!',
      [{
        text: 'Sim',
        onPress: () => {
          cancelVida();
          router.back()
        }
      },{
        text: 'Voltar',
      }],
      {
        cancelable: true
      }
    );
  };

  return (
    <ScrollView>
      <Stack.Screen options={{ title: "Cadastro", headerRight: () => <Button onPress={onCancel}>cancelar</Button> }} />
      <View style={[defaultStyles.container, { gap: 8 }]}>
        <Input
          name='vida.nome'
          MMKVKey='vida.nome'
          label={'NOME COMPLETO'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.idade'
          MMKVKey='vida.idade'
          label={'IDADE'}
          placeholder='Insira um valor'
          required
          keyboardType='number-pad'
        />
        <RadioGroup
          name='vida.sexo'
          MMKVKey='vida.sexo'
          label='SEXO'
          options={['MASCULINO', 'FEMININO']}
          required
        />
        <RadioGroup
          name='vida.estadoCivil'
          MMKVKey='vida.estadoCivil'
          label='ESTADO CIVIL'
          options={['CASADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)']}
          required
        />
        <Input
          name='vida.telefone1'
          MMKVKey='vida.telefone1'
          label={'Telefone 1'}
          required
          keyboardType='number-pad'
          rules={{
            minLength: { value: 11, message: 'Número deve ter 11 caracteres' },
          }}
          maxLength={11}
        />
        <Input
          name='vida.telefone2'
          MMKVKey='vida.telefone2'
          label={'Telefone 1'}
          keyboardType='number-pad'
          // rules={{
          //   minLength: {value: 11, message: 'Número deve ter 11 caracteres'},
          // }}
          maxLength={11}
        />
        <Input
          name='vida.rua'
          MMKVKey='vida.rua'
          label={'ENDEREÇO(Av, rua, nº, complemento)'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.bairro'
          MMKVKey='vida.bairro'
          label={'BAIRRO'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.cidade'
          MMKVKey='vida.cidade'
          label={'CIDADE'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.email'
          MMKVKey='vida.email'
          label={'EMAIL'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.redeSocial'
          MMKVKey='vida.redeSocial'
          label={'REDE SOCIAL'}
          placeholder='Insira um valor'
          required
        />
        <Input
          name='vida.celula'
          MMKVKey='vida.celula'
          label={'PARTICIPA DE CÉLULA?'}
          placeholder='Caso seja SIM, qual CÉLULA, LÍDER, REDE?'
          required
        />
        <Input
          name='vida.observacoes'
          MMKVKey='vida.observacoes'
          label={'OBSERVAÇÕES'}
          placeholder='Insira um valor'
        />
        <Button mode='contained' style={{ marginTop: 24 }} onPress={handleSubmit(onSubmit)} >Salvar</Button>

      </View>
    </ScrollView>
  );
}