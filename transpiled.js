"use strict";

class CounterNumber {
  constructor() {
    let initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1n;
    let parent = arguments.length > 1 ? arguments[1] : undefined;
    this.number = BigInt(initialValue);
    this.minusActive = this.number < 0n;
    this.numberStr = this.number.toString().replace("-", "");
    this.length = this.numberStr.length;
    this.elements = [];
    this.numberAnimation = this._create("div", "numberAnimation");
    this.minus = this._create("div", "minus", "-");
    if (this.minusActive) this.minus.classList.add("active");
    this.numberAnimation.appendChild(this.minus);
    this.numberSlideWrapper = this._create("div", "numberSlideWrapper");
    this.numberAnimation.appendChild(this.numberSlideWrapper);
    parent?.appendChild(this.numberAnimation);
    this._initSlides();
  }
  _create(tag, className, text) {
    const el = document.createElement(tag);
    el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }
  _initSlides() {
    for (let i = 0; i < this.length; i++) this._addSlide(true);
    setTimeout(() => {
      this.width = this.elements[0][0].offsetWidth;
      this.numberSlideWrapper.style.width = `${this.width * this.length}px`;
      this._translate();
    }, 100);
  }
  _translate() {
    this.minus.classList.toggle("active", this.minusActive);
    this.elements.forEach((_ref, i) => {
      let [slide] = _ref;
      slide.style.transform = `translateY(-${this.numberStr[i]}em)`;
    });
  }
  _addSlide() {
    let first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const slide = this._create("div", "numberSlide");
    slide.style.transform = "translateY(9em)";
    const group = [slide];
    for (let j = 0; j < 10; j++) {
      group.push(this._create("div", "num", j));
      slide.appendChild(group[j + 1]);
    }
    this.elements.push(group);
    this.numberSlideWrapper.appendChild(slide);
    if (!first && this.width) this.numberSlideWrapper.style.width = `${this.width * this.length}px`;
  }
  _removeSlide() {
    this.elements.pop();
    this.numberSlideWrapper.lastChild.remove();
    this.numberSlideWrapper.style.width = `${this.width * this.length}px`;
  }
  _updateSlides(prevLength) {
    while (this.elements.length < this.length) this._addSlide();
    while (this.elements.length > this.length) this._removeSlide();
    this._translate();
  }
  setNumber(input) {
    try {
      const parsed = BigInt(input);
      const prevLength = this.length;
      this.number = parsed;
      this.minusActive = this.number < 0n;
      this.numberStr = this.number.toString().replace("-", "");
      this.length = this.numberStr.length;
      this._updateSlides(prevLength);
    } catch (err) {
      console.warn("Invalid number input", input, err);
    }
  }
  increment = () => {
    const prevLength = this.length;
    this.number += this.minusActive ? -1n : 1n;
    if (this.number === 0n) this.minusActive = false;
    this.numberStr = this.number.toString().replace("-", "");
    this.length = this.numberStr.length;
    this._updateSlides(prevLength);
  };
  decrement = () => {
    const prevLength = this.length;
    if (this.number === 0n) this.minusActive = true;
    this.number += this.minusActive ? 1n : -1n;
    this.numberStr = this.number.toString().replace("-", "");
    this.length = this.numberStr.length;
    this._updateSlides(prevLength);
  };
  getElement() {
    return this.numberAnimation;
  }
}

// Example usage:
const counter = new CounterNumber(1n, document.body);
const btns = document.querySelector(".btns").children;
btns[0].addEventListener("click", counter.increment);
btns[1].addEventListener("click", counter.decrement);
btns[2].addEventListener("change", e => counter.setNumber(e.target.value));
const a = {
  b: 2
};
a?.b;
