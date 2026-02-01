import { MdHowToVote } from 'react-icons/md';
import { IoGitCompare } from 'react-icons/io5';

interface YearSelectorProps {
  selectedYear: '2017' | '2022' | 'compare';
  onYearChange: (year: '2017' | '2022' | 'compare') => void;
}

export const YearSelector = ({ selectedYear, onYearChange }: YearSelectorProps) => {
  const buttonStyle = (year: string) => ({
    padding: '1rem 2rem',
    margin: '0 0.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bold' as const,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: selectedYear === year 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : '#f0f0f0',
    color: selectedYear === year ? 'white' : '#333',
    boxShadow: selectedYear === year 
      ? '0 4px 12px rgba(102, 126, 234, 0.4)'
      : '0 2px 4px rgba(0,0,0,0.1)',
    transform: selectedYear === year ? 'translateY(-2px)' : 'none',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      background: 'white',
      borderRadius: '12px',
      margin: '2rem auto',
      maxWidth: '600px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <button 
        style={buttonStyle('2017')}
        onClick={() => onYearChange('2017')}
      >
        <MdHowToVote style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} size={20} />
        2017
      </button>
      <button 
        style={buttonStyle('2022')}
        onClick={() => onYearChange('2022')}
      >
        <MdHowToVote style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} size={20} />
        2022
      </button>
      <button 
        style={buttonStyle('compare')}
        onClick={() => onYearChange('compare')}
      >
        <IoGitCompare style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} size={20} />
        Comparaison
      </button>
    </div>
  );
};
