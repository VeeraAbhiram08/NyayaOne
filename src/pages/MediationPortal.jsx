import React, { useState } from 'react';

export default function MediationPortal({ setCurrentTab, language }) {
  const [messages, setMessages] = useState([
    { sender: 'Mediator (Shreya Patil)', text: 'Welcome both parties. Let us review the draft clause regarding the security deposit refund amount.', time: '10:05 AM' },
    { sender: 'You (Tenant)', text: 'I agree to settle for ₹40,000 if it is paid within 7 days, instead of the original ₹50,000.', time: '10:07 AM' },
    { sender: 'Respondent (Rajesh Sharma)', text: 'I can pay ₹40,000, but I need 10 days to arrange the cash transfer.', time: '10:09 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [signatures, setSignatures] = useState({
    tenant: false,
    respondent: false,
    mediator: false
  });

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: 'You (Tenant)', text: inputText, time: 'Just now' }]);
    setInputText('');

    // Mock respondent agreement
    if (inputText.toLowerCase().includes('ok') || inputText.toLowerCase().includes('agree') || inputText.toLowerCase().includes('days')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'Mediator (Shreya Patil)',
          text: 'Excellent. Both parties seem to agree on the terms. I have updated the draft settlement deed. Please check the signing panel below.',
          time: 'Just now'
        }]);
      }, 1000);
    }
  };

  const handleSign = (role) => {
    setSignatures({ ...signatures, [role]: !signatures[role] });
  };

  const allSigned = signatures.tenant && signatures.respondent && signatures.mediator;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            🤝 Mediation Workspace
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Alternative Dispute Resolution Workspace (Ref Case: #NY-2026-8812)
          </p>
        </div>
        <div>
          <span className="badge badge-warning" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
            Mediation Active
          </span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        
        {/* Left Side: Video Call and Group Chat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Mock Video Meeting Room */}
          <div className="card" style={{ padding: '1.25rem', backgroundColor: '#090d16', color: 'white', borderColor: '#1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isVideoActive ? '#10b981' : '#64748b' }} />
                Video Meeting Room #3
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Session Length: 42:10 mins</span>
            </div>

            {isVideoActive ? (
              <div style={{ position: 'relative', height: '280px', backgroundColor: '#1e293b', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle, #3b82f6 0%, transparent 80%)' }} />
                
                {/* Visual Camera representation */}
                <div style={{ textAlign: 'center', zIndex: 1 }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-royal)' }}>
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  <h4 style={{ color: 'white', marginTop: '0.75rem', fontSize: '0.9rem' }}>Secure Mediation Link Active</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Camera & Microphones are encrypted end-to-end</p>
                </div>

                {/* Sub-view thumbnails */}
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '90px', height: '65px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>
                  You (Muted)
                </div>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '90px', height: '65px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>
                  Mediator
                </div>
              </div>
            ) : (
              <div style={{ height: '280px', backgroundColor: '#111827', borderRadius: 'var(--radius-lg)', display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', border: '1px dashed #334155' }}>
                <span style={{ fontSize: '2.5rem' }}>📹</span>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: 'white', fontSize: '0.9rem' }}>Mediation Call has Started</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Mediator Shreya Patil and Rajesh Sharma are present.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsVideoActive(true)}>
                  Join Video Session
                </button>
              </div>
            )}

            {/* Controls Bar */}
            {isVideoActive && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                <button className="btn btn-secondary" style={{ backgroundColor: '#1e293b', border: 'none', color: 'white', padding: '0.5rem' }}>
                  🎤 Mute
                </button>
                <button className="btn btn-secondary" style={{ backgroundColor: '#1e293b', border: 'none', color: 'white', padding: '0.5rem' }}>
                  📷 Stop Video
                </button>
                <button className="btn btn-secondary" style={{ backgroundColor: '#1e293b', border: 'none', color: 'white', padding: '0.5rem' }}>
                  🖥️ Share Screen
                </button>
                <button className="btn btn-primary" style={{ backgroundColor: '#ef4444', padding: '0.5rem 1rem' }} onClick={() => setIsVideoActive(false)}>
                  Leave Call
                </button>
              </div>
            )}
          </div>

          {/* Mediation Joint Chat Room */}
          <div className="card" style={{ height: '360px', display: 'flex', flexDirection: 'column', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              💬 Joint Negotiation Chat
            </h3>
            
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '0.75rem' }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <strong style={{ fontSize: '0.8rem', color: m.sender.startsWith('Mediator') ? 'var(--color-saffron)' : 'var(--text-primary)' }}>
                      {m.sender}
                    </strong>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{m.time}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.text}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a proposal or query to resolve the conflict..."
                className="form-control"
                style={{ flex: 1, fontSize: '0.85rem' }}
              />
              <button className="btn btn-primary" onClick={handleSendMessage} style={{ padding: '0.5rem 1rem' }}>
                Send
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Settlement Signature Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              📜 Settlement Agreement
            </h3>
            
            <div style={{ 
              flex: 1, 
              backgroundColor: '#fafaf9', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.25rem 1rem', 
              fontSize: '0.75rem', 
              lineHeight: '1.4',
              color: '#3f3f46',
              overflowY: 'auto',
              maxHeight: '380px',
              fontFamily: 'serif'
            }}>
              <h4 style={{ textAlign: 'center', marginBottom: '0.5rem', fontWeight: 'bold' }}>DEED OF SETTLEMENT</h4>
              <p>Under Section 73 of the Arbitration and Conciliation Act, 1996.</p>
              <br />
              <p><strong>FIRST PARTY (Disputant):</strong> Abhiram Krishnan</p>
              <p><strong>SECOND PARTY (Respondent):</strong> Rajesh Sharma</p>
              <br />
              <p>Both parties agree to settle all active matters regarding rental premises Flat 4B, Greenwood Apartments under the following terms:</p>
              <br />
              <p>1. The Respondent agrees to pay a lump sum settlement amount of <strong>₹40,000</strong> to the Disputant within 10 days of signing this deed.</p>
              <p>2. The Disputant agrees that this refund settles all current deposit disputes, and they shall hand over possession vacantly.</p>
              <p>3. Both parties agree that this settlement is legally binding under the laws of India and cannot be appealed once signed.</p>
              <br />
              <p>Signed and sealed by Mediator Shreya Patil.</p>
            </div>

            {/* Signature Panel */}
            <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Signatures Required</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem' }}>Tenant (You)</span>
                  <button 
                    onClick={() => handleSign('tenant')} 
                    className={`btn ${signatures.tenant ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    {signatures.tenant ? '✍️ Signed' : 'Sign Draft'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem' }}>Landlord (R. Sharma)</span>
                  <button 
                    onClick={() => handleSign('respondent')} 
                    className={`btn ${signatures.respondent ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    {signatures.respondent ? '✍️ Signed' : 'Sign Draft'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem' }}>Mediator (S. Patil)</span>
                  <button 
                    onClick={() => handleSign('mediator')} 
                    className={`btn ${signatures.mediator ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    {signatures.mediator ? '✍️ Signed' : 'Affix Seal'}
                  </button>
                </div>
              </div>

              {allSigned ? (
                <div className="badge badge-success" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.5rem' }}>
                  ✓ Settlement Completed & Sealed
                </div>
              ) : (
                <div className="badge badge-warning" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.5rem' }}>
                  Awaiting All Signatures
                </div>
              )}
            </div>

            {/* Escalation Options */}
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                onClick={() => setCurrentTab('services')} 
                className="btn btn-secondary" 
                style={{ fontSize: '0.8rem', width: '100%' }}
                disabled={allSigned}
              >
                ⚠️ Escalate Dispute to Lawyer
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
