import { Candidate } from '../types';
import { FaExclamationTriangle, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import { MdWarning, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { BiInfoCircle } from 'react-icons/bi';

interface MediaAnalysisProps {
  data2017: Candidate[];
  data2022: Candidate[];
}

export const MediaAnalysis = ({ data2017, data2022 }: MediaAnalysisProps) => {
  const analyzeYear = (candidates: Candidate[], year: string) => {
    const totalTime = candidates.reduce((sum, c) => sum + c.tempsTotalSeconds, 0);
    const totalVotes = candidates.reduce((sum, c) => sum + c.voix, 0);
    
    const candidatesWithData = candidates.map(c => ({
      ...c,
      mediaPercentage: (c.tempsTotalSeconds / totalTime) * 100,
      votePercentage: (c.voix / totalVotes) * 100,
      mediaVoteRatio: ((c.tempsTotalSeconds / totalTime) * 100) / ((c.voix / totalVotes) * 100)
    })).sort((a, b) => b.mediaPercentage - a.mediaPercentage);

    const aboveThreshold = candidatesWithData.filter(c => c.mediaPercentage >= 15);
    const belowThreshold = candidatesWithData.filter(c => c.mediaPercentage < 15);
    const criticalThreshold = candidatesWithData.filter(c => c.mediaPercentage < 10);
    
    // Candidats handicapés par le manque de couverture médiatique
    const mediaHandicap = candidatesWithData.filter(c => 
      c.mediaPercentage < 15 && c.votePercentage > 5
    );
    
    // Sur/sous représentation médiatique
    const overRepresented = candidatesWithData.filter(c => c.mediaVoteRatio > 1.5);
    const underRepresented = candidatesWithData.filter(c => c.mediaVoteRatio < 0.67);
    
    const top3Time = candidatesWithData.slice(0, 3).reduce((sum, c) => sum + c.mediaPercentage, 0);
    const top3Votes = candidatesWithData.slice(0, 3).reduce((sum, c) => sum + c.votePercentage, 0);
    
    return {
      year,
      candidatesWithData,
      aboveThreshold,
      belowThreshold,
      criticalThreshold,
      mediaHandicap,
      overRepresented,
      underRepresented,
      top3Time,
      top3Votes
    };
  };

  const analysis2017 = analyzeYear(data2017, '2017');
  const analysis2022 = analyzeYear(data2022, '2022');

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* En-tête */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FaChartLine size={32} /> Analyse du système médiatique français
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', opacity: 0.95 }}>
          Évaluation de l'équité de la couverture médiatique au regard du seuil de <strong>15%</strong> 
          identifié par les études académiques comme nécessaire pour qu'un candidat soit perçu comme "viable" 
          par les électeurs.
        </p>
      </div>

      {/* Statistiques comparatives */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#667eea', fontSize: '1.3rem', marginBottom: '1rem' }}>
            📊 Concentration médiatique
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>2017</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {analysis2017.top3Time.toFixed(1)}%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Top 3 (temps)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>2022</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {analysis2022.top3Time.toFixed(1)}%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Top 3 (temps)</div>
            </div>
          </div>
          <div style={{ 
            padding: '1rem', 
            background: analysis2022.top3Time > analysis2017.top3Time ? '#fee2e2' : '#d1fae5',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}>
            {analysis2022.top3Time > analysis2017.top3Time ? (
              <><MdTrendingUp style={{ verticalAlign: 'middle' }} /> <strong>Concentration accrue :</strong> +{(analysis2022.top3Time - analysis2017.top3Time).toFixed(1)} points</>
            ) : (
              <><MdTrendingDown style={{ verticalAlign: 'middle' }} /> <strong>Amélioration :</strong> {(analysis2017.top3Time - analysis2022.top3Time).toFixed(1)} points</>
            )}
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#667eea', fontSize: '1.3rem', marginBottom: '1rem' }}>
            ⚖️ Équité de la couverture
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>2017</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                {analysis2017.aboveThreshold.length}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>viables (≥15%)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>2022</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                {analysis2022.aboveThreshold.length}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>viables (≥15%)</div>
            </div>
          </div>
          <div style={{ 
            padding: '1rem', 
            background: '#fef3c7',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}>
            <strong>Candidats sous le seuil :</strong> {analysis2017.belowThreshold.length} en 2017, {analysis2022.belowThreshold.length} en 2022
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#667eea', fontSize: '1.3rem', marginBottom: '1rem' }}>
            ⚠️ Barrière médiatique
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>2017</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                {analysis2017.mediaHandicap.length}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>handicapés</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>2022</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                {analysis2022.mediaHandicap.length}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>handicapés</div>
            </div>
          </div>
          <div style={{ 
            padding: '1rem', 
            background: '#fee2e2',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}>
            <BiInfoCircle style={{ verticalAlign: 'middle' }} /> Candidats avec &lt;15% de média mais &gt;5% de voix
          </div>
        </div>
      </div>

      {/* Tableau complet de tous les candidats */}
      {[analysis2017, analysis2022].map(analysis => (
        <div key={`table-${analysis.year}`} style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            color: '#667eea',
            fontSize: '1.8rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            📋 Tableau complet {analysis.year} - Tous les candidats
          </h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Vue d'ensemble de tous les candidats avec leur temps médiatique, résultat électoral et analyse 
            au regard du seuil de 15%.
          </p>

          {/* En-tête du tableau */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr',
            gap: '1rem',
            padding: '1rem',
            background: '#f3f4f6',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            color: '#4b5563',
            marginBottom: '0.5rem'
          }}>
            <div>Candidat</div>
            <div style={{ textAlign: 'center' }}>Temps média</div>
            <div style={{ textAlign: 'center' }}>Résultat</div>
            <div style={{ textAlign: 'center' }}>Ratio M/V</div>
            <div style={{ textAlign: 'center' }}>Statut</div>
          </div>

          {/* Lignes du tableau */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {analysis.candidatesWithData.map((c, index) => {
              const isAboveThreshold = c.mediaPercentage >= 15;
              const isCritical = c.mediaPercentage < 10;
              const isHandicapped = c.mediaPercentage < 15 && c.votePercentage > 5;
              const isOverRepresented = c.mediaVoteRatio > 1.5;
              const isUnderRepresented = c.mediaVoteRatio < 0.67;

              let bgColor = '#ffffff';
              let borderColor = 'transparent';
              if (isAboveThreshold) {
                bgColor = '#d1fae5';
              } else if (isCritical) {
                bgColor = '#fee2e2';
              } else {
                bgColor = '#fef3c7';
              }

              if (isHandicapped) {
                borderColor = '#ef4444';
              }

              return (
                <div key={c.nom} style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr',
                  gap: '1rem',
                  padding: '1rem',
                  background: bgColor,
                  borderRadius: '8px',
                  alignItems: 'center',
                  border: `2px solid ${borderColor}`,
                  position: 'relative'
                }}>
                  <div style={{ 
                    fontWeight: 'bold',
                    color: isAboveThreshold ? '#065f46' : isCritical ? '#991b1b' : '#92400e',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      minWidth: '24px',
                      height: '24px',
                      background: '#667eea',
                      color: 'white',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '24px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </span>
                    {c.nom}
                    {isHandicapped && <span style={{ color: '#ef4444' }}>⚠️</span>}
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold',
                      color: isAboveThreshold ? '#059669' : isCritical ? '#dc2626' : '#d97706'
                    }}>
                      {c.mediaPercentage.toFixed(2)}%
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#64748b',
                      marginTop: '0.25rem'
                    }}>
                      {(c.tempsTotalSeconds / 3600).toFixed(1)}h
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#059669' }}>
                      {c.votePercentage.toFixed(2)}%
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#64748b',
                      marginTop: '0.25rem'
                    }}>
                      {(c.voix / 1000000).toFixed(2)}M
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '1rem', 
                      fontWeight: 'bold',
                      color: isOverRepresented ? '#dc2626' : isUnderRepresented ? '#f59e0b' : '#059669'
                    }}>
                      {c.mediaVoteRatio.toFixed(2)}
                    </div>
                    <div style={{ 
                      fontSize: '0.7rem',
                      color: '#64748b',
                      marginTop: '0.25rem'
                    }}>
                      {isOverRepresented ? 'Sur-média' : isUnderRepresented ? 'Sous-média' : 'Équilibré'}
                    </div>
                  </div>

                  <div style={{ 
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {isAboveThreshold ? (
                      <span style={{ color: '#059669' }}>✓ Viable (≥15%)</span>
                    ) : isHandicapped ? (
                      <span style={{ color: '#ef4444' }}>🚫 Handicapé</span>
                    ) : isCritical ? (
                      <span style={{ color: '#dc2626' }}>⚠️ Critique (&lt;10%)</span>
                    ) : (
                      <span style={{ color: '#d97706' }}>⚡ Sous seuil (&lt;15%)</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Légende */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#f9fafb',
            borderRadius: '8px',
            fontSize: '0.9rem',
            lineHeight: '1.8'
          }}>
            <strong style={{ color: '#667eea' }}>Légende :</strong>
            <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div><span style={{ color: '#059669' }}>✓ Viable</span> : ≥15% de temps média (seuil de viabilité)</div>
              <div><span style={{ color: '#ef4444' }}>🚫 Handicapé</span> : &lt;15% média mais &gt;5% de voix</div>
              <div><span style={{ color: '#dc2626' }}>⚠️ Critique</span> : &lt;10% de temps média (seuil critique)</div>
              <div><span style={{ color: '#d97706' }}>⚡ Sous seuil</span> : &lt;15% de temps média</div>
              <div><strong>Ratio M/V</strong> : Temps média % / Résultat %</div>
              <div>Ratio &gt;1.5 = sur-médiatisé | &lt;0.67 = sous-médiatisé</div>
            </div>
          </div>
        </div>
      ))}

      {/* Analyse détaillée par année */}
      {[analysis2017, analysis2022].map(analysis => (
        <div key={analysis.year} style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            color: '#667eea',
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            borderBottom: '3px solid #667eea',
            paddingBottom: '0.75rem'
          }}>
            Analyse {analysis.year}
          </h3>

          {/* Candidats viables */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ 
              color: '#10b981', 
              fontSize: '1.3rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaCheckCircle /> Candidats au-dessus du seuil de viabilité (≥ 15%)
            </h4>
            <p style={{ color: '#64748b', marginBottom: '1rem', lineHeight: '1.6' }}>
              Ces candidats bénéficient d'une couverture médiatique suffisante pour être perçus comme "viables" 
              par les électeurs selon les études académiques.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {analysis.aboveThreshold.map(c => (
                <div key={c.nom} style={{
                  background: '#d1fae5',
                  padding: '1rem',
                  borderRadius: '8px',
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  gap: '1rem',
                  alignItems: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#065f46', fontSize: '1.05rem' }}>{c.nom}</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#059669' }}>
                      {c.mediaPercentage.toFixed(1)}%
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#047857' }}>Temps média</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#059669' }}>
                      {c.votePercentage.toFixed(1)}%
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#047857' }}>Résultat</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 'bold',
                      color: c.mediaVoteRatio > 1.5 ? '#dc2626' : c.mediaVoteRatio < 0.7 ? '#f59e0b' : '#059669'
                    }}>
                      {c.mediaVoteRatio > 1.5 ? '📈 Sur-médiatisé' : c.mediaVoteRatio < 0.7 ? '�� Sous-médiatisé' : '✓ Équilibré'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Candidats sous le seuil */}
          {analysis.belowThreshold.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ 
                color: '#f59e0b', 
                fontSize: '1.3rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <MdWarning /> Candidats sous le seuil de viabilité (&lt; 15%)
              </h4>
              <p style={{ color: '#64748b', marginBottom: '1rem', lineHeight: '1.6' }}>
                Ces candidats n'atteignent pas le seuil critique de 15% de couverture médiatique. 
                Les recherches montrent que leur capacité à influencer le débat public est limitée.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {analysis.belowThreshold.map(c => (
                  <div key={c.nom} style={{
                    background: c.mediaPercentage < 10 ? '#fee2e2' : '#fef3c7',
                    padding: '1rem',
                    borderRadius: '8px',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '1rem',
                    alignItems: 'center',
                    border: c.votePercentage > 5 ? '2px solid #ef4444' : 'none'
                  }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: c.mediaPercentage < 10 ? '#991b1b' : '#92400e',
                      fontSize: '1.05rem'
                    }}>
                      {c.nom}
                      {c.votePercentage > 5 && <span style={{ marginLeft: '0.5rem', color: '#ef4444' }}>⚠️</span>}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold', 
                        color: c.mediaPercentage < 10 ? '#dc2626' : '#d97706'
                      }}>
                        {c.mediaPercentage.toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#78350f' }}>Temps média</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#059669' }}>
                        {c.votePercentage.toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#78350f' }}>Résultat</div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                      {c.votePercentage > 5 ? (
                        <strong style={{ color: '#ef4444' }}>Handicapé par les médias</strong>
                      ) : (
                        'Cohérent'
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidats handicapés */}
          {analysis.mediaHandicap.length > 0 && (
            <div style={{
              background: '#fef2f2',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid #ef4444'
            }}>
              <h4 style={{ 
                color: '#dc2626', 
                fontSize: '1.3rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaExclamationTriangle /> Barrière médiatique : candidats pénalisés
              </h4>
              <p style={{ color: '#991b1b', marginBottom: '1rem', lineHeight: '1.6', fontWeight: 500 }}>
                <strong>{analysis.mediaHandicap.length} candidat(s)</strong> ont obtenu plus de 5% des voix malgré 
                une couverture médiatique inférieure à 15%. Ils ont été <strong>structurellement désavantagés</strong> par 
                le système médiatique, prouvant que leur message avait un écho auprès des électeurs mais manquait de visibilité.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {analysis.mediaHandicap.map(c => (
                  <div key={c.nom} style={{
                    background: 'white',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <strong style={{ color: '#991b1b' }}>{c.nom}</strong>
                    <div style={{ fontSize: '0.95rem', color: '#64748b' }}>
                      <span style={{ color: '#dc2626', fontWeight: 'bold' }}>{c.mediaPercentage.toFixed(1)}%</span> de média 
                      → <span style={{ color: '#059669', fontWeight: 'bold' }}>{c.votePercentage.toFixed(1)}%</span> de voix
                      <span style={{ marginLeft: '0.75rem', color: '#ef4444', fontWeight: 'bold' }}>
                        (×{(c.votePercentage / c.mediaPercentage).toFixed(1)} efficacité)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Section spécifique : Seuil critique < 10% */}
      {[analysis2017, analysis2022].map(analysis => {
        const criticalCandidates = analysis.candidatesWithData.filter(c => c.mediaPercentage < 10);
        
        if (criticalCandidates.length === 0) return null;

        return (
          <div key={`critical-${analysis.year}`} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '3px solid #dc2626'
          }}>
            <h3 style={{
              color: '#dc2626',
              fontSize: '1.8rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <FaExclamationTriangle /> Seuil critique en {analysis.year} : Candidats &lt; 10% de temps média
            </h3>
            <p style={{ color: '#991b1b', marginBottom: '1.5rem', lineHeight: '1.7', fontSize: '1.05rem' }}>
              <strong>{criticalCandidates.length} candidat(s)</strong> ont reçu moins de 10% du temps de parole médiatique. 
              Selon les études académiques, en dessous de ce seuil, l'influence sur les résultats électoraux devient 
              <strong> quasi-nulle</strong>. Ces candidats sont rendus <strong>pratiquement invisibles</strong> par le système 
              médiatique, quelle que soit la pertinence de leurs idées.
            </p>

            {/* Tableau des candidats critiques */}
            <div style={{
              background: '#fee2e2',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{
                color: '#991b1b',
                fontSize: '1.3rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📊 Analyse détaillée des {criticalCandidates.length} candidat(s) en situation critique
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {criticalCandidates.map((c, index) => {
                  const timeHours = (c.tempsTotalSeconds / 3600).toFixed(1);
                  const votesMillions = (c.voix / 1000000).toFixed(3);
                  const avgMediaTime = analysis.candidatesWithData.reduce((sum, cand) => sum + cand.tempsTotalSeconds, 0) / analysis.candidatesWithData.length;
                  const avgMediaTimeHours = (avgMediaTime / 3600).toFixed(1);
                  const percentOfAverage = ((c.tempsTotalSeconds / avgMediaTime) * 100).toFixed(0);

                  return (
                    <div key={c.nom} style={{
                      background: 'white',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      border: '2px solid #ef4444'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.75rem'
                      }}>
                        <div>
                          <div style={{ 
                            fontSize: '1.3rem', 
                            fontWeight: 'bold', 
                            color: '#991b1b',
                            marginBottom: '0.25rem'
                          }}>
                            {index + 1}. {c.nom}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                            Temps total : <strong>{timeHours}h</strong> sur {avgMediaTimeHours}h moyen 
                            ({percentOfAverage}% de la moyenne)
                          </div>
                        </div>
                        <div style={{
                          background: '#fecaca',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          color: '#991b1b'
                        }}>
                          {c.mediaPercentage.toFixed(2)}% média
                        </div>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '1rem',
                        marginTop: '1rem'
                      }}>
                        <div style={{
                          background: '#fef2f2',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem' }}>
                            Résultat électoral
                          </div>
                          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#dc2626' }}>
                            {c.votePercentage.toFixed(2)}%
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                            {votesMillions}M voix
                          </div>
                        </div>

                        <div style={{
                          background: '#fef2f2',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem' }}>
                            Ratio Media/Vote
                          </div>
                          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#dc2626' }}>
                            {c.mediaVoteRatio.toFixed(2)}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                            {c.mediaVoteRatio > 1 ? 'Sur-médiatisé' : 'Sous-médiatisé'}
                          </div>
                        </div>

                        <div style={{
                          background: '#fef2f2',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem' }}>
                            Impact démocratique
                          </div>
                          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#dc2626' }}>
                            ⚠️ CRITIQUE
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                            Invisibilité totale
                          </div>
                        </div>
                      </div>

                      {c.votePercentage > 2 && (
                        <div style={{
                          marginTop: '0.75rem',
                          padding: '0.75rem',
                          background: '#fef3c7',
                          borderRadius: '6px',
                          border: '1px solid #f59e0b'
                        }}>
                          <strong style={{ color: '#92400e' }}>⚡ Observation :</strong>
                          <span style={{ color: '#78350f', marginLeft: '0.5rem' }}>
                            Malgré {c.votePercentage.toFixed(2)}% des voix, ce candidat a été rendu quasi-invisible 
                            avec seulement {c.mediaPercentage.toFixed(2)}% de temps média. 
                            Impact potentiel significativement limité par le manque de visibilité.
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Analyse de l'impact du seuil critique */}
            <div style={{
              background: '#fef2f2',
              borderRadius: '8px',
              padding: '1.5rem',
              border: '2px dashed #dc2626'
            }}>
              <h4 style={{
                color: '#991b1b',
                fontSize: '1.2rem',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🔍 Impact du seuil critique de 10%
              </h4>
              <ul style={{ 
                color: '#991b1b', 
                lineHeight: '1.8',
                marginLeft: '1.5rem',
                fontSize: '1rem'
              }}>
                <li>
                  <strong>Invisibilité structurelle :</strong> Ces candidats représentent collectivement{' '}
                  {criticalCandidates.reduce((sum, c) => sum + c.votePercentage, 0).toFixed(2)}% des votes mais 
                  n'ont reçu que {criticalCandidates.reduce((sum, c) => sum + c.mediaPercentage, 0).toFixed(2)}% 
                  du temps médiatique total.
                </li>
                <li>
                  <strong>Barrière à l'entrée :</strong> Selon les études, en dessous de 10% de couverture, un candidat 
                  ne peut pas développer de dynamique électorale significative, quelle que soit la qualité de son programme.
                </li>
                <li>
                  <strong>Concentration du pouvoir médiatique :</strong> Les médias, en refusant de couvrir ces candidatures, 
                  exercent de facto un rôle de <em>gatekeepers</em> du débat démocratique.
                </li>
                <li>
                  <strong>Distorsion démocratique :</strong> Le temps médiatique ne reflète ni les intentions de vote 
                  potentielles ni l'intérêt réel des citoyens pour ces candidatures alternatives.
                </li>
              </ul>
            </div>
          </div>
        );
      })}

      {/* Conclusions */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: '#667eea',
          fontSize: '1.8rem',
          marginBottom: '1.5rem'
        }}>
          🔍 Conclusions sur le système médiatique français
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            borderRadius: '12px',
            borderLeft: '6px solid #667eea'
          }}>
            <h4 style={{ color: '#667eea', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
              📊 Concentration du pouvoir médiatique
            </h4>
            <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.7' }}>
              Les 3 premiers candidats concentrent <strong>{analysis2017.top3Time.toFixed(1)}%</strong> du temps médiatique 
              en 2017 et <strong>{analysis2022.top3Time.toFixed(1)}%</strong> en 2022, alors qu'ils ne représentent que{' '}
              <strong>{analysis2017.top3Votes.toFixed(1)}%</strong> et <strong>{analysis2022.top3Votes.toFixed(1)}%</strong> des 
              voix respectivement. Cette concentration crée une <strong>oligarchie médiatique</strong> qui privilégie quelques 
              candidats au détriment du pluralisme démocratique.
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: analysis2017.mediaHandicap.length + analysis2022.mediaHandicap.length > 0 ? 
              'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : 
              'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            borderRadius: '12px',
            borderLeft: `6px solid ${analysis2017.mediaHandicap.length + analysis2022.mediaHandicap.length > 0 ? '#ef4444' : '#10b981'}`
          }}>
            <h4 style={{ 
              color: analysis2017.mediaHandicap.length + analysis2022.mediaHandicap.length > 0 ? '#dc2626' : '#047857',
              marginBottom: '0.75rem',
              fontSize: '1.2rem'
            }}>
              ⚠️ Barrière à l'entrée démocratique
            </h4>
            <p style={{ 
              margin: 0, 
              color: analysis2017.mediaHandicap.length + analysis2022.mediaHandicap.length > 0 ? '#991b1b' : '#065f46',
              lineHeight: '1.7',
              fontWeight: 500
            }}>
              {analysis2017.mediaHandicap.length + analysis2022.mediaHandicap.length > 0 ? (
                <>
                  <strong>{analysis2017.mediaHandicap.length + analysis2022.mediaHandicap.length} candidats</strong> au total 
                  ont été <strong>structurellement handicapés</strong> par une couverture médiatique insuffisante malgré un 
                  soutien électoral significatif (&gt;5% des voix). Le système médiatique crée une <strong>barrière artificielle</strong> qui 
                  empêche certaines voix politiques d'accéder au débat public, indépendamment de leur légitimité électorale.
                </>
              ) : (
                <>
                  Aucun candidat n'a été significativement handicapé : tous ceux ayant obtenu plus de 5% des voix 
                  disposaient d'une couverture médiatique adéquate.
                </>
              )}
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '12px',
            borderLeft: '6px solid #f59e0b'
          }}>
            <h4 style={{ color: '#d97706', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
              💡 Impact sur la démocratie
            </h4>
            <p style={{ margin: 0, color: '#78350f', lineHeight: '1.7' }}>
              Le seuil de 15% de temps médiatique constitue un <strong>goulot d'étranglement démocratique</strong>. 
              Les candidats qui n'atteignent pas ce seuil sont systématiquement perçus comme "non viables" par les 
              électeurs, créant une <strong>prophétie auto-réalisatrice</strong> : peu de médias → perçu comme non viable 
              → peu de voix → confirme la non-viabilité. Cette dynamique renforce le bipartisme et limite le renouvellement 
              politique.
            </p>
          </div>

          {(analysis2022.top3Time > analysis2017.top3Time) && (
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              borderRadius: '12px',
              borderLeft: '6px solid #dc2626'
            }}>
              <h4 style={{ color: '#dc2626', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
                📈 Tendance inquiétante
              </h4>
              <p style={{ margin: 0, color: '#991b1b', lineHeight: '1.7', fontWeight: 500 }}>
                La concentration médiatique s'est <strong>aggravée entre 2017 et 2022</strong> (+{(analysis2022.top3Time - analysis2017.top3Time).toFixed(1)} points). 
                Cette évolution suggère une <strong>dégradation du pluralisme médiatique</strong> et un renforcement de la barrière 
                à l'entrée pour les candidats émergents ou alternatifs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
