let music_set=document.querySelector(".music-set");
let progress=document.querySelector("#progress");
let player=document.querySelector("#player");
let action=document.querySelector("#action");
let prev=document.querySelector("#prev");
let next=document.querySelector("#next");
let play='<path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>';
let pause='<path fill="#ffffff" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"></path>';
action.innerHTML=play;
console.log("Music Play Symbol");
let cover=["1.jpeg","2.jpg","3.jpg","4.jpeg","5.jpeg"];
let music=["1.mp3","2.mp3","3.mp3","4.mp3","5.mp3"];
let music_name=["Ankhiya Gulaab","Laal Chunariya","Arjan Velley","Jaaneiye","Pehele Bhi Mai"];
for(let i=0;i<5;i++)
{
    // console.log(`i value is ${i}`);
    let list=document.createElement("div");
    list.classList.add("list");
    list.innerHTML=`<div class="icon-container">
    <img src="Cover\\${cover[i]}" alt="" id="player-icon">
    </div>
    <p id="music-name" class="${music[i]}">${music_name[i]}</p>`
    music_set.appendChild(list);
}


// console.log(action.innerHTML);
let audio_element=new Audio("\\Music\\1.mp3");
let music_list=document.querySelectorAll(".list");
music_list.forEach((selected_music)=>{
    console.log(selected_music.innerHTML);
    // to_play=selected_music.querySelector("p").getAttribute("class");
    selected_music.addEventListener("click",(clicked_on)=>{
        // console.log("******************************************************");
        let poster="\\"+get_curr(clicked_on.target.parentNode.querySelector("div").querySelector("img"));
        // console.log(poster);
        player.src=poster;
        to_play=clicked_on.target.getAttribute("class");
        to_play="\\Music\\"+to_play;
        let current_play="\\"+get_curr(audio_element);
        console.log(`current song= ${current_play}`);
        player.classList.add("rotate");
        if(current_play==to_play)
        {
            // player.classList.add("rotate");
            // action.innerHTML=play;
            // audio_element.pause();
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
            playpause();
        }
        else{
            // console.log("Requested to Play", to_play);
            console.log("Music Pause Symbol");
            action.innerHTML=pause;
            audio_element.src=to_play;
            audio_element.play();
        }
    });
});


function get_curr(audio_element)
{
    let fullUrl = audio_element.src;
    let urlParts = fullUrl.split("/");
    // console.log(urlParts);
    let relativePath = urlParts.slice(-2).join("\\");
    return relativePath
}

function playpause()
{
    console.log("Music paused-",audio_element.paused);
    if(!audio_element.paused)
    {
        console.log("Music Pause Symbol");
        action.innerHTML=play;
        audio_element.pause();
        player.classList.remove("rotate");
    }
    else
    {

        console.log("Music Play Symbol");
        action.innerHTML=pause;
        audio_element.play();
        player.classList.add("rotate");
    }
}

audio_element.addEventListener("timeupdate",()=>{
    let tot_len=audio_element.duration;
    let cur_time=audio_element.currentTime;
    progress.value=(cur_time/tot_len)*100;
})
progress.addEventListener("input",()=>{
    audio_element.currentTime=(progress.value*audio_element.duration)/100;
})

document.addEventListener("keydown",(evt)=>{
    if(evt.code==="Spacebar" || evt.key===" ") evt.preventDefault();
    playpause(audio_element); 
})

action.addEventListener("click",()=>{
    playpause(audio_element);
    // if(action.innerHTML===play)
    // action.innerHTML=pause;
    // else
    // action.innerHTML=play;
})

next.addEventListener("click",()=>{
    let current_play=get_curr(audio_element);
    let Parts = current_play.split("\\");
    // console.log(Parts[1]);
    current_play=Parts[1];
    let idx=(music.indexOf(current_play)+1)%5;
    console.log(current_play);
    let nxt="\\Music\\"+music[idx];
    audio_element.src=nxt;
    audio_element.play();
    action.innerHTML=pause;
    poster="\\Cover\\"+cover[idx];
    player.src=poster;
    // playpause(audio_element);
})



prev.addEventListener("click",()=>{
    let current_play=get_curr(audio_element);
    let Parts = current_play.split("\\");
    // console.log(Parts[1]);
    current_play=Parts[1];
    let idx=(music.indexOf(current_play)-1+5)%5;
    console.log(current_play);
    let pre="\\Music\\"+music[idx];
    audio_element.src=pre;
    audio_element.play();
    action.innerHTML=pause;
    poster="\\Cover\\"+cover[idx];
    player.src=poster;
    // playpause(audio_element);
})