export class Report {
    constructor(
        public _id: Number,
        public userId: string,
        public created: Date,
        public url: string,
        public gender: string,
        public notatype: string,
        public acquired: Date,
        public geoinfo: string,
        public vendorId: string,
        public productId: string
    ) { }
}
