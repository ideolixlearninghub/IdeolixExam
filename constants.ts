
export const GRADES = [
  'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];

export const CURRICULUM: { [key: string]: { [key: string]: string[] } } = {
    'Kindergarten': {
        "Math": ["Counting to 100", "Writing Numbers 0-20", "Comparing Numbers", "Intro to Addition & Subtraction", "Identifying Shapes", "Measurement Basics"],
        "Science": ["Pushes and Pulls", "Needs of Plants and Animals", "Observing Weather Patterns", "The Five Senses", "Classifying Materials"],
        "Literature Arts": ["Alphabet Recognition (Upper/Lowercase)", "Phonemic Awareness (Sounds)", "Identifying Characters & Setting", "Answering Questions about a Story", "Writing Letters & Simple Words"]
    },
    'Grade 1': {
        "Math": ["Addition & Subtraction within 20", "Place Value (Tens and Ones)", "Counting to 120", "Telling Time (Hour and Half-Hour)", "Understanding Halves and Quarters", "Measuring Length"],
        "Science": ["Light and Sound", "Animal and Plant Structures", "Patterns of Sun, Moon, and Stars", "Life Cycles", "Inheritance of Traits"],
        "Literature Arts": ["Retelling Stories with Key Details", "Reading with Fluency", "Writing Opinion Pieces", "Writing Narratives", "Using Commas and End Punctuation"]
    },
    'Grade 2': {
        "Math": ["Addition & Subtraction within 1000", "Place Value (Hundreds)", "Foundations of Multiplication", "Working with Money", "Measuring Length in Standard Units", "Telling Time to 5 Minutes"],
        "Science": ["Properties of Matter", "Ecosystems & Interdependence", "Earth's Processes (Erosion)", "Plant Growth and Needs", "Animal Habitats"],
        "Literature Arts": ["Comparing Two Versions of a Story", "Writing Informative Texts", "Using Adjectives and Adverbs", "Understanding Collective Nouns", "Using Apostrophes in Contractions"]
    },
    'Grade 3': {
        "Math": ["Multiplication & Division within 100", "Understanding Fractions as Numbers", "Area and Perimeter", "Telling Time to the Minute", "Interpreting Bar Graphs and Pictographs", "Rounding Numbers"],
        "Science": ["Forces and Interactions (Magnetism)", "Life Cycles and Traits", "Weather and Climate Impacts", "Understanding Fossils", "Ecosystem Dynamics"],
        "Literature Arts": ["Determining the Main Idea and Details", "Understanding Character's Point of View", "Writing Narrative Stories with Dialogue", "Using Conjunctions", "Forming Possessives"]
    },
    'Grade 4': {
        "Math": ["Multi-digit Multiplication", "Multi-digit Division", "Fraction Equivalence and Ordering", "Adding and Subtracting Fractions", "Understanding Decimals and Fractions", "Lines and Angles"],
        "Science": ["Energy Transfer and Waves", "Plant and Animal Structures/Functions", "Earth's Surface Processes (Erosion)", "Properties of Light", "Renewable & Non-renewable Resources"],
        "Literature Arts": ["Citing Textual Evidence", "Analyzing Story Themes", "Writing Opinion Pieces with Reasons", "Figurative Language (Similes & Metaphors)", "Formal vs. Informal Language"]
    },
    'Grade 5': {
        "Math": ["Multiplying and Dividing Fractions", "Operations with Decimals", "Understanding Volume of Prisms", "Graphing on the Coordinate Plane", "Order of Operations (PEMDAS)", "Classifying 2D Figures"],
        "Science": ["Structure and Properties of Matter (Atoms)", "Energy in Ecosystems (Food Webs)", "Earth's Systems (Water Cycle, Atmosphere)", "The Solar System and Gravity", "Mixtures and Solutions"],
        "Literature Arts": ["Integrating Information from Multiple Texts", "Comparing Story Structures (e.g., plays, poems)", "Writing Research Reports", "Understanding Perfect Verb Tenses", "Using Correlative Conjunctions"]
    },
    'Grade 6': {
        "Math": ["Ratios & Proportional Relationships", "Dividing Fractions by Fractions", "Operations with Integers (Negative Numbers)", "Solving One-Variable Equations", "Statistical Variability (Mean, Median, Mode)"],
        "Science": ["Space Systems (Earth-Sun-Moon)", "Weather and Climate Systems", "Human Impact on Environment", "Cells and the Basis of Life", "Thermal Energy Transfer"],
        "Literature Arts": ["Analyzing Plot and Character Development", "Citing Evidence to Support Analysis", "Writing Arguments with Claims and Evidence", "Using Pronouns Correctly (e.g., intensive)", "Varying Sentence Patterns"]
    },
    'Grade 7': {
        "Math": ["Analyzing Proportional Relationships", "Operations with Rational Numbers", "Solving Multi-Step Equations & Inequalities", "Geometry: Area and Circumference of Circles", "Simple and Compound Probability"],
        "Science": ["Cell Structure and Function", "Photosynthesis and Cellular Respiration", "Ecosystems and Population Dynamics", "Natural Selection and Adaptations", "Properties of Waves and Energy"],
        "Literature Arts": ["Determining Theme and Central Idea", "Analyzing Author's Purpose and Point of View", "Writing Informative Texts with Evidence", "Using Phrases and Clauses in Sentences", "Spelling and Academic Vocabulary"]
    },
    'Grade 8': {
        "Math": ["Understanding Irrational Numbers", "Solving Linear Equations and Systems of Equations", "Defining, Evaluating, and Comparing Functions", "The Pythagorean Theorem", "Investigating Bivariate Data (Scatter Plots)"],
        "Science": ["Newton's Laws of Motion", "Structure of Matter (Periodic Table Intro)", "Chemical Reactions (Balancing Equations)", "Genetics and Heredity (Punnett Squares)", "Earth's History (Geologic Time)"],
        "Literature Arts": ["Analyzing Dialogue and Incidents in Fiction", "Evaluating an Author's Argument and Claims", "Writing Narratives with Pacing and Dialogue", "Understanding Active and Passive Voice", "Using Verbs in Different Moods"]
    },
    'Grade 9': {
        "Math": ["Solving Quadratic Equations", "Graphing Linear, Quadratic, and Exponential Functions", "Geometric Congruence and Proofs", "Introduction to Trigonometry (SOHCAHTOA)", "Interpreting Categorical and Quantitative Data"],
        "Science": ["Cellular Biology (Organelles, Transport)", "Ecosystem Dynamics and Energy Flow", "Introduction to Chemistry (Atoms, Bonding)", "Kinematics (Motion, Velocity, Acceleration)", "Designing Scientific Investigations"],
        "Literature Arts": ["Analyzing Themes in Literature Across Cultures", "Writing Persuasive Essays with Counterclaims", "Understanding Symbolism and Allegory", "Advanced Grammar and Parallel Structure", "Analyzing Foundational U.S. Documents"]
    },
    'Grade 10': {
        "Math": ["Advanced Polynomial Functions", "Trigonometric Functions and the Unit Circle", "Similarity and Geometric Proofs", "Probability of Compound and Conditional Events", "Understanding and Using Logarithms"],
        "Science": ["Genetics and DNA Technology", "Principles of Evolutionary Biology", "Chemical Reactions and Stoichiometry", "Thermodynamics and Energy Transfer", "Earth's Systems and Global Climate Change"],
        "Literature Arts": ["Analyzing World Literature", "Writing Argumentative Essays with Synthesized Evidence", "Identifying Irony and Satire", "Rhetorical Analysis of Speeches", "Building Vocabulary from Word Roots"]
    },
    'Grade 11': {
        "Math": ["Graphing and Analyzing Advanced Functions (Rational, Logarithmic)", "Trigonometric Identities", "Introduction to Vectors and Matrices", "Statistical Inference and Margin of Error", "Arithmetic and Geometric Sequences and Series"],
        "Science": ["Advanced Cell Biology and Processes", "Introduction to Organic Chemistry", "Physics: Mechanics, Waves, and Optics", "Human Anatomy and Physiology", "Environmental Science and Sustainability"],
        "Literature Arts": ["Analyzing American Literature by Period", "Writing Analytical and Research-Based Essays", "Understanding Literary Movements and their Context", "Evaluating an Author's Style and Purpose", "Advanced Rhetoric and Persuasion"]
    },
    'Grade 12': {
        "Math": ["Calculus: Limits & Continuity", "Calculus: Derivatives and Applications", "Calculus: Integrals and Applications", "Advanced Statistics and Probability Models", "Linear Algebra Concepts"],
        "Science": ["Molecular Biology (DNA/RNA, Biotechnology)", "Organic Chemistry Reactions", "Physics: Electricity & Magnetism", "Advanced Anatomy and Physiology", "Designing and Conducting Scientific Research"],
        "Literature Arts": ["Principles of Literary Criticism", "Analyzing British Literature by Period", "Synthesizing Ideas in Research Papers", "Rhetorical Analysis of Complex Texts", "Preparing a Major Research Paper"]
    }
};

export const PRACTICE_QUESTION_COUNT = 30;
export const ASSESSMENT_QUESTION_COUNT = 60;
export const PRACTICE_PASS_PERCENTAGE = 0.8; // 80%
export const ASSESSMENT_PASS_PERCENTAGE = 0.85; // 85%
