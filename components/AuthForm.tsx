'use client';
import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setMessage('');
    try {
      const supabase = createClient();
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/auth/callback` } });
        if (error) throw error;
        setMessage('Account created. Check your email to confirm access.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        location.href = '/dashboard';
      }
    } catch (err) { setMessage(err instanceof Error ? err.message : 'Authentication failed.'); }
    finally { setLoading(false); }
  }

  return <form className="auth-form" onSubmit={submit}>
    <label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></label>
    <label>Password<input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimum 8 characters" /></label>
    <button className="button primary wide" disabled={loading}>{loading ? 'Processing…' : mode === 'signup' ? 'Create secure account' : 'Sign in'}</button>
    {message && <p className="form-message">{message}</p>}
  </form>;
}
