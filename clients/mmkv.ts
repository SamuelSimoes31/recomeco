import { FieldPathByValue } from 'react-hook-form';
import { MMKV } from 'react-native-mmkv'
import { FormContext } from '../hooks/FormContext';
import { initializeMMKVFlipper } from "react-native-mmkv-flipper-plugin";

export const storage = new MMKV()

export const MMKVGetFormString = (key: FieldPathByValue<FormContext, string>) => storage.getString(key)
export const MMKVResetFormString = (key: FieldPathByValue<FormContext, string>) => storage.delete(key)
export const MMKVSetFormString = (key: FieldPathByValue<FormContext, string>, value: string) => storage.set(key, value)

// add this line inside your App.tsx
if (__DEV__) {
  initializeMMKVFlipper({ default: storage });
}

export const STORAGE_KEYS = {
  vida_atual: 'vida_atual',
  vidas: 'vidas',
}