import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { Props as ButtonProps } from 'react-native-paper/src/components/Button/Button';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface FooterButtonsP {
  buttons: Array<{
    onPress: () => void;
    flex?: number;
    title: string;
    icon?: string;
    children?: React.ReactElement;
    disabled?: boolean;
  } & Omit<ViewProps, 'children'>>;
}

export default function FooterButtons({ buttons }: FooterButtonsP) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', width: '100%'}}>
      {buttons.map((button, index) => (
        <TouchableRipple
          key={button.title + index}
          onPress={button.onPress}
          disabled={button.disabled}
          style={[{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 70,
            opacity: button.disabled ? 0.5 : 1,
            backgroundColor: theme.colors.onPrimary,
            borderRadius: 0,
            borderColor: theme.colors.primary,
            borderWidth: 1,
            padding: 8,
            flex: button.flex ?? 1,
          }, button.style]}
        >
          <>
            {button.children}
            {button.icon && <Feather name={button.icon} size={18} color="black" />}
            <Text variant='labelMedium' style={{fontWeight: '600'}}>{button.title}</Text>
          </>
        </TouchableRipple>
      ))}
    </View>
  );
}
