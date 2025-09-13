'use client';

import { css } from '../../styled-system/css';
import { useState } from 'react';

export default function Home() {
  const [checked, setChecked] = useState(false);
  
  console.log('Current checked state:', checked);

  return (
    <div className={css({
      padding: 'xl',
      backgroundColor: 'gray.50',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })}>
      <label className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'md',
        fontSize: 'lg',
        color: 'gray.900',
        cursor: 'pointer'
      })}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className={css({
            appearance: 'none',
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: 'sm',
            border: '2px solid',
            borderColor: checked ? 'primary.500' : 'gray.300',
            backgroundColor: checked ? 'primary.500' : 'white',
            cursor: 'pointer',
            transition: 'all 0.2s',
            position: 'relative',
            _hover: {
              borderColor: 'primary.500',
            },
            _after: checked ? {
              content: '"✓"',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: 'sm',
              fontWeight: 'bold'
            } : {}
          })}
        />
        Enable notifications
      </label>
    </div>
  );
}
