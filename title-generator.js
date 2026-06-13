// =======================
// RANDOM TITLE GENERATOR
// =======================

const START_EMOJI = [
    "😎","🔥","👀","🤖","🚀","💀","💋","💅","👑","😈","⚡","💥"];

const END_EMOJI = [
    "💅","💪","🙋","🌸","✨","💖","🤑","📈","💰","👑","🔥","⚡"];

const TITLE_1 = [
    "Funny Cat",
    "Anime Girl",
    "Crypto Pump",
    "Hot Video"
];

const TITLE_2 = [
    "Viral Update",
    "Big Profit",
    "Cute Moments",
    "Breaking News"
];

function randomItem(arr) {

    return arr[
        Math.floor(
            Math.random() * arr.length
        )
    ];

}

const START_EMOJI_COUNT = 2;

const END_EMOJI_COUNT = 3;

function randomEmojis(arr, count) {

    let result = "";

    for (
        let i = 0;
        i < count;
        i++
    ) {

        result +=
            randomItem(arr);

    }

    return result;

}

export function generateRandomTitle() {

const views =
    Math.floor(
        Math.random() * 9900
    ) + 100;

const formattedViews =
    views.toLocaleString(
        "id-ID"
    );

    return (
        `${randomEmojis(
    START_EMOJI,
    START_EMOJI_COUNT
)} ` +
        `${randomItem(TITLE_1)} | ` +
        `${randomItem(TITLE_2)} ` +
        `${randomEmojis(
    END_EMOJI,
    END_EMOJI_COUNT
)} ` +
        `View: ${formattedViews}K`
    );

}