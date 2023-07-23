import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class AtualizaUsuarioDTO {
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'E-mail já cadastrado anteriormente' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
  @IsOptional()
  senha: string;
}
