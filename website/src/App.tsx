import { useState } from 'react';
import { Header } from './components/Header';
import { YearSelector } from './components/YearSelector';
import { ChartCard } from './components/ChartCard';
import { TimeByGroup } from './components/charts/TimeByGroup';
import { RatioChart } from './components/charts/RatioChart';
import { BubbleChart } from './components/charts/BubbleChart';
import { Top3VsOthers } from './components/charts/Top3VsOthers';
import { DistributionChart } from './components/charts/DistributionChart';
import { ThresholdChart } from './components/charts/ThresholdChart';
import { EvolutionChart } from './components/charts/EvolutionChart';
import { ResearchSection } from './components/ResearchSection';
import { electionData } from './data';
import { BiTimeFive } from 'react-icons/bi';
import { FaBalanceScale, FaTrophy } from 'react-icons/fa';
import { MdBubbleChart } from 'react-icons/md';
import { HiChartBar } from 'react-icons/hi';
import { GiTargetDummy } from 'react-icons/gi';
import { IoGitCompare } from 'react-icons/io5';

type ViewMode = '2017' | '2022' | 'compare';

export const App = () => {
  const [selectedYear, setSelectedYear] = useState<ViewMode>('2022');

  const data2017 = { annee: 2017, candidats: electionData['2017'] };
  const data2022 = { annee: 2022, candidats: electionData['2022'] };
  const currentData = selectedYear === '2017' ? electionData['2017'] : electionData['2022'];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      paddingBottom: '48px'
    }}>
      <Header />
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '24px'
      }}>
        <YearSelector 
          selectedYear={selectedYear} 
          onYearChange={setSelectedYear}
        />

        {selectedYear === 'compare' ? (
          <div style={{ marginTop: '32px' }}>
            <ChartCard title="Évolution 2017 vs 2022" icon={<IoGitCompare />}>
              <EvolutionChart data2017={data2017} data2022={data2022} />
            </ChartCard>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
              gap: '24px',
              marginTop: '24px'
            }}>
              <ChartCard title="Effet de seuil 2017" icon={<GiTargetDummy />}>
                <ThresholdChart candidates={electionData['2017']} />
              </ChartCard>
              <ChartCard title="Effet de seuil 2022" icon={<GiTargetDummy />}>
                <ThresholdChart candidates={electionData['2022']} />
              </ChartCard>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '32px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
              gap: '24px'
            }}>
              <ChartCard title="Temps de parole (heures)" icon={<BiTimeFive />}>
                <TimeByGroup candidates={currentData} />
              </ChartCard>
              
              <ChartCard title="Ratio : secondes de parole par voix obtenue" icon={<FaBalanceScale />}>
                <RatioChart candidates={currentData} />
              </ChartCard>
            </div>

            <ChartCard title="Temps de parole vs Voix (taille = % de voix)" icon={<MdBubbleChart />}>
              <BubbleChart candidates={currentData} />
            </ChartCard>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
              gap: '24px',
              marginTop: '24px'
            }}>
              <ChartCard title="Concentration : candidats monopolisant 50% du temps médiatique" icon={<FaTrophy />}>
                <Top3VsOthers candidates={currentData} />
              </ChartCard>
              
              <ChartCard title="Distribution du temps médiatique (avec seuils)" icon={<HiChartBar />}>
                <DistributionChart candidates={currentData} />
              </ChartCard>
            </div>

            <ChartCard title="Effet de seuil : corrélation temps/voix selon l'exposition" icon={<GiTargetDummy />}>
              <ThresholdChart candidates={currentData} />
            </ChartCard>
          </div>
        )}

        <ResearchSection />
      </div>
    </div>
  );
};

