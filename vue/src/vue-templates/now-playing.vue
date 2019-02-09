
<template>
  <div class="now-playing">
    <div class="cover-wrapper">
      <div class="cover-blur" ref="coverBlurArt" v-bind:style="{ height: coverBlurHeight + 'px', backgroundImage: 'url('+playerState.albumart+')' }"></div>
      <div class="cover" ref="coverArt" id="album-art" v-bind:style="{ height: coverHeight + 'px', backgroundImage: 'url('+playerState.albumart+')' }">
      </div>
      <div class="track-info">
        <span class="track-info-artist">{{playerState.title}} - {{playerState.artist}}</span>
      </div>
      <span class="playhead-position">{{prettyTime}}</span>
      <div class="progress-gutter">
        <div class="progress-bar" ref="progressBar" v-bind:style="{width: seekBarWidth + '%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        /*
         * The component's data.
         */
        data() {
            return {
                apps: [],
                coverHeight: 100,
                coverBlurHeight:100,
                playerState:{},
                currentSeekTime:0,
                isRunning: false,
                time:0,
                timer:null
            };
        },
        computed: {
          prettyTime (){
            //Format with hours if more than x ms
            if(this.time < 3600000){
              return this.moment.utc(this.time).format('mm:ss');
            }else{
              return this.moment.utc(this.time).format('HH:mm:ss');
            }

          },
          seekBarWidth(){
            return (this.time/(this.playerState.duration*1000)) * 100
          }
        },
        /**
         * Prepare the component (Vue 2.x).
         */
        mounted() {
          this.prepareComponent();
        },

        methods: {
            /**
             * Prepare the component.
             */
            prepareComponent() {
              this.handleResize(null);
              window.addEventListener('resize', this.handleResize);
              this.getPlayerStatus();
            },

            handleResize(e){
              this.coverHeight = this.$refs.coverArt.clientWidth;
              this.coverBlurHeight = this.$refs.coverBlurArt.clientWidth;
            },

            getPlayerStatus(){
              this.sockets.subscribe('pushState', (data)=>{
                this.playerState = data;
                if(data.seek){
                  this.currentSeekTime = data.seek;
                  this.stop();
                  this.start();
                  console.log('Got player seek value', data)
                }
              });
              console.log('Calling state on socket');
              this.$socket.emit('getState');
            },
            start(){
              this.isRunning = true
              if (!this.timer) {
                this.time = this.currentSeekTime;
                 this.timer = setInterval( () => {
                   this.time+=500
                 }, 500 )
              }
          },
          stop () {
            this.isRunning = false
            if (!this.timer) {
              clearInterval(this.timer)
              this.timer = null
            }
            this.time = 0
          },
          reset () {
             this.stop()
             this.time = 0
             this.secondes = 0
             this.minutes = 0
          }
        }
    }
</script>
