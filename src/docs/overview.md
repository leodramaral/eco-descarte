# Documentação de Fluxos do MVP — EcoDescarte

## 1. Objetivo deste documento

Este documento descreve o estado atual do projeto **EcoDescarte** e define o comportamento esperado do MVP, dividido em duas partes:

1. **Fluxo funcional final do MVP**: como as jornadas devem funcionar quando a aplicação estiver fechada como produto local.
2. **Descrição técnica do que ainda precisa ser implementado**: arquitetura, persistência e responsabilidades de cada parte.

### Premissas adotadas

- Não haverá backend, API nem persistência remota neste MVP.
- Toda a persistência será **local**, no navegador.
- O estado global da aplicação deve usar **Redux Toolkit**.
- O Redux persistido será a **fonte única de dados**.
- `mockData.ts` deixará de ser fonte direta de leitura das telas e passará a existir apenas como **seed inicial**.
- Não deve haver mistura entre dados mockados e dados persistidos em tempo de execução.
- Não haverá usuário logado por padrão na primeira abertura.
- O acesso inicial será feito por **telefone**.
- O cadastro completo do usuário terá **nome, telefone e foto**.
- Em fluxos com imagem, o envio será **opcional**; quando não houver imagem enviada, o sistema preencherá com **placeholders** do mesmo serviço já utilizado hoje.

---

## 2. Visão geral do projeto atual

O projeto já possui uma boa base de protótipo navegável, com rotas e telas que demonstram a proposta do produto.

### Rotas encontradas

- `/` — catálogo de itens
- `/item/:id` — detalhe do item
- `/add` — cadastro/anúncio de item
- `/profile`
- `/profile/:id`

### Componentes principais identificados

- `Layout.tsx`
- `CatalogPage.tsx`
- `ItemDetailPage.tsx`
- `AddItemPage.tsx`
- `UserProfilePage.tsx`
- `mockData.ts`

### Diagnóstico geral

Hoje o app já entrega:

- navegação entre telas;
- catálogo visual com filtros;
- tela de detalhe do item;
- perfil de usuário;
- formulário visual de anúncio.

Mas ainda não entrega de forma completa:

- estado global real;
- persistência local estruturada;
- autenticação local por telefone;
- criação real de usuário;
- criação real de item;
- leitura centralizada a partir do store.

Em resumo, o sistema hoje funciona muito bem como **protótipo navegável**, mas ainda não como **MVP funcional local**.

---

# Parte 1 — Fluxo funcional final do MVP

## 3. Fluxos que já existem hoje

### 3.1. Navegação principal

Já existe uma navegação mobile-first com acesso ao catálogo, anúncio e perfil.

**Status:** implementado visualmente.

### 3.2. Catálogo de itens

A home já permite:

- listar itens;
- pesquisar por texto;
- filtrar por categoria;
- filtrar por tipo;
- alternar visualização;
- abrir o detalhe de um item.

**Status:** implementado com leitura de mocks.

### 3.3. Detalhe do item

A tela já mostra:

- galeria de imagens;
- descrição;
- atributos do item;
- dados do anunciante;
- navegação para o perfil do anunciante.

**Status:** implementado com leitura de mocks.

### 3.4. Perfil do usuário

A tela já apresenta:

- informações do usuário;
- telefone mascarado;
- métricas e reputação;
- abas de itens ativos, histórico e conquistas.

**Status:** implementado visualmente, com dados mockados e cálculos simplificados.

### 3.5. Cadastro de item

A tela `/add` já possui formulário para cadastro do item e tela de confirmação visual.

**Status:** parcialmente implementado.

**Limitação atual:** o envio ainda não cria item real no estado da aplicação.

---

## 4. Fluxo final esperado do MVP

## 4.1. Fluxo 1 — Inicialização da aplicação

### Regra do MVP

Ao iniciar a aplicação, **não deve haver mistura entre mocks e dados persistidos**.

### Comportamento esperado

