import React from 'react';
import "@studs/react/studs-base.css";

export default function FrameComponent({ theme, children }: { theme: string, children: React.ReactNode}) {
  return <div className={theme}>{children}</div>;
}