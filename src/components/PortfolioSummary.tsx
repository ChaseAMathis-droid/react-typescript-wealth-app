import React, { useMemo } from 'react';
import { ClientPortfolio, computeMetricsForPortfolio } from '../utils/portfolio';

type Props = {
  portfolio?: ClientPortfolio | null;
};

/**
 * PortfolioSummary (single portfolio)
 * - Accepts a single `ClientPortfolio` and memoizes per-portfolio metrics using
 *   `computeMetricsForPortfolio` to avoid expensive recalculation on every render.
 * - Recalculation occurs only when the `portfolio` prop reference changes.
 */
export const PortfolioSummary: React.FC<Props> = ({ portfolio }) => {
  const computed = useMemo(() => {
    return portfolio ? computeMetricsForPortfolio(portfolio) : null;
  }, [portfolio]);

  if (!computed) {
    return <div>No portfolio provided</div>;
  }

  const total = computed.totalMarketValue ?? 0;

  return (
    <div>
      <h3>Portfolio Summary</h3>
      <div>
        <strong>{computed.name ?? computed.id}</strong>
      </div>
      <div>Total: ${Number(total).toFixed(2)}</div>
      <ul>
        {(computed.assets || []).map((a) => (
          <li key={a.id}>
            {a.name ?? a.id} — {a.type} — ${Number(a.marketValue).toFixed(2)} ({(a.allocationPct ?? 0).toFixed(2)}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioSummary;
