export interface SectionItem {
  id: string;
  type:
    | 'hero'
    | 'video-concept'
    | 'simulation-features'
    | 'universe'
    | 'magic'
    | 'water-based'
    | 'ghost'
    | 'story-single'
    | 'story-two-col'
    | 'locked'
    | 'fa-poems'
    | 'gallery'
    | 'final-story';
  title?: string;
  subtitle?: string;
  keyLabel?: string;
  octaves?: string;
  frequency?: string;
  leftImage?: string;
  rightImage?: string;
  heroImage?: string;
  themeColor?: 'cyan' | 'orange' | 'purple' | 'green' | 'fire';
}

export const SECTIONS: SectionItem[] = [
  {
    id: 'hero',
    type: 'hero',
    title: "SU'rreal PIANO",
    subtitle: 'SIMULATION',
  },
  {
    id: 'video-concept',
    type: 'video-concept',
    title: 'The Concept',
    subtitle: 'SU\'rreal Piano Simulation in Action',
  },
  {
    id: 'simulation-features',
    type: 'simulation-features',
    title: "SU'RREAL PIANO SIMULATION",
    subtitle: 'Multisensory Architecture & Living Mechanics',
    heroImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/MYDREAMPIANO.JPEG',
  },
  {
    id: 'universe',
    type: 'universe',
    title: 'The Universe',
    subtitle: 'A Simultaneous Chronology of Love & Life',
    heroImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/MYDREAMPIANO.JPEG',
  },
  {
    id: 'magic',
    type: 'magic',
    title: 'The Magic',
    subtitle: 'Frequencies, Colors & Perception',
  },
  {
    id: 'water-based',
    type: 'water-based',
    title: 'How is the entire artwork completely WATER BASED?',
    subtitle: 'TouchDesigner Generative Engine in Real-Time',
  },
  {
    id: 'ghost',
    type: 'ghost',
    title: 'A COLORFUL GHOST LIVES HERE!',
    heroImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/myghost.png',
  },
  {
    id: 'do-1',
    type: 'story-single',
    title: '1.DO - C',
    keyLabel: '1st key',
    octaves: 'C3, C2, C5',
    frequency: '130.81 Hz',
    leftImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/1.c3du%CC%88z.png',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/1.c3.png',
    themeColor: 'cyan',
  },
  {
    id: 'do-2-3',
    type: 'story-two-col',
    title: 'DO - C (2nd & 3rd Octaves)',
    leftImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/8.c4.png',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/15.c5yeni.png',
    themeColor: 'orange',
  },
  {
    id: 're-1',
    type: 'story-single',
    title: '1.RE - D',
    keyLabel: '2nd key',
    octaves: 'D3, D2, D5',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/2.D3.png',
    themeColor: 'cyan',
  },
  {
    id: 're-2',
    type: 'story-single',
    title: '2.RE - D',
    keyLabel: '9th key',
    octaves: 'D4, D3, D6',
    leftImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/9.d4du%CC%88z.png',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/9.d4.png',
    themeColor: 'orange',
  },
  {
    id: 're-3-locked',
    type: 'locked',
    title: '3.RE - D',
    keyLabel: '16th key',
    leftImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/16d5du%CC%88z.png',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/16d5.png',
    themeColor: 'cyan',
  },
  {
    id: 'mi-1',
    type: 'story-single',
    title: '1.MI - E',
    keyLabel: '3rd key',
    octaves: 'E3, E2, E5',
    leftImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/e3du%CC%88z.png',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/e3.png',
    themeColor: 'cyan',
  },
  {
    id: 'mi-2',
    type: 'story-single',
    title: '2.MI - E',
    keyLabel: '10th key',
    octaves: 'E4, E3, E6',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/10.E4.png',
    themeColor: 'orange',
  },
  {
    id: 'fa-1',
    type: 'story-single',
    title: '1.FA - F',
    keyLabel: '4th key',
    octaves: 'F3, F2, F5',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/f3.png',
    themeColor: 'cyan',
  },
  {
    id: 'fa-2',
    type: 'fa-poems',
    title: '2.FA - F',
    keyLabel: '11th key',
    octaves: 'F4, F3, F6',
    leftImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/11.F4.du%CC%88z.png',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/11.F4.png',
    themeColor: 'purple',
  },
  {
    id: 'sol-1',
    type: 'story-single',
    title: '1.SOL - G',
    keyLabel: '5th key',
    octaves: 'G3, G2, G5',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/5.G3.png',
    themeColor: 'purple',
  },
  {
    id: 'sol-2',
    type: 'story-single',
    title: '2.SOL - G',
    keyLabel: '12th key',
    octaves: 'G4, G3, G6',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/12.G4.png',
    themeColor: 'orange',
  },
  {
    id: 'si-1',
    type: 'story-single',
    title: '1.SI - B',
    keyLabel: '7th key',
    octaves: 'B3, B2, B5',
    leftImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/7.B3.du%CC%88z.png',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/7.B3.png',
    themeColor: 'green',
  },
  {
    id: 'si-2-fire',
    type: 'story-single',
    title: '2.SI - B',
    keyLabel: '14th key',
    octaves: 'B4, B3, B6',
    leftImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/14.B4.du%CC%88z.png',
    rightImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/14.B4.png',
    themeColor: 'fire',
  },
  {
    id: 'gallery',
    type: 'gallery',
    title: 'Visual Gallery',
    subtitle: 'Multilayered Chromatic Chronicles',
  },
  {
    id: 'final-story',
    type: 'final-story',
    title: 'The Infinite Love Story of 7 Notes',
    heroImage: 'https://raw.githubusercontent.com/busrasuhaydar/buyukpblog/main/assets/MYDREAMPIANO.JPEG',
  },
];
