
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

/**
 * Componente Logo oficial do RESET – Vício Zero.
 * Utiliza obrigatoriamente o caminho /assets/logo_reset.png.
 * Implementa object-contain para evitar cortes e garantir proporção.
 */
const Logo: React.FC<LogoProps> = ({ className = "w-24 h-24" }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Fallback minimalista caso o arquivo não exista no ambiente de desenvolvimento
    return (
      <div className={`${className} bg-slate-900 rounded-full flex items-center justify-center border border-slate-800`}>
        <span className="text-blue-500 font-black italic text-xs">RESET</span>
      </div>
    );
  }

  return (
    <img 
      src="/assets/logo_reset.png" 
      alt="RESET – Vício Zero"
      className={`${className} object-contain mx-auto animate-logo-mount`}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      onError={() => {
        console.warn("Logo em '/assets/logo_reset.png' não encontrada.");
        setHasError(true);
      }}
    />
  );
};

export default Logo;
