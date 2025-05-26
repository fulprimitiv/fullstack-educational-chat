export class CommunitiesController {
    private communities: string[];

    constructor() {
        this.communities = [
            "Student Government Association",
            "Cultural Clubs",
            "Academic Societies",
            "Sports Teams",
            "Volunteer Organizations"
        ];
    }

    public getCommunities(): string[] {
        return this.communities;
    }
}