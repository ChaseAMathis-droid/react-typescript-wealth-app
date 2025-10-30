// Utility types and functions for ClientPortfolio metrics
// All monetary/financial values are `number` as required.

export type AssetType = 'stock' | 'bond' | 'cash' | 'etf' | 'other';

export interface Asset {
  id: string;
  type: AssetType;
  name?: string;
  ticker?: string;
  quantity: number;
  unitPrice: number;
  marketValue: number;    // quantity * unitPrice (number)
  allocationPct?: number; // percent of portfolio (0-100)
  currency?: string;
  sector?: string;
}

export interface PerformancePoint {
  timestamp: number;          // epoch ms
  portfolioValue: number;     // total portfolio market value at this timestamp
  periodReturnPct?: number;   // return for the period ending at timestamp
  cumulativeReturnPct?: number;
}

export interface ClientPortfolio {
  id: string;
  clientId?: string;
  name?: string;
  asOf: number;                // epoch ms snapshot
  assets: Asset[];
  totalMarketValue?: number;   // sum of asset.marketValue + cashBalance
  cashBalance?: number;
  allocationByType?: Partial<Record<AssetType, number>>;
  performance?: PerformancePoint[];
  notes?: string;
}

/**
 * computePortfolioMetrics
 * Input: array of ClientPortfolio objects
 * Output: new array where each portfolio has `totalMarketValue` set and each
 * asset has `allocationPct` populated.
 *
 * Behavior / contract:
 * - totalMarketValue = sum(asset.marketValue) + (cashBalance || 0)
 * - allocationPct for each asset = (asset.marketValue / totalMarketValue) * 100
 * - If totalMarketValue is 0, all allocationPct values will be set to 0 to avoid NaN/Infinity.
 * - The function is pure and returns new objects (does not mutate inputs).
 *
 * Edge cases handled:
 * - Missing or non-finite numbers (NaN / Infinity) are treated as 0.
 * - Zero total market value results in allocationPct of 0 for all assets.
 */
export function computePortfolioMetrics(
  portfolios: ClientPortfolio[]
): ClientPortfolio[] {
  return portfolios.map((p) => {
    const safeNumber = (v: unknown) => {
      const n = Number(v as any);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    };

    const cash = safeNumber(p.cashBalance);
    const assetsSum = (p.assets || []).reduce((acc, a) => acc + safeNumber(a.marketValue), 0);
    const total = assetsSum + cash;

    const assets = (p.assets || []).map((a) => {
      const mv = safeNumber(a.marketValue);
      const allocationPct = total > 0 ? (mv / total) * 100 : 0;
      return {
        ...a,
        allocationPct,
      } as Asset;
    });

    const allocationByType: Partial<Record<AssetType, number>> = {};
    for (const a of assets) {
      const t = a.type || 'other';
      allocationByType[t] = (allocationByType[t] || 0) + (a.allocationPct || 0);
    }

    return {
      ...p,
      assets,
      totalMarketValue: total,
      allocationByType,
    } as ClientPortfolio;
  });
}

// Small helper: compute metrics for a single portfolio
export function computeMetricsForPortfolio(p: ClientPortfolio): ClientPortfolio {
  return computePortfolioMetrics([p])[0];
}

// Example usage (not executed here):
// const updated = computePortfolioMetrics([{ id: 'p1', asOf: Date.now(), assets: [...] }]);
