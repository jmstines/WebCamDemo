"use strict";
function NoImageDevices() {
	return !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia;
}

async function PlayVideo(mediaDisplay, options) {
	if (NoImageDevices()){
		throw new Error("No Media Device found");
	}
	let source = await navigator.mediaDevices.getUserMedia(options);
	mediaDisplay.srcObject = source;
	mediaDisplay.play();
	return "Play Video.";
}

async function StopVideo(mediaDisplay) {
	if (mediaDisplay === null) {
		throw new Error("Video source NOT found!!!");
	}
	if (mediaDisplay.srcObject === null) {
		return "Video Stopped";
	}
	let tracks = await mediaDisplay.srcObject.getTracks();
	await tracks.forEach(track => track.stop());
	mediaDisplay.srcObject = null;
	return "Video Stopped";
}

async function GetVideoDevices() {
	if (NoImageDevices()) {
		throw new Error("No Media Device found");
	}
	let devices = await navigator.mediaDevices.enumerateDevices()
	let mediaDevices = await devices.filter(device => {
		return device.kind === 'videoinput';
	});
	return mediaDevices;
}

function PreviewImage(image, canvas) {
	if (image === null){
		throw new Error("File is NOT an Image.");
	}
	if (canvas === 'nothing') {
		throw new Error("Image render Area NOT found.");
	}
	let imageWidth = canvas.width;
	let imageHeight = canvas.height;
	const context = canvas.getContext('2d');

	context.drawImage(image, 0, 0, imageWidth, imageHeight);
}

async function TakePhoto(options) {
	if (NoImageDevices()) {
		throw new Error("No Media Device found.");
	}
	if (options.video.deviceId === '') {
		throw new Error("SourceId NOT found.");
	}
	const mediaStream = await navigator.mediaDevices.getUserMedia(options)
	const track = await mediaStream.getVideoTracks()[0];
	const imageCapture = await new ImageCapture(track);
	const blob = await imageCapture.takePhoto();
	return blob
}