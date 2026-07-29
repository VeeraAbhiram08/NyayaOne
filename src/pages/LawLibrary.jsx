import React, { useState } from 'react';

export default function LawLibrary({ language }) {
  const [activeSubTab, setActiveSubTab] = useState('hub'); // hub, dictionary, search
  const [searchQuery, setSearchQuery] = useState('');
  const [dictQuery, setDictQuery] = useState('');
  
  const dictTerms = [
    { term: "Ad Hoc", definition: "Created or done for a particular purpose only. For example, an ad hoc committee formed for a specific dispute." },
    { term: "Caveat Emptor", definition: "Let the buyer beware. The principle that the buyer alone is responsible for checking the quality of goods before purchasing." },
    { term: "Habeas Corpus", definition: "A writ requiring a person under arrest to be brought before a judge or into court, especially to secure their release unless lawful grounds are shown." },
    { term: "Prima Facie", definition: "Based on the first impression; accepted as correct until proved otherwise. A prima facie case has enough evidence to proceed." },
    { term: "Status Quo", definition: "The existing state of affairs, particularly regarding social or political issues. A court order to maintain status quo means keeping things unchanged." },
    { term: "Void Ab Initio", definition: "Having no legal force from the inception. A contract signed by a minor is void ab initio under Indian Contract Law." }
  ];

  const articles = [
    {
      title: "Bharatiya Nyaya Sanhita (BNS) 2023 - Core Changes",
      category: "Criminal Codes",
      summary: "BNS replaces the Indian Penal Code (IPC), 1860. It consolidates criminal law provisions, modernizes punishment types, and introduces community service.",
      provisions: "Replaces 511 IPC sections with 358 sections.",
      example: "Traditional IPC Section 302 (Murder) is now Section 101 BNS. Theft is shifted from IPC Section 378 to Section 303 BNS.",
      faq: "Q: Are old IPC cases valid? A: Yes. Under the transitional provisions, crimes committed before July 1, 2024 are tried under the IPC. New offenses are registered under BNS."
    },
    {
      title: "Fundamental Rights (Part III, Constitution of India)",
      category: "Constitutional Law",
      summary: "Guaranteed to all citizens under Articles 12 to 35. These are legally enforceable directly in the Supreme Court under Article 32.",
      provisions: "Includes Right to Equality (Art 14), Freedom of Speech (Art 19), and Right to Life & Privacy (Art 21).",
      example: "If a public university denies admission solely based on gender, the student can file a Writ Petition for violating Article 15.",
      faq: "Q: Can Fundamental Rights be suspended? A: Yes, during a National Emergency under Article 352, except Articles 20 and 21."
    },
    {
      title: "Consumer Rights & Grievance Redressal",
      category: "Consumer Law",
      summary: "Governed by the Consumer Protection Act, 2019. Establishes the Central Consumer Protection Authority (CCPA) to prevent unfair trade practices.",
      provisions: "Section 2(9) defines 6 consumer rights, including the Right to Safety, Information, Choice, and Redressal.",
      example: "If an e-commerce brand delivers a dummy phone instead of a smartphone and refuses refunds, the user registers a complaint on e-Daakhil.",
      faq: "Q: Is there a fee to file a complaint? A: Complaints up to ₹5 Lakhs are free of court filing fees under the new regulations."
    }
  ];

  const filteredDict = dictTerms.filter(t => 
    t.term.toLowerCase().includes(dictQuery.toLowerCase()) || 
    t.definition.toLowerCase().includes(dictQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
      
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          📚 Legal Knowledge Hub & Law Library
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Democratizing legal knowledge. Read simplified breakdowns, search Bare Acts, and look up legal definitions.
        </p>
      </div>

      {/* Library Sub Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveSubTab('hub')}
          className={`btn ${activeSubTab === 'hub' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.85rem' }}
        >
          📖 Simplifed Legal Hub
        </button>
        <button 
          onClick={() => setActiveSubTab('search')}
          className={`btn ${activeSubTab === 'search' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.85rem' }}
        >
          🔎 Search Bare Acts (BNS, CPC)
        </button>
        <button 
          onClick={() => setActiveSubTab('dictionary')}
          className={`btn ${activeSubTab === 'dictionary' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.85rem' }}
        >
          🔤 Legal Dictionary
        </button>
      </div>

      {/* Simplified Legal Hub */}
      {activeSubTab === 'hub' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '1.25rem' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search knowledge articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ flex: 1, border: 'none', outline: 'none', padding: '0.25rem' }}
            />
          </div>

          <div className="grid grid-3">
            {filteredArticles.map((art, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'between' }}>
                <div>
                  <span className="badge badge-info" style={{ fontSize: '0.65rem', marginBottom: '0.75rem' }}>{art.category}</span>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{art.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{art.summary}</p>
                  
                  <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    <strong>Statutory Provision:</strong> {art.provisions}
                  </div>
                  <div style={{ backgroundColor: 'var(--color-royal-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
                    <strong>Practical Scenario:</strong> {art.example}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1rem', paddingTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {art.faq}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bare Act Search Panel */}
      {activeSubTab === 'search' && (
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Search Bare Acts Database
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Quick index tool referencing Bharatiya Nyaya Sanhita, Civil Procedure Code, and IT Act sections.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginBottom: '2rem' }}>
            <input 
              type="text" 
              placeholder="Enter section number or keyword (e.g. 'Section 101 BNS', 'Cheque bounce')" 
              className="form-control"
              style={{ width: '100%' }}
            />
            <button className="btn btn-primary" onClick={() => alert('Found 2 matches in BNS 2023 Database.')}>
              Search Section
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>BNS 2023</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Act No. 45 of 2023</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Section 101. Punishment for Murder</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                "Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine."
              </p>
            </div>

            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>IT Act 2000</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Section 66D</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Section 66D. Punishment for Cheating by Personation</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                "Whoever, by means of any communication device or computer resource cheats by personating shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dictionary View */}
      {activeSubTab === 'dictionary' && (
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            🔤 Legal Dictionary & Terminology
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Look up common Latin terms and expressions used in Indian courtroom plaints and agreements.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontSize: '1.25rem' }}>🔎</span>
            <input 
              type="text" 
              placeholder="Search legal dictionary terms..." 
              value={dictQuery}
              onChange={(e) => setDictQuery(e.target.value)}
              className="form-control"
              style={{ flex: 1, border: 'none', outline: 'none', padding: '0.25rem' }}
            />
          </div>

          <div className="grid grid-2">
            {filteredDict.map((t, idx) => (
              <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1rem', backgroundColor: 'var(--bg-secondary)' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-royal)', marginBottom: '0.5rem' }}>{t.term}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
