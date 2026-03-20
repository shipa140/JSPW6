export class RegisterPage {
    constructor(page) {
      this.page = page;
  
    // технические описание страниы - селекторы/локаторы/элементы страницы
      this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
      this.emailInput = page.getByRole('textbox', { name: 'Email' });
      this.passwordInput = page.getByRole('textbox', { name: 'Password' });
      this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    }
  
    // бизнесовые сценарии - методы, которые описывают действия пользователя на странице
    // регистрация нового пользователя
    async signup(user){
      const {username, email, password} = user;
  
      await this.nameInput.click();
      await this.nameInput.fill(username);
      await this.emailInput.click();
      await this.emailInput.fill(email);
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
      await this.signUpButton.click();
  
    }
  
  } 