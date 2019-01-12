const canvas = document.querySelector("#stillCavas");
const imageScreen = document.querySelector("#imageScreen");
const captureBtn = document.querySelector("#captureImage");
const startVideoBtn = document.querySelector("#startVideo");
const closeImage = document.querySelector("#closeImage");
const mediaDD = document.querySelector("#mediaDeviceDD");

(function(){
    let toggleElements = [imageScreen, captureBtn, startVideoBtn];

    captureBtn.addEventListener("click", function() {
        CaptureImage(videoScreen, canvas);
        ToggleScreens(toggleElements);
    });

    startVideoBtn.addEventListener("click", function() {
        CaptureImage(videoScreen, canvas);
        ToggleScreens(toggleElements);
    });

    closeImage.addEventListener("click", function(){
        ToggleScreens(toggleElements);
    });
    
    SetMediaDevicesDD(mediaDD)
})();

$(document).ready(function(){      
    PlayVideo(videoScreen, mediaDD);
});