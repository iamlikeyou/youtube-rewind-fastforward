const yff = {
    rT: 3, fT: 3, pB: 'span.ytp-volume-area', vP: '#movie_player > div.html5-video-container > video',
    q: document.querySelector.bind(document),
    l: console.log,
    s() {
        this.l('Youtube FF', 'Started');
        this.aB();
    },
    f(s, c, d = 0) {
        const h = setInterval(() => { const e = this.q(s); if (e) { clearInterval(h); setTimeout(() => c(e), d); } }, 50);
    },
    aB() {
        this.f(this.pB, (p) => {
            let cp = this.q('div.yff-area');
            if (!cp) {
                const nD = document.createElement('div');
                nD.className = 'yff-area';
                nD.innerHTML = `<button class="ytp-button yff-rewind" title="Go back ${this.rT} seconds"><svg height="100%" width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="ytp-svg-fill" id="custom-path-rewind" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"></path></svg></button><button class="ytp-button yff-fastforward" title="Go forward ${this.fT} seconds"><svg height="100%" width="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="ytp-svg-fill" id="custom-path-fast-forward" d="M11.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path></svg></button>`;
                p.parentNode.insertBefore(nD, p);
                this.q('.yff-rewind').addEventListener('click', () => { this.q(this.vP).currentTime -= this.rT; });
                this.q('.yff-fastforward').addEventListener('click', () => { this.q(this.vP).currentTime += this.fT; });
                this.l('Youtube FF', 'Created');
            }
        });
    },
};

yff.s();
