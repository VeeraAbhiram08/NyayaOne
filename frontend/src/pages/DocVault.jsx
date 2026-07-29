import React, { useState } from 'react';

export default function DocVault({ language }) {
  const [activeFolder, setActiveFolder] = useState('all');
  const [selectedFileId, setSelectedFileId] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const [files, setFiles] = useState([
    { 
      id: 1, 
      name: 'Aadhaar_Card_Verified.pdf', 
      size: '1.2 MB', 
      date: '12 July 2026', 
      folder: 'identity', 
      tag: 'KYC',
      versions: [
        { version: 'v1.1', action: 'Identity verified with Aadhaar OTP', date: '13 July 2026' },
        { version: 'v1.0', action: 'Document uploaded by citizen', date: '12 July 2026' }
      ],
      sharing: { mediator: true, advocate: true, respondent: false }
    },
    { 
      id: 2, 
      name: 'Lease_Agreement_Greenwood.pdf', 
      size: '4.8 MB', 
      date: '12 July 2026', 
      folder: 'contracts', 
      tag: 'Agreement',
      versions: [
        { version: 'v1.2', action: 'Deed certified by Mediator Shreya Patil', date: '15 July 2026' },
        { version: 'v1.1', action: 'Aadhaar e-Sign completed by Tenant', date: '13 July 2026' },
        { version: 'v1.0', action: 'Document uploaded by citizen', date: '12 July 2026' }
      ],
      sharing: { mediator: true, advocate: true, respondent: true }
    },
    { 
      id: 3, 
      name: 'Payment_Receipt_Deposit_Rent.pdf', 
      size: '650 KB', 
      date: '13 July 2026', 
      folder: 'evidence', 
      tag: 'Receipt',
      versions: [
        { version: 'v1.0', action: 'Document uploaded by citizen', date: '13 July 2026' }
      ],
      sharing: { mediator: true, advocate: false, respondent: false }
    }
  ]);

  const folders = [
    { id: 'all', label: '🗂️ All Locker Files' },
    { id: 'identity', label: '🪪 Identity Proofs' },
    { id: 'contracts', label: '📜 Contracts & Deeds' },
    { id: 'evidence', label: '📁 Evidence Files' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          const newFile = {
            id: files.length + 1,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            date: 'Today',
            folder: activeFolder === 'all' ? 'evidence' : activeFolder,
            tag: 'Uploaded',
            versions: [
              { version: 'v1.0', action: 'Document uploaded by citizen', date: 'Today' }
            ],
            sharing: { mediator: true, advocate: false, respondent: false }
          };
          setFiles(prevFiles => [newFile, ...prevFiles]);
          setSelectedFileId(newFile.id);
          setUploadProgress(null);
          setSelectedFileName('');
          return null;
        }
        return prev + 30;
      });
    }, 250);
  };

  const toggleSharing = (role) => {
    setFiles(files.map(f => {
      if (f.id === selectedFileId) {
        return {
          ...f,
          sharing: {
            ...f.sharing,
            [role]: !f.sharing[role]
          }
        };
      }
      return f;
    }));
  };

  const filteredFiles = activeFolder === 'all' 
    ? files 
    : files.filter(f => f.folder === activeFolder);

  const selectedFile = files.find(f => f.id === selectedFileId) || files[0];

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>NATIONAL DIGITAL LOCKER GATEWAY</span>
        <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
          My Digital Legal Locker
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Secure cloud vault integrated with DigiLocker API standards for legal evidence and e-signed deeds.
        </p>
      </div>

      <div className="grid grid-sidebar">
        
        {/* Left Folders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Locker Directory</h3>
          {folders.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFolder(f.id)}
              className="btn btn-secondary"
              style={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                border: '1px solid var(--border-color)',
                backgroundColor: activeFolder === f.id ? 'var(--color-royal-light)' : 'var(--bg-secondary)',
                color: activeFolder === f.id ? 'var(--color-royal)' : 'var(--text-primary)',
                borderColor: activeFolder === f.id ? 'var(--color-royal)' : 'var(--border-color)'
              }}
            >
              {f.label}
            </button>
          ))}

          {/* Secure Details Banner */}
          <div className="card" style={{ marginTop: '1.5rem', padding: '1rem', borderTop: '2px solid var(--color-royal)' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>DPDP Compliance</h4>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Compliant with Section 6 of the Digital Personal Data Protection (DPDP) Act, 2023. Sharing consent can be revoked by the data principal at any time.
            </p>
          </div>
        </div>

        {/* Right workspace split */}
        <div className="grid grid-2" style={{ gridTemplateColumns: '1.1fr 0.9fr' }}>
          
          {/* Files List and upload */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Upload Area */}
            <div className="card" style={{ border: '2px dashed var(--border-color)', padding: '2rem', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem' }}>📤</span>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>Upload Official Files</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Upload evidence logs or agreements</p>
              
              <label className="btn btn-primary" style={{ cursor: 'pointer', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                Select File
                <input 
                  type="file" 
                  style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                  onChange={handleFileUpload}
                />
              </label>

              {uploadProgress !== null && (
                <div style={{ width: '100%', maxWidth: '240px', margin: '1rem auto 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.2rem' }}>
                    <span>Saving {selectedFileName}...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div style={{ height: '5px', backgroundColor: 'var(--border-color)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${uploadProgress}%`, backgroundColor: 'var(--color-royal)' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Files Panel */}
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Documents list</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filteredFiles.map(f => (
                  <div 
                    key={f.id}
                    onClick={() => setSelectedFileId(f.id)}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      border: '1px solid var(--border-color)',
                      borderColor: selectedFileId === f.id ? 'var(--color-royal)' : 'var(--border-color)',
                      backgroundColor: selectedFileId === f.id ? 'var(--color-royal-light)' : 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.6rem 0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>📄</span>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{f.name}</div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{f.size} | {f.date}</span>
                      </div>
                    </div>
                    <span className="badge badge-info" style={{ fontSize: '0.6rem' }}>{f.tag}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Details, Version History, & Share Permissions Panel */}
          <div>
            {selectedFile ? (
              <div className="card" style={{ position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  Locker Metadata
                </h3>

                <div style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                  <div><strong>File Name:</strong> {selectedFile.name}</div>
                  <div><strong>Locker Size:</strong> {selectedFile.size}</div>
                  <div><strong>Upload Log:</strong> {selectedFile.date}</div>
                </div>

                {/* Granular Sharing Permissions */}
                <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>🔑 Revocable Sharing Permissions</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedFile.sharing.mediator} 
                        onChange={() => toggleSharing('mediator')}
                      /> Share with Assigned Mediator (S. Patil)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedFile.sharing.advocate} 
                        onChange={() => toggleSharing('advocate')}
                      /> Share with Referral Attorney (M. Sen)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedFile.sharing.respondent} 
                        onChange={() => toggleSharing('respondent')}
                      /> Share with Opponent (R. Sharma)
                    </label>
                  </div>
                  <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', padding: '0.35rem', marginTop: '0.75rem' }} onClick={() => alert('Consent settings updated in blockchain audit logs.')}>
                    Save Permission Consent
                  </button>
                </div>

                {/* Version History Log */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>📜 Version Revision History</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedFile.versions.map((ver, idx) => (
                      <div key={idx} style={{ fontSize: '0.75rem', borderLeft: '2px solid var(--color-royal)', paddingLeft: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                          <span>{ver.version}</span>
                          <span style={{ color: 'var(--text-muted)' }}>{ver.date}</span>
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>{ver.action}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="card flex-center" style={{ height: '300px', border: '2px dashed var(--border-color)' }}>
                Select a file to inspect versions and configurations.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
