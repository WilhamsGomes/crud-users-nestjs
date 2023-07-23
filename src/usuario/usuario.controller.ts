import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      messagem: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
      id,
      novosDados,
    );
    return {
      usuario: usuarioAtualizado,
      messagem: 'Usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioremovido = await this.usuarioRepository.remove(id);

    return {
      usuario: usuarioremovido,
      messagem: 'Usuário removido com sucesso',
    };
  }
}