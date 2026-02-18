import DashboardShell from '../../components/DashboardShell';
import ContentPage from '../../components/ContentPage';

export default function Page() {
  return (
    <DashboardShell>
      <ContentPage
        title="Chat"
        subtitle="Conversations with customers and support agents."
        cards={[
          { label: 'Open chats', value: '6', note: '3 waiting for reply' },
          { label: 'Avg. response', value: '2m 18s', note: 'Today' },
          { label: 'Resolved today', value: '24', note: 'Customer satisfaction 4.8/5' },
        ]}
        items={[
          { title: 'Airport pickup request', description: 'Customer asked for vehicle handoff at Terminal 2.' },
          { title: 'Rate negotiation', description: 'Client requested corporate pricing for weekly rental.' },
          { title: 'Extension request', description: 'Honda Odyssey booking extended by 1 day.' },
        ]}
      />
    </DashboardShell>
  );
}
