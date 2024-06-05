import {
  ChangeEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Input, { IProps } from '../Base';

import s from './index.module.css';

const providers = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'msn.com',
  'bol.com.br',
];

const Component = forwardRef<HTMLInputElement, IProps>(({ ...props }, ref) => {
  const [observable, setObservable] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (_: ChangeEvent<HTMLInputElement>, value: string) => {
    const [email, provider] = value.split('@');

    if (!value?.includes('@') || provider) {
      return setObservable('');
    }

    return setObservable(email);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(!!result.length);
  }, [result.length]);

  const handleUpdateValue = useCallback(
    (value: string) => {
      return () => {
        console.log(value);
        handleClose();
      };
    },
    [handleClose],
  );

  useEffect(() => {
    if (!observable) {
      setResult([]);
      return handleClose();
    }

    setResult(providers.map((provider) => `${observable}@${provider}`));
    handleOpen();
  }, [handleClose, handleOpen, observable]);

  useImperativeHandle(ref, () => inputRef.current!, [inputRef]);

  return (
    <div
      className={s['email-container']}
      onBlur={handleClose}
      onFocus={handleOpen}
    >
      <Input {...props} onChange={handleSearch} ref={inputRef} />
      <dialog open={open}>
        {result.map((email) => (
          <option tabIndex={0} key={email} onClick={handleUpdateValue(email)}>
            {email}
          </option>
        ))}
      </dialog>
    </div>
  );
});

const InputEmail = memo(Component);
export default InputEmail;
