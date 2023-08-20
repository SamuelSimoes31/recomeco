import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../../hooks/FormContext';
import { defaultStyles } from '../../utils/styles';
import { Avatar, Divider, FAB, Text, TouchableRipple, useTheme } from 'react-native-paper';
import FooterButtons from '../../components/FooterButtons';
import { useEffect, useState } from 'react';
import { CULTOS } from '../../utils/constants';
import { STORAGE_KEYS, storage } from '../../clients/mmkv';
import { useVidasContext } from '../../hooks/VidasContext';


export default function Page() {
  const router = useRouter();
  const { setValue, watch } = useFormContext<FormContext>();
  const theme = useTheme();
  const culto = watch('voluntario.culto')
  const img = CULTOS.find(e => e.nome === culto)?.imagem ?? require('../../assets/logo-nome.jpeg')
  const { vidas, newIdVidalAtual } = useVidasContext()

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={[defaultStyles.container, {justifyContent: 'flex-end'}]}>
          <Stack.Screen options={{ title: "Vidas" }} />
          {vidas.map(v => (
            <Text key={v.id}>{v.vida.nome}</Text>
          ))}
        </View>
      </ScrollView>
      {/* <Divider bold /> */}
      <FooterButtons
        buttons={[
          {
            title: culto ? `Servindo no ${culto}` : 'Qual culto você está servindo?',
            flex: 3,
            onPress: () => router.push('/culto'),
            style: {flexDirection: 'row', gap: 8, justifyContent: 'flex-start'},
            children: culto ? <Avatar.Image size={54} source={img} /> : <Avatar.Text size={54} label=''  />
          },
          {
            disabled: !culto,
            title: 'Nova vida',
            icon: 'user-plus',
            onPress: () => {
              newIdVidalAtual()
              router.push('/vidas/cadastro')
            }
          }
        ]}
      />
    </View>
  );
}

