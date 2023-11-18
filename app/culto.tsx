import { Stack, useRouter } from 'expo-router';
import { KeyboardAvoidingView, StyleSheet, View, Platform } from "react-native";
import { Button, Card, Text } from 'react-native-paper';
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../hooks/FormContext';
import { defaultStyles } from '../utils/styles';
import { CULTOS } from '../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import Input from '../components/Input';
import { useEffect } from 'react';


export default function Page() {
  const router = useRouter();
  const { setValue, watch, resetField } = useFormContext<FormContext>();

  useEffect(() => {
    setValue('voluntario.culto', '')
  }, [])

  function onSelect(culto: string){
    setValue('voluntario.culto', culto)
    router.push('/vidas');
  }

  return (
    <ScrollView>
      <View style={defaultStyles.container}>
        <Stack.Screen options={{ title: "Qual culto está servindo?" }} />
        <View style={{ flexDirection: 'row', flex: 1, gap: 16, flexWrap: 'wrap', paddingBottom: 24 }}>
          {CULTOS.map(culto => (
            <Card theme={{ roundness: 2 }} key={culto.nome} onPress={() => onSelect(culto.nome)} style={styles.cardContainer}>
              {Platform.OS !== 'web' ? (
                <Card.Cover theme={{ roundness: 2 }} resizeMode='contain' source={culto.imagem} />
              ) : (
                <img src={culto.src} alt=""  style={{borderRadius: 4}}/>
              )}
              <Card.Content style={{ alignItems: 'center', paddingBottom: 4 }}>
                <Text variant="titleMedium">{culto.nome}</Text>
              </Card.Content>
            </Card>
          ))}
          {CULTOS.length % 2 === 1 && <View style={styles.cardContainer} />}
        </View>
        <KeyboardAvoidingView>
        <Input
          label='Outro culto'
          name='voluntario.culto'
        />
        {!!watch('voluntario.culto') && (
          <Button
            style={{marginTop: 24}}
            mode='contained'
            onPress={() => {
              router.push('/vidas');
            }}
          >
            Prosseguir
          </Button>
        )}
      </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    minWidth: '45%'
  }
});
