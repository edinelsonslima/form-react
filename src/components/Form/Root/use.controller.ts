import { FormEvent, useEffect, useRef } from 'react';
import { ICustomInput } from '../Inputs/Base/types';
import { IControllerProps } from './types';

function useController<T extends object>({
  onSubmit: handleSubmit,
  initialValues,
  ...rest
}: IControllerProps<T>) {
  const formRef = useRef<HTMLFormElement>(null);
  const firstRender = useRef(true);

  const handleFormatGroupData = (groups: HTMLFieldSetElement[]) => {
    const initialValues = [{} as T, {} as T];

    const handleInputs = ([unmasked, masked]: T[], input: ICustomInput) => [
      { ...unmasked, [input.name]: input.valueUnmasked },
      { ...masked, [input.name]: input.value },
    ];

    const handleGroups = (
      [unmaskedGroup, maskedGroup]: Record<keyof T, T[keyof T]>[],
      group: HTMLFieldSetElement,
    ) => {
      const inputs = Array.from(group.getElementsByTagName('input')) as ICustomInput[];
      const [values, masked] = inputs.reduce(handleInputs, initialValues);

      return [
        { ...unmaskedGroup, [group.name]: values },
        { ...maskedGroup, [group.name]: masked },
      ];
    };

    return groups.reduce(handleGroups, initialValues);
  };

  const handleFormatData = (target: HTMLFormElement) => {
    const dataMasked = Object.fromEntries(new FormData(target).entries()) as T;

    const data = Object.keys(dataMasked).reduce((acc, inputName) => {
      const input = target.elements.namedItem(inputName) as ICustomInput;
      return { ...acc, [inputName]: input.valueUnmasked };
    }, {} as T);

    return [data, dataMasked];
  };

  // Não retorna inputs fora de grupo se tiver um grupo definido
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const groups = Array.from(target.getElementsByTagName('fieldset'));

    const [unmasked, masked] =
      groups.length > 0 ? handleFormatGroupData(groups) : handleFormatData(target);

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
