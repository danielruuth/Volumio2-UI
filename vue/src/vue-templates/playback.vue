
<template>
  <div class="playback">
    Playback view

    <table class="queue">
      <tr v-for="track in queueState">
        <td><img v-bind:src="track.albumart" class="albumart" />
        <td>{{ track.name }}</td>
        <td>{{ track.artist}}</td>
        <td>{{ track.album }}</td>
        <td>{{ track.duration }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
    export default {
        /*
         * The component's data.
         */
        data() {
            return {
              queueState: []
            };
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
              this.getCurrentQueue()
            },

            getCurrentQueue(){
              this.sockets.subscribe('pushQueue', (data)=>{
                this.queueState = data;
                console.log('Got player queue value', data)
              });
              this.$socket.emit('getQueue');
            }


        }
    }
</script>
