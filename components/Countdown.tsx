'use client';
import { useEffect, useState } from 'react';

const INTAKE_END = new Date('2026-08-03T23:59:59+01:00').getTime();

export default function Countdown() {
  const [left, setLeft] = useState(Math.max(0, INTAKE_END - Date.now()));
  useEffect(() => {
    const timer = window.setInterval(() => setLeft(Math.max(0, INTAKE_END - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const total = Math.floor(left / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return (
    <div className="countdown" aria-label="Application countdown">
      {[[d,'Days'],[h,'Hours'],[m,'Minutes'],[s,'Seconds']].map(([n,label]) => (
        <div className="timebox" key={String(label)}><strong>{String(n).padStart(2,'0')}</strong><span>{label}</span></div>
      ))}
    </div>
  );
}
