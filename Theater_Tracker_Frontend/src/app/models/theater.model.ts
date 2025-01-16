import { User } from "./user.model";

export class Theater {
    constructor(
        public address: string,
        public id: number,
        public latitude: number,
        public longitude: number,
        public name: string,
        public numScreens: number,
        public users: null | Array<User>
    ) {}
}