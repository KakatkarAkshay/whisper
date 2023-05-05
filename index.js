const express = require('express');
const cors = require('cors');
const multer = require("multer");
const stringSimilarity = require('string-similarity');
const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const upload = multer();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

async function transcribe(buffer) {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createTranscription(
        buffer,
        "whisper-1",
        undefined,
        'json',
        1,
        'en'
    )
    return response;
}

app.post("/", upload.any('file'), (req, res) => {
    audio_file = req.files[0];
    buffer = audio_file.buffer;
    buffer.name = audio_file.originalname;
    const response = transcribe(buffer);
    response.then((data) => {
        let str = "This is my family. I live in a city."
        similarity = parseInt(stringSimilarity.compareTwoStrings(data.data.text, str) * 100)
        result = `${similarity}%`
        res.send({
            transcription: data.data.text,
            original: str,
            similarity: result
        });
    }).catch((err) => {
        res.send({ type: "POST", message: err });
    });
});

app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Ready to Go!');
});
