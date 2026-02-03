import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface YearData {
  annee: number;
  candidats: Array<{
    nom: string;
    tempsTotalSeconds: number;
    voix: number;
    pourcentageVoix: number;
  }>;
}

interface EvolutionChartProps {
  data2017: YearData;
  data2022: YearData;
}

export const EvolutionChart = ({ data2017, data2022 }: EvolutionChartProps) => {
  const getStats = (data: YearData) => {
    const totalTime = data.candidats.reduce((sum, c) => sum + c.tempsTotalSeconds, 0);
    const sorted = [...data.candidats].sort((a, b) => b.voix - a.voix);
    const top3 = sorted.slice(0, 3);
    const top3Time = top3.reduce((sum, c) => sum + c.tempsTotalSeconds, 0);
    
    return {
      annee: data.annee,
      'Temps total': parseFloat((totalTime / 3600).toFixed(0)),
      'Temps moyen': parseFloat((totalTime / data.candidats.length / 3600).toFixed(1)),
      'Temps Top 3': parseFloat((top3Time / 3600).toFixed(0)),
      '% Top 3': parseFloat(((top3Time / totalTime) * 100).toFixed(1)),
      nbCandidats: data.candidats.length
    };
  };

  const stats2017 = getStats(data2017);
  const stats2022 = getStats(data2022);

  const data = [
    {
      annee: '2017',
      'Temps total': stats2017['Temps total'],
      'Temps moyen': stats2017['Temps moyen'],
      'Temps Top 3': stats2017['Temps Top 3'],
      '% Top 3': stats2017['% Top 3'],
      nbCandidats: stats2017.nbCandidats
    },
    {
      annee: '2022',
      'Temps total': stats2022['Temps total'],
      'Temps moyen': stats2022['Temps moyen'],
      'Temps Top 3': stats2022['Temps Top 3'],
      '% Top 3': stats2022['% Top 3'],
      nbCandidats: stats2022.nbCandidats
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const yearData = payload[0].payload;
      return (
        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '14px',
          fontSize: '13px'
        }}>
          <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '8px' }}>
            {label} ({yearData.nbCandidats} candidats)
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color, margin: '4px 0' }}>
              {entry.name}: {entry.value}{entry.name.includes('%') ? '%' : 'h'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 40, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis 
          dataKey="annee" 
          stroke="#94a3b8"
          style={{ fontSize: '14px', fontWeight: 'bold' }}
        />
        <YAxis 
          stroke="#94a3b8"
          label={{ value: 'Heures / Pourcentage', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        <Bar dataKey="Temps total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        <Bar dataKey="Temps moyen" fill="#ec4899" radius={[6, 6, 0, 0]} />
        <Bar dataKey="Temps Top 3" fill="#10b981" radius={[6, 6, 0, 0]} />
        <Bar dataKey="% Top 3" fill="#f59e0b" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
