export interface ChatbotResponse {
    message: string;
    intent: string;
    confidence: number;
}

export interface Contact {
    name: string;
    email: string;
    phone: string;
    department: string;
}

export interface NewsItem {
    title: string;
    date: string;
    content: string;
    link: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface ScheduleItem {
    course: string;
    day: string;
    time: string;
    location: string;
}

export interface Community {
    name: string;
    link: string;
}