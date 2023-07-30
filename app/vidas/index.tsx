import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from "react-native";
import { useFormContext } from 'react-hook-form';
import { FormContext } from '../../hooks/FormContext';
import { defaultStyles } from '../../utils/styles';
import { Avatar, Divider, FAB, Text, TouchableRipple, useTheme } from 'react-native-paper';


export default function Page() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<FormContext>();
  const theme = useTheme();

  return (
    <>
      <ScrollView>
        <View style={[defaultStyles.container, styles.main]}>
          <Stack.Screen options={{ title: "Vidas" }} />
        </View>
      </ScrollView>
      <Divider bold />
      <TouchableRipple
    onPress={() => console.log('Pressed')}
    rippleColor={theme.colors.primary}
  >

      <View style={styles.footer}>
        <View style={{ flex: 1 }}>
          <Text variant='titleSmall'>Qual culto você está servindo?</Text>
          <Text variant='bodySmall'>Qual culto você está servindo?</Text>
          {/* <Avatar.Image size={54} source={require('../../assets/cultos/connect.jpeg')} /> */}
        </View>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => console.log('Pressed')}
          // label='NOVA VIDA'
          size='large'
          color={theme.colors.primary}
        // disabled
        />
      </View>
      </TouchableRipple>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'flex-end',
  },
  footer: {
    position: 'relative',
    flexDirection: 'row',
    padding: 16,
    width: '100%',
    // backgroundColor: '#E8E9EB'
  },
  fab: {
    position: 'absolute',
    // margin: 16,
    // marginBottom: 32,
    right: 16,
    top: -48,
  },
});

const MyComponent = () => (
  <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => console.log('Pressed')}
  />
);

