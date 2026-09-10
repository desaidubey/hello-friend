# Restore the original LitDEX NFT page

## What will change
- Replace the Champions experience under **NFTs** with the original LitDEX Genesis migration page.
- Restore the original snapshot status, migration message, and LitShard/LitCore/LitGod tier cards exactly from the project history.
- Keep the rest of LitDEX unchanged.

## Verification
- Open `/nfts` on mobile and desktop widths to confirm the original page is visible inside LitDEX.
- Confirm the project builds without errors.

## Technical details
- Restore the prior `NFTsPage` implementation from project history and remove its now-unused Champions import.
