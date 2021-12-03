import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

interface Sound {
  key: string;
  asset: string;
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private sounds: Sound[] = [];
  private audioPlayer: HTMLAudioElement = new Audio();
  private forceWebAudio = false;

  constructor(private nativeAudio: NativeAudio) {
    this.preload('insight', 'assets/sounds/insight.mp3');
    this.preload('pristine', 'assets/sounds/pristine.mp3');
    this.preload('long', 'assets/sounds/long.mp3');
    this.preload('error', 'assets/sounds/error.mp3');
  }

  preload(key: string, asset: string): void {
    if (!this.sounds.filter((sound) => sound.key === key).length) {
      if (!this.forceWebAudio) {
        this.nativeAudio.preloadSimple(key, asset);
        this.sounds.push({
          key: key,
          asset: asset,
        });
      } else {
        const audio = new Audio();
        audio.src = asset;
        this.sounds.push({
          key: key,
          asset: asset,
        });
      }
    }
    console.log(this.sounds);
  }

  play(key: string): boolean {
    const soundToPlay: Sound = this.sounds.find((sound) => sound.key === key);

    if (soundToPlay) {
      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.play().catch(() => {});
      return true;
    } else {
      return false;
    }
  }
}
