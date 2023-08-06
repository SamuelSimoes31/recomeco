import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from 'react-native-paper';
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../hooks/FormContext';
import { defaultStyles } from '../utils/styles';
import { cultos } from '../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';


export default function Page() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormContext>();

  return (
    <View style={[defaultStyles.container, styles.main]}>
      <Stack.Screen options={{ title: "Qual culto está servindo?" }} />
      <ScrollView>

      <View style={{ flexDirection: 'row', flex: 1, gap: 16, flexWrap: 'wrap', paddingBottom: 24 }}>
        {cultos.map(culto => (
          <Card theme={{ roundness: 2 }} key={culto.valor} onPress={() => null} style={styles.cardContainer}>
            <Card.Cover theme={{ roundness: 2 }} resizeMode='contain' source={culto.imagem} />
            <Card.Content style={{ alignItems: 'center', paddingBottom: 4 }}>
              <Text variant="titleMedium">{culto.nome}</Text>
            </Card.Content>
          </Card>
        ))}
        {cultos.length % 2 === 1 && <View style={styles.cardContainer} />}
      </View>
      </ScrollView>
      <Button
        style={{marginTop: 24}}
        mode='contained'
        onPress={handleSubmit(() => {
          router.push('/cadastro');
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
  cardContainer: {
    flex: 1,
    minWidth: '45%'
  }
});
