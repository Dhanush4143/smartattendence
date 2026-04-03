import React from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-4">
        <Frown className="w-16 h-16 text-slate-600" />
        <h2 className="text-5xl font-bold gradient-text">404</h2>
        <p className="text-slate-400">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-4 bg-primary/20 border border-primary/40 hover:bg-primary/30 text-white px-6 py-2 rounded-lg transition-all">
            ← Back to Home
        </Link>
    </div>
);

export default NotFound;
