import React, { useState } from 'react';

export default function CitizenDashboard({ 
  userRole, 
  setUserRole, 
  setCurrentTab, 
  language 
}) {
  const [selectedCaseId, setSelectedCaseId] = useState('case-1');
  const [activeMenu, setActiveMenu] = useState('cases'); // cases, locker, feedback, calendar, notifications
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState('survey');
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  const [cases, setCases] = useState([
    {
      id: 'case-1',
      title: 'Rental Dispute - 4B, Greenwood Apts',
      category: 'Rental Disputes',
      status: 'Mediation Active',
      statusColor: 'var(--color-amber)',
      refNum: 'NY-2026-8812',
      respondent: 'Mr. Rajesh Sharma (Landlord)',
      dateCreated: '12 July 2026',
      milestone: 4, // Issue Reported(0) -> Docs(1) -> AI Review(2) -> Guidance(3) -> Mediation(4) -> Lawyer(5) -> Escalation(6) -> Resolution(7)
      healthScore: {
        readiness: 78,
        docScore: 80,
        evidenceScore: 75,
        missingDocs: ["Rent Receipt for June 2026", "Aadhaar e-Sign authorization"],
        settlementProbability: "High (82%)",
        complexity: "Medium",
        timeline: "12 days",
        suggestions: ["Upload the pending rent receipts to increase the health score above 90%", "Coordinate with the mediator for scheduling the joint meeting slot"]
      },
      updates: [
        { date: "28 July", desc: "Mediator Shreya Patil invited landlord Rajesh Sharma to the portal." },
        { date: "24 July", desc: "AI Legal Navigator assessed documentation and generated Rental Plaint Draft." }
      ]
    },
    {
      id: 'case-2',
      title: 'Defective Laptop Refund - Alpha Tech',
      category: 'Consumer Complaints',
      status: 'Settled & Resolved',
      statusColor: 'var(--color-green)',
      refNum: 'NY-2026-4409',
      respondent: 'Alpha Retail Private Ltd',
      dateCreated: '20 June 2026',
      milestone: 7,
      healthScore: {
        readiness: 100,
        docScore: 100,
        evidenceScore: 100,
        missingDocs: [],
        settlementProbability: "Completed",
        complexity: "Low",
        timeline: "Resolved",
        suggestions: ["Download your signed settlement decree and save to Legal Locker."]
      },
      updates: [
        { date: "30 June", desc: "Digital settlement agreement signed by both parties and mediator." }
      ]
    }
  ]);

  const activeCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackText('');
      setRating(5);
    }, 4000);
  };

  const journeySteps = [
    "Issue Reported",
    "Document Upload",
    "AI Review",
    "Legal Guidance",
    "Mediation",
    "Lawyer Consultation",
    "Court Escalation",
    "Resolution"
  ];

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
      
      {/* GoI Dashboard Header */}
      <div className="card" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '3px solid var(--color-saffron)' }}>
        <div>
          <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>E-GOVERNANCE WORKSPACE</span>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            National Citizen Legal Dashboard
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Connected Profile: <strong style={{ color: 'var(--color-royal)' }}>{userRole.toUpperCase()}</strong> | Aadhaar KYC verified
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Portal View Switcher:</span>
          <select 
            value={userRole} 
            onChange={(e) => setUserRole(e.target.value)}
            className="form-control"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
          >
            <option value="citizen">Citizen Portal</option>
            <option value="lawyer">Vetted Advocate Portal</option>
            <option value="mediator">Registered Mediator Portal</option>
            <option value="admin">Platform Administrator View</option>
          </select>
        </div>
      </div>

      {/* Main Grid Sidebar layout */}
      <div className="grid grid-sidebar">
        
        {/* Left Side: National Service Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Locker Services</h3>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveMenu('cases')} 
            style={{ 
              justifyContent: 'flex-start',
              backgroundColor: activeMenu === 'cases' ? 'var(--color-royal-light)' : 'var(--bg-secondary)',
              color: activeMenu === 'cases' ? 'var(--color-royal)' : 'var(--text-primary)',
              borderColor: activeMenu === 'cases' ? 'var(--color-royal)' : 'var(--border-color)'
            }}
          >
            📂 My Cases & Status
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => setCurrentTab('vault')} 
            style={{ justifyInter: 'flex-start', justifyContent: 'flex-start' }}
          >
            🔒 My Legal Locker (DigiLocker)
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveMenu('notifications')} 
            style={{ 
              justifyContent: 'flex-start',
              backgroundColor: activeMenu === 'notifications' ? 'var(--color-royal-light)' : 'var(--bg-secondary)',
              color: activeMenu === 'notifications' ? 'var(--color-royal)' : 'var(--text-primary)',
              borderColor: activeMenu === 'notifications' ? 'var(--color-royal)' : 'var(--border-color)'
            }}
          >
            🔔 Government Notices & Alerts
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveMenu('feedback')} 
            style={{ 
              justifyContent: 'flex-start',
              backgroundColor: activeMenu === 'feedback' ? 'var(--color-royal-light)' : 'var(--bg-secondary)',
              color: activeMenu === 'feedback' ? 'var(--color-royal)' : 'var(--text-primary)',
              borderColor: activeMenu === 'feedback' ? 'var(--color-royal)' : 'var(--border-color)'
            }}
          >
            📝 Citizen Feedback & Grievances
          </button>

          {/* Quick Stats Panel */}
          <div className="card" style={{ marginTop: '1.5rem', padding: '1rem', borderTop: '2px solid var(--color-green)' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Platform Activity</h4>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div>• Active Matters: <strong>{cases.filter(c=>!c.status.includes('Resolved')).length}</strong></div>
              <div>• Pending Task Items: <strong>{activeCase.healthScore.missingDocs.length + 1}</strong></div>
              <div>• Free Legal Aid Bookings: <strong>1</strong></div>
            </div>
          </div>
        </div>

        {/* Right Side Work Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Active Cases View */}
          {activeMenu === 'cases' && (
            <>
              {/* Select Case Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>My Active Legal Filings</h3>
                <select 
                  value={selectedCaseId} 
                  onChange={(e) => setSelectedCaseId(e.target.value)} 
                  className="form-control"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                >
                  {cases.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              {/* Case Summary Card */}
              <div className="card" style={{ borderLeft: `6px solid ${activeCase.statusColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div>
                    <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{activeCase.category}</span>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{activeCase.title}</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Filing Reference</div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-primary)' }}>{activeCase.refNum}</div>
                  </div>
                </div>

                {/* AI Case Health Scorecard */}
                <div style={{ 
                  backgroundColor: 'var(--color-royal-light)', 
                  border: '1px solid rgba(24, 76, 138, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-royal)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>⚡ AI Case Readiness & Health Score</span>
                    <strong>{activeCase.healthScore.readiness}% Readiness</strong>
                  </h4>
                  
                  <div className="health-meter-wrap">
                    <div className="health-bar-bg">
                      <div className="health-bar-fill" style={{ width: `${activeCase.healthScore.readiness}%`, backgroundColor: activeCase.healthScore.readiness > 80 ? 'var(--color-green)' : 'var(--color-amber)' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem', marginTop: '0.75rem', fontSize: '0.75rem' }} className="grid-4">
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Documentation:</span>
                      <div style={{ fontWeight: 'bold' }}>{activeCase.healthScore.docScore}%</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Evidence status:</span>
                      <div style={{ fontWeight: 'bold' }}>{activeCase.healthScore.evidenceScore}%</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Settlement Probability:</span>
                      <div style={{ fontWeight: 'bold', color: 'var(--color-green)' }}>{activeCase.healthScore.settlementProbability}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Complexity:</span>
                      <div style={{ fontWeight: 'bold' }}>{activeCase.healthScore.complexity}</div>
                    </div>
                  </div>

                  {activeCase.healthScore.missingDocs.length > 0 && (
                    <div style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(24, 76, 138, 0.1)', paddingTop: '0.5rem', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--color-red)', fontWeight: 'bold' }}>⚠️ Missing Files Detected: </span>
                      {activeCase.healthScore.missingDocs.join(', ')}
                    </div>
                  )}
                </div>

                {/* Legal Journey Timeline */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>National ODR Journey Roadmap</h4>
                  <div className="journey-timeline">
                    {journeySteps.map((step, idx) => {
                      let stepStatusClass = '';
                      if (idx < activeCase.milestone) stepStatusClass = 'completed';
                      else if (idx === activeCase.milestone) stepStatusClass = 'active';
                      return (
                        <div key={idx} className={`journey-step ${stepStatusClass}`}>
                          <span style={{ 
                            fontSize: '0.85rem', 
                            fontWeight: idx === activeCase.milestone ? 700 : 550, 
                            color: idx === activeCase.milestone ? 'var(--color-royal)' : 'var(--text-primary)' 
                          }}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Suggestions Panel */}
              <div className="card card-green">
                <h3 style={{ fontSize: '1rem', color: 'var(--color-green)', marginBottom: '0.75rem' }}>📋 Suggestions to Improve Readiness</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                  {activeCase.healthScore.suggestions.map((sug, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.5rem' }}>
                      <span>✓</span>
                      <p>{sug}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Notifications / Notices View */}
          {activeMenu === 'notifications' && (
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                🔔 Government Notices & Alerts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-red)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    <span>Sender: Ministry of Law & Justice</span>
                    <span>29 July 2026</span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Mediation Notice Issued: Ref #NY-2026-8812</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Landlord Rajesh Sharma has been notified to attend the digital mediation session on July 30th. Please verify your KYC before the session.
                  </p>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-green)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    <span>Sender: National Digital Locker Registry</span>
                    <span>22 July 2026</span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Aadhaar e-Sign Completed</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Your identity document Aadhaar_Card_Verified.pdf has been signed with digital OTP authorization.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Grievance & Feedback View */}
          {activeMenu === 'feedback' && (
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                📝 Citizen Feedback & Grievance Centre
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Your feedback goes directly to the ODR Grievance Monitoring Desk. Help us improve legal accessibility.
              </p>

              {feedbackSubmitted ? (
                <div className="badge badge-success" style={{ width: '100%', justifyContent: 'center', padding: '1.5rem', display: 'block', textAlign: 'center' }}>
                  <strong>✓ Grievance / Feedback Filed Successfully!</strong>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.35rem' }}>Thank you. Your feedback token #FB-2026-9012 has been recorded for review.</div>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit}>
                  <div className="form-group">
                    <label className="form-label">Submission Category</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button 
                        type="button" 
                        className={`btn ${feedbackType === 'survey' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFeedbackType('survey')}
                        style={{ fontSize: '0.75rem', padding: '0.4rem' }}
                      >
                        📊 Satisfaction Survey
                      </button>
                      <button 
                        type="button" 
                        className={`btn ${feedbackType === 'bug' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFeedbackType('bug')}
                        style={{ fontSize: '0.75rem', padding: '0.4rem' }}
                      >
                        🐛 Report Platform Bug
                      </button>
                      <button 
                        type="button" 
                        className={`btn ${feedbackType === 'feature' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFeedbackType('feature')}
                        style={{ fontSize: '0.75rem', padding: '0.4rem' }}
                      >
                        💡 Suggest Feature
                      </button>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="form-label">Satisfaction Rating (1 to 5 Stars)</label>
                    <select 
                      value={rating} 
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="form-control"
                      style={{ maxWidth: '120px' }}
                    >
                      <option value="5">★★★★★ (5)</option>
                      <option value="4">★★★★☆ (4)</option>
                      <option value="3">★★★☆☆ (3)</option>
                      <option value="2">★★☆☆☆ (2)</option>
                      <option value="1">★☆☆☆☆ (1)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Explain your grievance or suggestions</label>
                    <textarea 
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="form-control"
                      rows="4"
                      placeholder="Detail your feedback, feature request, or mediation complaint..."
                      required
                    />
                  </div>

                  <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                    Submit Official Grievance Draft
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
