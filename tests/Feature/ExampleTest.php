<?php

use App\Data\Schedule;
use App\Data\Speakers;

test('returns a successful response', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
});

test('omits the unused conference schedule from the welcome page', function () {
    $response = $this->get(route('home'));

    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->missing('schedule')
    );

    expect(Schedule::data()['days'])->toHaveCount(3)
        ->sequence(
            fn ($day) => $day->id->toBe('day-1'),
            fn ($day) => $day->id->toBe('day-2'),
            fn ($day) => $day->id->toBe('day-3'),
        );
});

test('omits the unused conference speakers from the welcome page', function () {
    $response = $this->get(route('home'));

    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->missing('speakers')
    );

    expect(Speakers::data()['speakers'])->toHaveCount(18);
    expect(Speakers::data()['speakers'][0]['id'])->toBe('taylor-otwell');
});

test('renders the styleguide', function () {
    $this->get(route('styleguide'))->assertInertia(fn ($page) => $page
        ->component('styleguide')
    );
});
