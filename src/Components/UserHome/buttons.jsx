import React from 'react';

const ButtonRow = ({ chosenService, updateService }) => {
  const buttonsStyle = {
    padding: '20px',
    width: '50%',
    border: '1px solid white',
    fontSize: '15px',
    fontWeight: 'bold',
    // backgroundColor: '#B5C0D0',
    // transition: 'background-color 0.3s'
  }
  const chosenServiceStyle = {
    backgroundColor: '#111 !important'
    // backgroundColor: '#D3D3D3'
  }

  console.log('chosenService:', chosenService);

  return (
    <div style={{ backgroundColor: '#F0F0F0', textAlign: 'center', display: 'flex' }}>
      <button
        style={chosenService === 'old' ? { ...buttonsStyle, ...chosenServiceStyle } : buttonsStyle}
        onClick={() => updateService('old')}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#D3D3D3'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#B5C0D0'}
      >
        Old Age Care Services
      </button>

      <div style={{ width: '5px' }}></div>

      <button
        style={chosenService === 'child' ? { ...buttonsStyle, ...chosenServiceStyle } : buttonsStyle}
        onClick={() => updateService('child')}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#D3D3D3'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#B5C0D0'}
      >
        Child Day Care Services
      </button>
    </div>
  );
};

export default ButtonRow;