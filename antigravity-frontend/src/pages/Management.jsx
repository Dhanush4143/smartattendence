import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { authService, moduleService } from '../services/api';
import { UserPlus, BookOpen, Send } from 'lucide-react';

const Management = () => {
    const { user } = useAuth();
    
    // Student Form
    const [studentForm, setStudentForm] = useState({ name: '', email: '', password: 'password' });
    const [submittingStudent, setSubmittingStudent] = useState(false);
    const [studentMsg, setStudentMsg] = useState(null);

    // Module Form
    const [moduleForm, setModuleForm] = useState({ name: '', description: '' });
    const [submittingModule, setSubmittingModule] = useState(false);
    const [moduleMsg, setModuleMsg] = useState(null);

    if (!user?.roles?.includes('ROLE_TEACHER')) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleCreateStudent = async (e) => {
        e.preventDefault();
        setSubmittingStudent(true);
        setStudentMsg(null);
        try {
            await authService.createStudent(studentForm);
            setStudentMsg({ type: 'success', text: '✅ Student added successfully!' });
            setStudentForm({ name: '', email: '', password: 'password' });
        } catch (error) {
            setStudentMsg({ type: 'error', text: '❌ Failed: ' + (error.response?.data || 'Unknown error') });
        } finally {
            setSubmittingStudent(false);
        }
    };

    const handleCreateModule = async (e) => {
        e.preventDefault();
        setSubmittingModule(true);
        setModuleMsg(null);
        try {
            await moduleService.create(moduleForm);
            setModuleMsg({ type: 'success', text: '✅ Class module created successfully!' });
            setModuleForm({ name: '', description: '' });
        } catch (error) {
            setModuleMsg({ type: 'error', text: '❌ Failed to create class.' });
        } finally {
            setSubmittingModule(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
            <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <BookOpen className="text-primary" /> University Management
                </h2>
                <p className="text-slate-400 mt-1">Manage enrollments, classes, and subjects as a Teacher.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Enroll Student Panel */}
                <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <UserPlus size={22} className="text-accent" /> Enroll New Student
                    </h3>
                    
                    {studentMsg && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${studentMsg.type === 'success' ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                            {studentMsg.text}
                        </div>
                    )}

                    <form onSubmit={handleCreateStudent} className="space-y-5 relative">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Full Name</label>
                            <input required value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} className="input-field" placeholder="e.g. John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email Address</label>
                            <input type="email" required value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} className="input-field" placeholder="student@university.edu" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Default Password</label>
                            <input required value={studentForm.password} onChange={e => setStudentForm({ ...studentForm, password: e.target.value })} className="input-field bg-white/5" />
                        </div>
                        
                        <button type="submit" disabled={submittingStudent} className="btn-primary w-full flex items-center justify-center gap-2 mt-4">
                            {submittingStudent ? 'Enrolling...' : <><UserPlus size={18} /> Enroll Student</>}
                        </button>
                    </form>
                </div>

                {/* Create Class Panel */}
                <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <BookOpen size={22} className="text-primary" /> Create New Class
                    </h3>

                    {moduleMsg && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${moduleMsg.type === 'success' ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                            {moduleMsg.text}
                        </div>
                    )}

                    <form onSubmit={handleCreateModule} className="space-y-5 relative">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Class Name</label>
                            <input required value={moduleForm.name} onChange={e => setModuleForm({ ...moduleForm, name: e.target.value })} className="input-field" placeholder="e.g. CS101 Advanced Levitation" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Description</label>
                            <textarea required rows={4} value={moduleForm.description} onChange={e => setModuleForm({ ...moduleForm, description: e.target.value })} className="input-field resize-none" placeholder="What will be taught in this class?" />
                        </div>
                        
                        <button type="submit" disabled={submittingModule} className="btn-primary w-full flex items-center justify-center gap-2 mt-4">
                            {submittingModule ? 'Creating...' : <><Send size={18} /> Create Class</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Management;
