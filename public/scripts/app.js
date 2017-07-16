var totalTweets = 0;

function createTweetElement(tweetData) {
    let userName = tweetData.user.name;
    let avatar = tweetData.user.avatars.regular;
    let handle = tweetData.user.handle; 
    let content = tweetData.content.text;
    let date = tweetData.created_at;
    let id = getTweetId();
    date = dateDiffInDays(date);
    if(date === 0) {
      date = "Today";
    } else {
      date = date + " days ago"
    }

    var tweet = 
       `<section class="tweets" id="${id}">
            <article>
                <header>
                    <img src="${avatar}">
                    <span class="user">${userName}</span>
                    <span class="username">${handle}</span>
                </header>
                <p>${escape(content)}</p>
                <footer>
                    <span class="timeAgo">${date}</span>
                    <i id="like-heart" class="fa fa-heart" aria-hidden="true" onClick="likeAction(${id})" liked="false"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-flag" aria-hidden="true"></i>
                </footer>
            </article>
        </section>
        </br>`

    return tweet;
}

function getTweetId() {
  totalTweets++;
  return totalTweets;
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function dateDiffInDays(posted) {
  var _MS_PER_DAY = 86400000;
  let now = Date.now();
  return Math.floor((now - posted) / _MS_PER_DAY);
}

function likeAction(id) {
  var liked = ($(`#${id}`).find('#like-heart').attr("liked") == 'true');
  if(liked) {
    $(`#${id}`).find("#like-heart").attr("liked", 'false');
    $(`#${id}`).find(".liked").remove();
  } else {
    $(`#${id}`).find("#like-heart").prepend("<a class='liked'>1</a>");
    $(`#${id}`).find("#like-heart").attr("liked", 'true');
  }
}


function renderTweets(data) {
  data.forEach(function(element) {
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
    if(text.length > 140) {
      event.preventDefault();
      alert("The tweet must have less than 140 characters");
    } else {
      event.preventDefault();
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
