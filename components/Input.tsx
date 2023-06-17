import React from 'react';
import { Text, View, ViewProps } from "react-native";
import { ArrayPath, Controller, ControllerProps, FieldArrayPath, FieldPath, FieldPathByValue, FieldPathValues, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { getDeepVal } from '../utils/form';
import { FormContext } from '../hooks/FormContext';

type InputP = Omit<ControllerProps<FormContext>, 'render' | 'name'> & TextInputProps & {
  containerStyle?: ViewProps['style'];
  name: FieldPathByValue<FormContext, string>
};

export default function Input({ containerStyle, name, rules, defaultValue, shouldUnregister,...rest }: InputP) {
  const { control, formState } = useFormContext<FormContext>();
  const { errors } = formState
  const error = getDeepVal(errors, name)

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
            value={value as string}
            mode='outlined'
            {...rest}
          />
        )}
      />
      <HelperText visible={!!error } type='error'>{error?.message}</HelperText>
    </View>
  );
}
