// ==UserScript==
// @name         Youtube Rewind & Fast Forward
// @namespace    https://github.com/iamlikeyou/youtube-rewind-fastforward
// @version      0.1
// @description  Adds 2 buttons to your video player to rewind and fast forward the video.
// @author       iamlikeyou
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

const yff = {
    rewindTime: 3,
    fastforwardTime: 3,
    positionBefore: 'span.ytp-volume-area',
    videoPosition: '#movie_player > div.html5-video-container > video',

    query: document.querySelector.bind(document),
    log: console.log,

    start() {
        this.log('Youtube Fastforward', 'Started');
        this.addButtons();
    },

    find(selector, callback, delay = 0) {
        const hid = setInterval(() => {
            const element = this.query(selector);
            if (element) {
                clearInterval(hid);
                setTimeout(() => callback(element), delay);
            }
        }, 50);
    },

    addButtons() {
        this.find(this.positionBefore, (positionElement) => {
            let controlPanel = this.query('div.yff-area');

            if (!controlPanel) {
                const newDiv = document.createElement('div');
                newDiv.setAttribute('class', 'yff-area');
                newDiv.innerHTML = `
                    <button class="ytp-button yff-rewind" title="Go back ${this.rewindTime} seconds">
                        <svg height="100%" width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path class="ytp-svg-fill" id="custom-path-rewind" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"></path>
                        </svg>
                    </button>
                    <button class="ytp-button yff-fastforward" title="Go forward ${this.fastforwardTime} seconds">
                        <svg height="100%" width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path class="ytp-svg-fill" id="custom-path-fast-forward" d="M11.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path>
                        </svg>
                    </button>
                `;

                positionElement.parentNode.insertBefore(newDiv, positionElement);

                const rewindBtn = this.query('button.yff-rewind');
                const fastForwardBtn = this.query('button.yff-fastforward');

                if (rewindBtn && fastForwardBtn) {
                    const video = this.query(this.videoPosition);

                    rewindBtn.addEventListener('click', () => {
                        if (video) video.currentTime -= this.rewindTime;
                    });

                    fastForwardBtn.addEventListener('click', () => {
                        if (video) video.currentTime += this.fastforwardTime;
                    });

                    this.log('Youtube Fastforward', 'Created');
                }
            }
        });
    },
};

yff.start();
    
})();
