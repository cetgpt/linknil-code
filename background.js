let running = false;

chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.local.set({
        running: false,
        currentLoop: 0,
        totalLoop: 0,
        store: []
    });

    chrome.sidePanel.setPanelBehavior({
        openPanelOnActionClick: true
    });

});


function handleSave(msg){
    chrome.storage.local.get(["store"], (res)=>{
        const store=Array.isArray(res.store)?res.store:[];
        const value=Array.isArray(msg.data)?msg.data[0]:msg.data;
        if(value && !store.includes(value)){store.push(value);writeLog("RESULT ADDED");}
        chrome.storage.local.set({store},()=>console.log("SAVED:",store.length));
    });
}
function handleStart(msg){if(running){console.log("BOT ALREADY RUNNING");return;} running=true; writeLog("BOT STARTED"); startBot(msg.loop,msg.target,msg.delay);}
function handleStop(){running=false;chrome.storage.local.set({running:false,currentLoop:0,totalLoop:0});writeLog("BOT STOPPED");console.log("STOPPED");}
function handleClear(){running=false;chrome.storage.local.clear(()=>{chrome.storage.local.set({running:false,currentLoop:0,totalLoop:0,store:[]});console.log("🗑 FULL RESET");});}
function handleExport(){chrome.storage.local.get(["store"],(res)=>{const store=Array.isArray(res.store)?res.store:[];if(!store.length){console.log("EMPTY RESULT");chrome.notifications.create({type:"basic",iconUrl:"https://cdn-icons-png.flaticon.com/512/463/463612.png",title:"EXPORT GAGAL",message:"Result masih kosong"});return;}try{const csv=buildCSV(store);const url="data:text/csv;charset=utf-8,"+encodeURIComponent(csv);chrome.downloads.download({url,filename:`LINKYOL_${Date.now()}.csv`,saveAs:true},()=>{if(chrome.runtime.lastError){console.log("EXPORT ERROR:",chrome.runtime.lastError.message);chrome.notifications.create({type:"basic",iconUrl:"https://cdn-icons-png.flaticon.com/512/1828/1828843.png",title:"EXPORT ERROR",message:chrome.runtime.lastError.message});}});}catch(err){console.log("EXPORT FAILED:",err);}});}
chrome.runtime.onMessage.addListener((msg)=>{switch(msg.type){case "SAVE": return handleSave(msg);case "START": return handleStart(msg);case "STOP": return handleStop();case "CLEAR": return handleClear();case "EXPORT": return handleExport();default:return;}});

async function startBot(
    totalLoop,
    target,
    delay = 6000
) {

    await chrome.storage.local.set({
        running: true,
        currentLoop: 0,
        totalLoop: totalLoop
    });

    for (let i = 0; i < totalLoop; i++) {

        if (!running) break;

        const current = i + 1;

        console.log("LOOP:", current);
		
		writeLog(
    `LOOP ${current}/${totalLoop}`
);

        await chrome.storage.local.set({
            currentLoop: current
        });

        const [tab] =
            await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

        if (!tab) continue;

        try {

try {

    await chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        func: () => {

            if (
                window.LINKY_RUNNING
            ) {
                return false;
            }

            window.LINKY_RUNNING = true;

            return true;
        }
    });

    await chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        files: ["content.js"]
    });

} finally {

    setTimeout(async () => {

        try {

            await chrome.scripting.executeScript({
                target: {
                    tabId: tab.id
                },
                func: () => {
                    window.LINKY_RUNNING = false;
                }
            });

        } catch (e) {}

    }, 3000);

}

        } catch (e) {

            console.log(e);

        }

        console.log(
    "WAIT:",
    delay,
    "ms"
);

await wait(delay);

    }

    running = false;

    await chrome.storage.local.set({
        running: false,
        currentLoop: 0,
        totalLoop: 0
    });

    const data =
    await chrome.storage.local.get("store");

const totalResult =
    (data.store || []).length;

chrome.notifications.create({
    type: "basic",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    title: "ALHAMDULILLAH SAMPUN",
    message:
        `Loop selesai.\n` +
        `Total result: ${totalResult}`
});

writeLog(
    `FINISHED (${totalResult} RESULT)`
);

console.log("FINISHED");
}

function writeLog(text) {

    const time =
        new Date()
        .toLocaleTimeString();

    chrome.storage.local.get(
        ["activityLog"],
        (res) => {

            const oldLog =
                res.activityLog || "";

            const newLog =
                `[${time}] ${text}\n` +
                oldLog;

            chrome.storage.local.set({
                activityLog: newLog
            });

        }
    );

}

function wait(t) {
    return new Promise(r => setTimeout(r, t));
}

function buildCSV(rows) {

    let csv = "result\n";

    rows.forEach(row => {

        const value =
            Array.isArray(row)
                ? row[0]
                : row;

        csv +=
            `"${String(value || "")
                .replace(/"/g, '""')}"\n`;

    });

    return csv;
}