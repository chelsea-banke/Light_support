export class User {
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

export class Client {
    id: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    email: string | undefined
    contact: string | undefined
}

export interface Fault {
    id: string
    description: string
    status: string
    location: string | null
    createdDate: string
    updateDate: string
}

export interface Asset {
    id: string
    type: string
    longitude: string
    latitude: string | null
    address: string
}
export interface Ticket {
    id: string
    priority: string,
    status: string,
    idUser: string,
    idFault: string,
    longitude: number
    latitude: number
    address: string
}