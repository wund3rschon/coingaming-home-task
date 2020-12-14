const key = 'currencies';

const getCurrencies = (): string[] => {
  try {
    const currencies = localStorage.getItem(key) ?? '[]';
    return JSON.parse(currencies);
  } catch {
    return [];
  }
};

const setCurrencies = (currencies: string[]): void => {
  localStorage.setItem(key, JSON.stringify(currencies));
};

const currenciesStorage = {
  getCurrencies,
  setCurrencies,
};

export default currenciesStorage;
