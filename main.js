prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quatlity: 90

});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });
}
console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/x-RX9s-4VG/model.json", modelLoaded);

function modelLoaded() {
    console.log("modelloaded");
}

function speak() {
    var synth = window.speechSynthesis;
    data1 = "the first prediction is" + prediction_1;

    data2 = " and the second prediction is" + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(data1 + data2);
    utterthis.rate = 0.5;
    synth.speak(utterthis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_name").innerHTML = results[0].label;
        document.getElementById("result_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        if (results[0].label == "victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if (results[0].label == "amazing") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (results[0].label == "best") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }


        if (results[1].label == "victory") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if (results[1].label == "amazing") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if (results[1].label == "best") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
    }



}