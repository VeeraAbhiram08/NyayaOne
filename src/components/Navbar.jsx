import React, { useState } from 'react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  language, 
  setLanguage, 
  darkMode, 
  setDarkMode, 
  highContrast, 
  setHighContrast, 
  textSize, 
  setTextSize,
  isLoggedIn,
  setIsLoggedIn,
  userRole,
  setUserRole,
  onOpenAuth
}) {
  const [showAccMenu, setShowAccMenu] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const languages = {
    en: 'English',
    hi: 'हिन्दी (Hindi)',
    te: 'తెలుగు (Telugu)',
    ta: 'தமிழ் (Tamil)',
    kn: 'ಕನ್ನಡ (Kannada)',
    ml: 'മലയാളം (Malayalam)',
    mr: 'मराठी (Marathi)',
    gu: 'ગુજરાતી (Gujarati)',
    pa: 'ਪੰਜਾਬੀ (Punjabi)',
    bn: 'বাংলা (Bengali)',
    or: 'ଓଡ଼ିଆ (Odia)',
    ur: 'اردو (Urdu)'
  };

  // Nav translations mapping
  const navLabels = {
    home: { en: 'Home', hi: 'मुख्य पृष्ठ', te: 'హోమ్', ta: 'முகப்பு', kn: 'ಹೋಮ್', ml: 'ഹോം', mr: 'मुख्यपृष्ठ', gu: 'હોમ', pa: 'ਹੋਮ', bn: 'হোম', or: 'ହୋମ୍', ur: 'ہوم' },
    services: { en: 'National Directory', hi: 'राष्ट्रीय निर्देशिका', te: 'సేవల డైరెక్టరీ', ta: 'சேவைகள்', kn: 'ಡೈರೆಕ್ಟರಿ', ml: 'സേവനങ്ങൾ', mr: 'राष्ट्रीय निर्देशिका', gu: 'સેવાઓ', pa: 'ਸੇਵਾਵਾਂ', bn: 'সেবা সমূহ', or: 'ସେବା ସମୂହ', ur: 'سروسز' },
    'ai-assistant': { en: 'AI Legal Navigator', hi: 'एआई कानूनी नेविगेटर', te: 'AI సహాయకుడు', ta: 'AI உதவியாளர்', kn: 'AI ನೆವಿಗೇಟರ್', ml: 'AI അസിസ്റ്റന്റ്', mr: 'AI कायदेशीर नेविगेटर', gu: 'AI સહાયક', pa: 'AI ਸਹਾਇਕ', bn: 'এআই নেভিগেটর', or: 'ଏଆଇ ସହାୟକ', ur: 'اے آئی مددگار' },
    mediation: { en: 'Online Mediation', hi: 'ऑनलाइन मध्यस्थता', te: 'ఆన్‌లైన్ మధ్యస్థత', ta: 'மத்தியஸ்தம்', kn: 'ಮಧ್ಯಸ್ಥಿಕೆ', ml: 'മധ്യസ്ഥത', mr: 'ऑनलाइन मध्यस्थता', gu: 'મધ્યસ્થતા', pa: 'ਮੱਧਸਥਤਾ', bn: 'অনলাইন শালিস', or: 'ଅନଲାଇନ୍ ମଧ୍ୟସ୍ଥତା', ur: 'آن لائن ثالثی' },
    'knowledge-hub': { en: 'Knowledge Hub', hi: 'ज्ञान केंद्र', te: 'జ్ఞాన కేంద్రం', ta: 'அறிவு மையம்', kn: 'ಜ್ಞಾನ ಕೇಂದ್ರ', ml: 'അറിവ് കേന്ദ്രം', mr: 'ज्ञान केंद्र', gu: 'જ્ઞાન કેન્દ્ર', pa: 'ਗਿਆਨ ਕੇਂਦਰ', bn: 'জ্ঞান কেন্দ্র', or: 'ଜ୍ଞାନ କେନ୍ଦ୍ର', ur: 'علمی مرکز' },
    lawyers: { en: 'Lawyer Registry', hi: 'वकील रजिस्ट्री', te: 'న్యాయవాదులు', ta: 'வழக்கறிஞர்கள்', kn: 'ವಕೀಲರು', ml: 'വക്കീലന്മാർ', mr: 'वकील निर्देशिका', gu: 'વકીલો', pa: 'ਵਕੀਲ', bn: 'আইনজীবী তালিকা', or: 'ଓକିଲ ତାଲିକା', ur: 'وکلاء کی فہرست' },
    dashboard: { en: 'My Case Locker', hi: 'मेरा केस लॉकर', te: 'నా కేస్ లాకర్', ta: 'எனது கேஸ்', kn: 'ನನ್ನ ಪ್ರಕರಣಗಳು', ml: 'കേസുകൾ', mr: 'माझे केस लॉकर', gu: 'મારી કેસ ફાઇલ', pa: 'ਮੇਰਾ ਕੇਸ', bn: 'আমার কেস লকার', or: 'ମୋର କେସ୍ ଲକର୍', ur: 'میرا کیس لا کر' }
  };

  const navItems = [
    { id: 'home' },
    { id: 'services' },
    { id: 'ai-assistant' },
    { id: 'mediation' },
    { id: 'knowledge-hub' },
    { id: 'lawyers' },
    { id: 'dashboard', authRequired: true }
  ];

  const handleTextSizeChange = (size) => {
    setTextSize(size);
    document.body.className = document.body.className
      .replace(/\btext-\S+/g, '')
      .trim();
    if (size !== 'normal') {
      document.body.classList.add(`text-${size}`);
    }
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const triggerTextToSpeech = () => {
    const headerTitle = navLabels[currentTab]?.[language] || navLabels[currentTab]?.['en'] || "NyayaOne Portal";
    const phrase = `Active page is ${headerTitle}`;
    
    // Clear speaking first
    window.speechSynthesis?.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis?.speak(utterance);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('citizen');
    setCurrentTab('home');
  };

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      width: '100%',
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      
      {/* Top GOI National Banner */}
      <div style={{
        backgroundColor: '#0a1226',
        color: '#e2e8f0',
        fontSize: '0.75rem',
        padding: '0.35rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem' }}>🇮🇳</span>
          <span style={{ fontWeight: 550 }}>Ministry of Law & Justice | Government of India</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} className="desktop-only">
          <a href="#skip" onClick={(e) => { e.preventDefault(); setCurrentTab('dashboard'); }} style={{ color: '#cbd5e1', fontSize: '0.7rem' }}>Skip to Main Content</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ fontSize: '0.7rem' }}>Digital India Initiative</span>
        </div>
      </div>

      <div className="tricolor-stripe">
        <div className="saffron-bar"></div>
        <div className="white-bar"></div>
        <div className="green-bar"></div>
      </div>
      
      <div className="container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: '75px',
        padding: '0 1.5rem'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setCurrentTab('home')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="4" fill="var(--color-navy)" />
            {/* Scales of Justice Graphic */}
            <path d="M12 25H28" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 10V25" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 15L20 12L25 15" stroke="#FF9933" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 15V20C15 22 17 23 17 23" stroke="#128807" strokeWidth="1" strokeLinecap="round" />
            <path d="M25 15V20C25 22 23 23 23 23" stroke="#128807" strokeWidth="1" strokeLinecap="round" />
            <circle cx="20" cy="18" r="2" fill="white" />
          </svg>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.4rem', 
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              Nyaya<span style={{ color: 'var(--color-saffron)' }}>One</span>
            </span>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '-4px' }}>
              National Digital Justice Portal
            </div>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-only">
          {navItems.map(item => {
            if (item.authRequired && !isLoggedIn) return null;
            const isActive = currentTab === item.id;
            const labelText = navLabels[item.id]?.[language] || navLabels[item.id]?.['en'];
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`tab-btn ${isActive ? 'active' : ''}`}
                style={{ 
                  fontSize: '0.85rem', 
                  padding: '0.5rem 0.75rem',
                  borderBottom: 'none'
                }}
              >
                {labelText}
              </button>
            );
          })}
        </nav>

        {/* Toolbar & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          {/* Audio Speech Voice Assistant */}
          <button 
            className="btn btn-secondary" 
            onClick={triggerTextToSpeech}
            style={{ padding: '0.5rem', width: '36px', height: '36px', borderRadius: '50%' }}
            title="Read Page Title Aloud"
            aria-label="Speak Page Title"
          >
            🔊
          </button>

          {/* Accessibility Toggle */}
          <div style={{ position: 'relative' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => { setShowAccMenu(!showAccMenu); setShowLangDropdown(false); }}
              style={{ padding: '0.5rem', width: '36px', height: '36px', borderRadius: '50%' }}
              title="Accessibility Controls"
              aria-label="Accessibility settings"
            >
              ♿
            </button>
            {showAccMenu && (
              <div className="card" style={{ 
                position: 'absolute', 
                right: 0, 
                top: '45px', 
                width: '260px', 
                zIndex: 1100, 
                padding: '1.25rem',
                boxShadow: 'var(--shadow-xl)' 
              }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  Accessibility controls
                </h4>
                
                {/* Text Size */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Text size scaling</div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button 
                      onClick={() => handleTextSizeChange('normal')} 
                      className={`btn ${textSize === 'normal' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', flex: 1 }}
                    >
                      Reset
                    </button>
                    <button 
                      onClick={() => handleTextSizeChange('lg')} 
                      className={`btn ${textSize === 'lg' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', flex: 1 }}
                    >
                      A+
                    </button>
                    <button 
                      onClick={() => handleTextSizeChange('xl')} 
                      className={`btn ${textSize === 'xl' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.95rem', flex: 1 }}
                    >
                      A++
                    </button>
                  </div>
                </div>

                {/* High Contrast */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>High contrast mode</span>
                  <button 
                    onClick={toggleHighContrast}
                    className={`btn ${highContrast ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    {highContrast ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div style={{ position: 'relative' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => { setShowLangDropdown(!showLangDropdown); setShowAccMenu(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 0.6rem', height: '36px', borderRadius: 'var(--radius-sm)' }}
              title="Select Language"
            >
              🌐 <span style={{ fontSize: '0.8rem', fontWeight: 650 }}>{language.toUpperCase()}</span>
            </button>
            {showLangDropdown && (
              <div className="card" style={{ 
                position: 'absolute', 
                right: 0, 
                top: '45px', 
                width: '200px', 
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: 1100, 
                padding: '0.25rem',
                boxShadow: 'var(--shadow-xl)' 
              }}>
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => { setLanguage(code); setShowLangDropdown(false); }}
                    className="btn btn-secondary"
                    style={{ 
                      width: '100%', 
                      textAlign: 'left', 
                      justifyContent: 'flex-start',
                      padding: '0.4rem 0.6rem', 
                      border: 'none',
                      fontSize: '0.8rem',
                      backgroundColor: language === code ? 'var(--color-royal-light)' : 'transparent',
                      color: language === code ? 'var(--color-royal)' : 'var(--text-primary)'
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button 
            className="btn btn-secondary" 
            onClick={() => setDarkMode(!darkMode)}
            style={{ padding: '0.5rem', width: '36px', height: '36px', borderRadius: '50%' }}
            title="Toggle Theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* User Status / Login */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                onClick={() => setCurrentTab('dashboard')} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  cursor: 'pointer',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  height: '36px'
                }}
              >
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-royal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.7rem' }}>
                  {userRole[0].toUpperCase()}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize', color: 'var(--text-primary)' }} className="desktop-only">
                  {userRole}
                </span>
              </div>
              <button 
                className="btn btn-secondary" 
                onClick={handleLogout}
                style={{ padding: '0.4rem 0.6rem', height: '36px', fontSize: '0.8rem' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={onOpenAuth}
              style={{ height: '36px', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            >
              Sign In
            </button>
          )}

        </div>
      </div>
      
      {/* Breadcrumb Navigation Strip */}
      <div className="breadcrumb-container">
        <div className="container">
          <ul className="breadcrumb-list">
            <li className="breadcrumb-item">
              <a href="#home" onClick={(e) => { e.preventDefault(); setCurrentTab('home'); }}>National Portal</a>
            </li>
            <li className="breadcrumb-item active" style={{ textTransform: 'capitalize' }}>
              {navLabels[currentTab]?.[language] || navLabels[currentTab]?.['en'] || currentTab}
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Nav Links Strip */}
      <div className="mobile-only" style={{ 
        display: 'none',
        borderTop: '1px solid var(--border-color)',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        padding: '0.5rem 1rem'
      }}>
        {navItems.map(item => {
          if (item.authRequired && !isLoggedIn) return null;
          const isActive = currentTab === item.id;
          const labelText = navLabels[item.id]?.[language] || navLabels[item.id]?.['en'];
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`tab-btn ${isActive ? 'active' : ''}`}
              style={{ 
                fontSize: '0.8rem', 
                padding: '0.25rem 0.5rem',
                marginRight: '0.5rem',
                display: 'inline-block'
              }}
            >
              {labelText}
            </button>
          );
        })}
      </div>

      {/* Keyboard Accessibility Alert Panel */}
      <div className="accessibility-help-bar">
        <span>⌨️ Press <strong>Alt + C</strong> to skip directly to main workspace locker dashboard.</span>
        <span>Screen Reader: Active</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}} />
    </header>
  );
}
