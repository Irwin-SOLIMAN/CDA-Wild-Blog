import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  newMessage: Message = {
    lastname: '',
    firstname: '',
    email: '',
    content: '',
  };

  onSubmit(form: NgForm): void {
    console.log(this.newMessage);

    form.resetForm();
  }
}
