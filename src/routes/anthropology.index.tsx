import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

type Question = { number: string; marks: number; text: string };
type Section = { title: string; syllabus: string; questions: Question[] };

const SOURCE_PAGE = "https://www.levelupias.com/anthropology-optional-pyqs/";
const SYLLABUS_PDF = "https://uploads.iasscore.in/pdf/UPSC-SYLLABUS-ANTHROPOLOGY-OPTIONAL.pdf";

const PAPER_ONE: Section[] = [
  {
    title: "Socio-cultural Anthropology",
    syllabus: "Culture, society, marriage, family, kinship, economy, political organisation and religion.",
    questions: [
      { number: "1(a)", marks: 10, text: "Attributes of culture." },
      { number: "1(c)", marks: 10, text: "Critical perspective on avoidance and joking relationship." },
      { number: "1(b)", marks: 10, text: "Harappan maritime trade." },
      { number: "3(b)", marks: 15, text: "Define urbanization and discuss its impact on family in India with examples." },
      { number: "5(b)", marks: 10, text: "Cultural relevance of the Kula." },
      { number: "5(d)", marks: 10, text: "Authority and forms of political organization." },
      { number: "8(a)", marks: 20, text: "Examine critically the concept of social stratification as a basis for sustaining social inequality." },
    ],
  },
  {
    title: "Anthropological theories and methods",
    syllabus: "Classical and contemporary theories; fieldwork, tools of data collection, sampling and analysis.",
    questions: [
      { number: "2(a)", marks: 20, text: "Discuss historical particularism as a critical development to classical evolutionism." },
      { number: "3(c)", marks: 15, text: "Discuss the contemporary challenges in fieldwork method in anthropological research." },
      { number: "4(a)", marks: 20, text: "Critically discuss the psychological types in the cultures of the American South-West observed by Ruth Benedict." },
      { number: "6(c)", marks: 15, text: "How does Levi-Strauss look at the Tsimshian myth of Asdiwal? Critically discuss structuralism in the light of his study of mythologies." },
      { number: "7(a)", marks: 20, text: "Critically explain the notion of deconstruction in the light of the postmodern works of Jacques Derrida." },
      { number: "7(c)", marks: 15, text: "Discuss the applicability of various sampling techniques in selecting the study group." },
    ],
  },
  {
    title: "Biological Anthropology and human evolution",
    syllabus: "Evolution, primatology, hominids, human genetics, genetic disorders and ecological adaptation.",
    questions: [
      { number: "1(d)", marks: 10, text: "Lethal and sublethal genes." },
      { number: "1(e)", marks: 10, text: "Hemoglobin in health and disease." },
      { number: "2(c)", marks: 15, text: "Critically comment on lifestyle diseases and their impact on human health." },
      { number: "3(a)", marks: 20, text: "What is meant by karyotype? How does its analysis help in diagnosis of chromosomal aberrations in man?" },
      { number: "4(c)", marks: 15, text: "What is genetic counselling? Briefly discuss the steps involved in it." },
      { number: "5(c)", marks: 10, text: "Heritability and its estimation." },
      { number: "5(e)", marks: 10, text: "Single-gene mutation disorders in man." },
      { number: "6(a)", marks: 20, text: "Discuss the geographical distribution of Homo erectus. Taking its physical features into account, where does it fit in the human evolutionary line?" },
      { number: "7(b)", marks: 15, text: "What is a multifactorial trait? Illustrate with suitable human examples." },
      { number: "8(b)", marks: 15, text: "Describe the genetics and inheritance patterns of the ABO and Rh blood groups in man." },
      { number: "8(c)", marks: 15, text: "Critically discuss the synergistic effect of biological and cultural factors in human evolution." },
    ],
  },
  {
    title: "Prehistory and applied anthropology",
    syllabus: "Prehistoric archaeology, chronology and dating, cultural evolution, and applications of anthropology.",
    questions: [
      { number: "2(b)", marks: 15, text: "Describe the evidences of food production and domestication of animals with special reference to Mehrgarh. Throw light on its significance." },
      { number: "4(b)", marks: 15, text: "Discuss the Acheulian and Oldowan traditions of Indian Paleolithic cultures with suitable illustrations." },
      { number: "5(a)", marks: 10, text: "Chronometric dating." },
      { number: "6(b)", marks: 15, text: "Discuss the applications of forensic anthropology with suitable examples." },
    ],
  },
];

