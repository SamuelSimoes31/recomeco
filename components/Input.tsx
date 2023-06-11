import React, { useEffect } from 'react';
import { Text, View, ViewProps } from "react-native";
import { useForm, Controller, ControllerProps, FormState } from "react-hook-form";
import { TextInput, TextInputProps } from 'react-native-paper';

type InputP = Omit<ControllerProps, 'render'> & TextInputProps & {
  containerStyle?: ViewProps['style'];
  formState: FormState<any>
};

export default function Input({ containerStyle, name, rules, defaultValue, formState, control, shouldUnregister,...rest }: InputP) {
  // const { control, handleSubmit, formState, register } = useForm();
  const { errors } = formState

  useEffect
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
            value={value}
            mode='outlined'
            {...rest}
          />
        )}
      />
      {errors.firstName && <Text>This is required.</Text>}
    </View>
  );
}
