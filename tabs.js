document.addEventListener("DOMContentLoaded",()=>{

    const tabs =
    document.querySelectorAll(".tab-btn");

    const indicator =
    document.querySelector(".tab-indicator");

    const leftPanel =
    document.getElementById("leftPanel");

    const statusPanel =
    document.getElementById("statusPanel");
	
	const targetPanel =
document.getElementById("targetPanel");

const redirectPanel =
document.getElementById("redirectPanel");

const loginPanel =
document.getElementById("loginPanel");

const loopPanel =
document.getElementById("loopPanel");

const statusOnly =
    document.getElementById(
        "statusOnly"
    );

    const generatorContent =
    document.getElementById("generatorContent");

    function hideAll(){

        leftPanel.style.display =
        "none";

        statusPanel.style.display =
        "none";

        generatorContent.style.display =
        "none";
    }

    tabs.forEach(tab=>{

        tab.addEventListener("click",()=>{

            tabs.forEach(t=>
                t.classList.remove("active")
            );

            tab.classList.add("active");

            const mode =
            tab.dataset.tab;

            indicator.textContent =
            tab.textContent.trim() +
            " TAB ACTIVE";

            hideAll();

if(mode==="main"){

    leftPanel.style.display =
    "block";

    statusPanel.style.display =
    "block";
	
	statusOnly.style.display =
    "none";

    targetPanel.style.display =
    "block";

    loopPanel.style.display =
    "block";

    redirectPanel.style.display =
    "none";

    loginPanel.style.display =
    "none";

}

if(mode==="advanced"){

    leftPanel.style.display =
    "block";

    statusPanel.style.display =
    "none";

    targetPanel.style.display =
    "none";

    loopPanel.style.display =
    "none";

    redirectPanel.style.display =
    "block";

    loginPanel.style.display =
    "block";

}

            if(
                mode==="status"
            ){

                statusPanel.style.display =
                "block";
				
				statusOnly.style.display =
				"block";

            }

if(
    mode==="generator"
){

    leftPanel.style.display =
    "none";

    statusPanel.style.display =
    "none";

    generatorContent.style.display =
    "block";

}

        });

    });

document.querySelector(
    '.tab-btn[data-tab="main"]'
)?.click();

});