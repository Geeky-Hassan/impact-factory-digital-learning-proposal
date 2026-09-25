import { expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JourneyExplorer, RememberDemo, RoleplayDemo } from '@/components/journey';
import { AnnualCalculator, BookingCalculator } from '@/components/calculators';
import { SourceButton, SourceProvider } from '@/components/sources';
import { Navigation } from '@/components/navigation';

it('makes feedback a separate step after ending the roleplay', async () => {
  const user = userEvent.setup();
  render(<RoleplayDemo />);
  await user.click(screen.getByRole('button', { name: /Begin the example/ }));
  expect(screen.getByText(/Every time I start something/)).toBeTruthy();
  expect(screen.queryByText('One strength. One next step.')).toBeNull();
  expect(screen.queryByRole('button', { name: /View example feedback/ })).toBeNull();
  await user.click(screen.getByRole('button', { name: /Continue exchange/ }));
  await user.click(screen.getByRole('button', { name: /End scenario/ }));
  expect(screen.getByText('Simulation ended')).toBeTruthy();
  expect(screen.queryByText('One strength. One next step.')).toBeNull();
  await user.click(screen.getByRole('button', { name: /View example feedback/ }));
  expect(screen.getByText(/You explored competing demands/)).toBeTruthy();
  await user.click(screen.getByRole('button', { name: /Retry the example/ }));
  expect(screen.getByRole('button', { name: /Begin the example/ })).toBeTruthy();
  expect(screen.queryByText('One strength. One next step.')).toBeNull();
});

it('changes the character response and clears the previous exchange on a new difficulty', async () => {
  const user = userEvent.setup();
  render(<RoleplayDemo />);
  await user.click(screen.getByRole('button', { name: /Begin the example/ }));
  await user.click(screen.getByRole('button', { name: 'Challenging' }));
  expect(screen.queryByText(/Every time I start something/)).toBeNull();
  await user.click(screen.getByRole('button', { name: /Begin the example/ }));
  expect(screen.getByText(/nobody notices how much/)).toBeTruthy();
  await user.click(screen.getByRole('button', { name: /End scenario/ }));
  await user.click(screen.getByRole('button', { name: /View example feedback/ }));
  expect(screen.getByText(/This short opening gives limited evidence/)).toBeTruthy();
});

it('turns a notification into an activity with response-specific feedback and a reset', async () => {
  const user = userEvent.setup();
  render(<RememberDemo />);
  expect(screen.queryByRole('group', { name: /Choose a conversation/ })).toBeNull();
  await user.click(screen.getByRole('button', { name: /Open the refresher/ }));
  const choices = within(screen.getByRole('group', { name: /Choose a conversation/ }));
  await user.click(choices.getByRole('button', { name: /You clearly/ }));
  expect(screen.getByRole('status').textContent).toContain('assumes a motive');
  await user.click(choices.getByRole('button', { name: /last three deadlines/ }));
  expect(screen.getByRole('status').textContent).toContain('invites Alex');
  expect(screen.getByRole('status').textContent).not.toContain('assumes a motive');
  await user.click(screen.getByRole('button', { name: /Reset refresher/ }));
  expect(screen.queryByRole('status')).toBeNull();
  expect(screen.getByRole('button', { name: /Open the refresher/ })).toBeTruthy();
});

it('requires explicit sharing before revealing the preparation summary', async () => {
  const user = userEvent.setup();
  render(<JourneyExplorer />);
  expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(false);
  expect(screen.queryByText(/Focus: i worry/)).toBeNull();
  await user.selectOptions(screen.getByLabelText('What makes it difficult?'), 'I am unsure how to begin');
  await user.click(screen.getByRole('checkbox'));
  expect(screen.getByText(/Focus: i am unsure how to begin/)).toBeTruthy();
  await user.click(screen.getByRole('checkbox'));
  expect(screen.queryByText(/Focus: i am unsure how to begin/)).toBeNull();
});

it('supports keyboard journey navigation and a coach-to-practice transition', async () => {
  const user = userEvent.setup();
  render(<JourneyExplorer />);
  const first = screen.getByRole('tab', { name: /Before/ });
  first.focus();
  await user.keyboard('{ArrowRight}');
  expect(document.activeElement).toBe(screen.getByRole('tab', { name: /Live/ }));
  expect(screen.getByRole('tab', { name: /Live/ }).getAttribute('aria-selected')).toBe('true');
  await user.keyboard('{End}');
  expect(screen.getByRole('tab', { name: /Apply/ }).getAttribute('aria-selected')).toBe('true');
  await user.click(screen.getByRole('button', { name: 'Practise it' }));
  await user.click(screen.getByRole('button', { name: /Open the practice example/ }));
  expect(screen.getByRole('tabpanel').id).toBe('panel-practise');
  expect(document.activeElement).toBe(screen.getByRole('tab', { name: /Practise/ }));
});

it('recalculates sales and shows validation instead of a misleading empty-input total', async () => {
  const user = userEvent.setup();
  render(<AnnualCalculator />);
  await user.click(screen.getByRole('button', { name: '20%' }));
  await user.click(screen.getByRole('button', { name: '£100' }));
  expect(screen.getByText(/At this adoption and price/).textContent).toContain('£100,000');
  expect(screen.getByText('Illustrative gross sales scenario, not a forecast.')).toBeTruthy();
  await user.clear(screen.getByLabelText('Annual learner base'));
  expect(screen.getByRole('alert').textContent).toContain('Enter a whole learner base');
  expect(screen.queryByText(/At this adoption and price/)).toBeNull();
  await user.click(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.getByText(/At this adoption and price/).textContent).toContain('£25,000');
});

it('preserves the booking qualification when changing the commercial assumption', async () => {
  const user = userEvent.setup();
  render(<BookingCalculator />);
  await user.selectOptions(screen.getByLabelText('Base booking example'), '3750');
  await user.click(screen.getByRole('button', { name: '£100' }));
  expect(screen.getByText('£4,550')).toBeTruthy();
  expect(screen.getByText('21.3%')).toBeTruthy();
  expect(screen.getByText(/pairs £3,750 with maximum ten/)).toBeTruthy();
  await user.selectOptions(screen.getByLabelText('Participants'), '4');
  expect(screen.getByText('£4,150')).toBeTruthy();
  expect(screen.getByText('10.7%')).toBeTruthy();
});

it('opens a qualified source and returns to the proposal on close', async () => {
  const user = userEvent.setup();
  render(<SourceProvider><SourceButton id="S06">Annual scale source</SourceButton></SourceProvider>);
  await user.click(screen.getByRole('button'));
  const dialog = screen.getByRole('dialog');
  expect(within(dialog).getByText(/retrospective LinkedIn post reports 4,100/)).toBeTruthy();
  expect(within(dialog).getByRole('link', { name: /Read original source/ }).getAttribute('rel')).toBe('noreferrer');
  await user.click(within(dialog).getByRole('button', { name: 'Close source' }));
  expect(screen.queryByRole('dialog')).toBeNull();
});

it('closes the mobile navigation after selecting a destination', async () => {
  const user = userEvent.setup();
  render(<Navigation />);
  await user.click(screen.getByRole('button', { name: 'Open navigation' }));
  const nav = screen.getByRole('navigation', { name: 'Mobile navigation' });
  await user.click(within(nav).getByRole('link', { name: /The journey/ }));
  expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded')).toBe('false');
});
