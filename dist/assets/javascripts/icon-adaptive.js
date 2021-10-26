// Icon | Adaptive
// -------------------------
var morphTween1 = KUTE.fromTo('.adaptive-icon__rounded-square',
	{ path: '.adaptive-icon__rounded-square' },
	{ path: '.adaptive-icon__squircle' },
	{
		easing: 'easingCubicInOut',
		yoyo: true,
		duration: 1500,
		morphPrecision: 4,
		reverseSecondPath: true
	}
);
var morphTween2 = KUTE.fromTo('.adaptive-icon__rounded-square',
	{ path: '.adaptive-icon__squircle' },
	{ path: '.adaptive-icon__circle' },
	{
		easing: 'easingCubicInOut',
		yoyo: true,
		delay: 500,
		duration: 1500,
		morphPrecision: 4,
		reverseSecondPath: true
	}
);
var morphTween3 = KUTE.fromTo('.adaptive-icon__rounded-square',
	{ path: '.adaptive-icon__circle' },
	{ path: '.adaptive-icon__squircle' },
	{
		easing: 'easingCubicInOut',
		yoyo: true,
		delay: 500,
		duration: 1500,
		morphPrecision: 4,
		reverseSecondPath: true
	}
);
var morphTween4 = KUTE.fromTo('.adaptive-icon__rounded-square',
	{ path: '.adaptive-icon__squircle' },
	{ path: '.adaptive-icon__rounded-square' },
	{
		easing: 'easingCubicInOut',
		yoyo: true,
		delay: 500,
		duration: 1500,
		morphPrecision: 4,
		reverseSecondPath: true
	}
);
morphTween1.chain(morphTween2);
morphTween2.chain(morphTween3);
morphTween3.chain(morphTween4);
morphTween4.chain(morphTween1);
morphTween1.start();
morphTween1._dl = 500;