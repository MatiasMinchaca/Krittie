export type TokensPayload = {
  symbol: Tokens;
  token_amount: string;
};

export type PayCommandInput = {
  reference: string;
  to: string;
  tokens: TokensPayload[];
  network?: Network;
  description: string;
};
