import DashboardShell from '../../components/DashboardShell';
import ContentPage from '../../components/ContentPage';

export default function Page() {
  return (
    <DashboardShell>
      <ContentPage
        title="Favourites"
        subtitle="Quick access to your preferred vehicles and saved sets."
        cards={[
          { label: 'Favourite vehicles', value: '12', note: 'Across 7 categories' },
          { label: 'Recently used', value: '5', note: 'In the last 7 days' },
          { label: 'Pinned filters', value: '3', note: 'Reusable search sets' },
        ]}
        items={[
          { title: 'Luxury Weekend Set', description: 'High-demand premium sedans for weekend bookings.' },
          { title: 'Eco Fleet', description: 'Electric and hybrid vehicles with low operating cost.' },
          { title: 'Manual Sport Picks', description: 'Performance cars with manual transmission.' },
        ]}
      />
    </DashboardShell>
  );
}
