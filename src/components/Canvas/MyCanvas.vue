<template>
    <div>
        <canvas ref="MyCanvas"></canvas>
        <slot></slot>
    </div>
</template>
<script>

export default {
    data() {
        return {
            //
        }
    },

    provide() {
        return {
            provider: this.provider
        }
    },

    mounted() {
        this.provider.context = this.$refs['MyCanvas'].getContext('2d')

        this.$refs['MyCanvas'].width = this.$refs['MyCanvas'].parentElement.clientWidth
        this.$refs['MyCanvas'].height = this.$refs['MyCanvas'].parentElement.clientHeight
    }
}

</script>