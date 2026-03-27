export interface Badge {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  photo: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  respondsQuickly: boolean;
  itemsDiscarded: number;
  itemsCollected: number;
  wasteAvoided: number;
  badges: Badge[];
  memberSince: string;
}

export type Category = 'moveis' | 'geladeiras' | 'tvs' | 'eletrodomesticos' | 'outros';
export type ItemType = 'doacao' | 'pago';
export type Transport = 'entrega' | 'retirada';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: Category;
  images: string[];
  neighborhood: string;
  distance: number;
  type: ItemType;
  price?: number;
  transport: Transport;
  fitsInCar: boolean;
  urgent: boolean;
  userId: string;
  timeOfUse: string;
  material: string;
  weight: number;
  dimensions: { height: number; width: number; depth: number };
  wasteWeight: number;
  postedAt: string;
}

export const BADGES: Record<string, Badge> = {
  ecoIniciante: {
    id: 'ecoIniciante',
    label: 'Eco Iniciante',
    icon: '🌱',
    color: 'bg-green-100 text-green-700',
  },
  reaproveitador: {
    id: 'reaproveitador',
    label: 'Reaproveitador',
    icon: '♻️',
    color: 'bg-blue-100 text-blue-700',
  },
  usuarioConfiavel: {
    id: 'usuarioConfiavel',
    label: 'Usuário Confiável',
    icon: '🛡️',
    color: 'bg-amber-100 text-amber-700',
  },
  ativoComunidade: {
    id: 'ativoComunidade',
    label: 'Ativo na Comunidade',
    icon: '🤝',
    color: 'bg-purple-100 text-purple-700',
  },
};

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'João Silva',
    phone: '5592991234567',
    photo: 'https://images.unsplash.com/photo-1710357956769-232ef8e9e1aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMHNtaWxpbmd8ZW58MXx8fHwxNzc0NjMwNDYzfDA&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.9,
    reviewCount: 38,
    verified: true,
    respondsQuickly: true,
    itemsDiscarded: 12,
    itemsCollected: 8,
    wasteAvoided: 340,
    badges: [BADGES.usuarioConfiavel, BADGES.reaproveitador, BADGES.ativoComunidade, BADGES.ecoIniciante],
    memberSince: 'Jan 2023',
  },
  {
    id: 'u2',
    name: 'Maria Oliveira',
    phone: '5592998765432',
    photo: 'https://images.unsplash.com/photo-1621511346665-7881ca5b08f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwc21pbGluZ3xlbnwxfHx8fDE3NzQ2MzA0NjN8MA&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.7,
    reviewCount: 21,
    verified: true,
    respondsQuickly: true,
    itemsDiscarded: 7,
    itemsCollected: 14,
    wasteAvoided: 210,
    badges: [BADGES.ecoIniciante, BADGES.reaproveitador, BADGES.ativoComunidade],
    memberSince: 'Mar 2023',
  },
  {
    id: 'u3',
    name: 'Carlos Souza',
    phone: '5592995551234',
    photo: 'https://images.unsplash.com/photo-1671718648167-6b209c182480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbiUyMG1hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NzQ2MzA0Njd8MA&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.5,
    reviewCount: 13,
    verified: true,
    respondsQuickly: false,
    itemsDiscarded: 5,
    itemsCollected: 3,
    wasteAvoided: 120,
    badges: [BADGES.ecoIniciante, BADGES.usuarioConfiavel],
    memberSince: 'Jun 2023',
  },
];

