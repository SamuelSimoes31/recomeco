import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MMKVResetFormString, MMKVSetFormString, STORAGE_KEYS, storage } from '../clients/mmkv';
import { FormContext, defaultFormValue } from './FormContext';
import { useFormContext } from 'react-hook-form';

interface IVidasContext {
  addVida: (vida: FormContext) => void;
  updateVida: (vida: FormContext) => void;
  vidas: FormContext[];
  idVidaAtual: string | undefined;
  newIdVidalAtual: () => void;
  cancelVida: () => void;
}

const VidasContext = createContext<IVidasContext>(null as any);

function getVidasListIds() {
  const rawVidas = storage.getString(STORAGE_KEYS.vidas);
  const listaIds = !!rawVidas ? JSON.parse(rawVidas) as string[] : [];
  return listaIds;
}

function vidasInitialValue() {
  const listaIds = getVidasListIds();

  return listaIds.map(id => {
    const rawVida = storage.getString(id);
    return JSON.parse(rawVida!) as FormContext;
  });
}

function cleanMMKVForm() {
  storage.delete(STORAGE_KEYS.vida_atual);

  MMKVResetFormString('voluntario.culto');
  MMKVResetFormString('vida.nome');
  MMKVResetFormString('vida.bairro');
  MMKVResetFormString('vida.celula');
  MMKVResetFormString('vida.email');
  MMKVResetFormString('vida.estadoCivil');
  MMKVResetFormString('vida.idade');
  MMKVResetFormString('vida.observacoes');
  MMKVResetFormString('vida.redeSocial');
  MMKVResetFormString('vida.rua');
  MMKVResetFormString('vida.sexo');
  MMKVResetFormString('vida.telefone1')
  MMKVResetFormString('vida.telefone2')
  MMKVResetFormString('vida.cidade')

}

export default function VidasContextProvider({ children }: { children: React.ReactNode; }) {
  const { getValues, reset } = useFormContext<FormContext>();
  const [vidas, setVidas] = useState<FormContext[]>(vidasInitialValue());
  const [idVidaAtual, setIdVidaAtual] = useState<string | undefined>(storage.getString(STORAGE_KEYS.vida_atual));

  function addVida(vida: FormContext) {
    if (idVidaAtual) {
      const listaIds = getVidasListIds();
      listaIds.unshift(idVidaAtual);
      setVidas(p => [{ ...vida, id: idVidaAtual }, ...p]);

      storage.set(STORAGE_KEYS.vidas, JSON.stringify(listaIds)); //salvar lista
      storage.set(idVidaAtual, JSON.stringify({ ...vida, id: idVidaAtual })); //salvar dados

      cancelVida()
    }
  }

  function updateVida(vida: FormContext) {
    const currentVidaIndex = vidas.findIndex(v => v.id === vida.id)
    if(currentVidaIndex === -1) return

    const updatedVidas = [
      ...vidas.slice(0, currentVidaIndex),
      vida,
      ...vidas.slice(currentVidaIndex + 1)
    ];

    setVidas(updatedVidas)
    storage.set(vida.id, JSON.stringify(vida)); //salvar dados
  }

  function cancelVida() {
    storage.delete(STORAGE_KEYS.vida_atual);
    setIdVidaAtual(undefined)
    cleanMMKVForm()
    reset({
      vida: defaultFormValue.vida,
      voluntario: getValues('voluntario')
    })
  }

  function newIdVidalAtual() {
    if (!idVidaAtual) {
      const newId = Date.now().toString();
      setIdVidaAtual(newId);
      storage.set(STORAGE_KEYS.vida_atual, newId);

      MMKVSetFormString('voluntario.culto',getValues('voluntario.culto'));
    }
  }

  const value = useMemo(() => ({
    vidas,
    addVida,
    idVidaAtual,
    newIdVidalAtual,
    cancelVida,
    updateVida
  }), [vidas, idVidaAtual]);

  return (
    <VidasContext.Provider value={value}>
      {children}
    </VidasContext.Provider>
  );
}

export function useVidasContext() {
  const context = useContext(VidasContext);
  if (!context) {
    throw new Error('Componente não envolvido num VidasContextProvider');
  }
  return context;
}
