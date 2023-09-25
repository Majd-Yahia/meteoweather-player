<template>
    <div id="audioPlayer"
        class="text-white flex justify-center justify-content-center justify-self-center items-center bg-gray-950 mx-auto rounded-xl h-16 w-96 gap-1">
        <div class="flex justify-center justify-content-center justify-self-center items-center">
            <button @click="rewind" class="transform rotate-180">
                <MdiIcon icon="mdiFastForward" />
            </button>

            <button @click="playPause" class="bg-[#DA2A5B] rounded-xl">
                <MdiIcon :icon="playIcon" />
            </button>
            <button @click="fastForward">
                <MdiIcon icon="mdiFastForward" />
            </button>
        </div>
        <div class="text-sm text-slate-200">
            <p>{{ currentTime }}/{{ totalTime }}</p>
        </div>
        <div ref="waveSurfer" class="w-6/12"></div>
        <button @click="toggleMute">
            <MdiIcon :icon="muteIcon" />
        </button>
    </div>
</template>
  
<script>
import WaveSurfer from 'wavesurfer.js'
import useFormatTime from '~/composables/useFormatTime';

export default {
    props: {
        src: String,
    },
    data() {
        return {
            wavesurfer: null,
            isPlaying: false,
            isMuted: false,
            totalTime: '0:00',
            currentTime: '0:00',
            playIcon: 'mdiPlay',
            muteIcon: 'mdiVolumeHigh'
        };
    },
    mounted() {
        this.wavesurfer = WaveSurfer.create({
            container: this.$refs.waveSurfer,
            waveColor: '#4F4A85',
            progressColor: '#383351',
            height: 30,
        })

        // Load the audio source
        this.wavesurfer.load(this.src);

        // Listen to WaveSurfer events to update isPlaying
        this.wavesurfer.on('play', () => {
            this.isPlaying = true;
        });

        this.wavesurfer.on('pause', () => {
            this.isPlaying = false;
        });

        this.wavesurfer.on('audioprocess', (time) => {
            this.currentTime = useFormatTime(time);
        });

        this.wavesurfer.on('ready', () => {
            const duration = this.wavesurfer.getDuration();
            this.totalTime = useFormatTime(duration);
        });
    },
    watch: {
        // Watcher for the isPlaying property
        isPlaying(newValue) {
            this.wavesurfer.playPause();
            // Do additional tasks if necessary
            this.playIcon = newValue ? 'mdiPause' : 'mdiPlay';
        },
        isMuted(newValue) {
            this.isMuted ? this.wavesurfer.setVolume(0) : this.wavesurfer.setVolume(1)
            this.muteIcon = newValue ? 'mdiVolumeMute' : 'mdiVolumeHigh';
        },
    },
    methods: {
        playPause() {
            this.isPlaying = !this.isPlaying;
        },
        fastForward() {
            let currentTime = this.wavesurfer.getCurrentTime();
            this.wavesurfer.seekTo((currentTime + 5) / this.wavesurfer.getDuration());
        },
        toggleMute() {
            this.isMuted = !this.isMuted;
            if (this.isMuted) {
                this.wavesurfer.setVolume(0);
            } else {
                this.wavesurfer.setVolume(1);
            }
        },
        rewind() {
            let currentTime = this.wavesurfer.getCurrentTime();
            this.wavesurfer.seekTo((currentTime - 5) / this.wavesurfer.getDuration());
        },
        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        },
    },
};
</script>
  
<style scoped>
/* Your custom styles go here */
</style>
  