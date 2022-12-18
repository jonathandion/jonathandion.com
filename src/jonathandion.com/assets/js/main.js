(function(){
	// dependencies
	var $ = require('jquery');
	window.$ = $;
	var Promise = require('es6-promise').Promise;
	var smoothScroll = require('smoothscroll');
	var Vivus = require('vivus');
	var ParallaxScroll = require('./vendor/parallax.js');
	var utils = require('./utils.js');
	var ScrollReveal = require('scrollreveal');
	require('material-design-lite');
	require('whatwg-fetch');
	require('slick-carousel');

	var Website = function() {
		var triggerBtn = document.querySelector('.hamburger');
		var links = document.querySelectorAll('.overlay li a');
		var scrollLinks = document.querySelectorAll('[data-scroll]');
		var form = document.querySelector('.js-form');
		var body = document.querySelector( 'body' );
		var html = document.querySelector( 'html' );

		function toggleOverlay() {
			html.classList.add('show')
			body.classList.toggle('overlay-is-open');
			triggerBtn.classList.toggle('is-active')
		}

		function heroParralax() {
			var title = document.querySelector('.s-hero h2');
			var bg = document.querySelectorAll('.s-hero .bg')
			var title = document.querySelector('.s-hero h2');

			function scrollEffects() {
				var scrolled = window.scrollY;
				title.style.opacity = 1-scrolled/800;
				title.style.transform = 'translate(0px,' + scrolled/5 + '%)';
				bg[0].style.transform = 'translate(0px,' + -scrolled/20 + '%)';
				bg[1].style.transform = 'translate(0px,' + -scrolled/60 + '%)';
			}

			window.addEventListener('scroll', scrollEffects);
			requestAnimationFrame(scrollEffects);
		}

		function initCarousel() {
			var $carousel = $('.js-carousel');

			$carousel.on('init', function(){
				$('.js-number-of-slides').text($(this).find('.slick-slide').length)
			});

			 $carousel.slick({
				infinite: true,
				fade: true,
				appendArrows: '.js-carousel-control'
			})
			.on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$('.js-current-slide').text(nextSlide + 1)
			});
		}

		function initScrollReveal() {
			var sr = ScrollReveal();
			sr.reveal('.box--front',{
					origin : 'left',
					duration: 1000,
					distance    : '100px',
					opacity : 1,
					easing : 'ease',
					viewFactor : 0.8,
					afterReveal : function(el) {
						el.querySelector('.border').style.opacity = '1';
						el.querySelector('.border').style.transform = 'translate(-20px, 20px)';
					}
			}).reveal('.box--back',{
				duration: 1000,
				origin : 'left',
				easing : 'ease',
				distance  : '100px',
				opacity : 1,
				viewFactor : 0.80,
				afterReveal : function(el) {
					el.querySelector('.border').style.opacity = "1";
					el.querySelector('.border').style.transform = "translate(-20px, 20px)";
				}
			}).reveal('.s h2',{
				duration: 800,
				origin : 'bottom',
				easing : 'ease',
				scale    : 1,
				reset : false,
				distance  : '50px',
				viewFactor : 0.50,
				afterReveal : function(el) {
					el.classList.add('active' );
				},
				afterReset  : function(el) {
					el.classList.remove('active' );
				}
			})
		}


		function intro() {
			var introBtn = document.querySelector('.js-intro-enter');
			var btnStart = document.querySelector('.js-start');
			var inputUserName = document.getElementById('sample2');
			var userNameCookie = utils.getCookie('username');

			function populateUserElements(name){
				var placeHolder = document.querySelector('.js-placeholder-username');
				var inputName = document.getElementById('name');

				// show username
				placeHolder.textContent = name;

				// populate the MDL form
				inputName.value = name;
				inputName.parentElement.classList.add('is-dirty');
			}


			function skipIntroInput() {
				html.classList.add('show-intro-text');
				html.classList.add('show');
			}

			btnStart.addEventListener('click',function(e){
				e.preventDefault();
				html.classList.add('show')
				smoothScroll(document.getElementById('about'));
			});

			if(userNameCookie) {
				skipIntroInput();
				populateUserElements(userNameCookie);
				return; // quit
			}

			html.classList.add('show-intro-input');

			// scrolltop
			window.onbeforeunload = function(){
				window.scrollTo(0,0);
			}

			setTimeout(function() {
				inputUserName.focus();
			},300);

			inputUserName.addEventListener('keypress', function(e) {
				if (e.keyCode == 13) handleInput();
			});

			introBtn.addEventListener('click', function(e){
				e.preventDefault();
				handleInput();
			});

			function handleInput(){
				var name = inputUserName.value;
				if(name) {
					populateUserElements(name)
					skipIntroInput();
					utils.setCookie('username', name, 365);
				}
			}
		}

		function sendEmailSuccess(name) {
			return "<h3>Thank you" + name + "</h3> <p>Your email has been successfully sent and I appreciate you contact me.</p> <p>We'll be in touch soon.</p>"
		}

		function handleFormSumit( ev ) {
			ev.preventDefault();
			var placeholder = document.createElement('div');
			var formResp = document.querySelector('.form-resp');
			var emailInfo = {
				name: document.getElementById('name').value,
				email: document.getElementById('email').value,
				message: document.getElementById('message').value
			}

			if(formResp) {
				formResp.parentNode.removeChild(formResp);
			}

			fetch('https://lz2uy596h7.execute-api.us-east-1.amazonaws.com/prod/sendEmail', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(emailInfo)
			}).then(function(response) {
				return response.json()
			}).then(function(data) {
					if(data.message) {
						var div = document.createElement('div')
						div.innerHTML = sendEmailSuccess(emailInfo.name)
						placeholder.appendChild(div);
						placeholder.className = 'form-resp success';
						this.insertBefore(placeholder, form.firstChild);
						this.reset()
					} else {
							var p = document.createElement('p')
							var txt = document.createTextNode("Fatal Error. </br> I screwed up!");
							p.appendChild(txt);
							placeholder.className = 'form-resp errors';
							placeholder.appendChild(p);
							this.insertBefore(placeholder, form.firstChild);
						}
				}.bind(this)).catch(function(ex) {
					console.log('parsing failed', ex)
				})
			}

			function handleScroll(ev) {
				ev.preventDefault();
				var target = ev.target.dataset.scroll;
				smoothScroll(document.getElementById(target));
			}

			function handleMDLerrors() {
				var errors = document.querySelectorAll('.mdl-textfield')
				var interval = setInterval(function(){
					utils.forEach(errors, function (index, el) {
						if(el.classList.contains('is-invalid')) {
							el.classList.remove('is-invalid');
							document.querySelectorAll('.mdl-textfield.is-invalid');
							clearInterval(interval);
						}
					});
				});
			}


			function events() {
				utils.forEach(links, function (index, el) {
					el.addEventListener('click', toggleOverlay)
				});

				utils.forEach(scrollLinks, function (index, el) {
					el.addEventListener('click', handleScroll)
				});

				form.addEventListener('submit', handleFormSumit);

				triggerBtn.addEventListener( 'click', toggleOverlay );
			}

			function init() {
				if(utils.isMobile()) {
					document.querySelector('html').classList.add('is-mobile')
				} else {
					heroParralax();
					$(function() {
						ParallaxScroll.init();
					});
				}

				if(utils.isIOSChrome()) {
					document.querySelector('html').classList.add('is-chrome-ios')
				}

				new Vivus('blog', {
					duration: 200,
					file: 'assets/img/blog-wireframe.svg'
				});

				events();
				intro();
				handleMDLerrors();
				initScrollReveal();
				initCarousel();
			}

		return {
			init : init
		}
	}

	Website().init();

})();


