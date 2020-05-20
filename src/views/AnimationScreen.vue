<template>
    <div class="Loader-Container">
        <div class="Loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AnimationScreen',
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
}

.Loader-Container {
    display: flex;
    justify-content: center;
    margin: auto;
    align-items: center;
    min-height: 70vh;
    width: 1000px;
    /* background: #9c27b0; */
}

.Loader {
    /* background-color: red; */
    position: relative;
    width: 410px;
    height: 410px;
    transform-style: preserve-3d;
    transform: perspective(500px) rotateX(60deg);
}

.Loader span {
    position: absolute;
    display: block;
    border: 5px solid #9c27b0;
    box-shadow: 0 5px 0 rgb(107, 5, 107),
                inset 0 5px 0 rgb(255, 190, 252);
    box-sizing: border-box;
    border-radius: 50%;
    animation: Animate 3s ease-in-out infinite;
}

@keyframes Animate{
    0%, 100% {
        transform: translateZ(-100px);
    }

    50% {
        transform: translateZ(100px);
    }
}

.Loader span:nth-child(1) {
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    animation-delay: -0.1s;
}

.Loader span:nth-child(2) {
    top: 10px;
    left: 10px;
    bottom: 10px;
    right: 10px;
    animation-delay: -0.2s;
}

.Loader span:nth-child(3) {
    top: 20px;
    left: 20px;
    bottom: 20px;
    right: 20px;
    animation-delay: -0.3s;
}

.Loader span:nth-child(4) {
    top: 30px;
    left: 30px;
    bottom: 30px;
    right: 30px;
    animation-delay: -0.4s;
}

.Loader span:nth-child(5) {
    top: 40px;
    left: 40px;
    bottom: 40px;
    right: 40px;
    animation-delay: -0.5s;
}

.Loader span:nth-child(6) {
    top: 50px;
    left: 50px;
    bottom: 50px;
    right: 50px;
    animation-delay: -0.6s;
}

.Loader span:nth-child(7) {
    top: 60px;
    left: 60px;
    bottom: 60px;
    right: 60px;
    animation-delay: -0.7s;
}
.Loader span:nth-child(8) {
    top: 70px;
    left: 70px;
    bottom: 70px;
    right: 70px;
    animation-delay: -0.8s;
}

.Loader span:nth-child(9) {
    top: 80px;
    left: 80px;
    bottom: 80px;
    right: 80px;
    animation-delay: -0.9s;
}

.Loader span:nth-child(10) {
    top: 90px;
    left: 90px;
    bottom: 90px;
    right: 90px;
    animation-delay: -1s;
}

.Loader span:nth-child(11) {
    top: 100px;
    left: 100px;
    bottom: 100px;
    right: 100px;
    animation-delay: -1.1s;
}

.Loader span:nth-child(12) {
    top: 110px;
    left: 110px;
    bottom: 110px;
    right: 110px;
    animation-delay: -1.2s;
}

.Loader span:nth-child(13) {
    top: 120px;
    left: 120px;
    bottom: 120px;
    right: 120px;
    animation-delay: -1.3s;
}

.Loader span:nth-child(14) {
    top: 130px;
    left: 130px;
    bottom: 130px;
    right: 130px;
    animation-delay: -1.4s;
}

.Loader span:nth-child(15) {
    top: 140px;
    left: 140px;
    bottom: 140px;
    right: 140px;
    animation-delay: -1.5s;
}

.Loader span:nth-child(16) {
    top: 150px;
    left: 150px;
    bottom: 150px;
    right: 150px;
    animation-delay: -1.6s;
}

.Loader span:nth-child(17) {
    top: 160px;
    left: 160px;
    bottom: 160px;
    right: 160px;
    animation-delay: -1.7s;
}

.Loader span:nth-child(18) {
    top: 170px;
    left: 170px;
    bottom: 170px;
    right: 170px;
    animation-delay: -1.8s;
}

.Loader span:nth-child(19) {
    top: 180px;
    left: 180px;
    bottom: 180px;
    right: 180px;
    animation-delay: -1.9s;
}

.Loader span:nth-child(20) {
    top: 190px;
    left: 190px;
    bottom: 190px;
    right: 190px;
    animation-delay: -2s;
}

.Loader span:nth-child(21) {
    top: 200px;
    left: 200px;
    bottom: 200px;
    right: 200px;
    animation-delay: -2.1s;
}
</style>

