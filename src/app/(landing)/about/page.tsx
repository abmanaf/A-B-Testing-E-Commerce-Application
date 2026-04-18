import AboutHero from '@/components/molecule/AboutHero';
import AboutMission from '@/components/molecule/AboutMission';
import AboutValues from '@/components/molecule/AboutValues';
import AboutTimeline from '@/components/molecule/AboutTimeline';
import AboutTeam from '@/components/molecule/AboutTeam';
import AboutCTA from '@/components/molecule/AboutCTA';

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <AboutCTA />
    </div>
  );
}
