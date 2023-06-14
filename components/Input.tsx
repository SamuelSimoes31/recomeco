import React, { useEffect } from 'react';
import { Text, View, ViewProps } from "react-native";
import { Controller, ControllerProps, FormState, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from 'react-native-paper';
import { FormContext } from '../app/_layout';

type InputP = Omit<ControllerProps<FormContext>, 'render'> & TextInputProps & {
  containerStyle?: ViewProps['style'];
};

export default function Input({ containerStyle, name, rules, defaultValue, shouldUnregister,...rest }: InputP) {
  const { control, handleSubmit, formState, register } = useFormContext<FormContext>();
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
            value={typeof value === 'number' ? String(value) : value}
            mode='outlined'
            {...rest}
          />
        )}
      />
      {errors[name]?.message && <Text style={{color: 'red'}}>{errors[name]?.message}</Text>}
    </View>
  );
}
