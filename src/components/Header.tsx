import { css, cx, keyframes } from '@emotion/css';
import { FC } from 'react';

import bg from 'src/assets/bg.png';
import figure from 'src/assets/figure.png';
import logoImage from 'src/assets/logo.svg';
import useCurrencies from 'src/hooks/useCurrencies';

import CurrenciesList from './header/CurrenciesList';
import CurrencyForm from './header/CurrencyForm';

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const container = css`
  background-color: #2a0a4a;
  background-image: url(${figure}), url(${bg});
  background-position: bottom center, top right -532px;
  background-repeat: no-repeat;
  background-size: 488px, 976px;
  height: 728px;
  position: relative;

  &::before,
  &::after {
    content: '';
    opacity: 0;
    position: absolute;
    transition: opacity 0.28s ease, visibility 0s 0.28s;
    visibility: hidden;
  }

  &::before {
    background: rgba(0, 0, 0, 0.54);
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

const containerLoading = css`
  &::before,
  &::after {
    opacity: 1;
    transition: opacity 0.28s ease;
    visibility: visible;
  }
`;

const wrap = css`
  height: 100%;
  margin: 0 auto;
  padding: 32px 0;
  width: 1280px;
`;

const logo = css`
  height: 40px;
  margin-bottom: 60px;
  width: 185px;
`;

const innerWrap = css`
  align-items: flex-start;
  display: flex;
  padding: 0 8px;
`;

const Header: FC = () => {
  const {
    currencies,
    isLoading,
    onAdd,
    onRemove,
  } = useCurrencies();

  return (
    <header className={cx('header', container, isLoading && containerLoading)}>
      <div className={cx('header__wrap', wrap)}>
        <img alt="Bitcasino.io" className={cx('header__logo', logo)} src={logoImage} />
        <section className={cx('header__inner-wrap', innerWrap)}>
          <CurrenciesList
            className="header__currencies-list"
            currencies={currencies}
            onRemove={onRemove}
          />
          <CurrencyForm
            className="header__currency-form"
            isLoading={isLoading}
            onAdd={onAdd}
          />
        </section>
      </div>
    </header>
  );
};

export default Header;
