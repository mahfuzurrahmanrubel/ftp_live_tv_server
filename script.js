document.addEventListener('DOMContentLoaded', function() {
    // --- চ্যানেলগুলোর তথ্য (আপনার আগের তালিকা) ---
    const channels = [
        { id: 'channel_1', name: 'Channel 1', desc: 'লাইভ টিভি চ্যানেল ১', logoUrl: '/images/channel-1.png' },
        { id: 'channel_2', name: 'Channel 2', desc: 'লাইভ টিভি চ্যানেল ২', logoUrl: '/images/channel-2.png' },
        { id: 'channel_3', name: 'Channel 3', desc: 'লাইভ টিভি চ্যানেল ৩', logoUrl: '/images/channel-3.png' },
        { id: 'channel_4', name: 'Channel 4', desc: 'লাইভ টিভি চ্যানেল ৪', logoUrl: '/images/channel-4.png' },
        { id: 'channel_5', name: 'Channel 5', desc: 'লাইভ টিভি চ্যানেল ৫', logoUrl: '/images/channel-5.png' },
        { id: 'channel_6', name: 'Channel 6', desc: 'লাইভ টিভি চ্যানেল ৬', logoUrl: '/images/channel-6.png' },
        { id: 'channel_7', name: 'Channel 7', desc: 'লাইভ টিভি চ্যানেল ৭', logoUrl: '/images/channel-7.png' },
        { id: 'channel_8', name: 'Channel 8', desc: 'লাইভ টিভি চ্যানেল ৮', logoUrl: '/images/channel-8.png' },
        { id: 'channel_9', name: 'Channel 9', desc: 'লাইভ টিভি চ্যানেল ৯', logoUrl: '/images/channel-9.png' },
        { id: 'channel_10', name: 'Channel 10', desc: 'লাইভ টিভি চ্যানেল ১০', logoUrl: '/images/channel-10.png' }
    ];

    // --- প্রয়োজনীয় HTML এলিমেন্টগুলো ---
    const mainVideoPlayer = document.getElementById('main-video-player');
    const playerOverlay = document.getElementById('player-overlay');
    const currentChannelLogo = document.getElementById('current-channel-logo');
    const currentChannelName = document.getElementById('current-channel-name');
    const currentChannelDesc = document.getElementById('current-channel-description');
    const channelGrid = document.getElementById('channel-grid');
    const logoLink = document.getElementById('logo-link');
    const homeLink = document.getElementById('home-link');
    
    let hls;

    // --- চ্যানেল প্লে করার মূল ফাংশন ---
    function playChannel(channel) {
        if (!channel) return;
        playerOverlay.classList.remove('hidden');
        playerOverlay.querySelector('p').textContent = `লোড হচ্ছে ${channel.name}...`;
        currentChannelLogo.src = channel.logoUrl;
        currentChannelName.textContent = channel.name;
        currentChannelDesc.textContent = channel.desc;
        const streamUrl = `/live/${channel.id}/index.m3u8`;

        if (Hls.isSupported()) {
            if (hls) {
                hls.destroy();
            }
            hls = new Hls({
                liveSyncDurationCount: 3,
                liveMaxLatencyDurationCount: 4,
            });
            hls.loadSource(streamUrl);
            hls.attachMedia(mainVideoPlayer);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                mainVideoPlayer.play().catch(() => {});
            });
            mainVideoPlayer.addEventListener('playing', () => playerOverlay.classList.add('hidden'), { once: true });
            hls.on(Hls.Events.ERROR, (event, data) => {
                 if (data.fatal) {
                    playerOverlay.classList.remove('hidden');
                    playerOverlay.querySelector('p').textContent = `${channel.name} এখন অফলাইন`;
                }
            });
        }
    }

    // --- প্রতিটি চ্যানেলের স্ট্যাটাস চেক করার ফাংশন ---
    async function checkChannelStatus(channel, statusIndicator) {
        const streamUrl = `/live/${channel.id}/index.m3u8`;
        try {
            const response = await fetch(streamUrl, { method: 'HEAD', cache: 'no-cache' });
            statusIndicator.className = response.ok ? 'status-indicator online' : 'status-indicator offline';
        } catch (error) {
            statusIndicator.className = 'status-indicator offline';
        }
    }

    // --- নিচের দিকে চ্যানেলের তালিকা তৈরি করার ফাংশন ---
    channels.forEach(channel => {
        const channelDiv = document.createElement('div');
        channelDiv.className = 'channel-item';
        const logoImg = document.createElement('img');
        logoImg.src = channel.logoUrl;
        logoImg.alt = channel.name;
        const nameDiv = document.createElement('div');
        nameDiv.className = 'channel-name';
        nameDiv.textContent = channel.name;
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'status-indicator offline';
        channelDiv.appendChild(logoImg);
        channelDiv.appendChild(nameDiv);
        channelDiv.appendChild(statusIndicator);
        channelDiv.addEventListener('click', () => playChannel(channel));
        channelGrid.appendChild(channelDiv);
        checkChannelStatus(channel, statusIndicator);
        setInterval(() => checkChannelStatus(channel, statusIndicator), 30000);
    });

    // --- লোগো এবং হোম বাটনে ক্লিক ইভেন্ট যোগ করার ফাংশন ---
    function loadDefaultChannel(event) {
        event.preventDefault();
        if (channels.length > 0) {
            playChannel(channels[0]);
        }
    }
    if(logoLink) logoLink.addEventListener('click', loadDefaultChannel);
    if(homeLink) homeLink.addEventListener('click', loadDefaultChannel);

    // --- পেজ লোড হওয়ার সাথে সাথে প্রথম চ্যানেল চালু করার ফাংশন ---
    if (channels.length > 0) {
        playChannel(channels[0]);
    } else {
        playerOverlay.classList.remove('hidden');
    }

    // --- নতুন কোড: ট্যাব পরিবর্তন হলে লাইভে ফিরে আসার জন্য ---
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible' && hls && mainVideoPlayer.paused) {
            // যদি প্লেয়ারটি লাইভ পয়েন্ট থেকে অনেক পিছিয়ে থাকে
            if (hls.liveSyncPosition) {
                 const drift = Date.now() / 1000 - hls.liveSyncPosition - mainVideoPlayer.currentTime;
                 if (drift > 10) { // ১০ সেকেন্ডের বেশি পিছিয়ে থাকলে
                     console.log("Seeking to live edge...");
                     mainVideoPlayer.currentTime = hls.liveSyncPosition;
                 }
            }
            mainVideoPlayer.play(); // আবার প্লে করার চেষ্টা করি
        }
    });
});