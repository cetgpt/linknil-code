document.addEventListener("DOMContentLoaded", () => {

    const play =
        document.getElementById("play");

    const stop =
        document.getElementById("stop");

    const exportBtn =
        document.getElementById("export");
const clearBtn =
    document.getElementById("clear");
    const loopInput =
        document.getElementById("loop");
		
	const loopCurrent =
document.getElementById(
"loopCurrent"
);

const loopState =
document.getElementById(
"loopState"
);
	
const targetInput =
    document.getElementById("target");
	
	const imageUrlInput =
    document.getElementById("imageurl");
	
	const titleModeInput =
    document.getElementById("titleMode");

const titleValueInput =
    document.getElementById("titleValue");
	
	const schemeInput =
    document.getElementById("scheme");

const shrtnrInput =
    document.getElementById("shrtnr");
	
	const asAppInput =
    document.getElementById("asApp");
	
	const numberInput =
    document.getElementById("number");
	
	const delayInput =
    document.getElementById("delay");
	
	const resultSelectorInput =
    document.getElementById("resultSelector");
	
	const domainModeInput =
    document.getElementById(
        "domainMode"
    );
	
	const loginUrlInput =
    document.getElementById("loginUrl");

const loginEmailInput =
    document.getElementById("loginEmail");

const loginPasswordInput =
    document.getElementById(
        "loginPassword"
    );

const rememberLoginInput =
    document.getElementById(
        "rememberLogin"
    );
	
    const loopNow =
        document.getElementById("loopNow");

    const resultNow =
        document.getElementById("resultNow");

    const progress =
        document.getElementById("progress");

    const status =
        document.getElementById("status");
	
	const activityLog =
    document.getElementById(
        "activityLog"
    );
	
	const clearLogBtn =
    document.getElementById(
        "clearLogBtn"
    );

if(clearLogBtn){

    clearLogBtn.onclick = () => {

        if(activityLog){
            activityLog.value = "";
        }

        chrome.storage.local.remove(
            "activityLog"
        );

    };

}

function addLog(text){

    const now =
        new Date()
        .toLocaleTimeString();

    const line =
        `[${now}] ${text}`;

    activityLog.value =
        line +
        "\n" +
        activityLog.value;
		
	activityLog.scrollTop = 0;

    chrome.storage.local.set({

        activityLog:
            activityLog.value

    });

}
	

    async function refreshStatus() {

        const res =
            await chrome.storage.local.get([
                "running",
                "currentLoop",
                "totalLoop",
                "store",
				"activityLog"
				
            ]);
		
		if (
    activityLog &&
    res.activityLog
) {
    activityLog.value =
        res.activityLog;
}

        const current =
            res.currentLoop || 0;

        const total =
            res.totalLoop || 0;

        const result =
            (res.store || []).length;

        loopNow.innerText =
    `${current}/${total}`;
	
        resultNow.innerText = result;

/* LOOP MONITOR */

if(loopCurrent){

loopCurrent.innerText =
`LOOP ${current} / ${total}`;

}

const percent =
    total > 0
        ? (current / total) * 100
        : 0;

const percentInt =
    Math.floor(percent);

progress.style.width =
    percent + "%";

document.getElementById(
    "percentText"
).innerText =
    percentInt + "%";

if(loopState){

    loopState.innerText =
        `RESULT ${result} • ${percentInt}%`;

}	
		
		document.getElementById(
    "percentText"
).innerText =
    Math.floor(percent) + "%";

        status.innerHTML =
    res.running
? `
<div class="status-dot"
style="
background:#00ff88;
box-shadow:0 0 10px #00ff88;
"></div>
RUNNING
`
: `
<div class="status-dot"></div>
STOPPED
`;
    }

chrome.tabs.query({
    active: true,
    currentWindow: true
}, (tabs) => {

    if (!tabs[0]) return;

    chrome.scripting.executeScript({
        target: {
            tabId: tabs[0].id
        },
        func: () => {

            const audio =
                new Audio(
                    "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
                );

            audio.play();

        }
    });

});

chrome.storage.local.get([
    "targetLink",
	"targetImageUrl",
	"titleMode",
	"titleValue",
	"domainMode",
    "targetScheme",
    "targetShrtnr",
    "resultSelector"
	
], (res) => {
	
	// AUTO SAVE CONFIG

targetInput.addEventListener("input", () => {
    chrome.storage.local.set({
        targetLink: targetInput.value
    });
});

imageUrlInput.addEventListener("input", () => {
    chrome.storage.local.set({
        targetImageUrl: imageUrlInput.value
    });
});

titleModeInput.addEventListener("change", () => {
    chrome.storage.local.set({
        titleMode: titleModeInput.value
    });
});

titleValueInput.addEventListener("input", () => {
    chrome.storage.local.set({
        titleValue: titleValueInput.value
    });
});

domainModeInput.addEventListener("change", () => {
    chrome.storage.local.set({
        domainMode: domainModeInput.value
    });
});

schemeInput.addEventListener("change", () => {
    chrome.storage.local.set({
        targetScheme: schemeInput.value
    });
});

shrtnrInput.addEventListener("change", () => {
    chrome.storage.local.set({
        targetShrtnr: shrtnrInput.value
    });
});

asAppInput.addEventListener("change", () => {
    chrome.storage.local.set({
        targetAsApp: asAppInput.value
    });
});

numberInput.addEventListener("input", () => {
    chrome.storage.local.set({
        targetNumber: numberInput.value
    });
});

delayInput.addEventListener("input", () => {
    chrome.storage.local.set({
        loopDelay: delayInput.value
    });
});

resultSelectorInput.addEventListener("input", () => {
    chrome.storage.local.set({
        resultSelector: resultSelectorInput.value
    });
});

loginUrlInput.addEventListener("input", () => {
    chrome.storage.local.set({
        loginUrl: loginUrlInput.value
    });
});

loginEmailInput.addEventListener("input", () => {
    chrome.storage.local.set({
        loginEmail: loginEmailInput.value
    });
});

loginPasswordInput.addEventListener("input", () => {
    chrome.storage.local.set({
        loginPassword: loginPasswordInput.value
    });
});

rememberLoginInput.addEventListener("change", () => {
    chrome.storage.local.set({
        rememberLogin: rememberLoginInput.checked
    });
});

loopInput.addEventListener("input", () => {
    chrome.storage.local.set({
        totalLoop: loopInput.value
    });
});

    if (res.targetLink)
        targetInput.value =
            res.targetLink;
			
	if (res.targetImageUrl)
imageUrlInput.value =
    res.targetImageUrl;
	
	if (res.titleMode)
titleModeInput.value =
    res.titleMode;

	if (res.titleValue)
titleValueInput.value =
    res.titleValue;
	
	if (res.domainMode)
domainModeInput.value =
    res.domainMode;

    if (res.targetScheme)
        schemeInput.value =
            res.targetScheme;

    if (res.targetShrtnr)
        shrtnrInput.value =
            res.targetShrtnr;
	
	if (res.targetAsApp)
    asAppInput.value =
        res.targetAsApp;
		
	if (res.rememberLogin) {

    loginUrlInput.value =
        res.loginUrl || "";

    loginEmailInput.value =
        res.loginEmail || "";

    loginPasswordInput.value =
        res.loginPassword || "";

    rememberLoginInput.checked =
        true;
}	
	
	if (res.targetNumber)
    numberInput.value =
        res.targetNumber;
	
	if (res.loopDelay)
delayInput.value =
    res.loopDelay;

    if (res.resultSelector)
        resultSelectorInput.value =
            res.resultSelector;
});

    play.onclick = async () => {
	
	addLog("START BOT");

    const loop =
        parseInt(loopInput.value || 1);

    const target =
        targetInput.value.trim();
		
	const imageUrl =
    imageUrlInput.value.trim();
	
	const titleMode =
    titleModeInput.value;

	const titleValue =
    titleValueInput.value.trim();
	
	const domainMode =
    domainModeInput.value;

    const scheme =
        schemeInput.value;

    const shrtnr =
        shrtnrInput.value;

	const asApp =
    asAppInput.value;
	
	const number =
    numberInput.value;
	
	const delay =
    parseInt(delayInput.value || 6000);
	
    const resultSelector =
        resultSelectorInput.value.trim();

    await chrome.storage.local.set({

        targetLink: target,
		
		targetImageUrl: imageUrl,
		
		titleMode: titleMode,

		titleValue: titleValue,
		
		domainMode: domainMode,
		
		domainList: domainList.value,

        targetScheme: scheme,

        targetShrtnr: shrtnr,
		
		targetAsApp: asApp,
		
		targetNumber: number,
		
		loopDelay: delay,

        resultSelector: resultSelector,

loginUrl:
    loginUrlInput.value,

loginEmail:
    loginEmailInput.value,

loginPassword:
    loginPasswordInput.value,

rememberLogin:
    rememberLoginInput.checked

    });

    chrome.runtime.sendMessage({
    type: "START",
    loop,
    target,
    delay
});
};

    stop.onclick = async () => {
	
	addLog("STOP BOT");

        chrome.runtime.sendMessage({
            type: "STOP"
        });

    };

    exportBtn.onclick = async () => {
	
	addLog("EXPORT CSV");

        chrome.runtime.sendMessage({
            type: "EXPORT"
        });

    };
	clearBtn.onclick = async () => {
	
	addLog("CLEAR RESULT");

    // reset storage
    const savedLogin =
    await chrome.storage.local.get([
        "loginUrl",
        "loginEmail",
        "loginPassword",
        "rememberLogin",
		"domainList"

    ]);

await chrome.storage.local.clear();

if (
    savedLogin.rememberLogin
) {

    await chrome.storage.local.set({

        loginUrl:
            savedLogin.loginUrl,

        loginEmail:
            savedLogin.loginEmail,

        loginPassword:
            savedLogin.loginPassword,

        rememberLogin: true,
		
		domainList:
    savedLogin.domainList || ""
    });
}

    // set default kembali
    await chrome.storage.local.set({

        running: false,
        currentLoop: 0,
        totalLoop: 0,
        store: [],

        targetLink: "",
		
		targetImageUrl: "",
		
		titleMode: "random",

		titleValue: "",

        targetScheme: "http",

        targetShrtnr: "",

        targetAsApp: "We Heart It",

        targetNumber: "1",
		
		loopDelay: 6000,

        resultSelector: "#withslug"

    });

    // reset tampilan UI
    targetInput.value = "";
	
	imageUrlInput.value = "";
	
	titleModeInput.value = "random";

	titleValueInput.value = "";

    schemeInput.value = "http";

    shrtnrInput.value = "";

    asAppInput.value = "We Heart It";

    numberInput.value = "1";
	
	delayInput.value = "6000";

    resultSelectorInput.value = "";

    loopInput.value = "0";

    loopNow.innerText = "0";

    resultNow.innerText = "0";

    progress.style.width = "0%";

    status.innerHTML = `
        <span class="stopped">
            STOPPED
        </span>
    `;

    // kirim clear ke background
    chrome.runtime.sendMessage({
        type: "CLEAR"
    });

};

    setInterval(refreshStatus, 1000);

    refreshStatus();

/* SAVE INFO */

const savedInfo =
document.getElementById(
"savedInfo"
);

const saveInfoBtn =
document.getElementById(
"saveInfoBtn"
);

const clearInfoBtn =
document.getElementById(
"clearInfoBtn"
);

/* LOAD */

chrome.storage.local.get(
["savedInfo"],
(res)=>{

if(res.savedInfo){

savedInfo.value =
res.savedInfo;

}

}
);

/* SAVE */

saveInfoBtn.onclick = () => {

chrome.storage.local.set({

savedInfo:
savedInfo.value

});

};

/* CLEAR */

clearInfoBtn.onclick = () => {

savedInfo.value = "";

chrome.storage.local.remove(
"savedInfo"
);

};

/* DOMAIN LIST */

const domainList =
document.getElementById(
"domainList"
);

const saveDomainBtn =
document.getElementById(
"saveDomainBtn"
);

const clearDomainBtn =
document.getElementById(
"clearDomainBtn"
);

/* LOAD */

chrome.storage.local.get(
["domainList"],
(res)=>{

if(res.domainList){

domainList.value =
res.domainList;

}

}
);

/* SAVE */

saveDomainBtn.onclick = () => {

chrome.storage.local.set({

domainList:
domainList.value

});

};

/* CLEAR */

clearDomainBtn.onclick = () => {

domainList.value = "";

chrome.storage.local.remove(
"domainList"
);

};

// =======================
// EMOJI LIST
// =======================

const emojiList =
document.getElementById(
"emojiList"
);

const saveEmojiBtn =
document.getElementById(
"saveEmojiBtn"
);

const clearEmojiBtn =
document.getElementById(
"clearEmojiBtn"
);

// LOAD

chrome.storage.local.get(
["emojiList"],
(res)=>{

if(res.emojiList){

emojiList.value =
res.emojiList;

}

}
);

// SAVE

saveEmojiBtn.onclick =
() => {

chrome.storage.local.set({

emojiList:
emojiList.value

});

};

// CLEAR

clearEmojiBtn.onclick =
() => {

emojiList.value = "";

chrome.storage.local.remove(
"emojiList"
);

};

// =======================
// SYMBOL LIST
// =======================

const symbolList =
document.getElementById(
"symbolList"
);

const saveSymbolBtn =
document.getElementById(
"saveSymbolBtn"
);

const clearSymbolBtn =
document.getElementById(
"clearSymbolBtn"
);

// LOAD

chrome.storage.local.get(
["symbolList"],
(res)=>{

if(res.symbolList){

symbolList.value =
res.symbolList;

}

}
);

// SAVE

saveSymbolBtn.onclick =
() => {

chrome.storage.local.set({

symbolList:
symbolList.value

});

};

// CLEAR

clearSymbolBtn.onclick =
() => {

symbolList.value = "";

chrome.storage.local.remove(
"symbolList"
);

};

// ACCORDION

document.querySelectorAll(".accordion").forEach(acc => {

    acc.addEventListener("click", () => {

        const content = acc.nextElementSibling;

        const arrow = acc.querySelector(".acc-arrow");

        if(content){

            content.classList.toggle("show");

        }

        if(arrow){

            arrow.classList.toggle("rotate");

        }

    });

});

});