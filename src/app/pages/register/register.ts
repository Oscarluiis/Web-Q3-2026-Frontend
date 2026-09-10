import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  // 3 variables, inputs, fullName, email, password
  fullName: string = '';
  email: string = '';
  password: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.register(this.fullName, this.email, this.password).subscribe({
      next: result => {
        this.successMessage = 'Cuenta creada. Ahora inicia sesion.';
        this.isLoading = false;
        setTimeout(()=> this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar, Intenta de nuevo';
        this.isLoading = false;
      }
    })
  }
}
