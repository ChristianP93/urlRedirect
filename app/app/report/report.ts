export class Report {
    constructor(
        public _id: Number,
        public refer: string,
        public created: Date,
        public url: string,
        public gender: string,
        public notatype: string,
        public acquiredIn: Date,
        public geoinfo: string,
        public vendorId: string,
        public productId: string
    ) { }
}
