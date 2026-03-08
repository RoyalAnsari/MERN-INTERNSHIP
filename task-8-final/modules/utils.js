export function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
export function throttle(fn,limit){

let waiting=false

return function(...args){

if(!waiting){

fn(...args)
waiting=true

setTimeout(()=>{
waiting=false
},limit)

}

}

}