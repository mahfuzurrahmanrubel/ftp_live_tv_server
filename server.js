// --- দুটি প্রয়োজনীয় প্যাকেজকে এখানে require করা হলো ---
const NodeMediaServer = require('node-media-server');
const express = require('express'); // <-- এই লাইনটি আপনার কোডে মিসিং ছিল
const path = require('path');

// --- এখন express ব্যবহার করে অ্যাপ তৈরি করা হচ্ছে ---
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/live', express.static(path.join(__dirname, 'media')));

app.listen(3000, () => {
    console.log('[OK] GLBD Website is running on port 3000');
});

// --- RTMP সার্ভারের কনফিগারেশন ---
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
};

const nms = new NodeMediaServer(config);
nms.run();

console.log('[OK] RTMP Server is listening on port 1935.');
