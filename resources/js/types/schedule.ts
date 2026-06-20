export type ScheduleItemKind =
    | 'break'
    | 'lunch'
    | 'registration'
    | 'session'
    | 'social';

export type ScheduleItem = {
    end: string;
    id: string;
    kind: ScheduleItemKind;
    speakerId?: string;
    start: string;
    title: string;
};

export type ScheduleDay = {
    date: string;
    id: string;
    items: ScheduleItem[];
    label: string;
};

export type ScheduleData = {
    days: ScheduleDay[];
};
