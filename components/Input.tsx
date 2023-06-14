import React from 'react';
import { Text, View, ViewProps } from "react-native";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { FormContext } from '../app/_layout';

type InputP = Omit<ControllerProps<FormContext>, 'render'> & TextInputProps & {
  containerStyle?: ViewProps['style'];
};

export default function Input({ containerStyle, name, rules, defaultValue, shouldUnregister,...rest }: InputP) {
  const { control, formState } = useFormContext<FormContext>();
  const { errors } = formState

  return (
    <View style={containerStyle}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={typeof value === 'number' ? String(value) : value}
            mode='outlined'
            {...rest}
          />
        )}
      />
      <HelperText visible={!!errors[name]?.message } type='error'>{errors[name]?.message}</HelperText>
    </View>
  );
}
