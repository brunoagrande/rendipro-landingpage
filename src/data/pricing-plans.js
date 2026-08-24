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
 * Última sincronização com tbplanos: 2026-08-15 (grade v2: Starter+Pro, redação no Starter)
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
        preco_centavos: 1690,
        // ÂNCORA REMOVIDA em 18/08/2026. Aqui havia 2490, montando um "de
        // R$ 24,90 por R$ 16,90". Conferido em tbplanos: R$ 24,90 NUNCA foi
        // cobrado em plano nenhum, era o preço FUTURO pretendido. Preço riscado
        // que nunca existiu é propaganda enganosa (CDC art. 37), e o próprio
        // plano de vendas já vetava escassez falsa pelo mesmo motivo. As outras
        // duas âncoras do arquivo ficam: elas comparam o anual com o mensal que
        // é realmente cobrado. No lugar entrou a promessa de lançamento, que é
        // verificável e converte melhor que uma mentira sobre o passado.
        preco_lancamento: true,
        redacoes_por_mes: 2,
        duracao_meses: 1,
        flashcards_ia_por_mes: 50,
        cronograma_ia_por_mes: 2,
        chat_ia_questao_por_mes: 30,
        questoes_pdf_por_mes: 6,
        questoes_pdf_max_paginas: 40,
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
        ativo: false, // aposentado na grade v2 (15/08/2026)
    },
    {
        id_plano: 'd1b278bb-a332-456e-884c-64f75b164339',
        nome: 'Pro Mensal',
        nome_curto: 'Pro',
        slug: 'pro-mensal',
        descricao: 'Pra quem treina todo dia: 8 redações corrigidas por mês e o dobro de material virando questão.',
        tipo: 'mensal',
        preco_centavos: 3490,
        redacoes_por_mes: 8,
        duracao_meses: 1,
        flashcards_ia_por_mes: 200,
        cronograma_ia_por_mes: 4,
        chat_ia_questao_por_mes: 150,
        questoes_pdf_por_mes: 20,
        questoes_pdf_max_paginas: 60,
        ordem: 3,
        ativo: true,
        exibir_landing: true,
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
        ativo: false, // aposentado na grade v2 (15/08/2026)
    },

    // ─── ANUAIS ──────────────────────────────────────────────────────────
    {
        id_plano: '335cbc17-5574-4c5b-9ee8-9c69d9f66049',
        nome: 'Starter Anual',
        nome_curto: 'Starter',
        slug: 'starter-anual',
        descricao: 'Cronograma, flashcards e revisão no momento certo por um ano inteiro. Tudo num plano só.',
        tipo: 'anual',
        preco_centavos: 11880,
        preco_ancora_mes_centavos: 1690, // âncora VERDADEIRA: o preço do Starter Mensal
        redacoes_por_mes: 2,
        duracao_meses: 12,
        flashcards_ia_por_mes: 50,
        cronograma_ia_por_mes: 2,
        chat_ia_questao_por_mes: 30,
        questoes_pdf_por_mes: 6,
        questoes_pdf_max_paginas: 40,
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
        ativo: false, // aposentado na grade v2 (15/08/2026)
    },
    {
        id_plano: 'eaf1b72f-3287-4568-850f-5f88a958b844',
        nome: 'Pro Anual',
        nome_curto: 'Pro',
        slug: 'pro-anual',
        descricao: 'Pra quem treina todo dia: 8 redações corrigidas por mês e o dobro de material virando questão. Um ano inteiro.',
        tipo: 'anual',
        preco_centavos: 23880,
        preco_ancora_mes_centavos: 3490, // âncora VERDADEIRA: o preço do Pro Mensal
        redacoes_por_mes: 8,
        duracao_meses: 12,
        flashcards_ia_por_mes: 200,
        cronograma_ia_por_mes: 4,
        chat_ia_questao_por_mes: 150,
        questoes_pdf_por_mes: 20,
        questoes_pdf_max_paginas: 60,
        ordem: 7,
        ativo: true,
        exibir_landing: true,
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
        ativo: false, // aposentado na grade v2 (15/08/2026)
    },
]

/**
 * Desconto médio ponderado do anual vs mensal, calculado abaixo.
 * Comunicado no toggle Mensal/Anual da landing.
 * Atual: -33% (verificado contra `tbplanos` em 2026-05-13).
 */
export const ANNUAL_DISCOUNT_LABEL = '-41%' // 9,90 vs 16,90 (Starter); Pro e -43%

/**
 * Helper: retorna os planos exibidos na landing, filtrados por tipo e ordenados.
 *
 * Grade v2 (2026-08-15): a landing vende Starter e Pro (mensal e anual). A
 * redação VOLTOU ao produto (2/mês no Starter, 8/mês no Pro) e é o que separa
 * os tiers. Plus/Ultra seguem no array só porque assinantes antigos os
 * referenciam no billing; ficam com ativo: false e fora da vitrine.
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

/**
 * Bônus de lançamento do ANUAL: redações extras por mês (decisão D.2, 22/08/2026).
 *
 * ⚠️ ESTE NÚMERO É UMA CÓPIA. A fonte de verdade é a chave
 * `bonus_lancamento_redacoes_anual` em `rendipro_config` (Supabase), lida pelas
 * edge functions `asaas-subscribe` e `asaas-upgrade` na hora de gravar a
 * assinatura. Aqui é só o rótulo da vitrine, pelo mesmo motivo dos preços:
 * página de venda não faz round-trip de banco.
 *
 * Se mudar lá, mude aqui. Se divergir, a landing promete um número que a
 * assinatura não entrega — que é exatamente o tipo de coisa que o cliente
 * percebe e cobra, com razão.
 *
 * Para ENCERRAR a oferta: `bonus_lancamento_redacoes_anual = 0` no banco,
 * `0` aqui, e `BONUS_ANUAL_ATIVO = false` no app (src/config/lancamento.js).
 * Quem já assinou não perde nada: o bônus está gravado na assinatura dele.
 */
export const BONUS_LANCAMENTO_REDACOES_ANUAL = 4

/**
 * Quantas redações/mês o plano REALMENTE entrega, já com o bônus do anual.
 * A vitrine tem que mostrar o que a pessoa recebe, não a linha da tabela.
 */
export function getRedacoesPorMes(plan) {
    const bonus = plan.tipo === 'anual' ? BONUS_LANCAMENTO_REDACOES_ANUAL : 0
    return { total: (plan.redacoes_por_mes || 0) + bonus, bonus }
}
