import { useState } from "react";
import { LevelCard } from "@/champions/components/LevelCard";
import { ManageChampions } from "@/champions/components/ManageChampions";
import { MintCard } from "@/champions/components/MintCard";
import { NftSection } from "@/champions/components/NftSection";
import { PointsSection } from "@/champions/components/PointsSection";
import { Component as Hero } from "@/champions/components/ui/hero";
import { WalletProvider, useWallet } from "@/champions/hooks/useWallet";

function Dashboard() {
  const { address, correctNetwork, switchNetwork } = useWallet();
  const [view, setView] = useState<"home" | "manage">("home");

  const scrollToMint = () =>
    document.getElementById("mint")?.scrollIntoView({ behavior: "smooth", block: "center" });

  if (view === "manage") {
    return (
      <div className="champions-root min-h-screen bg-[#0038FF] px-4 py-10 md:px-8">
        <ManageChampions onBack={() => setView("home")} />
      </div>
    );
  }

  return (
    <div className="champions-root min-h-screen bg-[#0038FF]">
      <Hero onMintClick={scrollToMint} onManage={() => setView("manage")} />

      <section className="relative z-20 -mt-10 rounded-t-[2.5rem] bg-white px-6 py-16 md:rounded-t-[4rem] md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-[1600px]">
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
              <NftSection onManage={() => setView("manage")} />
            </>
          )}
        </div>
      </section>
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
