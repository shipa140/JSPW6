import {faker} from '@faker-js/faker';

export class CommentsBuilder {

    body() {
        this.body = faker.lorem.paragraph();
        return this;
    }

    build() {
        const result = {...this};
        return result;
    }

}
