export class YourFeedPage {

    constructor (page)
     {
        this.page = page;

        this.profileName = page.getByRole('navigation');
        this.tags = page.getByRole('button', { name: 'реклама' });
        this.feedtags = page.locator('li.nav-item button:has(i.ion-pound):has-text("реклама")');
     }

    async getProfileName() {
        return this.profileName;
    }

    async tagsfeed() {
        await this.tags.click();

    }

    async getFeedTags() {
        return this.feedtags;
    }

}


