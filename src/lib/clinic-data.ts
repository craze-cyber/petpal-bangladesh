export const formatBDT = (n: number) => `৳${n.toLocaleString("en-BD")}`;

export type Service = {
  id: string;
  icon: string;
  name: string;
  priceFrom: number;
  priceTo?: number;
  desc: string;
};

export const SERVICES: Service[] = [
  { id: "bird-exotic", icon: "🐦", name: "Bird & Exotic Care", priceFrom: 600, priceTo: 1000, desc: "Specialist care for parrots, finches, reptiles & exotic pets" },
  { id: "checkup", icon: "❤️", name: "Dog & Cat Checkup", priceFrom: 500, priceTo: 800, desc: "General health check and wellness screening" },
  { id: "vaccination", icon: "💉", name: "Vaccination", priceFrom: 300, priceTo: 1500, desc: "Core & non-core vaccines for all pets" },
  { id: "dental", icon: "🦷", name: "Dental Care", priceFrom: 800, priceTo: 2000, desc: "Scaling, polishing and oral health" },
  { id: "surgery", icon: "✂️", name: "Surgery Consultation", priceFrom: 1000, desc: "Pre-surgical consult with our surgeons" },
  { id: "video", icon: "📹", name: "Video Consultation", priceFrom: 400, desc: "Talk to a vet from home, ideal for follow-ups" },
];

export type Doctor = {
  id: string;
  name: string;
  photo: string;
  degrees: string;
  regNumber: string;
  specs: string[];
  langs: string[];
  experience: number;
  rating: number;
  fee: number;
  nextSlot: string;
  nextToday: boolean;
  bio: string;
  education: { year: string; what: string }[];
  hours: { day: string; time: string }[];
};

export const DOCTORS: Doctor[] = [
  {
    id: "dr-rahman",
    name: "Dr. Anisur Rahman",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    degrees: "BVSc, DAV",
    regNumber: "BVC-2014-1198",
    specs: ["Birds", "Exotic"],
    langs: ["বাংলা", "English"],
    experience: 12,
    rating: 4.9,
    fee: 800,
    nextSlot: "Today, 4:30 PM",
    nextToday: true,
    bio: "Senior avian veterinarian with over 12 years caring for parrots, raptors and exotic species across Bangladesh.",
    education: [
      { year: "2012", what: "BVSc — Bangladesh Agricultural University" },
      { year: "2015", what: "DAV — Diploma in Avian Veterinary, India" },
      { year: "2019", what: "Avian Surgery Fellowship — Singapore" },
    ],
    hours: [
      { day: "Sat–Thu", time: "10:00 AM – 6:00 PM" },
      { day: "Fri", time: "3:00 PM – 7:00 PM" },
    ],
  },
  {
    id: "dr-nasrin",
    name: "Dr. Nasrin Akter",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    degrees: "BVSc, MS (Surgery)",
    regNumber: "BVC-2016-2042",
    specs: ["Dogs", "Cats", "Surgery"],
    langs: ["বাংলা", "English"],
    experience: 9,
    rating: 4.8,
    fee: 700,
    nextSlot: "Tomorrow, 11:00 AM",
    nextToday: false,
    bio: "Small-animal surgeon focused on soft-tissue and orthopedic procedures for dogs and cats.",
    education: [
      { year: "2014", what: "BVSc — Chittagong Veterinary University" },
      { year: "2017", what: "MS Surgery — BAU" },
    ],
    hours: [
      { day: "Sat–Thu", time: "9:00 AM – 5:00 PM" },
      { day: "Fri", time: "Closed" },
    ],
  },
  {
    id: "dr-hossain",
    name: "Dr. Tanvir Hossain",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    degrees: "BVSc, Dental Cert.",
    regNumber: "BVC-2018-3310",
    specs: ["Dental", "Cats"],
    langs: ["বাংলা", "English"],
    experience: 6,
    rating: 4.7,
    fee: 600,
    nextSlot: "Today, 6:00 PM",
    nextToday: true,
    bio: "Veterinary dentist providing scaling, extractions and oral surgery for cats and small dogs.",
    education: [
      { year: "2016", what: "BVSc — SAU Dhaka" },
      { year: "2020", what: "Advanced Dental Cert. — Thailand" },
    ],
    hours: [
      { day: "Sat–Thu", time: "12:00 PM – 8:00 PM" },
      { day: "Fri", time: "2:00 PM – 8:00 PM" },
    ],
  },
  {
    id: "dr-sultana",
    name: "Dr. Marium Sultana",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
    degrees: "BVSc, MPH",
    regNumber: "BVC-2019-4001",
    specs: ["Birds", "Dogs"],
    langs: ["বাংলা", "English"],
    experience: 5,
    rating: 4.8,
    fee: 550,
    nextSlot: "Today, 5:15 PM",
    nextToday: true,
    bio: "General practice vet with a focus on preventive care, vaccinations and nutrition.",
    education: [
      { year: "2018", what: "BVSc — BAU" },
      { year: "2022", what: "MPH — One Health" },
    ],
    hours: [
      { day: "Sat–Thu", time: "10:00 AM – 6:00 PM" },
      { day: "Fri", time: "3:00 PM – 7:00 PM" },
    ],
  },
];

