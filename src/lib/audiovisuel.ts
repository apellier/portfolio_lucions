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
    slug: "minute-lumiere-2",
    title: {
      fr: "Minute Lumière 2",
      en: "Light Minute 2"
    },
    role: {
      fr: "Chef Opérateur & Cadreur",
      en: "Director of Photography & Camera Operator"
    },
    dateAndLocation: {
      fr: "Juin 2025 · Paris, France",
      en: "June 2025 · Paris, France"
    },
    shortDescription: {
      fr: "Un exercice visuel explorant la lumière, le cadre et le mouvement dans un espace clos.",
      en: "A visual exercise exploring light, framing, and movement within a confined space."
    },
    description: {
      fr: "Minute Lumière 2 est une étude approfondie de la lumière en mouvement. Ce projet a été conçu pour tester les limites de l'exposition en basse lumière et la réactivité des capteurs face à des faisceaux mobiles. Il met en scène des jeux de clair-obscur intenses, où l'ombre sculpte l'espace et révèle des textures brutes.\n\nLa captation s'est concentrée sur des mouvements fluides de caméra pour accompagner les faisceaux de lumière, créant une chorégraphie immersive entre le sujet, le cadre et l'éclairage.",
      en: "Light Minute 2 is an in-depth study of light in motion. This project was designed to test the limits of low-light exposure and sensor responsiveness to moving beams. It features intense chiaroscuro play, where shadow shapes the space and reveals raw textures.\n\nThe capture focused on fluid camera movements to follow the light beams, creating an immersive choreography between subject, framing, and lighting."
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
    slug: "l-ombre-du-doute",
    title: {
      fr: "L'Ombre du Doute",
      en: "Shadow of Doubt"
    },
    role: {
      fr: "Directeur de la Photographie",
      en: "Director of Photography"
    },
    dateAndLocation: {
      fr: "Mars 2025 · Lyon, France",
      en: "March 2025 · Lyon, France"
    },
    shortDescription: {
      fr: "Court-métrage dramatique de fiction, tourné exclusivement de nuit dans des décors urbains.",
      en: "Dramatic narrative short film, shot exclusively at night in urban settings."
    },
    description: {
      fr: "Pour ce court-métrage de fiction, l'enjeu principal était de restituer l'atmosphère étouffante et mystérieuse d'un thriller psychologique. Le choix a été fait de travailler avec des sources de lumières existantes (éclairage public, enseignes néon) complétées par des projecteurs LED discrets pour modeler les visages sans dénaturer le réalisme de la nuit lyonnaise.\n\nLe travail de cadre a privilégié des compositions larges et graphiques, soulignant la solitude du personnage principal dans l'immensité de la ville endormie.",
      en: "For this narrative short, the main challenge was to capture the stifling and mysterious atmosphere of a psychological thriller. The choice was made to work with existing light sources (street lighting, neon signs) complemented by discrete LED fixtures to shape faces without losing the realism of the Lyon night.\n\nThe camera framing favored wide, graphic compositions, highlighting the main character's isolation within the sleeping city."
    },
    coverImage: "/photos/104-fantomes.jpg",
    gallery: [
      "/photos/crane-fond-noir.jpg",
      "/photos/twenty.jpg",
      "/photos/arche-barrage.jpg"
    ]
  },
  {
    slug: "nuit-fauve",
    title: {
      fr: "Clip Musical — Nuit Fauve",
      en: "Music Video — Nuit Fauve"
    },
    role: {
      fr: "Chef Électricien (Gaffer)",
      en: "Gaffer / Lighting Designer"
    },
    dateAndLocation: {
      fr: "Novembre 2024 · Bruxelles, Belgique",
      en: "November 2024 · Brussels, Belgium"
    },
    shortDescription: {
      fr: "Création d'une ambiance lumineuse colorée et expressionniste pour un clip de musique électronique.",
      en: "Creation of a colorful, expressionist lighting environment for an electronic music video."
    },
    description: {
      fr: "Nuit Fauve est un clip musical indépendant pour un artiste de musique techno-industrielle. L'intention visuelle reposait sur des contrastes colorés extrêmes et une esthétique très graphique.\n\nEn tant que chef électricien, j'ai supervisé l'installation de structures d'éclairage mobiles avec des projecteurs RVB programmés en rythme avec la musique. Les projecteurs ont été utilisés pour créer des stroboscopes cinétiques et des nappes de couleurs saturées (rouge écarlate, bleu profond, orange ambré), conférant au décor industriel une dimension mystique.",
      en: "Nuit Fauve is an independent music video for a techno-industrial artist. The visual intent relied on extreme color contrasts and a highly graphic aesthetic.\n\nAs gaffer, I oversaw the setup of dynamic lighting structures with RGB fixtures programmed in sync with the beat. The lights were utilized to create kinetic strobes and saturated color washes (scarlet red, deep blue, amber orange), adding a mystical dimension to the industrial set."
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
