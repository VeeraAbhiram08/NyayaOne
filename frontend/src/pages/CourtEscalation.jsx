import React, { useState } from 'react';

export default function CourtEscalation({ language }) {
  const [isAssembled, setIsAssembled] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState('Adv. Meera Sen');

  const handleAssemble = () => {
    setIsAssembled(true);
  };

  const checklistItems = [
    { title: "Mediation Failure Report (Form 4)", description: "Certified by mediator Shreya Patil under Section 73 of the Conciliation Act.", ready: true },
    { title: "Chronological Dispute Timeline", description: "Step-by-step logging of notices, replies, and mediation summaries.", ready: true },
    { title: "Aadhaar Identity Verification Bundle", description: "Digitally signed identity proof package of the petitioner.", ready: true },
    { title: "Evidence Locker Bundle", description: "Consolidated PDF of receipts, emails, and rental lease agreement.", ready: false },
    { title: "Draft Civil Plaint / Complaint Copy", description: "Standard draft prepared based on consumer/rental templates.", ready: false }
  ];

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
      
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          ⚖️ Pre-Litigation Court Escalation
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Mediation unresolved? Automatically assemble your evidence package, timeline logs, and mediator reports to refer directly to a lawyer or file in District Court.
        </p>
      </div>

      {/* Warning Box */}
      <div className="card" style={{ borderLeft: '4px solid var(--color-amber)', backgroundColor: 'var(--color-amber-light)', marginBottom: '2rem', padding: '1.25rem' }}>
        <h4 style={{ color: 'var(--color-amber)', marginBottom: '0.25rem' }}>⚠️ Important Litigation Notice</h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Escalating to court requires compliance with Section 80 of the Civil Procedure Code (CPC). Our platform helps bundle files to reduce advocate workload and expedite proceedings, but does not file the case directly with the Registrar of the Court.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-2">
        
        {/* Package Preparation Control */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            1. Package Generator
          </h3>

          <div className="form-group">
            <label className="form-label">Associated Active Case</label>
            <select className="form-control" defaultValue="rental">
              <option value="rental">Rental Dispute - Ref #NY-2026-8812</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Referral Attorney</label>
            <select 
              className="form-control" 
              value={selectedLawyer}
              onChange={(e) => setSelectedLawyer(e.target.value)}
            >
              <option value="Adv. Meera Sen">Adv. Meera Sen (Property / Rental Expert)</option>
              <option value="Adv. Aditya Verma">Adv. Aditya Verma (Cyber Law Specialist)</option>
            </select>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button 
              className="btn btn-primary" 
              onClick={handleAssemble}
              style={{ width: '100%', padding: '0.75rem' }}
              disabled={isAssembled}
            >
              💼 Compile Evidence & Document Bundle
            </button>
          </div>

          {isAssembled && (
            <div className="badge badge-success" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.5rem' }}>
              ✓ Case Bundle Generated successfully
            </div>
          )}
        </div>

        {/* Assembly Status & Checklist */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>2. Court Filing Checklist</span>
            {isAssembled && (
              <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Ready for Export</span>
            )}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {checklistItems.map((item, idx) => {
              const statusLabel = isAssembled || item.ready ? '✓ READY' : '⏳ PENDING';
              const statusClass = isAssembled || item.ready ? 'badge-success' : 'badge-warning';
              return (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div style={{ maxWidth: '75%' }}>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.description}</p>
                  </div>
                  <span className={`badge ${statusClass}`} style={{ fontSize: '0.65rem' }}>
                    {statusLabel}
                  </span>
                </div>
              );
            })}
          </div>

          {isAssembled && (
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1, fontSize: '0.8rem' }}
                onClick={() => {
                  alert('Downloading NyayaOne_Court_Package_NY-2026-8812.zip (Contains PDFs of: lease, rent notice, timeline logs, mediation decree)');
                }}
              >
                📥 Download ZIP Bundle
              </button>
              <button 
                className="btn btn-outline" 
                style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}
                onClick={() => {
                  alert(`Case folder referred to ${selectedLawyer}. They will contact you shortly.`);
                }}
              >
                📧 Refer to Attorney
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
