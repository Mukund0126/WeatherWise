import React from "react";

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 space-gradient opacity-90" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-white/10 rounded-full animate-bounce" style={{ animationDuration: '6s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 border border-white/10 rounded-lg rotate-45 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-40 left-1/4 w-12 h-12 border border-white/10 rounded-full animate-ping" style={{ animationDuration: '8s' }} />
    </div>
  );
};

export default BackgroundEffects;
