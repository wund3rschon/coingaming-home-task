import { css, cx, keyframes } from '@emotion/css';
import { FC, FormEvent, useState } from 'react';
import InputText from '../InputText';

interface Props extends BaseProps {
  isLoading: boolean,
  onAdd(code: string): unknown,
}

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const container = css`
  background: white;
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  margin-left: auto;
  margin-top: -10px;
  padding: 40px 50px 32px;
  position: relative;
  width: 380px;

  &::before,
  &::after {
    content: '';
    opacity: 0;
    position: absolute;
    transition: opacity 0.28s ease, visibility 0s 0.28s;
    visibility: hidden;
  }

  &::before {
    background: rgba(255, 255, 255, 0.87);
    border-radius: 4px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }

  &::after {
    animation: ${rotate} 0.75s linear infinite;
    border: 2px solid #fd4b24;
    border-left-color: transparent;
    border-radius: 50%;
    height: 24px;
    left: calc(50% - 12px);
    top: calc(50% - 12px);
    width: 24px;
    z-index: 2;
  }
`;

const submit = css`
  background: #fd4b24;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  height: 40px;
  margin-bottom: 32px;
  transition: background-color 0.28s ease;
  width: 100%;

  &:hover {
    background: #e73f1a;
  }
`;

const disclaimer = css`
  color: #999;
  font-size: 14px;
  padding: 0 10px;
  text-align: center;
`;

const CurrencyForm: FC<Props> = ({ className, isLoading, onAdd }) => {
  const [code, setCode] = useState('');

  const handleChange = (next: string) => {
    setCode(next);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code !== '') {
      onAdd(code);
      setCode('');
    }
  };

  const containerClassName = cx(className, 'currency-form', container);
  const submitClassName = cx('currency-form__submit', submit);

  return (
    <form className={containerClassName} onSubmit={handleSubmit}>
      <InputText
        disabled={isLoading}
        label="Cryptocurrency code"
        onChange={handleChange}
        value={code}
      />
      <button className={submitClassName} disabled={isLoading} type="submit">
        Add
      </button>
      <p className={cx('currency-form__disclaimer', disclaimer)}>
        Use of this service is subject to terms and conditions
      </p>
    </form>
  );
};

export default CurrencyForm;