export const SPEC_FILTERS = ["All", "Birds", "Dogs", "Cats", "Exotic", "Surgery", "Dental"] as const;

export type Pet = { id: string; name: string; species: string; breed: string; age: string; photo: string };
export const PETS: Pet[] = [
  { id: "p1", name: "Mishti", species: "Bird", breed: "Cockatiel", age: "2 yrs", photo: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=300&q=80" },
  { id: "p2", name: "Bruno", species: "Dog", breed: "Labrador", age: "4 yrs", photo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&q=80" },
  { id: "p3", name: "Luna", species: "Cat", breed: "Persian", age: "3 yrs", photo: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&q=80" },
];

export const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
  "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
];
export const BOOKED_SLOTS = new Set(["10:00 AM", "11:30 AM", "3:00 PM", "5:00 PM"]);

export type Appointment = {
  id: string;
  petId: string;
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  type: "in-person" | "video";
  status: "upcoming" | "past" | "cancelled";
  fee: number;
};

export const APPOINTMENTS: Appointment[] = [
  { id: "CLI-2025-10042", petId: "p1", serviceId: "bird-exotic", doctorId: "dr-rahman", date: "2026-06-22", time: "4:30 PM", type: "in-person", status: "upcoming", fee: 800 },
  { id: "CLI-2025-10031", petId: "p2", serviceId: "vaccination", doctorId: "dr-sultana", date: "2026-05-14", time: "11:00 AM", type: "in-person", status: "past", fee: 600 },
  { id: "CLI-2025-09988", petId: "p3", serviceId: "dental", doctorId: "dr-hossain", date: "2026-04-02", time: "5:30 PM", type: "in-person", status: "past", fee: 1200 },
  { id: "CLI-2025-09950", petId: "p2", serviceId: "checkup", doctorId: "dr-nasrin", date: "2026-03-20", time: "3:00 PM", type: "video", status: "cancelled", fee: 400 },
];

export type Prescription = {
  appointmentId: string;
  doctorId: string;
  petId: string;
  date: string;
  diagnosis: string;
  meds: { name: string; dosage: string; frequency: string; days: number }[];
  notes: string;
};
export const PRESCRIPTIONS: Record<string, Prescription> = {
  "CLI-2025-10031": {
    appointmentId: "CLI-2025-10031",
    doctorId: "dr-sultana",
    petId: "p2",
    date: "2026-05-14",
    diagnosis: "Annual vaccination — DHPPiL booster administered. Pet in good health.",
    meds: [
      { name: "Apoquel 5.4mg", dosage: "1 tab", frequency: "Once daily", days: 7 },
      { name: "Vitamin B-Complex", dosage: "5ml", frequency: "Twice daily", days: 14 },
    ],
    notes: "Keep pet calm for 24 hours post-vaccination. Watch for swelling at injection site. Next booster due May 2027.",
  },
  "CLI-2025-09988": {
    appointmentId: "CLI-2025-09988",
    doctorId: "dr-hossain",
    petId: "p3",
    date: "2026-04-02",
    diagnosis: "Mild gingivitis. Dental scaling and polishing completed.",
    meds: [
      { name: "Metronidazole 250mg", dosage: "½ tab", frequency: "Twice daily", days: 5 },
      { name: "Oral antiseptic gel", dosage: "Apply pea-size", frequency: "After meals", days: 10 },
    ],
    notes: "Soft food only for 3 days. Brush teeth weekly. Follow-up in 6 months.",
  },
};

export type Vaccine = { name: string; given: string; nextDue: string; soon?: boolean };
export const VACCINATIONS: Record<string, Vaccine[]> = {
  p1: [
    { name: "PBFD Vaccine", given: "2025-08-12", nextDue: "2026-08-12" },
    { name: "Polyomavirus", given: "2025-08-12", nextDue: "2026-07-01", soon: true },
  ],
  p2: [
    { name: "DHPPiL (5-in-1)", given: "2026-05-14", nextDue: "2027-05-14" },
    { name: "Rabies", given: "2025-11-02", nextDue: "2026-11-02" },
    { name: "Kennel Cough", given: "2025-10-01", nextDue: "2026-07-10", soon: true },
  ],
  p3: [
    { name: "FVRCP (3-in-1)", given: "2026-01-15", nextDue: "2027-01-15" },
    { name: "Rabies", given: "2025-12-20", nextDue: "2026-12-20" },
  ],
};

export const getDoctor = (id: string) => DOCTORS.find((d) => d.id === id);
export const getService = (id: string) => SERVICES.find((s) => s.id === id);
export const getPet = (id: string) => PETS.find((p) => p.id === id);
export const getAppointment = (id: string) => APPOINTMENTS.find((a) => a.id === id);
