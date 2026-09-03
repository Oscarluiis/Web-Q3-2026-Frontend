import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  errorMessage: string = '';

  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin (): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        //Guardamos el token en el localstorage
        this.authService.saveToken(response.token);
        //Mover al usuario a la pantalla de notas
        this.router.navigate(['/notes']);
      },
      error: () =>{
        this.errorMessage = 'Crendenciales invalidas, Intenta de nuevo';
        this.isLoading = false;
      }
    })
  }
}
