# ftp_live_tv_server
isp jonno tv server (local+public) 
-------------------------------------
//Fast e ubuntu te login kore then necher comment gula dete hobe 

# sudo apt update && sudo apt upgrade -y

# curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# sudo apt-get install -y nodejs ffmpeg screen


# node -v
# npm -v

# ffmpeg -version




//port allow kora 
NGINX port on kora
# sudo ufw allow 80/tcp 

//SSH (আপনি যেটির মাধ্যমে লগইন করেছেন)   
# sudo ufw allow 22/tcp    

// ওয়েবসাইট
# sudo ufw allow 3000/tcp  

// RTMP স্ট্রিম
# sudo ufw allow 1935/tcp

// ফায়ারওয়াল চালু করুন (যদি Y/N চায়, Y দিন)
# sudo ufw enable

// স্ট্যাটাস দেখুন
# sudo ufw status

===========================


# cd ~
# mkdir GLBD
# cd GLBD



# npm init -y
# npm install express node-media-server

//save kora file e server.js file tar code hobe or replace kore dele hobe
# nano server.js 


# mkdir public
# mkdir public/images

//cd GLBD ai folder e download kora shob fule upload korte hobe




//joto gula channel hobe toto gyla folder creat kortye hobe cd GLBD/media ai folder er modhe . upore bola hoice #cd GLBD folder e upload korar jonno ..oi khane already 10 ta kora ache jodi extra kora lage ta hole neche bole daowa holo ki vabe creat kora lagbe 

//j vabe folder cerat korte hobe
# cd GLBD
# mkdir -p ./media/channel_1  
# mkdir -p ./media/channel_2  
# mkdir -p ./media/channel_3
# mkdir -p ./media/channel_4  



// server on korte hobe ekhon
# screen -S GLBD 

//screen e dhula 
# cd ~/GLBD && node server.js 

//then channel_1 e live korar jonno screen creat korte hobe . creat kora hole (trl + shift + a + d  deaya bahir hoye aste hobe )
# screen -S ffmpeg_channel_1 


 // (channel e live start jonno ..ja obs or onno j kno softwer deaya live korte parbe ) then ctrl + shift + a + d deaya bahir hoye aste hobe

# ffmpeg -i "rtmp://127.0.0.1:1935/live/channel_1" -c:v copy -c:a copy -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments ./media/channel_1/index.m3u8 


//then channel_2 e live korar jonno screen creat korte hobe . creat kora hole (trl + shift + a + d  deaya bahir hoye aste hobe )
# screen -S ffmpeg_channel_2 


 // (channel e live start jonno ..ja obs or onno j kno softwer deaya live korte parbe ) then ctrl + shift + a + d deaya bahir hoye aste hobe

# ffmpeg -i "rtmp://127.0.0.1:1935/live/channel_2" -c:v copy -c:a copy -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments ./media/channel_2/index.m3u8 


//ai vabe shob gulo channel live e neaya aste hobe 

//then trl + shift + a + d deaya bahir hoye aste hobe 


//(live screen koto gula asa dekhar jonno)
# screen -ls 
# sudo killall screen (screen off er jonno)


// OBS deaya live korte hobe 
// steam url : rtmp://10.12.91.160/live
// pass : channel_1   (channel 2 er jonno : channel_1 .. ai vabe shob gula alada hobe)
