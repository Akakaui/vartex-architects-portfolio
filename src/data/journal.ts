export interface JournalPost {
    id: string;
    title: string;
    excerpt: string;
    content: string[];
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: string;
    featured?: boolean;
}

export const journalPosts: JournalPost[] = [
    {
        id: "designing-with-climate",
        title: "Designing With Climate: Passive Strategies for West African Architecture",
        excerpt: "How traditional building wisdom and modern environmental design converge to create comfortable, low-energy spaces in hot-humid climates.",
        content: [
            "Architecture in West Africa has always been shaped by climate. Long before mechanical cooling systems existed, builders in this region developed sophisticated strategies for managing heat, humidity, and rainfall through form, orientation, and material choice. Today, as the architectural profession confronts the realities of climate change and energy scarcity, these vernacular strategies are more relevant than ever.",
            "At VARTEX, our approach to climate-responsive design begins with understanding the specific microclimate of each site. Wind patterns, solar angles, rainfall intensity, and vegetation all influence the decisions we make about building orientation, massing, and envelope design. We treat the climate not as an obstacle to overcome, but as a design partner that shapes the architecture from the earliest sketch.",
            "Cross-ventilation is perhaps the most fundamental passive strategy in our toolkit. By carefully positioning openings on opposite or adjacent facades, we create pressure differentials that draw air through interior spaces. The size, position, and operability of these openings are calibrated to local wind patterns, ensuring reliable airflow without relying on mechanical systems.",
            "Deep overhangs and shading devices are another critical element. In a region where the sun can be both a source of welcome daylight and uncomfortable heat gain, controlling solar access is essential. We use horizontal overhangs, vertical fins, and perforated screens to filter sunlight, creating interiors that are bright but cool. These elements also protect facades from heavy rainfall and reduce maintenance costs over time.",
            "Thermal mass plays an important role in moderating temperature swings. Thick masonry walls absorb heat during the day and release it slowly at night, smoothing out the peaks and valleys of daily temperature cycles. Combined with good ventilation, this strategy can significantly reduce the need for air conditioning, particularly in residential and educational buildings.",
            "Looking forward, we see enormous potential in combining these time-tested strategies with contemporary tools like computational fluid dynamics and parametric environmental analysis. The goal is not to replicate the past, but to learn from it — creating buildings that are both technologically current and deeply attuned to their environment."
        ],
        category: "Design Philosophy",
        date: "2026-02-15",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80",
        author: "VARTEX Studio",
        featured: true,
    },
    {
        id: "material-culture-in-architecture",
        title: "Material Culture: Why What We Build With Matters As Much As What We Build",
        excerpt: "An exploration of how material selection shapes spatial experience, cultural identity, and environmental impact in contemporary Nigerian architecture.",
        content: [
            "Every material carries meaning. Concrete speaks of permanence and industrial progress. Timber evokes warmth and craft. Laterite connects a building to the earth it sits upon. In our practice, material selection is never an afterthought — it is a fundamental design decision that shapes everything from spatial atmosphere to structural logic.",
            "In Nigeria, the dominant construction material is concrete block with cement render. It is affordable, available, and familiar. But familiarity can breed indifference, and too many buildings in our cities are wrapped in the same featureless grey envelopes regardless of their purpose, context, or aspirations. We believe that even within the constraints of common materials, there is enormous room for expression.",
            "Texture, pattern, and detail can transform ordinary materials into something extraordinary. A simple concrete block wall, when laid with alternating voids, becomes a light-filtering screen. A rendered surface, when scored with precise lines, gains depth and shadow. These are not expensive interventions — they are acts of care and intention that elevate the experience of architecture.",
            "We are also deeply interested in the potential of locally sourced and minimally processed materials. Laterite blocks, compressed earth, and locally quarried stone offer both environmental and cultural advantages. They reduce the carbon footprint of construction, support local economies, and create buildings that feel rooted in their landscape rather than imposed upon it.",
            "The conversation about materials is ultimately a conversation about values. What do we prioritize — speed and cost, or durability and beauty? Standardization or specificity? Global homogeneity or local identity? These are questions every architect must confront, and the answers are embedded in every wall, floor, and ceiling we design."
        ],
        category: "Materials",
        date: "2026-02-02",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80",
        author: "VARTEX Studio",
    },
    {
        id: "from-sketch-to-structure",
        title: "From Sketch to Structure: Inside Our Design Process",
        excerpt: "A behind-the-scenes look at how VARTEX moves from initial concept sketches through spatial studies to final architectural documentation.",
        content: [
            "Every project begins with a conversation. Before we draw a single line, we listen — to the client's aspirations, to the site's character, to the program's functional requirements. This phase of deep listening is perhaps the most important part of our process, because the quality of the questions we ask determines the quality of the architecture we produce.",
            "The first marks on paper are always loose and exploratory. We sketch by hand — quickly, freely, without commitment to any single idea. These early drawings are not about precision; they are about possibility. They help us test spatial relationships, explore massing options, and develop an intuitive understanding of the project's potential.",
            "From these initial sketches, we move into more rigorous spatial studies. Physical models — even simple ones made from cardboard and foam — help us understand volume, light, and proportion in ways that screens cannot. We supplement these with digital massing studies that allow us to test orientation, views, and environmental performance.",
            "As the design develops clarity, we transition into detailed documentation. Plans, sections, elevations, and construction details are developed with care, ensuring that the spatial intentions of the concept are faithfully translated into buildable instructions. We see documentation not as a bureaucratic necessity, but as a creative act — the final layer of design refinement.",
            "Visualization plays a crucial role throughout. High-quality renders and animations help clients understand the spatial experience of the design before a single brick is laid. But we are careful to use visualization honestly — our images aim to represent the likely reality of the built space, not an idealized fantasy.",
            "The process is rarely linear. We revisit, refine, and sometimes restart. We argue about proportions and debate material choices. This iterative, sometimes messy process is what produces architecture with depth and conviction."
        ],
        category: "Studio",
        date: "2026-01-18",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        author: "VARTEX Studio",
    },
    {
        id: "the-courtyard-as-spatial-anchor",
        title: "The Courtyard as Spatial Anchor: Lessons from Igbo Architecture",
        excerpt: "How traditional Igbo spatial organization informs our approach to contemporary community-oriented buildings.",
        content: [
            "The courtyard is one of the most enduring spatial archetypes in human architecture. Across cultures and climates, enclosed outdoor spaces have served as the social heart of buildings — places of gathering, work, play, and contemplation. In Igbo architectural tradition, the courtyard (or 'ogige') is not merely an open space surrounded by walls; it is a carefully calibrated social and environmental device.",
            "Traditional Igbo compounds are organized around shared courtyards that define the relationship between individual dwelling units and communal life. These spaces mediate between the privacy of the domestic interior and the publicness of the village, creating a threshold that is both protected and connected. The courtyard is where children play, where elders sit, where ceremonies unfold.",
            "In our work at VARTEX, we draw on this spatial logic — not as nostalgic imitation, but as a living design principle. Our vocational training center project, NKA NA UZU, is organized around a series of courtyards that serve both social and environmental functions. These shaded outdoor rooms encourage informal interaction between students and craftspeople while providing cross-ventilation to adjacent workshops.",
            "The environmental benefits of courtyard typologies are well documented. They create protected microclimates, promote natural ventilation, channel daylight deep into building plans, and provide acoustic separation between different functional zones. In hot-humid climates, a well-designed courtyard can reduce indoor temperatures by several degrees compared to a fully enclosed building.",
            "We believe that the courtyard is particularly relevant for contemporary institutional and community buildings in Nigeria. As our cities grow denser and more impersonal, the need for humane, socially activated spaces becomes more urgent. The courtyard offers a spatial framework that is both culturally resonant and functionally effective."
        ],
        category: "Design Philosophy",
        date: "2026-01-05",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        author: "VARTEX Studio",
    },
    {
        id: "light-as-building-material",
        title: "Light as Building Material: Controlling Daylight in Interior Spaces",
        excerpt: "Exploring how the deliberate manipulation of natural light can transform architectural spaces from mere enclosures into lived experiences.",
        content: [
            "Light is arguably the most powerful and least expensive material available to an architect. It costs nothing, weighs nothing, and has the capacity to transform the most modest space into something extraordinary. Yet despite its importance, daylight is often treated as an afterthought — something that happens to a building rather than something that is designed.",
            "In our practice, the design of light begins at the earliest conceptual stage. When we consider the orientation of a building, we are thinking about where the sun will be at different times of day and year. When we design a wall opening, we are choreographing a specific quality of light — direct or diffused, focused or ambient, warm or cool.",
            "Perforated screens are one of our preferred devices for controlling daylight. These elements, which have deep roots in Islamic and West African architectural traditions, filter sunlight into patterns of light and shadow that shift throughout the day. The effect is both functional (reducing glare and heat gain) and poetic (creating an ever-changing interior landscape).",
            "Clerestory windows and light shelves allow us to bring daylight deep into building plans while maintaining privacy and reducing direct solar exposure. By bouncing light off ceiling surfaces, we can illuminate interiors with soft, even light that minimizes the need for artificial lighting during daytime hours.",
            "We are also interested in the emotional and psychological dimensions of light. A dim, cave-like entrance that opens into a brightly lit courtyard creates a moment of compression and release that heightens spatial awareness. A narrow slot of light falling across a concrete wall can transform an otherwise plain surface into a sundial that marks the passing of hours.",
            "Mastering light requires patience, observation, and a willingness to study precedents — both historical and contemporary. It is, in many ways, the most architectural of all design challenges."
        ],
        category: "Design Philosophy",
        date: "2025-12-20",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1200&q=80",
        author: "VARTEX Studio",
    },
    {
        id: "project-retrospective-the-corinthian",
        title: "Project Retrospective: The Corinthian — Classical Language in Contemporary Form",
        excerpt: "Reflecting on the design challenges and discoveries of translating classical architectural principles into a modern residential context.",
        content: [
            "The Corinthian was, from the outset, a project about dialogue — between past and present, formality and comfort, symmetry and surprise. The client's brief called for a home with presence and permanence, drawing on classical architectural language without becoming a pastiche of any particular historical style.",
            "We began by studying the fundamental principles of classical composition: proportion, rhythm, axiality, and the hierarchical organization of facade elements. Rather than copying specific historical forms (Corinthian capitals, dentil cornices, etc.), we sought to understand the underlying logic that makes classical architecture feel balanced and complete.",
            "The resulting design uses a symmetrical front facade to establish a clear public identity. A central axis organizes the approach sequence, while carefully proportioned openings create a rhythm that is both formal and welcoming. But behind this composed exterior, the interior plan is deliberately asymmetrical, rresponding to the practical realities of modern residential life.",
            "One of the most rewarding aspects of the project was exploring how classical ideas about light and threshold translate into contemporary spatial experience. The main entrance, for example, uses a compressed vestibule opening into a double-height living space — a baroque sequence of spatial compression and release that creates a memorable arrival experience.",
            "The Corinthian taught us that tradition is most vital when it is treated as a source of principles rather than forms. The challenge is not to replicate the past, but to understand it deeply enough to reinvent it."
        ],
        category: "Project Stories",
        date: "2025-12-08",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        author: "VARTEX Studio",
    },
];
