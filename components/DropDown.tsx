import { Controller, ControllerProps, FieldPathByValue, useFormContext } from 'react-hook-form';
import DropDown, { DropDownPropsInterface } from 'react-native-paper-dropdown';
import { FormContext } from '../hooks/FormContext';
import { useState } from 'react';
import { storage } from '../clients/mmkv';
import { View, ViewProps } from 'react-native';
import { HelperText } from 'react-native-paper';
import { getDeepVal } from '../utils/form';

type DropdownP =
  Omit<ControllerProps<FormContext>, 'render' | 'name'> &
  Omit<DropDownPropsInterface, 'visible' | 'showDropDown' | 'onDismiss' | 'setValue' | 'value'> & {
    containerStyle?: ViewProps['style'];
    name: FieldPathByValue<FormContext, string>;
    MMKVKey?: FieldPathByValue<FormContext, string> | string;
  };

export default function Dropdown({ containerStyle, name, rules, defaultValue, shouldUnregister, MMKVKey, ...props }: DropdownP) {
  const { control, formState } = useFormContext<FormContext>();
  const [showDropDown, setShowDropDown] = useState(false);
  const error = getDeepVal(formState.errors, name);
  return (
    <View style={containerStyle}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        render={({ field: { onChange, onBlur, value } }) => (
          <DropDown
            {...props}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => {
              onBlur()
              setShowDropDown(false)
            }}
            setValue={(value) => {
              onChange(value);
              if (MMKVKey) {
                storage.set(MMKVKey, value);
              }
            }}
            value={value}
            mode='outlined'
          />
        )}
      />
      <HelperText visible={!!error} type='error'>{error?.message}</HelperText>
    </View>

  );
}
