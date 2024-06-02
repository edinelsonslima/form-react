import { ChangeEvent, ComponentProps, ReactNode } from 'react';

type IBaseProps = Omit<ComponentProps<'input'>, 'pattern' | 'onChange'>;

type IControllerProps = IBaseProps & {
  /**
   * Mask to be applied to the input
   * - The mask can be a string with the following characters: `A`, `0`, `#`
   * - `A` - Alphabetic character, accepts only letters
   * - `0` - Numeric character, accepts only numbers
   * - `#` - Alphanumeric character, accepts letters and numbers
   * @example mask="000.000.000-00"
   * - The mask accept multiple masks separated by commas
   * - The masks should be arranged in ascending order of length, from smallest to largest.
   * @example mask="(00) 0000-0000, (00) 0 0000-0000, +00 (00) 0 0000-0000"
   * ----------------------------------------
   * The mask can be an object with the following properties:
   * - - `set` - Function that receives the input value and returns the masked value
   * - - `clear` - Function that receives the input value and returns the unmasked value
   * @example mask={{ set: (value) => value.toUpperCase(), clear: (value) => value.toLowerCase() }}
   */
  mask?:
    | string
    | {
        set: (value: string) => string;
        clear: (value: string) => string;
      };
  /**
   * Pattern to be applied to the input
   * - The pattern can be a function that receives the input value and returns a message if the value is invalid
   * - The pattern can be an object with the following properties:
   * - - `regexp` - Regular expression to be applied to the input value
   * - - `message` - Message to be displayed if the value is invalid
   */
  pattern?:
    | ((value: string) => string | undefined)
    | { regexp: RegExp | string; message: string };

  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
    masked: string,
  ) => void;
};

type IProps = IControllerProps & {
  id: ComponentProps<'input'>['id'];
  name: ComponentProps<'input'>['name'];
  label?: ReactNode;
  labelInfo?: ReactNode;
};

export type { IControllerProps, IProps };
