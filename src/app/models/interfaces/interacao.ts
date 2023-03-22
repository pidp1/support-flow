import { Usuario } from "./usuario";

export interface Interacao {
    data: any,
    mensagem: string,
    usuario?: Usuario,
    arquivo?: string[],
    mudancas?: string[]
}
