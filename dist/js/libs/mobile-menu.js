class MobileMenu {
  constructor() {
    this.DOM = {};
    this.DOM.btn = document.querySelector('.mobile-menu__btn');
    this.DOM.cover = document.querySelector('.mobile-menu__cover');
    this.DOM.jsbtn1 = document.querySelector('.js-btn1');
    this.DOM.jsbtn2 = document.querySelector('.js-btn2');
    this.DOM.jsbtn3 = document.querySelector('.js-btn3');
    this.DOM.container = document.querySelector('#global-container');
    this.eventType = this._getEventType();

    this._addEvent();
  }

  _getEventType() {
    return window.ontouchstart ? 'touchstart' : 'click';
  }

  _toggle() {
    this.DOM.container.classList.toggle('menu-open');
  }

  _addEvent() {
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.jsbtn1.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.jsbtn2.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.jsbtn3.addEventListener(this.eventType, this._toggle.bind(this));
  }

}
//# sourceMappingURL=mobile-menu.js.map
