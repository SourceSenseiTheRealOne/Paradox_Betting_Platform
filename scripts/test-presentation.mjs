// Source-copy regression checks, not integrated betting or contract tests.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => {
  const url = new URL(path, root);
  assert.ok(existsSync(url), `Missing presentation file: ${path}`);
  return readFileSync(url, 'utf8').replace(/^\uFEFF/, '');
};
const page = (name) => read(`frontend/src/pages/${name}.tsx`);
const section = (text, start, end) => {
  const from = text.indexOf(start);
  const to = text.indexOf(end, from + start.length);
  assert.ok(from >= 0 && to > from, `Missing section: ${start} … ${end}`);
  return text.slice(from, to);
};
const title = 'Paradox — Betting Escrow Prototype';

test('README leads with identity, unsubmitted provenance and financial risk', () => {
  const intro = read('README.md').split('## ')[0];
  assert.ok(intro.startsWith(`# ${title}\n`));
  assert.match(intro, /hackathon work.*not submitted/i);
  assert.match(intro, /mock.*not connected to the escrow/i);
  assert.match(intro, /payout and refund defects/i);
  assert.match(intro, /do not use real funds/i);
});

test('HTML title and social description identify the simulated prototype', () => {
  const html = read('frontend/index.html');
  assert.ok(html.includes(`<title>${title}</title>`));
  assert.ok(html.includes(`property="og:title" content="${title}"`));
  for (const kind of ['name="description"', 'property="og:description"']) {
    const meta = html.match(new RegExp(`<meta ${kind} content="([^"]+)"`));
    assert.ok(meta, kind);
    assert.match(meta[1], /prototype/i);
    assert.match(meta[1], /simulated/i);
  }
});

test('home hero and individual metrics are explicitly simulated', () => {
  const src = page('Index');
  const hero = section(src, '{/* Hero Section */}', '{/* Categories Section */}');
  assert.match(hero, /Simulation only/);
  assert.match(hero, /not connected to the escrow/);
  assert.doesNotMatch(hero, /Now Live|Bet Across Chains|Instantly\./);
  const stats = section(src, 'const stats = [', '];');
  for (const [value, label] of [
    ['$2.5M+', 'Simulated volume'], ['10K+', 'Simulated users'],
    ['50K+', 'Simulated bets'], ['99.9%', 'Simulated uptime'],
  ]) assert.ok(stats.includes(`value: "${value}", label: "${label}"`));
  assert.doesNotMatch(src, /Secure & Trustless|payouts instantly|Join thousands|Best Odds/);
});

test('dashboard header and pool controls disclose sample data and no-op betting', () => {
  const src = page('Dashboard');
  const header = section(src, '{/* Header */}', '{/* Category Filters */}');
  assert.match(header, /Simulated betting dashboard/);
  assert.match(header, /Sample bets, odds, pools and participants/);
  assert.match(header, /not live/);
  assert.match(section(src, '{/* Total Pool */}', '{/* Place Bet Button */}'), />Simulated pool</);
  assert.match(section(src, '{/* Place Bet Button */}', '</Button>'), /Betting unavailable/);
  assert.doesNotMatch(header, /Explore live bets/);
});

