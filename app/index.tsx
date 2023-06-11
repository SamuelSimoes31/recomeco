import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button} from 'react-native-paper'

export default function Page() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Bem vindo</Text>
        <TextInput label={'Nome do Voluntário'}/>
        <Button mode='contained' onPress={() => router.push('/cadastro')}>Prosseguir</Button>
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
