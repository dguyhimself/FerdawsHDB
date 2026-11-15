const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'hospital_database.json');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function getSeedData() {
  const now = new Date().toISOString();
  const today = now.split('T')[0];

  return {
    hospitalInfo: {
      name_fa: 'شفاخانه تخصصی فردوس',
      name_en: 'Ferdows Specialized Hospital',
      address_fa: 'گولایی دواخانه، کوته سنگی، کابل، افغانستان',
      address_en: 'Gulayee Dawa Khana, Kota Sangi, Kabul, Afghanistan',
      phone: '+93 785 324 819',
      emergencyPhone: '+93 785 324 819',
      email: 'info@ferdoushospital.com',
      website: 'www.ferdoushospital.com',
      hours_fa: 'خدمات ۲۴ ساعته در تمام روزهای هفته',
      hours_en: '24/7 Emergency, Pharmacy & Diagnostic Services'
    },
    patients: [
      {
        id: 'pat-1001',
        mrn: 'FSH-1001',
        name_fa: 'احمد شاه احمدی',
        name_en: 'Ahmad Shah Ahmadi',
        age: 42,
        gender: 'Male',
        bloodGroup: 'O+',
        phone: '0781234567',
        address_fa: 'کارته چهار، کابل',
        address_en: 'Karte Char, Kabul',
        allergies: 'Penicillin',
        medicalHistory: 'Hypertension (controlled)',
        emergencyContact: '0700112233',
        registeredAt: '2026-10-12'
      },
      {
        id: 'pat-1002',
        mrn: 'FSH-1002',
        name_fa: 'فاطمه زهرا حسنی',
        name_en: 'Fatima Zahra Hassani',
        age: 29,
        gender: 'Female',
        bloodGroup: 'A+',
        phone: '0792345678',
        address_fa: 'دشت برچی، کابل',
        address_en: 'Dasht-e-Barchi, Kabul',
        allergies: 'None',
        medicalHistory: 'Prenatal follow-up (32 weeks)',
        emergencyContact: '0799887766',
        registeredAt: '2026-10-18'
      },
      {
        id: 'pat-1003',
        mrn: 'FSH-1003',
        name_fa: 'محمد کریم وردک',
        name_en: 'Mohammad Karim Wardak',
        age: 56,
        gender: 'Male',
        bloodGroup: 'B+',
        phone: '0773456789',
        address_fa: 'کوته سنگی، کابل',
        address_en: 'Kota Sangi, Kabul',
        allergies: 'Sulfa Drugs',
        medicalHistory: 'Type 2 Diabetes, Mild Angina',
        emergencyContact: '0771122998',
        registeredAt: '2026-11-01'
      },
      {
        id: 'pat-1004',
        mrn: 'FSH-1004',
        name_fa: 'نادیه رحیمی',
        name_en: 'Nadia Rahimi',
        age: 35,
        gender: 'Female',
        bloodGroup: 'AB+',
        phone: '0784567890',
        address_fa: 'خیرخانه، کابل',
        address_en: 'Khair Khana, Kabul',
        allergies: 'None',
        medicalHistory: 'Hypothyroidism',
        emergencyContact: '0788990011',
        registeredAt: '2026-11-05'
      },
      {
        id: 'pat-1005',
        mrn: 'FSH-1005',
        name_fa: 'حمیدالله ستانکزی',
        name_en: 'Hamidullah Stanikzai',
        age: 8,
        gender: 'Male',
        bloodGroup: 'O-',
        phone: '0705678901',
        address_fa: 'شهر نو، کابل',
        address_en: 'Shahr-e-Naw, Kabul',
        allergies: 'None',
        medicalHistory: 'Seasonal Asthma',
        emergencyContact: '0705678902',
        registeredAt: '2026-11-10'
      },
      {
        id: 'pat-1006',
        mrn: 'FSH-1006',
        name_fa: 'زینب قریشی',
        name_en: 'Zainab Qureshi',
        age: 48,
        gender: 'Female',
        bloodGroup: 'A-',
        phone: '0796789012',
        address_fa: 'کارته سه، کابل',
        address_en: 'Karte Seh, Kabul',
        allergies: 'Aspirin',
        medicalHistory: 'Routine Mammography Screening',
        emergencyContact: '0796789000',
        registeredAt: '2026-11-12'
      }
    ],
    doctors: [
      {
        id: 'doc-1',
        name_fa: 'داکتر فریدون مقصودی',
        name_en: 'Dr. Feraidoon Maqsudi',
        specialty_fa: 'متخصص داخله عمومی',
        specialty_en: 'Internal Medicine Specialist',
        department: 'Internal Medicine',
        qualification: 'MD, Specialist in Internal Medicine',
        phone: '0785111222',
        fee: 500,
        schedule_fa: 'شنبه تا پنجشنبه | ۰۸:۰۰ - ۱۶:۰۰',
        schedule_en: 'Sat - Thu | 08:00 - 16:00',
        status: 'On Duty'
      },
      {
        id: 'doc-2',
        name_fa: 'داکتر ذبیح‌الله نوری',
        name_en: 'Dr. Zabihullah Noori',
        specialty_fa: 'متخصص قلب و عروق',
        specialty_en: 'Consultant Cardiologist',
        department: 'Cardiology',
        qualification: 'MD, Fellowship in Cardiology',
        phone: '0785222333',
        fee: 800,
        schedule_fa: 'شنبه تا چهارشنبه | ۰۹:۰۰ - ۱۷:۰۰',
        schedule_en: 'Sat - Wed | 09:00 - 17:00',
        status: 'On Duty'
      },
      {
        id: 'doc-3',
        name_fa: 'داکتر مریم سادات',
        name_en: 'Dr. Maryam Sadat',
        specialty_fa: 'متخصص نسایی و ولادی',
        specialty_en: 'Gynecology & Obstetrics',
        department: 'Gynecology & Obstetrics',
        qualification: 'MD, OB/GYN Specialist',
        phone: '0795333444',
        fee: 600,
        schedule_fa: 'همه روزه | ۰۸:۰۰ - ۱۵:۰۰',
        schedule_en: 'Daily | 08:00 - 15:00',
        status: 'On Duty'
      },
      {
        id: 'doc-4',
        name_fa: 'داکتر همایون کوهستانی',
        name_en: 'Dr. Humayun Kohistani',
        specialty_fa: 'متخصص جراحی عمومی',
        specialty_en: 'General & Laparoscopic Surgeon',
        department: 'General Surgery',
        qualification: 'MD, MS General Surgery',
        phone: '0775444555',
        fee: 700,
        schedule_fa: 'شنبه تا پنجشنبه | ۱۰:۰۰ - ۱۸:۰۰',
        schedule_en: 'Sat - Thu | 10:00 - 18:00',
        status: 'In Surgery'
      },
      {
        id: 'doc-5',
        name_fa: 'داکتر سهیلا امیری',
        name_en: 'Dr. Suhaila Amiri',
        specialty_fa: 'متخصص اطفال',
        specialty_en: 'Pediatrician',
        department: 'Pediatrics',
        qualification: 'MD, DCH Pediatrics',
        phone: '0785555666',
        fee: 500,
        schedule_fa: 'شنبه تا پنجشنبه | ۰۸:۳۰ - ۱۵:۳۰',
        schedule_en: 'Sat - Thu | 08:30 - 15:30',
        status: 'On Duty'
      },
      {
        id: 'doc-6',
        name_fa: 'داکتر تمیم صدیقی',
        name_en: 'Dr. Tamim Sediqi',
        specialty_fa: 'متخصص رادیولوژی و التراساوند',
        specialty_en: 'Radiologist & Doppler Specialist',
        department: 'Radiology',
        qualification: 'MD, Diagnostic Radiology',
        phone: '0785666777',
        fee: 600,
        schedule_fa: 'همه روزه | ۰۸:۰۰ - ۲۰:۰۰',
        schedule_en: 'Daily | 08:00 - 20:00',
        status: 'On Duty'
      }
    ],
    appointments: [
      {
        id: 'apt-1',
        token: 'A-101',
        patientId: 'pat-1001',
        patientName: 'Ahmad Shah Ahmadi / احمد شاه احمدی',
        doctorId: 'doc-2',
        doctorName: 'Dr. Zabihullah Noori',
        department: 'Cardiology',
        date: today,
        time: '09:30',
        type: 'Follow-up',
        status: 'Checked-In',
        notes: 'BP check and ECG review',
        createdAt: now
      },
      {
        id: 'apt-2',
        token: 'A-102',
        patientId: 'pat-1002',
        patientName: 'Fatima Zahra Hassani / فاطمه زهرا حسنی',
        doctorId: 'doc-3',
        doctorName: 'Dr. Maryam Sadat',
        department: 'Gynecology & Obstetrics',
        date: today,
        time: '10:15',
        type: 'Consultation',
        status: 'Scheduled',
        notes: '3rd Trimester CTG & Color Doppler',
        createdAt: now
      },
      {
        id: 'apt-3',
        token: 'A-103',
        patientId: 'pat-1003',
        patientName: 'Mohammad Karim Wardak / محمد کریم وردک',
        doctorId: 'doc-1',
        doctorName: 'Dr. Feraidoon Maqsudi',
        department: 'Internal Medicine',
        date: today,
        time: '11:00',
        type: 'Consultation',
        status: 'Completed',
        notes: 'Diabetes HbA1c evaluation',
        createdAt: now
      },
      {
        id: 'apt-4',
        token: 'A-104',
        patientId: 'pat-1005',
        patientName: 'Hamidullah Stanikzai / حمیدالله ستانکزی',
        doctorId: 'doc-5',
        doctorName: 'Dr. Suhaila Amiri',
        department: 'Pediatrics',
        date: today,
        time: '12:00',
        type: 'Consultation',
        status: 'Scheduled',
        notes: 'Respiratory check and chest X-ray review',
        createdAt: now
      }
    ],
    beds: [
      { id: 'bed-1', ward: 'ICU', bedNumber: 'ICU-01', type: 'Intensive Care', dailyRate: 4500, status: 'Occupied', patientId: 'pat-1003', patientName: 'Mohammad Karim Wardak', admittedAt: '2026-11-12', diagnosis: 'Cardiac Monitoring' },
      { id: 'bed-2', ward: 'ICU', bedNumber: 'ICU-02', type: 'Intensive Care', dailyRate: 4500, status: 'Available', patientId: null, patientName: '', admittedAt: null, diagnosis: '' },
      { id: 'bed-3', ward: 'ICU', bedNumber: 'ICU-03', type: 'Intensive Care', dailyRate: 4500, status: 'Available', patientId: null, patientName: '', admittedAt: null, diagnosis: '' },
      { id: 'bed-4', ward: 'Maternity & OB/GYN', bedNumber: 'MAT-01', type: 'Maternity Bed', dailyRate: 2000, status: 'Occupied', patientId: 'pat-1002', patientName: 'Fatima Zahra Hassani', admittedAt: '2026-11-13', diagnosis: 'High-risk prenatal observation' },
      { id: 'bed-5', ward: 'Maternity & OB/GYN', bedNumber: 'MAT-02', type: 'Maternity Bed', dailyRate: 2000, status: 'Available', patientId: null, patientName: '', admittedAt: null, diagnosis: '' },
      { id: 'bed-6', ward: 'General Ward Male', bedNumber: 'GW-M01', type: 'General Bed', dailyRate: 1200, status: 'Available', patientId: null, patientName: '', admittedAt: null, diagnosis: '' },
      { id: 'bed-7', ward: 'General Ward Male', bedNumber: 'GW-M02', type: 'General Bed', dailyRate: 1200, status: 'Available', patientId: null, patientName: '', admittedAt: null, diagnosis: '' },
      { id: 'bed-8', ward: 'General Ward Female', bedNumber: 'GW-F01', type: 'General Bed', dailyRate: 1200, status: 'Available', patientId: null, patientName: '', admittedAt: null, diagnosis: '' },
      { id: 'bed-9', ward: 'Pediatrics', bedNumber: 'PED-01', type: 'Pediatric Bed', dailyRate: 1500, status: 'Available', patientId: null, patientName: '', admittedAt: null, diagnosis: '' },
      { id: 'bed-10', ward: 'Private Suites', bedNumber: 'VIP-01', type: 'Private Suite', dailyRate: 3500, status: 'Occupied', patientId: 'pat-1001', patientName: 'Ahmad Shah Ahmadi', admittedAt: '2026-11-13', diagnosis: 'Post-hypertensive stabilization' },
      { id: 'bed-11', ward: 'Private Suites', bedNumber: 'VIP-02', type: 'Private Suite', dailyRate: 3500, status: 'Available', patientId: null, patientName: '', admittedAt: null, diagnosis: '' },
      { id: 'bed-12', ward: 'Emergency Bay', bedNumber: 'ER-01', type: 'Emergency Observation', dailyRate: 1000, status: 'Maintenance', patientId: null, patientName: '', admittedAt: null, diagnosis: '' }
    ],
    labTests: [
      {
        id: 'lab-1',
        patientId: 'pat-1001',
        patientName: 'Ahmad Shah Ahmadi',
        doctorName: 'Dr. Zabihullah Noori',
        testName: 'Lipid Profile (Cholesterol, LDL, HDL, TG)',
        category: 'Biochemistry',
        sampleStatus: 'Completed',
        result: 'Total Chol: 215 mg/dL, LDL: 138 mg/dL, HDL: 42 mg/dL, TG: 165 mg/dL',
        normalRange: 'Chol < 200, LDL < 100, HDL > 40',
        unit: 'mg/dL',
        price: 900,
        orderedAt: today,
        completedAt: today
      },
      {
        id: 'lab-2',
        patientId: 'pat-1003',
        patientName: 'Mohammad Karim Wardak',
        doctorName: 'Dr. Feraidoon Maqsudi',
        testName: 'HbA1c & Fasting Blood Glucose',
        category: 'Biochemistry',
        sampleStatus: 'Completed',
        result: 'HbA1c: 7.4%, FBS: 142 mg/dL',
        normalRange: 'HbA1c < 5.7%, FBS: 70-100 mg/dL',
        unit: '% / mg/dL',
        price: 850,
        orderedAt: today,
        completedAt: today
      },
      {
        id: 'lab-3',
        patientId: 'pat-1002',
        patientName: 'Fatima Zahra Hassani',
        doctorName: 'Dr. Maryam Sadat',
        testName: 'Complete Blood Count (CBC)',
        category: 'Hematology',
        sampleStatus: 'In Progress',
        result: 'Pending analyzer verification',
        normalRange: 'Hb: 12-16 g/dL, WBC: 4.5-11.0',
        unit: 'g/dL',
        price: 400,
        orderedAt: today,
        completedAt: null
      },
      {
        id: 'lab-4',
        patientId: 'pat-1004',
        patientName: 'Nadia Rahimi',
        doctorName: 'Dr. Feraidoon Maqsudi',
        testName: 'Thyroid Panel (TSH, Free T3, Free T4)',
        category: 'Hormones',
        sampleStatus: 'Pending',
        result: 'Sample collection queued',
        normalRange: 'TSH: 0.4 - 4.0 mIU/L',
        unit: 'mIU/L',
        price: 1200,
        orderedAt: today,
        completedAt: null
      }
    ],
    radiology: [
      {
        id: 'rad-1',
        patientId: 'pat-1002',
        patientName: 'Fatima Zahra Hassani',
        doctorName: 'Dr. Tamim Sediqi',
        modality: 'Color Doppler',
        studyName: 'Obstetric Fetal & Placental Color Doppler + CTG',
        status: 'Completed',
        findings: 'Normal umbilical artery S/D ratio. Fetal heart rate 142 bpm, reactive CTG.',
        price: 1500,
        orderedAt: today
      },
      {
        id: 'rad-2',
        patientId: 'pat-1005',
        patientName: 'Hamidullah Stanikzai',
        doctorName: 'Dr. Suhaila Amiri',
        modality: 'Digital DR X-Ray',
        studyName: 'Pediatric Chest X-Ray (Low Dose)',
        status: 'Completed',
        findings: 'Clear lung fields, no focal consolidation or pleural effusion.',
        price: 700,
        orderedAt: today
      },
      {
        id: 'rad-3',
        patientId: 'pat-1001',
        patientName: 'Ahmad Shah Ahmadi',
        doctorName: 'Dr. Zabihullah Noori',
        modality: 'ECG',
        studyName: '12-Lead Digital Electrocardiogram',
        status: 'Completed',
        findings: 'Normal sinus rhythm, rate 76 bpm, mild LVH criteria.',
        price: 400,
        orderedAt: today
      },
      {
        id: 'rad-4',
        patientId: 'pat-1006',
        patientName: 'Zainab Qureshi',
        doctorName: 'Dr. Maryam Sadat',
        modality: 'Mammography',
        studyName: 'Bilateral Digital Screening Mammography',
        status: 'Pending',
        findings: 'Scheduled in Radiology Room 2',
        price: 2200,
        orderedAt: today
      }
    ],
    pharmacy: [
      { id: 'med-1', name: 'Atorvastatin 20mg', genericName: 'Atorvastatin Calcium', category: 'Cardiology', batchNo: 'AT-2026-09', expiryDate: '2028-04-01', stock: 240, reorderLevel: 50, unitPrice: 15, unit: 'Tablet' },
      { id: 'med-2', name: 'Amlodipine 5mg', genericName: 'Amlodipine Besylate', category: 'Cardiology', batchNo: 'AM-2026-04', expiryDate: '2027-11-15', stock: 310, reorderLevel: 60, unitPrice: 10, unit: 'Tablet' },
      { id: 'med-3', name: 'Amoxicillin + Clavulanate 625mg', genericName: 'Co-Amoxiclav', category: 'Antibiotic', batchNo: 'AC-2026-12', expiryDate: '2027-08-20', stock: 180, reorderLevel: 40, unitPrice: 35, unit: 'Tablet' },
      { id: 'med-4', name: 'Ceftriaxone 1g IV', genericName: 'Ceftriaxone Sodium', category: 'Antibiotic', batchNo: 'CF-2026-03', expiryDate: '2027-06-30', stock: 28, reorderLevel: 35, unitPrice: 120, unit: 'Vial' },
      { id: 'med-5', name: 'Metformin 500mg', genericName: 'Metformin HCl', category: 'Endocrinology', batchNo: 'MF-2026-07', expiryDate: '2028-02-10', stock: 420, reorderLevel: 80, unitPrice: 8, unit: 'Tablet' },
      { id: 'med-6', name: 'Omeprazole 20mg', genericName: 'Omeprazole', category: 'Gastroenterology', batchNo: 'OM-2026-11', expiryDate: '2028-01-25', stock: 350, reorderLevel: 50, unitPrice: 12, unit: 'Capsule' },
      { id: 'med-7', name: 'Paracetamol 500mg', genericName: 'Acetaminophen', category: 'Analgesic', batchNo: 'PC-2026-15', expiryDate: '2028-09-01', stock: 600, reorderLevel: 100, unitPrice: 5, unit: 'Tablet' },
      { id: 'med-8', name: 'Prenatal Folic + Iron', genericName: 'Ferrous Sulfate + Folic Acid', category: 'OB/GYN', batchNo: 'PF-2026-02', expiryDate: '2027-12-01', stock: 22, reorderLevel: 30, unitPrice: 18, unit: 'Tablet' },
      { id: 'med-9', name: 'Salbutamol Inhaler 100mcg', genericName: 'Albuterol', category: 'Respiratory', batchNo: 'SB-2026-06', expiryDate: '2027-09-15', stock: 45, reorderLevel: 15, unitPrice: 280, unit: 'Inhaler' },
      { id: 'med-10', name: 'Normal Saline 0.9% 500mL', genericName: 'Sodium Chloride IV', category: 'IV Fluids', batchNo: 'NS-2026-18', expiryDate: '2028-05-01', stock: 140, reorderLevel: 40, unitPrice: 75, unit: 'Bottle' }
    ],
    prescriptions: [
      {
        id: 'rx-1',
        patientId: 'pat-1001',
        patientName: 'Ahmad Shah Ahmadi',
        doctorName: 'Dr. Zabihullah Noori',
        items: [
          { medId: 'med-1', medName: 'Atorvastatin 20mg', dosage: '1 tab at night', duration: '30 days', qty: 30 },
          { medId: 'med-2', medName: 'Amlodipine 5mg', dosage: '1 tab every morning', duration: '30 days', qty: 30 }
        ],
        status: 'Pending',
        notes: 'Low salt diet advised',
        createdAt: today
      },
      {
        id: 'rx-2',
        patientId: 'pat-1003',
        patientName: 'Mohammad Karim Wardak',
        doctorName: 'Dr. Feraidoon Maqsudi',
        items: [
          { medId: 'med-5', medName: 'Metformin 500mg', dosage: '1 tab twice daily after meal', duration: '30 days', qty: 60 },
          { medId: 'med-6', medName: 'Omeprazole 20mg', dosage: '1 cap before breakfast', duration: '14 days', qty: 14 }
        ],
        status: 'Dispensed',
        notes: 'Recheck FBS in 4 weeks',
        createdAt: today
      }
    ],
    invoices: [
      {
        id: 'inv-1',
        invoiceNo: 'FSH-INV-1001',
        patientId: 'pat-1001',
        patientName: 'Ahmad Shah Ahmadi',
        items: [
          { description: 'Cardiology Consultation (Dr. Zabihullah Noori)', amount: 800 },
          { description: '12-Lead Digital ECG', amount: 400 },
          { description: 'Lipid Profile Lab Test', amount: 900 }
        ],
        discount: 100,
        totalAmount: 2000,
        paidAmount: 2000,
        status: 'Paid',
        paymentMethod: 'Cash (AFN)',
        createdAt: today
      },
      {
        id: 'inv-2',
        invoiceNo: 'FSH-INV-1002',
        patientId: 'pat-1002',
        patientName: 'Fatima Zahra Hassani',
        items: [
          { description: 'OB/GYN Consultation (Dr. Maryam Sadat)', amount: 600 },
          { description: 'Obstetric Color Doppler + CTG', amount: 1500 },
          { description: 'Complete Blood Count (CBC)', amount: 400 }
        ],
        discount: 0,
        totalAmount: 2500,
        paidAmount: 1500,
        status: 'Partial',
        paymentMethod: 'Cash (AFN)',
        createdAt: today
      },
      {
        id: 'inv-3',
        invoiceNo: 'FSH-INV-1003',
        patientId: 'pat-1003',
        patientName: 'Mohammad Karim Wardak',
        items: [
          { description: 'Internal Medicine Consultation', amount: 500 },
          { description: 'HbA1c & Blood Glucose', amount: 850 },
          { description: 'Pharmacy Dispense (Metformin + Omeprazole)', amount: 648 }
        ],
        discount: 48,
        totalAmount: 1950,
        paidAmount: 1950,
        status: 'Paid',
        paymentMethod: 'Cash (AFN)',
        createdAt: today
      }
    ],
    emergency: [
      {
        id: 'er-1',
        patientName: 'Najibullah Rahmani',
        age: 38,
        gender: 'Male',
        phone: '0789112233',
        triageLevel: 'Urgent',
        chiefComplaint: 'Acute chest tightness & dizziness',
        vitals: { bp: '165/95', hr: '104', temp: '37.1', spo2: '95%' },
        bay: 'ER-Bay-02',
        status: 'In ER',
        arrivedAt: now
      },
      {
        id: 'er-2',
        patientName: 'Sediqa Mohammadi',
        age: 6,
        gender: 'Female',
        phone: '0791445566',
        triageLevel: 'Standard',
        chiefComplaint: 'High fever & mild dehydration',
        vitals: { bp: '95/60', hr: '118', temp: '39.2', spo2: '98%' },
        bay: 'ER-Bay-04',
        status: 'In ER',
        arrivedAt: now
      }
    ],
    staff: [
      { id: 'stf-1', name_fa: 'نسرین هاشمی', name_en: 'Nasrin Hashimi', role_fa: 'سرپرستار بخش مراقبت جدی', role_en: 'Head Nurse (ICU)', department: 'Nursing', shift: 'Morning (08:00 - 16:00)', phone: '0781002001', status: 'Active' },
      { id: 'stf-2', name_fa: 'فرهاد کریمی', name_en: 'Farhad Karimi', role_fa: 'تکنیشن ارشد لابراتوار', role_en: 'Senior Lab Technologist', department: 'Laboratory', shift: 'Morning (08:00 - 16:00)', phone: '0781002002', status: 'Active' },
      { id: 'stf-3', name_fa: 'شفیق‌الله نظری', name_en: 'Shafiqullah Nazari', role_fa: 'فارمسست مسوول', role_en: 'Chief Pharmacist', department: 'Pharmacy', shift: '24/7 Rotation', phone: '0781002003', status: 'Active' },
      { id: 'stf-4', name_fa: 'مرضیه غفوری', name_en: 'Marzia Ghafouri', role_fa: 'تکنیشن رادیولوژی و ماموگرافی', role_en: 'Radiology & Mammography Tech', department: 'Radiology', shift: 'Morning (08:00 - 16:00)', phone: '0781002004', status: 'Active' },
      { id: 'stf-5', name_fa: 'بلال احمد پوپل', name_en: 'Bilal Ahmad Popal', role_fa: 'مسوول پذیرش و مالی', role_en: 'Reception & Billing Officer', department: 'Administration', shift: 'Morning (08:00 - 16:00)', phone: '0781002005', status: 'Active' }
    ]
  };
}

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    const seed = getSeedData();
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), 'utf8');
    return seed;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    const seed = getSeedData();
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), 'utf8');
    return seed;
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

