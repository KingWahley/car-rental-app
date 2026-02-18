import DashboardShell from '../../components/DashboardShell';
import ContentPage from '../../components/ContentPage';

export default function Page() {
  return (
    <DashboardShell>
      <ContentPage
        title="Recents"
        subtitle="Recently viewed vehicles, filters, and activities."
        cards={[
          { label: 'Viewed vehicles', value: '34', note: 'Last 48 hours' },
          { label: 'Recent searches', value: '9', note: 'Saved automatically' },
          { label: 'Return visits', value: '17', note: 'From repeat customers' },
        ]}
        items={[
          { title: 'Filter set reopened', description: 'Body Type: Crossover, Fuel: Hybrid, Transmission: Auto' },
          { title: 'Vehicle revisited', description: 'Porsche 718 Cayman viewed 6 times today.' },
          { title: 'Quote generated', description: 'Generated quote for 3-day Mazda 6 rental.' },
        ]}
      />
    </DashboardShell>
  );
}
