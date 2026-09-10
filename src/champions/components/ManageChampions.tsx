import { useMemo, useState } from "react";
import { LoadingBlock } from "@/champions/components/LoadingImage";
import { NftCard } from "@/champions/components/NftCard";
import { useOwnedNfts } from "@/champions/hooks/useLitdex";
import { useWallet } from "@/champions/hooks/useWallet";
import type { OwnedNft } from "@/champions/lib/litdex";

const RARITY_OPTIONS = [
  { value: "all", label: "All rarities" },
  { value: "0", label: "Common" },
  { value: "1", label: "Rare" },
  { value: "2", label: "Epic" },
  { value: "3", label: "Legend" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All status" },
  { value: "healthy", label: "Healthy" },
  { value: "damaged", label: "Damaged" },
];

const SORT_OPTIONS = [
  { value: "highest", label: "Highest level" },
  { value: "newest", label: "Newest" },
];

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="btn-text rounded-full border-2 border-black bg-white px-4 py-2 text-black outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function ManageChampions({ onBack }: { onBack?: () => void }) {
  const { address, connect, correctNetwork, switchNetwork } = useWallet();
  const { data, isLoading, isFetching, isError, error, refetch } = useOwnedNfts();

  const [rarity, setRarity] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("highest");

  const list = useMemo<OwnedNft[]>(() => {
    let out = [...(data ?? [])];
    if (rarity !== "all") out = out.filter((n) => n.rarity === Number(rarity));
    if (status === "damaged") out = out.filter((n) => n.damaged);
    if (status === "healthy") out = out.filter((n) => !n.damaged);
    out.sort((a, b) => {
      if (sort === "highest") {
        if (a.rarity !== b.rarity) return b.rarity - a.rarity;
        if (a.level !== b.level) return b.level - a.level;
      }
      return a.tokenId > b.tokenId ? -1 : a.tokenId < b.tokenId ? 1 : 0;
    });
    return out;
  }, [data, rarity, status, sort]);

  return (
    <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-white p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="btn-heading heading-ul text-black">Levels</h2>
        {onBack && (
          <button onClick={onBack} className="btn fx-9 btn-pill btn-blue">
            <span className="btn-label">Back</span>
          </button>
        )}
      </div>

      {address && (
        <div className="mt-8 flex flex-wrap gap-3">
          <Select label="Filter by rarity" value={rarity} onChange={setRarity} options={RARITY_OPTIONS} />
          <Select label="Filter by status" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
          <Select label="Sort champions" value={sort} onChange={setSort} options={SORT_OPTIONS} />
        </div>
      )}

      <div className="mt-10 space-y-8">
        {!address ? (
          <div className="rounded-[2rem] border-2 border-dashed border-black/15 bg-[#F4F4F2] p-10 text-center">
            <p className="btn-text text-black">Connect your wallet to manage champions</p>
            <button onClick={() => void connect()} className="btn fx-9 btn-pill btn-lime mt-6">
              <span className="btn-label">Connect wallet</span>
            </button>
          </div>
        ) : !correctNetwork ? (
          <div className="rounded-[2rem] border-2 border-dashed border-black/15 bg-[#F4F4F2] p-10 text-center">
            <p className="btn-text text-black/60">
              You&apos;re on another network — switch to Base Mainnet to see your champions.
            </p>
            <button onClick={() => void switchNetwork()} className="btn fx-9 btn-pill btn-blue mt-6">
              <span className="btn-label">switch to base</span>
            </button>
          </div>
        ) : isLoading ? (
          <LoadingBlock label="Loading your champions…" />
        ) : isError ? (
          <div className="rounded-[2rem] border-2 border-dashed border-red-200 bg-red-50 p-8 text-center">
            <p className="btn-text text-red-700">
              Couldn&apos;t load your champions.{" "}
              {error instanceof Error ? error.message : "Please try refreshing the page."}
            </p>
            <button onClick={() => void refetch()} className="btn fx-9 btn-pill btn-blue mt-4">
              <span className="btn-label">Retry</span>
            </button>
          </div>
        ) : !isFetching && list.length === 0 ? (
          <div className="btn-text rounded-[2rem] border-2 border-dashed border-black/15 bg-[#F4F4F2] p-8 text-center text-black/50">
            {data && data.length > 0
              ? "No champions match these filters."
              : "You don't own any Litdex champions yet."}
          </div>
        ) : list.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((nft) => (
              <NftCard key={nft.tokenId.toString()} nft={nft} />
            ))}
          </div>
        ) : (
          <LoadingBlock label="Refreshing champions…" />
        )}
      </div>
    </div>
  );
}