const PAPER_TWO: Section[] = [
  {
    title: "Indian prehistory, civilisation and anthropology",
    syllabus: "Indian cultural evolution, archaeology, social systems, caste, village India and the history of Indian anthropology.",
    questions: [
      { number: "1(b)", marks: 10, text: "Origin of State Societies." },
      { number: "2(c)", marks: 15, text: "Deconstruct the colonial history of Indian Anthropology, highlighting the role of Indian anthropologists in sustaining its autonomy." },
      { number: "3(a)", marks: 20, text: "Critically describe evidence from Rakhigarhi and its linkages to Harappan civilization." },
      { number: "3(b)", marks: 15, text: "Compare and contrast M. N. Srinivas and L. P. Vidyarthi on social change in village India." },
      { number: "5(c)", marks: 10, text: "Agricultural practices of the Apatani." },
      { number: "6(b)", marks: 15, text: "Elucidate the difference between secularism, religiosity, religious fundamentalism and spiritualism from an anthropological perspective." },
      { number: "7(b)", marks: 15, text: "Discuss theories on the origin of caste system and their criticism in India. Differentiate caste, class and race." },
      { number: "8(a)", marks: 20, text: "Describe important Paleolithic sites from South India and their significance." },
      { number: "8(b)", marks: 15, text: "Distinguish a theocratic state from a secular, liberal, democratic state with examples from tribal and contemporary societies." },
    ],
  },
  {
    title: "Tribal India, policy and development",
    syllabus: "Tribal communities, deprivation, displacement, constitutional safeguards, development programmes and anthropology in development.",
    questions: [
      { number: "1(d)", marks: 10, text: "Artisan tribes of Jharkhand." },
      { number: "2(a)", marks: 20, text: "Critically discuss recent welfare measures for PVTGs. Why were PVTGs erroneously called Primitive Tribal Groups?" },
      { number: "2(b)", marks: 15, text: "How is the PESA Act empowering local self-governance and affecting women's political participation?" },
      { number: "3(c)", marks: 15, text: "Examine the impact of Forest Policies from 1878 to 2006 on land alienation and deprivation of tribal rights." },
      { number: "4(b)", marks: 15, text: "Write an essay on Birsa Munda and the impact of his sacrifice on tribal society." },
      { number: "5(a)", marks: 10, text: "B. K. Roy Burman's concept of Buffer Zone." },
      { number: "5(b)", marks: 10, text: "Describe ILO Convention No. 169 on Indigenous and Tribal Peoples. Is India a signatory?" },
      { number: "5(d)", marks: 10, text: "Status of Sixth Schedule Areas." },
      { number: "5(e)", marks: 10, text: "Constitutional safeguards for Backward Classes." },
      { number: "6(a)", marks: 20, text: "Tribals are custodians of natural resources yet the most deprived. Critically examine how climate change will affect their survival." },
      { number: "6(c)", marks: 15, text: "Discuss P. K. Bhowmick's contribution to decriminalising the status of the Lodha tribe." },
      { number: "7(c)", marks: 15, text: "Elucidate the resurgence of ethno-nationalism from an anthropological lens." },
      { number: "8(c)", marks: 15, text: "Discuss the economic, social and developmental impacts of mining on tribal communities." },
    ],
  },
  {
    title: "Indian population, health and contemporary change",
    syllabus: "Demography, health and nutrition, minorities, social change, ethnicity and contemporary tribal societies.",
    questions: [
      { number: "1(a)", marks: 10, text: "Digitisation of rural economy." },
      { number: "1(c)", marks: 10, text: "Syro-Malabar Christians." },
      { number: "1(e)", marks: 10, text: "Causes of stunting and wasting among tribal children." },
      { number: "4(a)", marks: 20, text: "What are the ethical concerns in biological and socio-cultural anthropology arising from advances in AI and genetic research?" },
      { number: "4(c)", marks: 15, text: "What are the demographic challenges of India's changing population dynamics over the next 50 years?" },
      { number: "7(a)", marks: 20, text: "Critically examine paradigms of holistic health for marginalised sections, drawing inferences from the COVID-19 pandemic." },
    ],
  },
];

