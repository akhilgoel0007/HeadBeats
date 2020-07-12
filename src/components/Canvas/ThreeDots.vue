<template>
    <div class="Container">
        <div class="Circle-Container">
            <div class="Circle"></div>
        </div>
        <div class="Circle-Container">
            <div class="Circle"></div>
        </div>
        <div class="Circle-Container">
            <div class="Circle"></div>
        </div>
        <div class="Circle-Container">
            <div class="Circle"></div>
        </div>
    </div>
</template>

<style scoped>
.Container {
    position: absolute;
    top: 50%;
    left: 50%;
}

.Circle-Container {
    width: 400px;
    height: 25vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.Circle-Container:after {
    content: '';
    width: 20px;
    height: 5px;
    position: absolute;
    background: black;
    border-radius: 50%;
    bottom: 0;
    left: 50%;
    opacity: 0.4;
    animation: Shadows 2s linear infinite;
}

.Circle-Container:nth-child(2):after {
    animation-delay: -0.3s
}

.Circle-Container:nth-child(3):after {
    animation-delay: -0.6s
}

.Circle {
    width: 15px;
    height: 15px;
    background: skyblue;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    animation: Anim 2s linear infinite;
}

.Circle-Container:nth-child(2) .Circle {
    animation-delay: -0.3s
}

.Circle-Container:nth-child(3) .Circle {
    animation-delay: -0.6s;
}

@keyframes Anim {
    0% {
        transform-origin: 400% 50%;
        transform: rotate(0);
    }

    50% {
        transform-origin: 400% 50%;
        transform: rotate(360deg);
    }

    50.1% {
        transform-origin: -300% 50%;
        transform: rotate(0deg);
    } 

    100% {
        transform-origin: -300% 50%;
        transform: rotate(-360deg);
    }
}

@keyframes Shadows {
    0% {

    }

    12.5% {
        transform: translate(50px) scale(0.6);
    }

    25% {
        transform: translate(110px);
    }

    37.5% {
        transform: translate(50px) scale(1.4);
    }

    50% {
        transform: translate(0px);
    }

    67.5% {
        transform: translate(-50px) scale(0.6);
    }

    75% {
        transform: translate(-110px);
    }

    87.5% {
        transform: translate(-50px) scale(1.4);
    }

    100% {
        transform: translate(0px);
    }
}
</style>