function HasImageDevices(){
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
}

function PlayVideo(mediaDisplay, mediaDD){
    if(HasImageDevices()) {
        let sourceId = mediaDD[mediaDD.selectedIndex].value;
        let option = {video : true, deviceId : sourceId}
        navigator.mediaDevices.getUserMedia(option).then(function(stream) {
            mediaDisplay.srcObject = stream;
            mediaDisplay.play();
            mediaDisplay.value = sourceId;
        });
    }
}

function SetMediaDevicesDD(select){
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
    let imageWidth = canvas.width;
    let imageHeight = canvas.height;
    const context = canvas.getContext('2d');

    context.drawImage(display, 0, 0, imageWidth, imageHeight);
}

function ToggleScreens(elements){
    elements.forEach(element => {
        ToggleHiddenElement(element);
    });
}