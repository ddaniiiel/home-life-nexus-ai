
import { Contact } from '../ContactList';
import { EmergencyPlan } from '../EmergencyPlans';
import { ImportantDocument } from '../ImportantDocuments';

export const initialContacts: Contact[] = [
  { 
    id: 1, 
    name: 'Dr. Anna Müller', 
    role: 'Hausärztin', 
    phone: '+41 44 123 45 67', 
    address: 'Gesundheitsstrasse 10, 8000 Zürich',
    email: 'anna.mueller@praxis.ch',
    info: 'Sprechzeiten: Mo-Fr 8-17 Uhr',
    category: 'medical'
  },
  { 
    id: 2, 
    name: 'Dr. Thomas Weber', 
    role: 'Kinderarzt', 
    phone: '+41 44 234 56 78',
    address: 'Kinderpraxis, Bahnhofstrasse 15, 8000 Zürich',
    email: 'weber@kinderarzt.ch',
    info: 'Notfallnummer am Wochenende: +41 44 234 56 79',
    category: 'medical'
  },
  { 
    id: 3, 
    name: 'Universitätsspital Zürich', 
    role: 'Notfallstation', 
    phone: '+41 44 255 11 11',
    address: 'Rämistrasse 100, 8091 Zürich',
    category: 'emergency'
  },
  { 
    id: 4, 
    name: 'Kantonspolizei Zürich', 
    role: 'Polizeinotruf', 
    phone: '117',
    category: 'emergency'
  },
  { 
    id: 5, 
    name: 'Feuerwehr', 
    role: 'Notruf', 
    phone: '118',
    category: 'emergency'
  },
  { 
    id: 6, 
    name: 'Sanitätsnotruf', 
    role: 'Ambulanz', 
    phone: '144',
    category: 'emergency'
  },
  { 
    id: 7, 
    name: 'Vergiftungsnotfall', 
    role: 'Toxikologisches Zentrum', 
    phone: '145',
    category: 'emergency'
  },
  { 
    id: 8, 
    name: 'Max Schneider', 
    role: 'Nachbar', 
    phone: '+41 79 123 45 67',
    address: 'Musterstrasse 12, 8000 Zürich',
    info: 'Hat Ersatzschlüssel für die Wohnung',
    category: 'personal'
  },
  { 
    id: 9, 
    name: 'Emma Huber', 
    role: 'Grossmutter', 
    phone: '+41 76 987 65 43',
    address: 'Seniorenresidenz, Altersweg 5, 8400 Winterthur',
    category: 'personal'
  },
  { 
    id: 10, 
    name: 'Autogarage Müller', 
    role: 'KFZ-Werkstatt', 
    phone: '+41 44 111 22 33',
    address: 'Industriestrasse 45, 8005 Zürich',
    email: 'service@garage-mueller.ch',
    category: 'service'
  },
  { 
    id: 11, 
    name: 'Elektro Meier', 
    role: 'Elektriker Notdienst', 
    phone: '+41 79 444 55 66',
    category: 'service'
  },
  { 
    id: 12, 
    name: 'Sanitär Schnell', 
    role: 'Sanitär Notdienst', 
    phone: '+41 79 777 88 99',
    category: 'service'
  },
];

