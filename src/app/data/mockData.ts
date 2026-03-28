export interface Badge {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
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
  badgesLocked?: Badge[];
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
    color: 'green',
    description: 'Primeiro descarte',
  },
  reaproveitador: {
    id: 'reaproveitador',
    label: 'Reaproveitador',
    icon: '♻️',
    color: 'blue',
    description: '5 itens descartados',
  },
  usuarioConfiavel: {
    id: 'usuarioConfiavel',
    label: 'Usuário Confiável',
    icon: '🛡️',
    color: 'amber',
    description: '10 avaliações',
  },
  ativoComunidade: {
    id: 'ativoComunidade',
    label: 'Ativo na Comunidade',
    icon: '🤝',
    color: 'purple',
    description: '15 interações',
  },
  guardiaoVerde: {
    id: 'guardiaoVerde',
    label: 'Guardião Verde',
    icon: '🌿',
    color: 'teal',
    description: '100kg evitados',
  },
  especialistaDescarte: {
    id: 'especialistaDescarte',
    label: 'Especialista em Descarte',
    icon: '📦',
    color: 'indigo',
    description: '10 descartes',
  },
  economiaCircular: {
    id: 'economiaCircular',
    label: 'Economia Circular',
    icon: '🔄',
    color: 'pink',
    description: '5 coletados',
  },
  heroeLocal: {
    id: 'heroeLocal',
    label: 'Herói Local',
    icon: '⭐',
    color: 'orange',
    description: 'Avaliação 4.5+',
  },
  conscienciaAmbiental: {
    id: 'conscienciaAmbiental',
    label: 'Consciência Ambiental',
    icon: '🌍',
    color: 'blue',
    description: '200kg evitados',
  },
  superEco: {
    id: 'superEco',
    label: 'Super Eco',
    icon: '🏆',
    color: 'amber',
    description: 'Descarte 20 itens',
  },
  cincoEstrelas: {
    id: 'cincoEstrelas',
    label: '5 Estrelas',
    icon: '✨',
    color: 'purple',
    description: '50 avaliações',
  },
  mestre: {
    id: 'mestre',
    label: 'Mestre do Descarte',
    icon: '👑',
    color: 'amber',
    description: '500kg evitados',
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
    itemsDiscarded: 13,
    itemsCollected: 0,
    wasteAvoided: 340,
    badges: [BADGES.usuarioConfiavel, BADGES.reaproveitador, BADGES.ativoComunidade, BADGES.ecoIniciante],
    badgesLocked: [BADGES.guardiaoVerde, BADGES.especialistaDescarte, BADGES.economiaCircular, BADGES.heroeLocal, BADGES.conscienciaAmbiental, BADGES.superEco, BADGES.cincoEstrelas, BADGES.mestre], 
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
    badgesLocked: [BADGES.guardiaoVerde, BADGES.especialistaDescarte, BADGES.economiaCircular, BADGES.heroeLocal, BADGES.conscienciaAmbiental, BADGES.superEco, BADGES.cincoEstrelas, BADGES.mestre],
    memberSince: 'Mar 2023',
  },
  {
    id: 'u3',
    name: 'Carlos Souza',
    phone: '5592995551234',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    rating: 4.5,
    reviewCount: 13,
    verified: true,
    respondsQuickly: false,
    itemsDiscarded: 5,
    itemsCollected: 3,
    wasteAvoided: 120,
    badges: [BADGES.ecoIniciante, BADGES.usuarioConfiavel],
    badgesLocked: [BADGES.guardiaoVerde, BADGES.especialistaDescarte, BADGES.economiaCircular, BADGES.heroeLocal, BADGES.conscienciaAmbiental, BADGES.superEco, BADGES.cincoEstrelas, BADGES.mestre],
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
  {
    id: 'i7',
    name: 'Mesa de Jantar 4 Lugares',
    description:
      'Mesa de jantar de madeira para 4 lugares, tampo em ótimo estado. Já foi substituída por uma maior e está pronta para retirada.',
    category: 'moveis',
    images: [
      'https://images.unsplash.com/photo-1617104678098-de229db51175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    neighborhood: 'Adrianópolis',
    distance: 2.8,
    type: 'doacao',
    transport: 'retirada',
    fitsInCar: false,
    urgent: false,
    userId: 'u1',
    timeOfUse: '6 anos',
    material: 'Madeira e MDF',
    weight: 28,
    dimensions: { height: 75, width: 120, depth: 80 },
    wasteWeight: 28,
    postedAt: '4 dias atrás',
  },
  {
    id: 'i8',
    name: 'Micro-ondas 32L',
    description:
      'Micro-ondas com painel digital funcionando normalmente. Possui marcas leves de uso na parte externa.',
    category: 'eletrodomesticos',
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    neighborhood: 'Parque 10',
    distance: 3.1,
    type: 'doacao',
    transport: 'retirada',
    fitsInCar: true,
    urgent: false,
    userId: 'u2',
    timeOfUse: '3 anos',
    material: 'Aço e plástico',
    weight: 14,
    dimensions: { height: 32, width: 52, depth: 42 },
    wasteWeight: 14,
    postedAt: '1 semana atrás',
  },
  {
    id: 'i10',
    name: 'Cadeira de Escritório',
    description:
      'Cadeira giratória com regulagem de altura, encosto firme e rodas em bom estado. Ideal para home office.',
    category: 'moveis',
    images: [
      'https://images.unsplash.com/photo-1765277789203-b26f51b78f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBib29rc2hlbGYlMjBmdXJuaXR1cmUlMjBob21lfGVufDF8fHx8MTc3NDYzMDQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Flores',
    distance: 1.9,
    type: 'doacao',
    transport: 'entrega',
    fitsInCar: true,
    urgent: false,
    userId: 'u3',
    timeOfUse: '2 anos',
    material: 'Metal e tecido',
    weight: 11,
    dimensions: { height: 110, width: 62, depth: 60 },
    wasteWeight: 11,
    postedAt: '2 semanas atrás',
  },
  {
    id: 'i11',
    name: 'Armário de Cozinha',
    description:
      'Armário aéreo com 3 portas, estrutura firme e dobradiças funcionando. Já desmontado para facilitar retirada.',
    category: 'moveis',
    images: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    neighborhood: 'Centro',
    distance: 2.2,
    type: 'doacao',
    transport: 'retirada',
    fitsInCar: false,
    urgent: false,
    userId: 'u2',
    timeOfUse: '5 anos',
    material: 'MDF',
    weight: 24,
    dimensions: { height: 70, width: 120, depth: 35 },
    wasteWeight: 24,
    postedAt: '3 semanas atrás',
  },
  {
    id: 'i12',
    name: 'Ventilador de Coluna',
    description:
      'Ventilador 3 velocidades com hélices balanceadas e grade protetora intacta. Ótimo para ambientes médios.',
    category: 'eletrodomesticos',
    images: [
      'https://images.unsplash.com/photo-1762186540963-efa1702b3379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJsZW5kZXIlMjBraXRjaGVuJTIwYXBwbGlhbmNlfGVufDF8fHx8MTc3NDYzMDQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Adrianópolis',
    distance: 2.4,
    type: 'doacao',
    transport: 'entrega',
    fitsInCar: true,
    urgent: false,
    userId: 'u3',
    timeOfUse: '2 anos',
    material: 'Plástico e metal',
    weight: 6,
    dimensions: { height: 130, width: 45, depth: 45 },
    wasteWeight: 6,
    postedAt: '1 mês atrás',
  },
  {
    id: 'i13',
    name: 'Rack para TV',
    description:
      'Rack baixo com nichos e duas portas, sem empeno. Bom estado estrutural, apenas pequenos riscos na lateral.',
    category: 'moveis',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    neighborhood: 'Parque 10',
    distance: 3.9,
    type: 'pago',
    price: 220,
    transport: 'retirada',
    fitsInCar: false,
    urgent: false,
    userId: 'u2',
    timeOfUse: '4 anos',
    material: 'MDP e metal',
    weight: 19,
    dimensions: { height: 58, width: 140, depth: 40 },
    wasteWeight: 19,
    postedAt: '1 mês atrás',
  },
  {
    id: 'i14',
    name: 'Lavadora de Alta Pressão',
    description:
      'Lavadora portátil com mangueira e bicos originais. Motor funcionando, ideal para limpeza de garagem.',
    category: 'eletrodomesticos',
    images: [
      'https://images.unsplash.com/photo-1754732693535-7ffb5e1a51d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5nJTIwbWFjaGluZSUyMGxhdW5kcnklMjBhcHBsaWFuY2V8ZW58MXx8fHwxNzc0NTU1ODgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Aleixo',
    distance: 5.2,
    type: 'pago',
    price: 300,
    transport: 'retirada',
    fitsInCar: true,
    urgent: false,
    userId: 'u1',
    timeOfUse: '3 anos',
    material: 'Plástico ABS e metal',
    weight: 8,
    dimensions: { height: 40, width: 28, depth: 25 },
    wasteWeight: 8,
    postedAt: '2 meses atrás',
  },
  {
    id: 'i15',
    name: 'Criado-Mudo',
    description:
      'Criado-mudo com duas gavetas, trilhos funcionando e pintura preservada. Perfeito para quarto ou escritório.',
    category: 'moveis',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    neighborhood: 'Flores',
    distance: 1.5,
    type: 'doacao',
    transport: 'entrega',
    fitsInCar: true,
    urgent: false,
    userId: 'u1',
    timeOfUse: '2 anos',
    material: 'MDF',
    weight: 7,
    dimensions: { height: 55, width: 42, depth: 35 },
    wasteWeight: 7,
    postedAt: '2 meses atrás',
  },
  {
    id: 'i16',
    name: 'Aspirador de Pó',
    description:
      'Aspirador de pó com cabo de 5m e acessórios completos. Bom poder de sucção e filtro recém-trocado.',
    category: 'eletrodomesticos',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    neighborhood: 'Centro',
    distance: 0.9,
    type: 'doacao',
    transport: 'retirada',
    fitsInCar: true,
    urgent: false,
    userId: 'u3',
    timeOfUse: '3 anos',
    material: 'Plástico e metal',
    weight: 5,
    dimensions: { height: 32, width: 30, depth: 45 },
    wasteWeight: 5,
    postedAt: '3 meses atrás',
  },
  {
    id: 'i17',
    name: 'Prateleira Modular',
    description:
      'Conjunto de prateleiras modulares para sala ou escritório. Fácil instalação e ótimo acabamento.',
    category: 'moveis',
    images: [
      'https://images.unsplash.com/photo-1765277789203-b26f51b78f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBib29rc2hlbGYlMjBmdXJuaXR1cmUlMjBob21lfGVufDF8fHx8MTc3NDYzMDQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Adrianópolis',
    distance: 2.6,
    type: 'doacao',
    transport: 'retirada',
    fitsInCar: true,
    urgent: false,
    userId: 'u2',
    timeOfUse: '1 ano',
    material: 'Madeira e metal',
    weight: 12,
    dimensions: { height: 160, width: 80, depth: 30 },
    wasteWeight: 12,
    postedAt: '4 meses atrás',
  },
  {
    id: 'i18',
    name: 'Batedeira Planetária',
    description:
      'Batedeira com tigela de inox e três batedores originais. Motor em bom estado e sem folgas.',
    category: 'eletrodomesticos',
    images: [
      'https://images.unsplash.com/photo-1762186540963-efa1702b3379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJsZW5kZXIlMjBraXRjaGVuJTIwYXBwbGlhbmNlfGVufDF8fHx8MTc3NDYzMDQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    neighborhood: 'Parque 10',
    distance: 3.3,
    type: 'pago',
    price: 160,
    transport: 'entrega',
    fitsInCar: true,
    urgent: false,
    userId: 'u1',
    timeOfUse: '2 anos',
    material: 'Metal e plástico',
    weight: 4,
    dimensions: { height: 35, width: 24, depth: 33 },
    wasteWeight: 4,
    postedAt: '5 meses atrás',
  },
];

export const CURRENT_USER = USERS[0];
