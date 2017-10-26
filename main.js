const EVENT_TEMPLATE_ID = "event-template";
const BROWSER_EVENTS_LIST_ID = 'browser-events-list';
const LIBRARY_EVENTS_LIST_ID = 'library-events-list';

const startTime = performance.now();

const eventTemplate = document.getElementById(EVENT_TEMPLATE_ID).innerHTML;
const browserEvents = document.getElementById(BROWSER_EVENTS_LIST_ID);
const libraryEvents = document.getElementById(LIBRARY_EVENTS_LIST_ID);


function printEvent(touches, list, isStarted) {
    const timeOfEvent = ((performance.now() - startTime) / 1000).toFixed(2);
    const view = {
        timeOfEvent,
        isStarted,
        // Mustache needs Array object.
        touches: Array.from(touches),
    };

    Mustache.parse(eventTemplate);
    let eventHTML = Mustache.render(eventTemplate, view);
    browserEvents.innerHTML += eventHTML;
}


function onTouchStart(event) {
    printEvent(event.touches, browserEvents, true);
}


function onTouchEnd(event) {
    printEvent(event.changedTouches, browserEvents, false);
}


function onTouchMove(event) {
}


function onTouchCancel(event) {
}


function initialize() {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('touchcancel', onTouchCancel);
    document.addEventListener('touchmove', onTouchMove);
}


initialize();
