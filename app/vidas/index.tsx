import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../../hooks/FormContext';
import { defaultStyles } from '../../utils/styles';


export default function Page() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormContext>();

  return (
    <View style={[defaultStyles.container, styles.main]}>
       <Stack.Screen options={{ title: "Vidas" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'flex-end',
  },
});
