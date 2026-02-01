import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ReferenceArea } from 'recharts';
import { Candidate } from '../../types';

interface ThresholdChartProps {
  candidates: Candidate[];
}

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899',
  '#14b8a6', '#f97316', '#6366f1', '#84cc16', '#a855f7', '#06b6d4'
];

export const ThresholdChart = ({ candidates }: ThresholdChartProps) => {
  const totalTime = candidates.reduce((sum, c) => sum + c.tempsTotalSeconds, 0);

  const data = candidates.map((c, idx) => ({
    nom: c.nom,
    pourcentageTemps: parseFloat(((c.tempsTotalSeconds / totalTime) * 100).toFixed(2)),
    pourcentageVoix: parseFloat(c.pourcentageVoix.toFixed(2)),
    heures: (c.tempsTotalSeconds / 3600).toFixed(1),
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
          <p style={{ color: '#94a3b8', margin: '4px 0' }}>
            Temps médiatique: {data.pourcentageTemps}% ({data.heures}h)
          </p>
          <p style={{ color: '#94a3b8', margin: '4px 0' }}>
            Résultat électoral: {data.pourcentageVoix}%
          </p>
          {data.pourcentageTemps >= 30 && (
            <p style={{ color: '#10b981', marginTop: '6px', fontWeight: 'bold' }}>
              ✓ Zone de forte corrélation
            </p>
          )}
          {data.pourcentageTemps >= 15 && data.pourcentageTemps < 30 && (
            <p style={{ color: '#f59e0b', marginTop: '6px', fontWeight: 'bold' }}>
              ⚠ Seuil critique de visibilité
            </p>
          )}
          {data.pourcentageTemps < 15 && (
            <p style={{ color: '#ef4444', marginTop: '6px', fontWeight: 'bold' }}>
              ✗ Sous le seuil de viabilité
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        
        {/* Zone faible visibilité */}
        <ReferenceArea x1={0} x2={15} fill="#ef4444" fillOpacity={0.1} />
        
        {/* Zone seuil critique */}
        <ReferenceArea x1={15} x2={30} fill="#f59e0b" fillOpacity={0.1} />
        
        {/* Zone forte corrélation */}
        <ReferenceArea x1={30} x2={100} fill="#10b981" fillOpacity={0.1} />
        
        <XAxis 
          type="number" 
          dataKey="pourcentageTemps" 
          domain={[0, 'auto']}
          stroke="#94a3b8"
          label={{ 
            value: 'Part du temps médiatique (%)', 
            position: 'insideBottom', 
            offset: -5, 
            fill: '#94a3b8' 
          }}
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          type="number" 
          dataKey="pourcentageVoix" 
          domain={[0, 'auto']}
          stroke="#94a3b8"
          label={{ 
            value: 'Résultat électoral (%)', 
            angle: -90, 
            position: 'insideLeft', 
            fill: '#94a3b8' 
          }}
          style={{ fontSize: '12px' }}
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        {/* Ligne seuil critique 15% */}
        <ReferenceLine 
          x={15} 
          stroke="#f59e0b" 
          strokeDasharray="5 5"
          strokeWidth={2}
          label={{ 
            value: '← 15% Seuil critique', 
            position: 'top',
            fill: '#f59e0b',
            fontSize: 12,
            fontWeight: 'bold'
          }}
        />
        
        {/* Ligne visibilité forte 30% */}
        <ReferenceLine 
          x={30} 
          stroke="#10b981" 
          strokeDasharray="3 3"
          strokeWidth={2}
          label={{ 
            value: '← 30% Visibilité forte', 
            position: 'top',
            fill: '#10b981',
            fontSize: 12,
            fontWeight: 'bold'
          }}
        />
        
        <Scatter data={data} fill="#8b5cf6">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};