1. O app tenta ler o estado persistido do Redux no `localStorage`.
2. Se existir estado persistido válido, ele será carregado.
3. Se não existir estado persistido, o sistema usará o **seed inicial**.
4. Esse seed inicial será imediatamente salvo no `localStorage`.
5. A partir daí, a aplicação passa a ler apenas do Redux persistido.

### Regra importante

- Os itens mockados não devem ser mesclados com os persistidos.
- O seed existe apenas para **popular o storage na primeira execução**.
- Depois da hidratação inicial, a leitura das telas deve vir somente do store.

### Resultado esperado

- primeira execução: catálogo nasce povoado;
- execuções seguintes: catálogo usa apenas o que já estiver persistido;
- sem duplicidade, sem mistura, sem divergência entre tela e storage.

**Status atual:** não implementado.

---

## 4.2. Fluxo 2 — Entrada local por telefone

### Regra do MVP

Na primeira abertura, **não existe usuário logado**.

### Comportamento esperado

1. A aplicação inicia com `currentUserId = null`.
2. Ao tentar acessar recursos que dependem do usuário atual, o app apresenta o fluxo de entrada.
3. O usuário informa apenas o **telefone**.
4. O sistema normaliza o telefone.
5. Se já existir usuário com esse telefone, ele é considerado logado localmente.
6. Se não existir usuário com esse telefone, o sistema direciona para a criação do cadastro.

### Resultado esperado

- entrada local extremamente simples;
- sem senha;
- sem backend;
- telefone funcionando como identificador único local.

**Status atual:** não implementado.

---

## 4.3. Fluxo 3 — Criação de usuário

### Dados exigidos

O cadastro do usuário deve conter:

- **nome**;
- **telefone**;
- **foto**.

### Regra de imagem

A foto será **opcional**.

Se o usuário não enviar foto:

- o sistema atribui automaticamente uma **imagem placeholder**;
- o placeholder deve usar o mesmo tipo de serviço já utilizado atualmente no projeto.

### Fluxo esperado

1. O usuário chega ao cadastro após informar um telefone inexistente.
2. O telefone já pode vir preenchido e bloqueado para edição, ou preenchido como valor inicial.
3. O usuário informa nome.
4. Pode enviar uma foto.
5. Se não enviar foto, o sistema usa placeholder.
6. O cadastro é salvo no Redux.
7. O `currentUserId` passa a apontar para esse usuário.
8. O estado é persistido no `localStorage`.

### Regras de negócio

- nome obrigatório;
- telefone obrigatório;
- telefone único após normalização;
- foto opcional;
- usuário criado já entra autenticado localmente.

**Status atual:** não implementado.

---

## 4.4. Fluxo 4 — Navegação e busca no catálogo

### Comportamento esperado

1. O usuário acessa a home.
2. Visualiza itens disponíveis.
3. Pode pesquisar por nome, descrição ou bairro.
4. Pode filtrar por categoria e tipo.
5. Pode abrir o detalhe do item.

### Regra de dados

A listagem deve sempre vir do **Redux persistido**.

Isso significa que:

- o catálogo não deve importar `ITEMS` diretamente para renderizar;
- os itens exibidos devem ser os itens presentes no store;
- quando não houver persistência anterior, esses itens já terão sido inicializados pelo seed.

### Regra adicional

Como este MVP não terá encerramento de item, a lista principal exibirá os itens existentes no store conforme a regra de exibição adotada para o catálogo.

**Status atual:** parcialmente implementado.

---

## 4.5. Fluxo 5 — Cadastro de item

Este é o fluxo principal do MVP funcional.

### Fluxo esperado

1. O usuário entra na tela **Anunciar**.
2. Preenche os dados do item.
3. Pode enviar imagens do item.
4. O envio de imagens é opcional.
5. Se nenhuma imagem for enviada, o sistema usa placeholders.
6. Ao salvar, o item é criado no Redux vinculado ao usuário atual.
7. O store é persistido no `localStorage`.
8. O item aparece imediatamente no catálogo.
9. O item aparece imediatamente no perfil do usuário.
10. O sistema mostra a mensagem de sucesso.

### Campos mínimos esperados

Obrigatórios:

