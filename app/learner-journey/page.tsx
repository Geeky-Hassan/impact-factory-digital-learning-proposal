import type { Metadata } from 'next';
import { JourneyExplorer } from '@/components/journey';
import { PageIntro } from '@/components/ui';
export const metadata: Metadata = { title: 'Learner journey' };
export default function Page() {
  return <><PageIntro number="02" label="The learner journey" title="One learner. A connected experience.">Follow Sarah through a Difficult Conversations programme. These small examples show the idea; Impact Factory would shape and approve the experience.</PageIntro><JourneyExplorer /></>;
}