export const initialEmergencyPlans: EmergencyPlan[] = [
  {
    id: 1,
    title: 'Feuerevakuierungsplan',
    description: 'Vorgehensweise bei einem Brand im Haus',
    steps: [
      'Ruhe bewahren und alle Familienmitglieder alarmieren',
      'Notruf 118 wählen',
      'Wenn möglich, kleine Brände löschen',
      'Räume verlassen und Türen schliessen (nicht abschliessen)',
      'Zum vereinbarten Sammelpunkt gehen: Parkbank vor dem Haus',
      'Auf Feuerwehr warten und informieren, ob noch Personen im Gebäude sind'
    ],
    lastUpdated: '2025-01-15',
    category: 'home',
    important: true
  },
  {
    id: 2,
    title: 'Medizinischer Notfall',
    description: 'Vorgehen bei medizinischen Notfällen',
    steps: [
      'Situation einschätzen: Bewusstsein, Atmung, Blutung',
      'Bei lebensbedrohlichen Situationen sofort 144 anrufen',
      'Erste Hilfe leisten falls möglich',
      'Bei Kindern: Kinderarzt Dr. Weber kontaktieren (+41 44 234 56 78)',
      'Bei Erwachsenen: Hausärztin Dr. Müller kontaktieren (+41 44 123 45 67)',
      'Notfallapotheke befindet sich im Badezimmerschrank'
    ],
    lastUpdated: '2025-02-20',
    category: 'medical',
    important: true
  },
  {
    id: 3,
    title: 'Wasserschaden',
    description: 'Maßnahmen bei einem Wasserschaden',
    steps: [
      'Hauptwasserhahn schließen (Keller, rechte Seite neben Heizung)',
      'Sanitär Notdienst kontaktieren: Sanitär Schnell (+41 79 777 88 99)',
      'Wertgegenstände aus dem betroffenen Bereich in Sicherheit bringen',
      'Wenn möglich, Wasser aufwischen um Folgeschäden zu vermeiden',
      'Hausratversicherung informieren: Police Nr. 123456789'
    ],
    lastUpdated: '2024-11-10',
    category: 'home'
  },
  {
    id: 4,
    title: 'Stromausfall',
    description: 'Vorgehen bei einem Stromausfall',
    steps: [
      'Prüfen, ob nur die eigene Wohnung betroffen ist',
      'Sicherungen im Sicherungskasten (Flur, neben Eingangstür) kontrollieren',
      'Bei defekter Sicherung: NICHT selbst reparieren, sondern Elektro Meier (+41 79 444 55 66) kontaktieren',
      'Bei größerem Ausfall: Informationen beim Stromversorger einholen',
      'Taschenlampen befinden sich in der Küchenschublade und im Nachttisch Schlafzimmer'
    ],
    lastUpdated: '2024-12-05',
    category: 'home'
  },
  {
    id: 5,
    title: 'Autopanne',
    description: 'Vorgehen bei einer Autopanne',
    steps: [
      'Fahrzeug sicher abstellen, Warnblinkanlage einschalten, Warndreieck aufstellen',
      'Pannenhilfe kontaktieren: TCS Mitgliedsnummer 87654321, Tel. 0800 140 140',
      'Alternativ: Autogarage Müller (+41 44 111 22 33) oder ADAC/TCS über App',
      'Versicherungsunterlagen befinden sich im Handschuhfach',
      'Bei Unfall mit Personenschaden: Notruf 144 und Polizei 117 rufen'
    ],
    lastUpdated: '2025-01-05',
    category: 'vehicle'
  }
];

export const initialImportantDocuments: ImportantDocument[] = [
  {
    id: 1,
    name: 'Versicherungspolicen',
    description: 'Hausrat, Haftpflicht, Rechtsschutz und KFZ-Versicherung',
    location: 'Aktenordner "Versicherungen" im Büro, 2. Fach',
    lastUpdated: '2025-01-10'
  },
  {
    id: 2,
    name: 'Reisepässe & Identitätskarten',
    description: 'Ausweisdokumente der gesamten Familie',
    location: 'Safe im Schlafzimmer, Code: 123456',
    lastUpdated: '2025-02-15'
  },
  {
    id: 3,
    name: 'Vorsorgeaufträge & Patientenverfügungen',
    description: 'Rechtsgültige Dokumente für medizinische Notfälle',
    location: 'Aktenordner "Wichtige Dokumente" im Büro, 1. Fach + digitale Kopie auf NAS',
    lastUpdated: '2024-11-20'
  },
  {
    id: 4,
    name: 'Testament & Erbregelungen',
    description: 'Notariell beglaubigte Dokumente',
    location: 'Safe im Schlafzimmer + Kopie beim Notar Dr. Meier',
    lastUpdated: '2024-09-05'
  },
  {
    id: 5,
    name: 'Grundbuchauszug & Hypothekenvertrag',
    description: 'Dokumente zum Hauseigentum',
    location: 'Aktenordner "Immobilie" im Büro + Banksafe UBS',
    lastUpdated: '2025-03-01'
  }
];
