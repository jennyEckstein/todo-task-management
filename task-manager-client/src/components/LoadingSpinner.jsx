import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-slate-600 text-lg">Loading tasks...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;