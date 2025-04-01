import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithRef,
  CSSProperties,
  ReactNode,
} from 'react';

type ICustomInput = HTMLInputElement & { ['rb-value']: string };

type IValidityError = Omit<Record<keyof ValidityState, string>, 'valid' | 'customError'>;

type IBaseProps = Omit<ComponentPropsWithRef<'input'>, 'pattern' | 'onChange' | 'prefix'>;

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
  mask?: string | { set: (input: string) => string; clear: (input: string) => string };

  /**
   * Pattern to be applied to the input
   * - The pattern can be a function that receives the input value and returns a message if the value is invalid
   * - The pattern can be an object with the following properties:
   * - - `regexp` - Regular expression to be applied to the input value
   * - - `message` - Message to be displayed if the value is invalid
   */
  pattern?:
    | ((input: string) => string | undefined | Promise<string | undefined>)
    | { regexp: RegExp | string; message: string };

  /**
   * Custom onChange event
   * @param event - The event object
   * @param input - The unmasked input value
   * @param inputMasked - The masked input value
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, input: string, inputMasked: string) => void;

  /**
   * Enable the scrollIntoView function when the input is invalid
   * - Receives the ScrollIntoViewOptions or Boolean as an argument
   * @default false
   */
  scrollIntoViewError?: boolean | ScrollIntoViewOptions;

  /**
   * Define the default error messages for the input
   * - Receives a Object with the error messages
   * - Receives a Function that receives the input value and returns the error messages in Object format
   * @param input - The unmasked input value
   * @param inputMasked - The masked input value
   * @returns ValidityState - The error messages in Object format
   */
  defaultErrorMessages?:
    | ((input: string, inputMasked: string) => Partial<IValidityError>)
    | Partial<IValidityError>;
};

type IProps = IControllerProps & {
  id: ComponentProps<'input'>['id'];
  name: ComponentProps<'input'>['name'];
  label?: ReactNode | { message: ReactNode; suffix: ReactNode };
  suffix?: ReactNode;
  prefix?: ReactNode;
  components?: {
    wrapper?: string | CSSProperties | (() => ComponentProps<'div'>);
    label?: string | CSSProperties | (() => ComponentProps<'label'>);
    labelW?: string | CSSProperties | (() => ComponentProps<'div'>);
    inputC?: string | CSSProperties | (() => ComponentProps<'div'>);
    error?: string | CSSProperties | (() => ComponentProps<'small'>);
  };
};

export type { IControllerProps, ICustomInput, IProps };
