import DashboardShell from '../../components/DashboardShell';
import ContentPage from '../../components/ContentPage';

export default function Page() {
  return (
    <DashboardShell>
      <ContentPage
        title="Support"
        subtitle="Tickets, incidents, and platform support requests."
        cards={[
          { label: 'Open tickets', value: '11', note: '4 high urgency' },
          { label: 'In progress', value: '8', note: 'Assigned to team' },
          { label: 'Closed today', value: '15', note: 'Average close time 3h' },
        ]}
        items={[
          { title: 'Payment gateway delay', description: 'Intermittent delay detected during checkout.' },
          { title: 'Image upload issue', description: 'Two users reported slow upload on vehicle photos.' },
          { title: 'Dashboard export', description: 'CSV export request for monthly rentals.' },
        ]}
      />
    </DashboardShell>
  );
}
