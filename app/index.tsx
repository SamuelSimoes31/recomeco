import { Link, Stack, useRouter } from 'expo-router';
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';
import Input from '../components/Input';
import Dropdown from '../components/DropDown';
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../hooks/FormContext';
import { defaultStyles } from '../utils/styles';
import { useVidasContext } from '../hooks/VidasContext';


export default function Page() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormContext>();
  const { idVidaAtual } = useVidasContext();

  return (
    <View style={[defaultStyles.container, styles.main]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ alignItems: 'center', gap: 36, margin: 24, marginBottom: 40 }}>
        <Image source={require('../assets/logo-nome.jpeg')} />
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Text>versão 1.2.0</Text>
          <Text>Criado por <Link style={{ color: 'blue', textDecorationLine: 'underline' }} href={'https://wa.me/5581985860368'}>
            Samuel Simões
          </Link>
            <Text style={{ fontSize: 12 }}>{`\nDúvidas, problemas ou sugestões.\nPor favor, comunique.`}</Text>
          </Text>
          <Link style={{ color: 'blue', textDecorationLine: 'underline' }} href={'https://expo.dev/artifacts/eas/s51KYJG2AFdwBBEkKNErfR.apk '}>
            Baixar Aplicativo para Android
          </Link>
          <Link style={{ color: 'blue', textDecorationLine: 'underline' }} href={'https://youtu.be/fY1ONrJqvtI?si=mXad92tPknCLt1DJ'}>
            Como utilizar o site?
          </Link>
        </View>
        <Text variant='headlineLarge'>Bem vindo</Text>
      </View>
      <View>
      </View>
      <View style={{ marginVertical: 36 }}>
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
          if (idVidaAtual) router.push('/vidas/cadastro');
          else router.push('/vidas');
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
