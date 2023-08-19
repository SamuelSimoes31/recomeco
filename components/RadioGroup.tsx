import React from 'react';
import { Controller, ControllerProps, FieldPath, FieldPathByValue, useFormContext } from 'react-hook-form';
import { View, Text, ViewProps } from 'react-native';
import { HelperText, RadioButton } from 'react-native-paper';
import { FormContext } from '../hooks/FormContext';
import { getDeepVal } from '../utils/form';
import { storage } from '../clients/mmkv';


type RadioGroupP = Omit<ControllerProps<FormContext>, 'render' | 'name' | 'control'> & {
  name: FieldPathByValue<FormContext, string>,
  label: string;
  options: string[];
  containerStyle?: ViewProps['style'];
  MMKVKey?: FieldPathByValue<FormContext, string> | string;
  required?: boolean;
};

export default function RadioGroup({
  name,
  label,
  options,
  rules,
  required,
  defaultValue,
  shouldUnregister,
  MMKVKey,
}: RadioGroupP) {
  const { control, formState } = useFormContext<FormContext>();
  const error = getDeepVal(formState.errors, name);
  return (
    <Controller
      name={name}
      control={control}
        rules={{
          ...rules as any,
          required: required ? {value: true, message: 'Esse campo é obrigatório'} : rules?.required,
        }}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value } }) => (
        <RadioButton.Group
          onValueChange={newValue => {
            onChange(newValue)
            if (MMKVKey) {
              storage.set(MMKVKey, newValue);
            }
          }}
          value={value}
        >
          <Text>{label}</Text>
          {options.map(option => (
            <View key={option} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value={option} />
              <Text>{option}</Text>
            </View>
          ))}
           <HelperText visible={!!error} type='error'>{error?.message}</HelperText>
        </RadioButton.Group>
      )}
    />
  );
}
