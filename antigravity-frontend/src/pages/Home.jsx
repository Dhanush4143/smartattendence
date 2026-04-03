import React from 'react';
import { ArrowRight, Sparkles, Atom, Zap, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Atom className="text-primary w-6 h-6" />,
    title: 'Quantum Research',
    desc: 'Explore zero-point energy, Casimir forces, and vacuum field manipulation at the subatomic level.',
    color: 'bg-primary/10 border-primary/20',
  },
  {
    icon: <Zap className="text-accent w-6 h-6" />,
    title: 'Expert Faculty',
    desc: 'Learn from professors at the cutting edge of theoretical physics and propulsion engineering.',
    color: 'bg-accent/10 border-accent/20',
  },
  {
    icon: <Globe2 className="text-secondary w-6 h-6" />,
    title: 'Global Impact',
    desc: 'Our research is shared with the global scientific community to accelerate progress.',
    color: 'bg-secondary/10 border-secondary/20',
  },
];

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center gap-10 py-12 relative animate-fade-in">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-white/10 text-sm font-medium text-accent">
        <Sparkles size={15} className="animate-pulse" />
        University Anti-Gravity Research Initiative · 2026
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight">
        Engineering <span className="gradient-text">Anti-Gravity</span>{' '}
        For A Better Tomorrow
      </h1>

      <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
        Join our university's premier research initiative. We explore magnetic
        levitation, mass-negation propulsion, and groundbreaking theoretical physics —
        tracking every session with real-time attendance.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mt-2">
        <Link to="/login" className="btn-primary flex items-center gap-2 text-lg">
          Access Portal <ArrowRight size={20} />
        </Link>
        <Link to="/modules" className="btn-ghost flex items-center gap-2 text-lg">
          View Modules
        </Link>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-5xl">
        {features.map((f, i) => (
          <div
            key={i}
            className={`glass-panel-hover p-6 text-left border ${f.color}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-5 border`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap justify-center gap-12 mt-8 text-center">
        {[['3+', 'Research Modules'], ['12+', 'Lab Sessions/Month'], ['2', 'Faculty Instructors']].map(([val, label]) => (
          <div key={label}>
            <p className="text-4xl font-extrabold gradient-text">{val}</p>
            <p className="text-slate-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
