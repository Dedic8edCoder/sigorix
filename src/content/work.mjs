// All entries here are CONCEPT projects. They are not client work. Replace or extend with real case studies later
// (set concept: false and fill the optional fields; the template adapts).
export const work = [
  {
    slug: 'concept-professional-services-redesign',
    concept: true,
    title: 'Professional services website redesign',
    kind: 'Website redesign',
    services: ['Website Redesign and Digital Transformation', 'Website Design and Development'],
    summary: 'An illustrative exploration of how a firm with deep expertise but a dated site could present its work with clarity and authority.',
    scenario: 'A fictional advisory firm has strong credentials but a site organised around internal departments instead of the questions clients actually ask.',
    challenge: 'Visitors cannot quickly tell which service applies to them, and the site is hard to maintain.',
    approach: [
      'Reorganise navigation around client problems rather than internal structure.',
      'Replace dense paragraphs with a clear hierarchy: a statement, supporting evidence, then a next step.',
      'Introduce a content model so team members can publish insights without touching layout.',
      'Plan a redirect map so existing links keep working.'
    ],
    demonstrates: ['Information architecture', 'Editorial design system', 'Migration planning'],
    visual: 'layout'
  },
  {
    slug: 'concept-intelligent-support-experience',
    concept: true,
    title: 'Intelligent customer-support experience',
    kind: 'AI-powered solution',
    services: ['AI-Powered Solutions and Intelligent Automation', 'Software Engineering and Custom Applications'],
    summary: 'An illustrative design for an assistant that answers from a company\u2019s own documentation and hands over to a person when it should.',
    scenario: 'A fictional software company receives many repeat questions already answered in its documentation.',
    challenge: 'Answers must be accurate and traceable, and customers must always have a clear route to a human.',
    approach: [
      'Restrict answers to approved documentation and show the source passages used.',
      'Define clear hand-off rules for billing, account and sensitive issues.',
      'Evaluate against a set of real past questions before exposing it to customers.',
      'Give the support team a review view to correct and improve answers.'
    ],
    demonstrates: ['Retrieval-grounded answers', 'Human-in-the-loop design', 'Evaluation before launch'],
    visual: 'chat'
  },
  {
    slug: 'concept-operations-dashboard',
    concept: true,
    title: 'Operational insight dashboard',
    kind: 'Bespoke digital product',
    services: ['Software Engineering and Custom Applications', 'Bespoke Digital Experiences'],
    summary: 'An illustrative internal tool that replaces a weekly spreadsheet ritual with a clear, shared view of what needs attention.',
    scenario: 'A fictional logistics team assembles status reports by hand from three systems every Monday.',
    challenge: 'The data is available but scattered; people spend more time compiling than deciding.',
    approach: [
      'Consolidate the three sources through integrations with clearly defined ownership.',
      'Design the default view around exceptions that need a decision, not every metric.',
      'Keep the interface keyboard-friendly and readable at a glance.',
      'Document the data flow so the tool can be maintained by others.'
    ],
    demonstrates: ['Data integration', 'Interface density and clarity', 'Maintainable architecture'],
    visual: 'dashboard'
  }
];
