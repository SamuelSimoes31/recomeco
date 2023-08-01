import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';
import Input from '../components/Input';
import Dropdown from '../components/DropDown';
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../hooks/FormContext';
import { defaultStyles } from '../utils/styles';


export default function Page() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormContext>();

  return (
    <View style={[defaultStyles.container, styles.main]}>
      <Button
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
});
