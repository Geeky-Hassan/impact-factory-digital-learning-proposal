import type { Metadata } from 'next';
import { LearnerPlatform } from '@/components/illustrations';
import { PageIntro } from '@/components/ui';
export const metadata: Metadata = { title: 'Learning platform' };
export default function Page() {
  return <><PageIntro number="03" label="The learning platform" title="One home for the whole learning journey.">An Impact Factory learning hub: a lightweight learning management system (LMS) connecting courses, live sessions and follow-up. Start with one programme, with a clear path to supporting company and public courses.</PageIntro><LearnerPlatform /></>;
}
