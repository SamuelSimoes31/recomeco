import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../../hooks/FormContext';
import { defaultStyles } from '../../utils/styles';
import { Avatar, Divider, FAB, Text, TouchableRipple, useTheme } from 'react-native-paper';
import FooterButtons from '../../components/FooterButtons';
import { useState } from 'react';


export default function Page() {
  const router = useRouter();
  const { setValue, watch } = useFormContext<FormContext>();
  const theme = useTheme();
  const culto = watch('voluntario.culto')

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={[defaultStyles.container, {justifyContent: 'flex-end'}]}>
          <Stack.Screen options={{ title: "Vidas" }} />
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
            children: culto ? <Avatar.Image size={54} source={require('../../assets/cultos/connect.jpeg')} /> : <Avatar.Text size={54} label=''  />
          },
          {
            disabled: !culto,
            title: 'Nova vida',
            icon: 'user-plus',
            onPress: () => null
          }
        ]}
      />
    </View>
  );
}

