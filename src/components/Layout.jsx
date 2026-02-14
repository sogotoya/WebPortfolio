import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-dark-bg text-gray-200 font-rajdhani relative overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-cyber-grid opacity-20 pointer-events-none z-0"></div>
            <div className="fixed inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent pointer-events-none z-0"></div>

            {/* Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://transparenttextures.com/patterns/black-scales.png')] opacity-5 mix-blend-overlay"></div>

            {/* Main Content */}
            <main className="relative z-10 px-4 py-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
