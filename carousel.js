(function () {
  var cards = document.querySelectorAll('#projectsRing .card');
  var dots  = document.querySelectorAll('#projectsDots .dot');
  var N     = cards.length;
  var current = 0;

  var EASE_COMMIT   = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
  var EASE_SNAPBACK = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

  function rotateTo(idx) {
    current = ((idx % N) + N) % N;
    cards.forEach(function (card, i) {
      card.classList.remove('pos--center', 'pos--left', 'pos--right');
      var diff = ((i - current) % N + N) % N;
      if (diff === 0)          card.classList.add('pos--center');
      else if (diff === 1)     card.classList.add('pos--right');
      else if (diff === N - 1) card.classList.add('pos--left');
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('dot--active', i === current);
    });
  }

  document.getElementById('projectsPrev').addEventListener('click', function () { rotateTo(current - 1); });
  document.getElementById('projectsNext').addEventListener('click', function () { rotateTo(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { rotateTo(i); }); });

  var stage = document.querySelector('.carousel-stage');
  var touchStartX = 0;
  var touchStartY = 0;
  var isDragging = false;
  var isHorizontal = null;
  var isAnimating = false;
  var peekCard = null;
  var mobile = false;

  function initPeekCard(card) {
    card.style.display    = 'block';
    card.style.position   = 'absolute';
    card.style.top        = '0';
    card.style.left       = '0';
    card.style.marginLeft = '0';
    card.style.width      = '100%';
    peekCard = card;
  }

  stage.addEventListener('touchstart', function (e) {
    if (isAnimating) return;
    mobile = window.matchMedia('(max-width: 600px)').matches;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = true;
    isHorizontal = null;
    peekCard = null;
    if (mobile) {
      var center = document.querySelector('#projectsRing .pos--center');
      if (center) center.style.transition = 'none';
    }
  }, { passive: true });

  stage.addEventListener('touchmove', function (e) {
    if (!isDragging || !mobile || isAnimating) return;
    var dx = e.touches[0].clientX - touchStartX;
    var dy = e.touches[0].clientY - touchStartY;

    if (isHorizontal === null) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      isHorizontal = Math.abs(dx) > Math.abs(dy);
    }
    if (!isHorizontal) return;
    e.preventDefault();
    if (dx === 0) return;

    var center = document.querySelector('#projectsRing .pos--center');
    if (!center) return;
    center.style.transform = 'translateX(' + dx + 'px)';

    var peekIdx = dx < 0 ? ((current + 1) % N) : ((current - 1 + N) % N);
    var candidate = cards[peekIdx];

    if (peekCard && peekCard !== candidate) {
      peekCard.style.cssText = '';
      peekCard = null;
    }
    if (!peekCard) initPeekCard(candidate);

    var w = stage.offsetWidth;
    peekCard.style.transition = 'none';
    peekCard.style.transform  = 'translateX(' + (dx < 0 ? w + dx : -w + dx) + 'px)';
  }, { passive: false });

  stage.addEventListener('touchend', function (e) {
    if (!isDragging) return;
    isDragging = false;
    var dx = e.changedTouches[0].clientX - touchStartX;

    if (!mobile) {
      if (Math.abs(dx) > 40) rotateTo(dx < 0 ? current + 1 : current - 1);
      return;
    }

    var center = document.querySelector('#projectsRing .pos--center');

    if (Math.abs(dx) > 40) {
      isAnimating = true;
      var isNext = dx < 0;
      var newIdx  = isNext ? current + 1 : current - 1;
      var newCard = cards[((newIdx % N) + N) % N];

      if (!peekCard) {
        initPeekCard(newCard);
        newCard.style.transform  = 'translateX(' + (isNext ? '100%' : '-100%') + ')';
        newCard.style.transition = 'none';
        // Force style flush so transition: none takes effect before re-enabling
        void newCard.getBoundingClientRect();
      }

      if (center) {
        center.style.transition = EASE_COMMIT;
        center.style.transform  = 'translateX(' + (isNext ? '-110%' : '110%') + ')';
      }
      newCard.style.transition = EASE_COMMIT;
      newCard.style.transform  = 'translateX(0)';
      peekCard = null;

      setTimeout(function () {
        if (center) center.style.cssText = '';
        newCard.style.cssText = '';
        rotateTo(newIdx);
        isAnimating = false;
      }, 350);

    } else {
      if (center) {
        center.style.transition = EASE_SNAPBACK;
        center.style.transform  = 'translateX(0)';
        setTimeout(function () { if (center) center.style.cssText = ''; }, 300);
      }
      if (peekCard) {
        var snapBack = dx < 0 ? stage.offsetWidth : -stage.offsetWidth;
        peekCard.style.transition = EASE_SNAPBACK;
        peekCard.style.transform  = 'translateX(' + snapBack + 'px)';
        var pc = peekCard;
        peekCard = null;
        setTimeout(function () { pc.style.cssText = ''; }, 300);
      }
    }
  }, { passive: true });

  var projectsSection = document.getElementById('projects');
  var hovered = false;
  projectsSection.addEventListener('mouseenter', function () { hovered = true; });
  projectsSection.addEventListener('mouseleave', function () { hovered = false; });
  document.addEventListener('keydown', function (e) {
    if (!hovered) return;
    if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { e.preventDefault(); rotateTo(current - 1); }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { e.preventDefault(); rotateTo(current + 1); }
  });

  rotateTo(0);
})();
