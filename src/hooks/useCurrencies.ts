import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import binancePrice, { BinancePrice } from 'src/queries/binancePrice';
import currenciesStorage from 'src/utils/currenciesStorage';

const sentinel = {};

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<PlainObject<number>>(sentinel);
  const [getMarketPrice, { loading, data }] = useLazyQuery<BinancePrice>(binancePrice);

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
        setCurrencies({
          ...currencies,
          ...data.markets.reduce(
            (acc, { baseSymbol, ticker: { lastPrice } }) => ({
              ...acc,
              [baseSymbol]: Number(lastPrice),
            }),
            {},
          ),
        });
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
      setCurrencies(
        Object
          .entries(currencies)
          .reduce(
            (acc, [key, value]) => {
              if (key === code) {
                return acc;
              }
              return { ...acc, [key]: value };
            },
            {},
          ),
      );
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
