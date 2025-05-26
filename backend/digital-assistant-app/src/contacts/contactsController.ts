export class ContactsController {
    private contacts: { name: string; email: string; position: string }[];

    constructor() {
        this.contacts = [
            { name: "Dr. John Smith", email: "john.smith@university.edu", position: "Professor of Computer Science" },
            { name: "Dr. Jane Doe", email: "jane.doe@university.edu", position: "Head of Mathematics Department" },
            { name: "Mr. Alan Brown", email: "alan.brown@university.edu", position: "Student Affairs Coordinator" },
            { name: "Ms. Emily White", email: "emily.white@university.edu", position: "Librarian" }
        ];
    }

    public getContacts() {
        return this.contacts;
    }
}