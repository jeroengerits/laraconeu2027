<?php

use App\Data\Schedule;
use App\Data\Speakers;

test('returns a successful response', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
});

test('shares the conference schedule with the welcome page', function () {
    $response = $this->get(route('home'));

    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->has('schedule.days', 2)
        ->where('schedule.days.0.id', 'day-1')
        ->where('schedule.days.1.id', 'day-2')
    );

    expect(Schedule::data()['days'])->toHaveCount(2);
});

test('shares the conference speakers with the welcome page', function () {
    $response = $this->get(route('home'));

    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->has('speakers.speakers', 18)
        ->where('speakers.speakers.0.id', 'taylor-otwell')
    );

    expect(Speakers::data()['speakers'])->toHaveCount(18);
});
