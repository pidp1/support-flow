import { Classificacao } from "../enums/classificacao";
import { listaProduto } from "../enums/listaProduto";
import { Prioridade } from "../enums/prioridade";
import { Status } from "../enums/status";
import { Usuario } from "./usuario";

export interface ListaChamados {
    idChamado?: string;
    usuario?: Usuario;
    produto: listaProduto;
    assunto: string;
    descricao: string;
    status: Status;
    prioridade: Prioridade;
    classificacao: Classificacao;
    dataAbertura: Date;
    responsavel?: Usuario
}
