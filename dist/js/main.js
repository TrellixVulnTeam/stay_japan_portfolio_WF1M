document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();
});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this.sides = document.querySelectorAll('.side');
    this._observers = [];

    this._init();
  }

  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _init() {
    new MobileMenu();
    this.hero = new HeroSlider('.swiper-container');
    Pace.on('done', this._paceDone.bind(this));
  }

  _paceDone() {
    this._scrollInit();
  }

  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  }

  _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove('triggered');
    } else {
      this.header.classList.add('triggered');
    }
  }

  _sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach(side => side.classList.add('inview'));
    } else {
      this.sides.forEach(side => side.classList.remove('inview'));
    }
  }

  _textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _destroyObservers() {
    this.observers.forEach(ob => {
      ob.destroy();
    });
  }

  destroy() {
    this._destroyObservers();
  }

  _scrollInit() {
    this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {
      once: false
    });
    this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
    this.observers = new ScrollObserver('.appear', this._inviewAnimation);
    this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation, {
      rootMargin: "-200px 0px"
    });
    this.observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {
      once: false
    });
    this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {
      once: false,
      rootMargin: "-400px 0px"
    });
  }

}

$(function () {
  const MSG_TEXT_MAX = '20文字以内で入力してください。';
  const MSG_EMPTY = '入力必須です。';
  const MSG_EMIL_TYPE = 'emailの形式ではありません。';
  const MSG_TEXTAREA_MAX = '500文字以内で入力してください。';
  $(".valid-text").keyup(function () {
    var form_g = $(this).closest('.form-group');

    if ($(this).val().length > 20) {
      console.log(form_g);
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.help-block').text(MSG_TEXT_MAX);
      console.log(form_g);
    } else if ($(this).val().length === 0) {
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.help-block').text(MSG_EMPTY);
    } else {
      form_g.removeClass('has-error').addClass('has-success');
      form_g.find('.help-block').text('');
    }
  });
  $(".valid-email").keyup(function () {
    var form_g = $(this).closest('.form-group');

    if ($(this).val().length === 0) {
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.help-block').text(MSG_EMPTY);
    } else if ($(this).val().length > 50 || !$(this).val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.help-block').text(MSG_EMIL_TYPE);
    } else {
      form_g.removeClass('has-error').addClass('has-success');
      form_g.find('.help-block').text('');
    }
  });
  $(".valid-textarea").keyup(function () {
    var form_g = $(this).closest('.form-group');

    if ($(this).val().length === 0) {
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.help-block').text(MSG_EMPTY);
    } else if ($(this).val().length > 500) {
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.help-block').text(MSG_TEXTAREA_MAX);
    } else {
      form_g.removeClass('has-error').addClass('has-success');
      form_g.find('.help-block').text('');
    }
  });
});
//# sourceMappingURL=main.js.map
