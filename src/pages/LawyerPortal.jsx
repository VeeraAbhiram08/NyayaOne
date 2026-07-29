import React, { useState } from 'react';

export default function LawyerPortal({ language }) {
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [cityFilter, setCityFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [bookingDate, setBookingDate] = useState('2026-07-30');
  const [bookingTime, setBookingTime] = useState('11:00');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Onboarding registry states
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [onboardForm, setOnboardForm] = useState({
    name: '',
    barId: '',
    city: 'Bengaluru',
    exp: '',
    specialty: 'Civil Disputes'
  });
  const [onboardSuccess, setOnboardSuccess] = useState(false);

  const lawyers = [
    {
      id: 1,
      name: "Adv. Meera Sen",
      image: "⚖️",
      title: "Senior Partner, Sen & Associates",
      rating: 4.9,
      reviews: 142,
      exp: 15,
      city: "Bengaluru",
      languages: ["English", "Kannada", "Hindi"],
      areas: ["Rental Disputes", "Property Documentation", "Contract Disputes"],
      fee: "₹2,500/session",
      available: "Mon - Fri (10 AM - 5 PM)",
      responseTime: "Under 2 hours",
      successRate: "94% Resolved",
      bio: "Meera specializes in property acquisition, builder-buyer disputes, and tenancy negotiations under the RERA act and regional rental laws."
    },
    {
      id: 2,
      name: "Adv. Aditya Verma",
      image: "💼",
      title: "Cyber and FinTech Legal Expert",
      rating: 4.8,
      reviews: 98,
      exp: 10,
      city: "Delhi NCR",
      languages: ["English", "Hindi", "Punjabi"],
      areas: ["Cyber Complaints", "Digital Fraud", "Consumer Complaints"],
      fee: "₹3,000/session",
      available: "Mon - Sat (11 AM - 6 PM)",
      responseTime: "Under 4 hours",
      successRate: "89% Resolved",
      bio: "Aditya advises clients on Cyber crime recovery, online credit fraud, and data privacy rights under the DPDP Act 2023."
    },
    {
      id: 3,
      name: "Adv. Rajesh K. Pillai",
      image: "📜",
      title: "Senior Civil Litigator",
      rating: 4.7,
      reviews: 185,
      exp: 22,
      city: "Mumbai",
      languages: ["English", "Malayalam", "Tamil", "Marathi"],
      areas: ["Money Lending", "Cheque Bounce", "Contract Disputes"],
      fee: "₹3,500/session",
      available: "Tue - Sat (2 PM - 7 PM)",
      responseTime: "Under 1 day",
      successRate: "92% Resolved",
      bio: "Rajesh holds expertise in financial settlement negotiations, summary suits, and cheque bounce disputes under Section 138 of the Negotiable Instruments Act."
    }
  ];

  const cities = ["Bengaluru", "Delhi NCR", "Mumbai"];
  const areas = ["Rental Disputes", "Property Documentation", "Contract Disputes", "Cyber Complaints", "Digital Fraud", "Consumer Complaints", "Money Lending", "Cheque Bounce"];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesCity = cityFilter === 'all' || lawyer.city === cityFilter;
    const matchesArea = areaFilter === 'all' || lawyer.areas.includes(areaFilter);
    return matchesCity && matchesArea;
  });

  const handleBookSession = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedLawyerId(null);
    }, 3000);
  };

  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    setOnboardSuccess(true);
    setTimeout(() => {
      setOnboardSuccess(false);
      setIsOnboarding(false);
      setOnboardForm({ name: '', barId: '', city: 'Bengaluru', exp: '', specialty: 'Civil Disputes' });
    }, 4000);
  };

  const selectedLawyer = lawyers.find(l => l.id === selectedLawyerId);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>NATIONAL ADVOCATE REGISTRY</span>
          <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            National Lawyer & Mediator Directory
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Search vetted, bar-certified attorneys and mediators available for ODR consultations.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsOnboarding(!isOnboarding)}>
          {isOnboarding ? "👁️ View Lawyer Directory" : "✍️ Lawyer / Mediator Registration"}
        </button>
      </div>

      {/* View Onboarding Form Panel */}
      {isOnboarding ? (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Advocate / Mediator Registry Application
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Fill out the verified credential form. The Ministry Registrar will coordinate verify with your State Bar Council.
          </p>

          {onboardSuccess ? (
            <div className="badge badge-success" style={{ width: '100%', justifyContent: 'center', padding: '1.5rem', display: 'block', textAlign: 'center' }}>
              <strong>✓ Onboarding Application Received!</strong>
              <div style={{ fontSize: '0.75rem', marginTop: '0.35rem' }}>Verification ticket #REG-2026-4412 created. Processing takes 7 working days.</div>
            </div>
          ) : (
            <form onSubmit={handleOnboardSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name (As registered in Bar Council)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={onboardForm.name}
                  onChange={(e) => setOnboardForm({ ...onboardForm, name: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Bar Association ID / Registration Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. MAH/2932/2012"
                  value={onboardForm.barId}
                  onChange={(e) => setOnboardForm({ ...onboardForm, barId: e.target.value })}
                  required 
                />
              </div>
              <div className="grid grid-3">
                <div className="form-group">
                  <label className="form-label">Practice City</label>
                  <select 
                    value={onboardForm.city}
                    onChange={(e) => setOnboardForm({ ...onboardForm, city: e.target.value })}
                    className="form-control"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Years of Experience</label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={onboardForm.exp}
                    onChange={(e) => setOnboardForm({ ...onboardForm, exp: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Specialty Field</label>
                  <select 
                    value={onboardForm.specialty}
                    onChange={(e) => setOnboardForm({ ...onboardForm, specialty: e.target.value })}
                    className="form-control"
                  >
                    <option value="Civil Disputes">Civil Disputes</option>
                    <option value="Cyber crime">Cyber crime</option>
                    <option value="Property Law">Property Law</option>
                  </select>
                </div>
              </div>

              <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                Submit Registry Registration Request
              </button>
            </form>
          )}
        </div>
      ) : (
        <>
          {/* Filter Toolbar */}
          <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Select City Registry</span>
                <select 
                  value={cityFilter} 
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="form-control"
                  style={{ width: '100%', padding: '0.4rem', marginTop: '0.25rem' }}
                >
                  <option value="all">All Vetted Cities</option>
                  {cities.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1, minWidth: '180px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Practice Specialization</span>
                <select 
                  value={areaFilter} 
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="form-control"
                  style={{ width: '100%', padding: '0.4rem', marginTop: '0.25rem' }}
                >
                  <option value="all">All Specialties</option>
                  {areas.map((area, idx) => (
                    <option key={idx} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Directory Split */}
          <div className="grid grid-2" style={{ gridTemplateColumns: '1.1fr 0.9fr' }}>
            
            {/* Catalog */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredLawyers.map(lawyer => (
                <div 
                  key={lawyer.id} 
                  className="card"
                  style={{ 
                    display: 'flex', 
                    gap: '1.25rem', 
                    padding: '1.25rem',
                    borderColor: selectedLawyerId === lawyer.id ? 'var(--color-royal)' : 'var(--border-color)',
                    backgroundColor: selectedLawyerId === lawyer.id ? 'var(--color-royal-light)' : 'var(--bg-secondary)'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', padding: '0.5rem', alignSelf: 'flex-start', backgroundColor: 'var(--bg-primary)', borderRadius: '50%' }}>
                    {lawyer.image}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                          {lawyer.name}
                          <span className="badge badge-success" style={{ fontSize: '0.55rem', marginLeft: '0.5rem' }}>✓ VETTED</span>
                        </h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lawyer.title}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-amber)', fontWeight: 'bold' }}>★ {lawyer.rating}</span>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>({lawyer.reviews} reviews)</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem', margin: '0.5rem 0' }}>
                      <div>⏱️ Responds: <strong>{lawyer.responseTime}</strong></div>
                      <div>🏆 Resolution: <strong>{lawyer.successRate}</strong></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Fee: {lawyer.fee}</span>
                      <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }} onClick={() => setSelectedLawyerId(lawyer.id)}>
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selector Scheduler */}
            <div>
              {selectedLawyer ? (
                <div className="card" style={{ position: 'sticky', top: '100px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{selectedLawyer.image}</span>
                    <h3 style={{ fontSize: '1.2rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>{selectedLawyer.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedLawyer.city} Registry Desk</span>
                  </div>

                  <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
                    <div><strong>Registry Status:</strong> Bar Certified Advocate</div>
                    <div><strong>Languages:</strong> {selectedLawyer.languages.join(', ')}</div>
                    <div><strong>Caseload Success:</strong> {selectedLawyer.successRate} resolution</div>
                  </div>

                  {bookingSuccess ? (
                    <div className="badge badge-success" style={{ width: '100%', padding: '1rem', justifyContent: 'center', display: 'block', textAlign: 'center' }}>
                      <strong>✓ Session Booked Successfully!</strong>
                      <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>Appointment verification link sent to your registered profile.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookSession} style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Consultation Date</label>
                        <input 
                          type="date" 
                          className="form-control"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Available Slots</label>
                        <select 
                          value={bookingTime} 
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="form-control"
                        >
                          <option value="10:00">10:00 AM - 10:30 AM (Joint Video)</option>
                          <option value="11:30">11:30 AM - 12:00 PM (Joint Video)</option>
                          <option value="15:00">03:00 PM - 03:30 PM (Consultation)</option>
                        </select>
                      </div>
                      <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                        Confirm Scheduled Session
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="card flex-center" style={{ height: '320px', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-lg)', textAlign: 'center', position: 'sticky', top: '100px' }}>
                  <div>
                    <span style={{ fontSize: '2.5rem' }}>📅</span>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>No Advocate Selected</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Choose an advocate from the left registry cards to view calendars.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </>
      )}

    </div>
  );
}
