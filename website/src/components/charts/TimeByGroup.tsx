import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Candidate } from '../../types';

interface TimeByGroupProps {
  candidates: Candidate[];
}

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899',
  '#14b8a6', '#f97316', '#6366f1', '#84cc16', '#a855f7', '#06b6d4'
];

export const TimeByGroup = ({ candidates }: TimeByGroupProps) => {
  const data = candidates
    .map((c, idx) => ({
      nom: c.nom,
      heures: parseFloat((c.tempsTotalSeconds / 3600).toFixed(2)),
      voixK: (c.voix / 1000).toFixed(0),
      pourcentage: c.pourcentageVoix.toFixed(2),
      color: COLORS[idx % COLORS.length]
    }))
    .sort((a, b) => b.heures - a.heures);

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
          <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '6px' }}>{data.nom}</p>
          <p style={{ color: '#94a3b8', margin: '3px 0' }}>Temps: {data.heures}h</p>
          <p style={{ color: '#94a3b8', margin: '3px 0' }}>Voix: {data.voixK}k ({data.pourcentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart 
        data={data} 
        layout="vertical"
        margin={{ top: 20, right: 10, left: 80, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis 
          type="number"
          stroke="#94a3b8"
          style={{ fontSize: '12px' }}
          label={{ value: 'Heures', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
        />
        <YAxis 
          type="category"
          dataKey="nom"
          stroke="#94a3b8"
          style={{ fontSize: '12px' }}
          width={110}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="heures" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
