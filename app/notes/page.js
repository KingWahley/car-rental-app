import DashboardShell from '../../components/DashboardShell';
import ContentPage from '../../components/ContentPage';

export default function Page() {
  return (
    <DashboardShell>
      <ContentPage
        title="Notes"
        subtitle="Capture fleet notes, follow-ups, and internal reminders."
        cards={[
          { label: 'Open notes', value: '18', note: '5 updated today' },
          { label: 'Flagged', value: '4', note: 'Require manager review' },
          { label: 'Shared', value: '11', note: 'Visible to operations' },
        ]}
        items={[
          { title: 'Audi A4 - tire pressure', description: 'Front-right tire pressure was adjusted after return inspection.' },
          { title: 'Tesla Model S - charging', description: 'Set charging cap to 85% for city bookings.' },
          { title: 'Mazda 6 - interior', description: 'Detailing completed and ready for premium rentals.' },
        ]}
      />
    </DashboardShell>
  );
}
