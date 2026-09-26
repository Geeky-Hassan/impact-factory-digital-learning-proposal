import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const folder = process.argv[2] || 'docs/audit/ux-screenshots';
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const routes = [['overview','/'],['journey','/learner-journey/'],['platform','/connected-platform/'],['business','/business-case/'],['next-steps','/next-steps/']];
const report = [];
async function capture(page, options) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.evaluate(() => new Promise(requestAnimationFrame));
  await page.screenshot(options);
}
for (const [width,height] of [[1440,1000],[1024,768],[768,1024],[390,844]]) {
  const page = await browser.newPage({ viewport: {width,height}, reducedMotion:'reduce' });
  for (const [name,route] of routes) {
    await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle'});
    await page.evaluate(() => document.fonts.ready);
    await capture(page,{path:folder+'/'+width+'-'+name+'.png'});
    await capture(page,{path:folder+'/'+width+'-'+name+'-full.png',fullPage:true});
    report.push(await page.evaluate(({width,height,route}) => ({
      width,height,route,pageHeight:document.documentElement.scrollHeight,
      documentFits:document.documentElement.scrollWidth<=innerWidth,
      visibleWords:document.querySelector('main').innerText.split(/\s+/).length,
      font:getComputedStyle(document.body).fontFamily,
    }),{width,height,route}));
  }
  if (width===390) {
    await page.getByRole('button',{name:'Open navigation'}).click();
    await capture(page,{path:folder+'/'+width+'-navigation.png'});
    await page.keyboard.press('Escape');
  }
  if (width===1440 || width===390) {
    await capture(page,{path:folder+'/'+width+'-demo-proposal.png',fullPage:true});
    await page.getByRole('tab',{name:/Working pilot/}).click();
    await capture(page,{path:folder+'/'+width+'-pilot-proposal.png',fullPage:true});
    await page.goto('http://127.0.0.1:3000/learner-journey/');
    await page.getByRole('tab',{name:/Remember/}).click();
    await page.getByRole('button',{name:/Open the refresher/}).click();
    await page.getByRole('group',{name:/Choose a conversation/}).getByRole('button').nth(1).click();
    await capture(page,{path:folder+'/'+width+'-remember.png',fullPage:true});
    await page.getByRole('tab',{name:/Practise/}).click();
    await page.getByRole('button',{name:/End scenario/}).click();
    await page.getByRole('button',{name:/View example feedback/}).click();
    await capture(page,{path:folder+'/'+width+'-feedback.png',fullPage:true});
    await page.getByText('AI persona, avatar & voice options',{exact:true}).click();
    await page.getByRole('group',{name:'Proposed AI interaction format'}).getByRole('button',{name:'Avatar',exact:true}).click();
    await capture(page,{path:folder+'/'+width+'-avatar-options.png',fullPage:true});
    await page.goto('http://127.0.0.1:3000/connected-platform/');
    await page.getByRole('tab',{name:'Company view'}).click();
    await capture(page,{path:folder+'/'+width+'-company.png',fullPage:true});
    await page.getByLabel('Programme',{exact:true}).selectOption('presentations');
    await capture(page,{path:folder+'/'+width+'-course-filter.png',fullPage:true});
    await page.getByRole('tab',{name:'Training team'}).click();
    await capture(page,{path:folder+'/'+width+'-training-team.png',fullPage:true});
    await page.goto('http://127.0.0.1:3000/business-case/');
    await page.getByRole('tab',{name:'One booking'}).click();
    await page.getByLabel('Base booking example').selectOption('3750');
    await capture(page,{path:folder+'/'+width+'-booking.png',fullPage:true});
    await page.locator('.nav-sources').click();
    await capture(page,{path:folder+'/'+width+'-sources.png'});
  }
  await page.close();
}
await browser.close();
await writeFile(folder+'/layout-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
