import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { useFormContext } from "react-hook-form";
import Input from '../../components/Input';
import { Button, Text } from 'react-native-paper';
import RadioGroup from '../../components/RadioGroup';
import { FormContext } from '../../hooks/FormContext';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultStyles } from '../../utils/styles';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { useVidasContext } from '../../hooks/VidasContext';

export default function cadastro() {
  const router = useRouter();
  const navigation = useNavigation();
  const { handleSubmit, formState, watch, setValue } = useFormContext<FormContext>();
  const { addVida, cancelVida, idVidaAtual } = useVidasContext();
  const participaCelula = watch('vida.participaCelula')

  useEffect(() => {
    if(participaCelula === 'NÃO'){
      setValue('vida.celula', '')
    }
  }, [participaCelula])

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

  if (!idVidaAtual) return null;

  const onSubmit = (data: any) => {
    addVida(data);
    router.push('/vidas');
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
        </View>

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
          helperText='Caso número não seja da pessoa, botar nas observações'
        />
        <Input
          name='vida.telefone2'
          MMKVKey='vida.telefone2'
          label={'Telefone 2'}
          keyboardType='number-pad'
          // rules={{
            //   minLength: {value: 11, message: 'Número deve ter 11 caracteres'},
          // }}
          maxLength={11}
        />
        <Input
          name='vida.redeSocial'
          MMKVKey='vida.redeSocial'
          label={'REDE SOCIAL'}
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
          name='vida.estadoPais'
          MMKVKey='vida.estadoPais'
          label={'ESTADO/PAIS'}
          placeholder='Insira um valor'
          required
        />
        <RadioGroup
          name='vida.participaCelula'
          MMKVKey='vida.participaCelula'
          label='PARTICIPA DE CÉLULA?'
          options={['SIM', 'NÃO']}
          required
        />
        {participaCelula === 'SIM' && (
          <Input
          name='vida.celula'
          MMKVKey='vida.celula'
          label={'QUAL A CÉLULA, LÍDER E REDE?'}
          placeholder='Insira um valor'
          required
          />
          )}
        <Input
          name='vida.observacoes'
          MMKVKey='vida.observacoes'
          label={'OBSERVAÇÕES'}
          placeholder='Insira um valor'
        />
        {Object.keys(formState.errors)?.length > 0 && <Text variant='bodyMedium'>Verifique as respostas, algumas contém erros</Text>}
        <Button mode='contained' style={{ marginTop: 24 }} onPress={handleSubmit(onSubmit)} >Salvar</Button>

      </View>
    </ScrollView>
  );
}