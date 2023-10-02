import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  showValidationErrors = false;
  loginError = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    // Check if the form is valid before proceeding with authentication
    if (this.loginForm.valid) {
      // Form is valid, proceed with authentication logic here
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      // Example: Check credentials (replace with your actual authentication logic)
      if (username === 'eman' && password === 'password') {
        // Successful login, navigate to the dashboard or perform other actions
        // For now, we'll just log a success message and navigate to the dashboard
        console.log('Login successful');
        this.router.navigate(['/dashboard']);
        // Reset login error and hide validation errors
        this.loginError = false;
        this.showValidationErrors = false;
      } else {
        // Handle authentication failure (show error message, etc.)
        console.log('Login failed: Invalid credentials');
        this.loginError = true;
      }
    } else {
      // Form is invalid, display validation errors to the user
      // Angular will automatically display error messages in the template
      console.log('Form is invalid');
      this.showValidationErrors = true;
    }
  }
}
