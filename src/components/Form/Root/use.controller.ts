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

    const target = e.currentTarget;
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
        keys.add(input.name);
        return [
          { ...unmasked, [input.name]: input.valueUnmasked },
          { ...masked, [input.name]: input.value },
        ];
      }

      return [unmasked, masked];
    };

    const gatherData: IGetherDataFn<T> = (parent) =>
      Array.from(parent.elements).reduce(reduce, initialReduce);

    const [unmasked, masked] = gatherData(target);
    return handleSubmit(unmasked, masked, e);
  };

  useEffect(() => {
    const target = formRef.current;
    if (!initialValues || !target || !firstRender.current) return;
    firstRender.current = false;

    const children = Array.from(target.elements) as ICustomInput[] | HTMLFieldSetElement[];

    Object.entries(initialValues).forEach(([name, values]) => {
      const child = children.find((el) => el.name === name);

      if (child instanceof HTMLFieldSetElement) {
        const group = child as HTMLFieldSetElement;
        const inputs = Array.from(group.getElementsByTagName('input')) as ICustomInput[];

        inputs.forEach((input) => {
          const inputValue = Object(values)[input.name] as string | undefined;
          if (!inputValue) return;

          input.value = inputValue;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        });
      }

      if (child instanceof HTMLInputElement) {
        const input = child as ICustomInput;
        input.value = values as string;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }, [initialValues]);

  return { ...rest, ref: formRef, onSubmit };
}

export type { IControllerProps };
export default useController;
