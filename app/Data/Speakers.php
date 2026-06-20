<?php

namespace App\Data;

class Speakers
{
    /**
     * @return array{speakers: list<array{
     *     id: string,
     *     name: string,
     *     title?: string,
     *     photoUrl?: string
     * }>}
     */
    public static function data(): array
    {
        return [
            'speakers' => [
                [
                    'id' => 'taylor-otwell',
                    'name' => 'Taylor Otwell',
                    'title' => 'Founder of Laravel',
                ],
                [
                    'id' => 'nuno-maduro',
                    'name' => 'Nuno Maduro',
                    'title' => 'Partner at Thunk',
                ],
                [
                    'id' => 'dan-harrin',
                    'name' => 'Dan Harrin',
                    'title' => 'Co-Creator of Filament',
                ],
                [
                    'id' => 'ryan-chandler',
                    'name' => 'Ryan Chandler',
                    'title' => 'Partner at Thunk',
                ],
                [
                    'id' => 'leah-thompson',
                    'name' => 'Leah Thompson',
                    'title' => 'Software Engineer at Laravel',
                ],
                [
                    'id' => 'tobias-petry',
                    'name' => 'Tobias Petry',
                    'title' => 'Database Specialist',
                ],
                [
                    'id' => 'peter-suhm',
                    'name' => 'Peter Suhm',
                    'title' => 'Managing Director & Author',
                ],
                [
                    'id' => 'simon-hamp',
                    'name' => 'Simon Hamp',
                    'title' => 'Co-Founder of NativePHP',
                ],
                [
                    'id' => 'nils-adermann',
                    'name' => 'Nils Adermann',
                    'title' => 'Co-Founder of Private Packagist',
                ],
                [
                    'id' => 'luke-kuzmish',
                    'name' => 'Luke Kuzmish',
                    'title' => 'Sr. Software Engineer at Laravel',
                ],
                [
                    'id' => 'yannick-kupferschmidt',
                    'name' => 'Yannick Kupferschmidt',
                    'title' => 'Team Lead PHP at byte5',
                ],
                [
                    'id' => 'joe-tannenbaum',
                    'name' => 'Joe Tannenbaum',
                    'title' => 'Operations at TailwindLabs',
                ],
                [
                    'id' => 'wendell-adriel',
                    'name' => 'Wendell Adriel',
                    'title' => 'Software Engineer',
                ],
                [
                    'id' => 'shane-rosenthal',
                    'name' => 'Shane Rosenthal',
                    'title' => 'DevRel Engineer at Laravel',
                ],
                [
                    'id' => 'pete-heslop',
                    'name' => 'Pete Heslop',
                    'title' => 'CTO at BeyondCode',
                ],
                [
                    'id' => 'john-drexler',
                    'name' => 'John Drexler',
                    'title' => 'Software Engineer at Laravel',
                ],
                [
                    'id' => 'daniel-coulbourne',
                    'name' => 'Daniel Coulbourne',
                    'title' => 'Software Engineer at Laravel',
                ],
                [
                    'id' => 'marcel-pociot',
                    'name' => 'Marcel Pociot',
                    'title' => 'CTO at BeyondCode',
                ],
            ],
        ];
    }
}
