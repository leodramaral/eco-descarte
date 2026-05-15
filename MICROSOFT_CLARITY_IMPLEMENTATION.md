# 📋 Plano de Implementação: Microsoft Clarity no Recolhe Aí

## 🎯 Seleção de Eventos Híbridos

### Eventos Principais Essenciais (8):
1. `auth_login_success` - Login bem-sucedido
2. `auth_login_failed` - Falha ao logar (telefone não encontrado)
3. `auth_register_success` - Registro completado
4. `item_publish_success` - Anúncio publicado com sucesso
5. `contact_whatsapp_click` - Clique no botão de WhatsApp
6. `page_view_home` - Visualização do catálogo
7. `page_view_item_detail` - Visualização de detalhe de item
8. `auth_logout` - Logout do usuário

### Eventos Específicos Selecionados (7):
9. `catalog_search` - Busca de itens
10. `catalog_filter_category` - Filtro por categoria
11. `catalog_item_click` - Clique em item no catálogo
12. `item_profile_click` - Clique no perfil do anunciante
13. `profile_tab_change` - Mudança de aba no perfil
14. `catalog_view_mode_change` - Mudança grid/lista
15. `item_detail_view` - Visualização completa do item

### Tags Personalizadas:
- `user_status`: `logged_in` | `guest`
- `item_category`: `moveis` | `geladeiras` | `tvs` | `eletrodomesticos` | `outros`
- `item_type`: `doacao` | `pago`
- `item_urgent`: `true` | `false`
- `search_query`: texto da busca
- `view_mode`: `grid` | `list`
- `profile_tab`: `descartando` | `historico` | `conquistas`

## 🏗️ Estrutura de Arquivos a Criar

```
src/app/
├── hooks/
│   └── useClarity.ts                    # Hook principal do Clarity
├── components/
│   ├── ClarityProvider.tsx              # Provider component
│   ├── ClarityConsentBanner.tsx         # Banner de consentimento GDPR
│   └── clarity/
│       ├── events.ts                    # Funções de eventos customizados
│       └── tags.ts                     # Funções de tags personalizadas
├── utils/
│   └── clarity.ts                      # Utilitários do Clarity
.env
```

## 📝 Implementação Detalhada

### 1. Configuração de Ambiente
**Arquivo:** `.env`
```env
VITE_CLARITY_PROJECT_ID=seu_project_id_aqui
VITE_CLARITY_ENABLED=true
```

### 2. Hook Principal useClarity
**Arquivo:** `src/app/hooks/useClarity.ts`
- Gerenciar inicialização do Clarity
- Prevenir inicializações duplicadas
- Fornecer funções de tracking
- Gerenciar consentimento

### 3. Componente ClarityProvider
**Arquivo:** `src/app/components/ClarityProvider.tsx`
- Wrapper ao redor da aplicação
- Inicializar Clarity apenas uma vez
- Gerenciar ciclo de vida
- Fornecer contexto para tracking

### 4. Banner de Consentimento GDPR
**Arquivo:** `src/app/components/ClarityConsentBanner.tsx`
- Aparecer apenas uma vez por usuário
- Opções: Aceitar tudo, Aceitar apenas analíticos, Rejeitar
- Armazenar preferência no localStorage
- Usar API `Clarity.consentV2()`

### 5. Sistema de Eventos
**Arquivo:** `src/app/components/clarity/events.ts`
- Funções para cada evento personalizado
- Integração com tags personalizadas
- Validação de dados
- Logging para debug

### 6. Sistema de Tags
**Arquivo:** `src/app/components/clarity/tags.ts`
- Funções para definir tags
- Atualizar tags dinamicamente
- Gerenciar tags do usuário
- Validação de tipos

### 7. Integração com main.tsx
- Adicionar `ClarityProvider` antes do Redux Provider
- Incluir `ClarityConsentBanner`
- Garantir ordem correta de inicialização

### 8. Modificações nos Componentes Existentes

#### CatalogPage.tsx:
- Adicionar tracking de busca
- Adicionar tracking de filtros por categoria
- Adicionar tracking de mudança de view mode
- Adicionar tracking de clique em itens

#### AddItemPage.tsx:
- Adicionar tracking de sucesso na publicação
- Adicionar tracking de validação de formulário

#### LoginPage.tsx:
- Adicionar tracking de login sucesso/falha
- Adicionar tracking de redirecionamento para registro

#### RegisterPage.tsx:
- Adicionar tracking de sucesso no registro

#### ItemDetailPage.tsx:
- Adicionar tracking de visualização de detalhes
- Adicionar tracking de clique em perfil
- Adicionar tracking de contato WhatsApp

#### UserProfilePage.tsx:
- Adicionar tracking de logout
- Adicionar tracking de mudança de tabs
- Adicionar tracking de visualização de perfil

#### Layout.tsx:
- Adicionar tracking de page views
- Integrar com navegação hash-based
- Atualizar tags do usuário

### 9. Integração com Redux Store
- Criar middleware para tracking de ações do Redux
- Detectar mudanças de autenticação
- Atualizar tags do usuário automaticamente
- Tracking de ações importantes

