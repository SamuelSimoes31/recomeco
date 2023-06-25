import { Stack, useRouter } from 'expo-router';
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';
import Input from '../components/Input';
import Dropdown from '../components/DropDown';
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../hooks/FormContext';
import { defaultStyles } from '../utils/styles';


export default function Page() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormContext>();

  return (
    <View style={[defaultStyles.container, styles.main]}>
       <Stack.Screen options={{ headerShown: false }} />
      <View style={{alignItems: 'center', gap: 36, margin: 24}}>
        <Image source={require('../assets/logo-nome.jpeg')} />
        <Text variant='headlineLarge'>Bem vindo</Text>
      </View>
      <View style={{marginVertical: 36}}>
        <Input
          name='voluntario.nome'
          label={'Nome do Voluntário'}
          placeholder='Insira seu nome'
          MMKVKey='voluntario.nome'
          required
        />
        <Dropdown
          name='voluntario.campus'
          list={[{ value: 'Campus Cabo', label: 'Campus Cabo' }]}
          label='Campus'
          MMKVKey='voluntario.campus'
          placeholder='Em qual campus está servindo?'
          required
        />
      </View>
      <Button
        mode='contained'
        onPress={handleSubmit(() => {
          router.push('/vidas');
        })}
      >
        Prosseguir
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'flex-end',
  },
});
