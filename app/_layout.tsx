import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <PaperProvider theme={{
      ...DefaultTheme,
      colors: {
        primary: '#db4437',
        onPrimary: "#ffffff",
        surfaceDisabled: "#201a191e",
        onSurfaceDisabled: "#201a1960",
      }
    }}>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white'
        }
      }} />
    </PaperProvider>
  );
}
