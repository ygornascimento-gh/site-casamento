export interface Rsvp {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  acompanhantes: number;
  restricoes_alimentares: string | null;
  mensagem: string | null;
  confirmado: boolean;
  created_at: string;
}

export interface Presente {
  id: string;
  nome: string;
  descricao: string | null;
  valor: number | null;
  imagem_url: string | null;
  reservado_por: string | null;
  reservado_em: string | null;
  created_at: string;
}

export interface MuralMessage {
  id: string;
  autor: string;
  mensagem: string;
  aprovado: boolean;
  created_at: string;
}
