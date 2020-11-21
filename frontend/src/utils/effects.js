// export function slideShow(slideIndex, time) {
//   var t;
//   var slides = document.getElementsByClassName("promo-container");
//   var bubbles = document.querySelectorAll(".bubble-item,.bubble-item-active");
//   if (slides.length === 0) {
//     return;
//   }

//   for (var i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//     bubbles[i].className = "bubble-item";
//   }

//   if (slideIndex >= slides.length) {
//     slideIndex = 1;
//   } else {
//     slideIndex++;
//   }

//   slides[slideIndex - 1].style.display = "block";
//   bubbles[slideIndex - 1].className = "bubble-item-active";

//   t = setTimeout(function () {
//     slideShow(slideIndex, time);
//   }, time);
// }

// class SlideShow {
//   constructor() {
//     this.t = function () {};
//   }

//   start = (slideIndex, time) => {
//     var slides = document.getElementsByClassName("promo-container");
//     var bubbles = document.querySelectorAll(".bubble-item,.bubble-item-active");
//     if (slides.length === 0) {
//       return;
//     }

//     for (var i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//       bubbles[i].className = "bubble-item";
//     }

//     if (slideIndex >= slides.length) {
//       slideIndex = 1;
//     } else {
//       slideIndex++;
//     }

//     slides[slideIndex - 1].style.display = "block";
//     bubbles[slideIndex - 1].className = "bubble-item-active";

//     this.t = setTimeout(function () {
//       slideShow(slideIndex, time);
//     }, time);
//   };

//   stop = () => {
//     clearTimeout(this.t);
//   };
// }

// export default SlideShow;
