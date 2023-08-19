<template>
    <div class="scroll-container">
        <div class="scroll-container__wrapper" :class="classWrapper" ref="wrapper">
            <div class="scroll-container__inner" :class="classInner" @scroll="eventScroll" ref="inner">
                <div class="scroll-container__content" ref="content">
                    <slot></slot>
                </div>
            </div>
        </div>
        <div
            class="scroll-container__bar-x"
            :class="[classBarX, { 'active': elSize.contentView.w > elSize.wrapper.w && showBar }]"
            ref="barX"
        >
            <div
                class="scroll-container__thumb-x"
                :class="[classThumbX, { 'move': thumbStartMove.type === 'x' }]"
                data-type="x"
                @mousedown.prevent="eventThumbMouseDown"
                @touchstart.prevent="eventThumbTouchStart"
                ref="thumbX"
            ></div>
        </div>
        <div
            class="scroll-container__bar-y"
            :class="[classBarY, { 'active': elSize.contentView.h > elSize.wrapper.h && showBar }]"
            ref="barY"
        >
            <div
                class="scroll-container__thumb-y"
                :class="[classThumbY, { 'move': thumbStartMove.type === 'y' }]"
                data-type="y"
                @mousedown.prevent="eventThumbMouseDown"
                @touchstart.prevent="eventThumbTouchStart"
                ref="thumbY"
            ></div>
        </div>
    </div>
</template>

<script>
import gsap from "gsap";

export default {
    name: "ScrollContainer",
    props: {
        classWrapper : { type: String,  default: '' },
        classInner   : { type: String,  default: '' },
        classBarX    : { type: String,  default: '' },
        classThumbX  : { type: String,  default: '' },
        classBarY    : { type: String,  default: '' },
        classThumbY  : { type: String,  default: '' },
        dynamicSize  : { type: Boolean, default: false },
        showBar      : { type: Boolean, default: true }
    },

    data() {
        return {
            sizeHiddenArea  : 100,
            resizeObserver  : null,
            bindSetOffset   : null,
            systemBar       : { w: 0, h: 0 },
            thumbSize       : { min: 20, x: 0, y: 0 },

            elSize: {
                wrapper       : { w: 0, h: 0 },
                contentView   : { w: 0, h: 0 },
                contentOffset : { w: 0, h: 0 },
            },

            thumbStartMove: {
                type   : '',
                page   : { x: 0, y: 0 },
                scroll : { x: 0, y: 0 }
            }
        }
    },

    methods: {
        eventScroll() {
            this.$emit('scroll')
            this.updateThumbPosition()
        },

        eventThumbMouseDown(e) {
            window.addEventListener('mousemove', this.eventThumbMouseMove)
            window.addEventListener('mouseup',   this.eventThumbMoveEnd)
            this.thumbStart(e.target.dataset.type, e.pageX, e.pageY)
        },

        eventThumbTouchStart(e) {
            window.addEventListener('touchmove', this.eventThumbTouchMove)
            window.addEventListener('touchend',  this.eventThumbMoveEnd)
            this.thumbStart(e.target.dataset.type, e.touches[0].pageX, e.touches[0].pageY)
        },

        eventThumbMouseMove(e) {
            this.thumbMove(e.pageX, e.pageY)
        },

        eventThumbTouchMove(e) {
            this.thumbMove(e.touches[0].pageX, e.touches[0].pageY)
        },

        eventThumbMoveEnd() {
            this.thumbRemoveEventListeners()
            this.thumbEnd()
        },

        thumbRemoveEventListeners() {
            window.removeEventListener('mousemove', this.eventThumbMouseMove)
            window.removeEventListener('mouseup',   this.eventThumbMoveEnd)
            window.removeEventListener('touchmove', this.eventThumbTouchMove)
            window.removeEventListener('touchend',  this.eventThumbMoveEnd)
        },

        thumbStart(type, x, y) {
            if (type !== 'x' && type !== 'y') return
            this.thumbStartMove.type = type
            this.thumbStartMove.page = { x, y }
            this.thumbStartMove.scroll = this.getScroll()
        },

        thumbMove(x, y) {
            const { barX, barY } = this.$refs
            const { contentView } = this.elSize
            const { type, page, scroll } = this.thumbStartMove
            const scrollCurrent = this.getScroll()
            const X = (type === 'x') ? (x - page.x) * (contentView.w / barX.clientWidth)  + scroll.x : scrollCurrent.x
            const Y = (type === 'y') ? (y - page.y) * (contentView.h / barY.clientHeight) + scroll.y : scrollCurrent.y
            this.scrollTo(X, Y, 'auto')
        },

        thumbEnd() {
            this.thumbStartMove.type   = ''
            this.thumbStartMove.page   = { x: 0, y: 0 }
            this.thumbStartMove.scroll = { x: 0, y: 0 }
        },

        getScroll() {
            return {
                x: this.$refs.inner.scrollLeft,
                y: this.$refs.inner.scrollTop
            }
        },

        scrollTo(left, top, behavior = 'smooth') {
            this.$refs.inner.scrollTo({ left, top, behavior })
        },

        scrollBy(left, top, behavior = 'smooth') {
            this.$refs.inner.scrollBy({ left, top, behavior })
        },

        updateElSize() {
            const { wrapper, content } = this.$refs
            const { elSize, systemBar, sizeHiddenArea } = this
            elSize.wrapper.w       = wrapper.clientWidth
            elSize.wrapper.h       = wrapper.clientHeight
            elSize.contentOffset.w = content.clientWidth
            elSize.contentOffset.h = content.clientHeight
            elSize.contentView.w   = content.clientWidth  - sizeHiddenArea + systemBar.w
            elSize.contentView.h   = content.clientHeight - sizeHiddenArea + systemBar.h
        },

        checkResizingElements() {
            const { wrapper, content } = this.$refs
            const { elSize } = this
            return wrapper.clientWidth  !== elSize.wrapper.w
                || wrapper.clientHeight !== elSize.wrapper.h
                || content.clientWidth  !== elSize.contentOffset.w
                || content.clientHeight !== elSize.contentOffset.h
        },

        setOffsetContent() {
            const { inner, content } = this.$refs
            const { systemBar, sizeHiddenArea } = this
            systemBar.w = inner.offsetWidth  - inner.clientWidth
            systemBar.h = inner.offsetHeight - inner.clientHeight
            content.style.paddingRight  = `${ sizeHiddenArea - systemBar.w }px`
            content.style.paddingBottom = `${ sizeHiddenArea - systemBar.h }px`
        },

        setOffset() {
            if (!this.checkResizingElements()) return
            this.updateElSize()
            this.updateThumbSize()
            this.updateThumbPosition()
        },

        updateThumbPosition() {
            const { wrapper, barY, barX, thumbX, thumbY } = this.$refs
            const { elSize, thumbSize } = this
            const scroll = this.getScroll()
            const translateX = (barX.clientWidth  - thumbSize.x) * (scroll.x / (elSize.contentView.w - wrapper.clientWidth))
            const translateY = (barY.clientHeight - thumbSize.y) * (scroll.y / (elSize.contentView.h - wrapper.clientHeight))
            thumbX.style.transform = `translateX(${ translateX }px)`
            thumbY.style.transform = `translateY(${ translateY }px)`
        },

        updateThumbSize() {
            const { barY, barX, thumbX, thumbY } = this.$refs
            const { thumbSize, elSize } = this
            thumbSize.x = Math.max(elSize.wrapper.w / elSize.contentView.w * barX.clientWidth,  thumbSize.min)
            thumbSize.y = Math.max(elSize.wrapper.h / elSize.contentView.h * barY.clientHeight, thumbSize.min)
            thumbX.style.width  = `${ thumbSize.x }px`
            thumbY.style.height = `${ thumbSize.y }px`
        }
    },

    mounted() {
        if (this.showBar) {
            if (this.dynamicSize) {
                if ('ResizeObserver' in window) {
                    this.resizeObserver = new ResizeObserver(this.setOffset)
                    this.resizeObserver.observe(this.$refs.wrapper)
                    this.resizeObserver.observe(this.$refs.content)
                } else {
                    this.bindSetOffset = this.setOffset.bind(this)
                    gsap.ticker.add(this.bindSetOffset)
                }
            } else {
                window.addEventListener('resize', this.setOffset)
            }
        }

        this.setOffsetContent()
        this.setOffset()
        window.addEventListener('resize', this.setOffsetContent)
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.setOffset)
        window.removeEventListener('resize', this.setOffsetContent)
        this.thumbRemoveEventListeners()
        gsap.ticker.remove(this.bindSetOffset)

        if (this.resizeObserver !== null) {
            this.resizeObserver.disconnect()
            this.resizeObserver = null
        }
    }
}
</script>

