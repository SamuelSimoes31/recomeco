import React from 'react'
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface FooterButtonsP {
  buttons: {
    onPress: () => void
    flex?: number
    title: string
    icon: string
  }[]
}

export default function FooterButtons({ buttons}: FooterButtonsP) {
  const theme = useTheme()
  return (
    <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
      {buttons.map((button,index) => (
        <Button
          key={button.title + index}
          onPress={button.onPress}
          mode='contained-tonal'
          style={{borderRadius: 0, borderStartWidth: 1, borderTopWidth: 2, borderColor: theme.colors.primary, borderWidth: 1 , flex: button.flex ?? 1}}
          contentStyle={{height: 70, width: '100%', backgroundColor: theme.colors.onPrimary}}
        >
          {button.title}
        </Button>
      ))}
    </View>
  )
}
