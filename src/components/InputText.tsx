import { css, cx } from '@emotion/css';
import { FC, FormEvent, useRef, useState } from 'react';

interface Props extends BaseProps {
  disabled: boolean,
  label: string,
  value: string,
  onChange(next: string): unknown,
}

const container = css`
  border: 1px solid #c9cbd0;
  border-radius: 4px;
  height: 42px;
  margin-bottom: 10px;
  position: relative;
  transition: border-color 0.28s ease;
`;

const containerFocused = css`
  border-color: #65656B;
`;

const title = css`
  background-color: white;
  color: #bfc1c8;
  font-size: 8px;
  font-weight: 500;
  left: 8px;
  letter-spacing: 0.2px;
  max-width: calc(100% - 16px);
  overflow: hidden;
  padding: 0 8px;
  position: absolute;
  text-overflow: ellipsis;
  text-transform: uppercase;
  top: -6px;
  transition: color 0.28s ease;
`;

const titleFocused = css`
  color: #505054;
`;

const input = css`
  background: transparent;
  height: 100%;
  padding: 0 16px;
  width: 100%;
`;

const InputText: FC<Props> = ({ className, disabled, label, value, onChange }) => {
  const [isFocused, setFocused] = useState(false);

  const id = useRef(Math.random().toString(32).slice(2));

  const handleChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    onChange(currentTarget.value);
  };

  const containerClassName = cx(className, 'input-text', container, isFocused && containerFocused);
  const labelClassName = cx('input-text__label', title, isFocused && titleFocused);

  return (
    <div className={containerClassName}>
      <label className={labelClassName} htmlFor={id.current}>
        {label}
      </label>
      <input
        className={cx('input-text__input', input)}
        disabled={disabled}
        id={id.current}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        value={value}
      />
    </div>
  );
};

export default InputText;
