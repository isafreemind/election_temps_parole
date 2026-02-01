import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Candidate } from '../../types';

interface DistributionChartProps {
  candidates: Candidate[];
}

export const DistributionChart = ({ candidates }: DistributionChartProps) => {
  const totalTime = candidates.reduce((sum, c) => sum + c.tempsTotalSeconds, 0);
  
  const data = candidates.map(c => ({
    nom: c.nom,
    pourcentage: parseFloat(((c.tempsTotalSeconds / totalTime) * 100).toFixed(2)),
    heures: (c.tempsTotalSeconds / 3600).toFixed(1)
  })).sort((a, b) => b.pourcentage - a.pourcentage);

  const getColor = (percentage: number) => {
    if (percentage >= 20) return '#10b981';  // Vert - forte visibilité
    if (percentage >= 15) return '#3b82f6';  // Bleu - seuil critique
    if (percentage >= 10) return '#f59e0b';  // Orange - visibilité moyenne
    if (percentage >= 5) return '#ef4444';   // Rouge - faible visibilité
    return '#6b7280';                         // Gris - très faible
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const color = getColor(data.pourcentage);
      let niveau = 'Très faible';
      if (data.pourcentage >= 20) niveau = 'Forte visibilité';
      else if (data.pourcentage >= 15) niveau = 'Seuil critique';
      else if (data.pourcentage >= 10) niveau = 'Visibilité moyenne';
      else if (data.pourcentage >= 5) niveau = 'Faible visibilité';
      
      return (
        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '13px'
        }}>
          <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '6px' }}>{data.nom}</p>
          <p style={{ color: '#94a3b8', margin: '3px 0' }}>Part: {data.pourcentage}%</p>
          <p style={{ color: '#94a3b8', margin: '3px 0' }}>Temps: {data.heures}h</p>
          <p style={{ color: color, margin: '3px 0', fontWeight: 'bold' }}>→ {niveau}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis 
          dataKey="nom" 
          angle={-45} 
          textAnchor="end" 
          height={100}
          stroke="#94a3b8"
          style={{ fontSize: '11px' }}
        />
        <YAxis 
          stroke="#94a3b8"
          label={{ value: '% du temps total', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="pourcentage" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.pourcentage)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
