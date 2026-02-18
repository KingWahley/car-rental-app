import DashboardShell from '../../components/DashboardShell';
import ContentPage from '../../components/ContentPage';

export default function Page() {
  return (
    <DashboardShell>
      <ContentPage
        title="Notifications"
        subtitle="Operational alerts and customer activity updates."
        cards={[
          { label: 'Unread', value: '7', note: '2 high priority' },
          { label: 'Today', value: '19', note: 'Across all channels' },
          { label: 'Resolved', value: '53', note: 'This week' },
        ]}
        items={[
          { title: 'Booking confirmation pending', description: 'Customer payment verification required for order #AU-1942.' },
          { title: 'Maintenance due', description: 'Ford Ranger scheduled service is due in 2 days.' },
          { title: 'Price threshold alert', description: 'Lucid Air hourly price reached upper band.' },
        ]}
      />
    </DashboardShell>
  );
}
