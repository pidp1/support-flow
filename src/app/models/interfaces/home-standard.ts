import { Status } from "../enums/status";

export interface HomeStandard {

    idChamado?: number;
    assunto: string;
    descricao: string;
    status: Status;
    dataAbertura: Date
    
}