// UPSC Civil Services Mains — Previous Year Questions
// Structure: Paper (GS) > Subject > Year > Questions
// Source: UPSC official question papers (upsc.gov.in)

export type Question = {
  n: number;
  q: string;
  marks?: number;
  words?: number;
};

export type YearBlock = {
  year: number;
  questions: Question[];
};

export type Subject = {
  slug: string;
  name: string;
  years: YearBlock[];
};

export type Paper = {
  slug: string;
  name: string;
  full: string;
  description: string;
  subjects: Subject[];
};

const q = (n: number, q: string, marks = 10, words = 150): Question => ({ n, q, marks, words });

export const papers: Paper[] = [
  {
    slug: "gs1",
    name: "GS Paper I",
    full: "General Studies Paper I",
    description: "Indian Heritage & Culture, History and Geography of the World and Society",
    subjects: [
      {
        slug: "art-culture",
        name: "Indian Heritage & Culture",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Explain the role of geographical factors towards the development of Ancient India."),
              q(2, "What is meant by Indianisation of Colonial architecture in India? Discuss the merits of the approach taken by Sir Herbert Baker in this regard."),
              q(3, "Bring out the socio-economic effects of the introduction of railways in different countries of the world."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "How will you explain that medieval Indian temple sculptures represent the social life of those days?"),
              q(2, "Discuss the main contributions of Gupta period and Chola period to the Indian heritage and culture."),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "Evaluate the nature of the Bhakti literature and its contribution to Indian culture."),
              q(2, "The rock-cut architecture represents one of the most important sources of our knowledge of early Indian art and history. Discuss."),
            ],
          },
          {
            year: 2020,
            questions: [
              q(1, "The rock-cut architecture reached its climax during the Gupta period. Discuss."),
              q(2, "Pala period is the most significant phase in the history of Buddhism in India. Enumerate."),
            ],
          },
        ],
      },
      {
        slug: "modern-history",
        name: "Modern Indian History",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Explain how the foundations of the modern world were laid by the American and French Revolutions."),
              q(2, "Discuss the consequences of climate change on the food security in tropical countries."),
              q(3, "The interlinking of rivers can provide viable solutions to the multi-dimensional inter-related problems of droughts, floods and interrupted navigation. Critically examine.", 15, 250),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Bring out the constructive programmes of Mahatma Gandhi during Non-Cooperation Movement and Civil Disobedience Movement."),
              q(2, "Since the decade of the 1920s, the national movement acquired various ideological strands and thereby became progressively broad-based. Elaborate."),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "Evaluate the policies of Lord Curzon and their long-term implications on the national movement."),
              q(2, "Assess the role of British imperial power in complicating the process of transfer of power during the 1940s."),
            ],
          },
          {
            year: 2020,
            questions: [
              q(1, "Since the decade of the 1920s, the national movement acquired various ideological strands and thereby became progressively broad-based. Elaborate."),
              q(2, "Highlight the importance of the new objectives that got added to the vision of Indian Independence since the twenties of the last century."),
            ],
          },
        ],
      },
      {
        slug: "world-history",
        name: "World History",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Discuss the consequences of the American Revolution on the world."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Discuss the main objectives of Population Education and point out the measures to achieve them in India in detail."),
              q(2, "To what extent did the role of the moderates prepare a base for the wider freedom movement? Comment."),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "Discuss the geophysical characteristics of Circum-Pacific Zone."),
            ],
          },
        ],
      },
      {
        slug: "geography",
        name: "Indian & World Geography",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Why is the world today confronted with a crisis of availability of and access to freshwater resources?"),
              q(2, "Comment on the resource potentials of the long coastline of India and highlight the status of natural hazard preparedness in these areas."),
              q(3, "Identify and discuss the factors responsible for diversity of natural vegetation in India. Assess the significance of wildlife sanctuaries in rain forest regions of India."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Discuss the meaning of colour-coded weather warnings for cyclone prone areas given by India Meteorological Department."),
              q(2, "Discuss the natural resource potentials of 'Deccan Trap'."),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "How do the melting of the Arctic ice and glaciers of the Antarctic differently affect the weather patterns and human activities on the Earth? Explain."),
              q(2, "Mention the significance of straits and isthmus in international trade."),
            ],
          },
          {
            year: 2020,
            questions: [
              q(1, "Account for the huge flooding of million cities in India including the smart ones like Hyderabad and Pune. Suggest lasting remedial measures."),
              q(2, "The process of desertification does not have climatic boundaries. Justify with examples."),
            ],
          },
        ],
      },
      {
        slug: "society",
        name: "Indian Society",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Explain why suicide among young women is increasing in Indian society."),
              q(2, "Does urbanization lead to more segregation and/or marginalization of the poor in Indian metropolises?"),
              q(3, "Why is caste identity in India both fluid and static?"),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Are tolerance, assimilation and pluralism the key elements in making an Indian form of secularism? Justify your answer."),
              q(2, "Discuss the main objectives of Population Education and point out the measures to achieve them in India in detail."),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "Discuss the positive and negative effects of globalization on women in India."),
              q(2, "Examine the uniqueness of tribal knowledge system when compared with mainstream knowledge and cultural systems."),
            ],
          },
          {
            year: 2020,
            questions: [
              q(1, "Has caste lost its relevance in understanding the multi-cultural Indian Society? Elaborate your answer with illustrations."),
              q(2, "Customs and traditions suppress reason leading to obscurantism. Do you agree?"),
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "gs2",
    name: "GS Paper II",
    full: "General Studies Paper II",
    description: "Governance, Constitution, Polity, Social Justice and International Relations",
    subjects: [
      {
        slug: "polity",
        name: "Polity & Constitution",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Discuss the role of the Vice-President of India as the Chairman of the Rajya Sabha."),
              q(2, "'Constitutional Morality' is rooted in the Constitution itself and is founded on its essential facets. Explain the doctrine of 'Constitutional Morality' with the help of relevant judicial decisions."),
              q(3, "Explain the constitutional provisions under which Legislative Councils are established. Review the working and current status of Legislative Councils with suitable illustrations."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Discuss the role of Presiding Officers of state legislatures in maintaining order and impartiality in conducting legislative work and in facilitating best democratic practices."),
              q(2, "'While the national political parties in India favour centralisation, the regional parties are in favour of state autonomy.' Comment."),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "'Constitutionally guaranteed judicial independence is a prerequisite of democracy.' Comment."),
              q(2, "Which steps are required for constitutionalization of a commission? Do you think that uniform commission is needed for all the state and central commissions?"),
            ],
          },
          {
            year: 2020,
            questions: [
              q(1, "'There is a need for simplification of procedure for disqualification of persons found guilty of corrupt practices under the Representation of Peoples Act.' Comment."),
              q(2, "Rajya Sabha has been transformed from a 'useless stepney tyre' to the most useful supporting organ in past few decades. Highlight the factors as well as the areas in which this transformation could be visible."),
            ],
          },
        ],
      },
      {
        slug: "governance",
        name: "Governance",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "e-Governance is not only about utilization of the power of new technology, but also much about critical importance of the 'use value' of information. Explain."),
              q(2, "Compare and contrast the British and Indian approaches to Parliamentary sovereignty."),
              q(3, "The Citizens' Charter is an ideal instrument of organizational transparency and accountability, but it has its own limitations. Identify the limitations and suggest measures for greater effectiveness of the Citizens' Charter."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "'Institutional quality is a crucial driver of economic performance.' In this context suggest reforms in Civil Service for strengthening democracy."),
              q(2, "Discuss the role of Public Accounts Committee in establishing accountability of the government to the people."),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "'Development and welfare schemes for the vulnerable, by its nature, are discriminatory in approach.' Do you agree? Give reasons for your answer."),
              q(2, "The jurisdiction of the Central Bureau of Investigation (CBI) regarding lodging an FIR and conducting probe within a particular state is being questioned by various States. However, the power of the States to withhold consent to the CBI is not absolute. Explain with special reference to the federal character of India."),
            ],
          },
        ],
      },
      {
        slug: "social-justice",
        name: "Social Justice",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Skill development programmes have succeeded in increasing human resources supply to various sectors. In the context of the statement, analyse the linkages between education, skill and employment."),
              q(2, "Public charitable trusts have the potential to make India's development more inclusive as they relate to certain vital public issues. Comment."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "'Besides being a moral imperative of a Welfare State, primary health structure is a necessary precondition for sustainable development.' Analyse."),
              q(2, "Discuss the role of the National Commission for Backward Classes in the wake of its transformation from a statutory body to a constitutional body."),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "Two parallel run schemes of the Government, viz., the Adhaar Card and NPR, one as an ID and the other as a permanent resident, have led to debates at national levels and also litigations. On merits, discuss whether or not both schemes need to run concurrently. Analyse the potential of the schemes to achieve developmental benefits and equitable growth."),
            ],
          },
        ],
      },
      {
        slug: "ir",
        name: "International Relations",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "'The expansion and strengthening of NATO and a stronger US-Europe strategic partnership works well for India.' What is your opinion about this statement? Give reasons and examples to support your answer."),
              q(2, "'Sea is an important Component of the Cosmos.' Discuss in the light of the above statement the role of the IMO (International Maritime Organisation) in protecting environment and enhancing maritime safety and security."),
              q(3, "Indian Diaspora has an important role to play in South-East Asian countries' economy and society. Appraise the role of Indian Diaspora in South-East Asia in this context."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "'Clean energy is the order of the day.' Describe briefly India's changing policy towards climate change in various international fora in the context of geopolitics."),
              q(2, "Do you think that BIMSTEC is a parallel organisation like the SAARC? What are the similarities and dissimilarities between the two? How are Indian foreign policy objectives realized by forming this new organisation?"),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "'The USA is facing an existential threat in the form of a China, that is much more challenging than the erstwhile Soviet Union.' Explain."),
              q(2, "The newly tri-nation partnership AUKUS is aimed at countering China's ambitions in the Indo-Pacific region. Is it going to supersede the existing partnerships in the region? Discuss the strength and impact of AUKUS in the present scenario."),
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "gs3",
    name: "GS Paper III",
    full: "General Studies Paper III",
    description:
      "Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management",
    subjects: [
      {
        slug: "economy",
        name: "Indian Economy",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Explain the changes in cropping pattern in India in the context of changes in consumption pattern and marketing conditions."),
              q(2, "What are the direct and indirect subsidies provided to farm sector in India? Discuss the issues raised by the World Trade Organization (WTO) in relation to agricultural subsidies."),
              q(3, "Distinguish between 'Care Economy' and 'Monetized Economy'. How can Care Economy be brought into monetized economy through women empowerment?"),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Do you agree with the view that steady GDP growth and low inflation have released the Indian economy from the 'boom and bust' cycle? Justify."),
              q(2, "How and to what extent would micro-irrigation help in solving India's water crisis?"),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "Distinguish between Capital Budget and Revenue Budget. Explain the components of both these Budgets."),
              q(2, "Explain intra-generational and inter-generational issues of equity from the perspective of inclusive growth and sustainable development."),
            ],
          },
          {
            year: 2020,
            questions: [
              q(1, "Explain the rationale behind the Goods and Services Tax (Compensation to States) Act of 2017. How has COVID-19 impacted the GST compensation fund and created new federal tensions?"),
              q(2, "Define potential GDP and explain its determinants. What are the factors that have been inhibiting India from realizing its potential GDP?"),
            ],
          },
        ],
      },
      {
        slug: "agriculture",
        name: "Agriculture",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "State the objectives and measures of land reforms in India. Discuss how land ceiling policy on landholding can be considered as an important reform under land reforms in India."),
              q(2, "Elaborate the scope and significance of the food processing industry in India."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "What are the major factors responsible for making the rice-wheat system a success? In spite of this success, how has this system become bane in India?"),
              q(2, "How has the emphasis on certain crops brought about changes in cropping patterns in recent past? Elaborate the emphasis on millets production and consumption."),
            ],
          },
        ],
      },
      {
        slug: "science-tech",
        name: "Science & Technology",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "What is the CyberDome Project? Explain how it can be useful in controlling internet crimes in India."),
              q(2, "Discuss several ways in which microorganisms can help in meeting the current fuel shortage."),
              q(3, "Introduce the concept of Artificial Intelligence (AI). How does AI help in clinical diagnosis? Do you perceive any threat to privacy of the individual in the use of AI in the healthcare sector?"),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "What is the basic principle behind vaccine development? How do vaccines work? What approaches were adopted by the Indian vaccine manufacturers to produce COVID-19 vaccines?"),
              q(2, "Launched on 25th December, 2021, James Webb Space Telescope has been much in the news since then. What are its unique features which make it superior to its predecessor Space Telescopes? What are the key goals of this mission?"),
            ],
          },
        ],
      },
      {
        slug: "environment",
        name: "Environment & Biodiversity",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Explain the causes and effects of coastal erosion in India. What are the available coastal management techniques for combating the hazard?"),
              q(2, "Give an account of the growth and development of nuclear science and technology in India. What is the advantage of fast breeder reactor programme in India?"),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Discuss in detail the photochemical smog emphasizing its formation, effects and mitigation. Explain the 1999 Gothenburg Protocol."),
              q(2, "Should the pursuit of carbon credits and clean development mechanisms set up under UNFCCC be maintained even though there has been a massive slide in the value of a carbon credit?"),
            ],
          },
        ],
      },
      {
        slug: "security",
        name: "Internal Security",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Give out the major sources of terror funding in India and the efforts being made to curtail these sources. In the light of this, also discuss the aim and objective of the 'No Money for Terror (NMFT)' conference recently held at New Delhi in November 2022."),
              q(2, "Winning of 'Hearts and Minds' in terrorism affected areas is an essential step in restoring the trust of the population. Discuss the measures adopted by the Government in this respect as part of the conflict resolution in Jammu and Kashmir."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Analyse the multidimensional challenges posed by external state and non-state actors, to the internal security of India. Also discuss measures required to be taken to combat these threats."),
              q(2, "Discuss the types of organised crime. Describe the linkages between terrorists and organised crime that exist at the national and transnational levels."),
            ],
          },
        ],
      },
      {
        slug: "disaster-mgmt",
        name: "Disaster Management",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Discuss the recent measures initiated in disaster management by the Government of India departing from the earlier reactive approach."),
              q(2, "Vulnerability is an essential element for defining disaster impacts and its threat to people. How and in what ways can vulnerability to disasters be characterized? Discuss different types of vulnerability with reference to disasters."),
            ],
          },
          {
            year: 2020,
            questions: [
              q(1, "Discuss the recent measures initiated in disaster management by the Government of India departing from the earlier reactive approach."),
              q(2, "Describe various measures taken in India for Disaster Risk Reduction (DRR) before and after signing 'Sendai Framework for DRR (2015-2030)'. How is this framework different from 'Hyogo Framework for Action, 2005'?"),
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "gs4",
    name: "GS Paper IV",
    full: "General Studies Paper IV — Ethics, Integrity & Aptitude",
    description: "Ethics, Integrity and Aptitude, with case studies",
    subjects: [
      {
        slug: "theory",
        name: "Ethics — Theory",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "(a) What are the basic principles of public life? Illustrate any three of these with suitable examples. (b) Hatred is destructive of a person's wisdom and conscience that can poison a nation's spirit. Do you agree with this view? Justify your answer.", 10, 150),
              q(2, "(a) Identify five ethical traits on which one can plot the performance of a civil servant. Justify their inclusion in the matrix. (b) What does the following quotation mean to you? 'A man is but a product of his thoughts. What he thinks he becomes.' — M. K. Gandhi", 10, 150),
              q(3, "What really matters for success, character, happiness and lifelong achievements is a definite set of emotional skills — your EQ — not just purely cognitive abilities that are measured by conventional IQ tests. Do you agree with this view? Give reasons in support of your answer."),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "(a) What do you understand by the term 'good governance'? How far recent initiatives in terms of e-Governance steps taken by the State have helped the beneficiaries? Discuss with suitable examples. (b) What do you understand by the following term in the context of civil service: (i) Objectivity (ii) Non-partisanship (iii) Integrity"),
              q(2, "'Probity is essential for an effective system of governance and socio-economic development.' Discuss."),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "'Hatred is destructive of a person's wisdom and conscience that can poison a nation's spirit.' Do you agree with this view? Justify your answer."),
              q(2, "What do you understand by the term 'good governance'? How far recent initiatives in terms of e-Governance steps taken by the State have helped the beneficiaries?"),
            ],
          },
        ],
      },
      {
        slug: "case-studies",
        name: "Case Studies",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "You are the Executive Director of an upcoming Info-tech company which is making a mark in the field. Its products are export-oriented. The company, though owned by a private entrepreneur, is registered as a cooperative society with a Board of five members to manage its day-to-day affairs. The Chairperson, however, takes all major decisions. In one such decision, in December 2022, he introduced a special allowance for the top performers. However, in a recent meeting, the Chairperson unilaterally announced a bonus for himself and other Board members... (Refer full case in UPSC 2023 paper).", 20, 250),
              q(2, "Rakesh is a responsible, honest and hard-working civil servant. He has been entrusted with a project of constructing a road connecting a remote village with the district headquarters. The area is prone to landslides... What are the options available to Rakesh? Evaluate each option and choose the best.", 20, 250),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Rajesh Kumar is a senior public servant with an excellent track record of discharging his duties in accordance with high ethical standards. Once, when he was posted in the capital city, an intriguing situation arose relating to inspection of a building complex... What are the options available to Rajesh Kumar? Evaluate each of these options and choose the option which you consider the most appropriate.", 20, 250),
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "essay",
    name: "Essay",
    full: "Essay Paper",
    description: "Two essays of 1000-1200 words each, from two sections",
    subjects: [
      {
        slug: "section-a",
        name: "Section A",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Thinking is like a game, it does not begin unless there is an opposite team.", 125, 1200),
              q(2, "Visionary decision-making happens at the intersection of intuition and logic.", 125, 1200),
              q(3, "Not all who wander are lost.", 125, 1200),
              q(4, "Inspiration for creativity springs from the effort to look for the magical in the mundane.", 125, 1200),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "Forests are the best case studies for economic excellence.", 125, 1200),
              q(2, "Poets are the unacknowledged legislators of the world.", 125, 1200),
              q(3, "History is a series of victories won by the scientific man over the romantic man.", 125, 1200),
              q(4, "A ship in harbour is safe, but that is not what a ship is for.", 125, 1200),
            ],
          },
          {
            year: 2021,
            questions: [
              q(1, "The process of self-discovery has now been technologically outsourced.", 125, 1200),
              q(2, "Your perception of me is a reflection of you; my reaction to you is an awareness of me.", 125, 1200),
              q(3, "The real is rational and the rational is real.", 125, 1200),
              q(4, "Hand that rocks the cradle rules the world.", 125, 1200),
            ],
          },
        ],
      },
      {
        slug: "section-b",
        name: "Section B",
        years: [
          {
            year: 2023,
            questions: [
              q(1, "Girls are weighed down by restrictions, boys with demands — two equally harmful disciplines.", 125, 1200),
              q(2, "Mathematics is the music of reason.", 125, 1200),
              q(3, "A society that has more justice is a society that needs less charity.", 125, 1200),
              q(4, "Education is not an injunction, it is an effective and pervasive tool for all-round development of an individual and social transformation.", 125, 1200),
            ],
          },
          {
            year: 2022,
            questions: [
              q(1, "The time to repair the roof is when the sun is shining.", 125, 1200),
              q(2, "You cannot step twice in the same river.", 125, 1200),
              q(3, "A smile is the chosen vehicle for all ambiguities.", 125, 1200),
              q(4, "Just because you have a choice, it does not mean that any of them has to be right.", 125, 1200),
            ],
          },
        ],
      },
    ],
  },
];

export function getPaper(slug: string) {
  return papers.find((p) => p.slug === slug);
}

export function getSubject(paperSlug: string, subjectSlug: string) {
  const paper = getPaper(paperSlug);
  return paper?.subjects.find((s) => s.slug === subjectSlug) ?? undefined;
}

export function getYear(paperSlug: string, subjectSlug: string, year: number) {
  const subject = getSubject(paperSlug, subjectSlug);
  return subject?.years.find((y) => y.year === year) ?? undefined;
}
