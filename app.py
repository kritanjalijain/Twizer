from flask import Flask, request, jsonify
import os
import requests
from requests.structures import CaseInsensitiveDict
import json
import tweepy as tw
from os import environ
from dotenv import load_dotenv


app = Flask(__name__)
load_dotenv()
token = os.getenv('BEARER_TOKEN')

consumerKey =  os.getenv('CONSUMER_KEY')
consumerSecret =  os.getenv('CONSUMER_SECRET')
accessToken =  os.getenv('ACCESS_TOKEN')
accessTokenSecret =  os.getenv('ACCESS_SECRET')

authenticate = tw.OAuthHandler(consumerKey, consumerSecret) 
        
# Set the access token and access token secret
authenticate.set_access_token(accessToken, accessTokenSecret) 
    
# Creating the API object while passing in auth information
api = tw.API(authenticate, wait_on_rate_limit = True)



@app.route('/api/sentiment', methods=['POST'])
def sentiment():

    user = request.json['user']
    num = request.json['num']

    # token = ''

    # text = request.json['text']
    headers = CaseInsensitiveDict()
    # headers["Accept"] = "application/json"
    headers["Authorization"] = "Bearer "+token

    resp = requests.get('https://api.twitter.com/2/users/by/username/'+user, headers=headers).json()
    print(resp)
    # resp2 = requests.get('https://api.twitter.com/2/users/'+resp['data']['id']+'/tweets', headers=headers).json() 
    resp2 = requests.get('https://api.twitter.com/2/users/'+resp['data']['id']+'/tweets?tweet.fields=public_metrics,entities,lang,geo,created_at&'+'max_results='+num, headers=headers).json() 

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


    def predict_class(text):
        '''Function to predict sentiment class of the passed text'''
        
        sentiment_classes = ['Negative', 'Neutral', 'Positive']
        max_len=50
        print(text)
        # Transforms text to a sequence of integers using a tokenizer object
         
        xt = tokenizer.texts_to_sequences(text)
        print(xt)
        # Pad sequences to the same length
        xt = pad_sequences(xt, padding='post', maxlen=max_len)
        #print(xt)
        # Do the prediction using the loaded model
        yt = model.predict(xt).argmax(axis=1)
        print(model.predict(xt))
        # Print the predicted sentiment
        k= sentiment_classes[yt[0]]
        print(k)
        return k

    final_dict = {}
    res_array = []

    for i in resp2['data']:
        tweet = i['text']
        analysis = predict_class([tweet])
        i['sentiment']=analysis

    return jsonify({ "result": resp2['data'] })










@app.route('/api/user', methods=['POST'])
def user():

    user = request.json['user']
    # num = request.json['num']

    # token = ''

    # text = request.json['text']
    headers = CaseInsensitiveDict()
    # headers["Accept"] = "application/json"
    headers["Authorization"] = "Bearer "+token

    resp = requests.get('https://api.twitter.com/2/users/by/username/'+user, headers=headers).json()

    print(resp)


    user_followers = api.get_user(user_id=resp['data']['id'])

    final_res = {
        'user':         user,
        'Followers':    user_followers.followers_count,
        'Friends':      user_followers.friends_count,
        'Tweets':       user_followers.statuses_count,
        'Tweets liked': user_followers.favourites_count
    }

    return jsonify({ "Result": final_res })
    # return jsonify({ "result": len(resp2['data']) })














@app.route('/api/hashtag', methods = ['POST'])
def tags():
    tag = request.json['hashtag']
    num = request.json['num']
    tag = '#' + tag



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

    def predict_class(text):
        '''Function to predict sentiment class of the passed text'''
        
        sentiment_classes = ['Negative', 'Neutral', 'Positive']
        max_len=50
        print(text)
        # Transforms text to a sequence of integers using a tokenizer object
       
        xt = tokenizer.texts_to_sequences(text)
        #print(xt)
        # Pad sequences to the same length
        xt = pad_sequences(xt, padding='post', maxlen=max_len)
        #print(xt)
        # Do the prediction using the loaded model
        yt = model.predict(xt).argmax(axis=1)
        #print(model.predict(xt))
        #print(yt)
        # Print the predicted sentiment
        k= sentiment_classes[yt[0]]
        #print(k)
        return k
    
    tweets = []
    for tweet in tw.Cursor(api.search_tweets, q=tag).items(int(num)):
        tweets.append(tweet.text)

    analysis = {}
    
    final_res = []

    for tweet in tweets:
        analysis['text'] = tweet
        #print(tweet)
        analysis['sentiment'] = predict_class([tweet])
        final_res.append(analysis)
        analysis = {}


    return jsonify({ 'result': final_res })



if __name__ == '__main__':
    app.run(debug=True)
