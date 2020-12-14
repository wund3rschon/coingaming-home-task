import { gql } from '@apollo/client';

interface Market {
  baseSymbol: string,
  ticker: {
    lastPrice: string,
  },
}

export interface BinancePrice {
  markets: Market[],
}

const binancePrice = gql`
  query BinancePrice($currencies: [String!]!) {
    markets(
      filter: {
        baseSymbol: { _in: $currencies }
        quoteSymbol: { _eq: "EUR" }
        marketSymbol: { _like: "Binance:%" }
      }
    ) {
      baseSymbol
      ticker {
        lastPrice
      }
    }
  }
`;

export default binancePrice;
