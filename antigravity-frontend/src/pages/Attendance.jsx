import React, { useState, useEffect } from 'react';
import { moduleService, authService, attendanceService } from '../services/api';
import { CheckSquare, Send, Users } from 'lucide-react';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Attendance = () => {
    const { user } = useAuth();
    const [modules, setModules] = useState([]);
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        moduleId: '',
        date: new Date().toISOString().split('T')[0],
        period: '1'
    });
    
    // Manage array of {studentId, status}
    const [studentStatus, setStudentStatus] = useState({});
    
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    if (!user?.roles?.includes('ROLE_TEACHER')) {
        return <Navigate to="/dashboard" replace />;
    }

    useEffect(() => {
        Promise.all([
            moduleService.getAll(),
            authService.getStudents()
        ]).then(([modsRes, studsRes]) => {
            setModules(modsRes.data);
            setStudents(studsRes.data);
            
            // Initialize all students to Present by default to save clicks!
            const initStats = {};
            studsRes.data.forEach(s => {
                initStats[s.id] = 'PRESENT';
            });
            setStudentStatus(initStats);
        }).catch(console.error)
          .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);
        
        try {
            const payload = {
                moduleId: form.moduleId,
                date: form.date,
                period: parseInt(form.period),
                students: students.map(s => ({
                    studentId: s.id,
                    status: studentStatus[s.id] || 'ABSENT'
                }))
            };
            
            await attendanceService.bulkMark(payload);
            setMessage({ type: 'success', text: '✅ Class attendance recorded successfully!' });
            setForm(f => ({ ...f, moduleId: '' }));
        } catch {
            setMessage({ type: 'error', text: '❌ Failed to record attendance. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Spinner text="Loading class roster..." />;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
            <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <CheckSquare className="text-secondary" /> Submit Class Attendance
                </h2>
                <p className="text-slate-400 mt-1">Mark attendance for an entire class per period.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-xl text-sm font-medium border ${
                    message.type === 'success'
                        ? 'bg-green-500/10 text-green-300 border-green-500/30'
                        : 'bg-red-500/10 text-red-300 border-red-500/30'
                }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 space-y-8 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Class / Module</label>
                        <select required value={form.moduleId} onChange={(e) => setForm({ ...form, moduleId: e.target.value })} className="input-field">
                            <option value="">— Choose a Class —</option>
                            {modules.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Session Date</label>
                        <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Period</label>
                        <select required value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className="input-field">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(p => (
                                <option key={p} value={p}>Period {p}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users size={20} className="text-slate-400" /> Student Roster
                    </h3>
                    
                    <div className="space-y-3">
                        {students.map(student => (
                            <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                <div className="mb-3 sm:mb-0">
                                    <p className="font-medium text-slate-200">{student.name}</p>
                                    <p className="text-xs text-slate-400">{student.email}</p>
                                </div>
                                <div className="flex gap-2">
                                    {['PRESENT', 'ABSENT', 'EXCUSED'].map(status => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setStudentStatus(prev => ({ ...prev, [student.id]: status }))}
                                            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                                                studentStatus[student.id] === status
                                                    ? status === 'PRESENT' ? 'bg-green-500/20 border-green-500/50 text-green-300'
                                                    : status === 'ABSENT' ? 'bg-red-500/20 border-red-500/50 text-red-300'
                                                    : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
                                                    : 'bg-background/40 border-white/10 text-slate-400 hover:bg-white/5'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {students.length === 0 && (
                            <p className="text-slate-400 italic">No students enrolled currently.</p>
                        )}
                    </div>
                </div>

                <button type="submit" disabled={submitting || students.length === 0} className="btn-primary w-full flex items-center justify-center gap-2">
                    {submitting ? 'Submitting...' : <><Send size={18} /> Submit Roster Attendance</>}
                </button>
            </form>
        </div>
    );
};

export default Attendance;
