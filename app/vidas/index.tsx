import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../../hooks/FormContext';
import { defaultStyles } from '../../utils/styles';
import { Avatar, Divider, FAB, Text, TouchableRipple, useTheme } from 'react-native-paper';
import FooterButtons from '../../components/FooterButtons';


export default function Page() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormContext>();
  const theme = useTheme();

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
            title: 'Aa',
            icon: 'aa',
            flex: 3,
            onPress: () => null
          },
          {
            title: 'Nova vida',
            icon: 'bb',
            onPress: () => null
          }
        ]}
      />
    </View>
  );
}

