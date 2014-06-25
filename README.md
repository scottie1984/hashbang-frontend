#API setup

```
sudo ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future bundle install
rake db:create
rackup
```
Then browse to http://localhost:9292

*OR*

To run the API in development mode with reloading enabled, use shotgun: -

```
sudo gem install shotgun #don't add this to the Gemfile
shotgun config.ru
```

Then browse to http://localhost:9393

test

### Seed database

Running 

...
rake db:create
...

Will now delete your current DB and create a new DB with seeded data. 

*IMPORTANT* Restart the RUBY server after doing this.

This will create 2 users by default:

* dog_lover1980
* cat_lover1990

Password is 12Password12

###Cucumber tests

Run a bundle install on the root folder of the project:

...
sudo ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future bundle install
...

Run the following command to run the cucumber tests:

...
cucumber
...

## Tags API

There are two modes support for getting tags : popular or recent

Both modes return the results with the most recent first.

Format: http://localhost:9292/tag/:mode/:searchString/:number

Examples: 

* http://localhost:9292/tag/popular/all/3
* http://localhost:9292/tag/recent/cat/2
* http://localhost:9292/tag/popular/dog/10


## Uploads API

### Posting a file upload

This is a multipart form post, one part sends the metadata in JSON and the other part sends the file.

```
curl -X POST -F 'metadata={"userid": 1}' -F "image_file=@/Users/davidt/dev/social-challenges/frontend/assets/img/cat1.jpg" http://localhost:9393/upload/add
```

### Getting file uploads

Get endpoints for uploads API are as follows: -

* http://localhost:9393/upload/add
* http://localhost:9393/upload/all
* http://localhost:9393/upload/[id]
* http://localhost:9393/upload/[id]/download

## User creation
* cd to api and run a bundle install (sudo ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future bundle install)
* type mailcatcher in cmd to run the mailcatcher daemon.
* Navigate to http://localhost:1080/ on the browser
* Go to the signup page and create a user (hint: you can use the password: myPass145)
* You should receive an email in mailcatcher, open the email and copy the activation link into the browser
* You should now be able to log in with your new user



### Running the tests

```
# to run all tests
rake spec
# to use guard to watch for changes and run tests for you
bundle exec guard
```

## RMagick

```
cd api/app/api
brew install pkgconfig
brew install imagemagick
brew link imagemagick
bundle install
```

### Demo: creates 3 sizes
```
ruby resizeDemo.rb
```
* api/spec/upoads/resize_large.jpg
* api/spec/upoads/resize_medium.jpg
* api/spec/upoads/resize_thumb.jpg

### API post resize image
Post to endpoint:
* http://localhost:9292/upload/[id]/resize

Images will resize if original image is > maxWidthImage and thmbnails will be created automatically

Required attributes example:

* maxWidthImage = 760
* maxHeightImage = 760
* maxWidthThumb = 125
* maxHeightThumb = 125
* resizeQuality = 70

#Front end

```
cd frontend
bundle install
npm install
npm install -g grunt-cli
grunt
npm start
```

Browse at http://localhost:8000