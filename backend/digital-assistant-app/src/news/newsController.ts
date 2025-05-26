export class NewsController {
    private news: Array<{ id: number; title: string; content: string; date: string }> = [];

    constructor() {
        this.news = [
            { id: 1, title: "Welcome to the New Semester!", content: "Classes start on September 1st. Don't forget to check your schedules.", date: "2023-08-15" },
            { id: 2, title: "Campus Safety Updates", content: "New safety protocols have been implemented. Please review them on the campus website.", date: "2023-08-20" },
            { id: 3, title: "Student Orientation", content: "Join us for the student orientation on August 30th at the main hall.", date: "2023-08-25" }
        ];
    }

    public getNews() {
        return this.news;
    }
}