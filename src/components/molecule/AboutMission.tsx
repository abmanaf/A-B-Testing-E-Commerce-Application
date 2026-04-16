import Container from '@/components/shared/Container'

const MISSION_STATS = [
  { value: '2020',   label: 'Founded' },
  { value: '50K+',  label: 'Happy Customers' },
  { value: '30+',   label: 'Countries Served' },
  { value: '10K+',  label: 'Products Available' },
]

const AboutMission = () => {
  return (
    <Container className="bg-white" innerClassName="max-w-5xl">

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">
            Our Mission
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl leading-tight">
            Quality products,
            <br />
            <span className="text-amber-500">no compromise.</span>
          </h2>
          <div className="mt-6 space-y-4 text-zinc-500 leading-relaxed">
            <p>
              We started e-buy because we were tired of choosing between quality
              and affordability. Too many stores either sell cheap products at
              cheap prices, or great products at prices that feel out of reach.
            </p>
            <p>
              Our mission is to bridge that gap curating only the best products
              across electronics, fashion, home and more, then negotiating
              directly with suppliers to keep prices fair for everyone.
            </p>
            <p>
              Every product on our platform goes through a strict quality review.
              If we wouldn't buy it ourselves, it doesn't make the cut.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {MISSION_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 rounded-2xl border border-zinc-100 bg-zinc-50 p-6"
            >
              <span className="text-3xl font-bold text-zinc-900">{stat.value}</span>
              <span className="text-sm text-zinc-400">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </Container>
  )
}

export default AboutMission