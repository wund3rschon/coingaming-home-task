import { gql } from '@apollo/client';

interface Market {
  baseSymbol: string,
  ticker: {
    lastPrice: string,
  },
}

export interface MarketPrice {
  markets: Market[],
}

const marketPrice = gql`
  query MarketPrice($currencies: [String!]!) {
    markets(
      filter: {
        baseSymbol: { _in: $currencies }
        quoteSymbol: { _eq: "EUR" }
        marketStatus: { _eq: Active }
      }
    ) {
      baseSymbol
      ticker {
        lastPrice
      }
    }
  }
`;

export default marketPrice;
