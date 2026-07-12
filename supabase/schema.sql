-- Poliete & Ygor - Wedding Website
-- Supabase schema: tables, RLS policies, and seed data
--
-- How to apply:
-- 1. Go to your Supabase project dashboard -> SQL Editor
-- 2. Paste the entire contents of this file
-- 3. Click "Run"
-- 4. Copy the project URL and anon key from Settings -> API
-- 5. Paste them into .env:
--      VITE_SUPABASE_URL=https://your-actual-project.supabase.co
--      VITE_SUPABASE_ANON_KEY=your-actual-anon-key

-- ============================================================
-- Tables
-- ============================================================

CREATE TABLE rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT,
  telefone TEXT,
  acompanhantes INT DEFAULT 0,
  restricoes_alimentares TEXT,
  mensagem TEXT,
  confirmado BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE presentes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  valor DECIMAL(10,2),
  imagem_url TEXT,
  reservado_por TEXT,
  reservado_em TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE mural (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  autor TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  aprovado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Enable Row Level Security
-- ============================================================

ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mural ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS Policies: rsvp
-- ============================================================

-- Public (anon) can submit an RSVP
CREATE POLICY "Allow public insert on rsvp"
  ON rsvp FOR INSERT
  TO anon
  WITH CHECK (true);

-- ============================================================
-- RLS Policies: presentes
-- ============================================================

-- Public (anon) can view the gift list
CREATE POLICY "Allow public select on presentes"
  ON presentes FOR SELECT
  TO anon
  USING (true);

-- Public (anon) can reserve a gift that is not yet reserved
CREATE POLICY "Allow reserve unreserved gift"
  ON presentes FOR UPDATE
  TO anon
  USING (reservado_por IS NULL)
  WITH CHECK (reservado_por IS NOT NULL);

-- ============================================================
-- RLS Policies: mural
-- ============================================================

-- Public (anon) can post a message to the guest wall
CREATE POLICY "Allow public insert on mural"
  ON mural FOR INSERT
  TO anon
  WITH CHECK (true);

-- Public (anon) can only see approved messages
CREATE POLICY "Allow public select approved messages"
  ON mural FOR SELECT
  TO anon
  USING (aprovado = true);

-- ============================================================
-- Seed: sample gifts (remove or replace with real data)
-- ============================================================

INSERT INTO presentes (nome, descricao, valor) VALUES
  ('Jogo de Toalhas', 'Conjunto com 5 pecas em algodao egipcio', 250.00),
  ('Jogo de Panelas', 'Antiaderente 10 pecas', 450.00),
  ('Cafeteira Expresso', 'Maquina de cafe automatica', 600.00),
  ('Jogo de Cama King', 'Percal 400 fios', 380.00),
  ('Aspirador Robot', 'Limpeza inteligente automatica', 900.00),
  ('Conjunto de Tacas', 'Cristal 12 pecas para vinho e champagne', 320.00);
