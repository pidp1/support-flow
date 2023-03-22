import { Status } from "../enums/status";

export interface HomeManager {

    idChamado?: number;
    assunto: string;
    descricao: string;
    status: Status;
    dataAbertura: Date;
    assignarChamado: string;
    listagemUsuarios: string;
    relatorioGerencial: string
    
}