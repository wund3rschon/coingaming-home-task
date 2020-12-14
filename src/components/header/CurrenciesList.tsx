import { css, cx } from '@emotion/css';
import { FC } from 'react';
import Currency from './currencies-list/Currency';

interface Props extends BaseProps {
  currencies: PlainObject<number>,
  onRemove(code: string): void,
}

const container = css`
  max-width: 38%;
`;

const title = css`
  color: white;
  font-size: 44px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const description = css`
  color: rgba(255, 255, 255, 0.5);
  font-size: 23px;
  font-weight: 300;
  margin-bottom: 30px;
  max-width: 70%;
`;

const list = css`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin-left: -5px;
  max-height: 290px;
  max-width: 70%;
  overflow: hidden auto;
`;

const CurrenciesList: FC<Props> = ({ className, currencies, onRemove }) => {
  return (
    <div className={cx(className, 'currencies-list', container)}>
      <h1 className={cx('currencies-list__title', title)}>
        Now your can track all your cryptos here!
      </h1>
      <p className={cx('currencies-list__description', description)}>
        Just enter the cryptocurrency&nbsp;code on the form to the right.
      </p>
      <ul className={cx('currencies-list__list', list)}>
        {Object.entries(currencies).map(([code, price]) => (
          <Currency
            className="currencies-list__currency"
            code={code}
            key={code}
            price={price}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  );
};

export default CurrenciesList;
