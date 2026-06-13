(async () => {
	
const {
    generateRandomTitle
} = await import(
    chrome.runtime.getURL(
        "title-generator.js"
    )
);

const wait = (t) =>
    new Promise(r => setTimeout(r, t));

const setVal = (sel, val) => {

    const el =
        document.querySelector(sel);

    if (!el) return false;

    el.focus();

    el.value = val;

    el.dispatchEvent(
        new Event("input", {
            bubbles: true
        })
    );

    el.dispatchEvent(
        new Event("change", {
            bubbles: true
        })
    );

    return true;
};

// =======================
// AUTO LOGIN CHECK
// =======================

const cfg =
    await chrome.storage.local.get([
        "loginUrl",
        "loginEmail",
        "loginPassword"
    ]);

const bodyText =
    document.body.innerText
        .toLowerCase();

const expired =
    bodyText.includes("419") ||
    bodyText.includes("page expired");

const loginPage =
    document.querySelector(
        'input[type="password"]'
    );

if (expired || loginPage) {

    console.log(
        "LOGIN DETECTED"
    );

    // redirect ke login jika 419
    if (
        expired &&
        cfg.loginUrl &&
        location.href !== cfg.loginUrl
    ) {

        location.href =
            cfg.loginUrl;

        return;
    }

    await wait(500);

    const email =
        document.querySelector(
            'input[type="email"]'
        );

    const pass =
        document.querySelector(
            'input[type="password"]'
        );

    const btn =
        document.querySelector(
            'button[type="submit"]'
        );

    if (
        email &&
        pass &&
        btn
    ) {

        email.value =
            cfg.loginEmail || "";

        pass.value =
            cfg.loginPassword || "";

        email.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

        pass.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

        console.log(
            "AUTO LOGIN..."
        );

        btn.click();

        await wait(2000);

        location.reload();

        return;
    }
}

// =======================
// BOT START
// =======================

const data =
    await chrome.storage.local.get([
        "targetLink",
        "targetScheme",
        "targetShrtnr",
        "targetAsApp",
        "targetNumber",
        "targetImageUrl",
        "titleMode",
        "titleValue",
        "resultSelector",
		"domainMode",
		"domainList",
		"emojiList",
		"symbolList",
    ]);

const target =
    data.targetLink || "";

const scheme =
    data.targetScheme || "http";

const shrtnr =
    data.targetShrtnr || "";

const asApp =
    data.targetAsApp || "We Heart It";

const number =
    data.targetNumber || "1";

const resultSelector =
    data.resultSelector || "#withslug";

let imageUrl =
    data.targetImageUrl || "";

const imageList =
    imageUrl
        .split(/\n|,/)
        .map(v => v.trim())
        .filter(Boolean);

if (imageList.length > 0) {

    imageUrl =
        imageList[
            Math.floor(
                Math.random() *
                imageList.length
            )
        ];

}

const titleMode =
    data.titleMode || "random";

const titleValue =
    data.titleValue || "";

const domainMode =
    data.domainMode || "default";

const domainList =
    data.domainList || "";
	
const emojiListData =
    data.emojiList || "";

const symbolListData =
    data.symbolList || "";
	
if (!target) {
    console.log("TARGET EMPTY");
    return;
}

let title =
    Math.floor(
        Math.random() * 90 + 10
    ) + "k Views";

if (
    titleMode === "custom" &&
    titleValue
) {

    const formats =
        titleValue
            .split("\n")
            .map(v => v.trim())
            .filter(Boolean);

    if (formats.length > 0) {

        title =
            formats[
                Math.floor(
                    Math.random() *
                    formats.length
                )
            ];

        // =======================
        // PLACEHOLDER
        // =======================

        const emojiList =
    emojiListData
        .split(/\n|,|\s+/)
        .map(v => v.trim())
        .filter(Boolean);

const symbolList =
    symbolListData
        .split(/\n|,|\s+/)
        .map(v => v.trim())
        .filter(Boolean);

        const randomItem =
            (arr) =>
                arr[
                    Math.floor(
                        Math.random() *
                        arr.length
                    )
                ];

function randomMultiple(
    arr,
    count = 4
) {

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

// =======================
// EMOJI PLACEHOLDER
// =======================

title =
    title.replace(
        /\{emoji(?::(\d+))?\}/g,

        (match, count) => {

            return randomMultiple(

                emojiList,

                Number(count) || 1

            );

        }
    );

title =
    title.replace(
        /\{symbol(?::(\d+))?\}/g,

        (match, count) => {

            return randomMultiple(

                symbolList,

                Number(count) || 1

            );

        }
    );
	
// VIEW

const randomView =
    Math.floor(
        Math.random() * 9900
    ) + 100;

const formattedView =
    randomView
        .toLocaleString(
            "id-ID"
        );

title =
    title.replaceAll(
        "{view}",
        formattedView
    );
	
    }

}

if (
    titleMode === "auto"
) {

    title =
        generateRandomTitle();

}

const subdir =
    Math.random()
        .toString(26)
        .substring(5, 10);

setVal("#target", target);

setVal("#title", title);

setVal("#subdir", subdir);

setVal("#as_app", asApp);

setVal("#scheme", scheme);

setVal("#shrtnr", shrtnr);

setVal("#number", number);

setVal("#imageurl", imageUrl);

// =======================
// RANDOM DOMAIN
// =======================

if (
    domainMode === "list"
) {

    const domains =
        domainList
            .split(/\n|,/)
            .map(v => v.trim())
            .filter(Boolean);

    if (domains.length > 0) {

        const randomDomain =
            domains[
                Math.floor(
                    Math.random() *
                    domains.length
                )
            ];

        const domainElement =
            document.querySelector(
                "#domain"
            );

        if (
            domainElement &&
            domainElement.options
        ) {

            const options =
                [
                    ...domainElement.options
                ];

            const match =
                options.find(
                    option =>
                        option.text
                            .trim()
                            .toLowerCase()
                        ===
                        randomDomain
                            .trim()
                            .toLowerCase()
                );

            if (match) {

                domainElement.value =
                    match.value;

                domainElement.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );

            }

        }

    }

}

await wait(1000);

const btn =
    [...document.querySelectorAll(
        "button,input"
    )]
    .find(x =>
        (
            x.innerText ||
            x.value ||
            ""
        )
        .toLowerCase()
        .includes("add")
    );

if (!btn) {

    console.log(
        "BUTTON NOT FOUND"
    );

    return;
}

btn.click();

const selectors =
    resultSelector
        .split(/\n|,/)
        .map(v => v.trim())
        .filter(Boolean);

let result = "";

for (
    let retry = 0;
    retry < 15;
    retry++
) {

    for (const sel of selectors) {

        try {

            const els =
                document.querySelectorAll(sel);

            for (const el of els) {

                let val =
                    el.value ||
                    el.innerText ||
                    el.textContent ||
                    "";

                val = val.trim();

                if (
                    val &&
                    val.length > 5 &&
                    (
                        val.includes("http") ||
                        val.includes("://") ||
                        val.includes(".com") ||
                        val.includes(".id")
                    )
                ) {

                    result = val;

                    break;
                }
            }

            if (result) break;

        } catch (e) {}
    }

    if (result) break;

    await wait(300);
}

if (!result) {

    chrome.runtime.sendMessage({
        type: "SAVE",
        data: "FAILED_NO_RESULT"
    });

    return;
}

chrome.runtime.sendMessage({
    type: "SAVE",
    data: result
});

})();