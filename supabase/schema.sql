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
-- Seed: lista de presentes criativa e divertida
-- ============================================================

INSERT INTO presentes (nome, descricao, valor, imagem_url) VALUES
  ('Agenda para o noivo anotar sempre que a noiva estiver certa',
   'Spoiler: vai precisar de muitas páginas!',
   100.00, '/gifts/memes/agenda-noivo.jpg'),
  ('Só pra não dizer que não dei nada',
   'Presente simbólico pra marcar presença com estilo!',
   104.05, '/gifts/memes/so-pra-nao-dizer.jpg'),
  ('Taxa pra a noiva não jogar o buquê para sua namorada',
   'Garantia de que o buquê vai pra longe da sua amada!',
   150.00, '/gifts/memes/taxa-buque-namorada-150.jpg'),
  ('Cobertor para o noivo estar coberto de razão',
   'Pelo menos no cobertor ele vai estar coberto de algo!',
   208.09, '/gifts/memes/cobertor-noivo-razao.jpg'),
  ('Cota para o robô aspirador evitar a fadiga',
   'Porque limpar a casa é coisa do passado!',
   245.80, '/gifts/memes/robo-aspirador.jpg'),
  ('Massagem para o noivo relaxar antes de ver a fatura do cartão',
   'Relaxa que a fatura vem depois... bem depois!',
   300.00, '/gifts/memes/massagem-noivo.jpg'),
  ('1 ano de corte de cabelo para o noivo',
   'Pra ele ficar sempre bonito pra noiva!',
   416.19, '/gifts/memes/1-ano-corte-cabelo.jpg'),
  ('Capacete para o noivo se defender do pau de macarrão',
   'Equipamento de segurança essencial para o lar!',
   430.00, '/gifts/memes/capacete-noivo.jpg'),
  ('Taxa para a noiva não jogar o buquê na sua namorada',
   'Versão premium da proteção anti-buquê!',
   468.21, '/gifts/memes/taxa-buque-namorada-468.jpg'),
  ('Cobertor pra noiva estar sempre coberta de razão',
   'Porque ela sempre tem razão mesmo!',
   510.00, '/gifts/memes/cobertor-noiva-razao.jpg'),
  ('Adote um boleto do casal',
   'Ajude o casal a domar a fera dos boletos!',
   630.89, '/gifts/memes/adote-boleto.jpg'),
  ('Ajuda para pagar a fatura do cartão da noiva',
   'Toda ajuda é bem-vinda quando o assunto é cartão!',
   840.00, '/gifts/memes/fatura-cartao-noiva.jpg'),
  ('Ajuda na aposentadoria do casal',
   'Investimento no futuro do casal mais fofo!',
   960.43, '/gifts/memes/aposentadoria-casal.jpg'),
  ('Deus tocou no seu coração',
   'Se Deus tocou, quem somos nós pra recusar?',
   1000.00, '/gifts/memes/deus-tocou-coracao.jpg'),
  ('Passeio de balão para esquecer a fatura do cartão',
   'Voando alto pra esquecer os problemas cá embaixo!',
   1480.63, '/gifts/memes/passeio-balao.jpg');
