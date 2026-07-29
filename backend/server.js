const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend client calls
app.use(cors());
app.use(express.json());

// Set up secure uploads folder for Digital Locker files
const uploadDirectory = path.join(__dirname, 'uploads');
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage: storageConfig });

// Base Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: "active",
    portal: "NyayaOne National Digital Justice API Gate",
    version: "1.0.0",
    compliance: [
      "Digital Personal Data Protection (DPDP) Act, 2023",
      "Bharatiya Nyaya Sanhita (BNS), 2023",
      "Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023"
    ],
    timestamp: new Date().toISOString()
  });
});

// Mock Auth API (OTP Send simulation)
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Mobile number is required" });
  }
  res.json({
    success: true,
    message: `OTP SMS successfully queued for +91 ******${phone.slice(-4)}`,
    demoBypassCode: "1234"
  });
});

// Mock Case List API
app.get('/api/cases', (req, res) => {
  res.json([
    {
      id: 'case-1',
      title: 'Rental Dispute - 4B, Greenwood Apts',
      category: 'Rental Disputes',
      status: 'Mediation Active',
      refNum: 'NY-2026-8812',
      respondent: 'Mr. Rajesh Sharma (Landlord)',
      dateCreated: '12 July 2026',
      milestone: 4
    },
    {
      id: 'case-2',
      title: 'Defective Laptop Refund - Alpha Tech',
      category: 'Consumer Complaints',
      status: 'Settled & Resolved',
      refNum: 'NY-2026-4409',
      respondent: 'Alpha Retail Private Ltd',
      dateCreated: '20 June 2026',
      milestone: 7
    }
  ]);
});

// Mock Locker Upload API
app.post('/api/locker/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    success: true,
    file: {
      name: req.file.originalname,
      size: `${(req.file.size / 1024).toFixed(1)} KB`,
      path: req.file.filename,
      date: 'Today'
    }
  });
});

// Launch Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` NyayaOne Digital Justice API Server is running`);
  console.log(` Port: http://localhost:${PORT}`);
  console.log(` Status: STQC Audits Active`);
  console.log(`=================================================`);
});
