let array = [];

let _push = new Proxy(array, {
  set(target, propKey, value) {
    console.log(target, propKey, value);
    return Reflect.set(target, propKey, value);
  }
});

_push.push({ name: "weilan" });
