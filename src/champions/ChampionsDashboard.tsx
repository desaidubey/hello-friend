import { useState } from "react";
import { LevelCard } from "@/champions/components/LevelCard";
import { ManageChampions } from "@/champions/components/ManageChampions";
import { MintCard } from "@/champions/components/MintCard";
import { NftSection } from "@/champions/components/NftSection";
import { PointsSection } from "@/champions/components/PointsSection";
import { WalletProvider, useWallet } from "@/champions/hooks/useWallet";

function Dashboard() {
  const { address, correctNetwork, switchNetwork } = useWallet();
  const [view, setView] = useState<"home" | "manage">("home");

  if (view === "manage") {
    return (
      <div className="champions-root px-4 py-10 md:px-8">
        <ManageChampions onBack={() => setView("home")} />
      </div>
    );
  }

  return (
    <div className="champions-root px-4 py-10 md:px-8">
      <div className="mx-auto w-full max-w-[1600px] rounded-[2.5rem] bg-white p-5 md:p-10">
        {!address ? (
          <MintCard />
        ) : (
          <>
            {!correctNetwork && (
              <button
                onClick={() => void switchNetwork()}
                className="btn fx-9 btn-pill btn-blue mb-8 w-full"
              >
                <span className="btn-label">switch to base</span>
              </button>
            )}
            <MintCard />
            <div id="points" className="mt-6 grid scroll-mt-24 gap-6 md:grid-cols-2">
              <PointsSection />
              <LevelCard />
            </div>
            <div className="mt-6">
              <NftSection onManage={() => setView("manage")} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ChampionsDashboard() {
  return (
    <WalletProvider>
      <Dashboard />
    </WalletProvider>
  );
}
