export interface AudiovisuelExperience {
  slug: string;
  title: {
    fr: string;
    en: string;
  };
  role: {
    fr: string;
    en: string;
  };
  dateAndLocation: {
    fr: string;
    en: string;
  };
  shortDescription: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  coverImage: string;
  gallery: string[];
  videoUrl?: string; // empty/placeholder as requested
  hasVideo?: boolean;
}

const experiences: AudiovisuelExperience[] = [
  {
    slug: "captation-live-festival",
    title: {
      fr: "Captation Live — Festival Local",
      en: "Live Recording — Local Festival"
    },
    role: {
      fr: "Cadreur / Opérateur Prise de Vue (OPV)",
      en: "Camera Operator"
    },
    dateAndLocation: {
      fr: "Mai 2025 · Lille, France",
      en: "May 2025 · Lille, France"
    },
    shortDescription: {
      fr: "Cadrage et captation multi-caméras pour des groupes de musique locaux lors d'un festival associatif.",
      en: "Multi-camera framing and recording for local bands during a community festival."
    },
    description: {
      fr: "Sur ce festival de musique local, j'ai assuré le cadrage à l'aide d'une caméra d'épaule. L'enjeu principal était de suivre le rythme des musiciens sur scène et de s'adapter en temps réel aux variations dynamiques de l'éclairage de concert. Ce travail a demandé une grande réactivité pour maintenir la mise au point manuelle et composer des cadres énergiques en direct.",
      en: "At this local music festival, I operated a shoulder-mounted camera. The main challenge was to follow the rhythm of the musicians on stage and adapt in real time to the dynamic variations of concert lighting. This work required high responsiveness to maintain manual focus and compose energetic frames live."
    },
    coverImage: "/photos/camera-stop.jpg",
    gallery: [
      "/photos/sun-2.jpg",
      "/photos/sun-3.jpg",
      "/photos/sun-1.jpg"
    ],
    videoUrl: "", // Heavy video placeholder
    hasVideo: true
  },
  {
    slug: "assistant-lumiere-court-metrage",
    title: {
      fr: "Court-métrage : La Nuit des Étoiles",
      en: "Short Film: Starry Night"
    },
    role: {
      fr: "Assistant Lumière / Électricien",
      en: "Lighting Assistant / Spark"
    },
    dateAndLocation: {
      fr: "Février 2025 · Paris, France",
      en: "February 2025 · Paris, France"
    },
    shortDescription: {
      fr: "Installation des projecteurs, mise en place des gélatines et gestion de l'alimentation électrique sur un tournage étudiant.",
      en: "Setting up fixtures, gels, and managing power distribution on a student film set."
    },
    description: {
      fr: "En tant qu'assistant lumière, mon rôle consistait à installer et régler les projecteurs (projecteurs LED et mandarines) selon les directives du chef de poste. J'ai géré le câblage électrique sur le plateau, la mise en place des diffuseurs, des drapeaux et des gélatines de couleur pour modeler l'ambiance nocturne du film. Un travail technique rigoureux pour assurer la sécurité électrique sur le plateau et la cohérence esthétique de la lumière.",
      en: "As a lighting assistant, my role was to set up and adjust lighting fixtures (LED and tungsten lights) according to the gaffer's instructions. I managed power cabling on set, diffusers, flags, and color gels to shape the night-time mood of the film. A rigorous technical job to ensure electrical safety on set and aesthetic light consistency."
    },
    coverImage: "/photos/104-fantomes.jpg",
    gallery: [
      "/photos/crane-fond-noir.jpg",
      "/photos/twenty.jpg",
      "/photos/arche-barrage.jpg"
    ]
  },
  {
    slug: "installation-scenique-agora",
    title: {
      fr: "Installation Scénique — Théâtre de l'Agora",
      en: "Stage Setup — Agora Theater"
    },
    role: {
      fr: "Technicien Plateau / Machiniste",
      en: "Stage Technician / Stagehand"
    },
    dateAndLocation: {
      fr: "Octobre 2024 · Évry, France",
      en: "October 2024 · Évry, France"
    },
    shortDescription: {
      fr: "Montage des structures scéniques, installation du matériel d'éclairage et régie plateau pour une compagnie de théâtre.",
      en: "Assembling stage trusses, installing lighting gear, and handling backstage duties for a theater company."
    },
    description: {
      fr: "Pour ce spectacle théâtral, j'ai participé au déchargement du matériel de tournée, au montage des structures scéniques en aluminium (ponts de lumière) et à l'installation des projecteurs asservis. J'ai également assuré la manipulation des décors et des accessoires lors des changements de scène rapides en coulisses durant les représentations. Ce poste a demandé une rigueur d'organisation constante et un respect strict des règles de sécurité régissant les ERP.",
      en: "For this theatrical show, I helped unload touring gear, assemble aluminum lighting structures (trusses), and hang automated lighting fixtures. I also handled prop and scenery movements during rapid scene changes backstage during performances. This position required constant organizational rigor and strict compliance with safety regulations."
    },
    coverImage: "/photos/horror-couloir.jpg",
    gallery: [
      "/photos/ampoule.jpg",
      "/photos/essai-peu-sur.jpg",
      "/photos/reflet-psyche.jpg"
    ]
  }
];

export function getAllExperiences(): AudiovisuelExperience[] {
  return [...experiences];
}

export function getExperienceBySlug(slug: string): AudiovisuelExperience | undefined {
  return experiences.find((exp) => exp.slug === slug);
}
