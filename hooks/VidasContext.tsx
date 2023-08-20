import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS, storage } from '../clients/mmkv';
import { FormContext } from './FormContext';
import { useFormContext } from 'react-hook-form';

interface IVidasContext {
  addVida: (vida: FormContext) => void;
  vidas: FormContext[];
  idVidaAtual: string | undefined;
  newIdVidalAtual: () => void;
}

const VidasContext = createContext<IVidasContext>(null as any)

function getVidasListIds() {
  const rawVidas = storage.getString(STORAGE_KEYS.vidas)
  const listaIds = !!rawVidas ? JSON.parse(rawVidas) as string[] : []
  return listaIds
}

function vidasInitialValue() {
  const listaIds = getVidasListIds()

  return listaIds.map(id => {
    const rawVida = storage.getString(id)
    return JSON.parse(rawVida!) as FormContext
  })
}

export default function VidasContextProvider({children}: {children: React.ReactNode}) {
  const { getValues } = useFormContext<FormContext>()
  const [vidas, setVidas] = useState<FormContext[]>(vidasInitialValue())
  const [idVidaAtual, setIdVidaAtual] = useState<string | undefined>(storage.getString(STORAGE_KEYS.vida_atual))

  console.log('vidas',{idVidaAtual})

  function addVida(vida: FormContext){
    if(idVidaAtual) {
      const listaIds = getVidasListIds()
      listaIds.push(idVidaAtual)
      setVidas(p => [...p,{...vida, id: idVidaAtual}])

      storage.set(STORAGE_KEYS.vidas, JSON.stringify(listaIds)) //salvar lista
      storage.set(idVidaAtual, JSON.stringify({...vida, id: idVidaAtual})) //salvar dados

      storage.delete(STORAGE_KEYS.vida_atual)
      storage.delete(STORAGE_KEYS.culto)
    }
  }

  function newIdVidalAtual(){
    if(!idVidaAtual){
      const newId = Date.now().toString()
      setIdVidaAtual(newId)
      storage.set(STORAGE_KEYS.vida_atual, newId)

      storage.set(STORAGE_KEYS.culto, getValues('voluntario.culto'))
    }
  }

  const value = useMemo(() => ({
    vidas,
    addVida,
    idVidaAtual,
    newIdVidalAtual
  }),[vidas, idVidaAtual])

  return (
    <VidasContext.Provider value={value}>
      {children}
    </VidasContext.Provider>
  )
}

export function useVidasContext() {
  const context = useContext(VidasContext)
  if(!context) {
    throw new Error('Componente não envolvido num VidasContextProvider')
  }
  return context
}
