import { useEffect, useState } from 'react'
import Conf from 'conf'

type ReturnType<T> = [
  T,
  (newValue: T) => Promise<void>,
  boolean,
]
const store = new Conf()
// store.clear()

export function useStorageState<T>(key: string, initialValue: T): ReturnType<T> {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoading, setLoading] = useState<boolean>(true)

  async function getValue() {
    try {
      const value = await store.get(key)
      if (value) {
        setStoredValue(value as T)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  async function setValue(newValue: T) {
    try {
      store.set(key, newValue)
      setStoredValue(newValue)
    } catch (e) {
      // saving error
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getValue() }, [])

  return [storedValue, setValue, isLoading]
}

export default useStorageState
