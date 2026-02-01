
import React, { useEffect, useState } from 'react';
import { TRANSLATIONS, PLATFORM_LOGOS } from './constants';

const LeadCalculator = ({ lang, t }: { lang: 'es' | 'pt', t: any }) => {
  const [budget, setBudget] = useState(250000);
  
  const costPerLead = 1800; // ARS
  const avgTicket = 450000; // ARS
  const closureRate = 0.05; 
  const otaCommissionRate = 0.18; 
  
  const leads = Math.floor(budget / costPerLead);
  const bookings = Math.floor(leads * closureRate);
  const totalRevenue = bookings * avgTicket;
  const savings = Math.floor(totalRevenue * otaCommissionRate);

  const formatARS = (val: number) => 
    new Intl.NumberFormat(lang === 'es' ? 'es-AR' : 'pt-BR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);

  return (
    <div className="bg-white p-6 md:p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-black/5 rounded-[2.5rem] w-full max-w-xl mx-auto lg:mx-0">
      <h3 className="font-serif text-3xl md:text-4xl mb-4 leading-tight text-zinc-900">{t.calcTitle}</h3>
      <p className="text-sm text-black/40 mb-8 leading-relaxed italic">{t.calcDesc}</p>
      
      <div className="space-y-10">
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40">{t.calcInputLabel}</label>
            <span className="text-2xl md:text-3xl font-serif text-[#b39359]">{formatARS(budget)}</span>
          </div>
          <input 
            type="range" 
            min="50000" 
            max="2000000" 
            step="50000"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#b39359]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-black/5">
          <div className="p-6 bg-[#fdfdfb] rounded-2xl border border-black/5">
            <p className="text-[9px] font-black uppercase text-black/30 mb-2">{t.calcResultLeads}</p>
            <p className="text-3xl md:text-4xl font-serif text-zinc-800">{leads.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-green-50/50 rounded-2xl border border-green-100/50">
            <p className="text-[9px] font-black uppercase text-green-700/50 mb-2">{t.calcResultBookings}</p>
            <p className="text-3xl md:text-4xl font-serif text-green-700">{formatARS(savings)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'es' | 'pt'>('es');
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#f9f9f7] text-[#1a1a1a] min-h-screen overflow-x-hidden selection:bg-[#b39359] selection:text-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-5 md:px-12 md:py-10 flex justify-between items-center pointer-events-none">
        <div className="text-[#b39359] font-black tracking-tighter text-2xl md:text-3xl pointer-events-auto select-none uppercase tracking-widest">2LUCASFILM</div>
        <div className="flex gap-2 pointer-events-auto">
          {['es', 'pt'].map((l) => (
            <button 
              key={l}
              onClick={() => setLang(l as 'es' | 'pt')}
              className={`w-9 h-9 md:w-12 md:h-12 rounded-full text-[9px] md:text-[10px] font-black border transition-all duration-500 flex items-center justify-center ${lang === l ? 'bg-[#b39359] text-white border-[#b39359] shadow-xl scale-110' : 'bg-white/90 border-black/5 text-black hover:bg-white hover:scale-105'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-24 pt-32 pb-20 lg:py-0 overflow-hidden bg-white">
        <div className="w-full lg:w-1/2 relative z-30 text-center lg:text-left mb-16 lg:mb-0">
          <span className="text-[#b39359] font-black tracking-[0.5em] text-[10px] uppercase mb-8 block opacity-0 animate-fade-in-up">{t.heroTag}</span>
          <h1 className="hero-title font-serif mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.heroTitleLine1}<br/>
            <span className="italic text-[#b39359] font-light">{t.heroTitleLine2}</span>
          </h1>
          <p className="text-lg md:text-xl text-black/50 font-light max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t.heroDesc}
          </p>
          <div className="opacity-0 animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" style={{ animationDelay: '0.6s' }}>
             <a href="#narrative" className="inline-block bg-[#1a1a1a] text-white px-10 md:px-14 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#b39359] transition-all text-center">
                Ver Estrategia Visual
             </a>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[350px] md:h-[500px] lg:h-screen">
          <div className="relative group perspective-1000 scale-[0.45] sm:scale-75 lg:scale-100">
            {PLATFORM_LOGOS.map((logo, i) => (
              <div key={logo.id} className={`orbit-platform platform-${i+1} bg-white shadow-2xl p-4 md:p-5 flex items-center justify-center border border-black/5`}>
                <img src={logo.url} alt={logo.id} className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            ))}
            <div className="relative w-[300px] h-[610px] bg-[#1c1c1e] rounded-[3.5rem] border-[10px] border-[#3a3a3c] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)] overflow-hidden transform lg:rotate-[-3deg] transition-all duration-1000 ease-out group-hover:rotate-0">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30"></div>
              <div className="w-full h-full relative">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600" className="w-full h-full object-cover brightness-75 scale-105 group-hover:scale-100 transition-transform duration-[3s]" alt="Hotel Interior" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                <div className="absolute bottom-12 left-4 right-4 bg-white/95 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex items-center gap-5 animate-bounce-slow">
                   <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-serif italic shadow-lg">$</div>
                   <div>
                     <p className="text-[9px] font-black uppercase text-black/30 tracking-widest">RESERVA DIRECTA</p>
                     <p className="text-base font-bold text-green-600">CONFIRMADA</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: EL JUEGO DEL DINERO */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24 reveal">
            <span className="text-[#b39359] font-black tracking-[0.4em] text-[10px] uppercase mb-8 block">{t.moneyGameTitle}</span>
            <h2 className="font-serif text-4xl md:text-8xl mb-10 leading-tight italic">{t.moneyGameSubtitle}</h2>
            <p className="text-black/40 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">{t.moneyGameDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="reveal bg-white p-8 md:p-12 border border-black/5 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col" style={{ transitionDelay: `${i * 0.2}s` }}>
                <div className="text-[#b39359] font-serif text-4xl md:text-7xl mb-8 md:mb-10 group-hover:scale-110 transition-transform origin-left italic">0{i}</div>
                <h4 className="font-bold text-xs md:text-base uppercase tracking-widest mb-4 md:mb-6 leading-relaxed">{(t as any)[`moneyFact${i}`]}</h4>
                <p className="text-black/40 text-sm md:text-base font-light leading-relaxed mb-8">{(t as any)[`moneyFact${i}Desc`]}</p>
                <div className="mt-auto h-px bg-zinc-100 w-12 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: NARRATIVA VISUAL */}
      <section id="narrative" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="reveal order-2 lg:order-1">
              <span className="text-[#b39359] font-black tracking-[0.4em] text-[10px] uppercase mb-8 block">NARRATIVA VISUAL</span>
              <h2 className="font-serif text-4xl md:text-7xl mb-8 italic">{t.visualNarrativeTitle}</h2>
              <p className="text-lg md:text-2xl text-black/60 font-light mb-12 italic">{t.visualNarrativeDesc}</p>
              
              <div className="space-y-12">
                {[1, 2, 3].map(i => (
                  <div key={i} className="group flex gap-6 md:gap-8 items-start">
                    <span className="text-[#b39359] text-2xl md:text-3xl font-serif italic border-b border-[#b39359]/20 shrink-0">0{i}</span>
                    <div>
                      <h4 className="font-bold text-[10px] md:text-xs uppercase tracking-widest mb-2 group-hover:text-[#b39359] transition-colors">{(t as any)[`visualPoint${i}`]}</h4>
                      <p className="text-black/40 text-sm md:text-base leading-relaxed">{(t as any)[`visualPoint${i}Desc`]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-16 p-8 bg-[#f9f9f7] rounded-[2rem] border border-black/5 reveal">
                <p className="text-[#b39359] font-serif italic text-xl md:text-2xl mb-4 leading-relaxed">
                  "{t.visualViralStrategy}"
                </p>
                <div className="h-px w-full bg-black/5 mb-4"></div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-widest text-black/30">CONVERSIÓN VS SUERTE</span>
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="reveal relative order-1 lg:order-2 mb-12 lg:mb-0">
               <div className="aspect-[9/16] w-full max-w-[320px] md:max-w-[400px] mx-auto bg-[#1a1a1a] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative border-[6px] md:border-[8px] border-zinc-900 group/video">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="https://res.cloudinary.com/dkzx2kuuu/video/upload/v1769873480/3109a1dd1a994d03bfad4929565faaee_mw4ew5.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 flex flex-col justify-end p-6 md:p-8">
                     <p className="text-[#b39359] font-black text-[10px] uppercase tracking-[0.3em] mb-4">@omundovistodomeujeito</p>
                     <p className="text-white font-serif italic text-2xl md:text-3xl mb-6">Deseo Visual</p>
                     
                     <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        <div className="text-center">
                           <p className="text-white text-xs font-bold">+1M</p>
                           <p className="text-white/40 text-[8px] font-black uppercase tracking-tighter">VIEWS</p>
                        </div>
                        <div className="text-center">
                           <p className="text-white text-xs font-bold">46k</p>
                           <p className="text-white/40 text-[8px] font-black uppercase tracking-tighter">LIKES</p>
                        </div>
                        <div className="text-center">
                           <p className="text-white text-xs font-bold">34.9k</p>
                           <p className="text-white/40 text-[8px] font-black uppercase tracking-tighter">SHARES</p>
                        </div>
                     </div>
                  </div>
                  <div className="absolute top-6 right-6 bg-red-500/90 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm">VIRAL</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FUNIL & CALC */}
      <section id="calc" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32">
            <div className="reveal">
              <span className="text-[#b39359] font-black tracking-[0.4em] text-[10px] uppercase mb-12 block">SOVEREIGNTY ENGINE</span>
              <h2 className="font-serif text-4xl md:text-7xl mb-14 leading-tight italic">{t.funnelTitle}</h2>
              <div className="space-y-12 md:space-y-16">
                {[
                  { title: t.funnelInsta, desc: t.funnelInstaDesc, icon: '01' },
                  { title: t.funnelSite, desc: t.funnelSiteDesc, icon: '02' },
                  { title: t.funnelAds, desc: t.funnelAdsDesc, icon: '03' }
                ].map((item, i) => (
                  <div key={i} className="group relative pl-12 md:pl-16">
                    <span className="absolute left-0 top-0 text-[#b39359] text-2xl md:text-3xl font-serif italic group-hover:scale-125 transition-transform">{item.icon}</span>
                    <h5 className="font-bold text-[9px] md:text-xs uppercase tracking-widest mb-4 group-hover:text-[#b39359] transition-colors">{item.title}</h5>
                    <p className="text-black/40 text-sm md:text-lg leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal flex justify-center lg:justify-end">
              <LeadCalculator lang={lang} t={t} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: COMO FICARIA SEU NOVO SITE */}
      <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-white text-center">
        <div className="max-w-4xl mx-auto reveal">
          <span className="text-[#b39359] font-black tracking-[0.4em] text-[10px] uppercase mb-12 block">NEXT LEVEL EXPERIENCE</span>
          <h2 className="font-serif text-4xl md:text-8xl mb-10 italic leading-tight">{t.newSiteTitle}</h2>
          <p className="text-black/40 text-lg md:text-2xl font-light mb-16 leading-relaxed max-w-2xl mx-auto italic">
            {t.newSiteDesc}
          </p>
          <a href="https://alehue-tcvk.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1a1a1a] text-white px-10 md:px-20 py-6 md:py-8 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#b39359] transition-all rounded-full shadow-xl">
            {t.newSiteBtn}
          </a>
        </div>
      </section>

      {/* SECTION: MEUS TRABALHOS / BIO */}
      <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#1a1a1a] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[#b39359] opacity-[0.02] -rotate-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-20 items-center relative z-10">
          <div className="w-full lg:w-1/3 reveal flex justify-center">
             <div className="relative inline-block">
                <div className="absolute -inset-4 border border-[#b39359]/30 rounded-full animate-pulse-slow"></div>
                <img 
                  src="https://res.cloudinary.com/dkzx2kuuu/image/upload/v1769632050/Gemini_Generated_Image_emh5gmemh5gmemh5_ahrljj.png" 
                  className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-1000 border-2 border-[#b39359]/20 shadow-2xl" 
                  alt="Bio Portrait"
                />
             </div>
          </div>
          <div className="w-full lg:w-2/3 reveal text-center lg:text-left">
             <span className="text-[#b39359] font-black tracking-[0.4em] text-[10px] uppercase mb-8 block">ABOUT ME</span>
             <h2 className="font-serif text-4xl md:text-8xl mb-8 italic">{t.bioTitle}</h2>
             <h3 className="text-[#b39359] font-serif text-xl md:text-3xl mb-8 italic">{t.bioSubtitle}</h3>
             <p className="text-white/40 text-base md:text-xl leading-relaxed italic mb-12 max-w-2xl mx-auto lg:mx-0">
               {t.bioText}
             </p>
             <a href="https://2lucasfilm.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#b39359] text-white px-10 md:px-16 py-6 md:py-10 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all rounded-full shadow-2xl">
               {t.bioBtn}
             </a>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-white text-center border-t border-black/5">
        <div className="text-[#b39359] font-black tracking-tighter text-3xl md:text-4xl mb-6 uppercase">2LUCASFILM</div>
        <div className="text-black/20 text-[9px] md:text-[10px] uppercase tracking-[0.8em] font-black px-4">
          PATAGONIA X BRASIL | 2024
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }

        .orbit-platform {
          position: absolute;
          width: 85px;
          height: 85px;
          border-radius: 1.8rem;
          z-index: 5;
          opacity: 0.85;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          padding: 14px;
        }
        .orbit-platform:hover { opacity: 1; transform: scale(1.15) !important; z-index: 50; box-shadow: 0 30px 60px -10px rgba(0,0,0,0.4); }

        .platform-1 { animation: orbit-p1 32s linear infinite; }
        .platform-2 { animation: orbit-p2 28s linear infinite; }
        .platform-3 { animation: orbit-p3 35s linear infinite; }
        .platform-4 { animation: orbit-p4 30s linear infinite; }
        .platform-5 { animation: orbit-p5 40s linear infinite; }
        .platform-6 { animation: orbit-p6 25s linear infinite; }

        @keyframes orbit-p1 { 0% { transform: rotate(0deg) translateX(260px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(260px) rotate(-360deg); } }
        @keyframes orbit-p2 { 0% { transform: rotate(60deg) translateX(300px) rotate(-60deg); } 100% { transform: rotate(420deg) translateX(300px) rotate(-420deg); } }
        @keyframes orbit-p3 { 0% { transform: rotate(120deg) translateX(280px) rotate(-120deg); } 100% { transform: rotate(480deg) translateX(280px) rotate(-480deg); } }
        @keyframes orbit-p4 { 0% { transform: rotate(180deg) translateX(270px) rotate(-180deg); } 100% { transform: rotate(540deg) translateX(270px) rotate(-540deg); } }
        @keyframes orbit-p5 { 0% { transform: rotate(240deg) translateX(310px) rotate(-240deg); } 100% { transform: rotate(600deg) translateX(310px) rotate(-600deg); } }
        @keyframes orbit-p6 { 0% { transform: rotate(300deg) translateX(250px) rotate(-300deg); } 100% { transform: rotate(660deg) translateX(250px) rotate(-660deg); } }

        .animate-pulse-slow { animation: pulse 8s infinite ease-in-out; }
        .animate-bounce-slow { animation: bounce 6s infinite ease-in-out; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.08); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }

        .perspective-1000 { perspective: 1000px; }

        @media (max-width: 768px) {
          .orbit-platform { width: 45px; height: 45px; padding: 8px; border-radius: 1rem; }
          .platform-1 { animation: orbit-p1-m 28s linear infinite; }
          .platform-2 { animation: orbit-p2-m 24s linear infinite; }
          .platform-3 { animation: orbit-p3-m 30s linear infinite; }
          .platform-4 { animation: orbit-p4-m 26s linear infinite; }
          .platform-5 { animation: orbit-p5-m 34s linear infinite; }
          .platform-6 { animation: orbit-p6-m 22s linear infinite; }

          @keyframes orbit-p1-m { 0% { transform: rotate(0deg) translateX(120px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
          @keyframes orbit-p2-m { 0% { transform: rotate(60deg) translateX(135px) rotate(-60deg); } 100% { transform: rotate(420deg) translateX(135px) rotate(-420deg); } }
          @keyframes orbit-p3-m { 0% { transform: rotate(120deg) translateX(125px) rotate(-120deg); } 100% { transform: rotate(480deg) translateX(125px) rotate(-480deg); } }
          @keyframes orbit-p4-m { 0% { transform: rotate(180deg) translateX(130px) rotate(-180deg); } 100% { transform: rotate(540deg) translateX(130px) rotate(-540deg); } }
          @keyframes orbit-p5-m { 0% { transform: rotate(240deg) translateX(145px) rotate(-240deg); } 100% { transform: rotate(600deg) translateX(145px) rotate(-600deg); } }
          @keyframes orbit-p6-m { 0% { transform: rotate(300deg) translateX(115px) rotate(-300deg); } 100% { transform: rotate(660deg) translateX(115px) rotate(-660deg); } }
        }
      `}</style>
    </div>
  );
};

export default App;
