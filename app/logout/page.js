import DashboardShell from '../../components/DashboardShell';
import ContentPage from '../../components/ContentPage';

export default function Page() {
  return (
    <DashboardShell>
      <ContentPage
        title="Logout"
        subtitle="Session and security controls."
        cards={[
          { label: 'Active sessions', value: '2', note: 'Web and mobile' },
          { label: 'Last login', value: 'Today', note: 'From Chrome on Windows' },
          { label: 'Security score', value: 'Strong', note: '2FA enabled' },
        ]}
        items={[
          { title: 'Sign out of this device', description: 'End current session and clear local access token.' },
          { title: 'Sign out of all devices', description: 'Force logout on every active session.' },
          { title: 'Review recent access', description: 'Check recent login events for security.' },
        ]}
      />
    </DashboardShell>
  );
}
