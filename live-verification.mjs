#!/usr/bin/env node
/**
 * LIVE VERIFICATION: 2 concepts each from English, Physics, Chemistry
 * Test learner experience, pedagogical quality, and technical implementation
 */

import { chromium } from 'playwright';

const ACCOUNTS = {
  test: 'claudetest@explorewithpappu.gmail.com',
};

const CONCEPTS_TO_TEST = [
  // English (choose concepts with visuals)
  { subject: 'english', conceptId: 'eng.phonics.phonemic-awareness', label: 'Phonemic Awareness' },
  { subject: 'english', conceptId: 'eng.phonics.print-concepts', label: 'Print Concepts' },

  // Physics (choose concepts with visuals)
  { subject: 'physics', conceptId: 'phys.meas.units', label: 'SI Units and Measurement' },
  { subject: 'physics', conceptId: 'phys.mech.forces', label: 'Forces and Motion' },

  // Chemistry (choose concepts with visuals)
  { subject: 'chemistry', conceptId: 'chem.found.pure-substances', label: 'Pure Substances' },
  { subject: 'chemistry', conceptId: 'chem.atomic.atomic-structure', label: 'Atomic Structure' },
];

async function testConcept(page, concept, findings) {
  console.log(`\n📚 Testing: ${concept.label} (${concept.conceptId})`);

  try {
    // Navigate to the lesson
    await page.goto(`http://localhost:3000/learn?subject=${concept.subject}&concept=${concept.conceptId}`, {
      waitUntil: 'networkidle',
      timeout: 10000,
    });

    // Wait for lesson to load
    await page.waitForSelector('[role="main"]', { timeout: 5000 }).catch(() => null);

    // Check for visual assets
    const hasVisual = await page.locator('img, svg, canvas').first().isVisible().catch(() => false);
    console.log(`  Visual present: ${hasVisual ? '✓' : '✗'}`);

    // Check for teaching content
    const hasTeachingBlock = await page.locator('text=/explain|teach|learn/i').first().isVisible().catch(() => false);
    console.log(`  Teaching content: ${hasTeachingBlock ? '✓' : '✗'}`);

    // Check for MCQ/assessment
    const hasMCQ = await page.locator('button:has-text("A"), button:has-text("B"), button:has-text("C"), button:has-text("D")').first().isVisible().catch(() => false);
    console.log(`  Assessment available: ${hasMCQ ? '✓' : '✗'}`);

    // Try to answer a question if present
    let answeredCorrectly = false;
    if (hasMCQ) {
      try {
        const buttons = await page.locator('button:has-text("A"), button:has-text("B"), button:has-text("C"), button:has-text("D")').all();
        if (buttons.length > 0) {
          // Click the first option (random selection for testing)
          await buttons[Math.floor(Math.random() * buttons.length)].click();
          await page.waitForTimeout(1500);
          console.log(`  Answer submitted`);
        }
      } catch (e) {
        console.log(`  Error submitting answer: ${e.message}`);
      }
    }

    // Take a screenshot for review
    const screenshotPath = `/tmp/concept-${concept.conceptId.replace(/\./g, '-')}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Screenshot: ${screenshotPath}`);

    findings.push({
      concept: concept.label,
      subject: concept.subject,
      conceptId: concept.conceptId,
      visual: hasVisual,
      teaching: hasTeachingBlock,
      assessment: hasMCQ,
      screenshot: screenshotPath,
    });

    return true;
  } catch (err) {
    console.error(`  ✗ Error testing concept: ${err.message}`);
    findings.push({
      concept: concept.label,
      subject: concept.subject,
      conceptId: concept.conceptId,
      error: err.message,
    });
    return false;
  }
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/opt/pw-browsers/chromium'
  });
  const page = await browser.newPage();
  const findings = [];

  console.log('🚀 LIVE VERIFICATION SESSION');
  console.log('═══════════════════════════════════════════════════════════');

  try {
    // Navigate to app
    console.log('\n🌐 Connecting to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 });

    // Check if logged in or need to log in
    const isLoggedIn = await page.locator('text=Dashboard|Learn|Library|Settings').first().isVisible().catch(() => false);
    console.log(`Logged in: ${isLoggedIn ? '✓' : '✗'}`);

    if (!isLoggedIn) {
      console.log('Attempting to access lessons directly...');
    }

    // Test each concept
    for (const concept of CONCEPTS_TO_TEST) {
      await testConcept(page, concept, findings);
      await page.waitForTimeout(500);
    }

    // Generate findings report
    console.log('\n\n📋 FINDINGS SUMMARY');
    console.log('═══════════════════════════════════════════════════════════');

    const bySubject = {};
    for (const finding of findings) {
      if (!bySubject[finding.subject]) {
        bySubject[finding.subject] = [];
      }
      bySubject[finding.subject].push(finding);
    }

    // Pedagogical Quality (Teacher perspective)
    console.log('\n👨‍🏫 TEACHER PERSPECTIVE (Pedagogical Quality)');
    for (const [subject, items] of Object.entries(bySubject)) {
      console.log(`\n${subject.toUpperCase()}:`);
      for (const item of items) {
        if (item.error) {
          console.log(`  ✗ ${item.concept}: Failed to load (${item.error})`);
        } else {
          const quality = (item.visual && item.teaching && item.assessment) ? '⭐⭐⭐' :
                         (item.teaching && item.assessment) ? '⭐⭐' : '⭐';
          console.log(`  ${quality} ${item.concept}`);
          if (!item.visual) console.log(`     └─ Missing visual asset`);
          if (!item.teaching) console.log(`     └─ Teaching content unclear`);
          if (!item.assessment) console.log(`     └─ No assessment mechanism`);
        }
      }
    }

    // Technical Quality (CTO perspective)
    console.log('\n\n⚙️  CTO PERSPECTIVE (Technical Implementation)');
    const totalConcepts = findings.length;
    const loadedConcepts = findings.filter(f => !f.error).length;
    const withVisuals = findings.filter(f => f.visual).length;
    const withTeaching = findings.filter(f => f.teaching).length;
    const withAssessment = findings.filter(f => f.assessment).length;

    console.log(`\nConcept Loading: ${loadedConcepts}/${totalConcepts} (${Math.round(loadedConcepts/totalConcepts*100)}%)`);
    console.log(`Visual Assets: ${withVisuals}/${totalConcepts} (${Math.round(withVisuals/totalConcepts*100)}%)`);
    console.log(`Teaching Content: ${withTeaching}/${totalConcepts} (${Math.round(withTeaching/totalConcepts*100)}%)`);
    console.log(`Assessment Integration: ${withAssessment}/${totalConcepts} (${Math.round(withAssessment/totalConcepts*100)}%)`);

    // Learner Experience (Student perspective)
    console.log('\n\n👤 LEARNER PERSPECTIVE (User Experience)');
    console.log(`Page Load Reliability: ${(loadedConcepts/totalConcepts*100).toFixed(0)}%`);
    console.log(`Visual Learning Engagement: ${(withVisuals/totalConcepts*100).toFixed(0)}%`);
    console.log(`Complete Learning Flow: ${(withAssessment/totalConcepts*100).toFixed(0)}%`);

    // Recommendations
    console.log('\n\n📝 RECOMMENDATIONS');
    if (withVisuals < totalConcepts) {
      console.log(`• ${totalConcepts - withVisuals} concepts missing visual assets — prioritize visual generation`);
    }
    if (withTeaching < totalConcepts) {
      console.log(`• ${totalConcepts - withTeaching} concepts have unclear teaching content — review explanations`);
    }
    if (withAssessment < totalConcepts) {
      console.log(`• ${totalConcepts - withAssessment} concepts lack assessment — implement probes/checkpoints`);
    }
    if (loadedConcepts === totalConcepts) {
      console.log('✓ All concepts load successfully');
    }

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('Screenshots saved to /tmp/concept-*.png');

  } catch (err) {
    console.error('Fatal error:', err);
  } finally {
    await browser.close();
  }
}

main();
