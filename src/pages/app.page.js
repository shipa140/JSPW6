import { MainPage, RegisterPage, YourFeedPage, EditorPage, ArticlePage, LoginPage } from './index';

//Фасад
export class App {
    constructor (page) {
        this.page = page;
        this.main = new MainPage(page);
        this.register = new RegisterPage(page);
        this.yourfeed = new YourFeedPage(page);
        this.editor = new EditorPage(page);
        this.article = new ArticlePage(page);
        this.login = new LoginPage(page);
    }
}

