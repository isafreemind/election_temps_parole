import React from 'react';

interface ChartCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const ChartCard = ({ title, icon, children }: ChartCardProps) => {
  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      height: '100%'
    }}>
      <h3 style={{
        color: '#667eea',
        marginBottom: '1rem',
        fontSize: '1.3rem',
        borderBottom: '2px solid #667eea',
        paddingBottom: '0.5rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {icon && <span style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>{icon}</span>}
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );
};
