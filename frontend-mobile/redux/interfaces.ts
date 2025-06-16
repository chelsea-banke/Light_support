export class User {
    firstName: string | undefined
    lastName: string | undefined
    contact: string | undefined

    getFullName(): string | undefined {
        if (this.firstName && this.lastName) {
            return `${this.firstName} ${this.lastName}`;
        }
        return undefined;
    }
}

export interface Fault {
    id: string
    description: string
    status: string
    location: string | null
    createdDate: string
    updateDate: string
}