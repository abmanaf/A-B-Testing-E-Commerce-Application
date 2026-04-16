import Container from '@/components/shared/Container'
import SectionHeader from '@/components/shared/SectionHeader'
import TeamCard from '@/components/atom/TeamCard'

const TEAM = [
  {
    name: 'Abdul Karim',
    role: 'Co-founder & CEO',
    bio: 'Former product lead at a Fortune 500 retailer. Obsessed with making great products accessible to everyone.',
    initials: 'AK',
    color: 'bg-blue-500',
    imageUrl: '/images/team/abdul-karim.jpg',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Sarah Mensah',
    role: 'Co-founder & CTO',
    bio: 'Ex-Google engineer. Believes technology should remove friction, not add it. Leads our platform and engineering teams.',
    initials: 'SM',
    color: 'bg-amber-500',
    imageUrl: '/images/team/sarah-mensah.jpg',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'James Osei',
    role: 'Head of Operations',
    bio: 'Logistics expert with 10+ years optimising supply chains. If a package is late, James loses sleep.',
    initials: 'JO',
    color: 'bg-green-500',
    imageUrl: '/images/team/james-osei.jpg',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Product',
    bio: 'UX researcher turned product leader. Champions the customer in every meeting, every decision.',
    initials: 'PN',
    color: 'bg-pink-500',
    imageUrl: '/images/team/priya-nair.jpg',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Emmanuel Boateng',
    role: 'Head of Partnerships',
    bio: 'Built supplier relationships across 20+ countries. Responsible for the quality brands you love on our platform.',
    initials: 'EB',
    color: 'bg-purple-500',
    imageUrl: '/images/team/emmanuel-boateng.jpg',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Fatima Al-Hassan',
    role: 'Head of Customer Success',
    bio: 'Leads our 24/7 support team. Turned our returns process from a headache into one of our biggest competitive advantages.',
    initials: 'FA',
    color: 'bg-orange-500',
    imageUrl: '/images/team/fatima-al-hassan.jpg',
    twitter: '#',
    linkedin: '#',
  },
]

const AboutTeam = () => {
  return (
    <Container className="bg-zinc-50">
      <SectionHeader
        eyebrow="The people behind e-buy"
        title="Meet Our Team"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </div>
    </Container>
  )
}

export default AboutTeam