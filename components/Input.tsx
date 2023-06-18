import React from 'react';
import { View, ViewProps } from "react-native";
import { Controller, ControllerProps, FieldPathByValue, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { getDeepVal } from '../utils/form';
import { FormContext } from '../hooks/FormContext';
import { storage } from '../clients/mmkv';

type InputP = Omit<ControllerProps<FormContext>, 'render' | 'name'> & TextInputProps & {
  containerStyle?: ViewProps['style'];
  name: FieldPathByValue<FormContext, string>
  MMKVKey?: FieldPathByValue<FormContext, string> | string
};

export default function Input({ containerStyle, name, rules, defaultValue, shouldUnregister, MMKVKey, ...rest }: InputP) {
  const { control, formState } = useFormContext<FormContext>();
  const { errors } = formState
  const error = getDeepVal(errors, name)

  return (
    <View style={containerStyle}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={MMKVKey ? storage.getString(MMKVKey) : defaultValue}
        shouldUnregister={shouldUnregister}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={text => {
              if (MMKVKey){
                storage.set(MMKVKey, text)
              }
              onChange(text)
            }}
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
