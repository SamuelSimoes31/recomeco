import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <PaperProvider theme={{
      colors: {
        primary: '#db4437'
      }
    }}>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white'
        }
      }}/>
    </PaperProvider>
  )
}
