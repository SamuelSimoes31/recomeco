import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from 'react-native-paper';


export default function Page() {
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text variant='headlineLarge'>Bem vindo</Text>
        <TextInput
          label={'Nome do Voluntário'}
          placeholder='Seu nome aqui'
          value={name}
          onChangeText={(v) => setName(v)}
        />
        <Button
          disabled={!name}
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
