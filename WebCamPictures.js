"use strict";
const imageCanvas = document.querySelector("#stillCavas");
const videoScreen = document.querySelector("#videoScreen");
const videoScreenContainer = document.querySelector("#videoScreen-container");
const captureBtn = document.querySelector("#captureImage");
const startVideoBtn = document.querySelector("#startVideo");
const closeVideoBtn = document.querySelector("#closeVideoScreen");
const mediaDD = document.querySelector("#mediaDeviceDD");
const saveImageBtn = document.querySelector('#saveImage');

let mediaOptions = {
	audio: false,
	video: { deviceId: '' }
};

let imageFile;

(function () {
	captureBtn.addEventListener("click", () => {
		StopVideo(videoScreen)
			.then(() => TakePhoto(mediaOptions))
			.then(blob => SetImageFile(blob))
			.then(() => createImageBitmap(imageFile))
			.then(image => PreviewImage(image, imageCanvas))
			.catch(error => console.log(`Photo NOT taken. ${error}`));

		StopVideo(videoScreen)
		HideElement(videoScreenContainer);
	});

	startVideoBtn.addEventListener("click", () => {
		StopVideo(videoScreen)
			.then(() => PlayVideo(videoScreen, mediaOptions))
			.then(() => ShowElement(videoScreenContainer))
			.catch(error => console.log(`Video NOT started. ${error}`));
	});

	closeVideoBtn.addEventListener("click", async () => {
		HideElement(videoScreenContainer);

		await StopVideo(videoScreen)
			.catch(error => console.log(`Video NOT stopped. ${error}`));
	});

	mediaDD.addEventListener('change', () => {
		GetSelectedDeviceId(mediaDD)
			.then(sourceId => SetDeviceId(sourceId))
			.catch(error => console.log(`Media Dropdown NOT populated. ${error}`));
	});

	saveImageBtn.addEventListener('click', () => {
		SubmitImage(imageFile);
	});

	GetVideoDevices()
		.then(devices => SetVideoDeviceDD(mediaDD, devices))
		.then(() => GetSelectedDeviceId(mediaDD))
		.then(sourceId => SetDeviceId(sourceId))
		.catch(error => console.log(`Devices not found. ${error}`));
})();

function ShowElement(element) {
	if (element.hidden === true) {
		element.hidden = false;
	}
}

function HideElement(element) {
	if (element.hidden === false) {
		element.hidden = true;
	}
}

async function SetImageFile(blob) {
	if (blob.type.match('image/*') === false) {
		throw new Error("File is NOT an Image.");
	}
	imageFile = blob;
}

function SetDeviceId(deviceId) {
	if (deviceId === null || deviceId === '') {
		throw new Error("Device Id NOT found");
	}
	mediaOptions.video.deviceId = deviceId;
}

async function SetVideoDeviceDD(select, devices) {
	if (select === null || select.tagName !== "SELECT") {
		throw new Error("Incorrect input Tag");
	}
	if (devices.length < 0) {
		throw new Error("Device list empty");
	}
	let count = 1;
	await devices.forEach(device => {
		const option = document.createElement("option");
		option.value = device.deviceId;
		option.text = device.label || `Video Input ${count}`;
		count++;
		select.add(option);
	});
}

async function GetSelectedDeviceId(option) {
	if (option === null) {
		throw new Error("Media Dropdown NOT found.");
	}
	if (option.selectedIndex === 'nothing' || option.selectedIndex < 0) {
		throw new Error(false, "Select a Media Device.");
	}
	let index = option.selectedIndex;
	return option.options.item(index).value;
}

function SubmitImage(image) {
	let oData = new FormData();
	let fileName = image.name || "Photo";
	oData.append(fileName, image);

	let xhr = new XMLHttpRequest();
	xhr.open('Post', '/UploadImage', true);
	xhr.onload = () => {
		if (xhr.status !== 200) {
			console.log("File NOT sent!!!");
		}
		xhr.send(oData);
	};
}