- nome;
- descrição;
- categoria;
- bairro;
- tipo;
- preço, quando o item for pago;
- transporte.

Opcionais:

- imagens;
- tempo de uso;
- material;
- peso;
- dimensões;
- urgência.

### Regra de imagem

- imagens são opcionais;
- se o usuário não enviar imagens, o sistema deve preencher um array com placeholders;
- o ideal é manter a mesma origem/serviço visual já usado hoje nos mocks.

### Resultado esperado

O formulário deixa de ser apenas visual e passa a produzir dados reais no store.

**Status atual:** parcialmente implementado, apenas na interface.

---

## 4.6. Fluxo 6 — Visualização do item e contato

### Comportamento esperado

1. O usuário abre um item no catálogo.
2. Visualiza fotos, descrição e detalhes.
3. Visualiza dados do anunciante.
4. Pode entrar em contato pelo CTA principal.

### Regra do CTA

O CTA de contato deve abrir o **WhatsApp**.

### Comportamento técnico esperado

O botão deve montar uma URL do WhatsApp com o telefone do anunciante, por exemplo com:

- telefone normalizado;
- mensagem inicial opcional pré-preenchida.

Exemplo de intenção:

- “Olá, vi seu item no EcoDescarte e tenho interesse.”

### Observação

Neste MVP não haverá chat interno. O canal de contato será externo, via WhatsApp.

**Status atual:** parcial; o CTA ainda precisa ser ajustado para abrir o WhatsApp.

---

## 4.7. Fluxo 7 — Perfil do usuário

### Comportamento esperado

O perfil precisa refletir o estado real do usuário salvo no Redux.

Deve exibir:

- nome;
- foto;
- telefone mascarado;
- itens anunciados pelo usuário;
- métricas derivadas do store;
- badges/conquistas, se mantidas.

### Regra importante

A fonte de dados do perfil deve ser o Redux persistido.

Isso evita:

- mistura de dados mockados com dados criados depois;
- métricas inconsistentes;
- divergência entre catálogo, detalhe e perfil.

### Observação sobre o escopo

O fluxo de **encerramento do item não fará parte deste MVP**. Portanto, a documentação do perfil não depende desse fechamento de ciclo.

**Status atual:** parcialmente implementado.

---

## 5. Resumo dos fluxos

| Fluxo | Situação atual | Situação esperada no MVP |
|---|---|---|
| Inicialização com seed | Não implementado corretamente | Seed só na primeira execução, sem mescla |
| Entrada por telefone | Não implementado | Login local simples por telefone |
| Cadastro de usuário | Não implementado | Nome, telefone e foto opcional com placeholder |
| Catálogo | Parcial | Leitura exclusiva do Redux persistido |
| Detalhe do item | Parcial | CTA abrindo WhatsApp |
| Cadastro de item | Parcial | Criação real no Redux + persistência |
| Imagens | Parcial | Opcionais com placeholders |
| Perfil | Parcial | Dados derivados do Redux persistido |
| Encerramento do item | Fora do escopo | Não será implementado no MVP |

---

# Parte 2 — Descrição técnica do que falta e como implementar

## 6. Diretriz técnica principal

A principal decisão técnica deste MVP é:

> **Redux persistido deve ser a fonte única de dados da aplicação.**

Isso implica que:

- as telas não devem consumir `mockData.ts` diretamente;
- `mockData.ts` deve funcionar apenas como **seed inicial**;
- após a hidratação, catálogo, perfil, detalhe e sessão devem ler do store;
- o `localStorage` deve refletir o estado do Redux.

---

## 7. Estrutura de estado recomendada

```ts
interface AppState {
  appInitialized: boolean;
  currentUserId: string | null;
  users: User[];
  items: Item[];
}
```

### Tipo `User`

Sugestão mínima:

```ts
interface User {
  id: string;
  name: string;
  phone: string;
  photo: string;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  respondsQuickly?: boolean;
  memberSince?: string;
}
```

### Tipo `Item`

Sugestão mínima:

