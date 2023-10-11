var ytrff = {
    rewindTime: 3,
    fastforwardTime: 3,
    positionBefore: "span.ytp-volume-area",
    videoPosition: "#movie_player > div.html5-video-container > video",

    query: document.querySelector.bind(document),
    log:console.log,

    start() {
        this.log("Youtube Fastforward", "Started");
        this.addButtons();
    },

    find(selector, callback, delay = 0) {
        const hid = setInterval(() => {
            const e = this.query(selector);
            if (e) {
                clearInterval(hid);
                setTimeout(() => callback(e), delay);
            }
        }, 50);
    },

    addButtons() {
        this.find(this.positionBefore, (cb) => {
            let cp = this.query("div.yff-area");

            if(!cp) {
                let positionElement = this.query(this.positionBefore);
                let newDiv = document.createElement('div');
                newDiv.setAttribute("class","yff-area");
                newDiv.innerHTML = `
                    <button class="ytp-button yff-rewind" title="Go back ` +this.rewindTime+ ` seconds">
                        <svg class="" height="100%" width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path class="ytp-svg-fill" id="custom-path-rewind" strokelinecap="round" strokelinejoin="round" strokewidth="{2}" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"></path>
                        </svg>
                    </button>

                    <button class="ytp-button yff-fastforward" title="Go forward ` +this.fastforwardTime+ ` seconds">
                        <svg class="" height="100%" width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path class="ytp-svg-fill" id="custom-path-fast-forward" strokelinecap="round" strokelinejoin="round" strokewidth="{2}" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path>
                        </svg>
                    </button>
                `;
                positionElement.parentNode.insertBefore(newDiv, positionElement);

                this.query("button.yff-rewind").onclick = () => {
                    this.query(this.videoPosition).currentTime -= this.rewindTime;
                }

                this.query("button.yff-fastforward").onclick = () => {
                    this.query(this.videoPosition).currentTime += this.fastforwardTime;
                }
                this.log("Youtube Fastforward", "Created");
            }
        }, 50);
    }
}
ytrff.start();