const PAPERS = [
  { number: 1, label: "Paper I", subtitle: "Physical, social and cultural anthropology", sections: PAPER_ONE },
  { number: 2, label: "Paper II", subtitle: "Indian anthropology", sections: PAPER_TWO },
] as const;

export const Route = createFileRoute("/anthropology/")({
  component: AnthropologyHome,
  head: () => ({
    meta: [
      { title: "Anthropology Optional PYQs — Paper I & II" },
      { name: "description", content: "UPSC Anthropology optional syllabus and previous-year questions, organised paper-wise." },
    ],
  }),
});

function AnthropologyHome() {
  const [paperNumber, setPaperNumber] = useState<1 | 2>(1);
  const active = PAPERS.find((paper) => paper.number === paperNumber)!;
  const count = active.sections.reduce((total, section) => total + section.questions.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <header className="max-w-3xl">
          <span className="inline-block rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            Civil Services Examination · Optional
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Anthropology Optional</h1>
          <p className="mt-4 text-muted-foreground">
            Previous-year questions arranged under their relevant syllabus areas. Switch between papers, use the
            syllabus note to orient revision, and open the original papers for the full archive.
          </p>
        </header>

        <section className="mt-8 rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Official syllabus</h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Paper I covers physical, social and cultural anthropology; Paper II focuses on Indian anthropology,
                tribal communities and applied issues.
              </p>
            </div>
            <a href={SYLLABUS_PDF} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent">
              Open syllabus PDF ↗
            </a>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Paper-wise PYQs</h2>
              <p className="mt-1 text-sm text-muted-foreground">2024 · {count} questions currently transcribed.</p>
            </div>
            <a href={SOURCE_PAGE} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline">
              Browse 2009–2024 original papers ↗
            </a>
          </div>

          <div className="mt-4 inline-flex rounded-lg border border-border bg-card p-1 text-sm">
            {PAPERS.map((paper) => (
              <button
                key={paper.number}
                onClick={() => setPaperNumber(paper.number)}
                className={`rounded px-4 py-1.5 font-medium transition-colors ${
                  paperNumber === paper.number ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {paper.label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm font-medium text-primary">{active.label} — {active.subtitle}</p>

          <div className="mt-4 space-y-5">
            {active.sections.map((section) => (
              <section key={section.title} className="rounded-xl border border-border bg-card p-5">
                <header>
                  <h3 className="text-lg font-semibold tracking-tight">{section.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{section.syllabus}</p>
                </header>
                <ol className="mt-4 space-y-3">
                  {section.questions.map((question) => (
                    <li key={question.number} className="rounded-lg border border-border bg-background px-4 py-3">
                      <div className="flex flex-wrap items-start gap-3">
                        <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">2024</span>
                        <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">Q{question.number}</span>
                        <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{question.marks} marks</span>
                        <p className="min-w-0 flex-1 leading-relaxed">{question.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </section>

        <p className="mt-8 text-xs text-muted-foreground">
          Question text is transcribed from the 2024 UPSC papers; the linked LevelUp IAS archive is retained for
          source PDFs and additional years.
        </p>
      </main>
    </div>
  );
}
