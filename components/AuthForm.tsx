'use client';
import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setMessage('');
    try {
      const supabase = createClient();
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${location.origin}/auth/callback?next=/dashboard` }
        });
        if (error) throw error;
        setMessage('Account created. Check your email to confirm access.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Best-effort claim for purchases made as a guest with this verified email.
        // The server route independently verifies the authenticated user and email status.
        try {
          await fetch('/api/marketplace/claim', { method: 'POST' });
        } catch {}

        location.href = '/dashboard';
      }
    } catch (err) { setMessage(err instanceof Error ? err.message : 'Authentication failed.'); }
    finally { setLoading(false); }
  }

  return <form className="auth-form" onSubmit={submit}>
    <label>Email address<input autoComplete="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></label>
    <div style={{display:"grid",gap:8}}><label htmlFor="auth-password">Password</label><div style={{position:"relative"}}><input id="auth-password" autoComplete={mode === "signup" ? "new-password" : "current-password"} type={visible ? "text" : "password"} minLength={mode === "signup" ? 8 : undefined} required value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode === "signup" ? "Minimum 8 characters" : "Enter your password"} style={{paddingRight:76}}/><button type="button" aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible} onClick={()=>setVisible(v=>!v)} style={{position:"absolute",right:4,top:4,bottom:4,padding:"0 12px",background:"transparent",border:0,color:"var(--green)",font:"inherit",cursor:"pointer"}}>{visible ? "Hide" : "Show"}</button></div></div>
    {mode === "login" && <a href="/forgot-password">Forgot password?</a>}
    <button className="button primary wide" disabled={loading}>{loading ? 'Processing…' : mode === 'signup' ? 'Create secure account' : 'Sign in'}</button>
    {message && <p className="form-message" role="status">{message}</p>}
  </form>;
}
