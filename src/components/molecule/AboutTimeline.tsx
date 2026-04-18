import Container from '@/components/shared/Container';
import MilestoneItem from '@/components/atom/MilestoneItem';

const MILESTONES = [
  {
    year: '2023',
    title: 'e-buy is Founded',
    desc: 'Started in a small apartment with 50 products and a big dream. Our first order shipped within 24 hours of launch.',
  },
  {
    year: '2024',
    title: '1000 Customers Milestone',
    desc: 'Word of mouth grew faster than expected. We expanded our catalogue to 500 products across 5 categories.',
  },
  //   {
  //     year: '2022',
  //     title: 'International Expansion',
  //     desc: 'Launched shipping to 15 new countries and partnered with 3 major logistics providers for faster delivery.',
  //   },
  //   {
  //     year: '2023',
  //     title: 'Launched Mobile App',
  //     desc: 'Our iOS and Android apps went live with 50,000 downloads in the first month and a 4.8 star average rating.',
  //   },
  {
    year: '2025',
    title: '50,000 Happy Customers',
    desc: 'Reached 1K customers in Ghana with a 99% satisfaction rate and over 1000 products listed.',
  },
  {
    year: '2026',
    title: 'The Future Starts Now',
    desc: 'Investing in AI-powered personalisation, same-day delivery in major cities, and sustainable packaging across all orders.',
  },
];

const AboutTimeline = () => {
  return (
    <Container className="bg-white">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">
            How we got here
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl leading-tight">
            Our Journey
          </h2>
          <p className="mt-4 text-zinc-500 leading-relaxed">
            From a tiny apartment to serving customers in 30+ countries here's
            every milestone that shaped who we are today.
          </p>

          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <p className="text-sm font-medium text-amber-800">
              "We built e-buy because we believed great products shouldn't be a
              luxury. Five years later, that belief hasn't changed."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                AK
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-800">
                  Abdul Karim
                </p>
                <p className="text-xs text-zinc-500">Co-founder & CEO</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {MILESTONES.map((milestone, index) => (
            <MilestoneItem
              key={milestone.year}
              year={milestone.year}
              title={milestone.title}
              desc={milestone.desc}
              isLast={index === MILESTONES.length - 1}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AboutTimeline;
