import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mensagem-erro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensagem-erro.component.html',
  styleUrl: './mensagem-erro.component.css'
})
export class MensagemErroComponent {

  @Input( ) controle!: FormControl;
}
