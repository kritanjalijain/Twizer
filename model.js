// JavaScript
const tf = require('@tensorflow/tfjs');
//import * as tf from '@tensorflow/tfjs';
//require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');

const model = tf.loadLayersModel('./model/model.json');
console.log(model);
const seq = use.loadTokenizer().then(tokenizer => {
    tokenizer.encode('Hello, how are you?'); // [341, 4125, 8, 140, 31, 19, 54]
  });
//const seq = tokenizer.encode('Hello, how are you?');
  const maxLen = 50;
  if(seq.length < maxLen){
  const pad =[];
    for(let i = 0; i < maxLen - seq.length; i++)
    {
        pad.push(0);
    }
    seq = seq.concat(pad);
  }
  console.log(seq);
  const pred = model.predict(seq);
  console.log(Math.max(...pred));
  const index = Math.max(...pred);
  const sentiment_classes = ['Negative', 'Neutral', 'Positive'];
  console.log(sentiment_classes[index]);

