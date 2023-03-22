import { Status } from "../enums/status";

export interface HomeDevTeam{
    
    idChamado?: number;
    assunto: string;
    descricao: string;
    status: Status;
    dataAbertura: Date;
    assignarChamado: string;




}