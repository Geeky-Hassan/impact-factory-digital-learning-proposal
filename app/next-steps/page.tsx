import type { Metadata } from 'next';
import { NextSteps } from '@/components/executive-sections';
import { PageIntro } from '@/components/ui';
export const metadata: Metadata = { title: 'Pilot proposal' };
export default function Page() {
  return <><PageIntro number="05" label="The pilot proposal" title="Start small. Decide from the results.">Explore one programme through a short concept demo, or test a working journey with learners. Each has a clear scope, an indicative price and a review before any further investment.</PageIntro><NextSteps /></>;
}
