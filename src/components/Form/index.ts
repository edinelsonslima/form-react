import masks from '@/helpers/masks';
import Input from './Inputs/Proxy';
import Root from './Root';

const Form = {
  Root,
  Input: Input as typeof Input & { masks: typeof masks },
};

Form.Input.masks = masks;
export default Form;
