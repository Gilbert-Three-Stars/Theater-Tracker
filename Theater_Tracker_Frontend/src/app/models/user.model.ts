import { Theater } from "./theater.model";

export class User {
    constructor(
        public id: number,
        public email: null | string,
        public username: string,
        public passwordHash: string,
        public theaterBookmarks: null | Array<Theater>
    ) {}
}