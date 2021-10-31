from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
import os
import requests
from requests.structures import CaseInsensitiveDict
import json
from os import environ
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

@app.route('/api/sentiment', methods=['POST'])
def sentiment():

    user = request.json['user']
    num = request.json['num']

    token = os.getenv('BEARER_TOKEN')

    # text = request.json['text']
    headers = CaseInsensitiveDict()
    # headers["Accept"] = "application/json"
    headers["Authorization"] = "Bearer "+token
    print('https://api.twitter.com/2/users/by/username/'+user)
    resp = requests.get('https://api.twitter.com/2/users/by/username/'+user, headers=headers).json()
    print(resp)
    # resp2 = requests.get('https://api.twitter.com/2/users/'+resp['data']['id']+'/tweets', headers=headers).json() 
    resp2 = requests.get('https://api.twitter.com/2/users/'+resp['data']['id']+'/tweets?tweet.fields=public_metrics&'+'max_results='+num, headers=headers).json() 
    #resp3 = requests.get('https://api.twitter.com/2/users/'+resp['data']['id']+'/tweets?tweet.fields=organic_metrics&'+'max_results='+num, headers=headers).json() 
    #print(resp3)
    
    url = "https://api.twitter.com/2/users/by/username/"+ user +"?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld&expansions=pinned_tweet_id&tweet.fields=attachments,author_id,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld"
    payload={}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    print(response.text)

    from tensorflow.keras.models import load_model
    from tensorflow.keras.preprocessing.text import Tokenizer
    from tensorflow.keras.preprocessing.sequence import pad_sequences

    model = load_model('./lstm/best_model.h5')
    
    import pickle

    max_words = 5000
    max_len=50

    tokenizer = Tokenizer(num_words=max_words, lower=True, split=' ')

    with open('./lstm/preprocess.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    # tokenizer.fit_on_texts(text)
    # tokenizer = Tokenizer(num_words=max_words, lower=True, split=' ')

    def predict_class(text):
        '''Function to predict sentiment class of the passed text'''
        
        sentiment_classes = ['Negative', 'Neutral', 'Positive']
        max_len=50
        # print(text)
        # Transforms text to a sequence of integers using a tokenizer object
        # tokenizer = Tokenizer()
        
        xt = tokenizer.texts_to_sequences(text)
        print(xt)
        # Pad sequences to the same length
        xt = pad_sequences(xt, padding='post', maxlen=max_len)
        print(xt)
        # Do the prediction using the loaded model
        yt = model.predict(xt).argmax(axis=1)
        print(model.predict(xt))
        # Print the predicted sentiment
        k= sentiment_classes[yt[0]]
        # print(k)
        return k

    final_dict = {}
    res_array = []

    for i in resp2['data']:
        tweet = i['text']
        analysis = predict_class([tweet])
        i['sentiment']=analysis
        # final_dict[tweet]=analysis
        # temp = final_dict
        # final_dict = {}
        # res_array.append(temp)
        # temp = {}
    print(resp2)

    for i in resp2['data']:
        tweet = i['text']
    print(resp2)

    # return jsonify({ "result": predict_class([text])})
    # return jsonify({ "result": res_array })
    return jsonify({ "result":  resp2['data'] })

# @app.route('/api/lstm', methods=['POST'])
# def lstm():
#     text = request.json['text']
#     from tensorflow.keras.models import load_model
#     from tensorflow.keras.preprocessing.text import Tokenizer
#     from tensorflow.keras.preprocessing.sequence import pad_sequences
#     model = load_model('./lstm/best_model.h5')
#     import pickle
#     max_words = 5000
#     max_len=50
#     tokenizer = Tokenizer(num_words=max_words, lower=True, split=' ')
#     with open('./lstm/preprocess.pickle', 'rb') as handle:
#         tokenizer = pickle.load(handle)
#     # tokenizer.fit_on_texts(text)
#     # tokenizer = Tokenizer(num_words=max_words, lower=True, split=' ')
#     def predict_class(text):
#         '''Function to predict sentiment class of the passed text'''
        
#         sentiment_classes = ['Negative', 'Neutral', 'Positive']
#         max_len=50
#         # print(text)
#         # Transforms text to a sequence of integers using a tokenizer object
#         # tokenizer = Tokenizer()
        
#         xt = tokenizer.texts_to_sequences(text)
#         print(xt)
#         # Pad sequences to the same length
#         xt = pad_sequences(xt, padding='post', maxlen=max_len)
#         print(xt)
#         # Do the prediction using the loaded model
#         yt = model.predict(xt).argmax(axis=1)
#         print(model.predict(xt))
#         # Print the predicted sentiment
#         k= sentiment_classes[yt[0]]
#         # print(k)
#         return k

#     return jsonify({ "result": predict_class([text])})

if __name__ == '__main__':
    app.run(debug=True)