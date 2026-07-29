import React, { useState } from 'react';

export default function AILegalAssistant({ language }) {
  const [activeTab, setActiveTab] = useState('chat'); // chat, checker, forms
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste. Welcome to the National AI Legal Navigator. I can answer questions on the new Bharatiya Nyaya Sanhita (BNS) 2023, explain legal acts, review documents, and locate courts/police stations. Please select your query language or ask below.',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Eligibility Checker States
  const [checkerStep, setCheckerStep] = useState(1);
  const [checkerAnswers, setCheckerAnswers] = useState({
    disputeType: 'rental',
    hasAgreement: 'yes',
    claimValue: '50000',
    attemptedTalk: 'yes'
  });
  const [checkerResult, setCheckerResult] = useState(null);

  // Forms Library States
  const [formsSearch, setFormsSearch] = useState('');
  const [selectedFormId, setSelectedFormId] = useState('rental');

  const formsList = [
    { id: 'rental', name: 'Residential Rental Agreement', category: 'Property', docs: 'Proof of ownership, ID proofs of both parties', instructions: 'Draft on non-judicial stamp paper of appropriate value. Must be signed by two witnesses.' },
    { id: 'rti', name: 'RTI Application Form (Right to Information)', category: 'Government', docs: 'Aadhaar Card copy', instructions: 'File with the Public Information Officer (PIO) of the concerned department. Fee of ₹10 required.' },
    { id: 'consumer', name: 'Consumer Grievance Complaint Copy', category: 'Consumer', docs: 'Product Invoice, payment receipts, correspondence log', instructions: 'File in District Commission if claim is up to ₹50 Lakhs. Can be filed online via e-Daakhil.' },
    { id: 'affidavit', name: 'General Declaration Affidavit', category: 'General', docs: 'Identity proof, address proof', instructions: 'Declare truths under oath. Must be notarized by a verified notary officer.' },
    { id: 'will', name: 'Last Will and Testament Draft', category: 'Estate', docs: 'Asset register, list of beneficiaries', instructions: 'Must be signed in the presence of at least two witnesses. Registration is optional but recommended.' }
  ];

  const handleStartVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInputText("What are my rights if my landlord keeps my security deposit?");
      alert("Voice simulation complete: Captured query successfully!");
    }, 2000);
  };

  const handleSendMessage = (customText) => {
    const text = customText || inputText;
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text, time: 'Just now' }];
    setMessages(newMsgs);
    setInputText('');

    setTimeout(() => {
      let aiResponse = "Query recorded. Under Indian Law, civil disputes should be attempted via mediation first. ";
      const txt = text.toLowerCase();
      if (txt.includes('landlord') || txt.includes('security') || txt.includes('deposit')) {
        aiResponse = "Under the Model Tenancy Act, 2021, the landlord must refund the security deposit within one month of the tenant vacating and handing over vacant possession. Deductions can only be made for structural damages, not regular wear and tear. You can file a complaint with the Rent Authority.";
      } else if (txt.includes('cyber') || txt.includes('scam') || txt.includes('bank')) {
        aiResponse = "Immediate action: File a complaint on cybercrime.gov.in or call national helpline 1930. Under BNS 2023, cyber financial frauds are prosecuted under Section 318 (Cheating). Report to your bank within 3 hours to invoke zero-liability guidelines.";
      } else if (txt.includes('court') || txt.includes('police')) {
        aiResponse = "To locate your nearest District Court or Police Station, select the State Directory on the Homepage map, or search on the e-Courts portal. Free legal representation can be accessed via DSLSA/KSLSA desks.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse, time: 'Just now' }]);
    }, 800);
  };

  const runEligibilityChecker = () => {
    // Basic rules engine simulation
    let solvedOnline = false;
    let path = 'Court Litigation / Advocate Consultation';
    let confidence = 70;
    let timeline = '6 to 18 months';

    if (checkerAnswers.disputeType === 'rental' || checkerAnswers.disputeType === 'consumer') {
      if (checkerAnswers.hasAgreement === 'yes') {
        solvedOnline = true;
        path = 'Online Pre-Litigation Mediation Registry';
        confidence = 92;
        timeline = '15 to 30 working days';
      }
    } else if (checkerAnswers.disputeType === 'cyber') {
      path = 'National Cyber Crime Desk & Police FIR';
      confidence = 85;
      timeline = '24 to 72 hours (for bank account freeze)';
    }

    setCheckerResult({
      solvedOnline,
      path,
      confidence,
      timeline,
      laws: checkerAnswers.disputeType === 'rental' ? 'Model Tenancy Act, 2021 (Section 30)' : checkerAnswers.disputeType === 'cyber' ? 'IT Act 2000 (Section 66D)' : 'Consumer Protection Act, 2019',
      docs: checkerAnswers.disputeType === 'rental' ? 'Lease deed, security deposit receipts, notice letters' : 'Bank transaction record, scam screenshots'
    });
  };

  const filteredForms = formsList.filter(f => 
    f.name.toLowerCase().includes(formsSearch.toLowerCase()) ||
    f.category.toLowerCase().includes(formsSearch.toLowerCase())
  );

  const selectedForm = formsList.find(f => f.id === selectedFormId) || formsList[0];

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>MINISTRY OF JUSTICE AI ASSISTANT</span>
        <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
          National AI Legal Navigator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Authoritative legal helper to check eligibility, draft forms, explain citizen rights, and draft formal pre-litigation notices.
        </p>
      </div>

      {/* Tabs */}
      <div className="tab-list" style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('chat')} 
          className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
        >
          💬 Ask AI Navigator
        </button>
        <button 
          onClick={() => setActiveTab('checker')} 
          className={`tab-btn ${activeTab === 'checker' ? 'active' : ''}`}
        >
          ⚖️ Smart Eligibility Checker
        </button>
        <button 
          onClick={() => setActiveTab('forms')} 
          className={`tab-btn ${activeTab === 'forms' ? 'active' : ''}`}
        >
          📁 National Forms Centre
        </button>
      </div>

      {/* View 1: Conversational Chat */}
      {activeTab === 'chat' && (
        <div className="grid grid-sidebar">
          
          {/* Quick Prompts Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card">
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Suggested Queries</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  "Explain tenant security deposit rules",
                  "What is BNS punishment for cyber scams?",
                  "Where do I find nearest legal aid desk?"
                ].map((prompt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.75rem', textAlign: 'left', justifyContent: 'flex-start', padding: '0.5rem' }}
                  >
                    💡 {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--color-saffron)' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--color-saffron)', marginBottom: '0.25rem' }}>Multi-Language Speech</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                You can talk to the navigator in 12 languages. Click the microphone icon to record.
              </p>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="card" style={{ height: '520px', display: 'flex', flexDirection: 'column', padding: '1.25rem' }}>
            {/* Message log */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1rem' }}>
              {messages.map((m, i) => {
                const isAi = m.sender === 'ai';
                return (
                  <div 
                    key={i}
                    style={{ 
                      alignSelf: isAi ? 'flex-start' : 'flex-end',
                      maxWidth: '80%',
                      backgroundColor: isAi ? 'var(--bg-tertiary)' : 'var(--color-royal-light)',
                      border: isAi ? '1px solid var(--border-color)' : '1px solid rgba(24, 76, 138, 0.15)',
                      padding: '0.75rem 1rem',
                      borderRadius: isAi ? '0 var(--radius-lg) var(--radius-lg) var(--radius-lg)' : 'var(--radius-lg) 0 var(--radius-lg) var(--radius-lg)'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{m.text}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.25rem' }}>{m.time}</div>
                  </div>
                );
              })}
            </div>

            {/* Input Controls */}
            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <button 
                className={`btn ${isListening ? 'btn-primary' : 'btn-secondary'}`}
                onClick={handleStartVoice}
                style={{ padding: '0.5rem', width: '38px', height: '38px', borderRadius: '50%' }}
                title="Speak to AI Assistant"
              >
                🎙️
              </button>
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about BNS codes, tenancy deposits, consumer commission rules..."
                className="form-control"
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary" onClick={() => handleSendMessage()}>
                Send
              </button>
            </div>

            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
              ⚖️ AI Legal Navigator advice is informational only and is not a substitute for professional legal representation.
            </div>
          </div>

        </div>
      )}

      {/* View 2: Eligibility Checker Wizard */}
      {activeTab === 'checker' && (
        <div className="grid grid-2">
          
          {/* Question panel */}
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Dispute Diagnostic Wizard
            </h3>

            {checkerStep === 1 && (
              <div>
                <div className="form-group">
                  <label className="form-label">What is the category of your dispute?</label>
                  <select 
                    value={checkerAnswers.disputeType}
                    onChange={(e) => setCheckerAnswers({ ...checkerAnswers, disputeType: e.target.value })}
                    className="form-control"
                  >
                    <option value="rental">Rental / Tenancy Dispute</option>
                    <option value="consumer">Consumer Protection Grievance</option>
                    <option value="cyber">Cyber Online Financial Fraud</option>
                    <option value="family">Family / Separation Settlement</option>
                  </select>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setCheckerStep(2)}>
                  Next Step
                </button>
              </div>
            )}

            {checkerStep === 2 && (
              <div>
                <div className="form-group">
                  <label className="form-label">Do you have a written agreement or transaction invoices?</label>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="hasAgreement" 
                        value="yes"
                        checked={checkerAnswers.hasAgreement === 'yes'}
                        onChange={(e) => setCheckerAnswers({ ...checkerAnswers, hasAgreement: e.target.value })}
                      /> Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="hasAgreement" 
                        value="no"
                        checked={checkerAnswers.hasAgreement === 'no'}
                        onChange={(e) => setCheckerAnswers({ ...checkerAnswers, hasAgreement: e.target.value })}
                      /> No
                    </label>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="form-label">Estimated Financial Claim Value (₹)</label>
                  <input 
                    type="number"
                    className="form-control"
                    value={checkerAnswers.claimValue}
                    onChange={(e) => setCheckerAnswers({ ...checkerAnswers, claimValue: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setCheckerStep(1)}>
                    Back
                  </button>
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setCheckerStep(3); runEligibilityChecker(); }}>
                    Run Diagnostics
                  </button>
                </div>
              </div>
            )}

            {checkerStep === 3 && (
              <div>
                <h4 style={{ color: 'var(--color-green)', marginBottom: '1rem' }}>✓ Diagnostic Run Completed</h4>
                <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setCheckerStep(1)}>
                  Restart Diagnostic Test
                </button>
              </div>
            )}
          </div>

          {/* Results Output */}
          <div className="card" style={{ borderLeft: '6px solid var(--color-royal)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Diagnostic Path Outcome
            </h3>

            {checkerResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <strong>Can resolve online?</strong>
                  <span className="badge badge-success">{checkerResult.solvedOnline ? 'YES' : 'NO'}</span>
                </div>
                
                <div>
                  <strong>Recommended Dispute Pathway:</strong>
                  <p style={{ color: 'var(--color-royal)', fontWeight: 'bold', fontSize: '0.95rem', marginTop: '0.15rem' }}>{checkerResult.path}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <strong>Est. Resolution Timeline:</strong>
                    <div style={{ fontWeight: 600 }}>{checkerResult.timeline}</div>
                  </div>
                  <div>
                    <strong>Diagnostic Match Score:</strong>
                    <div style={{ color: 'var(--color-green)', fontWeight: 'bold' }}>{checkerResult.confidence}% confidence</div>
                  </div>
                </div>

                <div>
                  <strong>Applicable Legal Act:</strong>
                  <p style={{ fontFamily: 'monospace' }}>{checkerResult.laws}</p>
                </div>

                <div>
                  <strong>Required Document Checklist:</strong>
                  <p style={{ color: 'var(--text-muted)' }}>{checkerResult.docs}</p>
                </div>

                <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setCurrentTab('dashboard')}>
                  File Dispute in Locker Workspace
                </button>
              </div>
            ) : (
              <div className="flex-center" style={{ height: '220px', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <div>
                  <span style={{ fontSize: '2.5rem' }}>⚖️</span>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Awaiting Diagnostic Run</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fill out questions on the left and click "Run Diagnostics" to find appropriate legal forums.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* View 3: National Forms Library */}
      {activeTab === 'forms' && (
        <div className="grid grid-sidebar">
          
          {/* Sidebar Select */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Forms Directory</h3>
            
            <div className="card" style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span>🔍</span>
              <input 
                type="text" 
                placeholder="Search templates..."
                value={formsSearch}
                onChange={(e) => setFormsSearch(e.target.value)}
                className="form-control"
                style={{ flex: 1, border: 'none', padding: '0.2rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
              {filteredForms.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFormId(f.id)}
                  className="btn btn-secondary"
                  style={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    fontSize: '0.8rem',
                    backgroundColor: selectedFormId === f.id ? 'var(--color-royal-light)' : 'var(--bg-secondary)',
                    color: selectedFormId === f.id ? 'var(--color-royal)' : 'var(--text-primary)',
                    borderColor: selectedFormId === f.id ? 'var(--color-royal)' : 'var(--border-color)'
                  }}
                >
                  📝 {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Form preview details */}
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              {selectedForm.name}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <div>
                <strong>Locker Category:</strong>
                <span className="badge badge-info" style={{ marginLeft: '0.5rem' }}>{selectedForm.category} Services</span>
              </div>

              <div>
                <strong>Drafting Instructions:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{selectedForm.instructions}</p>
              </div>

              <div>
                <strong>Mandatory Documents checklist:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>{selectedForm.docs}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  alert(`Opening online custom wizard for ${selectedForm.name}...`);
                }}
              >
                ⚡ Generate online
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  alert(`Downloading official PDF template for ${selectedForm.name}...`);
                }}
              >
                📥 Download PDF Template
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center', borderRadius: 'var(--radius-sm)' }}>
        ⚖️ <strong>Legal Information Policy:</strong> Answers and drafted notice bundles provided by the AI Legal Navigator are generated based on digitized statutes and are not enforceable without sign-offs from registered advocates or notary authorities under the Advocates Act, 1961.
      </div>

    </div>
  );
}
