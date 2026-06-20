<?php

namespace App\Data;

class Schedule
{
    /**
     * @return array{days: list<array{
     *     id: string,
     *     label: string,
     *     date: string,
     *     items: list<array{
     *         id: string,
     *         kind: string,
     *         start: string,
     *         end: string,
     *         title: string,
     *         speakerId?: string
     *     }>
     * }>}
     */
    public static function data(): array
    {
        return [
            'days' => [
                [
                    'id' => 'day-1',
                    'label' => 'DAY 1',
                    'date' => '5 APRIL',
                    'items' => [
                        [
                            'id' => 'day-1-registration',
                            'kind' => 'registration',
                            'start' => '08:30',
                            'end' => '09:15',
                            'title' => 'Registration',
                        ],
                        [
                            'id' => 'day-1-opening',
                            'kind' => 'session',
                            'start' => '09:15',
                            'end' => '09:30',
                            'title' => 'LARACON_INIT',
                            'speakerId' => 'nuno-maduro',
                        ],
                        [
                            'id' => 'day-1-talk-1',
                            'kind' => 'session',
                            'start' => '09:30',
                            'end' => '10:00',
                            'title' => 'Write better abstractions: lessons from an import system',
                            'speakerId' => 'dan-harrin',
                        ],
                        [
                            'id' => 'day-1-talk-2',
                            'kind' => 'session',
                            'start' => '10:00',
                            'end' => '10:30',
                            'title' => 'Handling the unhappy path',
                            'speakerId' => 'ryan-chandler',
                        ],
                        [
                            'id' => 'day-1-break-1',
                            'kind' => 'break',
                            'start' => '10:30',
                            'end' => '11:00',
                            'title' => 'break;',
                        ],
                        [
                            'id' => 'day-1-talk-3',
                            'kind' => 'session',
                            'start' => '11:00',
                            'end' => '11:30',
                            'title' => 'Things you didn\'t know you could do in CSS',
                            'speakerId' => 'leah-thompson',
                        ],
                        [
                            'id' => 'day-1-talk-4',
                            'kind' => 'session',
                            'start' => '11:30',
                            'end' => '12:00',
                            'title' => 'One billion rows with Laravel',
                            'speakerId' => 'tobias-petry',
                        ],
                        [
                            'id' => 'day-1-talk-5',
                            'kind' => 'session',
                            'start' => '12:00',
                            'end' => '12:30',
                            'title' => 'Unblocking your users with AI',
                            'speakerId' => 'peter-suhm',
                        ],
                        [
                            'id' => 'day-1-lunch',
                            'kind' => 'lunch',
                            'start' => '12:30',
                            'end' => '14:00',
                            'title' => 'lunch;',
                        ],
                        [
                            'id' => 'day-1-talk-6',
                            'kind' => 'session',
                            'start' => '14:00',
                            'end' => '14:30',
                            'title' => 'Against all odds: NativePHP for mobile one year later',
                            'speakerId' => 'simon-hamp',
                        ],
                        [
                            'id' => 'day-1-talk-7',
                            'kind' => 'session',
                            'start' => '14:30',
                            'end' => '15:00',
                            'title' => 'Composer Deep Dive',
                            'speakerId' => 'nils-adermann',
                        ],
                        [
                            'id' => 'day-1-talk-8',
                            'kind' => 'session',
                            'start' => '15:00',
                            'end' => '15:30',
                            'title' => 'Effective Code Reviews: What NOT to Do',
                            'speakerId' => 'luke-kuzmish',
                        ],
                        [
                            'id' => 'day-1-break-2',
                            'kind' => 'break',
                            'start' => '15:30',
                            'end' => '16:00',
                            'title' => 'break;',
                        ],
                        [
                            'id' => 'day-1-talk-9',
                            'kind' => 'session',
                            'start' => '16:00',
                            'end' => '16:30',
                            'title' => 'AI won\'t fail loudly — It\'ll fail quietly',
                            'speakerId' => 'yannick-kupferschmidt',
                        ],
                        [
                            'id' => 'day-1-keynote',
                            'kind' => 'session',
                            'start' => '16:30',
                            'end' => '17:30',
                            'title' => 'Laravel Update',
                            'speakerId' => 'taylor-otwell',
                        ],
                        [
                            'id' => 'day-1-social-drinks',
                            'kind' => 'social',
                            'start' => '17:30',
                            'end' => '18:30',
                            'title' => 'SOCIAL_DRINKS',
                        ],
                    ],
                ],
                [
                    'id' => 'day-2',
                    'label' => 'DAY 2',
                    'date' => '6 APRIL',
                    'items' => [
                        [
                            'id' => 'day-2-welcoming',
                            'kind' => 'registration',
                            'start' => '08:30',
                            'end' => '09:15',
                            'title' => 'Welcoming',
                        ],
                        [
                            'id' => 'day-2-opening',
                            'kind' => 'session',
                            'start' => '09:15',
                            'end' => '09:30',
                            'title' => 'LARACON_INIT',
                            'speakerId' => 'nuno-maduro',
                        ],
                        [
                            'id' => 'day-2-talk-1',
                            'kind' => 'session',
                            'start' => '09:30',
                            'end' => '10:00',
                            'title' => 'State of the Frontend',
                            'speakerId' => 'joe-tannenbaum',
                        ],
                        [
                            'id' => 'day-2-talk-2',
                            'kind' => 'session',
                            'start' => '10:00',
                            'end' => '10:30',
                            'title' => 'Building applications like Puzzles',
                            'speakerId' => 'wendell-adriel',
                        ],
                        [
                            'id' => 'day-2-break-1',
                            'kind' => 'break',
                            'start' => '10:30',
                            'end' => '11:00',
                            'title' => 'break;',
                        ],
                        [
                            'id' => 'day-2-talk-3',
                            'kind' => 'session',
                            'start' => '11:00',
                            'end' => '11:30',
                            'title' => 'This shouldn\'t work',
                            'speakerId' => 'shane-rosenthal',
                        ],
                        [
                            'id' => 'day-2-talk-4',
                            'kind' => 'session',
                            'start' => '11:30',
                            'end' => '12:00',
                            'title' => 'How real-world UX helps your projects thrive',
                            'speakerId' => 'pete-heslop',
                        ],
                        [
                            'id' => 'day-2-talk-5',
                            'kind' => 'session',
                            'start' => '12:00',
                            'end' => '12:30',
                            'title' => 'Ship to Production on DAY 1',
                            'speakerId' => 'john-drexler',
                        ],
                        [
                            'id' => 'day-2-lunch',
                            'kind' => 'lunch',
                            'start' => '12:30',
                            'end' => '14:30',
                            'title' => 'lunch;',
                        ],
                        [
                            'id' => 'day-2-talk-6',
                            'kind' => 'session',
                            'start' => '14:30',
                            'end' => '15:00',
                            'title' => 'Imports, a war story',
                            'speakerId' => 'daniel-coulbourne',
                        ],
                        [
                            'id' => 'day-2-talk-7',
                            'kind' => 'session',
                            'start' => '15:00',
                            'end' => '15:30',
                            'title' => 'Refactoring to Parallel',
                            'speakerId' => 'marcel-pociot',
                        ],
                        [
                            'id' => 'day-2-break-2',
                            'kind' => 'break',
                            'start' => '15:30',
                            'end' => '16:00',
                            'title' => 'break;',
                        ],
                        [
                            'id' => 'day-2-panel',
                            'kind' => 'session',
                            'start' => '16:00',
                            'end' => '17:15',
                            'title' => 'Laravel Panel',
                        ],
                        [
                            'id' => 'day-2-social-drinks',
                            'kind' => 'social',
                            'start' => '17:30',
                            'end' => '18:30',
                            'title' => 'SOCIAL_DRINKS',
                        ],
                    ],
                ],
            ],
        ];
    }
}
