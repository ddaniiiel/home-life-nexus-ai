
import React from 'react';
import { Link } from 'react-router-dom';
import Widget from '@/components/Widget';
import { Shield } from 'lucide-react';
import InteractiveInsuranceItem from './InteractiveInsuranceItem';

const InsuranceWidget = () => {
  return (
    <Widget title="Versicherungen" icon={<Shield />}>
      <div className="space-y-3">
        <InteractiveInsuranceItem
          title="Hausratversicherung"
          status="Verlängerung fällig"
          details="Frist: 30.04.2025"
          variant="danger"
          dialogTitle="Hausratversicherung verwalten"
          dialogDescription="Die Verlängerung für deine Hausratversicherung ist fällig. Hier kannst du eine Notiz hinterlegen oder eine Erinnerung erstellen."
        />
        
        <InteractiveInsuranceItem
          title="Familienhaftpflicht"
          status="Prüfen"
          details="Deckung erhöhen?"
          variant="warning"
          dialogTitle="Familienhaftpflicht prüfen"
          dialogDescription="Deine Familienhaftpflicht sollte geprüft werden. Ist die Deckung noch ausreichend?"
        />
        
        <Link to="/finances" className="text-xs text-primary hover:underline mt-3 block">
          Versicherungen verwalten →
        </Link>
      </div>
    </Widget>
  );
};

export default InsuranceWidget;
