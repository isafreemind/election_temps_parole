import { GiNewspaper } from 'react-icons/gi';
import { FaFlask, FaTv, FaFlagCheckered, FaEye, FaGlobe, FaBook } from 'react-icons/fa';

export const ResearchSection = () => {
  const stats = [
    { icon: <GiNewspaper />, value: '50%', label: 'du temps médiatique' },
    { icon: <FaFlask />, value: '6', label: 'études citées' },
    { icon: <FaTv />, value: '100%', label: 'des journaux TV' },
    { icon: <FaFlagCheckered />, value: '2', label: 'présidentielles' }
  ];

  const keyFigures = [
    { icon: <FaEye />, value: '15-20%', label: 'Seuil de viabilité perçue', description: 'de couverture médiatique nécessaire' },
    { icon: <FaBook />, value: '> 30%', label: 'Corrélation forte', description: 'visibilité = succès électoral (r > 0.7)' },
    { icon: <FaGlobe />, value: '< 10%', label: 'Seuil critique', description: 'difficulté à dépasser 5% des voix' },
    { icon: <FaFlask />, value: '+40%', label: 'Impact agenda-setting', description: 'de notoriété avec 20% de visibilité' }
  ];

  const studies = [
    {
      icon: <GiNewspaper />,
      title: "McCombs & Shaw (1972) - Agenda-Setting Theory",
      description: "Étude fondatrice montrant que les médias ne nous disent pas quoi penser, mais à quoi penser. Les candidats bénéficiant de plus de 15% de couverture médiatique voient leur notoriété augmenter significativement.",
      link: "https://scholar.google.com/scholar?q=mccombs+shaw+1972+agenda+setting"
    },
    {
      icon: <FaFlask />,
      title: "Iyengar & Simon (2000) - News Coverage and Electoral Outcomes",
      description: "Démontre un seuil critique de visibilité médiatique autour de 20% pour influencer significativement les intentions de vote.",
      link: "https://scholar.google.com/scholar?q=iyengar+simon+2000+news+coverage+electoral"
    },
    {
      icon: <FaTv />,
      title: "CSA - Observatoire du temps de parole",
      description: "Depuis 2017, le CSA mesure le 'temps d'antenne' (présence directe) et le 'temps de parole' (mentions). Seuil d'équité fixé à environ 15% pour les candidats majeurs.",
      link: "https://www.csa.fr"
    },
    {
      icon: <FaFlagCheckered />,
      title: "Gerstlé (2016) - Communication politique",
      description: "Analyse française montrant qu'en dessous de 10% de visibilité médiatique, un candidat peine à franchir le seuil de 5% des voix.",
      link: "https://scholar.google.com/scholar?q=gerstle+2016+communication+politique"
    },
    {
      icon: <FaEye />,
      title: "Balmas & Sheafer (2013) - Visibility Threshold",
      description: "Identification d'un seuil de visibilité à 15-20% nécessaire pour qu'un candidat soit perçu comme 'viable' par les électeurs.",
      link: "https://scholar.google.com/scholar?q=balmas+sheafer+2013+candidate+viability"
    },
    {
      icon: <FaGlobe />,
      title: "Hopmann et al. (2012) - Media Visibility and Electoral Success",
      description: "Étude européenne montrant une corrélation forte (r > 0.7) entre visibilité médiatique et résultats électoraux au-dessus de 30% de couverture.",
      link: "https://scholar.google.com/scholar?q=hopmann+2012+media+visibility+electoral"
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '3rem',
      marginTop: '3rem',
      borderRadius: '16px'
    }}>
      <h2 style={{ 
        color: '#e2e8f0', 
        fontSize: '2rem', 
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <FaBook size={32} /> Contexte Scientifique
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{
            background: '#0f172a',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{ 
              fontSize: '2.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#667eea'
            }}>
              {stat.icon}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>{stat.value}</div>
            <div style={{ fontSize: '0.95rem', color: '#94a3b8' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <h3 style={{ 
        color: '#e2e8f0', 
        fontSize: '1.5rem', 
        marginTop: '3rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <FaBook size={24} /> Chiffres clés de la recherche
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {keyFigures.map((figure, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{ 
              fontSize: '2.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#667eea'
            }}>
              {figure.icon}
            </div>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#8b5cf6'
            }}>
              {figure.value}
            </div>
            <div style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              color: '#1e293b'
            }}>
              {figure.label}
            </div>
            <div style={{ 
              fontSize: '0.9rem', 
              color: '#64748b'
            }}>
              {figure.description}
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ 
        color: '#e2e8f0', 
        fontSize: '1.5rem', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <GiNewspaper size={24} /> Études académiques
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {studies.map((study, idx) => (
          <a 
            key={idx} 
            href={study.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              gap: '1rem',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ 
              fontSize: '2rem', 
              flexShrink: 0, 
              display: 'flex', 
              alignItems: 'flex-start', 
              paddingTop: '0.25rem',
              color: '#667eea'
            }}>
              {study.icon}
            </div>
            <div>
              <h4 style={{ 
                color: '#667eea', 
                marginBottom: '0.5rem', 
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}>
                {study.title}
              </h4>
              <p style={{ 
                color: '#64748b', 
                fontSize: '0.95rem', 
                lineHeight: '1.5',
                margin: 0
              }}>
                {study.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
