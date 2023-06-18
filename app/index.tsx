import { useRouter } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';
import Input from '../components/Input';
import Dropdown from '../components/DropDown';


export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text variant='headlineLarge'>Bem vindo</Text>
        <Input
          name='voluntario.nome'
          label={'Nome do Voluntário'}
          placeholder='insira o nome'
          MMKVKey='voluntario.nome'
        />
        <Dropdown
          name='voluntario.campus'
          list={[{value: 'CABO', label: 'CABO'}]}
          label='Aaa'
          MMKVKey='voluntario.campus'
        />
        <Button
          // disabled={!name}
          mode='contained'
          onPress={async () => {
            router.push('/cadastro')
          }}
        >
          Prosseguir
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    padding: 24,
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
