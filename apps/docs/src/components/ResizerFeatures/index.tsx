import { RESIZER_THUMB_BACKGROUND } from '@site/src/utils/constants';
import React from 'react';

export default function ResizerFeatures({
  children,
  minHeight = '8rem',
  scrollableHorizontal = false,
}): JSX.Element {
  return (
    <div
      className='resizer-feature'
      style={{
        border: '1px solid hsl(240 5.9% 90%)',
        padding: '20px',
        marginBottom: '20px',
        width: '100%',
      }}
    >
      <studs-resizer
        direction="inline"
        position='100'
        max='100'
        divider-width='12'
        style={{ 
          width: '100%', 
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            transform: 'scale(1)',
            padding: '10px',
            minHeight: minHeight,
            ...(scrollableHorizontal ? { overflowX: 'auto'}: undefined),
            width: '100%',
            overflowX: 'auto',
          }}
        >
          {children}
        </div>
        <span
            slot="divider-0"
            style={{
              background: 'white',
              backgroundImage: RESIZER_THUMB_BACKGROUND,
              backgroundPosition: `45% 50%`,
              backgroundRepeat: 'no-repeat',
              width: '0.725rem', // same with the span.handle's resizer
              height: '100%',
              borderInline: `1px solid rgb(228, 228, 231)`,
              zIndex: 1,
              pointerEvents: 'none',
              display: 'block',
            }}
          ></span>
      </studs-resizer>
    </div>
  );
}
