import React, { useEffect, useState } from 'react';
import { attendanceService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FileText, Download, Filter } from 'lucide-react';
import Spinner from '../components/Spinner';

const Reports = () => {
    const { user } = useAuth();
    const [records, setRecords] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const isTeacher = user?.roles?.includes('ROLE_TEACHER');

    useEffect(() => {
        attendanceService.getReport()
            .then(res => setRecords(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = filter === 'ALL' ? records : records.filter(r => r.status === filter);

    const exportCSV = () => {
        const headers = ['Date', 'Period', 'Student Name', 'Student Email', 'Module', 'Status'];
        const rows = filtered.map(r => [
            r.date,
            `Period ${r.period || '-'}`,
            r.user.name,
            r.user.email,
            r.module.name,
            r.status
        ]);
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <Spinner text="Loading attendance records..." />;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <FileText className="text-accent" /> Attendance Reports
                    </h2>
                    <p className="text-slate-400 mt-1">
                        {isTeacher ? 'All student records' : 'Your personal attendance history'} — {records.length} total
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Filter size={15} className="text-slate-400" />
                        <select
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className="bg-surface border border-white/10 text-white rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary/50"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="PRESENT">Present</option>
                            <option value="ABSENT">Absent</option>
                            <option value="EXCUSED">Excused</option>
                        </select>
                    </div>
                    <button
                        onClick={exportCSV}
                        className="btn-ghost flex items-center gap-2 text-sm"
                    >
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Summary pills */}
            <div className="flex flex-wrap gap-3">
                {[
                    { label: 'Present', count: records.filter(r => r.status === 'PRESENT').length, cls: 'badge-present' },
                    { label: 'Absent', count: records.filter(r => r.status === 'ABSENT').length, cls: 'badge-absent' },
                    { label: 'Excused', count: records.filter(r => r.status === 'EXCUSED').length, cls: 'badge-excused' },
                ].map(({ label, count, cls }) => (
                    <span key={label} className={`${cls} text-sm`}>{label}: {count}</span>
                ))}
            </div>

            {/* Table */}
            <div className="glass-panel overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-slate-400 uppercase text-xs tracking-wide">
                            <th className="py-4 px-4 font-semibold text-slate-300">Date</th>
                            <th className="py-4 px-4 font-semibold text-slate-300">Period</th>
                            <th className="py-4 px-4 font-semibold text-slate-300">Student</th>
                            <th className="py-4 px-4 font-semibold text-slate-300">Module</th>
                            <th className="px-5 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filtered.map((r) => (
                            <tr key={r.id} className="hover:bg-white/5 transition-colors">
                                <td className="py-4 px-4 whitespace-nowrap text-slate-300">{r.date}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-slate-400">P{r.period || '-'}</td>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <p className="font-medium text-slate-200">{r.user.name}</p>
                                    <p className="text-xs text-slate-500">{r.user.email}</p>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-slate-300">{r.module.name}</td>
                                <td className="px-5 py-4">
                                    <span className={
                                        r.status === 'PRESENT' ? 'badge-present' :
                                        r.status === 'ABSENT' ? 'badge-absent' : 'badge-excused'
                                    }>
                                        {r.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center text-slate-500 italic">
                                    No records match the selected filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
