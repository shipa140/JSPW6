export class MainPage {

    constructor (page)
     {
        this.page = page;
        this.signuplink = page.getByRole('link', { name: 'Sign up' });
        this.loginlink = page.getByRole('link', { name: 'Login' });
        this.newarticle = page.locator('.nav-link:has-text("New Article")');
        this.firstArticle = page.locator('.article-preview').first();
     }

    async gotoRegister() {
        await this.signuplink.click();
    }

    async gotoLogin() {
        await this.loginlink.click();
    }

    async open() {
        await this.page.goto('https://realworld.qa.guru/');
    }

    async newArticle() {
        await this.newarticle.click();
    }

    async OpenArticle() {
        await this.firstArticle.click();
    }
}

 