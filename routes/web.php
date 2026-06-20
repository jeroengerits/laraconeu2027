<?php

use App\Data\Schedule;
use App\Data\Speakers;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome', [
    'schedule' => Schedule::data(),
    'speakers' => Speakers::data(),
])->name('home');
Route::inertia('/styleguide', 'styleguide')->name('styleguide');
