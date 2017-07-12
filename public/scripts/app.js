
// // Fake data taken from tweets.json
// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

function createTweetElement(tweetData) {
    let userName = tweetData.user.name;
    let avatar = tweetData.user.avatars.regular;
    let handle = tweetData.user.handle; 
    let content = tweetData.content.text;
    let date = tweetData.created_at;
    
    var tweet = 
       `<section class="tweets">
            <article>
                <header>
                    <img src="${avatar}">
                    <span class="user">${userName}</span>
                    <span class="username">${handle}</span>
                </header>
                <p>${content}</p>
                <footer>
                    <span class="timeAgo">${date}</span>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-flag" aria-hidden="true"></i>
                </footer>
            </article>
        </section>
        </br>`

    return tweet;
}

function renderTweets(data) {
  data.forEach(function(element) {
      console.log(element);
      let tweet = createTweetElement(element);
      $('.tweets-container').append(tweet);
  });
}

function appendNewTweet(data) {
  let tweet = createTweetElement(data);
  $('.tweets-container').prepend(tweet);
}


$(document).ready(function(){
  loadTweets();
});

function loadTweets() {
  $(function() {
    $.ajax({
      url: 'tweets',
      method: 'GET',
      success: function (tweets) {
        console.log(tweets);
        renderTweets(tweets)
      }
    });
  });
}

function loadLastTweet() {
  $(function() {
    $.ajax({
      url: 'tweets',
      method: 'GET',
      success: function (tweets) {
        let last = tweets.length;
        appendNewTweet(tweets[last - 1]);
      }
    });
  });
}

$(document).ready(function(){

  $("#compose").click(function() {
    $(".new-tweet").slideToggle("slow");
    $("#tweet-text").focus();
  });

  $("form.newTweet").on("submit", function(event) {
    var text = $(this).find("textarea").val();
    console.log(text.length);
    if(text.length > 140) {
      event.preventDefault();
      alert("The tweet must have less than 140 characters");
    } else {
      event.preventDefault();
      console.log('Button clicked, performing ajax call...');
      $.ajax( {
        method: "POST",
        url: 'tweets',
        data: $(this).serialize()
      }).done(function () {
        loadLastTweet();
      });
    }
  });
});




// // Test / driver code (temporary)
// console.log(createTweetElement()); // to see what it looks like
// $(document).ready(function() {
//     $('.tweets-container').append(createTweetElement());
// })
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