```ts
interface Item {
  id: string;
  userId: string;
  name: string;
  description: string;
  category: Category;
  images: string[];
  neighborhood: string;
  type: "doacao" | "pago";
  price?: number;
  transport: "retirada" | "entrega";
  urgent: boolean;
  timeOfUse?: string;
  material?: string;
  weight?: number;
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
  };
  postedAt: string;
}
```

### Observação

Como não haverá encerramento de item no MVP, não é obrigatório introduzir `status` agora.

---

## 8. Organização recomendada

```txt
src/
  app/
    store/
      index.ts
      hooks.ts
      localStorage.ts
      seed.ts
      slices/
        sessionSlice.ts
        usersSlice.ts
        itemsSlice.ts
```

Ou, se quiser simplificar:

```txt
src/app/store.ts
src/app/store.localStorage.ts
src/app/store.seed.ts
src/app/slices/sessionSlice.ts
src/app/slices/usersSlice.ts
src/app/slices/itemsSlice.ts
```

---

## 9. Estratégia de seed e hidratação

## 9.1. Regra correta de inicialização

A inicialização deve seguir esta lógica:

1. tentar carregar o estado persistido do `localStorage`;
2. se houver estado persistido válido, usá-lo;
3. se não houver, criar um estado inicial a partir do seed;
4. persistir esse estado inicial;
5. marcar a aplicação como inicializada.

## 9.2. O que o seed deve conter

O seed deve conter:

- lista inicial de usuários públicos;
- lista inicial de itens públicos;
- `currentUserId = null`.

### Regra importante

Na primeira execução:

- os itens do seed devem ser gravados no storage;
- os usuários do seed também devem ser gravados no storage;
- não deve existir leitura híbrida entre seed em memória e storage.

## 9.3. O que não deve acontecer

Não deve existir lógica como:

- renderizar `ITEMS` mockados e depois concatenar itens do `localStorage`;
- renderizar `CURRENT_USER` mockado e depois tentar sobrepor com estado persistido;
- usar dados diferentes em catálogo, detalhe e perfil.

---

## 10. Session slice

Responsável por:

- guardar `currentUserId`;
- fazer login local por telefone;
- logout local, se desejar;
- indicar se a aplicação já foi inicializada.

### Ações sugeridas

```ts
initializeApp()
loginByPhone(phone: string)
setCurrentUser(userId: string | null)
logout()
```

### Regras

- `loginByPhone` deve normalizar o telefone;
- se encontrar usuário com aquele telefone, define `currentUserId`;
- se não encontrar, o frontend redireciona para o cadastro.

---

## 11. Users slice

Responsável por:

- armazenar usuários;
- criar usuário novo;
- atualizar perfil, se necessário futuramente.

### Ação principal sugerida

```ts
createUser(payload: {
  name: string;
  phone: string;
  photo?: string;
})
```

### Regras da action

- normalizar telefone;
- verificar unicidade;
- se não houver foto, preencher com placeholder;
- criar `id` local;
- salvar usuário;
- opcionalmente já retornar o `userId` criado para login automático.

---

## 12. Items slice

Responsável por:

- armazenar itens;
- criar item;
- listar itens do catálogo;
- listar itens do usuário atual;
- alimentar o detalhe do item.

### Ação principal sugerida

```ts
createItem(payload: {
  name: string;
  description: string;
  category: Category;
  neighborhood: string;
  type: "doacao" | "pago";
  price?: number;
  transport: "retirada" | "entrega";
  urgent?: boolean;
  images?: string[];
  timeOfUse?: string;
  material?: string;
  weight?: number;
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
  };
})
```

### Regras da action

- exigir usuário autenticado localmente;
- vincular `userId` ao `currentUserId`;
- gerar `id` local;
- gerar `postedAt`;
- se `images` estiver vazio, preencher com placeholders;
- salvar no store.

---

## 13. Persistência no localStorage

## 13.1. Estratégia recomendada

Persistir um único objeto serializado da aplicação, por exemplo:

```ts
const STORAGE_KEY = "eco-descarte-store";
```

### Estrutura salva

```ts
{
  appInitialized: true,
  currentUserId: "..." | null,
  users: [...],
  items: [...]
}
```

