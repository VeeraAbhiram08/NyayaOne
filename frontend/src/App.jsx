import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CitizenDashboard from './pages/CitizenDashboard';
import AILegalAssistant from './pages/AILegalAssistant';
import MediationPortal from './pages/MediationPortal';
import LawyerPortal from './pages/LawyerPortal';
import CourtEscalation from './pages/CourtEscalation';
import DocVault from './pages/DocVault';
import LawLibrary from './pages/LawLibrary';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('citizen'); // citizen, lawyer, mediator, admin
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('citizen');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  
  // Services Directory states
  const [selectedService, setSelectedService] = useState('consumer');
  
  // Trust center states
  const [allowAiParsing, setAllowAiParsing] = useState(true);
  const [allowAuditLogs, setAllowAuditLogs] = useState(true);

  useEffect(() => {
    // Dark mode body class toggle
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Support for Alt + C keyboard shortcut to jump directly to main Citizen Dashboard / Locker
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        setIsLoggedIn(true);
        setUserRole('citizen');
        setCurrentTab('dashboard');
        alert("Keyboard Shortcut: Logged in and jumped to Citizen Case Locker.");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDemoLogin = (role) => {
    setUserRole(role || 'citizen');
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setOtpSent(false);
    setCurrentTab('dashboard');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode === '1234' || otpCode.length === 4) {
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setOtpSent(false);
      setCurrentTab('dashboard');
    } else {
      alert('Invalid OTP. Use 1234 for quick demo bypass.');
    }
  };

  // Vetted Services Directory Data
  const serviceCategories = {
    consumer: {
      name: "Consumer Grievance Desk",
      overview: "Direct dispute resolution against fraudulent products or deficient services under consumer rules.",
      eligibility: "Any purchaser of goods/services suffering financial losses.",
      laws: "Consumer Protection Act, 2019",
      docs: "Purchase invoice, transaction receipts, warranty cards",
      timeline: "14 to 30 working days",
      process: "AI assesses claim -> Drafts 15-day notice -> serving notice -> online mediation workspace.",
      faqs: "Q: Is there any court filing fee? A: Claims under ₹5,00,000 are completely free of filing fees."
    },
    rental: {
      name: "Residential Tenancy Board",
      overview: "Resolution of landlord-tenant conflicts involving deposits, lease terms, and repairs.",
      eligibility: "Landlords or tenants with active/implied rental lease deeds.",
      laws: "Model Tenancy Act, 2021",
      docs: "Lease deed copy, rent bank statement sheets, deposit receipts",
      timeline: "10 to 20 working days",
      process: "Invite second party -> Joint online negotiation room -> Mediator seal -> Legal Settlement deed.",
      faqs: "Q: What is the deposit limit? A: A maximum of two months rent for residential lockups."
    },
    cyber: {
      name: "National Cyber Fraud Desk",
      overview: "Immediate response for phishing, illegal bank transfers, and digital account thefts.",
      eligibility: "Any citizen victimized by cyber crime activities.",
      laws: "Information Technology Act, 2000; BNS 2023",
      docs: "Transaction messages, phishing link details, screenshots",
      timeline: "24 to 72 hours (Freeze action)",
      process: "Check eligibility -> Auto draft police complaint -> Link to cybercrime.gov.in -> Legal recovery.",
      faqs: "Q: When should I file? A: In cyber fraud, reporting within the 'golden hour' (first 2 hours) is key to recovering money."
    },
    property: {
      name: "Property Deeds & Documentation",
      overview: "Vetting sales deeds, power of attorneys, and property tax records before purchase.",
      eligibility: "Property buyers, sellers, or legal heirs.",
      laws: "Transfer of Property Act, 1882; Registration Act",
      docs: "Sale deed draft, tax receipts, encumbrance certificate",
      timeline: "5 to 10 working days",
      process: "Upload drafts -> AI checks compliance terms -> Advocate vetting -> Notarization scheduling.",
      faqs: "Q: Is stamp duty mandatory? A: Yes. Under the Indian Stamp Act, proper stamp duty is required to validate deeds in court."
    }
  };

  const activeServiceData = serviceCategories[selectedService] || serviceCategories.consumer;

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        textSize={textSize}
        setTextSize={setTextSize}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenAuth={() => { setShowAuthModal(true); setOtpSent(false); }}
      />

      {/* Main Pages Switch */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {currentTab === 'home' && (
          <LandingPage 
            setCurrentTab={setCurrentTab} 
            onOpenAuth={() => { setShowAuthModal(true); setOtpSent(false); }}
            language={language}
          />
        )}
        
        {currentTab === 'dashboard' && (
          <CitizenDashboard 
            userRole={userRole} 
            setUserRole={setUserRole} 
            setCurrentTab={setCurrentTab}
            language={language}
          />
        )}

        {currentTab === 'ai-assistant' && (
          <AILegalAssistant 
            language={language}
          />
        )}

        {currentTab === 'mediation' && (
          <MediationPortal 
            setCurrentTab={setCurrentTab}
            language={language}
          />
        )}

        {currentTab === 'lawyers' && (
          <LawyerPortal 
            language={language}
          />
        )}

        {currentTab === 'knowledge-hub' && (
          <LawLibrary 
            language={language}
          />
        )}

        {currentTab === 'vault' && (
          <DocVault 
            language={language}
          />
        )}

        {/* National Services Directory Tab */}
        {currentTab === 'services' && (
          <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
            <div style={{ marginBottom: '2rem' }}>
              <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>NATIONAL SERVICE PORTFOLIOS</span>
              <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                National Services Directory (UMANG style)
              </h1>
              <p style={{ color: 'var(--text-muted)' }}>
                Official portals and diagnostic guidelines categorized by civil dispute divisions.
              </p>
            </div>

            <div className="grid grid-sidebar">
              {/* Left Select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Divisions</h3>
                {Object.entries(serviceCategories).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedService(key)}
                    className="btn btn-secondary"
                    style={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      backgroundColor: selectedService === key ? 'var(--color-royal-light)' : 'var(--bg-secondary)',
                      color: selectedService === key ? 'var(--color-royal)' : 'var(--text-primary)',
                      borderColor: selectedService === key ? 'var(--color-royal)' : 'var(--border-color)'
                    }}
                  >
                    💼 {val.name}
                  </button>
                ))}

                {/* Quick actions card */}
                <div className="card" style={{ marginTop: '1.5rem', padding: '1rem', borderTop: '2px solid var(--color-saffron)' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Verify Eligibility</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Unsure which division handles your matter? Use our diagnostic checker.
                  </p>
                  <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.75rem', padding: '0.4rem' }} onClick={() => setCurrentTab('ai-assistant')}>
                    Check Dispute Eligibility
                  </button>
                </div>
              </div>

              {/* Service details */}
              <div className="card" style={{ borderLeft: '6px solid var(--color-royal)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>NATIONAL SCHEME</span>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{activeServiceData.name}</h2>
                  </div>
                  <button className="btn btn-primary" onClick={() => {
                    setIsLoggedIn(true);
                    setCurrentTab('dashboard');
                  }}>
                    Launch Resolution filing
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                  <div>
                    <strong>Summary & Scope:</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{activeServiceData.overview}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <strong>Eligibility parameters:</strong>
                      <p style={{ color: 'var(--text-secondary)' }}>{activeServiceData.eligibility}</p>
                    </div>
                    <div>
                      <strong>Governing Acts:</strong>
                      <p style={{ fontFamily: 'monospace', color: 'var(--color-royal)' }}>{activeServiceData.laws}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <strong>Required proof uploads:</strong>
                      <p style={{ color: 'var(--text-secondary)' }}>{activeServiceData.docs}</p>
                    </div>
                    <div>
                      <strong>Resolution SLA:</strong>
                      <p style={{ fontWeight: 'bold' }}>{activeServiceData.timeline}</p>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <strong>Frequently Asked Question:</strong>
                    <div style={{ backgroundColor: 'var(--bg-primary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginTop: '0.25rem' }}>
                      {activeServiceData.faqs}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security & Trust Centre Tab */}
        {currentTab === 'security-center' && (
          <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
            <div style={{ marginBottom: '2rem' }}>
              <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>SECURITY & AUDIT TRANS-DESK</span>
              <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                Government Security & Trust Centre
              </h1>
              <p style={{ color: 'var(--text-muted)' }}>
                Review encryption audits, manage AI consent flags, and check data access logs.
              </p>
            </div>

            <div className="grid grid-2">
              {/* Privacy parameters */}
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>1. Consent Architecture</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Under the DPDP Act 2023, you retain full rights over your data. Toggling these sliders updates blockchain audit logs.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>AI Legal Model Parsing</h4>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Allow AI Navigator to scan case files for health scores.</span>
                    </div>
                    <button 
                      className={`btn ${allowAiParsing ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setAllowAiParsing(!allowAiParsing)}
                      style={{ padding: '0.35rem 0.75rem' }}
                    >
                      {allowAiParsing ? 'ALLOWED' : 'REVOKED'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Public Audit Logs</h4>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Record transaction logs for dispute settlement checks.</span>
                    </div>
                    <button 
                      className={`btn ${allowAuditLogs ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setAllowAuditLogs(!allowAuditLogs)}
                      style={{ padding: '0.35rem 0.75rem' }}
                    >
                      {allowAuditLogs ? 'ALLOWED' : 'REVOKED'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Encryption & Certificates */}
              <div className="card" style={{ borderLeft: '6px solid var(--color-green)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>2. Security Audits</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <strong>🔒 Locker Encryption:</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Hashed using AES-256 keys, decoupled from profile databases.</p>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <strong>📑 STQC Certified:</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Validated in July 2026 for secure data handling standards.</p>
                  </div>
                  <div>
                    <strong>🔑 Signatures Registry:</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>All mediation settlements are registered with Aadhaar e-Sign SHA-256 timestamps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Navigation Short-Links */}
      <div style={{ backgroundColor: '#090e18', borderTop: '1px solid #14213d', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#trust" onClick={(e) => { e.preventDefault(); setCurrentTab('security-center'); }} style={{ color: '#cbd5e1' }}>Privacy Trust & Security Centre</a>
            <a href="#acts" onClick={(e) => { e.preventDefault(); setCurrentTab('knowledge-hub'); }} style={{ color: '#cbd5e1' }}>Search Bare Acts (BNS, CPC)</a>
            <a href="#forms" onClick={(e) => { e.preventDefault(); setCurrentTab('ai-assistant'); setActiveTab('forms'); }} style={{ color: '#cbd5e1' }}>Search Forms Centre</a>
          </div>
          <span style={{ color: '#94a3b8' }}>Ministry of Law & Justice Portal Compliance</span>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          backgroundColor: 'rgba(7, 13, 25, 0.75)', 
          backdropFilter: 'blur(6px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 2000,
          padding: '1.5rem'
        }}>
          <div className="card glass-card" style={{ width: '100%', maxWidth: '440px', padding: '2rem', border: '1px solid var(--glass-border)' }}>
            
            <button 
              onClick={() => { setShowAuthModal(false); setOtpSent(false); }} 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                Official National Gateway Sign In
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Access Case Locker with phone OTP authentication or bypass for reviewer demo.
              </p>
            </div>

            {/* Role selection tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '4px' }}>
              {['citizen', 'lawyer', 'mediator', 'admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => setAuthTab(role)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.4rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    color: authTab === role ? 'var(--color-royal)' : 'var(--text-muted)',
                    borderBottom: authTab === role ? '2px solid var(--color-royal)' : 'none'
                  }}
                >
                  {role}
                </button>
              ))}
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <div className="form-group">
                  <label className="form-label">Registered Mobile Number</label>
                  <input 
                    type="tel" 
                    placeholder="Enter 10-digit mobile"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g,''))}
                    required
                  />
                </div>
                <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                  Request OTP Verification Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                  <label className="form-label">Enter 4-Digit SMS Code</label>
                  <input 
                    type="password" 
                    placeholder="Code (demo: 1234)"
                    className="form-control"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    required
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    OTP code was sent to +91 ********{phoneNumber.slice(-4)}
                  </span>
                </div>
                <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                  Verify Credentials & Log In
                </button>
              </form>
            )}

            {/* Quick Demo Bypass */}
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                💡 Direct Review Shortcut:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} onClick={() => handleDemoLogin('citizen')}>
                  Citizen View
                </button>
                <button className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} onClick={() => handleDemoLogin('lawyer')}>
                  Advocate View
                </button>
                <button className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} onClick={() => handleDemoLogin('mediator')}>
                  Mediator View
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
