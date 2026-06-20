export type Speaker = {
    id: string;
    name: string;
    photoUrl?: string;
    title?: string;
};

export type SpeakersData = {
    speakers: Speaker[];
};
