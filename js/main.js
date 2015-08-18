$(document).ready(function () {
    QueryLoader.init();
    init_navigation();
    update_offsetY_init();
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: -200
    });
});

function go_to_section(el) {
    var $window = $(window);
    var $htmlBody = $('html,body');
    var windowHeight = $window.height();
    var destination = $(el).offset().top + 600 - windowHeight/2;
    flag = false;
    $htmlBody.animate({ scrollTop: destination}, 3000, "easeInOutExpo", function(){
        flag = true;
    });
}

function stop_scroll_animation(timerId) {
    var $htmlBody = $('html,body');
    clearTimeout(timerId);
    $htmlBody.stop().queue("fx", []);
}

function init_navigation() {
    $('a[href^="#"]').click(function () {
        stop_scroll_animation();
        var elementClick = $(this).attr("href");
        go_to_section(elementClick);
        return false;
    });
}

function index_current_section() {
    var $window = $(window);
    var k = $window.scrollTop()/1200;
    var indexCurrentSection = k + 1 | 0;
    if (indexCurrentSection - 0.5 < k) {
        indexCurrentSection++;
    }
    return indexCurrentSection;
}

function update_section_offsetY() {
    var currentSection = "#section" + index_current_section();
    go_to_section(currentSection);
}

function update_offsetY_init() {
    go_to_section('#section1');
    var $window = $(window);
    var timerId;
    $window.resize(function(){
        stop_scroll_animation(timerId);
        timerId = setTimeout(update_section_offsetY, 500);
    });
    $window.scroll(function(){
        if (flag) {
            stop_scroll_animation(timerId);
            timerId = setTimeout(update_section_offsetY, 500);
        }
    });
    $window.mousewheel(function(){
        stop_scroll_animation(timerId);
        timerId = setTimeout(update_section_offsetY, 500);
    });
}