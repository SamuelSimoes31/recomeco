import { FieldPathByValue, useFormContext } from 'react-hook-form';
import DropDown, { DropDownPropsInterface } from 'react-native-paper-dropdown';
import { FormContext } from '../hooks/FormContext';
import { useState } from 'react';
import { storage } from '../clients/mmkv';

interface DropdownP extends Omit<DropDownPropsInterface, 'visible' | 'showDropDown' | 'onDismiss' | 'setValue' | 'value'> {
  name: FieldPathByValue<FormContext, string>;
  MMKVKey?: FieldPathByValue<FormContext, string> | string
}

export default function Dropdown({ name, MMKVKey, ...props }: DropdownP) {
  const { setValue, watch } = useFormContext<FormContext>();
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <DropDown
      {...props}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      setValue={(value) => {
        setValue(name, value);
        if(MMKVKey){
          storage.set(MMKVKey, value)
        }
      }}
      value={watch(name)}
      mode='outlined'
    />
  );
}
