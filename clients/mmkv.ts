import { FieldPathByValue } from 'react-hook-form';
import { MMKV } from 'react-native-mmkv'
import { FormContext } from '../hooks/FormContext';

export const storage = new MMKV()

export const MMKVGetFormString = (key: FieldPathByValue<FormContext, string>) => storage.getString(key)