export const ITEMS: Item[] = [
  {
    id: 'i1',
    name: 'Geladeira Duplex Frost Free',
    description:
      'Geladeira duplex em ótimo estado, funcionando perfeitamente. Compramos uma nova por isso estamos doando. Pequeno amassado na lateral que não compromete o funcionamento.',
    category: 'geladeiras',
    images: [
      'https://images.unsplash.com/photo-1758488438758-5e2eedf769ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZyaWdlcmF0b3IlMjBmcmlkZ2UlMjBob21lJTIwYXBwbGlhbmNlfGVufDF8fHx8MTc3NDYzMDQ2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Adrianópolis',
    distance: 2,
    type: 'doacao',
    transport: 'retirada',
    fitsInCar: false,
    urgent: true,
    userId: 'u1',
    timeOfUse: '5 anos',
    material: 'Aço inox e plástico',
    weight: 65,
    dimensions: { height: 167, width: 60, depth: 65 },
    wasteWeight: 65,
    postedAt: '2h atrás',
  },
  {
    id: 'i2',
    name: 'Sofá 3 Lugares',
    description:
      'Sofá retrátil e reclinável com tecido suede bege. Muito confortável, sem manchas ou rasgos. Mudança de casa nos obriga a vender.',
    category: 'moveis',
    images: [
      'https://images.unsplash.com/photo-1759722668253-1767030ad9b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2ZhJTIwY291Y2glMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3NDYwMTYwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Parque 10',
    distance: 3.5,
    type: 'pago',
    price: 350,
    transport: 'entrega',
    fitsInCar: false,
    urgent: false,
    userId: 'u2',
    timeOfUse: '3 anos',
    material: 'Madeira e tecido suede',
    weight: 80,
    dimensions: { height: 90, width: 220, depth: 95 },
    wasteWeight: 80,
    postedAt: '5h atrás',
  },
  {
    id: 'i3',
    name: 'Fogão 4 Bocas',
    description:
      'Fogão em bom estado com acendimento automático. Todas as bocas funcionando. Mesa de vidro impecável. Vendo pois comprei fogão maior.',
    category: 'eletrodomesticos',
    images: [
      'https://images.unsplash.com/photo-1772567732877-651f16e6e335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwc3RvdmUlMjBnYXMlMjBjb29rdG9wfGVufDF8fHx8MTc3NDYzMDQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Flores',
    distance: 1.2,
    type: 'pago',
    price: 180,
    transport: 'retirada',
    fitsInCar: true,
    urgent: false,
    userId: 'u3',
    timeOfUse: '2 anos',
    material: 'Aço inox e vidro',
    weight: 30,
    dimensions: { height: 85, width: 56, depth: 60 },
    wasteWeight: 30,
    postedAt: '1 dia atrás',
  },
  {
    id: 'i4',
    name: 'Máquina de Lavar 11kg',
    description:
      'Máquina de lavar em excelente estado, função turbo secagem, 11kg. Acompanha mangueira. Saindo por mudança de estado.',
    category: 'eletrodomesticos',
    images: [
      'https://images.unsplash.com/photo-1754732693535-7ffb5e1a51d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5nJTIwbWFjaGluZSUyMGxhdW5kcnklMjBhcHBsaWFuY2V8ZW58MXx8fHwxNzc0NTU1ODgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Aleixo',
    distance: 5,
    type: 'doacao',
    transport: 'retirada',
    fitsInCar: false,
    urgent: true,
    userId: 'u1',
    timeOfUse: '4 anos',
    material: 'Plástico e aço',
    weight: 55,
    dimensions: { height: 85, width: 60, depth: 55 },
    wasteWeight: 55,
    postedAt: '3h atrás',
  },
  {
    id: 'i5',
    name: 'Liquidificador 1200W',
    description:
      'Liquidificador de 1200W com 3 velocidades e função pulsar. Copo de vidro sem rachaduras. Funcionando perfeitamente.',
    category: 'eletrodomesticos',
    images: [
      'https://images.unsplash.com/photo-1762186540963-efa1702b3379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJsZW5kZXIlMjBraXRjaGVuJTIwYXBwbGlhbmNlfGVufDF8fHx8MTc3NDYzMDQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Centro',
    distance: 0.8,
    type: 'doacao',
    transport: 'entrega',
    fitsInCar: true,
    urgent: false,
    userId: 'u2',
    timeOfUse: '1 ano',
    material: 'Plástico e vidro',
    weight: 3,
    dimensions: { height: 40, width: 18, depth: 18 },
    wasteWeight: 3,
    postedAt: '6h atrás',
  },
  {
    id: 'i6',
    name: 'Estante de Livros',
    description:
      'Estante de madeira maciça com 5 prateleiras, capacidade para muitos livros. Cor amadeirada natural, ótima conservação.',
    category: 'moveis',
    images: [
      'https://images.unsplash.com/photo-1765277789203-b26f51b78f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBib29rc2hlbGYlMjBmdXJuaXR1cmUlMjBob21lfGVufDF8fHx8MTc3NDYzMDQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Vieiralves',
    distance: 4.2,
    type: 'doacao',
    transport: 'retirada',
    fitsInCar: false,
    urgent: false,
    userId: 'u3',
    timeOfUse: '6 anos',
    material: 'Madeira maciça',
    weight: 35,
    dimensions: { height: 180, width: 90, depth: 30 },
    wasteWeight: 35,
    postedAt: '2 dias atrás',
  },
];

export const CURRENT_USER = USERS[0];