// Initialize DB file on startup
readDB();

// Get entire DB snapshot
app.get('/api/db', (req, res) => {
  res.json(readDB());
});

// Export DB download
app.get('/api/export-db', (req, res) => {
  const db = readDB();
  res.setHeader('Content-Disposition', 'attachment; filename="ferdows_hospital_backup.json"');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(db, null, 2));
});

// Import DB restore
app.post('/api/import-db', (req, res) => {
  const incoming = req.body;
  if (!incoming || !Array.isArray(incoming.patients) || !Array.isArray(incoming.doctors)) {
    return res.status(400).json({ error: 'Invalid hospital database JSON structure.' });
  }
  writeDB(incoming);
  res.json({ success: true, data: incoming });
});

// Reset DB to Mock Seed Data
app.post('/api/reset-db', (req, res) => {
  const seed = getSeedData();
  writeDB(seed);
  res.json({ success: true, data: seed });
});

// Public Appointment Booking (Auto-registers patient if new)
app.post('/api/public/book', (req, res) => {
  const db = readDB();
  const { name, phone, gender, age, doctorId, date, time, notes } = req.body;
  if (!name || !phone || !doctorId || !date) {
    return res.status(400).json({ error: 'Required fields missing.' });
  }

  const doctor = db.doctors.find(d => d.id === doctorId);
  if (!doctor) return res.status(404).json({ error: 'Doctor not found.' });

  let patient = db.patients.find(p => p.phone === phone);
  if (!patient) {
    const nextNum = 1001 + db.patients.length;
    patient = {
      id: makeId('pat'),
      mrn: `FSH-${nextNum}`,
      name_fa: name,
      name_en: name,
      age: Number(age) || 30,
      gender: gender || 'Male',
      bloodGroup: 'Unknown',
      phone,
      address_fa: 'کابل، افغانستان',
      address_en: 'Kabul, Afghanistan',
      allergies: 'None',
      medicalHistory: 'Registered via Online Portal',
      emergencyContact: phone,
      registeredAt: new Date().toISOString().split('T')[0]
    };
    db.patients.unshift(patient);
  }

  const token = `A-${101 + db.appointments.length}`;
  const appointment = {
    id: makeId('apt'),
    token,
    patientId: patient.id,
    patientName: `${patient.name_en} / ${patient.name_fa}`,
    doctorId: doctor.id,
    doctorName: doctor.name_en,
    department: doctor.department,
    date,
    time: time || '10:00',
    type: 'Online Booking',
    status: 'Scheduled',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };
  db.appointments.unshift(appointment);
  writeDB(db);
  res.json({ success: true, appointment, patient });
});

