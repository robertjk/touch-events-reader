// How many milliseconds will be shown in event time log.
const TIME_PRECISION = 3;

const TOUCH_AREA_ID = "touch-area";
const TOUCH_AREA_HEIGHT_ID = "touch-area-height";
const BROWSER_EVENT_TEMPLATE_ID = "browser-event-template";
const LIBRARY_EVENT_TEMPLATE_ID = "hammer-event-template";
const BROWSER_EVENTS_LIST_ID = 'browser-events-list';
const LIBRARY_EVENTS_LIST_ID = 'library-events-list';

const startTime = performance.now();

const touchArea = document.getElementById(TOUCH_AREA_ID);
const touchAreaHeight = document.getElementById(TOUCH_AREA_HEIGHT_ID);
const browserEventTemplate = document.getElementById(BROWSER_EVENT_TEMPLATE_ID).innerHTML;
const libraryEventTemplate = document.getElementById(LIBRARY_EVENT_TEMPLATE_ID).innerHTML;
const browserEvents = document.getElementById(BROWSER_EVENTS_LIST_ID);
const libraryEvents = document.getElementById(LIBRARY_EVENTS_LIST_ID);


function changeTouchAreaHeight(height) {
    touchArea.style.height = `${height}px`;
}


function resetTouchAreaHeightValue() {
    touchAreaHeight.value = touchArea.offsetHeight;
}


function currentTime() {
    return ((performance.now() - startTime) / 1000).toFixed(TIME_PRECISION);
}


function scrollDownElement(element) {
    element.scrollTop = element.scrollHeight - element.clientHeight;
}


function printBrowserEvent(event) {
    let view = {
        timeOfEvent: currentTime(),
        type: event.type,
        // Mustache needs Array object.
        touches: Array.from(event.changedTouches)
    };

    Mustache.parse(browserEventTemplate);
    let eventHTML = Mustache.render(browserEventTemplate, view);
    browserEvents.innerHTML += eventHTML;
    scrollDownElement(browserEvents);
}


function printHammerEvent(event) {
    let view = {
        timeOfEvent: currentTime(),
        touch: event
    };

    Mustache.parse(libraryEventTemplate);
    let eventHTML = Mustache.render(libraryEventTemplate, view);
    libraryEvents.innerHTML += eventHTML;
    scrollDownElement(libraryEvents);
}


function initializeControls() {
    resetTouchAreaHeightValue();
    touchAreaHeight.addEventListener('change', (event) => {
        let height = parseInt(touchAreaHeight.value);
        if (height && 0 < height) {
            changeTouchAreaHeight(height);
        } else {
            resetTouchAreaHeightValue();
        }
    });
}


function initializeBrowserEvents() {
    touchArea.addEventListener('touchstart',  printBrowserEvent);
    touchArea.addEventListener('touchend',    printBrowserEvent);
    touchArea.addEventListener('touchcancel', printBrowserEvent);
    touchArea.addEventListener('touchmove',   printBrowserEvent);
}


function initializeLibraryEvents() {
    const hammer = new Hammer(touchArea);

    // Enable pinch and rotate recognizers, which are disabled by default.
    hammer.get('pinch').set({ enable: true });
    hammer.get('rotate').set({ enable: true });
    // Enable both horizontal and vertical directions for pan and swipe
    // recognizers.
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    hammer.on('tap',       printHammerEvent);
    hammer.on('doubletap', printHammerEvent);
    hammer.on('pan',       printHammerEvent);
    hammer.on('swipe',     printHammerEvent);
    hammer.on('press',     printHammerEvent);
    hammer.on('pinch',     printHammerEvent);
    hammer.on('rotate',    printHammerEvent);
}


initializeControls();
initializeBrowserEvents();
initializeLibraryEvents();
