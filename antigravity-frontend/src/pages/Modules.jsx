import React, { useEffect, useState } from 'react';
import { moduleService } from '../services/api';
import { BookOpen, User, ChevronRight } from 'lucide-react';
import Spinner from '../components/Spinner';

const tagColors = [
    'bg-primary/10 text-primary border-primary/20',
    'bg-accent/10 text-accent border-accent/20',
    'bg-secondary/10 text-secondary border-secondary/20',
];

const Modules = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        moduleService.getAll()
            .then(res => setModules(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner text="Loading modules..." />;

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <BookOpen className="text-primary" /> Research Modules
                </h2>
                <p className="text-slate-400 mt-1">{modules.length} active module{modules.length !== 1 ? 's' : ''} in this term</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((m, i) => (
                    <div key={m.id} className={`glass-panel-hover p-6 border ${tagColors[i % tagColors.length].split(' ')[2]}`}>
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tagColors[i % tagColors.length]}`}>
                                Module #{m.id}
                            </span>
                            <ChevronRight size={18} className="text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{m.name}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">{m.description}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500 border-t border-white/10 pt-4">
                            <User size={15} />
                            <span>{m.teacher?.name || 'Unassigned'}</span>
                        </div>
                    </div>
                ))}
                {modules.length === 0 && (
                    <div className="glass-panel p-10 text-center col-span-2 text-slate-500 italic">
                        No modules found. Ask your instructor to create one.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modules;
