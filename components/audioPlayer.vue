<template>
    <div class="controls">
        <div id="audioPlayer" class="player" loading="lazy">
            <div class="player__div">
                <button @click="rewind" class="player__button">
                    <MdiIcon icon="mdiFastForward" />
                </button>

                <button @click="playPause" class="player__pause-button">
                    <MdiIcon :icon="isPlaying ? 'mdiPause' : 'mdiPlay'" />
                </button>
                <button @click="fastForward">
                    <MdiIcon icon="mdiFastForward" />
                </button>
            </div>
            <div class="player__text-duration">
                <p>{{ useFormatTime(currentTime) }}/{{ useFormatTime(totalTime) }}</p>
            </div>
            <div class="player__progress-bar">
                <div :hidden="!currentStyle" ref="waveSurfer" class="player__wave-surfer"></div>
                <input v-if="!currentStyle" ref="progressBar" type="range" min="0" :max="totalTime" :value="currentTime"
                    step="1" class="player__progress-bar__input" @input="seek" />
                <!-- <div class="player__progress-fill" :style="{ width: (currentTime / totalTime * 100) + '%' }"></div> -->
            </div>

            <button @click="toggleMute">
                <MdiIcon :icon="isMuted ? 'mdiVolumeMute' : 'mdiVolumeHigh'" />
            </button>
        </div>
        <div>
            <button @click="toggleStyle">
                <span class="style-button">
                    <MdiIcon icon="mdiPaletteSwatch" />
                    Change style
                </span>
            </button>
        </div>
    </div>
</template>
  
<script lang="ts">
import '@/assets/sass/audio.sass'

import WaveSurfer from 'wavesurfer.js'
import useFormatTime from '~/composables/useFormatTime';
import { connectToSocket, sendMessage } from '~/composables/useSocket';
import randomNameGenerator from '~/composables/useRandomGenerator'

export default {
    props: {
        src: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            wavesurfer: null as WaveSurfer | null,
            isPlaying: false as boolean,
            isMuted: false as boolean,
            duration: 100 as number,
            totalTime: 0 as number,
            currentTime: 0 as number,
            currentStyle: false as boolean | undefined,
            channelName: "event" as string,
            randomName: '' as string,
        };
    },
    async mounted() {
        this.randomName = randomNameGenerator();

        connectToSocket(this.randomName).then((resp) => {
            console.log("Connected Successfully");
        })
            .catch((error) => {
                console.error(error);
            });

        // HTMLElement as a type for $refs.
        this.wavesurfer = WaveSurfer.create({
            container: this.$refs.waveSurfer as HTMLElement,
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
            this.currentTime = time;

        });

        this.wavesurfer.on('click', (time) => {
            this.sendAction(`Controlling Knob to ${(Math.floor(time * 100) / 100)}`);
        })

        this.wavesurfer.on('ready', () => {
            if (!this.wavesurfer) { return };

            const duration = this.wavesurfer.getDuration();
            this.totalTime = duration;
        });
    },
    methods: {
        playPause() {
            if (!this.wavesurfer) { return };

            this.isPlaying = !this.isPlaying;
            this.wavesurfer.playPause();

            this.sendAction(this.isPlaying ? 'Played the song' : 'Paused the song');
        },
        fastForward() {
            if (!this.wavesurfer) { return };

            let currentTime = this.wavesurfer.getCurrentTime();
            this.wavesurfer.seekTo(Math.min(currentTime + 5, this.totalTime) / this.wavesurfer.getDuration());
            this.currentTime = Math.min(currentTime + 5, this.totalTime);
            this.sendAction('Fastforward');
        },
        rewind() {
            if (!this.wavesurfer) { return };
            let currentTime = this.wavesurfer.getCurrentTime();

            this.wavesurfer.seekTo(Math.max(currentTime - 5, 0) / this.wavesurfer.getDuration());
            this.currentTime = Math.max(currentTime - 5, 0);

            this.sendAction('Rewind');
        },
        toggleMute() {
            if (!this.wavesurfer) { return };

            this.isMuted = !this.isMuted;
            this.isMuted ? this.wavesurfer.setVolume(0) : this.wavesurfer.setVolume(1);
            this.sendAction(this.isMuted ? 'Muted' : 'Unmuted');
        },
        seek(event: Event) {
            if (!event.target) { return; }
            const seekTime = parseFloat((event.target as HTMLInputElement).value);

            if (this.wavesurfer) {
                const seekPosition = seekTime / this.totalTime;
                this.wavesurfer.seekTo(seekPosition);

                this.currentTime = seekTime;
                this.sendAction(`Controlling Knob to ${(Math.floor(seekPosition * 100) / 100)}`);
            }
        },
        updateProgress() {
            if (this.$refs.progressBar && this.wavesurfer) {
                (this.$refs.progressBar as HTMLInputElement).value = this.wavesurfer.getCurrentTime().toString();
            }
        },
        toggleStyle() {
            this.currentStyle = !this.currentStyle;
            this.sendAction('Is Toggling styles');
        },
        sendAction(action: string) {
            sendMessage(this.channelName, action);
        }
    },
    beforeUnmount() {
        disconnectFromChannel(this.channelName);
    },
};
</script>

<style scoped>
.test {}
</style>