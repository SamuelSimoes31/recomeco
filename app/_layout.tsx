import { PaperProvider, MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';
import { Stack } from 'expo-router';
import { AppFormContextProvider } from '../hooks/FormContext';
import VidasContextProvider from '../hooks/VidasContext';

const theme : MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme['colors'],
    primary: '#db4437',
    background: '#fff',
    onPrimary: "#eee",
    surfaceDisabled: "#201a191e",
    onSurfaceDisabled: "#201a1960",
  }
}

export default function Layout() {
  return (
    <AppFormContextProvider>
      <PaperProvider theme={theme} >
        <VidasContextProvider>
          <Stack screenOptions={{
            contentStyle: {
              backgroundColor: 'white'
            },
            headerTitleAlign: 'center'
          }} />
        </VidasContextProvider>
      </PaperProvider>
    </AppFormContextProvider>
  );
}
