import React from 'react'
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface RadioGroupP {
  name: string,
  label: string
  setValue: any
  watch: any
  options: string[]
}

export default function RadioGroup({name, label, setValue, watch, options}: RadioGroupP) {

  return (
    <RadioButton.Group onValueChange={newValue => setValue(name, newValue)} value={watch(name)}>
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
