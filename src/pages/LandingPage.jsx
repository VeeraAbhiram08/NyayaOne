import React, { useState } from 'react';

export default function LandingPage({ setCurrentTab, onOpenAuth, language }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedState, setSelectedState] = useState('Delhi');

  // State specific resources data - All 28 States and 8 UTs of India
  const stateResources = {
    // 28 States
    "Andhra Pradesh": {
      highCourt: "High Court of Andhra Pradesh, Nelapadu, Amaravati",
      legalAid: "Andhra Pradesh State Legal Services Authority (APSLSA) - Ph: 0863-2371239",
      consumerForum: "AP State Consumer Commission, Amaravati",
      police: "AP Police Cyber Cell, Vijayawada - Ph: 112",
      mediation: "AP High Court Mediation Centre, Amaravati",
      contacts: "Emergency: 112, Cyber Fraud Helpline: 1930"
    },
    "Arunachal Pradesh": {
      highCourt: "Gauhati High Court Itanagar Bench, Naharlagun",
      legalAid: "Arunachal Pradesh State Legal Services Authority (APSLSA) - Ph: 0360-2291244",
      consumerForum: "Arunachal Consumer Disputes Redressal Commission, Itanagar",
      police: "Arunachal Cyber Cell Unit, Itanagar - Ph: 112",
      mediation: "Itanagar Bench Mediation Centre",
      contacts: "Emergency: 112, Women Helpline: 181"
    },
    "Assam": {
      highCourt: "Gauhati High Court, Mahatma Gandhi Road, Guwahati",
      legalAid: "Assam State Legal Services Authority (ASLSA) - Ph: 0361-2601577",
      consumerForum: "Assam State Consumer Redressal Commission, Guwahati",
      police: "Assam Cyber Crime Cell, Guwahati - Ph: 112",
      mediation: "Gauhati High Court Mediation Committee",
      contacts: "Emergency: 112, Cyber Fraud: 1930"
    },
    "Bihar": {
      highCourt: "Patna High Court, Bailey Road, Patna",
      legalAid: "Bihar State Legal Services Authority (BSLSA) - Ph: 0612-2505765",
      consumerForum: "Bihar State Consumer Commission, Patna",
      police: "Bihar Cyber Crime Desk, Patna - Ph: 112",
      mediation: "Patna High Court Mediation Centre",
      contacts: "Emergency: 112, Cyber Fraud Helpline: 1930"
    },
    "Chhattisgarh": {
      highCourt: "High Court of Chhattisgarh, Bodri, Bilaspur",
      legalAid: "Chhattisgarh State Legal Services Authority (CGSLSA) - Ph: 07752-241023",
      consumerForum: "Chhattisgarh State Consumer Commission, Raipur",
      police: "CG Cyber Police Cell, Raipur - Ph: 112",
      mediation: "Chhattisgarh High Court Mediation Centre, Bilaspur",
      contacts: "Emergency: 112, Women Helpline: 1091"
    },
    "Goa": {
      highCourt: "Bombay High Court at Goa, Altinho, Panaji",
      legalAid: "Goa State Legal Services Authority (GSLSA) - Ph: 0832-2421162",
      consumerForum: "Goa State Consumer Commission, Panaji",
      police: "Goa Police Cyber Cell, Panaji - Ph: 112",
      mediation: "Goa State Mediation Centre, Panaji",
      contacts: "Emergency: 112, Cyber Fraud: 1930"
    },
    "Gujarat": {
      highCourt: "Gujarat High Court, Sola, Ahmedabad",
      legalAid: "Gujarat State Legal Services Authority (GSLSA) - Ph: 079-27665262",
      consumerForum: "Gujarat State Consumer Commission, Ahmedabad",
      police: "Gujarat Cyber Police Cell, Gandhinagar - Ph: 112",
      mediation: "Gujarat High Court Mediation Centre",
      contacts: "Emergency: 112, Cyber Fraud Helpline: 1930"
    },
    "Haryana": {
      highCourt: "Punjab and Haryana High Court, Sector 1, Chandigarh",
      legalAid: "Haryana State Legal Services Authority (HALSA) - Ph: 1800-180-2057",
      consumerForum: "Haryana State Consumer Commission, Panchkula",
      police: "Haryana Cyber Crime Cell, Panchkula - Ph: 112",
      mediation: "Haryana State Mediation & Conciliation Centre",
      contacts: "Emergency: 112, Cyber Crime: 1930"
    },
    "Himachal Pradesh": {
      highCourt: "High Court of Himachal Pradesh, Shimla",
      legalAid: "Himachal Pradesh State Legal Services Authority (HPSLSA) - Ph: 0177-2623862",
      consumerForum: "HP State Consumer Commission, Shimla",
      police: "HP Cyber Crime Branch, Shimla - Ph: 112",
      mediation: "HP High Court Mediation Centre, Shimla",
      contacts: "Emergency: 112, Cyber Crime Helpline: 1930"
    },
    "Jharkhand": {
      highCourt: "Jharkhand High Court, Doranda, Ranchi",
      legalAid: "Jharkhand State Legal Services Authority (JHALSA) - Ph: 0651-2482392",
      consumerForum: "Jharkhand State Consumer Commission, Ranchi",
      police: "Jharkhand Cyber Cell, Ranchi - Ph: 112",
      mediation: "Jharkhand High Court Mediation Desk, Ranchi",
      contacts: "Emergency: 112, Cyber Fraud: 1930"
    },
    "Karnataka": {
      highCourt: "High Court of Karnataka, Cubbon Park, Bengaluru",
      legalAid: "Karnataka State Legal Services Authority (KSLSA) - Ph: 1800-425-90900",
      consumerForum: "Karnataka State Consumer Commission, Basava Bhawan, Bengaluru",
      police: "Bengaluru Cyber Crime Police Station - Ph: 112 / 080-22204460",
      mediation: "Bangalore Mediation Centre (BMC)",
      contacts: "Emergency: 112, Women Helpline: 1091, Cyber Fraud: 1930"
    },
    "Kerala": {
      highCourt: "High Court of Kerala, Marine Drive, Kochi",
      legalAid: "Kerala State Legal Services Authority (KELSA) - Ph: 0484-2569901",
      consumerForum: "Kerala State Consumer Commission, Thiruvananthapuram",
      police: "Kerala Cyber Police HQ, Thiruvananthapuram - Ph: 112",
      mediation: "Ernakulam Mediation Centre, High Court Bench",
      contacts: "Emergency: 112, Women Helpline: 181, Cyber Crime: 1930"
    },
    "Madhya Pradesh": {
      highCourt: "Madhya Pradesh High Court, Jabalpur",
      legalAid: "Madhya Pradesh State Legal Services Authority (MPSLSA) - Ph: 0761-2678881",
      consumerForum: "MP State Consumer Commission, Bhopal",
      police: "MP Police Cyber Cell, Bhopal - Ph: 112",
      mediation: "MP High Court Mediation and Conciliation Centre",
      contacts: "Emergency: 112, Cyber Crime Helpline: 1930"
    },
    "Maharashtra": {
      highCourt: "Bombay High Court, Fort, Mumbai",
      legalAid: "Maharashtra State Legal Services Authority (MSLSA) - Ph: 022-22835368",
      consumerForum: "Maharashtra State Consumer Commission, Administrative Building, Mumbai",
      police: "Mumbai Police Cyber Crime Branch - Ph: 112 / 022-22160080",
      mediation: "Main Mediation Centre, Bombay High Court",
      contacts: "Emergency: 112, Cyber Crime Helpline: 1930"
    },
    "Manipur": {
      highCourt: "High Court of Manipur, Mantripukhri, Imphal",
      legalAid: "Manipur State Legal Services Authority (MASLSA) - Ph: 0385-2421834",
      consumerForum: "Manipur State Consumer Commission, Imphal",
      police: "Manipur Police Cyber Cell, Imphal - Ph: 112",
      mediation: "Imphal High Court Mediation Centre",
      contacts: "Emergency: 112, Women Helpline: 181"
    },
    "Meghalaya": {
      highCourt: "High Court of Meghalaya, Shillong",
      legalAid: "Meghalaya State Legal Services Authority (MSLSA) - Ph: 0364-2521015",
      consumerForum: "Meghalaya State Consumer Commission, Shillong",
      police: "Meghalaya Cyber Crime Cell, Shillong - Ph: 112",
      mediation: "Shillong Mediation Centre, High Court",
      contacts: "Emergency: 112, Police Helpline: 100"
    },
    "Mizoram": {
      highCourt: "Gauhati High Court Aizawl Bench, Aizawl",
      legalAid: "Mizoram State Legal Services Authority (MSLSA) - Ph: 0389-2336621",
      consumerForum: "Mizoram State Consumer Commission, Aizawl",
      police: "Mizoram Cyber Crime Cell, Aizawl - Ph: 112",
      mediation: "Aizawl Mediation Centre Desk",
      contacts: "Emergency: 112, Women Helpline: 181"
    },
    "Nagaland": {
      highCourt: "Gauhati High Court Kohima Bench, Kohima",
      legalAid: "Nagaland State Legal Services Authority (NSLSA) - Ph: 0370-2290153",
      consumerForum: "Nagaland State Consumer Commission, Kohima",
      police: "Nagaland Cyber Crime Unit, Kohima - Ph: 112",
      mediation: "Kohima Mediation Committee",
      contacts: "Emergency: 112, Women Helpline: 181"
    },
    "Odisha": {
      highCourt: "Orissa High Court, Cantonment Road, Cuttack",
      legalAid: "Odisha State Legal Services Authority (OSLSA) - Ph: 0671-2305888",
      consumerForum: "Odisha State Consumer Commission, Cuttack",
      police: "Odisha Cyber Police Cell, Cuttack - Ph: 112",
      mediation: "Orissa High Court Mediation Centre, Cuttack",
      contacts: "Emergency: 112, Cyber Crime Helpline: 1930"
    },
    "Punjab": {
      highCourt: "Punjab and Haryana High Court, Sector 1, Chandigarh",
      legalAid: "Punjab State Legal Services Authority (PULSA) - Ph: 1800-180-2057",
      consumerForum: "Punjab State Consumer Commission, Sector 37-A, Chandigarh",
      police: "Punjab Cyber Cell, SAS Nagar (Mohali) - Ph: 112",
      mediation: "Punjab State Mediation & Conciliation Centre",
      contacts: "Emergency: 112, Cyber Crime: 1930"
    },
    "Rajasthan": {
      highCourt: "Rajasthan High Court, Jodhpur / Jaipur Bench",
      legalAid: "Rajasthan State Legal Services Authority (RSLSA) - Ph: 0291-2227602",
      consumerForum: "Rajasthan State Consumer Commission, Jaipur",
      police: "Rajasthan Cyber Police Cell, Jaipur - Ph: 112",
      mediation: "Rajasthan High Court Mediation Centre, Jodhpur",
      contacts: "Emergency: 112, Cyber Crime Helpline: 1930"
    },
    "Sikkim": {
      highCourt: "High Court of Sikkim, Gangtok",
      legalAid: "Sikkim State Legal Services Authority (SSLSA) - Ph: 03592-207753",
      consumerForum: "Sikkim Consumer Disputes Redressal Commission, Gangtok",
      police: "Sikkim Cyber Crime Cell, Gangtok - Ph: 112",
      mediation: "Gangtok High Court Mediation Panel",
      contacts: "Emergency: 112, Police Helpline: 100"
    },
    "Tamil Nadu": {
      highCourt: "Madras High Court, George Town, Chennai",
      legalAid: "Tamil Nadu State Legal Services Authority (TNSLSA) - Ph: 044-25342418",
      consumerForum: "Tamil Nadu State Consumer Redressal Commission, Chennai",
      police: "Chennai Cyber Crime Cell - Ph: 112 / 044-22502253",
      mediation: "Tamil Nadu Mediation and Conciliation Centre, Chennai",
      contacts: "Emergency: 112, Cyber Fraud Helpline: 1930"
    },
    "Telangana": {
      highCourt: "High Court for the State of Telangana, Hyderabad",
      legalAid: "Telangana State Legal Services Authority (TSLSA) - Ph: 040-23446188",
      consumerForum: "Telangana State Consumer Commission, Hyderabad",
      police: "Telangana Cyber Crime Police Station, Hyderabad - Ph: 112",
      mediation: "Telangana High Court Mediation Committee, Hyderabad",
      contacts: "Emergency: 112, Cyber Crime: 1930"
    },
    "Tripura": {
      highCourt: "High Court of Tripura, Capital Complex, Agartala",
      legalAid: "Tripura State Legal Services Authority (TSLSA) - Ph: 0381-2410143",
      consumerForum: "Tripura Consumer Disputes Commission, Agartala",
      police: "Tripura Cyber Cell Unit, Agartala - Ph: 112",
      mediation: "Agartala Mediation Centre, High Court",
      contacts: "Emergency: 112, Women Helpline: 181"
    },
    "Uttar Pradesh": {
      highCourt: "Allahabad High Court, Prayagraj / Lucknow Bench",
      legalAid: "UP State Legal Services Authority (UPSLSA), Lucknow - Ph: 0522-2286395",
      consumerForum: "UP State Consumer Commission, Lucknow",
      police: "UP Police Cyber Cell Unit - Ph: 112 / 0522-2305545",
      mediation: "Allahabad High Court Mediation and Conciliation Centre",
      contacts: "Emergency: 112, Women Power Line: 1090"
    },
    "Uttarakhand": {
      highCourt: "Uttarakhand High Court, Nainital",
      legalAid: "Uttarakhand State Legal Services Authority (UKSLSA) - Ph: 05942-236847",
      consumerForum: "Uttarakhand State Consumer Commission, Dehradun",
      police: "Uttarakhand Cyber Cell Unit, Dehradun - Ph: 112",
      mediation: "Nainital Bench Mediation Committee",
      contacts: "Emergency: 112, Cyber Crime Helpline: 1930"
    },
    "West Bengal": {
      highCourt: "Calcutta High Court, Esplanade, Kolkata",
      legalAid: "West Bengal State Legal Services Authority (WBSLSA) - Ph: 033-22484234",
      consumerForum: "West Bengal State Consumer Commission, Kolkata",
      police: "Calcutta Cyber Crime Cell, Lalbazar - Ph: 112 / 033-22143000",
      mediation: "Calcutta High Court Mediation Centre",
      contacts: "Emergency: 112, Cyber Fraud Helpline: 1930"
    },

    // 8 Union Territories
    "Andaman and Nicobar Islands": {
      highCourt: "Calcutta High Court Circuit Bench at Port Blair",
      legalAid: "A & N Islands State Legal Services Authority - Ph: 03192-230009",
      consumerForum: "A & N District Consumer Forum, Port Blair",
      police: "Port Blair Police Cyber Unit - Ph: 112",
      mediation: "Port Blair Circuit Bench Mediation Panel",
      contacts: "Emergency: 112, Marine Assistance: 1093"
    },
    "Chandigarh": {
      highCourt: "Punjab and Haryana High Court, Sector 1, Chandigarh",
      legalAid: "State Legal Services Authority, UT Chandigarh - Ph: 0172-2742999",
      consumerForum: "Chandigarh District Consumer Forum, Sector 19",
      police: "Chandigarh Cyber Police Cell, Sector 17 - Ph: 112 / 0172-2746028",
      mediation: "Chandigarh Mediation & Conciliation Center",
      contacts: "Emergency: 112, Cyber Crime: 1930"
    },
    "Dadra and Nagar Haveli and Daman and Diu": {
      highCourt: "Bombay High Court, Fort, Mumbai",
      legalAid: "UT Legal Services Authority, Daman - Ph: 0260-2230060",
      consumerForum: "District Consumer Forum, Daman",
      police: "DNH & DD Police Cyber Crime Unit - Ph: 112",
      mediation: "UT Mediation Desk, Daman",
      contacts: "Emergency: 112, Police HQ: 100"
    },
    "Delhi": {
      highCourt: "High Court of Delhi, Shershah Road, New Delhi",
      legalAid: "Delhi State Legal Services Authority (DSLSA) - Ph: 15100",
      consumerForum: "Delhi State Consumer Disputes Redressal Commission, Vikas Bhawan",
      police: "Delhi Police Cyber Cell - Ph: 112 / 011-20838300",
      mediation: "Delhi High Court Mediation Center (Samadhan)",
      contacts: "Emergency: 112, Women Helpline: 1091, Cyber Fraud: 1930"
    },
    "Jammu and Kashmir": {
      highCourt: "High Court of Jammu & Kashmir and Ladakh, Srinagar / Jammu",
      legalAid: "J&K State Legal Services Authority - Ph: 0194-2479967",
      consumerForum: "J&K State Consumer Disputes Redressal Commission",
      police: "Cyber Crime Police Station Kashmir, Srinagar - Ph: 112 / 0194-2452222",
      mediation: "J&K High Court Mediation Centre, Srinagar",
      contacts: "Emergency: 112, Women Helpline: 1091"
    },
    "Ladakh": {
      highCourt: "High Court of Jammu & Kashmir and Ladakh, Leh Bench",
      legalAid: "Ladakh State Legal Services Authority - Ph: 01982-258300",
      consumerForum: "District Consumer Disputes Forum, Leh",
      police: "Ladakh Cyber Cell Unit, Leh - Ph: 112",
      mediation: "Leh Bench Mediation Committee",
      contacts: "Emergency: 112, Police HQ Leh: 01982-252010"
    },
    "Lakshadweep": {
      highCourt: "High Court of Kerala, Marine Drive, Kochi",
      legalAid: "Lakshadweep Legal Services Authority, Kavaratti - Ph: 04896-262228",
      consumerForum: "District Consumer Forum, Kavaratti",
      police: "Lakshadweep Police Cyber Cell - Ph: 112",
      mediation: "Kavaratti Court Mediation Panel",
      contacts: "Emergency: 112, Police HQ Kavaratti: 04896-262258"
    },
    "Puducherry": {
      highCourt: "Madras High Court, George Town, Chennai",
      legalAid: "Puducherry State Legal Services Authority (PSLSA) - Ph: 0413-2222418",
      consumerForum: "Puducherry Consumer Redressal Forum",
      police: "Puducherry Cyber Crime Cell - Ph: 112 / 0413-2231131",
      mediation: "Puducherry Court Mediation Centre",
      contacts: "Emergency: 112, Women Helpline: 181"
    }
  };

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
  };

  const emergencyContacts = [
    { title: "🚨 Police Assistance", number: "112 / 100", desc: "For direct local law enforcement alerts and immediate response." },
    { title: "👩 Women Helpline", number: "1091 / 181", desc: "National helpline for women security, domestic safety, and advice." },
    { title: "🧒 Child Helpline", number: "1098", desc: "For child welfare, education access issues, and emergency safety." },
    { title: "💻 Cyber Crime Desk", number: "1930", desc: "Report digital financial scams, phishing, and freeze bank accounts." },
    { title: "⚖️ National Legal Aid", number: "15100", desc: "Free legal representation and advice for marginalized groups." }
  ];

  const awarenessBanners = [
    { title: "🛡️ Phishing Awareness", desc: "Never share your UPI PIN or banking passwords with anyone. Government bodies or bank officials will never ask for credentials.", tag: "Cyber Fraud Campaign" },
    { title: "⚖️ Free Legal Aid Rights", desc: "Under Article 39A of the Constitution, citizens with annual income below threshold are entitled to free legal counsel.", tag: "Constitutional Right" },
    { title: "🚦 Traffic Challan Online Dispute", desc: "You have the right to contest incorrect electronic traffic fines before the virtual courts within 30 days of generation.", tag: "Motor Vehicles Act" }
  ];

  return (
    <div style={{ flex: 1 }}>
      
      {/* Live Legal Updates Ticker */}
      <div className="ticker-wrap">
        <span className="ticker-title">📢 Live Legal Updates</span>
        <div className="ticker">
          <span>• **BNS 2023 Amendments**: New digital evidence collection regulations under BNSS Section 105 active.</span>
          <span>• **Supreme Court Notification**: E-filing portal 2.0 launched for digital civil case status lookups.</span>
          <span>• **DPDP Act 2023 Rules**: Consent architectures mandatory for all corporate web applications starting August 2026.</span>
          <span>• **Consumer Commission Rule**: No representation fees required for claims below ₹5,00,000.</span>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ 
        padding: '4rem 0 5rem', 
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        borderBottom: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <span className="badge badge-saffron" style={{ margin: 0 }}>OFFICIAL</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Online Dispute Resolution (ODR) e-Portal of India
            </span>
          </div>

          <h1 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '3rem', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: 'var(--text-primary)',
            maxWidth: '900px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.15
          }}>
            Justice Should Be Accessible to Every Indian.
          </h1>

          <p style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-muted)', 
            maxWidth: '750px', 
            margin: '0 auto 2.5rem',
            lineHeight: 1.5
          }}>
            Resolve civil conflicts, draft standard documents, and check eligibility digital-first, reducing case burdens on e-Courts and district forums.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onOpenAuth} style={{ padding: '0.8rem 2rem' }}>
              ⚖️ Access Citizen Portal
            </button>
            <button className="btn btn-secondary" onClick={() => setCurrentTab('services')} style={{ padding: '0.8rem 2rem' }}>
              📁 Services Directory (UMANG style)
            </button>
            <button className="btn btn-outline" onClick={() => setCurrentTab('ai-assistant')} style={{ padding: '0.8rem 2rem' }}>
              🤖 Launch AI Legal Navigator
            </button>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer Stripe */}
      <section style={{ backgroundColor: 'var(--color-navy)', color: 'white', padding: '0.85rem 0', fontSize: '0.75rem', textAlign: 'center', borderBottom: '3px solid var(--color-saffron)' }}>
        <div className="container">
          ⚖️ <strong>Regulatory Disclaimer:</strong> NyayaOne is an ODR facilitation and legal assistance portal. It is NOT a court, does not replace the Judicial System of India, and all AI-generated suggestions are informational only.
        </div>
      </section>

      {/* National Justice Dashboard Analytics Cards */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>National Justice Dashboard</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Real-time statistics of pre-litigation resolution and citizen support across India</p>
          </div>

          <div className="grid grid-4">
            <div className="card card-navy" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-royal)' }}>5,12,042+</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Citizens Assisted</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free legal answers & drafts</div>
            </div>
            <div className="card card-saffron" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-saffron)' }}>72,185</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Cases Resolved Online</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Through digital mediation</div>
            </div>
            <div className="card card-green" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-green)' }}>18 Days</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Average Resolution</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pre-litigation closing time</div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>12 / 28</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Languages & States</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full national localization support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clickable India Map & State Resources */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>State Legal Registry Directory</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Select a state to load official High Court, legal aid society hotlines, and local consumer forums</p>
          </div>

          <div className="grid grid-2">
            {/* State selector list */}
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Select State / UT</h3>
              <div className="state-map-list">
                {Object.keys(stateResources).map((st) => (
                  <div 
                    key={st}
                    onClick={() => handleStateClick(st)}
                    className={`state-item ${selectedState === st ? 'active' : ''}`}
                  >
                    <span>📍 {st}</span>
                    <span>{selectedState === st ? '👁️ Viewing' : 'Select'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* State Resources Details */}
            <div className="card" style={{ borderLeft: '6px solid var(--color-royal)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                🏢 Legal Resources: {selectedState}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>State High Court:</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{stateResources[selectedState].highCourt}</p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>State Legal Aid Authority (Free Legal Aid Desk):</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{stateResources[selectedState].legalAid}</p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>State Consumer Disputes Redressal Commission:</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{stateResources[selectedState].consumerForum}</p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Cyber Crime Department Head Office:</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{stateResources[selectedState].police}</p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>High Court Mediation Centre:</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{stateResources[selectedState].mediation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public Awareness Portal */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Public Legal Awareness & Campaigns</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Important advisories and national guidelines from the Department of Justice</p>
          </div>

          <div className="grid grid-3">
            {awarenessBanners.map((banner, idx) => (
              <div key={idx} className="card card-saffron" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span className="badge badge-saffron" style={{ fontSize: '0.65rem', marginBottom: '0.75rem' }}>{banner.tag}</span>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{banner.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{banner.desc}</p>
                </div>
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-royal)', fontWeight: 600 }}>
                  Read Official Guidelines →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Assistance Desk */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Emergency Assistance Helplines</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>One-click direct contact numbers for rapid legal, cyber, and safety support</p>
          </div>

          <div className="grid grid-2">
            {emergencyContacts.map((contact, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
                <div style={{ maxWidth: '70%' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{contact.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{contact.desc}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-royal)', fontFamily: 'monospace' }}>{contact.number}</span>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', display: 'block', marginTop: '0.35rem', width: '100%' }}
                    onClick={() => alert(`Dialing ${contact.number} from your device...`)}
                  >
                    📞 Call Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2.5rem', color: 'var(--text-primary)' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { q: "How does pre-litigation ODR benefit me?", a: "Pre-litigation ODR resolves civil conflicts through mediation before formal court filing. It is highly cost-effective, takes less than 30 days, and preserves relationships, keeping minor cases out of the overburdened Indian judicial system." },
              { q: "Are mediation settlements legally valid?", a: "Yes. Settlements drafted on this platform and signed by the mediator and both disputing parties are recognized under Section 73 of the Arbitration and Conciliation Act, 1996, and carry the same force as a decree of an Indian civil court." },
              { q: "Is the portal compliant with personal data protection rules?", a: "Yes. NyayaOne is strictly designed in compliance with the Digital Personal Data Protection (DPDP) Act, 2023. User data, identity cards (Aadhaar/PAN), and evidence lock documents are encrypted and accessible only with user consent." }
            ].map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div 
                  key={i} 
                  className="card" 
                  style={{ 
                    padding: '1.25rem', 
                    cursor: 'pointer',
                    borderColor: isOpen ? 'var(--color-royal)' : 'var(--border-color)',
                    borderTop: '1px solid var(--border-color)'
                  }}
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>{faq.q}</h3>
                    <span style={{ fontSize: '1.1rem', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>＋</span>
                  </div>
                  {isOpen && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.5' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#060a13', color: '#a0aec0', padding: '4rem 0 2rem', fontSize: '0.85rem', borderTop: '3px solid var(--color-royal)' }}>
        <div className="container">
          <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
            <div>
              <span style={{ fontWeight: 800, color: 'white', fontSize: '1.25rem' }}>NyayaOne</span>
              <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', lineHeight: '1.5' }}>
                National Digital Legal Resolution and Pre-litigation Assistance Portal. Integrated ODR Initiative under the Ministry of Law & Justice, India.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>Support Helplines</h4>
              <p style={{ fontSize: '0.75rem', lineHeight: '1.6' }}>
                National Legal Aid Desk: 15100<br />
                National Cyber Crime Helpline: 1930<br />
                Toll Free: 1800-NYAYA-PORTAL
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>National Frameworks</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <li>Bharatiya Nyaya Sanhita, 2023</li>
                <li>Arbitration and Conciliation Act, 1996</li>
                <li>Digital Personal Data Protection Act, 2023</li>
                <li>e-Courts Mission Mode Project</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>Trust Certifications</h4>
              <p style={{ fontSize: '0.75rem' }}>
                • STQC Certified Security Locker<br />
                • Aadhaar e-Sign Compliant Integration<br />
                • NIC Cloud Hosting Standards
              </p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <span>© {new Date().getFullYear()} Ministry of Law & Justice, Govt. of India. All Rights Reserved.</span>
            <span>Platform Managed by National Informatics & Legal Technology Division</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
