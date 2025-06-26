export class Client {
    firstName: string | undefined
    lastName: string | undefined
    contact: string | undefined

    constructor(firstName?: string, lastName?: string, contact?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.contact = contact;
    }

    getFullName(): string | undefined {
        if (this.firstName && this.lastName) {
            return `${this.firstName} ${this.lastName}`;
        }
        return undefined;
    }
}

export class FieldTech {
    firstName: string | undefined
    lastName: string | undefined
    matricule: string | undefined

    constructor(firstName?: string, lastName?: string, matricule?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.matricule = matricule;
    }

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