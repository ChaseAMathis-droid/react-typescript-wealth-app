import { describe, it, expect } from 'vitest';
import { computePortfolioMetrics, ClientPortfolio } from './portfolio';

describe('computePortfolioMetrics', () => {
  it('calculates totalMarketValue correctly and sets allocationPct for each asset', () => {
    const portfolio: ClientPortfolio = {
      id: 'p1',
      asOf: Date.now(),
      assets: [
        { id: 'a1', type: 'stock', quantity: 10, unitPrice: 100, marketValue: 1000 },
        { id: 'a2', type: 'bond', quantity: 5, unitPrice: 200, marketValue: 1000 }
      ],
      cashBalance: 500
    };

    const [result] = computePortfolioMetrics([portfolio]);

    // total should be asset sum (1000 + 1000) + cash 500 = 2500
    expect(result.totalMarketValue).toBe(2500);

    // allocations should be 40% (1000/2500) for each asset
    expect(result.assets[0].allocationPct).toBeCloseTo((1000 / 2500) * 100);
    expect(result.assets[1].allocationPct).toBeCloseTo((1000 / 2500) * 100);
  });

  it('handles zero total market value by setting allocationPct to 0', () => {
    const portfolio: ClientPortfolio = {
      id: 'p2',
      asOf: Date.now(),
      assets: [
        { id: 'a1', type: 'cash', quantity: 0, unitPrice: 0, marketValue: 0 }
      ],
      cashBalance: 0
    };

    const [result] = computePortfolioMetrics([portfolio]);
    expect(result.totalMarketValue).toBe(0);
    expect(result.assets[0].allocationPct).toBe(0);
  });
});
