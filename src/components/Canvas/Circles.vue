<template>
    <canvas ref="Circle-Canvas"></canvas>
</template>

<script>

function Circle(x, y, dx, dy, radius, c, colorArray, mouse) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.MinRadius = radius;
	this.CircleColor = colorArray[Math.floor(Math.random()*colorArray.length)];

	this.DrawCircle = function() {
        c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.fillStyle = this.CircleColor;
		c.fill();
	}

	this.Update = function() {
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			this.radius += 1;
		} else if(this.radius > this.MinRadius) {
			this.radius -= 1; 
		}
		this.DrawCircle();
	}
}



function animate(CircleArray, c, Width, Height) {
	requestAnimationFrame(() => {
        animate(CircleArray, c, Width, Height)
    });
	c.clearRect(0, 0, Width, Height);

	for(var i=0; i < CircleArray.length; ++i) {
		CircleArray[i].Update();
	}
}

export default {
    data() {
        return {
            context: null,

        }
    },

    mounted() {
        this.context = this.$refs['Circle-Canvas'].getContext('2d')

        this.$refs['Circle-Canvas'].width = this.$refs['Circle-Canvas'].parentElement.clientWidth
        this.$refs['Circle-Canvas'].height = this.$refs['Circle-Canvas'].parentElement.clientHeight

        var innerHeight = this.$refs['Circle-Canvas'].height;
        var innerWidth = this.$refs['Circle-Canvas'].width;

        var mouse = {
            x: undefined,
            y: undefined
        }
        
        var colorArray = [
            '#ffaa33',
            '#99ffaaa',
            '#00ff00',
            '#4411aa',
            '#ff1100'
        ]

        this.$refs['Circle-Canvas'].addEventListener('mousemove', function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        })

        var CircleArray = [];

        for(var i=0; i<100; ++i) {
            var radius = Math.random() * 3 + 1;
            var x = Math.random() * (innerWidth - radius*2) + radius;
            var y = Math.random() * (innerHeight - radius*2) + radius;
            var dx = (Math.random() - 0.5) * 8;
            var dy = (Math.random() - 0.5) * 8;

            CircleArray.push(new Circle(x, y, dx, dy, radius, this.context, colorArray, mouse));
        }

        animate(CircleArray, this.context, innerWidth, innerHeight);
    }
}
</script>>