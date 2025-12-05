import { AlertCircle } from 'lucide-react';

const ErrorDisplay = ({ error, onRetry }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-red-200 max-w-md">
                <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-800 mb-2 text-center">Connection Error</h2>
                <p className="text-slate-600 text-center mb-4">{error}</p>
                <button
                    onClick={onRetry}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default ErrorDisplay;