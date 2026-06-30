/**
 * Fonte única de verdade dos planos exibidos na landing page.
 *
 * Por que estático e não Supabase:
 * - Preços mudam 2–3 vezes por ano, não justifica round-trip de DB a cada visita
 * - Elimina single point of failure (visto: 401 RLS quebrava Pricing inteiro)
 * - Zero latência (LCP melhor)
 * - Sem exposição do banco a queries anônimas públicas
 *
 * Para mudar preço: editar este arquivo, commit, deploy (~5 min).
 *
 * A tabela `tbplanos` no Supabase continua sendo fonte de verdade para o APP
 * autenticado (billing, plano do usuário, features liberadas). Quando mudar
 * preço aqui, atualizar lá também (manualmente, baixa frequência).
 *
 * Última sincronização com tbplanos: 2026-05-13
 */

export const PRICING_PLANS = [
    // ─── MENSAIS ─────────────────────────────────────────────────────────
    {
        id_plano: 'c2d8b28e-0842-4f43-a10b-24d0f640b1a0',
        nome: 'Starter Mensal',
        nome_curto: 'Starter',
        slug: 'starter-mensal',
        descricao: 'Cronograma montado em minutos, flashcards e revisão no momento certo. Tudo num plano só.',
        tipo: 'mensal',
        preco_centavos: 2490,
        redacoes_por_mes: 0,
        duracao_meses: 1,
        flashcards_ia_por_mes: 30,
        cronograma_ia_por_mes: 1,
        chat_ia_questao_por_mes: 30,
        ordem: 1,
        ativo: true,
        popular: true,
        exibir_landing: true,
    },
    {
        id_plano: 'a48d12ce-7d08-47c6-90e6-2d1ff542a996',
        nome: 'Plus Mensal',
        nome_curto: 'Plus',
        slug: 'plus-mensal',
        descricao: 'Estude com estrutura completa e receba 2 correções de redação por mês',
        tipo: 'mensal',
        preco_centavos: 5990,
        redacoes_por_mes: 2,
        duracao_meses: 1,
        flashcards_ia_por_mes: 75,
        cronograma_ia_por_mes: 2,
        chat_ia_questao_por_mes: 50,
        ordem: 2,
        ativo: true,
    },
    {
        id_plano: 'd1b278bb-a332-456e-884c-64f75b164339',
        nome: 'Pro Mensal',
        nome_curto: 'Pro',
        slug: 'pro-mensal',
        descricao: 'Acelere sua aprovação com 4 correções de redação por mês',
        tipo: 'mensal',
        preco_centavos: 8990,
        redacoes_por_mes: 4,
        duracao_meses: 1,
        flashcards_ia_por_mes: 150,
        cronograma_ia_por_mes: 3,
        chat_ia_questao_por_mes: 120,
        ordem: 3,
        ativo: true,
    },
    {
        id_plano: '8becb6a4-11e4-4567-8cc6-2abcc2cc120a',
        nome: 'Ultra Mensal',
        nome_curto: 'Ultra',
        slug: 'ultra-mensal',
        descricao: 'Preparação máxima com 8 correções de redação por mês',
        tipo: 'mensal',
        preco_centavos: 14990,
        redacoes_por_mes: 8,
        duracao_meses: 1,
        flashcards_ia_por_mes: 300,
        cronograma_ia_por_mes: 5,
        chat_ia_questao_por_mes: 240,
        ordem: 4,
        ativo: true,
    },

    // ─── ANUAIS ──────────────────────────────────────────────────────────
    {
        id_plano: '335cbc17-5574-4c5b-9ee8-9c69d9f66049',
        nome: 'Starter Anual',
        nome_curto: 'Starter',
        slug: 'starter-anual',
        descricao: 'Cronograma, flashcards e revisão no momento certo por um ano inteiro. Tudo num plano só.',
        tipo: 'anual',
        preco_centavos: 17990,
        redacoes_por_mes: 0,
        duracao_meses: 12,
        flashcards_ia_por_mes: 100,
        cronograma_ia_por_mes: 3,
        chat_ia_questao_por_mes: 100,
        ordem: 5,
        ativo: true,
        popular: true,
        exibir_landing: true,
    },
    {
        id_plano: 'e196bcb3-6997-4f66-b7b9-40f95f56a776',
        nome: 'Plus Anual',
        nome_curto: 'Plus',
        slug: 'plus-anual',
        descricao: 'Um ano de preparação estruturada com 2 correções de redação por mês',
        tipo: 'anual',
        preco_centavos: 47880,
        redacoes_por_mes: 2,
        duracao_meses: 12,
        flashcards_ia_por_mes: 200,
        cronograma_ia_por_mes: 5,
        chat_ia_questao_por_mes: 200,
        ordem: 6,
        ativo: true,
    },
    {
        id_plano: 'eaf1b72f-3287-4568-850f-5f88a958b844',
        nome: 'Pro Anual',
        nome_curto: 'Pro',
        slug: 'pro-anual',
        descricao: 'Um ano acelerado com 4 correções de redação por mês',
        tipo: 'anual',
        preco_centavos: 71880,
        redacoes_por_mes: 4,
        duracao_meses: 12,
        flashcards_ia_por_mes: 400,
        cronograma_ia_por_mes: 8,
        chat_ia_questao_por_mes: 400,
        ordem: 7,
        ativo: true,
    },
    {
        id_plano: '4fe17fae-3b16-4670-8eec-bbde7f0510af',
        nome: 'Ultra Anual',
        nome_curto: 'Ultra',
        slug: 'ultra-anual',
        descricao: 'Preparação máxima durante todo o ano com 8 correções de redação por mês',
        tipo: 'anual',
        preco_centavos: 131880,
        redacoes_por_mes: 8,
        duracao_meses: 12,
        flashcards_ia_por_mes: 800,
        cronograma_ia_por_mes: 12,
        chat_ia_questao_por_mes: 800,
        ordem: 8,
        ativo: true,
    },
]

/**
 * Desconto médio ponderado do anual vs mensal, calculado abaixo.
 * Comunicado no toggle Mensal/Anual da landing.
 * Atual: -33% (verificado contra `tbplanos` em 2026-05-13).
 */
export const ANNUAL_DISCOUNT_LABEL = '-33%'

/**
 * Helper: retorna os planos exibidos na landing, filtrados por tipo e ordenados.
 *
 * Pós-pivô (2026-06): a landing vende apenas o Starter (mensal e anual). Os
 * planos Plus/Pro/Ultra eram diferenciados pela quantidade de redações por mês,
 * e a redação saiu do produto. Eles continuam no array (e em `tbplanos`) porque
 * o billing do app ainda os referencia, mas só os marcados com `exibir_landing`
 * aparecem aqui. Para voltar a exibi-los, basta marcar `exibir_landing: true`.
 */
export function getPlansByTipo(tipo) {
    return PRICING_PLANS
        .filter((plan) => plan.ativo && plan.exibir_landing && plan.tipo === tipo)
        .sort((a, b) => a.ordem - b.ordem)
}

/** Retorna todos os planos exibidos na landing (mensal + anual), ordenados. */
export function getAllLandingPlans() {
    return PRICING_PLANS
        .filter((plan) => plan.ativo && plan.exibir_landing)
        .sort((a, b) => a.ordem - b.ordem)
}

/**
 * Helper: dado um plano anual, retorna o equivalente mensal (pelo nome_curto)
 * para calcular economia.
 */
export function getMonthlyEquivalent(annualPlan) {
    return PRICING_PLANS.find(
        (p) => p.tipo === 'mensal' && p.nome_curto === annualPlan.nome_curto
    )
}
