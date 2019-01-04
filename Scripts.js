$(document).ready(function(){
    const captureBtn = document.querySelector("#captureImage");
    const startVideoBtn = document.querySelector("#startVideo");
    const closeImage = document.querySelector("#closeImage");
    const mediaDD = document.querySelector("#mediaDeviceDD");
    const videoScreen = document.querySelector("#videoScreen");
    const canvas = document.querySelector("#stillCavas");
    const imageScreen = document.querySelector("#imageScreen");

    captureBtn.addEventListener("click", function() {
        CaptureImage(videoScreen, canvas);
        ToggleScreens(imageScreen, captureBtn, startVideoBtn);
    });

    startVideoBtn.addEventListener("click", function() {
        CaptureImage(videoScreen, canvas);
        ToggleScreens(imageScreen, captureBtn, startVideoBtn);
    });

    closeImage.addEventListener("click", function(){
        ToggleScreens(imageScreen, captureBtn, startVideoBtn);
    });
    
    SetMediaDevices(mediaDD)
    PlayVideo(videoScreen);
});

function HasImageDevices(){
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
}

function PlayVideo(mediaDisplay){
    if(HasImageDevices()) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            mediaDisplay.srcObject = stream;
            mediaDisplay.play();
        });
    }
}

function SetMediaDevices(select){
    if (HasImageDevices() && select.tagName === "SELECT")  {
        navigator.mediaDevices.enumerateDevices().then(function(devices){
            devices.forEach(function(device){
                let count = 1;
                if (device.kind === 'videoinput'){
                    const option = document.createElement("option");
                    option.value = device.deviceId;
                    option.text = device.label || "Video Input " + count;
                    count++;
                    select.add(option);
                }
            })
        });
    }
}

function ToggleHiddenElement(element){
    if(element.hasAttribute("hidden")){
        element.removeAttribute("hidden", false);
    }
    else{
        element.setAttribute("hidden", true);
    }
}

function CaptureImage(display, canvas){
    const context = canvas.getContext('2d');
    context.drawImage(display, 0, 0, 640, 480);
}

function ToggleScreens(canvas, captureBtn, videoBtn){
    ToggleHiddenElement(captureBtn);
    ToggleHiddenElement(canvas);
    ToggleHiddenElement(videoBtn);
}