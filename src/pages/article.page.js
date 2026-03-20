export class articlePage {

    constructor (page)
     {
        this.page = page;

        this.content = page.locator('.article-content p');
        this.title = page.locator('.banner h1');
        this.comment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.postcomments = page.getByRole('button', { name: 'Post Comment' });
        this.comments = page.locator('.card-text');
        this.delcom = page.locator('.card-footer button:has(.ion-trash-a)');
        

     }

    async postComment(comments) {
        const {body} = comments;

        //await this.comment.click();
        await this.comment.fill(body);
        await this.postcomments.click();
    }

    async delComment() {
        // Создаем promise для ожидания диалога
        const dialogPromise = this.page.waitForEvent('dialog');
        
        // Кликаем кнопку удаления
        await this.delcom.click();
        
        // Ждем диалог и подтверждаем
        const dialog = await dialogPromise;
        await dialog.accept();
    }
}
 
