import masks from '@/helpers/masks';
import Input from './Inputs/Proxy';
import Root from './Root';

type ICustomInput = typeof Input & { masks: typeof masks };

const Form = {
  Root: Root,
  Input: Input as ICustomInput,
};

Form.Input.masks = masks;
export default Form;
