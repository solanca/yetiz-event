import axios from 'axios';
import { fetchDigitalAsset, mplTokenMetadata,} from '@metaplex-foundation/mpl-token-metadata';
import { publicKey} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'

export async function getMetadataAccount(mintAddress: string) {
console.log('mintaddress==',mintAddress);
  const umi = createUmi('https://api.mainnet-beta.solana.com').use(mplTokenMetadata()).use(mplCandyMachine());
  const asset = await fetchDigitalAsset(umi,publicKey(mintAddress));
  
  const attributes = (await axios.get(asset.metadata.uri)).data
  
    return attributes.attributes
}

