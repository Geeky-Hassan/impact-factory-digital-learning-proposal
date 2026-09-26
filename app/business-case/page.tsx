import type { Metadata } from 'next';
import { CommercialScenarios } from '@/components/calculators';
import { PageIntro } from '@/components/ui';
export const metadata: Metadata = { title: 'Business case' };
export default function Page() {
  return <><PageIntro number="04" label="The business case" title="A longer relationship could add value.">A connected journey could support the training offer and the client relationship. The possibilities below need testing; the numbers illustrate assumptions, not forecasts.</PageIntro>
    <section className="business-mechanisms" aria-label="Potential commercial value">
      {[['Extend the engagement','A one- or two-day programme could connect to a 30, 60 or 90-day journey.'],['Strengthen corporate proposals','Preparation, reinforcement and practice could help distinguish the overall offer.'],['Explore an optional extension','Include the journey in a programme or test a premium add-on with buyers.'],['Keep a useful learner touchpoint','Make follow-up, trainer contact and further development easier, with appropriate permissions.']].map(([title,text],i) => <article key={title}><span className="small-index">{'0'+(i+1)}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}
    </section><CommercialScenarios /><p className="page-footnote">The examples above model potential customer sales. Technology, content review and support would be costs to Impact Factory. A pilot could establish usage and workload before any margin decision.</p></>;
}
