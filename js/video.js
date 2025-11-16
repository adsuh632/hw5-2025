var video;

window.addEventListener("load", function() {
	console.log("Good job opening the window");
	video = document.querySelector("#player1");
	video.autoplay = false;
	console.log("Autoplay is set to " + video.autoplay);
	video.loop = false;
	console.log("Loop is set to " + video.loop);
	
	// Initialize volume display
	// Ensure slider reflects current video volume and show percent
	var volumeDisplay = document.querySelector("#volume");
	var slider = document.querySelector("#slider");
	if (slider) {
		slider.value = video.volume * 100;
	}
	if (volumeDisplay) {
		volumeDisplay.innerHTML = Math.round(video.volume * 100) + "%";
	}
	
	// Play Button
	document.querySelector("#play").addEventListener("click", function() {
		console.log("Play Video");
		// play() may return a promise in some browsers; update UI regardless
		var playPromise = video.play();
		if (volumeDisplay) {
			volumeDisplay.innerHTML = Math.round(video.volume * 100) + "%";
		}
		if (playPromise !== undefined) {
			playPromise.catch(function(error) {
				// Play failed (autoplay policy or other); still update UI and log error
				console.log("Play request failed:", error);
			});
		}
	});

	// Pause Button
	document.querySelector("#pause").addEventListener("click", function() {
		console.log("Pause Video");
		video.pause();
	});

	// Slow Down Button
	document.querySelector("#slower").addEventListener("click", function() {
		video.playbackRate *= 0.90;
		console.log("Speed is " + video.playbackRate);
	});

	// Speed Up Button
	document.querySelector("#faster").addEventListener("click", function() {
		video.playbackRate /= 0.90;
		console.log("Speed is " + video.playbackRate);
	});

	// Skip Ahead Button
	document.querySelector("#skip").addEventListener("click", function() {
		if (video.currentTime + 10 < video.duration) {
			video.currentTime += 10;
		} else {
			video.currentTime = 0;
		}
		console.log("Current location is " + video.currentTime);
	});

	// Mute Button
	document.querySelector("#mute").addEventListener("click", function() {
		if (video.muted) {
			video.muted = false;
			this.innerHTML = "Mute";
		} else {
			video.muted = true;
			this.innerHTML = "Unmute";
		}
	});

	// Volume Slider
	if (slider) {
		slider.addEventListener("input", function() {
			video.volume = this.value / 100;
			if (volumeDisplay) {
				volumeDisplay.innerHTML = Math.round(video.volume * 100) + "%";
			}
			console.log("Volume is " + video.volume);
		});
	}

	// Old School Button
	document.querySelector("#vintage").addEventListener("click", function() {
		video.classList.add("oldSchool");
	});

	// Original Button
	document.querySelector("#orig").addEventListener("click", function() {
		video.classList.remove("oldSchool");
	});
});