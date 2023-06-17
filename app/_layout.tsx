import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { Stack } from 'expo-router';
import { AppFormContextProvider } from '../hooks/FormContext';

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#db4437',
    onPrimary: "#ffffff",
    surfaceDisabled: "#201a191e",
    onSurfaceDisabled: "#201a1960",
  }
}

export default function Layout() {
  return (
    <AppFormContextProvider>
      <PaperProvider >
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'white'
          }
        }} />
      </PaperProvider>
    </AppFormContextProvider>
  );
}
