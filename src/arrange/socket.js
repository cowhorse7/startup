class EventMessage{
    constructor(dt,nm,img) {
        this.dt = dt;
        this.nm = nm;
        this.img = img;
    }
}
class ShareWall{
    events = [];
    handlers = [];

    constructor(){
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
        };
  }


broadcastEvent(dt, nm, img) {
  const event = new EventMessage(dt,nm,img);
  this.socket.send(JSON.stringify(event));
}

addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }
}

const Wall = new ShareWall();
export {Wall};