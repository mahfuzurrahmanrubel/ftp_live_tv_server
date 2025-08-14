# ftp_live_tv_server
isp jonno tv server (local+public) 
-------------------------------------
Fast e ubuntu te login kore then necher comment gula dete hobe 

$ sudo apt update && sudo apt upgrade -y

# curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# sudo apt-get install -y nodejs ffmpeg screen


# node -v
# npm -v

# ffmpeg -version




//port allow kora 
NGINX port on kora
# sudo ufw allow 80/tcp 

SSH (আপনি যেটির মাধ্যমে লগইন করেছেন)   
# sudo ufw allow 22/tcp    

 ওয়েবসাইট
# sudo ufw allow 3000/tcp  

 RTMP স্ট্রিম
# sudo ufw allow 1935/tcp  

 ফায়ারওয়াল চালু করুন (যদি Y/N চায়, Y দিন)
# sudo ufw enable         

 স্ট্যাটাস দেখুন
# sudo ufw status          # স্ট্যাটাস দেখুন

===========================


cd ~
mkdir GLBD
cd GLBD



# npm init -y
# npm install express node-media-server

# nano server.js (save kora file e server.js file tar code hobe or replace kore dele hobe)


# mkdir public
# mkdir public/images

cd public ai folder e save kora html,css,js file gula ai folder e dete hobe 


cd ark_tv_server
# mkdir -p ./media/channel_1  
# mkdir -p ./media/channel_2  
# mkdir -p ./media/channel_3
# mkdir -p ./media/channel_4  
(joto gula channel hobe toto gyla folder) 


 
screen -S GLBD (server on )
cd ~/GLBD && node server.js  (ctrl+a,d deaya bahir hoye aste hobe )


screen -S ffmpeg_channel_1 (channel line strat er jonno ..shob gular jonno alada hobe)

ffmpeg -i "rtmp://127.0.0.1:1935/live/channel_1" -c:v copy -c:a copy -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments ./media/channel_1/index.m3u8  (channel e live start jonno ..ja obs or onno j kno softwer deaya live korte parbe ) then ctrl + a _



 screen -ls (live screen koto gula asa dekhar jonno)
 sudo killall screen (screen off er jonno)



steam url : rtmp://10.12.91.160/live
pass : channel_1 (channel 2 er jonno : channel_1 .. ai vabe shob gula alada hobe)
