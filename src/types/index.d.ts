export type ResponseMagicEdenType = {
  signature: string;
  type: "list"|"buyNow"|"bid"|"poolUpdate"|"cancelBid"|"delist";
  source: string;
  tokenMint: string;
  collection: string;
  collectionSymbol: string;
  slot: number;
  blockTime: number;
  buyer?:string;
  buyerReferral: string;
  seller?: string;
  sellerReferral: string;
  price: number;
  priceInfo: {
    solPrice: {
      rawAmount: string;
      address: string;
      decimals: number;
    };
  };
  image: string;
};
