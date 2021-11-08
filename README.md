# tWizer : The Wise Twitter Analyzer
A tool for insightful  visualizations and analytics for understanding Twitter data's impact at a glance

## Project Description

The project is an attempt to help brands/influencers/individuals make a wise or sophisticated use of all their social data. Through tWizer, one can run Twitter reports of how far a Twitter handle, keyword or hashtag has reached. 

tWizer helps presenting all the unstructured Twitter data into a finely tailored dashboard, generating user friendly and easy-to-understand visualization report and hence triggering great business ideas and allowing them to take data driven decisions for their next successful step/campaign. 

## Working

### Technologies Used
* Languages - Python, Javascript
* React.js - Material UI, ReaViz, React Twitter Embed
* Tensorflow
* Flask


##### Fig 1 - Flow of the system

* The user interface for it is provided via a web app with key instructions and features. 
* Tweets could be fetched within the range 1 to 100, these tweets can be ordered via two methods by 
   * user name 
   * hashtag

##### Fig 2 - Landing page


* The tweets after being retrieved in the backend in the metadata form is fed into the corresponding fields in the frontend producing a powerful visualization dashboard

##### Fig 3 - Username profile metrics and sentiment analysis

* The dashboard can be divided into different sections for easy understanding; 
  * the first section shows the user’s profile metrics like the count of the user’s friends, followers, number of tweets and number of tweets liked by the user
  * the second section includes classifying the sentiments of the tweets into three categories namely – positive, negative and neutral in the form of a pie chart (the model training/testing details can be found [here](https://github.com/kritanjalijain/Twitter_Sentiment_Analysis))

##### Fig 4 - Top replied and quoted tweets, top liked and retweeted tweets

* The impact of the user’s tweet is analyzed in terms of the most replied, retweeted, quoted and liked tweets the user ever tweeted. The app embeds the tweets directly from twitter and provides functionality of seeing not just the text but the images and play in-picture video attached to the tweet along with the option of going to the tweet directly in case the user wishes to interact with it. 

##### Fig 5 - Table of user’s tweets along with their impact metrics sorted via like count

* The app next analyses all the tweets fetched and visualizes them into a pagniated tabular format. The tweets can be sorted in increasing order or decreasing order of one of the four
metrics or all of them together.

##### Fig 6 - Language-wise distribution of tweets

* Finally it consists of a distribution graph to represent variety of languages the people have tweeted in for that particular hashtag or username




##### Fig 7 - Abstraction layers of the web-application 

On encountering an input query made by the user via the frontend built in React.js. The flask server in turn, requests data from twitter via Twitter’s API. The API sends data response to the backend which it processes and analyzes via sentiment analysis and other metrics which it sends as a json response to the frontend again. Powerful React libraries are used for visualization and graphical presentation of the data which are presented to the user’s dashboard.


## Setup and Installation
* Clone the repo via `git clone`
* Install all dependecies via `requirements.txt`
* Add your private Twitter API keys (see [.env_sample](https://github.com/kritanjalijain/Twizer/blob/main/.env_sample) for details) (To get your own API keys you will need a Twitter Developer's Account. See documentation for further details [Get started with the Twitter developer platform](https://developer.twitter.com/en/docs/getting-started)
* Run the backend flask server in a terminal via `python app.py`
* In a new terminal (without closing the backend flask server), navigate to the React frontend via ` cd frontend` 
* Run `npm install` or `npm i` to install the dependencies in the local `node_modules` folder
* Run the node script via `npm start`
* Open the local host port the server is using in a browser by clicking on the link displayed in the terminal in case it does not automatically pop-up





 