// Public Lab & Radiology Lookup by MRN or Phone
app.get('/api/public/lookup', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  if (!q) return res.json({ patient: null, labTests: [], radiology: [] });
  const db = readDB();
  const patient = db.patients.find(
    p => p.mrn.toLowerCase() === q || p.phone.toLowerCase() === q
  );
  if (!patient) return res.json({ patient: null, labTests: [], radiology: [] });

  const labTests = db.labTests.filter(l => l.patientId === patient.id);
  const radiology = db.radiology.filter(r => r.patientId === patient.id);
  res.json({ patient, labTests, radiology });
});

// Dispense Prescription (Auto-deduct pharmacy stock + create invoice)
app.post('/api/prescriptions/:id/dispense', (req, res) => {
  const db = readDB();
  const rx = db.prescriptions.find(r => r.id === req.params.id);
  if (!rx) return res.status(404).json({ error: 'Prescription not found.' });
  if (rx.status === 'Dispensed') return res.status(400).json({ error: 'Already dispensed.' });

  let totalMedCost = 0;
  const invoiceItems = [];

  for (const item of rx.items) {
    const med = db.pharmacy.find(m => m.id === item.medId);
    if (med) {
      const qty = Number(item.qty) || 1;
      if (med.stock < qty) {
        return res.status(400).json({ error: `Insufficient stock for ${med.name}` });
      }
      med.stock -= qty;
      const lineTotal = qty * Number(med.unitPrice);
      totalMedCost += lineTotal;
      invoiceItems.push({ description: `${med.name} x ${qty}`, amount: lineTotal });
    }
  }

  rx.status = 'Dispensed';

  if (invoiceItems.length > 0) {
    const invNum = 1001 + db.invoices.length;
    db.invoices.unshift({
      id: makeId('inv'),
      invoiceNo: `FSH-INV-${invNum}`,
      patientId: rx.patientId,
      patientName: rx.patientName,
      items: invoiceItems,
      discount: 0,
      totalAmount: totalMedCost,
      paidAmount: totalMedCost,
      status: 'Paid',
      paymentMethod: 'Cash (AFN)',
      createdAt: new Date().toISOString().split('T')[0]
    });
  }

  writeDB(db);
  res.json({ success: true, db });
});

