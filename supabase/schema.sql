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
-- Seed: experiential gifts (non-material, based on couple's story)
-- ============================================================

INSERT INTO presentes (nome, descricao, valor, imagem_url) VALUES
  ('Jantar Japones Especial', 'Um jantar no nosso lugar favorito — onde tudo comecou e onde o pedido aconteceu.', 350.00, '/gifts/jantar-japones.svg'),
  ('Noite de Cinema em Casa', 'Nosso programa favorito: pipoca, cobertas e um filme bom.', 200.00, '/gifts/cinema-em-casa.svg'),
  ('Viagem Romantica', 'De Paraty a Monte Verde, a gente adora fazer as malas. Contribua para a proxima aventura!', 500.00, '/gifts/viagem-romantica.svg'),
  ('Dia de Spa a Dois', 'Um dia inteiro de calma, massagem e relaxamento — a cara do nosso jeito de curtir.', 400.00, '/gifts/spa-a-dois.svg'),
  ('Sabado na Feira', 'Pastel, caldo de cana e frutas frescas — o ritual sagrado de todo sabado.', 150.00, '/gifts/feira-e-pastel.svg'),
  ('Aventura na Neve', 'Las Lenas ja foi, e a gente quer mais! Ajude o casal a voltar pra neve.', 800.00, '/gifts/aventura-neve.svg'),
  ('Noite Estrelada', 'Uma noite romantica ao ar livre, com vista pro ceu.', 250.00, '/gifts/noite-estrelada.svg'),
  ('Dia de Praia', 'Guaruja, litoral de SP — o importante e estar juntos com pe na areia.', 300.00, '/gifts/dia-de-praia.svg'),
  ('Aula de Culinaria a Dois', 'Queremos aprender a cozinhar junto — de massas italianas a sushi (claro).', 350.00, '/gifts/aula-culinaria.svg'),
  ('Piquenique Romantico', 'Cesta, vinho, queijos e uma toalha xadrez no parque. Simples e a nossa cara.', 200.00, '/gifts/piquenique.svg'),
  ('Lua de Mel', 'O grande sonho pos-casamento! Qualquer valor ajuda a tornar essa viagem inesquecivel.', 1000.00, '/gifts/lua-de-mel.svg'),
  ('Experiencia Gastronomica', 'Jantar degustacao num restaurante especial com harmonizacao de vinhos.', 450.00, '/gifts/experiencia-gastronomica.svg'),
  ('Noite de Jogos', 'Board games, cartas e muita risada — ajude a expandir a colecao!', 180.00, '/gifts/noite-jogos.svg');
