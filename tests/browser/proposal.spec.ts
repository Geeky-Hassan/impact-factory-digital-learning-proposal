import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = [
  ['/', 'Overview'], ['/learner-journey/', 'Learner journey'], ['/connected-platform/', 'Learning platform'],
  ['/business-case/', 'Business case'], ['/next-steps/', 'Pilot proposal'],
] as const;

test('all five pages, real navigation, history and legacy link work', async ({page}) => {
  const errors:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));
  for (const [route,label] of routes) {
    const response=await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const desktop=page.getByRole('navigation',{name:'Proposal pages'});
    if (await desktop.isVisible()) await expect(desktop.getByRole('link',{name:new RegExp(label+'$')})).toHaveAttribute('aria-current','page');
    else {
      await page.getByRole('button',{name:'Open navigation'}).click();
      await expect(page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:new RegExp(label+'$')})).toHaveAttribute('aria-current','page');
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button',{name:'Open navigation'})).toBeFocused();
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect(await page.evaluate(()=>document.documentElement.scrollHeight)).toBeLessThan(2600);
  }
  await page.goto('/');
  if (await page.getByRole('button',{name:'Open navigation'}).isVisible()) {
    await page.getByRole('button',{name:'Open navigation'}).click();
    await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:/Learner journey/}).click();
    await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toHaveCount(0);
    await page.getByRole('link',{name:'Impact Factory and MyPath proposal overview'}).click();
  }
  await page.getByRole('link',{name:'Explore the learner journey'}).click();
  await expect(page).toHaveURL(/\/learner-journey\/$/);
  await page.getByRole('link',{name:/View the learning platform/}).click();
  await expect(page).toHaveURL(/\/connected-platform\/$/);
  await expect(page.getByRole('heading',{name:'One home for the whole learning journey.'})).toBeVisible();
  await page.waitForLoadState('networkidle');
  await page.reload();
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('tab',{name:'Learner view'})).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/learner-journey\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/connected-platform\/$/);
  await page.goto('/impact-factory-digital-learning/');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('h1')).toContainText('Extending the learning journey');
  expect(errors).toEqual([]);
});

