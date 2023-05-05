OPENAI_KEY
# Speech to String Comparison

An example of server an API with Express, using the OpenAI Whisper API to transcribe audio and then compare it with a local string to provide similarity in percentage.

You can test the API with [Postman](https://www.postman.com), and call the API with `form-data` body and the following params.

## API Reference

### `POST` `/`

#### Request Params

- A audio file with any format.

#### Response

- `transcription`: Transcribed text
- `original`: Original String
- `similarity`: Similarity in %

## Getting Started

First, to install the dependices run:

```bash
npm install
```

Then, export the credentials for the Google Cloud Platform on CLI:

```bash
export OPENAI_KEY="OPENAI API KEY"
```

Then, build and run the server:

```bash
npm start
```