test('create form labels and its exact success toast deny persistence', () => {
  const src = page('CreateBet');
  const handler = section(src, 'const handleCreateBet =', '// Reset form');
  assert.match(handler, /toast\.success\("Demo only: form cleared"/);
  assert.match(handler, /description: "No bet was saved or submitted to a contract\."/);
  assert.doesNotMatch(handler, /created successfully|now live/);
  assert.match(section(src, '{/* Header */}', '<form '), /Demo form only/);
  assert.match(section(src, '{/* Submit Button */}', '</form>'), /Simulate bet creation/);
});

test('about describes missing integration and known defects rather than guarantees', () => {
  const src = page('About');
  assert.doesNotMatch(src, /Trustless & Secure|Instant Settlements|Non-Custodial|instantly across multiple chains|automatically settle/);
  assert.match(section(src, 'const features = [', '];'), /payout and refund defects/);
  assert.match(section(src, '{/* Technology Section */}', '{/* CTA Section */}'), /No contract deployment has been verified/);
});

test('secondary fixture pages label their own headers and result sections', () => {
  const mine = page('MyBets');
  assert.match(section(mine, '{/* Header */}', '{/* Stats Overview */}'), /Simulated history and metrics/);
  assert.match(section(mine, '{/* Stats Overview */}', '{/* Bets Tabs */}'), />Simulated profit</);
  const leaders = page('Leaderboard');
  assert.match(section(leaders, '{/* Header */}', '{/* Main Leaderboard */}'), /Simulated rankings, addresses and winnings/);
  assert.match(section(leaders, '{/* Recent Winners Sidebar */}', '{/* CTA Card */}'), /Simulated winners/);
});

test('pricing header and FAQ disclose there is no billing service', () => {
  const src = page('Pricing');
  assert.match(section(src, '{/* Header */}', '{/* Pricing Cards */}'), /Illustrative plans only/);
  assert.match(section(src, '{/* FAQ Section */}', 'export default'), /No payments are accepted/);
  assert.doesNotMatch(src, /We accept all major|money-back guarantee|Upgrades are effective immediately/);
  assert.match(section(src, 'const plans = [', '];'), /buttonText: "Demo only"/);
});

test('contact form labels and exact success toast deny delivery', () => {
  const src = page('Contact');
  const handler = section(src, 'const handleSubmit =', '// Reset form');
  assert.match(handler, /toast\.success\("Demo only: message not sent"/);
  assert.match(handler, /description: "Nothing was delivered or saved\."/);
  assert.doesNotMatch(handler, /sent successfully|We'll get back/);
  assert.match(section(src, '{/* Header */}', '{/* Contact Form */}'), /Do not enter personal information/);
  assert.match(section(src, '{/* Contact Methods */}', '{/* FAQ Card */}'), /Unverified legacy links/);
});

test('shared branding and footer disclaimers are visible source text', () => {
  const nav = read('frontend/src/components/Navbar.tsx');
  assert.match(section(nav, '{/* Logo */}', '{/* Desktop Navigation */}'), /Paradox/);
  const footer = read('frontend/src/components/Footer.tsx');
  assert.match(section(footer, '{/* Brand */}', '{/* Platform */}'), /Prototype only.*Do not use real funds/);
  assert.doesNotMatch(footer, /Next-generation cross-chain/);
});

test('subordinate docs distinguish source, local tests and unverified deployment', () => {
  const front = read('frontend/README.md');
  assert.match(front, /not connected to the escrow/i);
  assert.match(front, /npm ci --ignore-scripts/);
  const contract = read('backend/contracts/PUSHBET_ESCROW_README.md');
  assert.match(contract, /wrong recipient/i);
  assert.match(contract, /double.payment/i);
  assert.match(contract, /incomplete refunds/i);
  assert.match(contract, /no proxy or upgrade mechanism/i);
  assert.match(contract, /unverified.*outside.*portfolio verification/i);
  assert.doesNotMatch(contract, /Secure holding|Comprehensive validation|designed to be upgradeable/);
});

test('architecture and evidence separate mock UI, tests and chain uncertainty', () => {
  const svg = read('docs/architecture.svg');
  assert.match(svg, /role="img"/);
  assert.match(svg, /<title id="[^"]+">/);
  assert.match(svg, /<desc id="[^"]+">/);
  assert.match(svg, /No UI-to-escrow transaction path/);
  assert.match(svg, /No verified contract deployment/);
  assert.doesNotMatch(svg, /<script|(?:href|src)="https?:\/\//);
  const evidence = read('docs/evidence.md');
  assert.match(evidence, /source-copy checks/i);
  assert.match(evidence, /15 passing/);
  assert.match(evidence, /raw probe execution log.*not.*available/i);
  assert.match(evidence, /not a working public demo/i);
});
