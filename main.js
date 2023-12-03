song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song_status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Intialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song.isPlaying();
    song2.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        song_status="song 1 true";    
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    }
    if(song_status == "song 1 true")
    {
        song.play();
        //document.getElementById("songname").innerHTML="Harry Potter";

        if(scoreRightWrist > 0.2)
    {
        song_status="song 2 true";    
        circle(rightWristX, rightWristY, 20);
        song.stop();
    }
    if(song_status == "song 2 true")
    {
        song2.play();
        //document.getElementById("songname").innerHTML="Harry Potter";

    }
    }
}

function play()
{
    song.play();
    song.setVolume();
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = "+leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    }
}