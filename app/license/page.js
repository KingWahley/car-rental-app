import DashboardShell from '../../components/DashboardShell';
import ContentPage from '../../components/ContentPage';

export default function Page() {
  return (
    <DashboardShell>
      <ContentPage
        title="License"
        subtitle="Driver license verification and compliance queue."
        cards={[
          { label: 'Pending checks', value: '9', note: 'Awaiting manual review' },
          { label: 'Verified today', value: '16', note: 'Auto and manual checks' },
          { label: 'Rejected', value: '2', note: 'Invalid expiry dates' },
        ]}
        items={[
          { title: 'Verification queue refreshed', description: 'Latest submissions synced from booking workflow.' },
          { title: 'Document mismatch', description: 'Name mismatch detected on one uploaded license.' },
          { title: 'Expiry reminder', description: '3 approved drivers expire within 30 days.' },
        ]}
      />
    </DashboardShell>
  );
}