<style lang="scss">
.scroll-container {
    $sizeHiddenArea: 100px;

    position: relative;
    width: 100%;
    height: 100%;

    &__wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    &__inner {
        display: grid;
        width: calc(100% + #{ $sizeHiddenArea });
        height: calc(100% + #{ $sizeHiddenArea });
        margin-right: -$sizeHiddenArea;
        margin-bottom: -$sizeHiddenArea;
        overflow: scroll;
    }

    &__content {
        //
    }

    &__bar-x {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 14px;

        &:not(.active) {
            height: 0;
        }
    }

    &__bar-y {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 14px;

        &:not(.active) {
            width: 0;
        }
    }

    &__thumb-x,
    &__thumb-y {
        position: relative;
        width: 100%;
        height: 100%;
        cursor: pointer;
        transition-property: transform;
        transition-timing-function: ease-out;
        transition-duration: .1s;

        &:before {
            content: "";
            display: block;
            position: absolute;
            background-color: rgba(#fff, 0.7);
            border-radius: 8px;
            transition-property: background-color, width, height;
            transition-timing-function: ease-out;
            transition-duration: .2s;
        }
    }

    &__thumb-x:before {
        left: 3px;
        right: 3px;
        bottom: 3px;
        height: calc(100% - 10px);
    }

    &__thumb-y:before {
        top: 3px;
        right: 3px;
        bottom: 3px;
        width: calc(100% - 10px);
    }

    &__thumb-x.move:before,
    &__thumb-y.move:before {
        background-color: #fff;
    }

    @media (hover: hover) {
        &__bar-x:hover &__thumb-x:before,
        &__thumb-x:active:before {
            background-color: #fff;
            height: calc(100% - 6px);
        }

        &__bar-y:hover &__thumb-y:before,
        &__thumb-y:active:before {
            background-color: #fff;
            width: calc(100% - 6px);
        }
    }
}
</style>