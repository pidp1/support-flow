import { Classificacao } from "../enums/classificacao";
import { listaProduto } from "../enums/listaProduto";
import { Prioridade } from "../enums/prioridade";
import { Status } from "../enums/status";
import { Interacao } from "./interacao";
import { Usuario } from "./usuario";

export interface Chamado {
    idChamado?: string;
    idSimples?: number;
    usuario?: Usuario;
    produto: listaProduto;
    assunto: string;
    descricao: string;
    anexos?:string[];
    status: Status;
    prioridade: Prioridade;
    classificacao: Classificacao;
    dataAbertura: Date;
    dataFechamento?: Date;
    interacao: Interacao[];
    historico: Interacao[];
    responsavel?: Usuario;
    sortIndex?: number;
    arquivar?: boolean;
}
