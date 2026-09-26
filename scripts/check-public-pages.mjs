import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
const browser = await chromium.launch({channel:'chrome',headless:true});
const urls = [
'https://www.impactfactory.com/programmes/management-skills-training/open-courses/conflict-management-course/',
'https://www.impactfactory.com/programmes/management-skills-training/open-courses/line-management-course/',
'https://www.impactfactory.com/programmes/management-skills-training/open-courses/time-management-course/',
'https://www.impactfactory.com/programmes/communication-skills-training/communicate-with-impact/',
];
const results=await Promise.allSettled(urls.map(async url=>{
 const page=await browser.newPage();
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
 await page.waitForFunction(()=>!document.body.innerText.includes('£{{courses[0].Price}}'),{timeout:15000}).catch(()=>{});
 const text=await page.locator('body').innerText();
 const entry={url,accessed:'2026-09-26',title:await page.title(),prices:[...new Set(text.match(/£[\d,]+(?:\.\d{2})?[^\n]{0,65}/g)||[])].slice(0,12),oneToOneMessageVisible:text.includes('This course is only available as one-to-one skills training.')};
 await page.close();return entry;
}));
await browser.close();
await mkdir('docs/audit',{recursive:true});
await writeFile('docs/audit/public-page-checks.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results));
