import { FormEvent } from 'react';
import { ICustomInput } from '../Inputs/Base/types';
import { IControllerProps } from './types';

function useController<T extends object>({ onSubmit: handleSubmit, ...rest }: IControllerProps<T>) {
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const groups = Array.from(target.getElementsByTagName('fieldset'));

    const [unmasked, masked] =
      groups.length > 0 ? handleFormatGroupData(groups) : handleFormatData(target);

    return handleSubmit(unmasked, masked, e);
  };

  return { ...rest, onSubmit };
}

export type { IControllerProps };
export default useController;
