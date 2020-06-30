import { HttpPatchOperations, HttpPatchOperation } from './http-patch-operations';

export abstract class BaseModel {
    public id: number;
}

export function toHttpPatchOperations(entity: any): HttpPatchOperations {
    const operations: HttpPatchOperations = [];
    for (const key in entity) {
        // console.log(key);
        if (entity[key]) {
            operations.push(new HttpPatchOperation('replace', `/${key}`, entity[key]));
        }
    }
    return operations;
}