// Generic CRUD for collections
const ALLOWED_COLLECTIONS = [
  'patients', 'doctors', 'appointments', 'beds', 'labTests',
  'radiology', 'pharmacy', 'prescriptions', 'invoices', 'emergency', 'staff'
];

app.get('/api/:collection', (req, res) => {
  const { collection } = req.params;
  if (!ALLOWED_COLLECTIONS.includes(collection)) return res.status(404).json({ error: 'Invalid collection' });
  const db = readDB();
  res.json(db[collection]);
});

app.post('/api/:collection', (req, res) => {
  const { collection } = req.params;
  if (!ALLOWED_COLLECTIONS.includes(collection)) return res.status(404).json({ error: 'Invalid collection' });
  const db = readDB();
  const item = { ...req.body };

  const prefixMap = {
    patients: 'pat', doctors: 'doc', appointments: 'apt', beds: 'bed',
    labTests: 'lab', radiology: 'rad', pharmacy: 'med', prescriptions: 'rx',
    invoices: 'inv', emergency: 'er', staff: 'stf'
  };

  if (!item.id) item.id = makeId(prefixMap[collection]);

  if (collection === 'patients' && !item.mrn) {
    item.mrn = `FSH-${1001 + db.patients.length}`;
    item.registeredAt = item.registeredAt || new Date().toISOString().split('T')[0];
  }
  if (collection === 'appointments') {
    item.token = item.token || `A-${101 + db.appointments.length}`;
    item.createdAt = item.createdAt || new Date().toISOString();
  }
  if (collection === 'invoices' && !item.invoiceNo) {
    item.invoiceNo = `FSH-INV-${1001 + db.invoices.length}`;
    item.createdAt = item.createdAt || new Date().toISOString().split('T')[0];
  }
  if ((collection === 'labTests' || collection === 'radiology') && !item.orderedAt) {
    item.orderedAt = new Date().toISOString().split('T')[0];
  }
  if (collection === 'emergency' && !item.arrivedAt) {
    item.arrivedAt = new Date().toISOString();
  }

  db[collection].unshift(item);
  writeDB(db);
  res.json({ success: true, item });
});

app.put('/api/:collection/:id', (req, res) => {
  const { collection, id } = req.params;
  if (!ALLOWED_COLLECTIONS.includes(collection)) return res.status(404).json({ error: 'Invalid collection' });
  const db = readDB();
  const idx = db[collection].findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Record not found' });

  db[collection][idx] = { ...db[collection][idx], ...req.body, id };
  writeDB(db);
  res.json({ success: true, item: db[collection][idx] });
});

app.delete('/api/:collection/:id', (req, res) => {
  const { collection, id } = req.params;
  if (!ALLOWED_COLLECTIONS.includes(collection)) return res.status(404).json({ error: 'Invalid collection' });
  const db = readDB();
  db[collection] = db[collection].filter(x => x.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// Fallback to frontend (Compatible with Express 4 & Express 5)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Ferdows Specialized Hospital System running at http://localhost:${PORT}`);
  console.log(`Local database stored at: ${DB_FILE}`);
});
