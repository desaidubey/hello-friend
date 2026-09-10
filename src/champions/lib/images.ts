import passCommon from "@/champions/assets/common.webp.asset.json";
import passRare from "@/champions/assets/rare.webp.asset.json";
import passEpic from "@/champions/assets/epic.webp.asset.json";
import passLegend from "@/champions/assets/legend.webp.asset.json";

const GH_BASE =
  "https://raw.githubusercontent.com/0xDarkSeidBull/nft/main/files/boardpass";

export const HERO_EPIC_IMAGE = `${GH_BASE}/LITDEXEPIC%20HOME.png`;
export const HERO_LEGEND_IMAGE = `${GH_BASE}/LITDEXLEGENDHOME.png`;

export const COMMON_PFP = `${GH_BASE}/cpfp.png`;
export const RARE_PFP = `${GH_BASE}/rpfp.png`;
export const EPIC_PFP = `${GH_BASE}/epfp.png`;
export const LEGEND_PFP = `${GH_BASE}/lpfp.png`;

export const PASS_CARD_IMAGES = [
  { src: passCommon.url, label: "Common" },
  { src: passRare.url, label: "Rare" },
  { src: passEpic.url, label: "Epic" },
  { src: passLegend.url, label: "Legend" },
];
