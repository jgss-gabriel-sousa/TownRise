export function startCombat(){
    let html = "";

    html
    
    
    Swal.fire({
        title: `${teamName}`,
        html: html,
        width: "75%",
        showCloseButton: true,
        focusConfirm: false,
        showConfirmButton: false,
    }).then(() => {
        setInterval(() => {
            renderCombat();
        }, 1000);
    });
}

function renderCombat(){
    
}