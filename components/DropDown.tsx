import { FieldPathByValue, useFormContext } from 'react-hook-form';
import DropDown, { DropDownPropsInterface } from 'react-native-paper-dropdown';
import { FormContext } from '../hooks/FormContext';
import { useState } from 'react';

interface DropdownP extends Omit<DropDownPropsInterface, 'visible' | 'showDropDown' | 'onDismiss' | 'setValue' | 'value'> {
  name: FieldPathByValue<FormContext, string>;
}

export default function Dropdown({ name, ...props }: DropdownP) {
  const { setValue, watch } = useFormContext<FormContext>();
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <DropDown
      {...props}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      setValue={(value) => setValue(name, value)}
      value={watch(name)}
      mode='outlined'
    />
  );
}