test('six journey stages, consent, quiz, separate roleplay feedback and coach', async ({page})=>{
  await page.goto('/learner-journey/');
  const mutations:string[]=[];
  page.on('request',r=>{if(['POST','PUT','PATCH','DELETE'].includes(r.method()))mutations.push(r.url());});
  await expect(page.getByRole('checkbox')).not.toBeChecked();
  await expect(page.locator('.select-control > svg')).toBeVisible();
  await page.getByLabel('What makes it difficult?').focus();
  expect(await page.getByLabel('What makes it difficult?').evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
  expect((await page.getByLabel('What makes it difficult?').boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.getByLabel('What makes it difficult?').selectOption('I am unsure how to begin');
  await page.getByRole('checkbox').check();
  await expect(page.getByText(/Trainer preview: i am unsure/)).toBeVisible();
  await page.getByRole('tab',{name:/Live/}).click();
  await expect(page.locator('.live-example')).toContainText('The trainer leads.');
  await page.getByRole('tab',{name:/Remember/}).click();
  await page.getByRole('button',{name:/Open the refresher/}).click();
  for (let i=0;i<3;i++) {
    await page.getByRole('group',{name:/Choose a conversation/}).getByRole('button').nth(i).click();
    await expect(page.locator('.answer-feedback')).toBeVisible();
  }
  await page.getByRole('button',{name:'Reset',exact:true}).click();
  await expect(page.locator('.answer-feedback')).toHaveCount(0);
  await page.getByRole('tab',{name:/Practise/}).click();
  for(const level of ['Receptive','Defensive','Challenging']){
    await page.getByRole('button',{name:level,exact:true}).click();
    await expect(page.locator('.chat-line.alex')).toBeVisible();
    await expect(page.locator('.roleplay-feedback')).toHaveCount(0);
    await page.getByRole('button',{name:/End scenario/}).click();
    await expect(page.getByText('Simulation ended')).toBeVisible();
    await expect(page.locator('.roleplay-feedback')).toHaveCount(0);
    await page.getByRole('button',{name:/View example feedback/}).click();
    await expect(page.locator('.roleplay-feedback')).toContainText('limited evidence');
    await page.getByRole('button',{name:/Practise again/}).click();
  }
  await page.getByText('AI persona, avatar & voice options',{exact:true}).click();
  await page.getByRole('group',{name:'Proposed AI interaction format'}).getByRole('button',{name:'Avatar',exact:true}).click();
  await expect(page.locator('.persona-preview')).toContainText('explicit permission');
  await expect(page.getByText(/no live AI, generated speech or avatar video/)).toBeVisible();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('tab',{name:/Apply/}).click();
  await page.getByRole('button',{name:'Plan',exact:true}).click();
  await expect(page.getByText('A small conversation plan')).toBeVisible();
  await page.getByRole('button',{name:'Practise',exact:true}).click();
  await page.getByRole('button',{name:/Open the practice example/}).click();
  await expect(page.getByRole('tab',{name:/Practise/})).toBeFocused();
  await page.getByRole('tab',{name:/Continue/}).click();
  await expect(page.getByText('Ask her trainer a question')).toBeVisible();
  expect(mutations).toEqual([]);
});

test('all nine annual scenarios, custom inputs, reset and booking calculations', async({page})=>{
  await page.goto('/business-case/');
  const annual=page.locator('.annual-calculator');
  for(const [adoption,price,result] of [[10,50,'£25,000'],[20,50,'£50,000'],[30,50,'£75,000'],[10,100,'£50,000'],[20,100,'£100,000'],[30,100,'£150,000'],[10,200,'£100,000'],[20,200,'£200,000'],[30,200,'£300,000']] as const){
    await annual.getByRole('button',{name:adoption+'%',exact:true}).click();
    await annual.getByRole('button',{name:'£'+price,exact:true}).click();
    await expect(annual.locator('.result-number')).toHaveText(result);
  }
  await page.getByLabel('Assumed adoption').fill('17');
  await page.getByLabel('Assumed extension price').fill('50.5');
  await expect(page.locator('.result-number')).toHaveText('£42,925');
  await expect(page.locator('.result-equation')).toContainText('£50.50');
  await page.getByLabel('Annual learner base').fill('');
  await expect(annual.getByRole('alert')).toBeVisible();
  await page.getByRole('button',{name:'Reset',exact:true}).click();
  await expect(page.locator('.result-number')).toHaveText('£25,000');
  await page.getByLabel('Annual learner base').fill('1000000');
  await page.getByLabel('Assumed adoption').fill('100');
  await page.getByLabel('Assumed extension price').fill('10000');
  await expect(page.locator('.result-number')).toHaveText('£10,000,000,000');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.getByRole('tab',{name:'One booking'}).click();
  await expect(page.locator('.booking-result')).toContainText('£3,900');
  await page.getByLabel('Base booking example').selectOption('3750');
  await expect(page.locator('.booking-result')).toContainText('£4,150');
  await expect(page.locator('.booking-result')).toContainText('10.7%');
  await page.getByRole('button',{name:'£100',exact:true}).click();
  await expect(page.locator('.booking-result')).toContainText('£4,550');
  await expect(page.locator('.booking-result')).toContainText('21.3%');
  await expect(page.getByText(/pairs £3,750 with maximum ten/)).toBeVisible();
});

test('learner and company views show different, permissioned information',async({page})=>{
  await page.goto('/connected-platform/');
  await expect(page.getByText('Opening conversations clearly')).toBeVisible();
  await page.getByRole('tab',{name:'Company view'}).click();
  await expect(page.getByText('Opening conversations clearly')).toHaveCount(0);
  await expect(page.locator('.company-totals')).toContainText('32');
  await expect(page.locator('.company-totals')).toContainText('29');
  await expect(page.getByText(/not unique people/)).toBeVisible();
  await page.getByLabel('Programme',{exact:true}).selectOption('conversations');
  await expect(page.locator('.company-totals')).toContainText('20');
  await expect(page.locator('.company-totals')).toContainText('18');
  await expect(page.getByText('Journey activated')).toBeVisible();
  await expect(page.locator('.record-privacy')).toContainText('not shown to the employer by default');
  await page.getByLabel('Programme',{exact:true}).selectOption('presentations');
  await expect(page.locator('.company-totals')).toContainText('12');
  await expect(page.locator('.company-totals')).toContainText('11');
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('tab',{name:'Training team'}).click();
  await expect(page.getByText('Awaiting trainer approval')).toBeVisible();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('tab',{name:'Learner view'}).click();
  await expect(page.getByText('Sarah Mitchell')).toBeVisible();
});

test('pilot decision, trust, source search, classification and modal focus work',async({page})=>{
  await page.goto('/next-steps/');
  await expect(page.getByText('£2,500–£3,500',{exact:true})).toBeVisible();
  await expect(page.getByText('£7,500–£12,000',{exact:true})).toBeVisible();
  await expect(page.getByText('2–3 weeks',{exact:true})).toBeVisible();
  await expect(page.getByText('Around 2 months',{exact:true})).toBeVisible();
  await expect(page.getByRole('tabpanel')).toContainText('not a live learner service');
  await page.getByRole('tab',{name:/Concept demo/}).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:/Working pilot/})).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('30–50 learners');
  await expect(page.getByRole('tabpanel')).toContainText('One live AI roleplay');
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('tab',{name:/Concept demo/}).click();
  await expect(page.getByRole('tabpanel')).toContainText('scripted roleplay');
  await expect(page.getByText('Refine, extend or stop.')).toBeVisible();
  await expect(page.getByText(/£20k|£35k|£1,000–£2,500/)).toHaveCount(0);
  await page.getByText('What we would design carefully',{exact:true}).click();
  await expect(page.getByText(/An instructor’s face or voice/)).toBeVisible();
  await page.getByText('What MyPath could contribute',{exact:true}).click();
  await expect(page.getByText('Already working in MyPath',{exact:true})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Is this worth testing with one programme?'})).toBeVisible();
  const source=page.locator('.phase-estimate').getByRole('button',{name:/View source/});
  await source.click();
  await expect(page.getByRole('dialog')).toContainText('INDICATIVE ESTIMATE');
  await expect(page.getByRole('dialog')).toContainText('not confirmed quotes');
  await page.keyboard.press('Escape');
  await expect(source).toBeFocused();
  await page.locator('.nav-sources').click();
  const dialog=page.getByRole('dialog');
  await dialog.getByRole('button',{name:'Calculations',exact:true}).click();
  await expect(dialog.locator('.source-list li')).toHaveCount(2);
  await dialog.getByRole('button',{name:'All',exact:true}).click();
  await dialog.getByRole('searchbox',{name:'Search sources'}).fill('unmatched-example');
  await expect(dialog.getByRole('status')).toContainText('No matching sources');
  await dialog.getByRole('searchbox',{name:'Search sources'}).fill('LinkedIn');
  await expect(dialog.locator('.source-list li').first()).toBeVisible();
  await dialog.getByRole('button',{name:'Close sources'}).click();
  await expect(page.locator('.nav-sources')).toBeFocused();
});

test('keyboard tab navigation, contrast, page structure and accessible sources',async({page})=>{
  for(const [route] of routes){
    await page.goto(route);
    const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  }
  await page.goto('/learner-journey/');
  await page.getByRole('tab',{name:/Prepare/}).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:/Live/})).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab',{name:/Continue/})).toBeFocused();
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab',{name:/Prepare/})).toBeFocused();
  await page.locator('.nav-sources').click();
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});
