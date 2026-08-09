-- Execute este script no Supabase SQL Editor
-- Cria tabela de configuração e adiciona campo de telefone nos presentes

-- 1. Tabela de configuração (chave-valor segura)
CREATE TABLE IF NOT EXISTS configuracao (
  chave TEXT PRIMARY KEY,
  valor TEXT NOT NULL
);

ALTER TABLE configuracao ENABLE ROW LEVEL SECURITY;

-- Público pode apenas LER configurações (nunca alterar)
CREATE POLICY "Allow public select on configuracao"
  ON configuracao FOR SELECT
  TO anon
  USING (true);

-- 2. Inserir o número de WhatsApp do noivo (ALTERE AQUI)
-- Troque '5500000000000' pelo número real com código do país (55) + DDD + número
INSERT INTO configuracao (chave, valor) VALUES
  ('whatsapp_noivo', '5500000000000');

-- 3. Adicionar campo de telefone na tabela presentes
ALTER TABLE presentes ADD COLUMN IF NOT EXISTS telefone_reserva TEXT;
