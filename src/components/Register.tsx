import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Mail, User, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { FEST } from '../festData';
import { supabase } from '../lib/supabase';

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function Register() {
  const [status, setStatus] = useState<Status>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!supabase) {
      setStatus('error');
      setErrorMsg('Registration is not available right now. Please try again later.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('registrations')
      .insert({ full_name: name.trim(), email: email.trim(), college: college.trim() });

    if (error) {
      setStatus('error');
      if (error.code === '23505') {
        setErrorMsg('This email is already registered for a pass.');
      } else {
        setErrorMsg('Something went wrong while securing your pass. Please try again.');
      }
      return;
    }

    setStatus('done');
  };

  const reset = () => {
    setStatus('idle');
    setName('');
    setEmail('');
    setCollege('');
    setErrorMsg('');
  };

  return (
    <section id="register" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pulse-500/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 backdrop-blur-xl sm:p-12">
          {/* glow border top */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pulse-400/60 to-transparent" />

          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-pulse-400">
              Secure your spot
            </p>
            <h2 className="font-clash text-4xl font-bold tracking-tight sm:text-5xl">
              Claim your <span className="text-gradient-pulse">free pass</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/60">
              One pass unlocks all three days. First {FEST.colleges} colleges get early-access workshop seats.
            </p>
          </div>

          {status === 'done' ? (
            <div className="mt-9 flex flex-col items-center rounded-2xl border border-pulse-400/30 bg-pulse-500/10 p-8 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-pulse-400 text-ink-950">
                <Check className="h-7 w-7" strokeWidth={3} />
              </span>
              <h3 className="mt-4 font-clash text-2xl font-bold">You&apos;re in{name ? `, ${name.split(' ')[0]}` : ''}!</h3>
              <p className="mt-2 max-w-sm text-sm text-white/60">
                A confirmation email with your QR pass and event schedule is on its way. See you at {FEST.dates}.
              </p>
              <button
                onClick={reset}
                className="mt-5 text-sm font-semibold text-pulse-300 underline-offset-4 hover:underline"
              >
                Register another teammate
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-9 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field icon={User} label="Full name">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Arya Sharma"
                    className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                  />
                </Field>
                <Field icon={Mail} label="Email">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arya@college.edu"
                    className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                  />
                </Field>
              </div>
              <Field icon={GraduationCap} label="College / University">
                <input
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="NIST University"
                  className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                />
              </Field>

              {status === 'error' && (
                <div className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pulse-400 to-volt-500 px-8 py-4 text-base font-semibold text-ink-950 transition-transform duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 glow-pulse"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Securing your pass…
                  </>
                ) : (
                  <>
                    Get my free pass
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-white/40">
                No spam. We&apos;ll only mail you fest updates and your QR entry pass.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon, label, children,
}: { icon: typeof User; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
        {label}
      </span>
      <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors duration-200 focus-within:border-pulse-400/50 focus-within:bg-white/[0.07]">
        <Icon className="h-4 w-4 shrink-0 text-white/40" />
        {children}
      </span>
    </label>
  );
}
