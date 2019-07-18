/*




			



							++==	+==	   ==+	===+  ++===+    |
							||__	|  \  /	 |	 __|  ||   |  __+__		 
							||		|	\/	 |	|  |  ||   |	|
							++==	|		 |	+==+  ||   |	|___

									Created at @2019/7/18
										Digital-clock









*/
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

function Clock() {
	this.update = () => {
		this.draw();


	};
	this.draw = () => {


		c.beginPath();
		c.arc(this.x, this.y, this.ceneterRadius, 0, Math.PI * 2, false);
		c.fillStyle = this.clkcen;
		c.fill();
		c.closePath();
	}
}
var tick = 0;
function Segment(x, y, mspan) {
	this.counter = ++tick;
	this.x = x;
	this.y = y;
	this.max_span = mspan;
	this.critical = 0.2 * this.max_span;
	this.thickness = this.critical / 2;
	this.span = this.max_span * 0.8;
	this.time;
	this.sec;
	this.min;
	this.hr;

	//Segments
	this.a;
	this.b;
	this.c;
	this.d;
	this.e;
	this.f;
	this.g;



	this.update = () => {
		this.time = new Date();
		this.sec = this.time.getSeconds() < 10 ? '0' + this.time.getSeconds() : this.time.getSeconds() + '';
		this.min = this.time.getMinutes() < 10 ? '0' + this.time.getMinutes() : this.time.getMinutes() + '';
		this.hr = (this.time.getHours() > 12) ? (this.time.getHours() - 12) : this.time.getHours() + 1;
		this.hr = this.hr < 10 ? '0' + this.hr : this.hr + '';
		var bcd, a, b, c, d;
		switch (this.counter) {
			case 5:
				bcd = this.toBCD(this.sec[0]);
				break;
			case 6:
				bcd = this.toBCD(this.sec[1]);
				break;
			case 3:
				bcd = this.toBCD(this.min[0]);
				break;
			case 4:
				bcd = this.toBCD(this.min[1]);
				break;
			case 1:
				bcd = this.toBCD(this.hr[0]);
				break;
			case 2:
				bcd = this.toBCD(this.hr[1]);
				break;
		}
		a = bcd[0];
		b = bcd[1];
		c = bcd[2];
		d = bcd[3];
		//DECODING
		this.a = this.isON(a || c || b && d || !b && !d);
		this.b = this.isON(!b || !c && !d || c && d);
		this.c = this.isON(!c || d || b);
		this.d = this.isON(!b && !d || !b && c || b && !c && d || c && !d || a);
		this.e = this.isON(!b && !d || c && !d);
		this.f = this.isON(!c && !d || b && !c || b && !d || a);
		this.g = this.isON(!b && c || b && !c || a || b && !d);

		this.draw();

	}
	this.isON = (exp) => {
		return exp == true || exp == 1 ? 'rgb(0, 255, 0)' : 'rgb(10,10,10)';
	}
	this.draw = () => {
		this.x = x;
		this.y = y;
		//----a----
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.critical, this.y - this.thickness, this.x + this.span, this.y - this.thickness, this.x + this.max_span, this.y);
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.critical, this.y + this.thickness, this.x + this.span, this.y + this.thickness, this.x + this.max_span, this.y);
		c.fillStyle = this.a;
		c.fill();
		c.closePath();

		//----b---
		this.x += this.max_span;
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x - this.thickness, this.y + this.critical, this.x - this.thickness, this.y + this.span, this.x, this.y + this.max_span);
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.thickness, this.y + this.critical, this.x + this.thickness, this.y + this.span, this.x, this.y + this.max_span);
		c.fillStyle = this.b;
		c.fill();
		c.closePath();

		//----c----
		this.y += this.max_span;
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x - this.thickness, this.y + this.critical, this.x - this.thickness, this.y + this.span, this.x, this.y + this.max_span);
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.thickness, this.y + this.critical, this.x + this.thickness, this.y + this.span, this.x, this.y + this.max_span);
		c.fillStyle = this.c;
		c.fill();
		c.closePath();

		//----d----
		this.y += this.max_span;
		this.x -= this.max_span;
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.critical, this.y - this.thickness, this.x + this.span, this.y - this.thickness, this.x + this.max_span, this.y);
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.critical, this.y + this.thickness, this.x + this.span, this.y + this.thickness, this.x + this.max_span, this.y);
		c.fillStyle = this.d;
		c.fill();
		c.closePath();

		//----e----
		this.y -= this.max_span;
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x - this.thickness, this.y + this.critical, this.x - this.thickness, this.y + this.span, this.x, this.y + this.max_span);
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.thickness, this.y + this.critical, this.x + this.thickness, this.y + this.span, this.x, this.y + this.max_span);
		c.fillStyle = this.e;
		c.fill();
		c.closePath();

		//----f----
		this.y -= this.max_span;
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x - this.thickness, this.y + this.critical, this.x - this.thickness, this.y + this.span, this.x, this.y + this.max_span);
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.thickness, this.y + this.critical, this.x + this.thickness, this.y + this.span, this.x, this.y + this.max_span);
		c.fillStyle = this.f;
		c.fill();
		c.closePath();

		//----g----
		this.y += this.max_span;
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.critical, this.y - this.thickness, this.x + this.span, this.y - this.thickness, this.x + this.max_span, this.y);
		c.moveTo(this.x, this.y);
		c.bezierCurveTo(this.x + this.critical, this.y + this.thickness, this.x + this.span, this.y + this.thickness, this.x + this.max_span, this.y);
		c.fillStyle = this.g;
		c.fill();
		c.closePath();

		if (this.counter % 2 == 0 && this.counter != 6) {
			c.beginPath();
			c.fillStyle = 'rgb(0,128,0)';
			c.arc(this.x + this.span * 2, this.y - this.span * 0.25, this.thickness, 0, Math.PI * 2, false);
			c.fill();
			c.arc(this.x + this.span * 2, this.y + this.span * 0.25, this.thickness, 0, Math.PI * 2, false);
			c.fill();

			c.closePath();

		}

	};
	this.toBCD = (sd) => {
		var input = [];
		for (var i = 0; i < 4; i++) {
			input.push(sd % 2);
			sd = Math.floor(sd / 2);
		}
		return input.reverse();
	};


}
var segments;

function init() {
	const x = 210;
	const y = 180;
	const max_span = 50;
	const dig = max_span * 1.5;
	segments = [];
	segments.push(new Segment(x, y, max_span));//HourMSB
	segments.push(new Segment(x + dig, y, max_span));//HourLSB
	segments.push(new Segment(x + 2.5 * dig, y, max_span));//MinMSB
	segments.push(new Segment(x + 3.5 * dig, y, max_span));//MinLSB
	segments.push(new Segment(x + 5 * dig, y, max_span));//SecMSB
	segments.push(new Segment(x + 6 * dig, y, max_span));//SecLSB

}



function animate() {
	//requestAnimationFrame(animate);
	//c.fillStyle='rgba(0,0,0,0.009)';
	c.clearRect(0, 0, innerWidth, innerHeight);
	segments.forEach(e => {
		e.update();
	});
	setTimeout(animate, 1000);
}
init();
animate();