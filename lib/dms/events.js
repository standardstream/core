import events  from 'events'
var emitter = new events.EventEmitter()

class Events {

  constructor() {

  }

}

Events.prototype.emit = emitter.emit
Events.prototype.off  = emitter.removeListener
Events.prototype.on   = emitter.on
Events.prototype.once = emitter.once

export default Events
