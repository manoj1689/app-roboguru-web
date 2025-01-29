declare module 'speak-tts' {
    export default class Speech {
        init(options?: object): Promise<any>;
        speak(data: { text: string; lang?: string; volume?: number; rate?: number; pitch?: number }): Promise<any>;
        hasBrowserSupport(): boolean;
        cancel(): void; // Adds the cancel method to stop the current speech
    }
}
