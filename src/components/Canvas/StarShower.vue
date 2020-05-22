<template>
    <canvas ref="Star-Canvas"></canvas>
</template>

<script>

function RandomIntFromRange(Max, Min) {
	return Math.floor(Math.random() * (Max - Min + 1) + Min);
}

function Star(x, y, Radius, Color) {
	this.x = x;
	this.y = y;
	this.Radius = Radius;
	this.Color = Color;
	this.Gravity = 1;
	this.Friction = 0.8;
	this.Velocity = {
		x: RandomIntFromRange(-4, 4),
		y: 3
	}
}

Star.prototype.DrawStar = function(Context) {
	Context.save();
	Context.beginPath();
	Context.arc(this.x, this.y, this.Radius, 0, Math.PI*2, false);
	Context.shadowColor = '#E3EAEF';
	Context.shadowBlur = 20;
	Context.fillStyle = this.Color;
	Context.fill();
	Context.closePath();
	Context.restore();
}


Star.prototype.Update = function(Context, canvas, GroundHeight, MiniStars) {
	this.DrawStar(Context);

	if(this.y + this.Radius + this.Velocity.y> canvas.height - GroundHeight) {
		this.Velocity.y = - this.Velocity.y*this.Friction;
		this.Shatter(MiniStars);
	} else {
		this.Velocity.y += this.Gravity;
	}

	if(this.x + this.Radius + this.Velocity.x > canvas.width || this.x - this.Radius <= 0) {
		this.Velocity.x = -this.Velocity.x;
		this.Shatter(MiniStars);
	}

	this.y += this.Velocity.y;
	this.x += this.Velocity.x;
}

Star.prototype.Shatter = function(MiniStars) {
	this.Radius -= 3;
	for(let i=0; i<8; ++i) {
		MiniStars.push(new MiniStar(this.x, this.y, 2))
	}
}

function MiniStar(x, y, Radius, Color) {
	Star.call(this, x, y, Radius, Color)
	this.Gravity = 0.2;
	this.ttl = 100;
	this.Opacity = 1;
	this.Friction = 0.8;
	this.Velocity = {
		x: RandomIntFromRange(-5, 5),
		y: RandomIntFromRange(-15, 15)
	}
}

MiniStar.prototype.DrawStar = function(Context) {
	Context.save()
	Context.beginPath();
	Context.arc(this.x, this.y, this.Radius, 0, Math.PI*2, false);
	Context.fillStyle = `rgba(227, 234, 239, ${this.Opacity})`;
	Context.shadowColor = '#E3EAEF';
	Context.shadowBlur = 20;
	Context.fill();
	Context.closePath();
	Context.restore();
}


MiniStar.prototype.Update = function(Context, canvas, GroundHeight) {
	this.DrawStar(Context);

	if(this.y + this.Radius + this.Velocity.y> canvas.height - GroundHeight) {
		this.Velocity.y = - this.Velocity.y*this.Friction;
	} else {
		this.Velocity.y += this.Gravity;
	}
	this.x += this.Velocity.x;
	this.y += this.Velocity.y;
	this.ttl -= 1;
	this.Opacity -= 1/this.ttl;
}

function CreateMoutainRange(mountainAmount, height, color, canvas, Context) {
	for(let i=0; i<mountainAmount; ++i) {
		const MountainWidth = canvas.width / mountainAmount
		Context.beginPath();
		Context.moveTo(i*MountainWidth, canvas.height);
		Context.lineTo(i*MountainWidth + MountainWidth + 325, canvas.height);
		Context.lineTo(i*MountainWidth + MountainWidth/2, canvas.height-height);
		Context.lineTo(i*MountainWidth - 325, canvas.height);
		Context.fillStyle = color;
		Context.fill();
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
        var Context = this.$refs['Star-Canvas'].getContext('2d');

        this.$refs['Star-Canvas'].width = this.$refs['Star-Canvas'].parentElement.clientWidth;
        this.$refs['Star-Canvas'].height = this.$refs['Star-Canvas'].parentElement.clientHeight;

        var innerHeight = this.$refs['Star-Canvas'].height;
        var innerWidth = this.$refs['Star-Canvas'].width;
        var canvas = this.$refs['Star-Canvas'];

        window.addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;

            init();
        })

        const BackGroundGradient = Context.createLinearGradient(0, 0, 0, canvas.height);
        BackGroundGradient.addColorStop(0, '#171e26')
        BackGroundGradient.addColorStop(1, '#3f586b')

        let Stars;
        let MiniStars;
        let BackgroundStars;
        let Ticker = 0;
        let GroundHeight = 100;
        let RandomSpawnRate = 75;
        
        function init() {
            Stars = [];
            MiniStars = [];
            BackgroundStars = [];

            for(let i=0; i<1; ++i) {
                Stars.push(new Star(canvas.width/2, 30, 12, '#E3EAEF'));
            }

            for(let i=0; i<150; ++i) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;

                const Radius = Math.random() * 3;

                BackgroundStars.push(new Star(x, y, Radius, 'white'));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            Context.fillStyle = BackGroundGradient;
            Context.fillRect(0, 0,canvas.width, canvas.height);

            BackgroundStars.forEach(BackgroundStar => {
                BackgroundStar.DrawStar(Context);
            })

            CreateMoutainRange(1, canvas.height-50, '#384551', canvas, Context);
            CreateMoutainRange(2, canvas.height-100, '#283843', canvas, Context);
            CreateMoutainRange(3, canvas.height-300, '#26333E', canvas, Context);

            Context.fillStyle = "#182028"
            Context.fillRect(0, canvas.height - GroundHeight, canvas.width, GroundHeight);

            Stars.forEach((Indivisualstar, index) => {
                Indivisualstar.Update(Context, canvas, GroundHeight, MiniStars);
                if(Indivisualstar.Radius == 0) {
                    Stars.splice(index, 1);
                }
            });

            MiniStars.forEach((IndivisualMinistar, index) => {
                IndivisualMinistar.Update(Context, canvas, GroundHeight);
                if(IndivisualMinistar.ttl == 0) {
                    MiniStars.splice(index, 1);
                }
            })

            Ticker++;

            if(Ticker%RandomSpawnRate == 0) {
                const Radius = 12
                const x = Math.max(Radius, Math.random()*canvas.width - Radius);
                Stars.push(new Star(x, -100, 12, 'white'));
                RandomSpawnRate = RandomIntFromRange(75, 200);
            }
        }

        init();
        animate();

    }
}

</script>