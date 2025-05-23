import { FormEvent, useEffect, useRef } from 'react';
import { IControllerProps, IData, IGetherDataFn } from './types';

export function useController<T extends object>({
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

      if (el instanceof HTMLInputElement && !keys.has(el.id) && el.type !== 'submit') {
        keys.add(el.id);

        if (el.type === 'checkbox') {
          return [
            { ...unmasked, [el.name]: el.checked },
            { ...masked, [el.name]: el.checked },
          ];
        }

        if (el.type === 'radio') {
          if (!el.checked) return [unmasked, masked];

          return [
            { ...unmasked, [el.name]: el.value },
            { ...masked, [el.name]: el.value },
          ];
        }

        return [
          { ...unmasked, [el.name]: Object(el)?.['rb-value'] },
          { ...masked, [el.name]: el.value },
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

      if (element instanceof RadioNodeList) {
        element.forEach((radio) => {
          if (!(radio instanceof HTMLInputElement) || radio.value !== value?.toString()) return;
          radio.checked = true;
        });
      }

      if (element instanceof HTMLInputElement) {
        if (target.type === 'checkbox') {
          element.checked = !!value;
        }

        element.value = value?.toString() ?? '';
        element.defaultValue = value?.toString() ?? '';
        element.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    Object.entries(initialValues).forEach(handler);
  }, [initialValues]);

  return { ...rest, ref: formRef, onSubmit };
}

export type { IControllerProps };
