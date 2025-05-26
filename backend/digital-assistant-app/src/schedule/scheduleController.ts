import { ScheduleItem } from '../types';

export class ScheduleController {
    private schedule: ScheduleItem[];

    constructor() {
        this.schedule = [];
    }

    public getSchedule(): ScheduleItem[] {
        return this.schedule;
    }

    public addScheduleItem(item: ScheduleItem): void {
        this.schedule.push(item);
    }

    public removeScheduleItem(itemId: string): void {
        // ScheduleItem не содержит id, поэтому фильтрация по course+day+time+location
        this.schedule = this.schedule.filter(item =>
            item.course + item.day + item.time + item.location !== itemId
        );
    }
}