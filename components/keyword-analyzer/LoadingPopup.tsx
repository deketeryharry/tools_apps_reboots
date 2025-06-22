interface Props {
  progress: number;
}

const modalBackdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  background: 'white',
  padding: '30px 50px',
  borderRadius: '12px',
  textAlign: 'center',
  color: '#333',
  boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
};

const progressBarStyle: React.CSSProperties = {
  width: '280px',
  height: '10px',
  background: '#e9ecef',
  borderRadius: '5px',
  overflow: 'hidden',
  marginTop: '12px',
};

const progressBarFillStyle = (progress: number): React.CSSProperties => ({
  width: `${progress}%`,
  height: '100%',
  background: 'linear-gradient(90deg, #03c75a, #3182f6)',
  borderRadius: '5px',
  transition: 'width 0.3s ease-in-out',
});

export default function LoadingPopup({ progress }: Props) {
  return (
    <div style={modalBackdropStyle}>
      <div style={modalContentStyle}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 700 }}>조회중...</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>데이터를 수집하고 있습니다. 잠시만 기다려주세요.</p>
        <div style={progressBarStyle}>
          <div style={progressBarFillStyle(progress)}></div>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: '1rem', fontWeight: 'bold', color: '#3182f6' }}>{progress}%</p>
      </div>
    </div>
  );
} 