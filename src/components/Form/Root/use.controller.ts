import { FormEvent, useEffect, useRef } from 'react';
import { ICustomInput } from '../Inputs/Base/types';
import { IControllerProps, IData, IGetherDataFn } from './types';

function useController<T extends object>({
  onSubmit: handleSubmit,
  initialValues,
  ...rest
}: IControllerProps<T>) {
  const formRef = useRef<HTMLFormElement>(null);
  const firstRender = useRef(true);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const keys = new Set();
    const initialReduce = [{}, {}] as IData<T>[];

    const reduce = ([unmasked, masked]: IData<T>[], el: Element) => {
      if (!Object(el)?.name) return [unmasked, masked];

      if (el instanceof HTMLFieldSetElement && !keys.has(el.name)) {
        keys.add(el.name);
        const [valueUnmasked, valueMasked] = gatherData(el);
        return [
          { ...unmasked, [el.name]: valueUnmasked },
          { ...masked, [el.name]: valueMasked },
        ];
      }

      if (el instanceof HTMLInputElement && !keys.has(el.name) && el.type !== 'submit') {
        const input = el as ICustomInput;
        const isCheckbox = ['checkbox', 'radio'].includes(input.type);
        keys.add(input.name);

        return [
          { ...unmasked, [input.name]: isCheckbox ? input.checked : input.valueUnmasked },
          { ...masked, [input.name]: isCheckbox ? input.checked : input.value },
        ];
      }

      return [unmasked, masked];
    };

    const gatherData: IGetherDataFn<T> = (parent) =>
      Array.from(parent.elements).reduce(reduce, initialReduce);

    const [unmasked, masked] = gatherData(e.currentTarget);
    return handleSubmit(unmasked, masked, e);
  };

  useEffect(() => {
    const target = formRef.current;
    if (!initialValues || !target || !firstRender.current) return;
    firstRender.current = false;

    const handler = ([name, value]: [string, unknown]) => {
      const element = target.elements.namedItem(name);

      if (typeof value === 'object' && element instanceof HTMLFieldSetElement) {
        Object.entries(Object(value)).forEach(handler);
      }

      if (element instanceof HTMLInputElement) {
        const isCheckbox = ['checkbox', 'radio'].includes(element.type);
        isCheckbox ? (element.checked = !!value) : (element.value = value?.toString() ?? '');
        element.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    Object.entries(initialValues).forEach(handler);
  }, [initialValues]);

  return { ...rest, ref: formRef, onSubmit };
}

export type { IControllerProps };
export default useController;
