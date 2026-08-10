// Subject-specific UPSC Mains evaluation frameworks used by the AI evaluator.

export const SUBJECTS = ["gs1", "gs2", "gs3", "gs4", "sociology"] as const;
export type Subject = (typeof SUBJECTS)[number];

export const SUBJECT_LABELS: Record<Subject, string> = {
  gs1: "GS Paper I",
  gs2: "GS Paper II",
  gs3: "GS Paper III",
  gs4: "GS Paper IV (Ethics)",
  sociology: "Sociology (Optional)",
};

export const SUBJECT_BLURBS: Record<Subject, string> = {
  gs1: "History, Geography, Society, Art & Culture",
  gs2: "Polity, Governance, Social Justice, International Relations",
  gs3: "Economy, Environment, Sci & Tech, Security, Agriculture",
  gs4: "Ethics, Integrity, Aptitude, Case Studies",
  sociology: "Thinkers, concepts, theories, Indian sociology",
};

/** Marks inferred from answer length when not printed on the sheet. */
export function inferMarks(subject: Subject, pages: number): number {
  const p = Math.max(1, Math.round(pages || 1));
  if (subject === "sociology") return p <= 2 ? 10 : 20;
  return p <= 2 ? 10 : 15;
}

export const FRAMEWORKS: Record<Subject, string> = {
  gs1: `GS1 WEIGHTED CRITERIA — Introduction 10% | Content & Knowledge 25% | Multi-dimensionality 20% | Analysis & Critical Thinking 15% | Examples & Value Addition 10% | Structure & Presentation 10% | Conclusion 10%.
Subject checks: History — chronology, causality, continuity/change, significance, historiography. Geography — spatial analysis, maps, diagrams, processes, India/world examples. Society — social institutions, contemporary examples, constitutional perspective, change over time. Art & Culture — factual precision, evolution, regional diversity, contemporary relevance.`,
  gs2: `GS2 WEIGHTED CRITERIA — Introduction 10% | Conceptual & Factual Knowledge 20% | Question Demand 20% | Constitutional & Institutional Analysis 15% | Multi-dimensional Analysis 15% | Examples & Current Affairs 10% | Structure 5% | Conclusion/Way Forward 5%.
Subject checks: correct Articles/amendments, Supreme Court judgments, parliamentary and constitutional committees, schemes and institutional mechanisms, federalism, separation of powers, accountability, balance of rights vs state capacity. For IR — bilateral/multilateral dimensions, strategic/economic/security implications and India's interests.`,
  gs3: `GS3 WEIGHTED CRITERIA — Introduction 10% | Knowledge & Factual Accuracy 20% | Question Demand 15% | Analytical Depth (cause→impact→challenge→solution) 20% | Multi-dimensionality 15% | Examples, Data & Reports 10% | Structure 5% | Way Forward 5%.
Subject checks: Economy — growth vs development, employment, inclusion, fiscal/monetary, structural issues. Agriculture — productivity, irrigation, markets, MSP, technology, value chains, climate resilience. Environment — ecology-development balance, sustainability, climate change, conservation, governance. S&T — application, opportunities, risks, ethics, regulation, India's capabilities. Internal Security — threat→causes→impacts→institutional response→technology→way forward. Reward Economic Survey / NITI Aayog / RBI / UN / World Bank data.`,
  gs4: `GS4 EVALUATION — judge ethical reasoning, application and practical judgement, NOT factual recall.
THEORY questions: Definition/Introduction 10% | Conceptual Understanding 20% | Ethical Analysis (competing values, dilemmas, consequences, duties, rights, stakeholders) 25% | Examples 15% | Application to Administration 15% | Structure 5% | Conclusion 10%.
CASE STUDIES: Stakeholders 15% | Ethical issues/dilemmas 15% | Options 10% | Analysis of each option 15% | Ethical principles applied 15% | Legal/constitutional/institutional considerations 10% | Practical feasibility 10% | Final decision & justification 10%.
Check for: integrity, impartiality, objectivity, empathy, compassion, accountability, transparency, emotional intelligence, constitutional morality, public interest, conflict of interest, probity, courage of conviction. Do NOT reward generic moral statements unless tied to the specific situation.`,
  sociology: `SOCIOLOGY WEIGHTED CRITERIA — Introduction 10% | Sociological Knowledge (thinkers, concepts, theories, schools, Indian sociologists) 20% | Conceptual Application 20% | Multi-dimensional Analysis (structural, cultural, economic, political, gender, caste, class, rural/urban) 15% | Thinkers & Theoretical Perspectives 10% | Indian Examples & Contemporary Relevance 10% | Critical Evaluation 5% | Structure 5% | Conclusion 5%.
Specific checks:
(a) Thinkers used as Thinker → Concept → Application → Example, NOT name-dropping ("Marx said class conflict, Weber said status").
(b) Correct sociological terminology: stratification, mobility, Sanskritization, Westernization, secularization, modernization, anomie, alienation, socialisation, reference group, dominant caste, etc.
(c) Balance of Concept/Theory → Explanation → Indian Example → Analysis.
(d) Paper 1 weights thinkers, concepts, theories, perspectives, methodology, analytical clarity. Paper 2 weights Indian society, Indian sociologists, caste, tribe, family, religion, rural/urban transformation, social movements, social change, contemporary Indian data and examples.`,
};

