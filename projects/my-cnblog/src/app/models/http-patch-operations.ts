export type HttpPatchOperations = HttpPatchOperation[];

export class HttpPatchOperation {
    constructor(
        public op: string,
        public path: string,
        public value: any) { }
}
