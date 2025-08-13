import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { ContatoService } from '../../services/contato.service';
import { MensagemErroComponent } from "../../componentes/mensagem-erro/mensagem-erro.component";


@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule,
    RouterLink,
    MensagemErroComponent
],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})


export class FormularioContatoComponent implements OnInit {

  contatoForm!: FormGroup;


  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.caregarContato();
  }

  inicializarFormulario(): void {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl(''),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl('')
    });
  }

  obterControle(nome: string): FormControl {
    const controle = this.contatoForm.get(nome);
    return controle as FormControl;
  }

  caregarContato() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.contatoService.buscarContatoPorId(parseInt(id!)).subscribe((contato) => {
      this.contatoForm.patchValue({
        nome: contato.nome,
        telefone: contato.telefone,
        email: contato.email,
        aniversario: contato.aniversario,
        redes: contato.redes,
        observacoes: contato.observacoes
      });
      this.contatoForm.addControl('id', new FormControl(contato.id));
    });
  } 

  salvarContato(): void {
    const novoContato = this.contatoForm.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id'); 
    novoContato.id = id ? parseInt(id) : null;

    this.contatoService.editarOuSalvarContato(novoContato).subscribe(() => {
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  selecionandoArquivo(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.lerArquivo(file);
    }
  }

  lerArquivo(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if(reader.result) {
        this.contatoForm.get('avatar')?.setValue(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  }

  cancelar() {
    this.contatoForm.reset();
  }
}
