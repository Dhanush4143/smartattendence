import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { moduleService, attendanceService } from '../services/api';
import { Users, BookOpen, CheckCircle, XCircle, TrendingUp, Clock } from 'lucide-react';
import Spinner from '../components/Spinner';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ modules: 0, present: 0, absent: 0, excused: 0 });
    const [recentAttendance, setRecentAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const isTeacher = user?.roles?.includes('ROLE_TEACHER');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [modulesRes, attendanceRes] = await Promise.all([
                    moduleService.getAll(),
                    attendanceService.getReport()
                ]);
                const records = attendanceRes.data;
                setStats({
                    modules: modulesRes.data.length,
                    present: records.filter(r => r.status === 'PRESENT').length,
                    absent: records.filter(r => r.status === 'ABSENT').length,
                    excused: records.filter(r => r.status === 'EXCUSED').length,
                });
                setRecentAttendance(records.slice(-5).reverse());
            } catch (err) {
                console.error('Dashboard fetch failed', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Spinner text="Loading dashboard..." />;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                    <h2 className="text-3xl font-bold">Dashboard</h2>
                    <p className="text-slate-400 mt-1">
                        Welcome back, <span className="text-primary font-semibold">{user?.name}</span>
                        <span className="ml-2 text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full border border-secondary/30">
                            {isTeacher ? 'Instructor' : 'Student'}
                        </span>
                    </p>
                </div>
                <div className="text-sm text-slate-500 flex items-center gap-2">
                    <Clock size={16} />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <StatCard title="Modules" value={stats.modules} icon={<BookOpen className="text-primary w-5 h-5"/>} accent="border-primary/20 bg-primary/5" />
                <StatCard title="Present" value={stats.present} icon={<CheckCircle className="text-green-400 w-5 h-5"/>} accent="border-green-400/20 bg-green-400/5" />
                <StatCard title="Absent" value={stats.absent} icon={<XCircle className="text-red-400 w-5 h-5"/>} accent="border-red-400/20 bg-red-400/5" />
                <StatCard title="Excused" value={stats.excused} icon={<TrendingUp className="text-yellow-400 w-5 h-5"/>} accent="border-yellow-400/20 bg-yellow-400/5" />
            </div>

            {/* Attendance rate bar */}
            {(stats.present + stats.absent + stats.excused) > 0 && (
                <div className="glass-panel p-6">
                    <h3 className="text-lg font-semibold mb-4">Attendance Rate</h3>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                            style={{ width: `${Math.round((stats.present / (stats.present + stats.absent + stats.excused)) * 100)}%` }}
                        />
                    </div>
                    <p className="text-slate-400 text-sm mt-2">
                        {Math.round((stats.present / (stats.present + stats.absent + stats.excused)) * 100)}% attendance rate
                    </p>
                </div>
            )}

            {/* Recent Activity */}
            <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-secondary" /> Recent Attendance
                </h3>
                {recentAttendance.length === 0 ? (
                    <p className="text-slate-500 italic text-sm">No records yet. Mark your first attendance!</p>
                ) : (
                    <div className="space-y-3">
                        {recentAttendance.map((r) => (
                            <div key={r.id} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                                <div>
                                    <p className="font-medium text-sm">{r.module?.name}</p>
                                    {isTeacher && <p className="text-xs text-slate-500">{r.user?.name}</p>}
                                </div>
                                <div className="flex items-center gap-3 text-right">
                                    <span className="text-xs text-slate-500">{r.date}</span>
                                    <span className={r.status === 'PRESENT' ? 'badge-present' : r.status === 'ABSENT' ? 'badge-absent' : 'badge-excused'}>
                                        {r.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, accent }) => (
    <div className={`glass-panel p-5 border ${accent}`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">{title}</p>
                <h4 className="text-4xl font-extrabold text-white">{value}</h4>
            </div>
            <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
        </div>
    </div>
);

export default Dashboard;
