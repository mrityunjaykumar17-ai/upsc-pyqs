// UPSC Civil Services Mains — Previous Year Questions
// Source: drishtiias.com/mains/mains-previous-year-papers/subject-wise-papers
// Structure: Paper (GS) > Subject > Year > Questions

export type Question = { n: number; q: string; marks?: number; words?: number };
export type YearBlock = { year: number; questions: Question[] };
export type Subject = { slug: string; name: string; years: YearBlock[] };
export type Paper = {
  slug: string; name: string; full: string; description: string; subjects: Subject[];
};

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
            year: 2025,
            questions: [
              { n: 1, q: `Discuss the salient features of the Harappan architecture. (Answer in 150 words)` },
              { n: 2, q: `Examine the main aspects of Akbar's religious syncretism. (Answer in 150 words)` },
              { n: 3, q: `The sculptors filled the Chandella artform with resilient vigor and breadth of life. Elucidate. (Answer in 150 words)` },
              { n: 4, q: `Mahatma Jotirao Phule’s writings and efforts of social reforms touched issues of almost all subaltern classes. Discuss. (150 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `Underline the changes in the field of society and economy from the Rig Vedic to the Later Vedic period.` },
              { n: 2, q: `Estimate the contribution of Pallavas of Kanchi for the development of art and literature of South India.` },
              { n: 3, q: `Though the great Cholas are no more yet their name is still remembered with great pride because of their highest achievements in the domain of art and architecture. Comment.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `Explain the role of geographical factors towards the development of Ancient India.` },
              { n: 2, q: `Do you think marriage as a sacrament is loosing its value in Modern India?` },
              { n: 3, q: `What were the major technological changes introduced during the Sultanate period? How did those technological changes influence the Indian society?` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `How will you explain that Medieval Indian temple sculptures represent the social life of those days?` },
              { n: 2, q: `Discuss the main contributions of Gupta period and Chola period to Indian heritage and culture.` },
              { n: 3, q: `Discuss the significance of the lion and bull figures in Indian mythology, art and architecture.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `Evaluate the nature of Bhakti Literature and its contribution to Indian culture.` },
              { n: 2, q: `Trace the rise and growth of socio-religious reform movements with special reference to Young Bengal and Brahmo Samaj.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `The rock-cut architecture represents one of the most important sources of our knowledge of early Indian art and history. Discuss.` },
              { n: 2, q: `Pala period is the most significant phase in the history of Buddhism in India. Enumerate.` },
              { n: 3, q: `Indian philosophy and tradition played a significant role in conceiving and shaping the monuments and their art in India. Discuss.` },
              { n: 4, q: `Persian literary sources of medieval India reflect the spirit of the age. Comment.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `Safeguarding the Indian art heritage is the need of the moment. Discuss.` },
              { n: 2, q: `The Bhakti movement received a remarkable re-orientation with the advent of Sri Chaitanya Mahaprabhu. Discuss.` },
              { n: 3, q: `Assess the importance of the accounts of the Chinese and Arab travellers in the reconstruction of the history of India.` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `How do you justify the view that the level of excellence of the Gupta numismatic art is not at all noticeable in later times?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `Early Buddhist Stupa-art, while depicting folk motifs and narratives successfully expounds Buddhist ideals. Elucidate.` },
              { n: 2, q: `Krishnadeva Raya, the King of Vijayanagar, was not only an accomplished scholar himself but was also a great patron of learning and literature. Discuss.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `The ancient civilization in Indian sub-continent differed from those of Egypt, Mesopotamia and Greece in that its culture and traditions have been preserved without a breakdown to the present day. Comment.` },
              { n: 2, q: `Mesolithic rock cut architecture of India not only reflects the cultural life of the times but also a fine aesthetic sense comparable to modern painting. Critically evaluate this comment.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `To what extent has the urban planning and culture of the Indus Valley Civilization provided inputs to the present day urbanization? Discuss.` },
              { n: 2, q: `Gandhara sculpture owed as much to the Romans as to the Greeks. Explain.` },
              { n: 3, q: `Taxila university was one of the oldest universities of the world with which were associated a number of renowned learned personalities of different disciplines. Its strategic location caused its fame to flourish, but unlike Nalanda, it is not considered as a university in the modern sense. Discuss.` },
              { n: 4, q: `Sufis and medieval mystic saints failed to modify either the religious ideas and practices or the outward structure of Hindu / Muslim societies to any appreciable extent. Comment.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `Though not very useful from the point of view of a connected political history of South India, the Sangam literature portrays the social and economic conditions of its time with remarkable vividness. Comment.` },
              { n: 2, q: `(a) Discuss the ‘Tandava’ dance as recorded in early Indian inscriptions.` },
            ],
          },
        ],
      },
      {
        slug: "modern-history",
        name: "Modern Indian History",
        years: [
          {
            year: 2024,
            questions: [
              { n: 1, q: `What were the events that led to the Quit India Movement? Point out its results.` },
              { n: 2, q: `How far was the Industrial Revolution in England responsible for the decline of handicrafts and cottage industries in India?` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `What was the difference between Mahatma Gandhi and Rabindranath Tagore in their approach towards education and nationalism?` },
              { n: 2, q: `How did the colonial rule affect the tribals in India and what was the tribal response to the colonial oppression?` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Why did the armies of the British East India Company – mostly comprising of Indian Soldiers – win consistently against the more numerous and better equipped armies of the then Indian rulers? Give reasons.` },
              { n: 2, q: `Why was there a sudden spurt in famines in colonial India since the mid-eighteenth century? Give reasons.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `To what extent did the role of the moderates prepare a base for the wider freedom movement? Comment.` },
              { n: 2, q: `Bring out the constructive programmes of Mahatma Gandhi during Non-Cooperation Movement and Civil Disobedience Movement.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `Evaluate the policies of Lord Curzon and their long term implications on the national movement.` },
              { n: 2, q: `Since the decade of the 1920s, the national movement acquired various ideological strands and thereby expanded its social base. Discuss.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `Throw light on the significance of thoughts of Mahatma Gandhi in the present times.` },
              { n: 2, q: `Why indentured labour was taken by British from India to other colonies? Have they been able to preserve their cultural identity over there?` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `Clarify how mid-eighteenth century India was beset with the spectre of a fragmented polity?` },
              { n: 2, q: `Why did the ‘Moderates’ fail to carry conviction with the nation about their proclaimed ideology and political goals by the end of the nineteenth century?` },
              { n: 3, q: `Examine how the decline of traditional artisanal industry in colonial India crippled the rural economy.` },
              { n: 4, q: `Highlight the importance of new objective that got added to the vision of Indian independence since the twenties of the last century.` },
              { n: 5, q: `The women’s questions arose in modern India as a part of the 19th century social reform movement. What were the major issues and debates concerning women in that period?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `Explain how the upraising of 1857 constitutes an important watershed in the evolution of British policies towards colonial India.` },
              { n: 2, q: `Discuss the role of women in the freedom struggle especially during the Gandhian phase.` },
              { n: 3, q: `Highlight the difference in the approach of Subhash Chandra Bose and Mahatma Gandhi in the struggle for freedom.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `How different would have been the achievement of Indian independence without Mahatma Gandhi? Discuss.` },
              { n: 2, q: `Mahatma Gandhi and Dr. B. R. Ambedkar, despite having divergent approaches and strategies, had a common goal of amelioration of the downtrodden. Elucidate.` },
              { n: 3, q: `It would have been difficult for the Constituent Assembly to complete its historic task of drafting the Constitution for Independent India in just three years but for the experience gained with the Government of India Act, 1935. Discuss.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `The third battle of Panipat was fought in 1761. Why were so many empire-shaking battles fought at Panipat?` },
              { n: 2, q: `Examine critically the various facets of economic policies of the British in India from mid-eighteenth century till independence.` },
              { n: 3, q: `In what ways did the naval mutiny prove to be the last nail in the coffin of British colonial aspirations in India?` },
              { n: 4, q: `What were the major political, economic and social developments in the world which motivated the anti-colonial struggle in India?` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `Defying the barriers of age, gender and religion, the Indian women became the torch-bearer during the struggle for freedom in India. Discuss.` },
              { n: 2, q: `Several foreigners made India their homeland and participated in various movements. Analyze their role in the Indian struggle for freedom.` },
              { n: 3, q: `“In many ways, Lord Dalhousie was the founder of modern India.” Elaborate.` },
              { n: 4, q: `Critically discuss the objectives of Bhoodan and Gramdan Movements initiated by Acharya Vinoba Bhave and their success.` },
            ],
          },
        ],
      },
      {
        slug: "post-independence",
        name: "Post-Independence India",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `Trace India’s consolidation process during early phase of independence in terms of polity, economy, education and international relations. (Answer in 250 words) 15` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `The political and administrative reorganization of states and territories has heen a continuous ongoing process since the mid-nineteenth century. Discuss with examples.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `Assess the main administrative issues and socio-cultural problems in the integration process of Indian Princely States.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `Discuss whether formation of new states in recent times is beneficial or not for the economy of India?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `Has the formation of linguistic states strengthened the cause of Indian unity?` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `Write a critical note on the evolution and significance of the slogan, ‘Jai Jawan Jai Kisan’.` },
              { n: 2, q: `Discuss the contributions of Maulana Abul Kalam Azad to pre- and post-independent India.` },
              { n: 3, q: `Analyze the circumstances that led to the Tashkent Agreement in 1966. Discuss the highlights of the Agreement.` },
              { n: 4, q: `Critically examine the compulsions which prompted India to play a decisive role in the emergence of Bangladesh.` },
            ],
          },
        ],
      },
      {
        slug: "world-history",
        name: "World History",
        years: [
          {
            year: 2024,
            questions: [
              { n: 1, q: `How far is it correct to say that the First World War was fought essentially for the preservation of balance of power?` },
              { n: 2, q: `How far was the Industial Revolution in England responsible for the decline of handicrafts and cottage industries in India?` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `Bring out the socio-economic effects of the introduction of railways in different countries of the world.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `“There arose a serious challenge to the Democratic State System between the two World Wars.” Evaluate the statement.` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `What problems were germane to the decolonization process in the Malay Peninsula?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `The anti-colonial struggles in West Africa were led by the new elite of Western educated Africans. Examine.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `Why did the industrial revolution first occur in England? Discuss the quality of life of the people there during the industrialization. How does it compare with that in India at present?` },
              { n: 2, q: `To what extent can Germany be held responsible for causing the two World Wars? Discuss critically` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `What were the events that led to the Suez Crisis in 1956? How did it deal a final blow to Britain’s self-image as a world power?` },
              { n: 2, q: `The New Economic Policy – 1921 of Lenin had influenced the policies adopted by India soon after independence. Evaluate.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `“‘Latecomer’ Industrial Revolution in Japan involved certain factors that were markedly different from what West had experienced.” Analyze.` },
              { n: 2, q: `“Africa was chopped into States artificially created by accidents of European competition.” Analyze.` },
              { n: 3, q: `“American Revolution was an economic revolt against mercantilism.” Substantiate.` },
              { n: 4, q: `What policy instruments were deployed to contain the Great Economic Depression?` },
            ],
          },
        ],
      },
      {
        slug: "geography",
        name: "Indian & World Geography",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `How are climate change and the sea level rise affecting the very existence of many island nations ? Discuss with examples. (Answer in 150 words)` },
              { n: 2, q: `What are non-farm primary activities? How are these activities related to physiographic features in India ? Discuss with suitable examples. (Answer in 150 words)` },
              { n: 3, q: `Explain briefly the ecological and economic benefits of solar energy generation in India with suitable examples. (Answer in 150 words) 10` },
              { n: 4, q: `What are Tsunamis? How and where are they formed? What are their consequences? Explain with examples. (Answer in 150 words) 10` },
              { n: 5, q: `Give a geographical explanation of the distribution of off-shore oil reserves of the world. How are they different from the on-shore occurrences of oil reserves? (Answer in 250 words) 15` },
              { n: 6, q: `How can Artificial Intelligence (AI) and drones be effectively used along with GIS and RS techniques in locational and aerial planning? (Answer in 250 words) 15` },
              { n: 7, q: `Discuss how the changes in shape and sizes of continents and ocean basins of the planet take place due to tectonic movements of the crustal masses. 15 (Answer in 250 words)` },
              { n: 8, q: `Discuss the distribution and density of population in the Ganga River Basin with special reference to land, soil and water resources. 15 (Answer in 250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `What is the phenomenon of ‘Cloudbursts’? Explain.` },
              { n: 2, q: `What is sea surface temperature rise? How does it affect the formation of tropical cyclones?` },
              { n: 3, q: `What is a twister? Why are the majority of twisters observed in areas around the Gulf of Mexico?` },
              { n: 4, q: `What is the concept of a ‘demographic winter’? Is the world moving towards such a situation? Elaborate.` },
              { n: 5, q: `The groundwater potential of the Gangetic valley is on a serious decline. How may it affect the food security of India?` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `Discuss the consequence of Climate change on the food security in tropical countries.` },
              { n: 2, q: `Why is the world today confronted with a crisis of availability of and access to freshwater resources?` },
              { n: 3, q: `How are the fjords formed? Why do they constitute some of the most picturesque areas of the world?` },
              { n: 4, q: `Why is the South-West Monsoon called ‘Purvaiya’ (easterly) in Bhojpur Region? How has this directional seasonal wind system influenced the cultured ethos of the region?` },
              { n: 5, q: `Comment on the resource potentials of the long coastline of India and highlight the status of natural hazard preparedness in these areas.` },
              { n: 6, q: `Identify and discuss the factors responsible for diversity of natural vegetation in India. Assess the significance of wildlife sanctuaries in rain forest regions of India.` },
              { n: 7, q: `Why did human development fail to keep pace with economic development in India?` },
              { n: 8, q: `From being net food importer in 1960, India has emerged as a net food exporter to the world. Provide reasons.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Describe the characteristics and types of primary rocks.` },
              { n: 2, q: `Discuss the meaning of colour-coded weather warnings for cyclone prone areas given by India Meteorological Department.` },
              { n: 3, q: `Discuss the natural resource potentials of ‘Deccan Trap’.` },
              { n: 4, q: `Examine the potential of wind energy in India and explain the reasons for their limited spatial spread.` },
              { n: 5, q: `What are the forces that influence ocean currents? Describe their role in fishing industry of the world.` },
              { n: 6, q: `Describing the distribution of rubber producing countries, indicate the major environmental issues faced by them.` },
              { n: 7, q: `Mention the significance of straits and isthmus in international trade.` },
              { n: 8, q: `Troposphere is a very significant atmosphere layer that determines weather processes. How?` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `Differentiate the causes of landslides in the Himalayan region and Western Ghats.` },
              { n: 2, q: `Despite India being one of the countries of Gondwanaland, its mining industry contributes much less to its Gross Domestic Product (GDP) in percentage. Discuss.` },
              { n: 3, q: `What are the environmental implications of the reclamation of the water bodies into urban land use? Explain with examples.` },
              { n: 4, q: `Mention the global occurrence of volcanic eruptions in 2021 and their impact on regional environment.` },
              { n: 5, q: `Why is India considered as a subcontinent? Elaborate your answer.` },
              { n: 6, q: `Briefly mention the alignment of major mountain ranges of the world and explain their impact on local weather conditions, with examples.` },
              { n: 7, q: `How do the melting of the Arctic ice and glaciers of the Antarctic differently affect the weather patterns and human activities on the Earth? Explain.` },
              { n: 8, q: `Discuss the multi-dimensional implications of uneven distribution of mineral oil in the world.` },
              { n: 9, q: `What are the main socio-economic implications arising out of the development of IT industries in major cities of India?` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `Discuss the geophysical characteristics of Circum-Pacific Zone.` },
              { n: 2, q: `The process of desertification does not have climate boundaries. Justify with examples.` },
              { n: 3, q: `How will the melting of Himalayan glaciers have a far-reaching impact on the water resources of India?` },
              { n: 4, q: `Account for the present location of iron and steel industries away from the source of raw material, by giving examples.` },
              { n: 5, q: `The interlinking of rivers can provide viable solutions to the multi-dimensional inter-related problems of droughts, floods, and interrupted navigation. Critically examine.` },
              { n: 6, q: `Account for the huge flooding of million cities in India including the smart ones like Hyderabad and Pune. Suggest lasting remedial measures.` },
              { n: 7, q: `India has immense potential of solar energy though there are regional variations in its developments. Elaborate.` },
              { n: 8, q: `Examine the status of forest resources of India and its resultant impact on climate change.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `Why is Indian Regional Navigational Satellite System (IRNSS) needed? How does it help in navigation?` },
              { n: 2, q: `Why is India taking keen interest in resources of Arctic region?` },
              { n: 3, q: `Define mantle plume and explain its role in plate tectonics.` },
              { n: 4, q: `What are the consequences of spreading of ‘Dead Zones’ on marine ecosystems?` },
              { n: 5, q: `“The ideal solution of depleting ground water resources in India is water harvesting system”. How can it be made effective in urban areas?` },
              { n: 6, q: `Defining blue revolution, explain the problems and strategies for pisciculture development in India.` },
              { n: 7, q: `What is the significance of Industrial Corridors in India? Identifying industrial corridors, explain their main characteristics.` },
              { n: 8, q: `Mention core strategies for the transformation of aspirational districts in India & explain the nature of convergence, collaboration & Competition for its success.` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `How does the Juno Mission of NASA help to understand the origin and evolution of the Earth?` },
              { n: 2, q: `“In spite of adverse environmental impact, coal mining is still inevitable for development”. Discuss.` },
              { n: 3, q: `Mention the advantages of the cultivation of pulses because of which the year 2016 was declared as the International Year of Pulses by United Nations.` },
              { n: 4, q: `How does the cryosphere affect global climate?` },
              { n: 5, q: `“The growth of cities as I.T. hubs has opened up new avenues of employment, but has also created new problems”. Substantiate this statement with examples.` },
              { n: 6, q: `Account for variations in oceanic salinity and discuss its multidimensional effects.` },
              { n: 7, q: `Petroleum refineries are not necessarily located nearer to crude oil producing areas, particularly in many of the developing countries. Explain its implications.` },
              { n: 8, q: `In what way can floods be converted into a sustainable source of irrigation and all-weather inland navigation in India?` },
              { n: 9, q: `What characteristics can be assigned to monsoon climate that succeeds in feeding more than 50 percent of the world population residing in Monsoon Asia?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `With a brief background of quality of urban life in India, introduce the objectives and strategy of the ‘Smart City Programme.’` },
              { n: 2, q: `Discuss the concept of air mass and explain its role in macro-climatic changes.` },
              { n: 3, q: `“The Himalayas are highly prone to landslides.” Discuss the causes and suggest suitable measures of mitigation.` },
              { n: 4, q: `The effective management of land and water resources will drastically reduce the human miseries. Explain.` },
              { n: 5, q: `South China Sea has assumed great geopolitical significance in the present context. Comment.` },
              { n: 6, q: `Major cities of India are becoming vulnerable to flood conditions. Discuss.` },
              { n: 7, q: `Present an account of the Indus Water Treaty and examine its ecological, economic and political implications in the context of changing bilateral relations.` },
              { n: 8, q: `Enumerate the problems and prospects of inland water transport in India.` },
              { n: 9, q: `In what way micro-watershed development projects help in water conservation in drought-prone and semi-arid regions of India?` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `Explain the factors responsible for the origin of ocean currents? How do they influence regional climates, fishing and navigation?` },
              { n: 2, q: `Mumbai, Delhi and Kolkata are the three mega cities of the country but the air pollution is much more serious problem in Delhi as compared to the other two. Why is this so?` },
              { n: 3, q: `India is well endowed with fresh water resources. Critically examine why it still suffers from water scarcity.` },
              { n: 4, q: `The states of Jammu and Kashmir, Himachal Pradesh and Uttarakhand are reaching the limits of their ecological carrying capacity due to tourism. Critically evaluate.` },
              { n: 5, q: `How far do you agree that the behaviour of the Indian monsoon has been changing due to humanizing landscapes? Discuss.` },
              { n: 6, q: `Smart cities in India cannot sustain without smart villages. Discuss this statement in the backdrop of rural urban integration.` },
              { n: 7, q: `What are the economic significances of discovery of oil in Arctic Sea and its possible environmental consequences?` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `Most of the unusual climatic happenings are explained as an outcome of the El-Nino effect. Do you agree?` },
              { n: 2, q: `Why are the world’s fold mountain systems located along the margins of continents? Bring out the association between the global distribution of fold mountains and the earthquakes and volcanoes.` },
              { n: 3, q: `Explain the formation of thousands of islands in Indonesian and Philippines archipelagos.` },
              { n: 4, q: `Tropical cyclones are largely confined to South China Sea, Bay of Bengal and Gulf of Mexico. Why?` },
              { n: 5, q: `Bring out the relationship between the shrinking Himalayan glaciers and the symptoms of climate change in the Indian sub-continent.` },
              { n: 6, q: `Whereas the British planters had developed tea gardens all along the Shivaliks and Lesser Himalayas from Assam to Himachal Pradesh, in effect they did not succeed beyond the Darjeeling area. Explain.` },
              { n: 7, q: `Why did the Green Revolution in India virtually by-pass the eastern region despite fertile soil and good availability of water?` },
              { n: 8, q: `Account for the change in the spatial pattern of the Iron and Steel industry in the world.` },
              { n: 9, q: `Critically evaluate the various resources of the oceans which can be harnessed to meet the resource crisis in the world.` },
              { n: 10, q: `How does India see its place in the economic space of rising natural resource rich Africa?` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `(a) What do you understand by the theory of ‘continental drift’? Discuss t he prominent evidences in its support. (b) The recent cyclone on east coast of India was called ‘Phailin’. How are the tropical cyclones named across the world? Elaborate.` },
              { n: 2, q: `(a) Bring out the causes for the formation of heat islands in the urban habitat of the world. (b) What do you understand by the phenomenon of ‘temperature inversion’ in meteorology? How does it affect weather and the habitants of the place?` },
              { n: 3, q: `Major hot deserts in northern hemisphere are located between 20-30 deg N latitudes and on the western side of the continents. Why?` },
              { n: 4, q: `(a) Bring out the causes for more frequent occurrence of landslides in the Himalayas than in the Western Ghats. (b) There is no formation of deltas by rivers of the Western Ghats. Why?` },
              { n: 5, q: `(a) Do you agree that there is a growing trend of opening new sugar mills in southern States of India? Discuss with justification. (b) Analyze the factors for the highly decentralized cotton textile industry in India.` },
              { n: 6, q: `With growing scarcity of fossil fuels, the atomic energy is gaining more and more significance in India. Discuss the availability of raw material required for the generation of atomic energy in India and in the world.` },
              { n: 7, q: `It is said that India has substantial reserves of shale oil and gas, which can feed the needs of the country for quarter century. However, tapping of the resource does not appear to be high on the agenda. Discuss critically the availability and issues involved.` },
            ],
          },
        ],
      },
      {
        slug: "society",
        name: "Indian Society",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `How does smart city in India, address the issues of urban poverty and distributive justice? (Answer in 150 words)` },
              { n: 2, q: `The ethos of civil service in India stands for the combination of professionalism with nationalistic consciousness – Elucidate.` },
              { n: 3, q: `Do you think that globalization results in only an aggressive consumer culture? Justify your answer. (Answer in 150 words) 10` },
              { n: 4, q: `How do you account for the growing fast food industries given that there are increased health concerns in modern society? Illustrate your answer with the Indian experience. (Answer in 250 words)` },
              { n: 5, q: `Achieving sustainable growth with emphasis on environmental protection could come into conflict with poor people's needs in a country like India - Comment. 15 (Answer in 250 words)` },
              { n: 6, q: `Does tribal development in India centre around two axes, those of displacement and of rehabilitation ? Give your opinion. 15 (Answer in 250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `Intercaste marriages between castes which have socio-economic parity have increased, to some extent, but this is less true of interreligious marriages. Discuss.` },
              { n: 2, q: `Globalization has increased urban migration by skilled, young, unmarried women from various classes. How has this trend impacted upon their personal freedom and relationship with family?` },
              { n: 3, q: `What is regional disparity? How does it differ from diversity? How serious is the issue of regional disparity in India?` },
              { n: 4, q: `Distinguish between gender equality, gender equity, and women's empowerment. Why is it important to take gender concerns into account in programme design and implementation?` },
              { n: 5, q: `Despite comprehensive policies for equity and social justice, underprivileged sections are not yet getting the full benefits of affirmative action envisaged by the Constitution. Comment.` },
              { n: 6, q: `Critically analyse the proposition that there is a high correlation between India's cultural diversities and socio-economic marginalities.` },
              { n: 7, q: `Why do large cities tend to attract more migrants than smaller towns? Discuss in the light of conditions in developing countries.` },
              { n: 8, q: `In dealing with socio-economic issues of development, what kind of collaboration between government, NGOs, and private sector would be most productive?` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `Explain why suicide among young women is increasing in Indian society.` },
              { n: 2, q: `Child cuddling is now being replaced by mobile phones. Discuss its impact on the socialization of children.` },
              { n: 3, q: `What are the main features of Vedic society and religion? Do you think some of the features are still prevailing in Indian society?` },
              { n: 4, q: `Does urbanization lead to more segregation and/or marginalization of the poor in Indian metropolises?` },
              { n: 5, q: `Why is caste identity in India both fluid and static?` },
              { n: 6, q: `Discuss the impact of post-liberal economy on ethnic identity and communalism.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Explore and evaluate the impact of ‘Work From Home’ on family relationships.` },
              { n: 2, q: `How is the growth of Tier 2 Cities related to the rise of a new middle class with an emphasis on the culture of consumption?` },
              { n: 3, q: `Given the diversities among tribal communities in India, in which specific contexts should they be considered as a single category?` },
              { n: 4, q: `Analyse the salience of ‘sect’ in Indian society vis-a-vis caste, region and religion.` },
              { n: 5, q: `Are tolerance, assimilation and pluralism the key elements in the making of an Indian form of secularism? Justify your answer.` },
              { n: 6, q: `Elucidate the relationship between globalization and new technology in a world of scarce resources, with special reference to India.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `Examine the uniqueness of tribal knowledge systems when compared with mainstream knowledge and cultural systems.` },
              { n: 2, q: `Examine the role of ‘Gig Economy’ in the process of empowerment of women in India.` },
              { n: 3, q: `Discuss the main objectives of Population Education and point out the measures to achieve them in India in detail.` },
              { n: 4, q: `What is Cryptocurrency? How does it affect global society? Has it been affecting Indian society also?` },
              { n: 5, q: `How does Indian society maintain continuity in traditional social values? Enumerate the changes taking place in it.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `Has caste lost its relevance in understanding the multi-cultural Indian Society? Elaborate your answer with illustrations.` },
              { n: 2, q: `COVID-19 pandemic accelerated class inequalities and poverty in India. Comment.` },
              { n: 3, q: `Do you agree that regionalism in India appears to be a consequence of rising cultural assertiveness? Argue` },
              { n: 4, q: `Is diversity and pluralism in India under threat due to globalization? Justify your answer.` },
              { n: 5, q: `Customs and traditions suppress reason leading to obscurantism. Do you agree?` },
              { n: 6, q: `How have digital initiatives in India contributed to the functioning of the education system in the country? Elaborate your answer.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `“Caste system is assuming new identities and associational forms. Hence caste system cannot be eradicated in India.” Comment.` },
              { n: 2, q: `‘Despite implementation of various programmes for eradication of poverty by the government in India, poverty is still existing’. Explain by giving reasons.` },
              { n: 3, q: `How the Indian concept of secularism is different from the western model of secularism? Discuss.` },
              { n: 4, q: `‘Women’s movement in India has not addressed the issues of women of lower social strata.’ Substantiate your view.` },
              { n: 5, q: `‘Globalization is generally said to promote cultural homogenization but due to this cultural specificities appear to be strengthened in the Indian Society.’ Elucidate.` },
              { n: 6, q: `‘Communalism arises either due to power struggle or relative deprivation’. Argue by giving suitable illustrations.` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `In the context of the diversity of India, can it be said that the regions form cultural units rather than the States? Give reasons with examples for your viewpoint.` },
              { n: 2, q: `What are the two major legal initiatives by the State since Independence addressing discrimination against Scheduled Tribes (STs)?` },
              { n: 3, q: `The spirit of tolerance and love is not only an interesting feature of Indian society from very early times, but it is also playing an important part at the present. Elaborate.` },
              { n: 4, q: `Distinguish between religiousness/religiosity and communalism giving one example of how the former has got transformed into the latter in independent India.` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `To what extent globalisation has influenced the core of cultural diversity in India? Explain.` },
              { n: 2, q: `“An essential condition to eradicate poverty is to liberate the poor from the process of deprivation.” Substantiate this statement with suitable examples.` },
              { n: 3, q: `Why are the tribals in India referred to as ‘the Scheduled Tribes’? Indicate the major provisions enshrined in the Constitution of India for their upliftment.` },
              { n: 4, q: `What is the basis of regionalism? Is it that unequal distribution of benefits of development on regional basis eventually promotes regionalism? Substantiate your answer.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `Describe any four cultural elements of diversity in India and rate their relative significance in building a national identity.` },
              { n: 2, q: `Critically examine whether growing population is the cause of poverty OR poverty is the main cause of population increase in India.` },
              { n: 3, q: `How do you explain the statistics that show that the sex ratio in Tribes in India is more favourable to women than the sex ratio among Scheduled Castes?` },
              { n: 4, q: `Discuss the changes in the trends of labour migration within and outside India in the last four decades.` },
              { n: 5, q: `Discuss the positive and negative effects of globalization on women in India.` },
              { n: 6, q: `Debate the issue of whether and how contemporary movements for assertion of Dalit identity work towards annihilation of caste.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `How does patriarchy impact the position of a middle class working woman in India?` },
              { n: 2, q: `Why do some of the most prosperous regions of India have an adverse sex ratio for women? Give your arguments.` },
              { n: 3, q: `The life cycle of a joint family depends on economic factors rather than social values. Discuss.` },
              { n: 4, q: `Discuss the various economic and socio-cultural forces that are driving increasing feminization of agriculture in India.` },
              { n: 5, q: `How do the Indian debates on secularism differ from the debates in the West?` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `Discuss the various social problems which originated out of the speedy process of urbanization in India.` },
              { n: 2, q: `“Male membership needs to be encouraged in order to make women’s organization free from gender bias.” Comment.` },
              { n: 3, q: `Critically examine the effect of globalization on the aged population in India.` },
              { n: 4, q: `Growing feeling of regionalism is an important factor in generation of demand for a separate State. Discuss.` },
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
            year: 2025,
            questions: [
              { n: 1, q: `Discuss the ‘corrupt practices’ for the purpose of the Representation of the People Act, 1951. Analyze whether the increase in the assets of the legislators and/or their associates, disproportionate to their known sources of income, would constitute ‘undue influence’ and consequently a corrupt practice. (Answer in 150 words)` },
              { n: 2, q: `Comment on the need of administrative tribunals as compared to the court system. Assess the impact of the recent tribunal reforms through rationalization of tribunals made in 2021. (Answer in 150 words)` },
              { n: 3, q: `Compare and contrast the President’s power to pardon in India and in the USA. Are there any limits to it in both the countries? What are ‘preemptive pardons’? (Answer in 150 words)` },
              { n: 4, q: `Discuss the nature of Jammu and Kashmir Legislative Assembly after the Jammu and Kashmir Reorganization Act, 2019. Briefly describe the powers and functions of the Assembly of the Union Territory of Jammu and Kashmir. (Answer in 150 words)` },
              { n: 5, q: `The Attorney General of India plays a crucial role in guiding the legal framework of the Union Government and ensuring sound governance through legal counsel.” Discuss his responsibilities, rights and limitations in this regard. (Answer in 150 words)` },
              { n: 6, q: `“Constitutional morality is the fulcrum which acts as an essential check upon the high functionaries and citizens alike…” In view of the above observation of the Supreme Court, explain the concept of constitutional morality and its application to ensure balance between judicial independence and judicial accountability in India. (250 words)` },
              { n: 7, q: `Indian Constitution has conferred the amending power on the ordinary legislative institutions with a few procedural hurdles. In view of this statement, examine the procedural and substantive limitations on the amending power of the Parliament to change the Constitution. (250 words)` },
              { n: 8, q: `Discuss the evolution of the collegium system in India. Critically examine the advantages and disadvantages of the system of appointment of the Judges of the Supreme Court of India and that of the USA.(250 words)` },
              { n: 9, q: `Examine the evolving pattern of Centre-State financial relations in the context of planned development in India. How far have the recent reforms impacted the fiscal federalism in India? (250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `Explain and distinguish between Lok Adalats and Arbitration Tribunals. Do they entertain civil as well as criminal cases?` },
              { n: 2, q: `Right to privacy is intrinsic to life and personal liberty and is inherently protected under Article 21 of the Constitution. Explain. In this reference, discuss the law relating to DNA testing of a child in the womb to establish its paternity.` },
              { n: 3, q: `Discuss India as a secular state and compare it with the secular principles of the US Constitution.` },
              { n: 4, q: `What changes has the Union Government recently introduced in the domain of Centre-State relations? Suggest measures to be adopted to build the trust between the Centre and the States and for strengthening federalism.` },
              { n: 5, q: `‘‘The growth of the cabinet system has practically resulted in the marginalisation of parliamentary supremacy.’’ Elucidate.` },
              { n: 6, q: `Examine the need for electoral reforms as suggested by various committees, with particular reference to the ‘‘One Nation–One Election’’ principle.` },
              { n: 7, q: `What are the aims and objects of the recently passed and enforced, The Public Examination (Prevention of Unfair Means) Act, 2024? Whether University/State Education Board examinations are also covered under the Act?` },
              { n: 8, q: `Explain the reasons for the growth of public interest litigation in India. As a result, has the Indian Supreme Court emerged as the world's most powerful judiciary?` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `‘‘Constitutionally guaranteed judicial independence is a prerequisite of democracy.’’ Comment.` },
              { n: 2, q: `Who are entitled to receive free legal aid? Assess the role of the National Legal Services Authority (NALSA) in rendering free legal aid in India.` },
              { n: 3, q: `‘‘The states in India seem reluctant to empower urban local bodies both functionally as well as financially.’’ Comment.` },
              { n: 4, q: `Compare and contrast the British and Indian approaches to Parliamentary sovereignty.` },
              { n: 5, q: `Discuss the role of Presiding Officers of state legislatures in maintaining order and impartiality in conducting legislative work and in facilitating best democratic practices.` },
              { n: 6, q: `“The Constitution of India is a living instrument with capabilities of enormous dynamism. It is a constitution made for a progressive society.” Illustrate with special reference to the expanding horizons of the right to life and personal liberty.` },
              { n: 7, q: `Explain the constitutional perspectives of Gender Justice with the help of relevant Constitutional Provisions and case laws.` },
              { n: 8, q: `Account for the legal and political factors responsible for the reduced frequency of using Article 356 by the Union Governments since mid 1990s.` },
              { n: 9, q: `Explain the significance of the 101st Constitutional Amendment Act. To what extent does it reflect the accommodative spirit of federalism?` },
              { n: 10, q: `Explain the structure of the Parliamentary Committee system. How far have the financial committees helped in the institutionalisation of Indian Parliament?` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `"The most significant achievement of modern law in India is the constitutionalization of environmental problems by the Supreme Court." Discuss this statement with the help of relevant case laws.` },
              { n: 2, q: `"Right of movement and residence throughout the territory of India are freely available to the Indian citizens, but these rights are not absolute." Comment.` },
              { n: 3, q: `Discuss the role of the Vice-President of India as the Chairman of the Rajya Sabha.` },
              { n: 4, q: `Discuss the role of the National Commission for Backward Classes in the wake of its transformation from a statutory body to a constitutional body.` },
              { n: 5, q: `Discuss the procedures to decide the disputes arising out of the election of a Member of the Parliament or State Legislature under The Representation of the People Act, 1951. What are the grounds on which the election of any returned candidate may be declared void? What remedy is available to the aggrieved party against the decision? Refer to the case laws.` },
              { n: 6, q: `Discuss the essential conditions for exercise of the legislative powers by the Governor. Discuss the legality of re-promulgation of ordinances by the Governor without placing them before the Legislature.` },
              { n: 7, q: `"While the national political parties in India favour centralisation, the regional parties are in favour of State autonomy." Comment.` },
              { n: 8, q: `Critically examine the procedures through which the Presidents of India and France are elected.` },
              { n: 9, q: `Discuss the role of the Election Commission of India in the light of the evolution of the Model Code of Conduct.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `‘Constitutional Morality’ is rooted in the Constitution itself and is founded on its essential facets. Explain the doctrine of ‘Constitutional Morality’ with the help of relevant judicial decisions.` },
              { n: 2, q: `Discuss the desirability of greater representation to women in the higher judiciary to ensure diversity, equity and inclusiveness.` },
              { n: 3, q: `How have the recommendations of the 14th Finance Commission of India enabled the States to improve their fiscal position?` },
              { n: 4, q: `To what extent, in your view, the Parliament is able to ensure accountability of the executive in India?` },
              { n: 5, q: `The jurisdiction of the Central Bureau of Investigation (CBI) regarding lodging an FIR and conducting probe within a particular State is being questioned by various States. However, the power of the States to withhold consent to the CBI is not absolute. Explain with special reference to the federal character of India.` },
              { n: 6, q: `Though the Human Rights Commissions have contributed immensely to the protection of human rights in India, yet they have failed to assert themselves against the mighty and powerful. Analysing their structural and practical limitations, suggest remedial measures.` },
              { n: 7, q: `Analyse the distinguishing features of the notion of Right to Equality in the Constitutions of the USA and India.` },
              { n: 8, q: `Explain the constitutional provisions under which Legislative Councils are established. Review the working and current status of Legislative Councils with suitable illustrations.` },
              { n: 9, q: `Do Department-related Parliamentary Standing Committees keep the administration on its toes and inspire reverence for parliamentary control? Evaluate the working of such committees with suitable examples.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `“There is a need for simplification of procedure for disqualification of persons found guilty of corrupt practices under the Representation of Peoples Act”. Comment.` },
              { n: 2, q: `“Recent amendments to the Right to Information Act will have a profound impact on the autonomy and independence of the Information Commission”. Discuss.` },
              { n: 3, q: `How far do you think cooperation, competition and confrontation have shaped the nature of federation in India? Cite some recent examples to validate your answer.` },
              { n: 4, q: `The judicial systems in India and the UK seem to be converging as well as diverging in recent times. Highlight the key points of convergence and divergence between the two nations in terms of their judicial practices.` },
              { n: 5, q: `‘Once a Speaker, Always a Speaker’! Do you think this practice should be adopted to impart objectivity to the office of the Speaker of Lok Sabha? What could be its implications for the robust functioning of parliamentary business in India?` },
              { n: 6, q: `Indian Constitution exhibits centralising tendencies to maintain unity and integrity of the nation. Elucidate in the perspective of the Epidemic Diseases Act, 1897; The Disaster Management Act, 2005 and recently passed Farm Acts.` },
              { n: 7, q: `Judicial Legislation is antithetical to the doctrine of separation of powers as envisaged in the Indian Constitution. In this context justify the filing of large number of public interest petitions praying for issuing guidelines to executive authorities.` },
              { n: 8, q: `The strength and sustenance of local institutions in India has shifted from their formative phase of ‘Functions, Functionaries and Funds’ to the contemporary stage of ‘Functionality’. Highlight the critical challenges faced by local institutions in terms of their functionality in recent times.` },
              { n: 9, q: `Rajya Sabha has been transformed from a ‘useless stepney tyre’ to the most useful supporting organ in past few decades. Highlight the factors as well as the areas in which this transformation could be visible.` },
              { n: 10, q: `Which steps are required for constitutionalization of a Commission? Do you think imparting constitutionality to the National Commission for Women would ensure greater gender justice and empowerment in India? Give reasons.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `In the light of recent controversy regarding the use of Electronic Voting Machine (EVM), what are the challenges before the Election Commission of India to ensure the trustworthiness of elections in India?` },
              { n: 2, q: `Whether National Commission for Scheduled Castes (NCSC) can enforce the implementation of constitutional reservation for the Scheduled Castes in the religious minority institutions? Examine.` },
              { n: 3, q: `Under what circumstances can the Financial Emergency be proclaimed by the President of India? What consequences follow when such a declaration remain in force?` },
              { n: 4, q: `Why do you think the committees are considered to be useful for parliamentary work? Discuss, in this context, the role of the Estimates Committee.` },
              { n: 5, q: `“The Comptroller and Auditor General (CAG) has a very vital role to play.” Explain how this is reflected in the method and terms of his appointment as well as the range of powers he can exercise.` },
              { n: 6, q: `Whether the Supreme Court Judgment (July 2018) can settle the political tussle between the Lt. Governor and elected government of Delhi? Examine.` },
              { n: 7, q: `How far do you agree with the view that tribunals curtail the jurisdiction of ordinary courts? In view of the above, discuss the constitutional validity and competency of the tribunals in India?` },
              { n: 8, q: `India and USA are the two large democracies. Examine the basic tenets on which the two political systems are based.` },
              { n: 9, q: `How is the Finance Commission of India constituted? What do you know about the terms of reference of the recently constituted Finance Commission? Discuss.` },
              { n: 10, q: `Assess the importance of the Panchayat system in India as a part of local government. Apart from government grants, what sources the Panchayats can look out for financing development projects?` },
              { n: 11, q: `Multiplicity of various commissions for the vulnerable sections of the society leads to problems of overlapping jurisdiction & duplication of functions. Is it better to merge all commissions into an umbrella human rights commission? Argue your case.` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `“The local self government system in India has not proved to be effective instrument of governance”. Critically examine the statement and give your views to improve the situation.` },
              { n: 2, q: `Critically examine the Supreme Court’s judgement on ‘National Judicial Appointments Commission Act, 2014’ with reference to appointment of judges of higher judiciary in India.` },
              { n: 3, q: `‘Simultaneous election to the Lok Sabha and the State Assemblies will limit the amount of time and money spent in electioneering but it will reduce the government’s accountability to the people’ Discuss.` },
              { n: 4, q: `How do pressure groups influence Indian political process? Do you agree with this view that informal pressure groups have emerged as powerful as formal pressure groups in recent years?` },
              { n: 5, q: `Explain the salient features of the constitution (One Hundred and First Amendment) Act, 2016. Do you think it is efficacious enough ‘to remove cascading effect of taxes and provide for common national market for goods and services’?` },
              { n: 6, q: `Examine the scope of Fundamental Rights in the light of the latest judgement of the Supreme Court on Right to Privacy.` },
              { n: 7, q: `The Indian Constitution has provisions for holding a joint session of the two houses of the Parliament. Enumerate the occasions when this would normally happen and also the occasions when it cannot, with reasons thereof.` },
              { n: 8, q: `To enhance the quality of democracy in India the Election Commission of India has proposed electoral reforms in 2016. What are the suggested reforms and how far are they significant to make democracy successful?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `Discuss the essentials of the 69th Constitutional Amendment Act and anomalies, if any, that have led to recent reported conflicts between the elected representatives and institution of Lieutenant Governor in the administration of Delhi. Do you think that this will give rise to a new trend in the functioning of the Indian Federal Politics?` },
              { n: 2, q: `To what extent is Article 370 of the Indian Constitution, bearing marginal note “Temporary provision with respect to the State of Jammu and Kashmir”, temporary? Discuss the future prospects of this provision in the context of Indian polity.` },
              { n: 3, q: `“The Indian party system is passing through a phase of transition which looks to be full of contradictions and paradoxes.” Discuss.` },
              { n: 4, q: `Exercise of CAG’s powers in relation to the accounts of the Union and the States is derived from Article 149 of the Indian Constitution. Discuss whether audit of the Government’s policy implementation could amount to overstepping its own (CAG) jurisdiction.` },
              { n: 5, q: `Discuss each adjective attached to the word ‘Republic’ in the ‘Preamble’. Are they defendable in the present circumstances?` },
              { n: 6, q: `What was held in the Coelho case? In this context, can you say that judicial review is of key importance amongst the basic features of the Constitution?` },
              { n: 7, q: `Did the Government of India Act, 1935 lay down a federal constitution? Discuss.` },
              { n: 8, q: `What is quasi judicial body? Explain with the help of concrete examples.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `Discuss the possible factors that inhibit India from enacting for its citizen a uniform civil code as provided for in the Directive Principles of State Policy.` },
              { n: 2, q: `The concept of cooperative federalism has been increasingly emphasised in recent years. Highlight the drawbacks in the existing structure and the extent to which cooperative federalism would answer the shortcomings.` },
              { n: 3, q: `In absence of well–educated and organised local level government system, ‘Panchayats’ and ‘Samitis’ have remained mainly political institutions and not effective instruments of governance. Critically discuss.` },
              { n: 4, q: `Khap panchayats have been in the news for functioning as extra–constitutional authorities, often delivering pronouncements amounting to human rights violations. Discuss critically the actions taken by the legislative, executive and the judiciary to set the things right in this regard.` },
              { n: 5, q: `Resorting to ordinances has always raised concern on violation of the spirit of separation of powers doctrine. While noting the rationales justifying the power to promulgate ordinances, analyse whether the decisions of the Supreme Court on the issue have further facilitated resorting to this power. Should the power to promulgate the ordinances be repealed?` },
              { n: 6, q: `What are the major changes brought in the Arbitration and Conciliation Act, 1996 through the recent Ordinance promulgated by the President? How far will it improve India’s dispute resolution mechanism? Discuss.` },
              { n: 7, q: `Does the right to clean environment entail legal regulation on burning crackers during Diwali? Discuss in the light of Article 21 of Indian Constitution and Judgement(s) of the Apex court in this regard.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `Starting from inventing the ‘basic structure’ doctrine, the judiciary has played a highly proactive role in ensuring that India develops into a thriving democracy. In light of the statement, evaluate the role played by judicial activism in achieving the ideals of democracy.` },
              { n: 2, q: `Though the federal principle is dominant in our Constitution and that principle is one of its basic features, but it is equally true that federalism under the Indian Constitution leans in favour of a strong Centre, a feature that militates against the concept of strong federalism. Discuss.` },
              { n: 3, q: `The ‘Powers, Privileges and Immunities of Parliament and its Members’ as envisaged in Article 105 of the Constitution leave room for a large number of un-codified and un-enumerated privileges to continue. Assess the reasons for the absence of legal codification of the ‘parliamentary privileges’. How can this problem be addressed?` },
              { n: 4, q: `What do you understand by the concept “freedom of speech and expression”? Does it cover hate speech also? Why do the films in India stand on a slightly different plane from other forms of expression? Discuss.` },
              { n: 5, q: `Instances of President’s delay in commuting death sentences has come under public debate as denial of justice. Should there be a time limit specified for the President to accept/reject such petitions? Analyse.` },
              { n: 6, q: `National Human Rights Commission (NHRC) in India can be most effective when its tasks are adequately supported by other mechanisms that ensure the accountability of a government. In light of the above observation assess the role of NHRC as an effective complement to the judiciary and other institutions in promoting and protecting human rights standards.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `The role of individual MPs (Members of Parliament) has diminished over the years and as a result healthy constructive debates on policy issues are not usually witnessed. How far can this be attributed to the anti-defection law which was legislated but with a different intention?` },
              { n: 2, q: `Discuss Section 66A of IT Act, with reference to its alleged violation of Article 19 of the Constitution.` },
              { n: 3, q: `Recent directives from Ministry of Petroleum and Natural Gas are perceived by the ‘Nagas’ as a threat to override the exceptional status enjoyed by the State. Discuss in light of Article 371A of the Indian Constitution.` },
              { n: 4, q: `‘The Supreme Court of India keeps a check on arbitrary power of the Parliament in amending the Constitution.’ Discuss critically.` },
              { n: 5, q: `Constitutional mechanisms to resolve the inter-state water disputes have failed to address and solve the problems. Is the failure due to structural or process inadequacy or both? Discuss.` },
              { n: 6, q: `Pressure group politics is sometimes seen as the informal face of politics. With regards to the above, assess the structure and functioning of pressure groups in India.` },
            ],
          },
        ],
      },
      {
        slug: "governance",
        name: "Governance",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `e-governance projects have a built-in bias towards technology and back-end integration than user-centric designs. Examine.(Answer in 150 words) 10` },
              { n: 2, q: `Civil Society Organizations are often perceived as being anti-State actors than non-State actors. Do you agree? Justify. (Answer in 150 words)` },
              { n: 3, q: `What are environmental pressure groups? Discuss their role in raising awareness, influencing policies and advocating for environmental protection in India. (250 words)` },
              { n: 4, q: `“In contemporary development models, decision-making and problem-solving responsibilities are not located close to the source of information and execution, defeating the objectives of development.” Critically evaluate. (Answer in 250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `Analyse the role of local bodies in providing good governance at the local level and bring out the pros and cons of merging rural local bodies with urban local bodies.` },
              { n: 2, q: `‘‘The duty of the Comptroller and Auditor General is not merely to ensure the legality of expenditure but also its propriety.’’ Comment.` },
              { n: 3, q: `The Citizens' Charter has been a landmark initiative in ensuring citizen-centric administration. But it is yet to reach its full potential. Identify the factors hindering the realisation of its promise and suggest measures to overcome them.` },
              { n: 4, q: `e-Governance is not just about the routine application of digital technology in service delivery processes. It is as much about multifarious interactions for ensuring transparency and accountability. In this context, evaluate the role of the ‘Interactive Service Model’ of e-Governance.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `Discuss the role of the Competition Commission of India in containing the abuse of dominant position by the Multi-National Corporations in India. Refer to the recent decisions.` },
              { n: 2, q: `e-governance, as a critical tool of governance, has ushered in effectiveness, transparency and accountability in governments. What inadequacies hamper the enhancement of these features?` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `To what extent, in your opinion, has the decentralisation of power in India changed the governance landscape at the grassroots?` },
              { n: 2, q: `The Gati-Shakti Yojana needs meticulous co-ordination between the government and the private sector to achieve the goal of connectivity. Discuss.` },
              { n: 3, q: `The Rights of Persons with Disabilities Act, 2016 remains only a legal document without intense sensitisation of government functionaries and citizens regarding disability. Comment.` },
              { n: 4, q: `Reforming the government delivery system through the Direct Benefit Transfer Scheme is a progressive step, but it has its limitations too. Comment.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `“Pressure groups play a vital role in influencing public policy making in India.” Explain how the business associations contribute to public policies.` },
              { n: 2, q: `Has digital illiteracy, particularly in rural areas, coupled with lack of Information and Communication Technology (ICT) accessibility hindered socio-economic development? Examine with justification.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `“Institutional quality is a crucial driver of economic performance”. In this context suggest reforms in the Civil Service for strengthening democracy.` },
              { n: 2, q: `“The emergence of the Fourth Industrial Revolution (Digital Revolution) has initiated e-Governance as an integral part of government”. Discuss.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `“Policy Contradictions among various competing sectors and stakeholders have resulted in inadequate ‘protection and prevention of degradation’ to environment.” Comment with relevant illustrations.` },
              { n: 2, q: `E-governance is not only about utilization of the power of new technology, but also much about critical importance of the ‘use value’ of information. Explain.` },
              { n: 3, q: `The Citizens’ Charter is an ideal instrument of organizational transparency and accountability, but it has its own limitations. Identify the limitations and suggest measures for greater effectiveness of the Citizens’ Charter.` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `Discuss the role of Public Accounts Committee in establishing accountability of the government to the people.` },
              { n: 2, q: `Is the National Commission for Women able to strategise and tackle the problems that women face at both public and private spheres? Give reasons in support of your answer.` },
              { n: 3, q: `‘The emergence of Self Help Groups (SHGs) in contemporary times points to the slow but steady withdrawal of the state from developmental activities’. Examine the role of the SHGs in developmental activities and the measures taken by the Government of India to promote the SHGs.` },
              { n: 4, q: `“Poverty Alleviation programs in India remain mere showpieces until and unless they are backed up by political will.” Discuss with reference to the performance of the major poverty alleviation program in India.` },
              { n: 5, q: `Initially Civil Services in India were designed to achieve the goals of neutrality and effectiveness, which seems to be lacking in the present context. Do you agree with the view that drastic reforms are required in Civil Services. Comment.` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `“In the Indian governance system, the role of non-state actors has been only marginal.” Critically examine this statement.` },
              { n: 2, q: `“Demographic Dividend in India will remain only theoretical unless our manpower becomes more educated, aware, skilled and creative.” What measures have been taken by the government to enhance the capacity of our population to be more productive and employable?` },
              { n: 3, q: `“Effectiveness of the government system at various levels and people’s participation in the governance system are interdependent” Discuss their relationship in the context of India.` },
              { n: 4, q: `In the integrity index of Transparency International, India stands very low. Discuss briefly the legal, political, social and cultural factors that have caused the decline of public morality in India.` },
              { n: 5, q: `Has the Indian governmental system responded adequately to the demands of Liberalization, Privatization and Globalization started in 1991? What can the government do to be responsive to this important change?` },
              { n: 6, q: `“Traditional bureaucratic structure and culture have hampered the process of socio-economic development in India.” Comment.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `Examine critically the recent changes in the rules governing foreign funding of NGOs under the Foreign Contribution (Regulation) Act (FCRA), 1976.` },
              { n: 2, q: `The Self Help Group (SHG) Bank Linkage Programme (SBLP), which is India’s own innovation , has proved to be one of the most effective poverty alleviation and women empowerment programmes. Elucidate.` },
              { n: 3, q: `How can the role of NGOs be strengthened in India for development works relating to protection of the environment? Discuss throwing light on the major constraints.` },
              { n: 4, q: `In the light of Satyam Scandal (2009), discuss the changes brought in corporate governance to ensure transparency, accountability.` },
              { n: 5, q: `“If amendment bill to the Whistleblowers Protection Act, 2011 tabled in the Parliament is passed, there may be no one left to protect.” Critically evaluate.` },
              { n: 6, q: `“For achieving the desired objectives, it is necessary to ensure that the regulatory institutions remain independent and autonomous.” Discuss in the light of experiences in recent past.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `The size of the cabinet should be as big as governmental work justifies and as big as the Prime Minister can manage as a team. How far is the efficacy of a government then inversely related to the size of the cabinet? Discuss.` },
              { n: 2, q: `Though 100 percent FDI is already allowed in non-news media like a trade publication and general entertainment channel, the Government is mulling over the proposal for increased FDI in news media for quite some time. What difference would an increase in FDI make? Critically evaluate the pros and cons.` },
              { n: 3, q: `The setting up of a Rail Tariff Authority to regulate fares will subject the cash strapped Indian Railways to demand subsidy for obligation to operate non-profitable routes and services. Taking into account the experience in the power sector, discuss if the proposed reform is expected to benefit the consumers, the Indian Railways or the private container operators.` },
              { n: 4, q: `The penetration of Self Help Groups (SHGs) in rural areas in promoting participation in development programmes is facing socio-cultural hurdles. Examine.` },
              { n: 5, q: `An athlete participates in Olympics for personal triumph and nation’s glory; victors are showered with cash incentives by various agencies, on their return. Discuss the merit of state sponsored talent hunt and its cultivation as against the rationale of a reward mechanism as encouragement.` },
              { n: 6, q: `Should the premier institutes like IITs/IIMs be allowed to retain premier status, allowed more academic independence in designing courses and also decide mode/criteria of selection of students. Discuss in light of the growing challenges.` },
              { n: 7, q: `Has the Cadre based Civil Services Organization been the cause of slow change in India ? Critically examine.` },
              { n: 8, q: `Two parallel run schemes of the Government, viz. the Adhaar Card and NPR, one as voluntary and the other as compulsory, have led to debates at national levels and also litigations. On merits, discuss whether or not both schemes need run concurrently. Analyse the potential of the schemes to achieve developmental benefits and equitable growth.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `Many State Governments further bifurcate geographical administrative areas like Districts and Talukas for better governance. In light of the above, can it also be justified that more number of smaller States would bring in effective governance at State level? Discuss.` },
              { n: 2, q: `Discuss the recommendations of the 13th Finance Commission which have been a departure from the previous commissions for strengthening the local government finances.` },
              { n: 3, q: `The product diversification of financial institutions and insurance companies, resulting in overlapping of products and services strengthens the case for the merger of the two regulatory agencies namely SEBI and IRDA. Justify.` },
              { n: 4, q: `The legitimacy and accountability of Self Help Groups (SHGs) and their patrons, the micro-finance outfits, need systematic assessment and scrutiny for the sustained success of the concept. Discuss.` },
              { n: 5, q: `The Central Government frequently complains on the poor performance of the State Governments in eradicating suffering of the vulnerable sections of the society. Restructuring of Centrally sponsored schemes across the sectors for ameliorating the cause of vulnerable sections of population aims at providing flexibility to the States in better implementation. Critically evaluate.` },
              { n: 6, q: `Electronic cash transfer system for the welfare schemes is an ambitious project to minimize corruption, eliminate wastage and facilitate reforms. Comment.` },
              { n: 7, q: `The basis of providing urban amenities in rural areas (PURA) is rooted in establishing connectivity. Comment.` },
              { n: 8, q: `Though Citizens’ charters have been formulated by many public service delivery organizations, there is no corresponding improvement in the level of citizens’ satisfaction and quality of services being provided. Analyse.` },
              { n: 9, q: `‘A national Lokpal, however strong it may be, cannot resolve the problems of immorality in public affairs.’ Discuss.` },
            ],
          },
        ],
      },
      {
        slug: "social-justice",
        name: "Social Justice",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `Women’s social capital complements in advancing empowerment and gender equity. Explain. (Answer in 150 words)` },
              { n: 2, q: `Inequality in the ownership pattern of resources is one of the major causes of poverty. Discuss in the context of 'paradox of poverty'. (Answer in 250 words)` },
              { n: 3, q: `The National Commission for Protection of Child Rights has to address the challenges faced by children in the digital era. Examine the existing policies and suggest measures the Commission can initiate to tackle the issue. (Answer in 250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `Public charitable trusts have the potential to make India's development more inclusive as they relate to certain vital public issues. Comment.` },
              { n: 2, q: `Poverty and malnutrition create a vicious cycle, adversely affecting human capital formation. What steps can be taken to break the cycle?` },
              { n: 3, q: `In a crucial domain like the public healthcare system, the Indian State should play a vital role in containing the adverse impact of the marketisation of the system. Suggest measures through which the State can enhance the reach of public healthcare at the grassroots level.` },
              { n: 4, q: `The Doctrine of Democratic Governance makes it necessary that the public perception of the integrity and commitment of civil servants becomes absolutely positive. Discuss.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `The crucial aspect of development process has been the inadequate attention paid to Human Resource Development in India. Suggest measures that can address this inadequacy.` },
              { n: 2, q: `Discuss the contribution of civil society groups for women's effective and meaningful participation and representation in state legislatures in India.` },
              { n: 3, q: `“Development and welfare schemes for the vulnerable, by its nature, are discriminatory in approach.” Do you agree? Give reasons for your answer.` },
              { n: 4, q: `Skill development programmes have succeeded in increasing human resources supply to various sectors. In the context of the statement analyse the linkages between education, skill and employment.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Besides the welfare schemes, India needs deft management of inflation and unemployment to serve the poor and the underprivileged sections of the society. Discuss.` },
              { n: 2, q: `Do you agree with the view that increasing dependence on donor agencies for development reduces the importance of community participation in the development process? Justify your answer.` },
              { n: 3, q: `The Right of Children to Free and Compulsory Education Act, 2009 remains inadequate in promoting incentive-based system for children's education without generating awareness about the importance of schooling. Analyse.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `“Besides being a moral imperative of a Welfare State, primary health structure is a necessary precondition for sustainable development.” Analyse.` },
              { n: 2, q: `“Earn while you learn scheme needs to be strengthened to make vocational education and skill training meaningful.” Comment.` },
              { n: 3, q: `Can the vicious cycle of gender inequality, poverty and malnutrition be broken through microfinancing of women SHGs? Explain with examples.` },
              { n: 4, q: `“Though women in post-Independent India have excelled in various fields, the social attitude towards women and feminist movement has been patriarchal.” Apart from women education and women empowerment schemes, what interventions can help change this milieu?` },
              { n: 5, q: `Can Civil Society and Non-Governmental Organisations present an alternative model of public service delivery to benefit the common citizen? Discuss the challenges of this alternative model.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `In order to enhance the prospects of social development, sound and adequate health care policies are needed particularly in the fields of geriatric and maternal health care. Discuss.` },
              { n: 2, q: `“The incidence and intensity of poverty are more important in determining poverty based on income alone”. In this context analyse the latest United Nations Multidimensional Poverty Index Report.` },
              { n: 3, q: `“Micro-Finance as an anti-poverty vaccine, is aimed at asset creation and income security of the rural poor in India”. Evaluate the role of the Self Help Groups in achieving the twin objectives along with empowering women in rural India.` },
              { n: 4, q: `National Education Policy 2020 is in conformity with the Sustainable Development Goal-4 (2030). It intends to restructure and reorient education system in India. Critically examine the statement.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `Appropriate local community-level healthcare intervention is a prerequisite to achieve ‘Health for All’ in India. Explain.` },
              { n: 2, q: `How far do you agree with the view that the focus on lack of availability of food as the main cause of hunger takes the attention away from ineffective human development policies in India?` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `‘To ensure effective implementation of policies addressing water, sanitation and hygiene needs, the identification of beneficiary segments is to be synchronized with the anticipated outcomes’. Examine the statement in the context of the WASH scheme.` },
              { n: 2, q: `Does the Rights of Persons with Disabilities Act, 2016 ensure effective mechanism for empowerment and inclusion of the intended beneficiaries in the society? Discuss.` },
              { n: 3, q: `Hunger and Poverty are the biggest challenges for good governance in India still today. Evaluate how far successive governments have progressed in dealing with these humongous problems. Suggest measures for improvement.` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `Professor Amartya Sen has advocated important reforms in the realms of primary education and primary health care. What are your suggestions to improve their status and performance?` },
              { n: 2, q: `Examine the main provisions of the National Child Policy and throw light on the status of its implementation.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `The quality of higher education in India requires major improvements to make it internationally competitive. Do you think that the entry of foreign educational institutions would help improve the quality of technical and higher education in the country? Discuss.` },
              { n: 2, q: `Public health system has limitations in providing universal health coverage. Do you think that private sector could help in bridging the gap? What other viable alternatives would you suggest?` },
              { n: 3, q: `Though there have been several different estimates of poverty in India, all indicate reduction in poverty levels over time. Do you agree? Critically examine with reference to urban and rural poverty indicators.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `Do government’s schemes for up-lifting vulnerable and backward communities by protecting required social resources for them, lead to their exclusion in establishing businesses in urban economies?` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `Identify the Millennium Development Goals (MDGs) that are related to health. Discuss the success of the actions taken by the Government for achieving the same.` },
              { n: 2, q: `The concept of Mid Day Meal (MDM) scheme is almost a century old in India with early beginnings in Madras Presidency in pre-independent India. The scheme has again been given impetus in most states in the last two decades. Critically examine its twin objectives, latest mandates and success.` },
            ],
          },
        ],
      },
      {
        slug: "ir",
        name: "International Relations",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `India-Africa digital partnership is achieving mutual respect, co-development and long-term institutional partnerships. Elaborate. (Answer in 150 words)` },
              { n: 2, q: `“With the waning of globalization, post-Cold War world is becoming a site of sovereign nationalism.” Elucidate. (Answer in 150 words) 10` },
              { n: 3, q: `“Energy security constitutes the dominant kingpin of India’s foreign policy, and is linked with India’s overarching influence in Middle Eastern countries.” How would you integrate energy security with India’s foreign policy trajectories in the coming years? (Answer in 250 words)` },
              { n: 4, q: `“The reform process in the United Nations remains unresolved, because of the delicate imbalance of East and West and entanglement of the USA vs. Russo-Chinese alliance.” Examine and critically evaluate the East-West policy confrontations in this regard. (Answer in 250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `‘The West is fostering India as an alternative to reduce dependence on China's supply chain and strategically to counter China's political and economic dominance.’ Explain this statement with examples.` },
              { n: 2, q: `Critically analyse India's evolving diplomatic, economic, and strategic relations with the Central Asian Republics (CARs), highlighting their increasing significance in regional and global geopolitics.` },
              { n: 3, q: `Discuss the geopolitical and geostrategic importance of the Maldives for India with a focus on global trade and energy flows. Further, discuss how this relationship affects India's maritime security and regional stability amidst international competition.` },
              { n: 4, q: `‘Terrorism has become a significant threat to global peace and security.’ Evaluate the effectiveness of the United Nations Security Council's Counter-Terrorism Committee (CTC) and its associated bodies in addressing and mitigating this threat at the international level.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `‘Virus of Conflict is affecting the functioning of the SCO’ In the light of the above statement point out the role of India in mitigating the problems.` },
              { n: 2, q: `Indian diaspora has scaled new heights in the West. Describe its economic and political benefits for India.` },
              { n: 3, q: `‘The expansion and strengthening of NATO and a stronger US-Europe strategic partnership works well for India.’ What is your opinion about this statement ? Give reasons and examples to support your answer.` },
              { n: 4, q: `‘Sea is an important Component of the Cosmos’ Discuss in the light of the above statement the role of the IMO (International Maritime Organisation) in protecting environment and enhancing maritime safety and security.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `‘India is an age-old friend of Sri Lanka.’ Discuss India's role in the recent crisis in Sri Lanka in the light of the preceding statement.` },
              { n: 2, q: `Do you think that BIMSTEC is a parallel organisation like the SAARC? What are the similarities and dissimilarities between the two? How are Indian foreign policy objectives realized by forming this new organisation?` },
              { n: 3, q: `How will I2U2 (India, Israel, UAE and USA) grouping transform India's position in global politics?` },
              { n: 4, q: `'Clean energy is the order of the day.' Describe briefly India's changing policy towards climate change in various international fora in the context of geopolitics.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `“If the last few decades were of Asia’s growth story, the next few are expected to be of Africa’s.”In the light of this statement, examine India’s influence in Africa in recent years.` },
              { n: 2, q: `“The USA is facing an existential threat in the form of China, that is much more challenging than the erstwhile Soviet Union.” Explain.` },
              { n: 3, q: `Critically examine the aims and objectives of SCO. What importance does it hold for India?` },
              { n: 4, q: `The new tri-nation partnership AUKUS is aimed at countering China’s ambitions in the Indo-Pacific region. Is it going to supersede the existing partnerships in the region? Discuss the strength and impact of AUKUS in the present scenario.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `Critically examine the role of WHO in providing global health security during the Covid-19 pandemic.` },
              { n: 2, q: `‘Indian diaspora has a decisive role to play in the politics and economy of America and European Countries’. Comment with examples.` },
              { n: 3, q: `Quadrilateral Security Dialogue (Quad) is transforming itself into a trade bloc from a military alliance, in present times Discuss.` },
              { n: 4, q: `What is the significance of Indo-US defence deals over Indo-Russian defence deals? Discuss with reference to stability in the Indo-Pacific region.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `“India’s relations with Israel have, of late, acquired a depth and diversity, which cannot be rolled back.” Discuss.` },
              { n: 2, q: `A number of outside powers have entrenched themselves in Central Asia, which is a zone of interest to India. Discuss the implications, in this context, of India’s joining the Ashgabat Agreement, 2018.` },
              { n: 3, q: `What are the key areas of reform if the WTO has to survive in the present context of ‘Trade War’, especially keeping in mind the interest of India?` },
              { n: 4, q: `In what ways would the ongoing U.S-Iran Nuclear Pact Controversy affect the national interest of India? How should India respond to this situation?` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `‘China is using its economic relations and positive trade surplus as tools to develop potential military power status in Asia’. In the light of this statement, discuss its impact on India as her neighbour.` },
              { n: 2, q: `What are the main functions of the United Nations Economic and Social Council (ECOSOC)? Explain different functional commissions attached to it.` },
              { n: 3, q: `The question of India’s Energy Security Constitutes the most important part of India’s economic progress. Analyse India’s energy policy cooperation with West Asian countries.` },
              { n: 4, q: `Indian Diaspora has an important role to play in South East Asian countries economy and society. Appraise the role of Indian Diaspora in South-East Asia in this context.` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `“The broader aims and objectives of WTO are to manage and promote international trade in the era of globalization. But the Doha round of negotiations seem doomed due to differences between the developed and the developing countries.” Discuss in the Indian perspective.` },
              { n: 2, q: `Evaluate the economic and strategic dimensions of India’s Look East Policy in the context of the post Cold War international scenario.` },
              { n: 3, q: `"Increasing crossborder terrorist attacks in India and growing interference in the internal affairs of several memberstates by Pakistan are not conducive for the future of SAARC (South Asian Association for Regional Cooperation)." Explain with suitable examples.` },
              { n: 4, q: `What are the aims and objectives of the McBride Commission of the UNESCO? What is India’s position on these?` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `Increasing interest of India in Africa has its pro and cons. Critically examine.` },
              { n: 2, q: `Discuss the impediments India is facing in its pursuit of a permanent seat in UN Security Council.` },
              { n: 3, q: `Project ‘Mausam’ is considered a unique foreign policy initiative of Indian Government to improve relationship with its neighbours. Does the project have a strategic dimension? Discuss.` },
              { n: 4, q: `Terrorist activities and mutual distrust have clouded India – Pakistan relations. To what extent the use of soft power like sports and cultural exchanges could help generate goodwill between the two countries? Discuss with suitable examples.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `With respect to the South China sea, maritime territorial disputes and rising tension affirm the need for safeguarding maritime security to ensure freedom of navigation and over flight throughout the region. In this context, discuss the bilateral issues between India and China.` },
              { n: 2, q: `The aim of Information Technology Agreements (ITAs) is to lower all taxes and tariffs on information technology products by signatories to zero. What impact would such agreements have on India’s interests?` },
              { n: 3, q: `Some of the International funding agencies have special terms for economic participation stipulating a substantial component of the aid to be used for sourcing equipment from the leading countries. Discuss on merits of such terms and if, there exists a strong case not to accept such conditions in the Indian context.` },
              { n: 4, q: `India has recently signed to become founding member of New Development Bank (NDB) and also the Asian Infrastructure Investment Bank (AIIB). How will the role of the two Banks be different? Discuss the strategic significance of these two Banks for India.` },
              { n: 5, q: `WTO is an important international institution where decisions taken affect countries in a profound manner. What is the mandate of WTO and how binding are their decisions? Critically analyse India’s stand on the latest round of talks on Food security.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `The proposed withdrawal of International Security Assistance Force (ISAF) from Afghanistan in 2014 is fraught with major security implications for the countries of the region. Examine in light of the fact that India is faced with a plethora of challenges and needs to safeguard its own strategic interests.` },
              { n: 2, q: `What do you understand by ‘The String of Pearls’? How does it impact India? Briefly outline the steps taken by India to counter this.` },
              { n: 3, q: `Economic ties between India and Japan while growing in the recent years are still far below their potential. Elucidate the policy constraints which are inhibiting this growth.` },
              { n: 4, q: `The protests in Shahbag Square in Dhaka in Bangladesh reveal a fundamental split in society between the nationalists and Islamic forces. What is its significance for India?` },
              { n: 5, q: `Discuss the political developments in Maldives in the last two years. Should they be of any cause of concern to India?` },
              { n: 6, q: `In respect of India-Sri Lanka relations, discuss how domestic factors influence foreign policy.` },
              { n: 7, q: `What is meant by Gujral doctrine? Does it have any relevance today? Discuss.` },
              { n: 8, q: `The World Bank and the IMF, collectively known as the Bretton Woods Institutions, are the two inter-governmental pillars supporting the structure of the world’s economic and financial order. Superficially, the World Bank and the IMF exhibit many common characteristics, yet their role, functions and mandate are distinctly different. Elucidate.` },
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
    description: "Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management",
    subjects: [
      {
        slug: "economy",
        name: "Indian Economy",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `Distinguish between the Human Development Index (HDI) and the Inequality-adjusted Human Development Index (IHDI) with special reference to India. Why is the IHDI considered a better indicator of inclusive growth? (Answer in 150 words)` },
              { n: 2, q: `What are the challenges before the Indian economy when the world is moving away from free trade and multilateralism to protectionism and bilateralism? How can these challenges be met? (Answer in 150 words)` },
              { n: 3, q: `Explain how the Fiscal Health Index (FHI) can be used as a tool for assessing the fiscal performance of states in India. In what way would it encourage the states to adopt prudent and sustainable fiscal policies? (Answer in 250 words)` },
              { n: 4, q: `Discuss the rationale of the Production Linked Incentive (PLI) scheme. What are its achievements? In what way can the functioning and outcomes of the scheme be improved? (250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `Examine the pattern and trend of public expenditure on social services in the post-reforms period in India. To what extent this has been in consonance with achieving the objective of inclusive growth?` },
              { n: 2, q: `What are the causes of persistent high food inflation in India? Comment on the effectiveness of the monetary policy of the RBI to control this type of inflation.` },
              { n: 3, q: `Discuss the merits and demerits of the four ‘Labour Codes’ in the context of labour market reforms in India. What has been the progress so far in this regard?` },
              { n: 4, q: `What is the need for expanding the regional air connectivity in India? In this context, discuss the government’s UDAN Scheme and its achievements.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `Faster economic growth requires increased share of the manufacturing sector in GDP, particularly of MSMEs. Comment on the present policies of the Government in this regard` },
              { n: 2, q: `What is the status of digitalization in the Indian economy? Examine the problems faced in this regard and suggest improvements.` },
              { n: 3, q: `How does e-Technology help farmers in production and marketing of agricultural produce? Explain it.` },
              { n: 4, q: `State the objectives and measures of land reforms in India. Discuss how land ceiling policy on landholding can be considered as an effective reform under economic criteria.` },
              { n: 5, q: `Most of the unemployment in India is structural in nature. Examine the methodology adopted to compute unemployment in the country and suggest improvements` },
              { n: 6, q: `Distinguish between 'care economy' and 'monetized economy'. How can care economy be brought into monetized economy through women empowerment?` },
              { n: 7, q: `Explain the changes in cropping pattern in India in the context of changes in consumption pattern and marketing conditions.` },
              { n: 8, q: `What are the direct and indirect subsidies provided to farm sector in India? Discuss the issues raised by the World Trade Organization (WTO) in relation to agricultural subsidies.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Why is Public Private Partnership (PPP) required in infrastructural projects? Examine the role of PPP model in the redevelopment of Railway Stations in India.` },
              { n: 2, q: `Is inclusive growth possible under market economy? State the significance of financial inclusion in achieving economic growth in India.` },
              { n: 3, q: `What are the major challenges of Public Distribution System (PDS) in India? How can it be made effective and transparent?` },
              { n: 4, q: `Elaborate the scope and significance of the food processing industry in India.` },
              { n: 5, q: `The increase in life expectancy in the country has led to newer health challenges in the community. What are those challenges and what steps need to be taken to meet them?` },
              { n: 6, q: `''Economic growth in the recent past has been led by increase in labour productivity.'' Explain this statement. Suggest the growth pattern that will lead to creation of more jobs without compromising labour productivity.` },
              { n: 7, q: `Do you think India will meet 50 percent of its energy needs from renewable energy by 2030? Justify your answer. How will the shift of subsidies from fossil fuels to renewables help achieve the above objective? Explain.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `Explain the difference between computing methodology of India’s Gross Domestic Product (GDP) before the year 2015 and after the year 2015.` },
              { n: 2, q: `Distinguish between Capital Budget and Revenue Budget. Explain the components of both these Budgets.` },
              { n: 3, q: `How did land reforms in some parts of the country help to improve the socio-economic conditions of marginal and small farmers?` },
              { n: 4, q: `Do you agree that the Indian economy has recently experienced V-shaped recovery? Give reasons in support of your answer.` },
              { n: 5, q: `“Investment in infrastructure is essential for more rapid and inclusive economic growth.” Discuss in the light of India’s experience.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `Explain intra-generational and inter-generational issues of equity from the perspective of inclusive growth and sustainable development.` },
              { n: 2, q: `Define potential GDP and explain its determinants. What are the factors that have been inhibiting India from realizing its potential GDP?` },
              { n: 3, q: `Explain the meaning of investment in an economy in terms of capital formation. Discuss the factors to be considered while designing a concession agreement between a public entity and private entity.` },
              { n: 4, q: `Explain the rationale behind the Goods and Services Tax (Compensation to States) Act of 2017. How has COVID-19 impacted the GST compensation fund and created new federal tensions?` },
              { n: 5, q: `Describe the benefits of deriving electric energy from sunlight in contrast to the conventional energy generation. What are the initiatives offered by our government for this purpose?` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `“Access to affordable, reliable, sustainable and modern energy is the sine qua non to achieve Sustainable Development Goals (SDGs).” Comment on the progress made in India in this regard.` },
              { n: 2, q: `Comment on the important changes introduced in respect of the Long Term Capital Gains Tax (LTCGT) and Dividend Distribution Tax (DDT) in the Union Budget for 2018-2019.` },
              { n: 3, q: `How are principles followed by the NITI Aayog different from those followed by erstwhile Planning Commission in India?` },
              { n: 4, q: `How would the recent phenomena of protectionism and currency manipulations in world trade affect macroeconomic stability of India?` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `Among several factors for India’s potential growth, savings rate is the most effective one. Do you agree? What are the other factors available for growth potential?` },
              { n: 2, q: `Account for the failure of manufacturing sector in achieving the goal of labour-intensive exports. Suggest measures for more labour-intensive rather than capital-intensive exports.` },
              { n: 3, q: `Examine the development of Airports in India through joint ventures under Public – Private Partnership (PPP) model. What are the challenges faced by the authorities in this regard.` },
              { n: 4, q: `What are the reasons for poor acceptance of cost-effective small processing unit? How the food processing unit will be helpful to uplift the socio-economic status of poor farmers?` },
              { n: 5, q: `One of the intended objectives of Union-Budget 2017-18 is to ‘transform, energize and clean India’. Analyze the measures proposed in the Budget 2017-18 to achieve the objective.` },
              { n: 6, q: `“Industrial growth rate has lagged behind in the overall growth of Gross-Domestic-Product (GDP) in the post-reform period” Give reasons. How far the recent changes in Industrial Policy are capable of increasing the industrial growth rate?` },
              { n: 7, q: `What are the salient features of ‘inclusive growth’? Has India been experiencing such a growth process? Analyse and suggest measures for inclusive growth.` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `How globalization has led to the reduction of employment in the formal sector of the Indian economy? Is increased informalization detrimental to the development of the country?` },
              { n: 2, q: `Women empowerment in India needs gender budgeting. What are the requirements and status of gender budgeting in the Indian context?` },
              { n: 3, q: `Pradhan Mantri Jan Dhan Yojana (PMJDY) is necessary for bringing unbanked to the institutional finance fold. Do you agree with this for financial inclusion of the poor section of the Indian society? Give arguments to justify your opinion.` },
              { n: 4, q: `What are ‘Smart Cities’? Examine their relevance for urban development in India. Will it increase rural-urban differences? Give arguments for ’Smart Villages’ in the light of PURA and RURBAN Mission.` },
              { n: 5, q: `Justify the need for FDI for the development of the Indian economy. Why there is gap between MoUs signed and actual FDIs? Suggest remedial steps to be taken for increasing actual FDIs in India.` },
              { n: 6, q: `Comment on the challenges for inclusive growth which include careless and useless manpower in the Indian context. Suggest measures to be taken for facing these challenges.` },
              { n: 7, q: `Give an account of the current status and the targets to be achieved pertaining to renewable energy sources in the country. Discuss in brief the importance of National Programme on Light Emitting Diodes (LEDs).` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `The nature of economic growth in India in recent times is often described as jobless growth. Do you agree with this view? Give arguments in favour of your answer.` },
              { n: 2, q: `How can the ‘Digital India’ programme help farmers to improve farm productivity and income? What steps has the Government taken in this regard?` },
              { n: 3, q: `In what way could replacement of price subsidy with Direct Benefit Transfer (DBT) change the scenario of subsidies in India? Discuss.` },
              { n: 4, q: `What are the impediments in marketing and supply chain management in developing the food processing industry in India? Can e-commerce help in overcoming these bottlenecks?` },
              { n: 5, q: `Craze for gold in Indians has led to a surge in import of gold in recent years and put pressure on balance of payments and external value of rupee. In view of this, examine the merits of Gold Monetization Scheme.` },
              { n: 6, q: `“Success of ‘Make in India’ programme depends on the success of ‘Skill India’ programme and radical labour reforms.” Discuss with logical arguments.` },
              { n: 7, q: `To what factors can the recent dramatic fall in equipment costs and tariff of solar energy be attributed? What implications does the trend have for the thermal power producers and the related industry?` },
              { n: 8, q: `There is a clear acknowledgement that Special Economic Zones (SEZs) are a tool of industrial development, manufacturing and exports. Recognising this potential, the whole instrumentality of SEZs require augmentation. Discuss the issues plaguing the success of SEZs with respect to taxation, governing laws and administration.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `Normally countries shift from agriculture to industry and then later to services, but India shifted directly from agriculture to services. What are the reasons for the huge growth of services vis-à-vis industry in the country? Can India become a developed country without a strong industrial base?` },
              { n: 2, q: `“While we flaunt India’s demographic dividend, we ignore the dropping rates of employability.” What are we missing while doing so? Where will the jobs that India desperately needs come from? Explain.` },
              { n: 3, q: `The Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 has come into effect from 1st January, 2014. What are the key issues which would get addressed with the Act in place? What implications would it have on industrialization and agriculture in India?` },
              { n: 4, q: `Capitalism has guided the world economy to unprecedented prosperity. However, it often encourages short-sightedness and contributes to wide disparities between the rich and the poor. In this light, would it be correct to believe and adopt capitalism for bringing inclusive growth in India? Discuss.` },
              { n: 5, q: `Explain how Private Public Partnership arrangements, in long gestation infrastructure projects, can transfer unsustainable liabilities to the future. What arrangements need to be put in place to ensure that successive generations’ capacities are not compromised?` },
              { n: 6, q: `National Urban Transport Policy emphasises on ‘moving people’ instead of ‘moving vehicles’. Discuss critically the success of the various strategies of the Government in this regard.` },
              { n: 7, q: `Foreign Direct Investment (FDI) in the defence sector is now set to be liberalized. What influence this is expected to have on Indian defence and economy in the short and long run?` },
              { n: 8, q: `Should the pursuit of carbon credits and clean development mechanisms set up under UNFCCC-be maintained even though there has been a massive slide in the value of a carbon credit? Discuss with respect to India’s energy needs for economic growth.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `With a consideration towards the strategy of inclusive growth, the new Companies Bill, 2013 has indirectly made CSR a mandatory obligation. Discuss the challenges expected in its implementation in right earnest. Also discuss other provisions in the Bill and their implications.` },
              { n: 2, q: `What were the reasons for the introduction of Fiscal Responsibility and Budget Management (FRBM) Act, 2003? Discuss critically its salient features and their effectiveness.` },
              { n: 3, q: `What is the meaning of the term ‘tax expenditure’? Taking housing sector as an example, discuss how it influences the budgetary policies of the government.` },
              { n: 4, q: `Food Security Bill is expected to eliminate hunger and malnutrition in India. Critically discuss various apprehensions in its effective implementation along with the concerns it has generated in WTO.` },
              { n: 5, q: `Examine the impact of liberalization on companies owned by Indians. Are they competing with the MNCs satisfactorily? Discuss.` },
              { n: 6, q: `(a) Discuss the impact of FDI entry into Multi-trade retail sector on supply chain management in commodity trade pattern of the economy.` },
              { n: 7, q: `Discuss the rationale for introducing Goods and Services Tax (GST) in India. Bring out critically the reasons for the delay in roll out for its regime.` },
              { n: 8, q: `Write a note on India’s green energy corridor to alleviate the problem of conventional energy.` },
              { n: 9, q: `Adoption of PPP model for infrastructure development of the country has not been free of criticism. Critically discuss pros and cons of the model.` },
            ],
          },
        ],
      },
      {
        slug: "agriculture",
        name: "Agriculture",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `Explain the factors influencing the decision of the farmers on the selection of high value crops in India. (Answer in 150 words)` },
              { n: 2, q: `Elaborate the scope and significance of supply chain management of agricultural commodities in India. (Answer in 150 words)` },
              { n: 3, q: `Examine the scope of the food processing industries in India. Elaborate the measures taken by the government in the food processing industries for generating employment opportunities. (Answer in 250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `Explain the role of millets for ensuring health and nutritional security in India.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `What are the main bottlenecks in upstream and downstream process of marketing of agricultural products in India?` },
              { n: 2, q: `What is Integrated Farming System? How is it helpful to small and marginal farmers in India?` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `How and to what extent would micro-irrigation help in solving India’s water crisis?` },
              { n: 2, q: `What are the salient features of the National Food Security Act, 2013? How has the Food Security Bill helped in eliminating hunger and malnutrition in India?` },
              { n: 3, q: `What are the present challenges before crop diversification? How do emerging technologies provide an opportunity for crop diversification?` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `What are the main constraints in transport and marketing of agricultural produce in India?` },
              { n: 2, q: `What are the challenges and opportunities of the food processing sector in the country? How can the income of the farmers be substantially increased by encouraging food processing?` },
              { n: 3, q: `What are the major factors responsible for making the rice-wheat system a success? In spite of this success how has this system become bane in India?` },
              { n: 4, q: `Suggest measures to improve water storage and irrigation system to make its judicious use under depleting scenario.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `What do you mean by Minimum Support Price (MSP)? How will MSP rescue the farmers from the low income trap?` },
              { n: 2, q: `Examine the role of supermarkets in supply chain management of fruits, vegetables, and food items. How do they eliminate number of intermediaries?` },
              { n: 3, q: `Assess the role of National Horticulture Mission (NHM) in boosting the production, productivity and income of horticulture farms. How far has it succeeded in increasing the income of farmers?` },
              { n: 4, q: `How has the emphasis on certain crops brought about changes in cropping patterns in recent past? Elaborate the emphasis on millets production and consumption.` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `Explain various types of revolutions, took place in Agriculture after Independence in India. How these revolutions have helped in poverty alleviation and food security in India?` },
              { n: 2, q: `What are the major reasons for declining rice and wheat yield in the cropping system? How crop diversification is helpful to stabilise the yield of the crops in the system?` },
              { n: 3, q: `How do subsidies affect the cropping pattern, crop diversity and economy of farmers? What is the significance of crop insurance, minimum support price and food processing for small and marginal farmers?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `What is water-use efficiency? Describe the role of micro-irrigation in increasing the water-use efficiency.` },
              { n: 2, q: `What is allelopathy? Discuss its role in major cropping systems of irrigated agriculture.` },
              { n: 3, q: `Discuss the role of land reforms in agricultural development Identify the factors that were responsible for the success of land reforms in India.` },
              { n: 4, q: `Given the vulnerability of Indian agriculture to vagaries of nature, discuss the need for crop insurance and bring out the salient features of the Pradhan Mantri Fasal Bima Yojana (PMFBY).` },
              { n: 5, q: `Livestock rearing has a big potential for providing non-farm employment and income in rural areas. Discuss suggesting suitable measures to promote this sector in India.` },
              { n: 6, q: `In view of the declining average size of land holdings in India which has made agriculture non–viable for a majority of farmers, should contract farming and land leasing be promoted in agriculture? Critically evaluate the pros and cons.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `There is also a point of view that Agricultural Produce Market Committees (APMCs) set up under the State Acts have not only impeded the development of agriculture but also have been the cause of food inflation in India. Critically examine.` },
              { n: 2, q: `“In the villages itself no form of credit organization will be suitable except the cooperative society.” — All India Rural Credit Survey. Discuss this statement in the background of agricultural finance in India. What constraints and challenges do financial institutions supplying agricultural finance face? How can technology be used to better reach and serve rural clients?` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `What are the different types of agriculture subsidies given to farmers at the national and at state levels? Critically analyse the agricultural subsidy regime with reference to the distortions created by it.` },
              { n: 2, q: `India needs to strengthen measures to promote the pink revolution in food industry for ensuring better nutrition and health. Critically elucidate the statement.` },
              { n: 3, q: `Establish relationship between land reforms, agriculture productivity and elimination of poverty in the Indian economy. Discuss the difficulties in designing and implementation of agriculture friendly land reforms in India.` },
            ],
          },
        ],
      },
      {
        slug: "science-tech",
        name: "Science & Technology",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `The fusion energy programme in India has steadily evolved over the past few decades. Mention India's contributions to the international fusion energy project International Thermonuclear Experimental Reactor (ITER). What will be the implications of the success of this project for the future of global energy? (Answer in 150 words)` },
              { n: 2, q: `How can India achieve energy independence through clean technology by 2047? How can biotechnology can play a crucial role in this endeavour? (Answer in 150 words)` },
              { n: 3, q: `How does nanotechnology offer significant advancements in the field of agriculture? How can this technology help to uplift the socio-economic status of farmers? (Answer in 250 words)` },
              { n: 4, q: `India aims to become a semiconductor manufacturing hub. What are the challenges faced by the semiconductor industry in India? Mention the salient features of the India Semiconductor Mission. (250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `What is the technology being employed for electronic toll collection on highways. What are its advantages and limitations? What are the proposed changes that will make this process seamless? Would this transition carry any potential hazard?` },
              { n: 2, q: `Describe the context and salient features of the Digital Personal Data Protection Act, 2023.` },
              { n: 3, q: `What are asteroids? How real is the threat of them causing extinction of life? What strategies have been development to prevent such a catastrophe?` },
              { n: 4, q: `Social media and encrypting messaging services pose a serious security challenge. What measures have been adopted at various levels to address the security implications of social media? Also suggest any other remedies to address the problem.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `Introduce the concept of Artificial Intelligence (AI). How does AI help clinical diagnosis? Do you perceive any threat to privacy of the individual in the use of AI in healthcare?` },
              { n: 2, q: `Discuss several ways in which microorganisms can help in meeting the current fuel shortage.` },
              { n: 3, q: `What is the main task of India's third moon mission which could not be achieved in its earlier mission? List the countries that have achieved this task. Introduce the subsystems in the spacecraft launched and explain the role of the Virtual Launch Control Centre' at the Vikram Sarabhai Space Centre which contributed to the successful launch from Sriharikota.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Launched on 25th December, 2021, James Webb Space Telescope has been much in the news since then. What are its unique features which make it superior to its predecessor Space Telescopes? What are the key goals of this mission? What potential benefits does it hold for the human race?` },
              { n: 2, q: `What is the basic principle behind vaccine development? How do vaccines work? What approaches were adopted by the Indian vaccine manufacturers to produce COVID-19 vaccines?` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `How is S-400 air defence system technically superior to any other system presently available in the world?` },
              { n: 2, q: `What are the research and developmental achievements in applied biotechnology? How will these achievements help to uplift the poorer sections of the society?` },
              { n: 3, q: `The Nobel Prize in Physics of 2014 was jointly awarded to Akasaki, Amano and Nakamura for the invention of Blue LEDs in 1990s. How has this invention impacted the everyday life of human beings?` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `What do you understand by nanotechnology and how is it helping in health sector?` },
              { n: 2, q: `How is science interwoven deeply with our lives? What are the striking changes in agriculture triggered off by science-based technologies?` },
              { n: 3, q: `COVID-19 pandemic has caused unprecedented devastation worldwide. However, technological advancements are being availed readily to win over the crisis. Give an account of how technology was sought to aid management of the pandemic.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `Discuss the work of ‘Bose-Einstein Statistics’ done by Prof. Satyendra Nath Bose and show how it revolutionized the field of Physics.` },
              { n: 2, q: `Why is there so much activity in the field of biotechnology in our country? How has this activity benefitted the field of biopharma?` },
              { n: 3, q: `With growing energy needs should India keep on expanding its nuclear energy programme? Discuss the facts and fears associated with nuclear energy?` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `Stem cell therapy is gaining popularity in India to treat a wide variety of medical conditions including Leukaemia, Thalassemia, damaged cornea and several burns. Describe briefly what stem cell therapy is and what advantages it has over other treatments?` },
              { n: 2, q: `India has achieved remarkable successes in unmanned space missions including the Chandrayaan and Mars Orbiter Mission, but has not ventured into manned space mission. What are the main obstacles to launching a manned space mission, both in terms of technology and logistics? Examine critically.` },
              { n: 3, q: `Give an account of the growth and development of nuclear science and technology in India. What is the advantage of fast breeder reactor programme in India?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `Discuss India’s achievements in the field of Space Science and Technology. How the application of this technology has helped India in its socio-economic development?` },
              { n: 2, q: `Why is nanotechnology one of the key technologies of the 21st century? Describe the salient features of Indian Government’s Mission on Nanoscience and Technology and the scope of its application in the development process of the country.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `What do you understand by ‘Standard Positioning System’ and ‘Precision Positioning System’ in the GPS era? Discuss the advantages India perceives from its ambitious IRNSS programme employing just seven satellites.` },
              { n: 2, q: `What are the areas of prohibitive labour that can be sustainably managed by robots? Discuss the initiatives that can propel research in premier research institutes for substantive and gainful innovation.` },
              { n: 3, q: `India’s Traditional Knowledge Digital Library (TKDL), which has a database containing formatted information on more than 2 million medicinal formulations is proving a powerful weapon in country’s fight against erroneous patents. Discuss the pros and cons of making this database publicly available under open-source licensing.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `Scientific research in Indian universities is declining, because a career in science is not as attractive as are business professions, engineering or administration, and the universities are becoming consumer-oriented. Critically comment.` },
              { n: 2, q: `Can overuse and free availability of antibiotics without Doctor’s prescription, be contributors to the emergence of drug-resistant diseases in India? What are the available mechanisms for monitoring and control? Critically discuss the various issues involved.` },
              { n: 3, q: `In a globalized world, Intellectual Property Rights assume significance and are a source of litigation. Broadly distinguish between the terms—Copyrights, Patents and Trade Secrets.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `Bringing out the circumstances in 2005 which forced amendment to the section 3(d) in Indian Patent Law, 1970, discuss how it has been utilized by the Supreme Court in its judgement in rejecting Novratis’ patent application for ‘Glivec’. Discuss briefly the pros and cons of the decision.` },
              { n: 2, q: `What do you understand by Fixed Dose Drug Combinations (FDCs)? Discuss their merits and demerits.` },
              { n: 3, q: `What do you understand by Umpire Decision Review System in Cricket? Discuss its various components. Explain how silicone tape on the edge of a bat may fool the system?` },
              { n: 4, q: `(a) What is a digital signature ? What does its authentication mean? Give various salient built-in features of a digital signature. (b) How does the 3D printing technology work? List out the advantages and disadvantages of the technology.` },
              { n: 5, q: `(a) What is an FRP composite material ? How are they manufactured? Discuss their applications in aviation and automobile industries. (b) What do you understand by Run-of-river hydroelectricity project? How is it different from any other hydroelectricity project?` },
            ],
          },
        ],
      },
      {
        slug: "environment",
        name: "Environment & Biodiversity",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `What is Carbon Capture, Utilization and Storage (CCUS)? What is the potential role of CCUS in tackling climate change? (150 words)` },
              { n: 2, q: `Seawater intrusion in the coastal aquifers is a major concern in India. What are the causes of seawater intrusion and the remedial measures to combat this hazard? (150 words)` },
              { n: 3, q: `Examine the factors responsible for depleting groundwater in India. What are the steps taken by the government to mitigate such depletion of groundwater? (Answer in 250 words)` },
              { n: 4, q: `Mineral resources are fundamental to the country's economy and these are exploited by mining. Why is mining considered an environmental hazard? Explain the remedial measures required to reduce the environmental hazard due to mining. (Answer in 250 words)` },
              { n: 5, q: `Write a review on India's climate commitments under the Paris Agreement (2015) and mention how these have been further strengthened in COP26 (2021). In this direction, how has the first Nationally Determined Contribution intended by India been updated in 2022? (Answer in 250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `Industrial pollution of river water is a significant environmental issue in India. Discuss the various mitigation measures to deal with this problem and also the government's initiatives in this regard.` },
              { n: 2, q: `What role do environmental NGOs and activists play in influencing Environmental Impact Assessment (EIA) outcomes for major projects in India? Cite four examples with all important details.` },
              { n: 3, q: `The world is facing an acute shortage of clean and safe freshwater. What are the alternative technologies which can solve this crisis? Briefly discuss any three such technologies citing their key merits and demerits.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `What is oil pollution? What are its impacts on the marine ecosystem? In what way is oil pollution particularly harmful for a country like India?` },
              { n: 2, q: `The adoption of electric vehicles is rapidly growing worldwide. How do electric vehicles contribute to reducing carbon emissions and what are the key benefits they offer compared to traditional combustion engine vehicles?` },
              { n: 3, q: `Comment on the National Wetland Conservation Programme initiated by the Government of India and name a few India's wetlands of international importance included in the Ramsar Sites.` },
              { n: 4, q: `The Intergovernmental Panel on Climate Change (IPCC) has predicted a global sea level rise of about one metre by AD 2100. What would be its impact in India and the other countries in the Indian Ocean region?` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Each year a large amount of plant material, cellulose, is deposited on the surface of Planet Earth. What are the natural processes this cellulose undergoes before yielding carbon dioxide, water and other end products?` },
              { n: 2, q: `Discuss in detail the photochemical smog emphasizing its formation, effects and mitigation. Explain the 1999 Gothenburg protocol.` },
              { n: 3, q: `Discuss global warming and mention its effects on the global climate. Explain the control measures to bring down the level of greenhouse gases which cause global warming, in the light of the Kyoto Protocol, 1997.` },
              { n: 4, q: `Explain the causes and effects of coastal erosion in India. What are the available coastal management techniques for combating the hazard?` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `Explain the purpose of the Green Grid Initiative launched at World Leaders Summit of the COP26 UN Climate Change Conference in Glasgow in November, 2021. When was this idea first floated in the International Solar Alliance (ISA)?` },
              { n: 2, q: `Describe the key points of the revised Global Air Quality Guidelines (AQGs) recently released by the World Health Organisation (WHO). How are these different from its last update in 2005? What changes in India’s National Clean Air Programme are required to achieve revised standards?` },
              { n: 3, q: `Describe the major outcomes of the 26th session of the Conference of the Parties (COP) to the United Nations Framework Convention on Climate Change (UNFCCC). What are the commitments made by India in this conference?` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `How does the draft Environment Impact Assessment (EIA) Notification, 2020 differ from the existing EIA Notification, 2006?` },
              { n: 2, q: `What are the salient features of the Jal Shakti Abhiyan launched by the Government of India for water conservation and water security?` },
              { n: 3, q: `What are the key features of the National Clean Air Programme (NCAP) initiated by the government of India?` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `What are the impediments disposing the huge quantities of discarded solid waste which are continuously being generated? How do we remove safely the toxic wastes that have been accumulated in our habitable environment?` },
              { n: 2, q: `What is wetland? Explain the Ramsar concept of ‘wise use’ in the context of wetland conservation. Cite two examples of Ramsar sites from India.` },
              { n: 3, q: `Sikkim is the first ‘Organic State’ in India. What are the ecological and economical benefits of Organic State?` },
              { n: 4, q: `How does biodiversity vary in India? How is the Biological Diversity Act, 2002 helpful in conservation of flora and fauna?` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `Not many years ago, river linking was a concept but it is becoming reality in the country. Discuss the advantages of river linking and its possible impact on the environment.` },
              { n: 2, q: `‘Climate change’ is a global problem. How India will be affected by climate change? How Himalayan and coastal states of India will be affected by climate change?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `Rehabilitation of human settlements is one of the important environmental impacts which always attracts controversy while planning major projects. Discuss the measures suggested for mitigation of this impact while proposing major developmental projects.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `Discuss the Namami Gange and National Mission for Clean Ganga (NMCG) programmes and causes of mixed results from the previous schemes. What quantum leaps can help preserve the river Ganga better than incremental inputs?` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `Environmental Impact Assessment studies are increasingly undertaken before a project is cleared by the Government. Discuss the environmental impacts of coal-fired thermal plants located at coal pitheads.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `What are the consequences of Illegal mining? Discuss the Ministry of Environment and Forests’ concept of GO AND NO GO zones for coal mining sector.` },
              { n: 2, q: `Enumerate the National Water Policy of India. Taking river Ganges as an example, discuss the strategies which may be adopted for river water pollution control and management. What are the legal provisions of management and handling of hazardous wastes in India?` },
            ],
          },
        ],
      },
      {
        slug: "security",
        name: "Internal Security",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `Terrorism is a global scourge. How has it manifested in India? Elaborate with contemporary examples. What are the counter measures adopted by the State? Explain. (150 words)` },
              { n: 2, q: `The Government of India recently stated that Left Wing Extremism (LWE) will be eliminated by 2026. What do you understand by LWE and how are the people affected by it? What measures have been taken by the government to eliminate LWE? (Answer in 150 words)` },
              { n: 3, q: `What are the major challenges to internal security and peace process in the North-Eastern States? Map the various peace accords and agreements initiated by the government in the past decade. (Answer in 250 words)` },
              { n: 4, q: `Why is maritime security vital to protect India's sea trade? Discuss maritime and coastal security challenges and the way forward. (250 words)` },
            ],
          },
          {
            year: 2024,
            questions: [
              { n: 1, q: `Explain how narco-terrorism has emerged as a serious threat across the country. Suggest suitable measures to counter narco-terrorism.` },
              { n: 2, q: `India has a long and troubled border with China and Pakistan fraught with contentious issues. Examine the conflicting issues and security challenges along the border. Also give out the development Programme (BADP) and Border Infrastructure and Management (BM) Scheme.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `Winning of 'Hearts and Minds' in terrorism-affected areas is an essential step in restoring the trust of the population. Discuss the measures adopted by the Government in this respect as part of the conflict resolution in Jammu and Kashmir.` },
              { n: 2, q: `The use of unmanned aerial vehicles (UAVs) by our adversaries across the borders to ferry arms/ammunitions, drugs, etc., is a serious threat to the internal security. Comment on the measures being taken to tackle this threat.` },
              { n: 3, q: `What are the internal security challenges being faced by India? Give out the role of Central Intelligence and Investigative Agencies tasked to counter such threats.` },
              { n: 4, q: `Give out the major sources of terror funding in India and the efforts being made to curtail these sources. In the light of this, also discuss the aim and objective of the No Money for Terror (NMFT)' Conference recently held at New Delhi in November 2022.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Discuss the types of organised crimes. Describe the linkages between terrorists and organised crime that exist at the national and transnational levels.` },
              { n: 2, q: `What are the maritime security challenges in India? Discuss the organisational, technical and procedural initiatives taken to improve the maritime security.` },
              { n: 3, q: `What are the different elements of cyber security? Keeping in view the challenges in cyber security, examine the extent to which India has successfully developed a comprehensive National Cyber Security Strategy.` },
              { n: 4, q: `Naxalism is a social, economic and developmental issue manifesting as a violent internal security threat. In this context, discuss the emerging issues and suggest a multilayered strategy to tackle the menace of Naxalism.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `Discuss how emerging technologies and globalisation contribute to money laundering. Elaborate measures to tackle the problem of money laundering both at national and international levels.` },
              { n: 2, q: `Keeping in view of India’s internal security, analyse the impact of cross-border cyber-attacks. Also, discuss defensive measures against these sophisticated attacks.` },
              { n: 3, q: `Analyse the multidimensional challenges posed by external state and non-state actors, to the internal security of India. Also discuss measures required to be taken to combat these threats.` },
              { n: 4, q: `Analyse the complexity and intensity of terrorism, its causes, linkages and obnoxious nexus. Also suggest measures required to be taken to eradicate the menace of terrorism.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `Discuss different types of cyber crimes and measures required to be taken to fight the menace.` },
              { n: 2, q: `For effective border area management, discuss the steps required to be taken to deny local support to militants and also suggest ways to manage favourable perception among locals.` },
              { n: 3, q: `What are the determinants of left-wing extremism in Eastern part of India? What strategy should the Government of India, civil administration and security forces adopt to counter the threat in the affected areas?` },
              { n: 4, q: `Analyze internal security threats and transborder crimes along Myanmar, Bangladesh and Pakistan borders including Line of Control (LoC). Also discuss the role played by various security forces in this regard.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `The China-Pakistan Economic Corridor (CPEC) is viewed as a cardinal subset of China’s larger ‘One Belt One Road’ initiative. Give a brief description of CPEC and enumerate the reasons why India has distanced itself from the same.` },
              { n: 2, q: `Left Wing Extremism (LWE) is showing a downward trend, but still affects many parts of the country. Briefly explain the Government of India’s approach to counter the challenges posed by LWE.` },
              { n: 3, q: `Data security has assumed significant importance in the digitized world due to rising cyber crimes. The Justice B.N. Srikrishna Committee Report addresses issues related to data security. What, in your view, are the strengths and weaknesses of the Report relating to protection of personal data in cyber space?` },
              { n: 4, q: `India’s proximity to the two of the world’s biggest illicit opium growing states has enhanced her internal security concerns. Explain the linkages between drug trafficking and other illicit activities such as gunrunning, money laundering and human trafficking. What counter measures should be taken to prevent the same?` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `Discuss the potential threats of Cyber attack and the security framework to prevent it.` },
              { n: 2, q: `The North-Eastern region of India has been infested with insurgency for a very long time. Analyze the major reasons for the survival of armed insurgency in this region.` },
              { n: 3, q: `Mob violence is emerging as a serious law and order problem in India. By giving suitable examples, analyze the causes and consequences of such violence.` },
              { n: 4, q: `The scourge of terrorism is a grave challenge to national security. What solutions do you suggest to curb this growing menace? What are the major sources of terrorist funding?` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `The terms ‘Hot Pursuit’ and ‘Surgical Strikes’ are often used in connection with armed action against terrorist attacks. Discuss the strategic impact of such actions.` },
              { n: 2, q: `‘Terrorism is emerging as a competitive industry over the last few decades.” Analyse the above statement.` },
              { n: 3, q: `Border management is a complex task due to difficult terrain and hostile relations with some countries. Elucidate the challenges and strategies for effective border management.` },
              { n: 4, q: `Use of internet and social media by non-state actors for subversive activities is a major security concern. How have these been misused in the recent past? Suggest effective guidelines to curb the above threat.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `Discuss the advantages and security implications of cloud hosting of servers vis-a-vis in-house machine-based hosting for government businesses.` },
              { n: 2, q: `Human right activists constantly highlight the view that the Armed Forces (Special Powers) Act, 1958 (AFSPA) is a draconian act leading to cases of human rights abuses by the security forces. What sections of AFSPA are opposed by the activists? Critically evaluate the requirement with reference to the view held by the Apex Court.` },
              { n: 3, q: `Religious indoctrination via digital media has resulted in Indian youth joining the ISIS. What is ISIS and its mission? How can ISIS be dangerous to the internal security of our country?` },
              { n: 4, q: `The persisting drives of the Government for development of large industries in backward areas have resulted in isolating the tribal population and the farmers who face multiple displacements. With Malkangiri and Naxalbari foci, discuss the corrective strategies needed to win the Left Wing Extremism (LWE) doctrine affected citizens back into the mainstream of social and economic growth.` },
              { n: 5, q: `Considering the threats cyberspace poses for the country, India needs a “Digital Armed Forces” to prevent crimes. Critically evaluate the National Cyber Security Policy, 2013 outlining the challenges perceived in its effective implementation.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `“The diverse nature of India as a multi-religious and multi-ethnic society is not immune to the impact of radicalism which is seen in her neighbourhood.” Discuss along with strategies to be adopted to counter this environment.` },
              { n: 2, q: `International civil aviation laws provide all countries complete and exclusive sovereignty over the airspace above their territory. What do you understand by ‘airspace? What are the implications of these laws on the space above this airspace? Discuss the challenges which this poses and suggest ways to contain the threat.` },
              { n: 3, q: `How does illegal transborder migration pose a threat to India’s security? Discuss the strategies to curb this, bringing out the factors which give impetus to such migration.` },
              { n: 4, q: `In 2012, the longitudinal marking for high-risk areas for piracy was moved from 65 degrees east to 78 degrees east in the Arabian Sea by the International Maritime Organization. What impact does this have on India’s maritime security concerns?` },
              { n: 5, q: `China and Pakistan have entered into an agreement for development of an economic corridor. What threat does this pose for India’s security? Critically examine.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `Money laundering poses a serious security threat to a country’s economic sovereignty. What is its significance for India and what steps are required to be taken to control this menace?` },
              { n: 2, q: `What are social networking sites and what security implications do these sites present?` },
              { n: 3, q: `Cyber warfare is considered by some defense analysts to be a larger threat than even Al Qaeda or terrorism. What do you understand by Cyber warfare? Outline the cyber threats which India is vulnerable to and bring out the state of the country’s preparedness to deal with the same.` },
              { n: 4, q: `Article 244 of the Indian Constitution relates to administration of scheduled areas and tribal areas. Analyse the impact of non-implementation of the provisions of the Fifth schedule on the growth of Left Wing extremism.` },
              { n: 5, q: `How far are India’s internal security challenges linked with border management particularly in view of the long porous borders with most countries of South Asia and Myanmar?` },
            ],
          },
        ],
      },
      {
        slug: "disaster-mgmt",
        name: "Disaster Management",
        years: [
          {
            year: 2024,
            questions: [
              { n: 1, q: `What is disaster resilience? How is it determined? Describe various elements of a resilience framework. Also mention the global targets of the Sendai Framework for Disaster Risk Reduction (2015-2030).` },
              { n: 2, q: `Flooding in urban areas is an emerging climate-induced disaster. Discuss the causes of this disaster. Mention the features of two major floods in the last two decades in India. Describe the policies and frameworks in India that aim at tackling such floods.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `Dam failures are always catastrophic, especially on the downstream side, resulting in a colossal loss of life and property. Analyze the various causes of dam failures. Give two examples of large dam failures.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Explain the mechanism and occurrence of cloudburst in the context of the Indian subcontinent. Discuss two recent examples.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `Discuss about the vulnerability of India to earthquake related hazards. Give examples including the salient features of major disasters caused by earthquakes in different parts of India during the last three decades.` },
              { n: 2, q: `Describe the various causes and the effects of landslides. Mention the important components of the National Landslide Risk Management Strategy.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `Discuss the recent measures initiated in disaster management by the Government of India departing from the earlier reactive approach.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `Describe various measures taken in India for Disaster Risk Reduction (DRR) before and after signing ‘Sendai Framework for DRR (2015-30)’. How is this framework different from ‘Hyogo Framework for Action, 2005’?` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `On December 2004, tsunami brought havoc on fourteen countries including India. Discuss the factors responsible for occurrence of tsunami and its effects on life and economy. In the light of guidelines of NDMA (2010) describe the mechanisms for preparedness to reduce the risk during such events.` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `The frequency of urban floods due to high intensity rainfall is increasing over the years. Discussing the reasons for urban floods, highlight the mechanisms for preparedness to reduce the risk during such events.` },
              { n: 2, q: `With reference to National Disaster Management Authority (NDMA) guidelines, discuss the measures to be adopted to mitigate the impact of recent incidents of cloudbursts in many places of Uttarakhand.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `The frequency of earthquakes appears to have increased in the Indian subcontinent. However, India’s preparedness for mitigating their impact has significant gaps. Discuss various aspects.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `Drought has been recognized as a disaster in view of its spatial expanse, temporal duration, slow onset and lasting effects on vulnerable sections. With a focus on the September 2010 guidelines from the National Disaster Management Authority (NDMA), discuss the mechanisms for preparedness to deal with likely El Niño and La Niña fallouts in India.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `How important are vulnerability and risk assessment for pre-disaster management? As an administrator, what are key areas that you would focus on in a Disaster Management System.` },
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
            year: 2025,
            questions: [
              { n: 1, q: `(a) In the present digital age, social media has revolutionised our way of communication and interaction. However, it has raised several ethical issues and challenges. Describe the key ethical dilemmas in this regard. (Answer in 150 words)` },
              { n: 2, q: `(a) Carl von Clausewitz states that “war is the continuation of politics by other means.” Critically examine the relevance of this statement in present context of contemporary geo-political conflicts. (Answer in 150 words)` },
              { n: 3, q: `Given below are three quotations of great thinkers. What do each of these quotations convey to you in the present context? (Answer in 150 words each)` },
              { n: 4, q: `(a) “For any kind of social re-engineering by successful implementation of a welfare scheme, a civil servant must rise above personal biases and prejudices to maintain objectivity.” Justify this statement with suitable examples. (Answer in 150 words)` },
              { n: 5, q: `(a) “One who is devoted to one’s duty attains highest perfection in life.” Analyse this statement with reference to sense of responsibility and personal fulfilment as a civil servant. (Answer in 150 words)` },
              { n: 6, q: `(a) It is said that for an ethical work culture, there must be code of ethics in place in every organisation. To ensure values-based work culture, what suitable measures would you adopt in your workplace? (Answer in 150 words)` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `(a): What do you understand by ‘moral integrity’ and ‘professional efficiency’ in the context of corporate governance in India? Illustrate with suitable examples.` },
              { n: 2, q: `(a): ‘‘Corruption is the manifestation of the failure of core values in the society.’’ In Your opinion what measures can be adopted to uplift the core values in the society?` },
              { n: 3, q: `Given below are three quotation of great thinkers. What do each of these quotations convey to you in the present context?` },
              { n: 4, q: `(a):‘‘What really matters for success, character, happiness and lifelong achievements is a definite set of emotional skills – your EQ – not just purely cognitive abilities that are measured by conventional IQ tests.’’ Do you agree with this view? Give reasons in support of your answer.` },
              { n: 5, q: `(a): Is conscience a more reliable guide when compared to laws, rules and regulations in the context of ethical decision-making? Discuss.` },
              { n: 6, q: `(a): What were the major teachings of Guru Nanak? Explain their relevance in the contemporary world.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `(a): Wisdom lies in knowing what to reckon with and what to overlook. An officer being engrossed with the periphery, ignoring the core issues before him, is not rare in the bureaucracy. Do you agree that such preoccupation of an administrator leads to travesty of justice to the cause of effective service delivery and good governance? Critically evaluate.` },
              { n: 2, q: `(a): The Rules and Regulations provided to all the civil servants are same, yet there is differnce in the performance. Positive minded officers are able to interpret the Rules and Regulations in favour of the case and achieve success, whereas negative minded officers are unable to achieve goals by interpreting the same Rules and Regulations against the case. Discuss with illustrations.` },
              { n: 3, q: `What does each of the following quotations mean to you?` },
              { n: 4, q: `(a): What do you understand by the term 'good governance'? How far recent initiatives in terms of e-Governance steps taken by the State have helped the beneficiaries? Discuss with suitable examples.` },
              { n: 5, q: `(a): Russia and Ukraine war has been going on for the last seven months. Different countries have taken independent stands and actions keeping in view their own national interests. We are all aware that war has its own impact on the different aspects of society, including human tragedy. What are those ethical issues that are crucial to be considered while launching the war and its continuation so far? lllustrate with justification the ethical issues involved in the given state of affair.` },
              { n: 6, q: `(a): Whistle-blower, who reports corruption and illegal activities, wrongdoing and misconduct to the concerned authorities, runs the risk of being exposed to grave danger, physical harm and victimization by the vested interests, accused persons and his team. What Policy measures would you suggest to strengthen protection mechanism to safeguard the whistle-blower?` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `(a): Identify five ethical traits on which one can plot the performance of a civil servant. Justify their inclusion in the matrix.` },
              { n: 2, q: `(a): Impact of digital technology as a reliable source of input for rational decision making is a debatable issue. Critically evaluate with suitable example.` },
              { n: 3, q: `What does each of the following quotations mean to you?` },
              { n: 4, q: `(a): Attitude is an important component that goes as input in the development of human being. How to build a suitable attitude needed for a public servant?` },
              { n: 5, q: `(a): “Refugees should not be turned back to the country where they would face persecution or human right violation”. Examine the statement with reference to ethical dimension being violated by the nation claiming to be democratic with open society.` },
              { n: 6, q: `(a): An independent and empowered social audit mechanism is an absolute must in every sphere of public service, including judiciary, to ensure performance, accountability and ethical conduct. Elaborate.` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `(a) Discuss the role of ethics and values in enhancing the following three major components of Comprehensive National Power (CNP) viz. human capital, soft power (culture and policies), and social harmony.` },
              { n: 2, q: `(a) Hatred is destructive of a person’s wisdom and conscience that can poison a nation’s spirit. Do you agree with this view? Justify your answer.` },
              { n: 3, q: `(a) What teachings of Buddha are most relevant today and why? Discuss.` },
              { n: 4, q: `(a) Distinguish between laws and rules. Discuss the role of ethics in formulating them.` },
              { n: 5, q: `(a) What are the main factors responsible for gender inequality in India? Discuss the contribution of Savitribai Phule in this regard.` },
              { n: 6, q: `(a) What do each of the following quotations mean to you?` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `(a) State the three basic values, universal in nature, in the context of civil services and bring out their importance.` },
              { n: 2, q: `(a) What is meant by public interest? What are the principles and procedures to be followed by civil servants in public interest?` },
              { n: 3, q: `(a) What is meant by conflict of interest? Illustrate with examples, the difference between the actual and potential conflicts of interest.` },
              { n: 4, q: `(a) “In doing a good thing, everything is permitted which is not prohibited expressly or by clear implication.” Examine the statement with suitable examples in the context of a public servant discharging his/her duties.` },
              { n: 5, q: `(a) Suppose the Government of India is thinking of constructing a dam in a mountain valley bound by forests and inhabited by ethnic communities. What rational policy should it resort to in dealing with unforeseen contingencies?` },
              { n: 6, q: `What do each of the following quotations means to you in the present context?` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `Conflict of interest in the public sector arises when` },
              { n: 2, q: `Examine the relevance of the following in the context of civil service:` },
              { n: 3, q: `Young people with ethical conduct are not willing to come forward to join active politics. Suggest steps to motivate them to come forward.` },
              { n: 4, q: `(a) One of the tests of integrity is complete refusal to be compromised. Explain with reference to a real life example.` },
              { n: 5, q: `(a) “Great ambition is the passion of a great character. Those endowed with it may perform very good or very bad acts. All depends on the principles which direct them.” – Napoleon Bonaparte.` },
              { n: 6, q: `(a) How will you apply emotional intelligence in administrative practices?` },
              { n: 7, q: `(a) The crisis of ethical values in modern times is traced to a narrow perception of the good life. Discuss.` },
              { n: 8, q: `(a) Discipline generally implies following the order and subordination. However, it may be counter-productive for the organisation. Discuss.` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `(a) Explain how ethics contributes to social and human well-being.` },
              { n: 2, q: `(a) What do you understand by the terms ‘governance’, ‘good governance’ and ‘ethical governance’?` },
              { n: 3, q: `(a) Analyse John Rawls’s concept of social justice in the Indian context.` },
              { n: 4, q: `(a) “Corruption causes misuse of government treasury, administrative inefficiency and obstruction in the path of national development.” Discuss Kautilya’s views.` },
              { n: 5, q: `Law and Ethics are considered to be the two tools for controlling human conduct so as to make it conducive to civilized social existence.` },
              { n: 6, q: `Our attitudes towards life, work, other people and society are generally shaped unconsciously by the family and the social surroundings in which we grow up. Some of these unconsciously acquired attitudes and values are often undesirable in the citizens of a modern democratic and egalitarian society.` },
              { n: 7, q: `Anger is a harmful negative emotion. It is injurious to both personal life and work life.` },
              { n: 8, q: `“Max Weber said that it is not wise to apply to public administration the sort of moral and ethical norms we apply to matters of personal conscience. It is important to realize that the state bureaucracy might possess its own independent bureaucratic morality.” Critically analyse this statement.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `(a) What is meant by ‘environmental ethics’? Why is it important to study? Discuss any one environmental issue from the viewpoint of environmental ethics.` },
              { n: 2, q: `Ethical management and Management of ethics` },
              { n: 3, q: `Discrimination and Preferential treatment` },
              { n: 4, q: `Personal ethics and Professional ethics` },
              { n: 5, q: `Given are two quotations of moral thinkers/philosophers. For each of these, bring out what it means to you in the present context:` },
              { n: 6, q: `(a) “A mere compliance with law is not enough, the public servant also has to have a well-developed sensibility to ethical issues for effective discharge of duties.” Do you agree? Explain with the help of two examples, where (i) an act is ethically right, but not legally and (ii) an act is legally right, but not ethically.` },
              { n: 7, q: `(a) “Social values are more important than economic values.” Discuss the above statement with examples in the context of inclusive growth of a nation.` },
              { n: 8, q: `Two different kinds of attitudes exhibited by public servants towards their work have been identified as the bureaucratic attitude and the democratic attitude.` },
              { n: 9, q: `Today we find that in spite of various measures like prescribing codes of conduct, setting up vigilence cells/commissions, RTI, active media and strengthening of legal mechanisms, corrupt practices are not coming under control.` },
              { n: 10, q: `At the international level, the bilateral relations between most nations are governed on the policy of promoting one’s own national interest without any regard for the interest of other nations. This leads to conflicts and tensions between the nations. How can ethical consideration help resolve such tensions? Discuss with specific examples.` },
              { n: 11, q: `Public servants are likely to confront with the issues of ‘Conflict of Interest’. What do you understand by the term ‘Conflict of Interest’ and how does it manifest in the decision making by public servants? If faced with the conflict of interest situation, how would you resolve it? Explain with the help of examples.` },
            ],
          },
          {
            year: 2014,
            questions: [
              { n: 1, q: `(a) All human beings aspire for happiness. Do you agree? What does happiness mean to you? Explain with examples.` },
              { n: 2, q: `(a) In the context of defence services, 'patriotism' demands readiness to even lay down one's life in protecting the nation. According to you, what does patriotism imply in everyday civil life? Explain with illustrations and justify your answer.` },
              { n: 3, q: `(a) "Integrity without knowledge is weak and useless, but knowledge without integrity is dangerous and dreadful." What do you understand by this statement? Explain your stand with illustrations from the modern context.` },
              { n: 4, q: `(a) Which eminent personality has inspired you the most in the context of ethical conduct in life? Give the gist of his/her teachings. Giving specific examples, describe how you have been able to apply these teachings for your own ethical development.` },
              { n: 5, q: `(a) The current society is plagued with widespread trust-deficit. What are the consequences of this situation for personal well-being and for societal well-being? What can you do at the personal level to make yourself trustworthy?` },
              { n: 6, q: `What factors affect the formation of a person's attitude towards social problems? In our society, contrasting attitudes are prevalent about many social problems. What contrasting attitudes do you notice about the caste system in our society? How do you explain the existence of these contrasting attitudes?` },
              { n: 7, q: `What does 'accountability' mean in the context of public service? What measures can be adopted to ensure individual and collective accountability of public servants?` },
              { n: 8, q: `We are witnessing increasing instances of sexual violence against women in the country. Despite existing legal provisions against it, the number of such incidences is on the rise. Suggest some innovative measures to tackle this menace.` },
            ],
          },
          {
            year: 2013,
            questions: [
              { n: 1, q: `What do you understand by ‘Values’ and ‘Ethics’? In what way is it important to be ethical along with being professionally competent?` },
              { n: 2, q: `(a) What do you understand by the following terms in the context of public service?` },
              { n: 3, q: `Spirit of Service` },
              { n: 4, q: `Courage of Conviction` },
              { n: 5, q: `Some people feel that values keep changing with time and situation, while others strongly believe that there are certain universal and eternal human values. Give your perception in this regard with due justification.` },
              { n: 6, q: `What is ‘emotional intelligence’ and how can it be developed in people? How does it help an individual in taking ethical decisions?` },
              { n: 7, q: `(a) What do you understand by the term ‘voice of conscience’? How do you prepare yourself to heed to the voice of conscience?` },
              { n: 8, q: `Given below are three quotations of great moral thinkers/philosophers. For each of these quotations, bring out what it means to you in the present context:` },
              { n: 9, q: `“The good of an individual is contained in the good of all.” what do you understand by this statement? How can this principle be implemented in public life?` },
              { n: 10, q: `It is often said that ‘politics’ and ‘ethics do not go together. What is your opinion in this regard? Justify your answer with illustration.` },
            ],
          },
        ],
      },
      {
        slug: "case-studies",
        name: "Case Studies",
        years: [
          {
            year: 2025,
            questions: [
              { n: 1, q: `Vijay was Deputy Commissioner of remote district of Hilly Northern State of the country for the last two years. In the month of August heavy rains lashed the complete state followed by cloud burst in the upper reaches of the said district. The damage was very heavy in the complete state especially in the affected district. The complete road network and telecommunication were disrupted and the buildings were damaged extensively. People’s houses have been destroyed and they were forced to stay in open. More than 200 people have been killed and about 5000 were badly injured. The Civil Administration under Vijay got activated and started conducting rescue and relief operations. Temporary shelter camps and hospitals were established to provide shelter and medical facilities to the homeless and injured people. Helicopter services were pressed in, for evacuating sick and old people from remote areas. Vijay got a message from his hometown in Kerala that his mother was seriously sick. After two days Vijay received the unfortunate message that his mother has expired. Vijay has no close relative except one elder sister who was US citizen and staying there for last several years. In the meantime, the situation in the affected district deteriorated further due to resumption of heavy rains after a gap of five days. At the same time, continuous messages were coming on his mobile from his hometown to reach at the earliest for performing last rites of his mother.` },
              { n: 2, q: `In line with the Directive Principles of State Policy enshrined in the Indian Constitution, the government has a constitutional obligation to ensure basic needs – Roti, Kapda aur Makan (Food, Clothes and Shelter) – for the under-privileged. Pursuing this mandate, the district administration proposed clearing a portion of forest land to develop housing for the homeless and economically weaker sections of the society.` },
              { n: 3, q: `Subash is Secretary, PWD in the State Government. He is a senior officer, known for his competence, integrity and dedication to work. He enjoys the trust and confidence of Minister Incharge of PWD and Programme Implementation. As a part of his job profile, he is responsible for policy formulation, execution of projects relating to infrastructure initiatives in the State. Besides, he oversees the technical and administrative aspects relating to planning, designing and construction etc.` },
              { n: 4, q: `Rajesh is a Group A officer with nine years of service. He is posted as Administrative Officer in an Oil Public Sector undertaking. As an Administrative Officer he is responsible for managing and coordinating various administrative tasks to ensure smooth functioning of office. He also manages office supplies, equipment etc.` },
              { n: 5, q: `Mahatma Gandhi National Rural Employment Guarantee Program, MGNREGA was earlier known as National Rural Employment Guarantee Scheme, NREGA. It is an Indian Social Welfare Program that aimed at fulfilling the ‘Right to Work’ provisions made in the Constitution. MGNREGA was launched in 2006 under Rural Employment Sector by the Ministry of Rural Development.` },
              { n: 6, q: `Ashok is Divisional Commissioner of one of the border districts of the North East State. A few years back, Military has taken over the neighbouring country after overthrowing the elected civil government. Civil war situation is prevailing in the country especially in last two years. However, internal situation further deteriorated due to rebel groups taking over control of certain populated areas near own border. Due to intense fight between military and rebel groups, civilian casualties has increased manifold in recent past. In the meantime, in one night Ashok got information from the local police guarding the border check post that there are about 200-250 people mainly women and children trying to cross over to our side of the border. There are also about 10 soldiers with their weapons in military uniform part of this group who wants to cross over. Women and Children are also crying and begging for help. A few of them are injured and bleeding profusely need immediate medical care. Ashok tried to contact Home Secretary of the State but failed to do so due to poor connectivity mainly due to inclement weather.` },
            ],
          },
          {
            year: 2023,
            questions: [
              { n: 1, q: `You are working as an executive in a nationalised bank for several years. One day one of your close colleagues tells you that her father is suffering from heart disease and needs surgery immediately to survive. She also tells you that she has no insurance and the operation will cost about 10 lakh. You are also aware of the fact that her husband is no more and that she is from a lower middle class family. You are empathetic about her situation, However, apart from expressing your sympathy, you do not have the resources to find her. A few weeks later, you ask her about the well-being of her father and she informs you about his successful surgery and that he is recovering. She then confides in you that the bank manager was kind enough to facilitate the release of \`10 lakh from a dormant acement of someone to pay for the operation with a promise that it should be confidential and be repaid at the earliest. She has already started paying it back and will continue to do until it is all returned.` },
              { n: 2, q: `A Iandslide occurred in the middle of the night on 20th July, 2023 in a remote mountain hamlet, approximately 60 kilometres from Uttarkashi. The landslide was caused by torrential rains and has resulted in large-scale destruction of property and life. You, as District Magistrate of that area, have rushed to the spot with a team of doctors, NGOs, media and police along with numerous support staff to oversee the rescue operations. A man came running to you with a request for urgent medical help for his pregnant wife who is in labour and is losing blood. You directed your medical team to examine his wife. They return and convey to you that this woman needs blood transfusion immediately. Upon enquiry, you come to know that a few blood collection bags and blood group test kits are available in the ambulance accompanying your team. Few people of your team have already volunteered to donate blood.` },
              { n: 3, q: `At 9 pm on Saturday evening, Rashika, a Joint Secretary, was still engrossed in her work in her office. Her husband, Vikram, is an executive in an MNC and frequently out of town in connection with his work. Their two children aged 5 and 3 are looked after by their domestic helper. At 9.30 pm her superior, Mr. Suresh calls her and asks her to prepare a detailed note on an important matter to be discussed in a meeting in the Ministry. She realises that she will have to work on Sunday to finish the additional task given by her superior. She reflects on how she had looked forward to this posting and had worked long hours for months to achieve it. She had kept the welfare of people uppermost in discharging her duties. She feels that she has not done enogh justice to her family and she has not fulfilled her duties in discharging essential social obligations. Even as recently as last month she had to leave her sick child in the nanny's care as she had to work in the office. Now she feels that she must draw a line, beyond which her personal life should take precedence over her professional responsibilities- She thinks that there should be reasonable limits to the work ethics such as punctuality, hard work. dedication to duty and selfless service.` },
              { n: 4, q: `Vinod is an honest and sincere IAS officer. Recently, he has taken over as Managing Director of the State Road Transport Corporation, his sixth transfer in the past three years. His peers acknowledge his vast knowledge, affability and uprightness.` },
              { n: 5, q: `You have just been appointed as Additional Director General of Central Public Works Department. The Chlef Architect of your division, who is to retire in six months, is passionately working on a very important project, the successful completion of which would earn him a lasting reputation for the rest of his life. A new lady architect. Seema, trained at Manchester School of Architecture, UK joined as Senior Architect in your division. During the briefing about the project, Seema made some suggestions which would not only add value to the project, but would also reduce completion time. This has made the Chief Architect insecure and he is constantly worried that all the credit will go to her. Subsequently, he adopted a passive and aggressive behaviour towards her and has become disrespectful to her. Seema felt it embarrassing as the Chief Architect left no chance of humiliating her. He would very often correct her in front of other colleagues and raise his voice while speaking to her. This continuous harassment has resulted in her losing confidence and self- esteem. She felt perpetually tensed, anxious and stressed. She appeared to be in awe of him since he has had a long tenure in the office and has vast experience in the area of her work. You are aware of her outstanding academic credentials and career record in her previous organisations. However, you fear that this harassment may result in compromising her much needed contribution in this important project and may adversely impact her emotional well-being. You have also come to know from her peers that aho is contemplating tendering her resignation.` },
              { n: 6, q: `You hold a responsible position in a ministry in the government, One day in the morning you received a call from the school of your 11-year-old son that you are required to come and meet the Principal. You proceed to the school and find your son in the Principal's office. The Principal informs you that your son had been found wandering aimlessly in the grounds during the time classes were in progress. The class teacher further informs you that your son has lately become a loner and did not respond to questions in the class, he had also been unable to perform well in the football trials held recently. You bring your son back from the school and in the evening, you along with your wife try to find out the reasons for your son's changed behaviour. After repeated cajoling, your son shares that some children had been making fun of him in the class as well as in the WhatsApp group of the students by calling him stunted, duh and a frog. He tells you the names of a few children who are the main culprits but pleads with you to let the matter rest.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Prabhat was working as Vice President (Marketing) at Sterling Electric Ltd., a reputed multinational company. But presently the company was passing through the difficult times as the sales were continuously showing downward trend in the last two quarters. His division, which hitherto had been a major revenue contributor to the company's financial health, was now desperately trying to procure some big government order for them. But their best efforts did not yield any positive success or breakthrough. His was a professional company and his local bosses were under pressure from their London-based HO to show some positive results. In the last performance review meeting taken by the Executive Director (India Head), he was reprimanded for his poor performance. He assured them that his division is working on a special contract from the Ministry of Defence for a secret installation near Gwalior and tender is being submitted shortly.` },
              { n: 2, q: `Ramesh is State Civil Services Officer who got the opportunity of getting posted to the capital of a border State after rendering 20 years of service. Ramesh's mother has recently been detected cancer and has been admitted in the leading cancer hospital of the city. His two adolescent children have also got admission in one of the best public schools of the town. After settling down in his appointment as Director in the Home Department of the State, Ramesh got confidential report through intelligence sources that illegal migrants are infiltrating in the State from the neighbouring country. He decided to personally carry out surprise check of the border posts along with his Home Department team. To his surprise, he caught red-handed two families of 12 members infiltrated with the connivance of the security personnel at the border posts. On further inquiry and investigation, it was found that after the migrants from neighbouring country infiltrate, their documentation like Aadhaar Card, Ration Card and Voter Card are also forged and they are made to settle down in a particular area of the State. Ramesh prepared the detailed and comprehensive report and submitted to the Additional Secretary of the State. However, he has summoned by the Additional Home Secretary after a week and was instructed to withdraw the report. The Additional Home Secretary informed Ramesh that the report submitted by him has not been appreciated by the higher authorities. He further cautioned him that if he fails to withdraw the confidential report, he will not only be posted out from the prestigious appointment from the State capital but his further promotion which is due in near future will also get in jeopardy.` },
              { n: 3, q: `The Supreme Court has banned mining in the Aravalli Hills to stop degradation of the forest cover and to maintain ecological balance. However, the stone mining was still prevalent in the border district of the affected State with connivance of certain corrupt forest officials and politicians. Young and dynamic SP who was recently posted in the affected district promised to himself to stop this menace. In one of his surprise checks with his team, he found loaded truck with stone trying to escape the mining area. He tried to stop the truck but the truck driver overrun the police officer, killing him on the spot and thereafter managed to flee. Police filed FIR but no breakthrough was achieved in the case for almost three months. Ashok who was the Investigative Journalist working with leading TV channel, suo moto started investigating the case. Within one month, Ashok got breakthrough by interacting with local people, stone mining mafia and government officials. He prepared his investigative story and presented to the CMD of the TV channel. He exposed in his investigative report the complete nexus of stone mafia working with blessing of corrupt police and civil officials and politicians. The politician who was involved in the mafia was no one else but local MLA who was considered to be very close to the Chief Minister. After going through the investigative report, the CMD advised Ashok to drop the idea of making the story public through electronic media. He informed that the local MLA was not only the relative of the owner of the TV channel but also had unofficially 20 percent share in the channel. The CMD further informed Ashok that his further promotion and hike in pay will be taken care of in addition the soft loan of \`10 lakhs which he has taken from the TV channel for his son's chronic disease will be suitably adjusted if he hands over the investigative report to him.` },
              { n: 4, q: `You have done MBA from a reputed institution three years back but could not get campus placement due to COVID-19 generated recession. However, after a lot of persuasion and series of competitive tests including written and interview, you managed to get a job in a leading shoe company. You have aged parents who are dependent and staying with you. You also recently got married after getting this decent job. You were allotted the Inspection Section which is responsible for clearing the final product. In first one year, you learnt your job well and was appreciated for your performance by the management. The company is doing good business for last five years in domestic market and this year it is decided even to export to Europe and Gulf countries. However, one large consignment to Europe was rejected by their Inspecting Team due to certain poor quality and was sent back. The top management ordered that ibid consignment to be cleared for the domestic market. As a part of Inspecting Team, you observed the glaring poor quality and brought to the knowledge of the Team Commander. However, the top management advised all the members of the team to overlook these defects as the management cannot bear such a huge loss. Rest of the team members except you promptly signed and cleared the consignment for domestic market, overlooking glaring defects. You again brought to the knowledge of the Team Commander that such consignment, if cleared even for domestic market, will tarnish the image and reputation of the company and will be counter-productive in the long run. However, you were further advised by the top management that if you do not clear the consignment, the company` },
              { n: 5, q: `Rakesh was working as Joint Commissioner in Transport Department of a city. As a Part of his Job profile, among others, he was entrusted with the task of overseeing the control and functioning of City Transport Department. A case of strike by the drivers' union of City Transport Department over the issue of Compensation to a driver who died on duty while driving the bus came up before him for decision in the matter.` },
              { n: 6, q: `You are appointed as an officer heading the section in Environment Pollution Control Board to ensure compliance and its follow-up. In that region, there were large number of small and medium industries which had been granted clearance you learnt that these industries provide employment to many migrant workers Most of the industrial units have got environmental clearance certificate in their possession. The environmental clearance seeks to curb industries and projects that supposedly hamper environment and living species in the region. But in practice most of these units remain to be polluting units in several ways like air, water and soil pollution. As such, local people encountered persistent health problems. It was confirmed that majority of the industries were violating environmental compliance. You issued notice to all the industrial units to apply for fresh environmental clearance certificate from the competent authority. However, your action met with hostile response from a section of the industrial units, other vested interest persons and a section of the local politicians. The workers also became very hostile to you as they felt that your action would lead to the closure these of industrial units, and the resultant unemployment will lead to insecurity and uncertainty in their livelihood. Many owners of the industries approached you with the plea that you should not initiate harsh action as it would compel them their units, and cause huge Financial loss, shortage of their products in the market. These would obviously add to the sufferings of the labourers and the consumer alike. The labour union also sent you representation requesting against the closure of the units. You simultaneously started receiving threats from unknown corners. You however received supports from some of your colleagues, who advised you to act freely to ensure environmental compliance. Local NGOs also came to your support and they demanded the closure of the polluting units immediately` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `Sunil is a young civil servant and has a reputation for his competence, integrity, dedication and relentless pursuit of difficult and onerous jobs. Considering his profile, he was picked up by his bosses to handle a very challenging and sensitive assignment. He was posted in a tribal dominated district notorious for illegal sand mining. Excavating sand from river belt and transporting through trucks and selling them in black market was rampant. This illegal sand mining mafia was operating with the support of local functionaries and tribal musclemen who in turn were bribing selected poor tribals and had kept the tribals under fear and intimidation.` },
              { n: 2, q: `You are Vice Principal of a degree college in one of the middle-class towns. Principal has recently retired and management is looking for his replacement. There are also feelers that the management may promote you as principal. In the meantime, during annual examination the flying squad which came from the university caught two students red-handed involved in unfair means. A senior lecturer of the college was personally helping these students in this act. This senior lecturer also happens to be close to the management. One of the students was son of a local politician who was responsible in getting college affiliated to the present reputed university. The second student was son of a local businessman who has donated maximum funds for running of the college. You` },
              { n: 3, q: `An elevated corridor is being constructed to reduce traffic congestion in the capital of a particular State. You have been selected as project manager of this prestigious project on your professional competence and experience. The deadline is to complete the project in next two years by 30 June, 2021, since this project is to be inaugurated by the Chief Minister before the elections are announced in the second week of July 2021. While carrying out the surprise inspection by inspecting team, a minor crack was noticed in one of the piers of the elevated corridor possibly due to poor material used. You immediately informed the chief engineer and stopped further work. It was assessed by you that minimum three piers of the elevated corridor have to be demolished and reconstructed. But this process will delay the project minimum by four to six months. But the chief engineer overruled the observation of inspecting team on the ground that it was a minor crack which will not in any way impact the strength and durability of the bridge. He ordered you to overlook the observation of inspecting team and continue working with same speed and tempo. He informed you that the minister does not want any delay as he wants the Chief Minister to inaugurate the elevated corridor before the elections are  declared. Also informed you that the contractor is far relative of the minister and he wants him to finish the project. He also gave you hint that your further promotion as additional chief engineer is under consideration with the ministry. However, you strongly felt that the minor crack in the pier of the elevated corridor will adversely affect the  health and life of the bridge and therefore it will be very dangerous not to repair the elevated corridor.` },
              { n: 4, q: `The coronavirus disease (COVID-19) pandemic has quickly spread to various countries. As on May 8th, 2020, in India 56342 positive cases of corona had been reported. India with a population of more than 1.35 billion had difficulty in controlling the transmission of coronavirus among its population. Multiple strategies became necessary to handle this outbreak. The Ministry of Health and Family Welfare of India raised wareness about this outbreak and to take all necessary actions to control the spread of COVID-19. Indian Government implemented a 55-day lockdown throughout the country to reduce the transmission of the virus. Schools and colleges had shifted to alternative mode of teaching-learning-evaluation and certification. Online mode became popular during these days.` },
              { n: 5, q: `A reputed food product company based in India developed a food product for the international market and started exporting the same after getting necessary approvals. The company announced this achievement and also indicated that soon the product will be made available for the domestic consumers with almost same quality and health benefits. Accordingly, the company got its product approved by the domestic competent authority and launched the product in Indian market. The company could increase its market share over a period of time and earn substantial profit both domestically and internationally. However, the random sample test conducted by inspecting team found the product being sold domestically in variance with the approval obtained from the competent authority. On further investigation, it was also discovered that the food company was not only selling products which were not meeting the health standard of the country but also selling the rejected export products in the domestic market. This episode adversely affected the reputation and profitability of the food company.` },
              { n: 6, q: `Pawan is working as an officer in the State Government for the last ten years. As a part of routine transfer, he was posted to another department. He joined in a new office along with five other colleagues. The head of the office was a senior officer conversant with the functioning of the office. As a part of general inquiry, Pawan gathered that his senior officer carries the reputation of being difficult and insensitive person having his` },
            ],
          },
          {
            year: 2020,
            questions: [
              { n: 1, q: `Rajesh Kumar is a senior public servant with a reputation of honesty and forthrightness, currently posted in the Finance Ministry as Head of the Budget Division. His department is presently busy organizing the budgetary support to the states, four of which are due to go to the polls within the financial year.` },
              { n: 2, q: `The Chairman of Bharat Missiles Ltd (BML) was watching a program on TV wherein the Prime Minister was addressing the nation on the necessity of developing a self-reliant India. He subconsciously nodded in agreement and smiled to himself as he mentally reviewed BML’s journey in the past two decades. BML had admirably progressed from producing first generation anti-tank guided missiles (ATGMs) to designing and producing` },
              { n: 3, q: `Rampura, a remote district inhabited by a tribal population, is marked by extreme backwardness and abject poverty. Agriculture is the mainstay of the local population, though it is primarily subsistence due to the very small landholdings. There is insignificant industrial or mining activity. Even the targeted welfare programs have inadequately benefited the tribal population. In this restrictive scenario, the youth has begun to migrate to other states to supplement the family income. Plight of minor girls is that their parents are persuaded by labour contractors to send them to work in the Bt Cotton farms of a nearby state. The soft fingers of the minor girls are well suited for plucking the cotton. The inadequate living and working conditions in these farms have caused serious health issues for the minor girls. NGOs in the districts of domicile and the cotton farms appear to be compromised and have not effectively espoused the twin issues of child labour and development of the area.` },
              { n: 4, q: `You are a municipal commissioner of a large city, having the reputation of a very honest and upright officer. A huge multipurpose mall is under construction in your city in which a large number of daily wage earners are employed. One night, during monsoons, a big chunk of the roof collapsed causing instant death of four labourers including two minors. Many more were seriously injured requiring immediate medical attention. The mishap resulted in a big hue and cry, forcing the government to institute an enquiry.` },
              { n: 5, q: `Parmal is a small but underdeveloped district. It has rocky terrain that is not suitable for agriculture, though some subsistence agriculture is being done on small plots of land. The area receives adequate rainfall and has an irrigation canal flowing through it. Amria, its administrative centre, is a medium sized town. It houses a large district hospital, an Industrial Training Institute and some privately owned skill training centres. It has all the` },
              { n: 6, q: `Migrant workers have always remained at the socio-economic margins of our society, silently serving as the instrumental labour force of urban economics. The pandemic has brought them into national focus.` },
            ],
          },
          {
            year: 2018,
            questions: [
              { n: 1, q: `Rakesh is a responsible district level officer, who enjoys the trust of his higher officials. Knowing his honesty, the government entrusted him with the responsibility of identifying the beneficiaries under a health care scheme meant for senior citizens.` },
              { n: 2, q: `As a senior officer in the Ministry, you have access to important policy decisions and upcoming big announcements such as road construction projects before they` },
              { n: 3, q: `It is a State where prohibition is in force. You are recently appointed as the Super-intendent of Police of a district notorious for illicit distillation of liquor. The illicit liquor leads to many death, reported and unreported, and causes a major problem for the district authorities.` },
              { n: 4, q: `A big corporate house is engaged in manufacturing industrial chemicals on a large scale. It proposes to set up an additional unit. Many states rejected its proposal due to the detrimental effect on the environment. But one state government acceded to the request and permitted the unit close to a city, brushing aside all opposition.` },
              { n: 5, q: `Dr X is a leading medical practitioner in a city. He has set up a charitable trust through which he plans to establish a super-speciality hospital in the city to cater to the medical needs of all sections of the society. Incidentally, that part of the State had been neglected over the years. The proposed hospital would be a boon for the region.` },
              { n: 6, q: `Taking a broader view, ensure substantial tax compliance and ignore defaults that are merely technical in nature.` },
              { n: 7, q: `Pursue the matter strictly and proceed on all fronts, whether substantial or merely technical.` },
              { n: 8, q: `Edward Snowden, a computer expert and former CIA administrator, released confidential Government documents to the press about the existence of Government surveillance programmes. According to many legal experts and the US Government, his action violated the Espionage act of 1971, which identified the leak of State secret as an act of treason. Yet, despite the fact that he broke the law, Snowden argued that he had a moral obligation to act. He gave a justification for his “whistle blowing” by stating that he had a duty “to inform the public as to that which is done in there name and that which is done against them.”` },
            ],
          },
          {
            year: 2017,
            questions: [
              { n: 1, q: `You are an honest and responsible civil servant. You often observe the following:` },
              { n: 2, q: `You are aspiring to become an IAS officer and you have cleared various stages and now you have been selected for the personal interview. On the day of the interview, on the way to the venue you saw an accident where a mother and child who happen to be your relatives were badly injured. They needed immediate help.` },
              { n: 3, q: `You are the head of the Human Resources department of an organization. One day one of the workers died on duty. His family was demanding compensation. However, the company denied compensation because it was revealed in investigation that he was drunk at the time of the accident. The workers of the company went on to strike demanding compensation for the family of the deceased. The Chairman of the management board has asked for your recommendation.` },
              { n: 4, q: `You are the manager of a spare parts company A and you have to negotiate a deal with the manager of a large manufacturing company B. The deal is highly competitive and sealing the deal is critical for your company. The deal is being worked out over a dinner. After dinner the manager of manufacturing company B offered to drop you to the hotel in his car. On the way to hotel he happens to hit motorcycle injuring the motorcyclist badly. You know the manager was driving fast and thus lost control. The law enforcement officer comes to investigate the issue and you are the sole eyewitness to it. Knowing the strict laws pertaining to road accidents you are aware that your honest account of the incident would lead to the prosecution of the manager and as a consequence the deal is likely to be jeopardised, which is of immense importance to your company.` },
              { n: 5, q: `A building permitted for three floors, while being extended illegally to 6 floors by a builder, collapses. As a consequence, a number of innocent labourers including women and children died. These labourers are migrants of different places. The government immediately announced cash relief to the aggrieved families and arrested the builder.` },
              { n: 6, q: `You are a Public Information Officer (PIO) in a government department. You are aware that the RTI Act 2005 envisages transparency and accountability in administration. The act has functioned as a check on the supposedly arbitrarily administrative behaviour and actions. However, as a PIO you have observed that there are citizens who filed RTI applications not for themselves but on behalf of such stakeholders who purportedly want to have access to information to further their own interests. At the same time there are these RTI activists who routinely file RTI applications and attempt to extort money from the decision makers. This type of RTI activism has affected the functioning of the administration adversely and also possibly jeopardises the genuineness of the applications which are essentially aimed at getting justice.` },
            ],
          },
          {
            year: 2016,
            questions: [
              { n: 1, q: `A fresh engineering graduate gets a job in a prestigious chemical industry. She likes the work. The salary is also good. However, after a few months she accidentally discovers that a highly toxic waste is being secretly discharged into a river nearby. This is causing health problems to the villagers downstream who depend on the river for their water needs. She is perturbed and mentions her concern to her colleagues who have been with the company for longer periods. They advise her to keep quite as anyone who mentions the topic is summarily dismissed. She cannot risk losing her job as she is the sole beard-winner for her family and has to support her ailing parents and siblings. At first, she thinks that if her seniors are keeping quiet, why should she stick out her neck. But her conscience pricks her to do something to save the river and the people who depend upon it. At heart she feels that the advice of silence given by her friends is not correct though she cannot give reasons for it. She thinks you are a wise person and seeks your advice.` },
              { n: 2, q: `Land needed for mining, dams and other largescale projects is acquired mostly from Adivasis, hill dwellers and rural communities. The displaced persons are paid monetary compensation as per the legal provisions. However, the payment is often tardy. In any case, it cannot sustain the displaced families for long. These people do not possess marketable skills to engage in some other accusation. They end up as low paid migrant laborers. Moreover, the development goes to industries, industrialists and urban communities whereas the costs are passed on to these poor helpless people. This unjust distribution of costs and benefits is unethical.` },
              { n: 3, q: `Suppose you are an officer in charge of implementing a social service scheme to provide support to old and destitute women. An old and illiterate woman comes to you to avail the benefits of the scheme. However, she has no documents to show that she fulfils the eligibility criteria. But after meeting her and listening to her you feel that she certainly needs support. Your enquiries also show that she is really destitute and living in a pitiable condition. You are in a dilemma as to what to do. Putting her under the scheme without necessary documents would clearly be violation of rules. But denying her the support would be cruel and inhuman.` },
              { n: 4, q: `You are a young, aspiring and sincere employee in a Government office working as an assistant to the director of your department. Since you have joined recently, you need to lean and progress. Luckily your superior is very kind and ready to train you for your job. He is a very intelligent and well-informed person having knowledge of various departments. In short, you respect your boss and are looking forward to lean a lot from him.` },
              { n: 5, q: `ABC Ltd. is a large transnational company having diversified business activities with a huge shareholder base. The company is continuously expanding the generating employment. The company, in its expansion and diversification programme, decides to establish a new plant at Vikaspuri, an area which is underdeveloped. The new plant is designed to use energy efficient technology that will help the company to save production cost by 20%. The company’s decision goes well with the Government policy of attracting investment to develop such underdeveloped regions. The government has also announced tax holiday for five years for the companies that invest in underdeveloped areas. However, the new plant may bring chaos for the inhabitants of Vikaspuri region, which is otherwise tranquil. The new plant may result in increased cost of living, aliens migrating to the region, disturbing the social and economic order. The company sensing the possible protest tried to educate the people of Vikaspuri region and public in general that how its Corporate Social Responsibility (CSR) policy would help overcome the likely difficulties of the residents of Vikaspuri region. In spite of this the protests begin and some of the residents decided to approach the judiciary as their plea before the Government did not yield any result.` },
              { n: 6, q: `Saraswati was a successful IT professional in USA. Moved by patriotic sense of doing something for the country she returned to India. Together with some other like-minded friends, she formed an NGO to build a school for a poor rural community.The objective of the school was to provide the best quality modern education at a nominal cost. She soon discovered that she has to seek permission from a number of Government agencies. The rules and procedures were quite confusing and cumbersome. What frustrated her most were delays, callous attitude of officials and constant demand for bribes. Her experience and the experience of many others like her have deterred people from taking up social service projects.` },
            ],
          },
          {
            year: 2015,
            questions: [
              { n: 1, q: `A private company is known for its efficiency, transparency and employee welfare. The company though owned by a private individual has a cooperative character where employees feel a sense of ownership. The company employs nearly 700 personnel and they have voluntarily decided not to form a union.` },
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
              { n: 1, q: `Thinking is like a game, it does not begin unless there is an opposite team.` },
              { n: 2, q: `Visionary decision-making happens at the intersection of intuition and logic.` },
              { n: 3, q: `Not all who wander are lost.` },
              { n: 4, q: `Inspiration for creativity springs from the effort to look for the magical in the mundane.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `Forests are the best case studies for economic excellence.` },
              { n: 2, q: `Poets are the unacknowledged legislators of the world.` },
              { n: 3, q: `History is a series of victories won by the scientific man over the romantic man.` },
              { n: 4, q: `A ship in harbour is safe, but that is not what a ship is for.` },
            ],
          },
          {
            year: 2021,
            questions: [
              { n: 1, q: `The process of self-discovery has now been technologically outsourced.` },
              { n: 2, q: `Your perception of me is a reflection of you; my reaction to you is an awareness of me.` },
              { n: 3, q: `The real is rational and the rational is real.` },
              { n: 4, q: `Hand that rocks the cradle rules the world.` },
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
              { n: 1, q: `Girls are weighed down by restrictions, boys with demands — two equally harmful disciplines.` },
              { n: 2, q: `Mathematics is the music of reason.` },
              { n: 3, q: `A society that has more justice is a society that needs less charity.` },
              { n: 4, q: `Education is not an injunction, it is an effective and pervasive tool for all-round development of an individual and social transformation.` },
            ],
          },
          {
            year: 2022,
            questions: [
              { n: 1, q: `The time to repair the roof is when the sun is shining.` },
              { n: 2, q: `You cannot step twice in the same river.` },
              { n: 3, q: `A smile is the chosen vehicle for all ambiguities.` },
              { n: 4, q: `Just because you have a choice, it does not mean that any of them has to be right.` },
            ],
          },
        ],
      },
    ],
  },
];

export function getPaper(slug: string) { return papers.find((p) => p.slug === slug); }
export function getSubject(paperSlug: string, subjectSlug: string) {
  return getPaper(paperSlug)?.subjects.find((s) => s.slug === subjectSlug);
}
export function getYear(paperSlug: string, subjectSlug: string, year: number) {
  return getSubject(paperSlug, subjectSlug)?.years.find((y) => y.year === year);
}
