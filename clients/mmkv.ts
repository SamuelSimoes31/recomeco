import { FieldPathByValue } from 'react-hook-form';
import { MMKV } from 'react-native-mmkv'
import { FormContext } from '../hooks/FormContext';
import { initializeMMKVFlipper } from "react-native-mmkv-flipper-plugin";

export const storage = new MMKV()

export const MMKVGetFormString = (key: FieldPathByValue<FormContext, string>) => storage.getString(key)

// add this line inside your App.tsx
if (__DEV__) {
  initializeMMKVFlipper({ default: storage });
}