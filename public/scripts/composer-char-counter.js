
var count = function() {
    let total = 140;
    let actual = total - $(this).val().length;
    let counter = $(this).parent().find('span.counter');
    counter.html(actual);
    if(actual < 0) {
        counter.removeClass("counter-normal");
        counter.addClass("counter-limit");
    } else {
        counter.removeClass("counter-limit");
        counter.addClass("counter-normal");
    }
}
$(document).ready(function() {
    $('textarea').on('input', count)
});
var element = document.getElementById("tweetText");
console.log(element);
//addEventListener('click', count);
