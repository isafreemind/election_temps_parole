import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Candidate } from '../../types';

interface Top3VsOthersProps {
  candidates: Candidate[];
}

export const Top3VsOthers = ({ candidates }: Top3VsOthersProps) => {
  // Trier par temps de parole (pas par voix)
  const sortedByTime = [...candidates].sort((a, b) => b.tempsTotalSeconds - a.tempsTotalSeconds);
  
  const totalTime = candidates.reduce((sum, c) => sum + c.tempsTotalSeconds, 0);
  const totalVotes = candidates.reduce((sum, c) => sum + c.voix, 0);
  const halfTime = totalTime / 2;
  
  // Trouver les candidats qui représentent ~50% du temps
  let cumulativeTime = 0;
  const topGroup: Candidate[] = [];
  const othersGroup: Candidate[] = [];
  
  sortedByTime.forEach(candidate => {
    if (cumulativeTime < halfTime) {
      topGroup.push(candidate);
      cumulativeTime += candidate.tempsTotalSeconds;
    } else {
      othersGroup.push(candidate);
    }
  });

  const topTime = topGroup.reduce((sum, c) => sum + c.tempsTotalSeconds, 0);
  const othersTime = othersGroup.reduce((sum, c) => sum + c.tempsTotalSeconds, 0);
  const topVotes = topGroup.reduce((sum, c) => sum + c.voix, 0);
  const othersVotes = othersGroup.reduce((sum, c) => sum + c.voix, 0);

  // Calculer le ratio précis (nombre de candidats / total)
  const topRatio = (topGroup.length / candidates.length * 100).toFixed(1);
  const othersRatio = (othersGroup.length / candidates.length * 100).toFixed(1);

  const data = [
    {
      categorie: `Top ${topGroup.length} (${topRatio}%)`,
      heures: parseFloat((topTime / 3600).toFixed(1)),
      voixK: Math.round(topVotes / 1000),
      pourcentageTemps: parseFloat(((topTime / totalTime) * 100).toFixed(1)),
      pourcentageVoix: parseFloat(((topVotes / totalVotes) * 100).toFixed(1)),
      nbCandidats: topGroup.length,
      totalCandidats: candidates.length,
      noms: topGroup.map(c => c.nom).join(', ')
    },
    {
      categorie: `${othersGroup.length} autres (${othersRatio}%)`,
      heures: parseFloat((othersTime / 3600).toFixed(1)),
      voixK: Math.round(othersVotes / 1000),
      pourcentageTemps: parseFloat(((othersTime / totalTime) * 100).toFixed(1)),
      pourcentageVoix: parseFloat(((othersVotes / totalVotes) * 100).toFixed(1)),
      nbCandidats: othersGroup.length,
      totalCandidats: candidates.length,
      noms: othersGroup.map(c => c.nom).join(', ')
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '13px',
          maxWidth: '350px'
        }}>
          <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '8px' }}>
            {data.nbCandidats}/{data.totalCandidats} candidats ({(data.nbCandidats / data.totalCandidats * 100).toFixed(1)}%)
          </p>
          <p style={{ color: '#3b82f6', margin: '4px 0', fontWeight: 'bold' }}>
            Temps: {data.heures}h ({data.pourcentageTemps}%)
          </p>
          <p style={{ color: '#10b981', margin: '4px 0', fontWeight: 'bold' }}>
            Voix: {data.voixK}k ({data.pourcentageVoix}%)
          </p>
          <div style={{ 
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid #334155'
          }}>
            <p style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
              ⚡ Ratio d'efficacité médiatique:
            </p>
            <p style={{ color: '#94a3b8', fontSize: '11px' }}>
              {(data.nbCandidats / data.totalCandidats * 100).toFixed(1)}% des candidats = {data.pourcentageTemps}% du temps = {data.pourcentageVoix}% des voix
            </p>
          </div>
          <p style={{ color: '#94a3b8', margin: '8px 0 2px 0', fontSize: '11px', fontStyle: 'italic' }}>
            {data.noms}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data} margin={{ top: 20, right: 40, left: 10, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis 
          dataKey="categorie" 
          stroke="#94a3b8"
          style={{ fontSize: '13px' }}
        />
        <YAxis 
          yAxisId="left"
          stroke="#3b82f6"
          style={{ fontSize: '12px' }}
          label={{ value: 'Heures', angle: -90, position: 'insideLeft', fill: '#3b82f6' }}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          stroke="#10b981"
          style={{ fontSize: '12px' }}
          label={{ value: 'Milliers de voix', angle: 90, position: 'insideRight', fill: '#10b981' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        <Bar yAxisId="left" dataKey="heures" fill="#3b82f6" name="Temps (heures)" radius={[6, 6, 0, 0]} />
        <Bar yAxisId="right" dataKey="voixK" fill="#10b981" name="Voix (milliers)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