## 13.2. Regras importantes

- persistir apenas dados de domínio;
- não persistir estado transitório de UI;
- validar o parse ao carregar;
- se o parse falhar, cair para o seed.

---

## 14. Ajustes necessários nas telas

## 14.1. `CatalogPage.tsx`

Hoje lê mocks.

Deve passar a:

- buscar itens via selector do Redux;
- aplicar filtros sobre os itens do store;
- não importar `ITEMS` para renderização.

## 14.2. `ItemDetailPage.tsx`

Hoje lê item e usuário a partir de mocks.

Deve passar a:

- buscar item por `id` no Redux;
- buscar usuário dono do item no Redux;
- montar CTA do WhatsApp com o telefone do usuário.

### Exemplo de intenção técnica

```ts
const whatsappUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
```

## 14.3. `UserProfilePage.tsx`

Hoje usa `CURRENT_USER`, `USERS` e `ITEMS`.

Deve passar a:

- usar `currentUserId` quando for `/profile`;
- usar `params.id` quando for perfil público;
- buscar usuário no Redux;
- buscar itens do usuário no Redux;
- recalcular métricas a partir dos itens armazenados.

## 14.4. `AddItemPage.tsx`

Hoje só confirma visualmente.

Deve passar a:

- validar campos;
- despachar `createItem`;
- aplicar placeholder para imagens ausentes;
- persistir via Redux;
- redirecionar ou exibir sucesso com dados reais já salvos.

## 14.5. Nova tela de entrada

Criar uma tela simples de login local por telefone.

Sugestão:

- `/login` ou `/start`

Fluxo:

- informa telefone;
- se existir, entra;
- se não existir, segue para cadastro.

## 14.6. Nova tela de cadastro de usuário

Criar uma tela para:

- nome;
- telefone;
- foto opcional.

Pode ser:

- `/register`
- ou um fluxo integrado ao login.

---

## 15. Placeholders de imagem

### Regra funcional

Sempre que um cadastro aceitar imagem, ela deve ser opcional.

Isso vale para:

- foto do usuário;
- imagens do item.

### Regra técnica

Se o usuário não enviar imagem:

- usar uma URL placeholder predefinida;
- manter padrão visual próximo ao que já existe no projeto hoje.

### Sugestão prática

Criar helpers como:

```ts
getDefaultUserPhoto(): string
getDefaultItemImages(category?: Category): string[]
```

Assim o fallback fica centralizado e reaproveitável.

---

## 16. Ordem sugerida de implementação

1. Criar store Redux e persistência.
2. Transformar mocks em seed.
3. Implementar hidratação inicial sem mescla.
4. Implementar `sessionSlice` com login por telefone.
5. Implementar cadastro de usuário com foto opcional.
6. Migrar catálogo para ler do Redux.
7. Migrar detalhe do item para ler do Redux.
8. Implementar criação real de item.
9. Migrar perfil para ler do Redux.
10. Ajustar CTA para abrir WhatsApp.

---

## 17. Critérios de pronto do MVP

O MVP pode ser considerado funcional quando:

- ao abrir pela primeira vez, o app cria o estado inicial a partir do seed;
- ao abrir novamente, o app usa apenas o estado persistido;
- não existe usuário logado por padrão;
- o login local acontece por telefone;
- um usuário novo pode ser criado com nome, telefone e foto opcional;
- o catálogo lê apenas do Redux persistido;
- o cadastro de item realmente cria itens no store;
- itens sem imagem recebem placeholders;
- o perfil reflete os dados reais do store;
- o botão de contato abre o WhatsApp do anunciante.

---

## 18. Conclusão

O projeto já possui uma base visual muito boa para um MVP. O ponto central agora não é criar novas telas complexas, e sim **fechar a camada de estado e persistência**.

A decisão mais importante para evitar inconsistências é esta:

> usar o **Redux persistido como fonte única de dados** e deixar os mocks apenas como **seed de primeira execução**.

Com isso, o EcoDescarte passa de protótipo navegável para um MVP local coerente, previsível e fácil de evoluir depois para backend, autenticação real e APIs.
