export class FaqController {
    private faqs: { question: string; answer: string }[];

    constructor() {
        this.faqs = [
            { question: "How do I register for classes?", answer: "You can register for classes through the university's student portal." },
            { question: "What resources are available for academic support?", answer: "The university offers tutoring services, writing centers, and academic advising." },
            { question: "Where can I find the campus map?", answer: "The interactive campus map is available on the university's website under the 'Campus Map' section." },
            { question: "How do I contact my professors?", answer: "You can find contact information for faculty in the 'Contacts' section of the digital assistant." },
            { question: "What should I do if I have a problem with my classes?", answer: "You should reach out to your academic advisor or the registrar's office for assistance." }
        ];
    }

    public getFAQs() {
        return this.faqs;
    }
}