-- =============================================
-- Tabela: tb_candidaturas_beta
-- Candidaturas ao programa de beta testers
-- =============================================

CREATE TABLE IF NOT EXISTS public.tb_candidaturas_beta (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  perfil TEXT NOT NULL,
  objetivo TEXT,
  tempo_estudo TEXT NOT NULL,
  horas_semana TEXT NOT NULL,
  motivacao TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente',
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Índice único no email para evitar duplicatas
CREATE UNIQUE INDEX IF NOT EXISTS idx_candidaturas_beta_email
  ON public.tb_candidaturas_beta (email);

-- Comentário na tabela
COMMENT ON TABLE public.tb_candidaturas_beta IS 'Candidaturas ao programa de beta testers do RendiPRO';

-- =============================================
-- RLS: Ativado, apenas INSERT via anon
-- =============================================

ALTER TABLE public.tb_candidaturas_beta ENABLE ROW LEVEL SECURITY;

-- Permite apenas inserção por usuários não autenticados (anon key)
-- Não permite leitura, update ou delete pelo frontend
CREATE POLICY "anon_insert_only"
  ON public.tb_candidaturas_beta
  FOR INSERT
  TO anon
  WITH CHECK (true);
