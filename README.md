## Create a Listener
Create an event listener by passing an event name and a handler function. Publish an event by passing the event name and the payload.

```js
import { createEventListener, publishEvent } from 'event-funnel';

let handler = (payload) => console.log(payload);

let listenerId = createEventListener("MY_EVENT_NAME", handler);

publishEvent("MY_EVENT_NAME", "Hello, World!");
```

Expected Output:
```
Hello, World!
```

## Destroy a Listener
Destroy an event listener by passing the event name and the listener ID.

```js
import { destroyEventListener } from 'event-funnel';

destroyEventListener("MY_EVENT_NAME", listenerId);
```