import { useEffect, useRef } from 'react';
import { clearMask, setMask } from './logic';

export type Mask = string | { set: (input: string) => string; clear: (input: string) => string };
type HTMLInput = HTMLInputElement & { 'rb-value': string };

export function useMask(mask: Mask = '') {
  const inputRef = useRef<HTMLInput>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const updateUnmasked = (value: string) => {
      inputRef.current!['rb-value'] = value;
    };

    const handleMask = (evt: Event) => {
      const target = evt.currentTarget as HTMLInput;
      let unmasked = target.value;

      if (typeof mask === 'object') {
        unmasked = mask.clear(target.value);
        target.value = mask.set(unmasked);
      }

      if (typeof mask === 'string') {
        unmasked = clearMask(mask, target.value);
        target.value = setMask(mask, unmasked);
      }

      updateUnmasked(unmasked);
      return evt;
    };

    const handleValue = (key: 'value' | 'defaultValue') => {
      const value = inputRef.current![key] ?? '';

      if (typeof mask === 'object') {
        const masked = mask.set(value);
        updateUnmasked(mask.clear(masked));
        return masked;
      }

      if (typeof mask === 'string') {
        const masked = setMask(mask, value);
        updateUnmasked(clearMask(mask, masked));
        return masked;
      }

      updateUnmasked(value);
      return value;
    };

    const controller = new AbortController();

    inputRef.current.addEventListener('input', (evt) => handleMask(evt), {
      signal: controller.signal,
    });

    inputRef.current.addEventListener('change', (evt) => handleMask(evt), {
      signal: controller.signal,
    });

    // Solução não muito elegante para remover máscara antes do submit
    // com risco de apresentar os campos sem máscara em tela caso tenha vários submit's ao mesmo tempo
    // Melhor alternativa, encapsular o input adicionar a ref e pegando o valor sem mascara pela ref ex. inputRef.current!['rb-value']
    inputRef.current.form?.addEventListener(
      'submit',
      () => {
        const originalValue = inputRef.current!.value;
        inputRef.current!.value = inputRef.current!['rb-value'];

        const timeoutId = setTimeout(() => {
          inputRef.current!.value = originalValue;
          clearTimeout(timeoutId);
        }, 0.1);
      },
      { signal: controller.signal },
    );

    inputRef.current.value = handleValue('value');
    inputRef.current.defaultValue = handleValue('defaultValue');

    return () => controller.abort();
  }, [mask]);

  return inputRef;
}
