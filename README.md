# Recolhe Aí

`Recolhe Aí` é uma plataforma local para anunciar, encontrar e recolher itens que ainda podem ser reaproveitados. O produto foi pensado como um MVP mobile-first para conectar pessoas que querem descartar objetos de forma mais consciente com quem pode recolher, reutilizar ou dar um novo destino a esses itens.

## Visão geral do produto

O projeto funciona sem backend e sem autenticação remota. Toda a experiência roda no navegador com persistência local via Redux Toolkit e `localStorage`, permitindo que catálogo, usuários e anúncios continuem disponíveis entre sessões.

## Features implementadas

- Catálogo com busca textual, filtros por categoria e tipo, e alternância entre visualização em grade e lista.
- Login local por telefone para usuários já cadastrados.
- Criação de usuário com nome, telefone e foto opcional.
- Criação de anúncio com formulário completo e publicação imediata no catálogo.
- Página de detalhe do item com informações do anúncio, dados do anunciante e CTA para WhatsApp.
- Perfil público e perfil do usuário logado com métricas, conquistas e anúncios ativos.
- Persistência local do estado da aplicação com seed inicial e migração de chave legada.

## Seções do sistema

### Listagem

A tela inicial (`/`) exibe os itens disponíveis no catálogo a partir do Redux persistido. Nela, o usuário pode:

- buscar por nome do item ou bairro;
- filtrar por categoria;
- filtrar por tipo (`doação` ou `pago`);
- alternar entre visualização em grade e lista;
- acessar rapidamente o detalhe de qualquer item.

### Login

A rota `/login` implementa um fluxo de entrada local por telefone:

- se o telefone já existir, o usuário entra no sistema;
- se o telefone não existir, o fluxo direciona para a criação de cadastro;
- acessos protegidos, como `/add` e `/profile`, redirecionam para o login quando necessário.

### Criação de usuário

A rota `/register` permite criar uma conta local com:

- nome obrigatório;
- telefone obrigatório e único após normalização;
- foto opcional com preview;
- fallback para imagem padrão quando nenhuma foto é enviada.

Após o cadastro, o usuário já fica autenticado localmente e é redirecionado para o próximo destino do fluxo.

### Criação de anúncio

A rota `/add` permite publicar um novo item para descarte ou reaproveitamento. O formulário já suporta:

- nome e descrição do item;
- categoria;
- bairro;
- tipo do anúncio (`doação` ou `pago`);
- preço quando aplicável;
- peso, dimensões, material e tempo de uso;
- logística de retirada ou entrega;
- marcação de urgência.

Ao salvar, o anúncio é criado no Redux, aparece imediatamente no catálogo e também no perfil do usuário.

### Detalhe do item

A rota `/item/:id` apresenta:

- galeria de imagens;
- descrição e atributos do item;
- informações logísticas;
- estimativa de impacto ambiental;
- resumo do anunciante;
- botão para iniciar contato via WhatsApp com mensagem pré-preenchida.

### Perfil do usuário

As rotas `/profile` e `/profile/:id` exibem o perfil próprio ou público do anunciante, incluindo:

- dados básicos do usuário;
- telefone mascarado;
- reputação e indicadores de confiança;
- anúncios ativos;
- área de histórico;
- conquistas e progresso de badges;
- ação de logout no perfil do usuário autenticado.

### Persistência local

O estado da aplicação é salvo no navegador e reaproveitado entre sessões. O projeto já possui:

- seed inicial para popular o app na primeira execução;
- leitura centralizada do Redux persistido;
- migração automática da chave legada `eco-descarte-redux` para `recolhe-ai-redux`;
- manutenção da experiência sem backend.

## Rotas disponíveis

- `/`
- `/login`
- `/register`
- `/add`
- `/item/:id`
- `/profile`
- `/profile/:id`

## Stack principal

- React 18
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS

## Execução local

Instale as dependências:

```bash
npm i
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Deploy

O build usa a configuração `base` do Vite a partir da variável `VITE_APP_BASE`. Isso permite publicar o projeto em diferentes caminhos sem depender do nome antigo do repositório.

Para gerar o build de produção:

```bash
npm run build
```
  
