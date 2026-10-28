// Blocks: ['h2', text] | ['p', text] | ['ul', [items]]. Plain text only; the renderer escapes everything.
export const insights = [
  {
    slug: 'what-a-good-website-redesign-starts-with',
    title: 'What a good website redesign starts with',
    description: 'Before choosing colours or a platform, a redesign needs answers to a few unglamorous questions.',
    date: '2026-10-01',
    readMinutes: 5,
    tags: ['Redesign', 'Strategy'],
    body: [
      ['p', 'Most redesign projects begin with a feeling: the site looks old, or does not represent the business any more. That feeling is valid, but it is not a brief. A redesign that starts with visuals tends to produce a newer-looking version of the same problems.'],
      ['h2', 'Ask what the site is for'],
      ['p', 'Write down the two or three things a visitor should be able to do, and the one thing the business most needs them to do. If the team cannot agree on this, no amount of design will resolve it.'],
      ['h2', 'Look at what already works'],
      ['p', 'Some pages quietly do their job: they are linked from elsewhere, found through search, or relied on by customers. A redesign should identify these before anything is moved. Discarding them by accident is one of the most avoidable costs of a rebuild.'],
      ['h2', 'Audit the content, not just the design'],
      ['ul', ['Which pages are out of date, duplicated or never visited?', 'Which questions do customers ask that the site does not answer?', 'Who is responsible for each section after launch?']],
      ['h2', 'Plan the migration early'],
      ['p', 'If URLs change, redirects need to be mapped page by page. Search engines and people with bookmarks will otherwise meet dead ends. This is dull work and it matters.'],
      ['h2', 'Design for maintenance'],
      ['p', 'A beautiful site that nobody can update will decay. Decide how content will be edited and by whom, and shape the design system around that reality.'],
      ['p', 'Only then do typography, imagery and interaction have a solid foundation to build on.']
    ]
  },
  {
    slug: 'practical-ai-automation-where-to-start',
    title: 'Practical AI automation: where to start',
    description: 'A grounded way to find the first task worth automating, and to avoid the common mistakes.',
    date: '2026-10-08',
    readMinutes: 6,
    tags: ['AI', 'Automation'],
    body: [
      ['p', 'AI tools can read, summarise, classify and draft. Those capabilities are genuinely useful, but they are easy to apply to the wrong problem. The most reliable first projects are small and specific.'],
      ['h2', 'Choose a task, not a department'],
      ['p', '\u201cImprove customer service\u201d is a goal. \u201cDraft first replies to common delivery questions for a person to review\u201d is a task. Tasks can be tested; goals cannot.'],
      ['h2', 'Good first candidates'],
      ['ul', ['Repetitive work with a clear definition of a good result', 'Tasks where a person can quickly check the output', 'Work where mistakes are inconvenient rather than harmful', 'Processes with real past examples you can test against']],
      ['h2', 'Keep a person in the loop where it matters'],
      ['p', 'Language models can produce fluent text that is wrong. Where errors have consequences, such as legal, financial, medical or contractual content, design a review step and make it difficult to skip.'],
      ['h2', 'Test on your own examples'],
      ['p', 'Collect a set of real cases, including awkward ones. Run the prototype against them and record where it succeeds and fails. This tells you far more than a demonstration on easy examples.'],
      ['h2', 'Consider whether you need AI at all'],
      ['p', 'Some problems are better solved with rules, a form or a better process. Choosing the simpler option is not a failure of ambition; it is good engineering.'],
      ['h2', 'Be clear about data'],
      ['p', 'Know what information is sent to which service, how it is retained and who can see it. Document this before the tool is used on anything sensitive.']
    ]
  },
  {
    slug: 'digital-experience-quality-the-details',
    title: 'Digital experience quality lives in the details',
    description: 'Speed, accessibility, clarity and robustness are not finishing touches. They are the product.',
    date: '2026-10-15',
    readMinutes: 5,
    tags: ['Design', 'Engineering'],
    body: [
      ['p', 'People rarely praise a site for loading quickly, working with a keyboard or having readable text. They simply notice when it does not. Quality in digital work is largely made of things that are invisible when done well.'],
      ['h2', 'Clarity before decoration'],
      ['p', 'Each page should make its purpose obvious in a few seconds. Visual flair can support that, but it cannot replace it.'],
      ['h2', 'Performance is part of design'],
      ['p', 'Oversized images, heavy scripts and layout shifts are design decisions as much as technical ones. Setting image dimensions, limiting third-party scripts and loading fonts carefully protect the experience on ordinary phones and connections.'],
      ['h2', 'Accessibility is a baseline'],
      ['ul', ['Text with sufficient contrast against its background', 'Every interactive element reachable and usable with a keyboard', 'Visible focus indicators', 'Form fields with real labels and understandable error messages', 'Motion that respects the user\u2019s reduced-motion setting']],
      ['p', 'Automated checks catch some issues, not all. Testing with a keyboard and a screen reader finds much of the rest.'],
      ['h2', 'Design the unhappy paths'],
      ['p', 'Forms fail, pages go missing, networks drop. A considered error message and a helpful 404 page say as much about a product as its hero section.'],
      ['h2', 'Keep checking'],
      ['p', 'Quality decays as content and code change. Build routine checks into the process so regressions are caught early.']
    ]
  }
];
