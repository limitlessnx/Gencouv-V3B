import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
export default function Login(){return <main className="auth-shell"><Link href="/" className="brand">GENCOUV</Link><section className="auth-card"><span className="eyebrow">Client access</span><h1>Welcome back.</h1><p>Access your product library, onboarding status and support links.</p><AuthForm mode="login"/><p className="auth-switch">New to Gencouv? <Link href="/signup">Create an account</Link></p></section></main>}
