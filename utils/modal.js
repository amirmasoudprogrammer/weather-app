const modal=document.getElementById("modal")
const textmodal=modal.querySelector("p")


const showMOdal= (text) => {
    textmodal.innerText = text;
    modal.style.display="flex";
}

const removemodal = () =>{
    modal.style.display="none"
}
export {showMOdal , removemodal}