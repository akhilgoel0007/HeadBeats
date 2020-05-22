<template>
    <canvas ref="Follower-Canvas"></canvas>
</template>

<script>

function RandomIntFromRange(Max, Min) {
	return Math.floor(Math.random() * (Max - Min + 1) + Min);
}

function RandomColor(Colors) {
	return Colors[Math.floor(Math.random() * Colors.length)];
}

function Particle(x, y, Radius, Color, Context, Mouse) {
	this.x = x;
	this.y = y;
	this.Radius = Radius;
	this.Color = Color;
	this.Radians = Math.random() * Math.PI * 2;
	this.Velocity = 0.05;
	this.DistanceFromCenter = RandomIntFromRange(100, 200);
	this.LastMouse = {
		x: x,
		y: y
	}

	this.Update = function() {
		const LastPoint = {
			x: this.x,
			y: this.y
		}
		this.Radians += this.Velocity;
		this.LastMouse.x += (Mouse.x - this.LastMouse.x)* 0.05;
		this.LastMouse.y += (Mouse.y - this.LastMouse.y)* 0.05;		

		this.x = this.LastMouse.x + Math.cos(this.Radians)*this.DistanceFromCenter;
		this.y = this.LastMouse.y + Math.sin(this.Radians)*this.DistanceFromCenter;
		this.DrawParticle(LastPoint);
	}

	this.DrawParticle = function(LastPoint) {
		Context.beginPath();
		Context.strokeStyle = this.Color;
		Context.lineWidth = this.Radius;
		Context.moveTo(LastPoint.x, LastPoint.y);
		Context.lineTo(this.x, this.y);
		Context.stroke();
		Context.closePath();
	}
}

export default {
    data() {
        return {
            context: null,

        }
    },

    mounted() {
        var Context = this.$refs['Follower-Canvas'].getContext('2d');

        this.$refs['Follower-Canvas'].width = this.$refs['Follower-Canvas'].parentElement.clientWidth;
        this.$refs['Follower-Canvas'].height = this.$refs['Follower-Canvas'].parentElement.clientHeight;

        var innerHeight = this.$refs['Follower-Canvas'].height;
        var innerWidth = this.$refs['Follower-Canvas'].width;
        var canvas = this.$refs['Follower-Canvas'];
        
        var Colors = [
            '#3D59AB',
            '#6666FF',
            '#003399',
            '#2E37FE',
            '#236B8E',
            '#45b6fe',
            '#6ac5fe',
            '#8fd3fe',
            '#b5e2ff',
            '#daf0ff'
        ]

        const Mouse = {
            x: innerWidth/2,
            y: innerHeight/2
        }

        this.$refs['Follower-Canvas'].addEventListener('mousemove', (event) => {
            Mouse.x = event.clientX;
            Mouse.y = event.clientY;
        })

        this.$refs['Follower-Canvas'].addEventListener('resize', () => {
            this.$refs['Follower-Canvas'].width = this.$refs['Follower-Canvas'].parentElement.clientWidth;
            this.$refs['Follower-Canvas'].height = this.$refs['Follower-Canvas'].parentElement.clientHeight;

            init();
        })

        let Particles;

        function init() {
            Particles = [];

            for(let i=0; i<150; ++i) {
                const Radius = (Math.random()*2) + 1;
                Particles.push(new Particle(canvas.width/2, canvas.height/2, Radius, RandomColor(Colors), Context, Mouse))
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            Context.fillStyle = 'rgba(255, 255, 255, 0.05)'
            Context.fillRect(0, 0, canvas.width, canvas.height);

            Particles.forEach(particle => {
                particle.Update();
            })
        }

        init();
        animate();
    }
}
</script>
