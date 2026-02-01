import { HiChartBar } from 'react-icons/hi';
import { MdHowToVote } from 'react-icons/md';

export const Header = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '3rem 2rem',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '1rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <HiChartBar size={40} /> Analyse Temps de Parole vs Votes
      </h1>
      <p style={{ 
        fontSize: '1.2rem', 
        opacity: 0.95,
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <MdHowToVote size={24} /> Présidentielles 2017 & 2022 - Comparaison médias / résultats électoraux
      </p>
    </header>
  );
};