## 🔧 Funcionalidades Chave

### Gerenciamento de Consentimento:
- Banner elegante que combina com design do app
- Persistência no localStorage
- Suporte a GDPR/LGPD
- API `Clarity.consentV2({ analytics_Storage: 'granted' })`

### Tracking de Navegação Hash-Based:
- Listener para `hashchange`
- Trackear mudanças de página automaticamente
- Atualizar tags de contexto
- Support para deep linking

### Identificação de Usuários:
- Usar `Clarity.identify(userId)` quando logado
- Hash de telefone para privacidade
- Tags personalizadas por usuário
- Suporte para logout

### Sistema de Eventos Robusto:
- Validação de dados
- Logging condicional
- Suporte a dados adicionais
- Error handling

### Performance:
- Inicialização lazy se consentimento pendente
- Debouncing para eventos frequentes
- Minimizar impacto no bundle
- Tree-shaking otimizado

## 🎨 Design do Banner de Consentimento

### Características:
- Posicionamento fixo no topo/bottom
- Design consistente com UI do app (tons de verde e terra)
- Não intrusivo, mas visível
- Animado na entrada/saída
- Mobile-first
- Botões claros e acessíveis

### Texto Sugerido:
```
Usamos cookies para melhorar sua experiência e analisar o uso do app.
Ao continuar, você concorda com nossa política de privacidade.
```

### Opções:
- ✅ "Aceitar tudo" (consentimento completo)
- ⚙️ "Apenas essencial" (analytics apenas)
- ❌ "Rejeitar" (opt-out)

## 🧪 Estratégia de Teste

### Fase 1 - Desenvolvimento:
- Verificar carregamento do script
- Testar eventos principais
- Validar tracking de navegação
- Testar banner de consentimento

### Fase 2 - Pre-Produção:
- Testar todos os eventos
- Verificar integridade de dados
- Validar GDPR compliance
- Performance testing

### Fase 3 - Produção:
- Monitorar dashboard do Clarity
- Verificar dados de eventos
- Ajustar configurações conforme necessário
- Documentar insights iniciais

## 📊 Métricas Principais a Monitorar

### Funil de Aquisição:
- Visitantes únicos → Login → Registro → Primeira publicação

### Engajamento:
- Page views por sessão
- Tempo na página
- Interações com catálogo

### Conversões:
- Taxa de publicação de itens
- Taxa de contato via WhatsApp
- Taxa de login/registro

### Comportamento:
- Categorias mais populares
- Filtros mais usados
- Padrões de navegação

## 🚀 Passos de Implementação

### Passo 1: Instalação
```bash
npm install @microsoft/clarity
```

### Passo 2: Configuração de Ambiente
- Criar/Editar `.env` com Project ID
- Adicionar ao `.gitignore` se não estiver lá

### Passo 3: Criar Estrutura de Arquivos
- Criar diretórios necessários
- Criar arquivos base
- Configurar TypeScript

### Passo 4: Implementar Sistema de Tracking
- Implementar hook useClarity
- Implementar ClarityProvider
- Implementar sistema de eventos
- Implementar sistema de tags

### Passo 5: Implementar Banner de Consentimento
- Criar componente do banner
- Implementar lógica de consentimento
- Adicionar ao ClarityProvider

### Passo 6: Integrar com Componentes
- Modificar CatalogPage
- Modificar AddItemPage
- Modificar LoginPage
- Modificar RegisterPage
- Modificar ItemDetailPage
- Modificar UserProfilePage
- Modificar Layout
- Modificar main.tsx

### Passo 7: Testar e Validar
- Testar em ambiente de desenvolvimento
- Verificar console do Clarity
- Validar eventos e tags
- Testar banner de consentimento

### Passo 8: Deploy e Monitoramento
- Fazer commit das mudanças
- Deploy para GitHub Pages
- Monitorar dashboard do Clarity
- Ajustar conforme necessário

## ❓ Considerações Importantes

### Privacidade:
- Dados pessoais não devem ser capturados
- Usar hash de telefone para identificação
- Respeitar preferências de consentimento
- LGPD compliance

### Performance:
- Bundle size do pacote
- Inicialização não bloqueante
- Debouncing de eventos
- Lazy loading quando possível

### Manutenibilidade:
- Código centralizado e organizado
- TypeScript para type safety
- Documentação clara
- Fácil de estender

## 📝 Notas de Implementação

- O projeto usa HashRouter, o que é ideal para GitHub Pages
- Não há dependência de backend, tudo é client-side
- Usa Redux Toolkit para gerenciamento de estado
- O Clarity será inicializado apenas uma vez
- Consentimento será gerenciado via localStorage
- Eventos serão implementados de forma não-intrusiva

## 🎯 Objetivos

1. Implementar tracking analítico robusto
2. Respeitar privacidade e consentimento do usuário
3. Garantir performance do aplicativo
4. Manter código limpo e manutenível
5. Fornecer insights valiosos sobre comportamento do usuário

---

**Data de Criação:** 2026-05-12
**Versão:** 1.0
**Status:** Pronto para Implementação