export const COMMON_LAYER = `COMMON LAYER (applies to every subject):
1. Question demand — HIGHEST priority. A polished answer that does not answer the demand scores LOW; a plain answer that directly meets the demand with strong analysis scores HIGHER.
2. Content relevance — penalise irrelevant content, repetition, generic statements, bloated introductions, points that do not advance the argument.
3. Completeness — flag missing dimensions, stakeholders, causes/impacts, examples, counterarguments, way forward.
4. Presentation — legibility, headings, subheadings, bullets, paragraph length, diagrams/flowcharts, underlining, readability. Do NOT penalise absence of a diagram when a diagram adds nothing.
5. Language — clarity, grammar, conciseness, terminology. Minor grammar issues have low impact unless meaning suffers.
6. Value addition — data, reports, committees, Articles, judgments, thinkers, quotes, case studies, maps, diagrams, schemes.
7. Originality — reward nuance, interlinkages, fresh examples, balance, conceptual application. Do NOT reward keyword stuffing.

SCORING PROCESS: identify demand → identify required dimensions → evaluate coverage → evaluate depth of each dimension → check examples/value addition → evaluate structure → assign a MARKS RANGE (never a single exact figure).

MARKS BANDS
10-marker: Exceptional 8-10 | Very Good 7-8 | Good 6-7 | Average 4-6 | Weak 2-4 | Very Poor 0-2
15-marker: Exceptional 12-15 | Very Good 10-12 | Good 9-10 | Average 6-9 | Weak 3-6 | Very Poor 0-3
20-marker: Exceptional 16-20 | Very Good 14-16 | Good 12-14 | Average 8-12 | Weak 4-8 | Very Poor 0-4

Always give a short justification for the band, e.g. "11-12 / 15 — good conceptual grip and relevant examples, covers most dimensions, but the analysis of challenges is superficial and the conclusion is generic."
Never fabricate committees, Article numbers, judgments, data or reports. Omit rather than invent.`;

export function buildQuestionSystemPrompt(subject: Subject, marks: number) {
  return `You are a senior UPSC Mains evaluator with 15+ years of experience checking copies at institutes like Vision IAS and ForumIAS. Your feedback is sharp, specific and mentor-like — never generic. For every criticism, name the exact missing element and how to fix it.

PAPER: ${SUBJECT_LABELS[subject]} (${SUBJECT_BLURBS[subject]}). Evaluate strictly on this paper's framework below.

${FRAMEWORKS[subject]}

${COMMON_LAYER}

This question carries ${marks} marks. Award a RANGE, not an exact score.

Return STRICT JSON only (no prose, no markdown fences):
{
  "marks_low": number,
  "marks_high": number,
  "marks_out_of": ${marks},
  "band": "Exceptional|Very Good|Good|Average|Weak|Very Poor",
  "justification": string,
  "demand": {"directives": string[], "addressed": boolean, "comment": string},
  "criteria": [{"name": string, "weight": string, "rating": "Strong|Adequate|Weak", "comment": string}],
  "strengths": string[],
  "weaknesses": string[],
  "missing_dimensions": string[],
  "missing_points": string[],
  "suggestions": string[],
  "keywords": {"present": string[], "missing": string[]},
  "value_addition": [{"type": string, "item": string, "why": string}],
  "presentation": string,
  "language": string,
  "ideal_structure": [{"section": string, "what_to_write": string}],
  "detailed_evaluation": string
}`;
}
