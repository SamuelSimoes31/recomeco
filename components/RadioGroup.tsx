import React from 'react'
import { useFormContext } from 'react-hook-form';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { FormContext } from '../app/_layout';

interface RadioGroupP {
  name: keyof FormContext,
  label: string
  options: string[]
}

export default function RadioGroup({name, label, options}: RadioGroupP) {
  const { setValue, watch } = useFormContext<FormContext>();
  const value = watch(name)
  return (
    <RadioButton.Group onValueChange={newValue => setValue(name, newValue)} value={typeof value === 'number' ? String(value) : value}>
    <Text>{label}</Text>
    {options.map(option => (
      <View key={option} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton value={option} />
        <Text>{option}</Text>
      </View>
    ))}
  </RadioButton.Group>
  )
}
