import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import marketPrice, { MarketPrice } from 'src/queries/marketPrice';
import currenciesStorage from 'src/utils/currenciesStorage';
import median from '../utils/median';

const sentinel = {};

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<PlainObject<number>>(sentinel);
  const [getMarketPrice, { loading, data }] = useLazyQuery<MarketPrice>(marketPrice);

  useEffect(
    () => {
      const codes = currenciesStorage.getCurrencies();
      if (codes.length > 0) {
        getMarketPrice({
          variables: {
            currencies: codes,
          },
        });
      }
    },
    [],
  );

  useEffect(
    () => {
      if (data != null && data.markets.length > 0) {
        const pricesByCode = data.markets.reduce<PlainObject<number[]>>(
          (acc, { baseSymbol, ticker: { lastPrice } }) => ({
            ...acc,
            [baseSymbol]: (
              acc[baseSymbol] == null
                ? [Number(lastPrice)]
                : [...acc[baseSymbol]!, Number(lastPrice)]
            ),
          }),
          {},
        );

        setCurrencies((prevCurrencies) => ({
          ...prevCurrencies,
          ...Object.entries(pricesByCode).reduce(
            (acc, [code, prices]) => ({ ...acc, [code]: median(prices) }),
            {},
          ),
        }));
      }
    },
    [data],
  );

  useEffect(
    () => {
      if (currencies !== sentinel) {
        currenciesStorage.setCurrencies(Object.keys(currencies));
      }
    },
    [currencies],
  );

  const onAdd = (code: string) => {
    if (!(code in currencies)) {
      getMarketPrice({
        variables: {
          currencies: [code],
        },
      });
    }
  };

  const onRemove = (code: string) => {
    if (code in currencies) {
      setCurrencies((prevCurrencies) => (
        Object
          .entries(prevCurrencies)
          .reduce((acc, [key, value]) => (key === code ? acc : { ...acc, [key]: value }), {})
      ));
    }
  };

  return {
    currencies,
    isLoading: loading,
    onAdd,
    onRemove,
  };
};

export default useCurrencies;
