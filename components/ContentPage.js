export default function ContentPage({ title, subtitle, cards = [], items = [] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#141414]">{title}</h1>
        <p className="text-[#6d6d6d] mt-2">{subtitle}</p>
      </div>

      {cards.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div key={card.label} className="rounded-xl bg-white border border-[#e9e9e9] p-5">
              <p className="text-sm text-[#777777] mb-2">{card.label}</p>
              <p className="text-3xl font-semibold text-[#141414]">{card.value}</p>
              {card.note ? <p className="text-sm text-[#8b8b8b] mt-2">{card.note}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      {items.length > 0 ? (
        <div className="rounded-xl bg-white border border-[#e9e9e9] overflow-hidden">
          {items.map((item) => (
            <div key={item.title} className="px-5 py-4 border-b last:border-b-0 border-[#efefef]">
              <p className="text-[#141414] font-medium">{item.title}</p>
              <p className="text-sm text-[#7b7b7b] mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
