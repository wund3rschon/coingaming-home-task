import { css, cx } from '@emotion/css';
import { FC, memo } from 'react';

import icon from 'src/assets/icon.svg';

interface Props extends BaseProps {
  code: string,
  price: number,
  onRemove(code: string): void,
}

const container = css`
  background: url(${icon}) 0 center no-repeat;
  display: grid;
  grid-template-columns: 1fr 48px;
  grid-template-areas: 'symbol remover'
                       'price remover';
  grid-row-gap: 8px;
  height: 85px;
  padding-left: 100px;
  position: relative;

  &::after {
    background: linear-gradient(to right, rgba(255, 255, 255, 0.25), transparent);
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

const currencyCode = css`
  align-self: flex-end;
  color: white;
  font-size: 20px;
  grid-area: symbol;
`;

const currencyPrice = css`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 400;
  grid-area: price;
`;

const remover = css`
  align-self: center;
  cursor: pointer;
  fill: rgba(255, 255, 255, 0.5);
  grid-area: remover;
  height: 40px;
  padding: 12px;
  width: 40px;
`;

const Currency: FC<Props> = ({ className, code, price, onRemove }) => {
  const handleRemove = () => {
    onRemove(code);
  };

  return (
    <li className={cx(className, 'currency', container)}>
      <div className={cx('currency__code', currencyCode)}>{code}</div>
      <div className={cx('currency__price', currencyPrice)}>{price.toFixed(3)} €</div>
      <svg className={cx('currency__remove', remover)} onClick={handleRemove} viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </li>
  );
};

export default memo(Currency);
