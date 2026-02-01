import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { Candidate } from '../../types';

interface BubbleChartProps {
  candidates: Candidate[];
}

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899',
  '#14b8a6', '#f97316', '#6366f1', '#84cc16', '#a855f7', '#06b6d4'
];

export const BubbleChart = ({ candidates }: BubbleChartProps) => {
  const data = candidates.map((c, idx) => ({
    nom: c.nom,
    heures: parseFloat((c.tempsTotalSeconds / 3600).toFixed(2)),
    voixK: parseFloat((c.voix / 1000).toFixed(0)),
    pourcentage: c.pourcentageVoix,
    color: COLORS[idx % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '13px'
        }}>
          <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '8px' }}>{data.nom}</p>
          <p style={{ color: '#94a3b8', margin: '4px 0' }}>Temps: {data.heures}h</p>
          <p style={{ color: '#94a3b8', margin: '4px 0' }}>Voix: {data.voixK}k</p>
          <p style={{ color: '#94a3b8', margin: '4px 0' }}>Score: {data.pourcentage.toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={450}>
      <ScatterChart margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis 
          type="number" 
          dataKey="heures" 
          name="Temps"
          stroke="#94a3b8"
          label={{ value: 'Temps de parole (heures)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          type="number" 
          dataKey="voixK" 
          name="Voix"
          stroke="#94a3b8"
          label={{ value: 'Voix (milliers)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
          style={{ fontSize: '12px' }}
        />
        <ZAxis type="number" dataKey="pourcentage" range={[200, 1200]} />
        <Tooltip content={<CustomTooltip />} />
        <Scatter data={data}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};
