import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
export default function Signup(){return <main className="auth-shell"><Link href="/" className="brand">GENCOUV</Link><section className="auth-card"><span className="eyebrow">Premium access</span><h1>Create your account.</h1><p>Your account gives you a secure home for licenses, downloads and onboarding updates. Copy-trading approval still happens through our Telegram evaluation.</p><AuthForm mode="signup"/><p className="auth-switch">Already registered? <Link href="/login">Sign in</Link></p></section></main>}
