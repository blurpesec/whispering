import { ClipboardService } from '@repo/services/services/clipboard';
import { RecordingsDbService, type Recording } from '@repo/services/services/recordings-db';
import { TranscriptionError, TranscriptionService } from '@repo/services/services/transcription';
import { Effect } from 'effect';
import { toast } from 'svelte-sonner';
import { get, writable } from 'svelte/store';
import { settings } from '../settings';

class TranscriptionRecordingNotFoundError extends TranscriptionError {
	constructor({ message }: { message: string }) {
		super({ message });
	}
}

export const createRecordings = Effect.gen(function* (_) {
	const recordingsDb = yield* _(RecordingsDbService);
	const transcriptionService = yield* _(TranscriptionService);
	const clipboardService = yield* _(ClipboardService);
	const { subscribe, set, update } = writable<Recording[]>([]);
	const setRecording = (recording: Recording) =>
		Effect.gen(function* (_) {
			yield* _(recordingsDb.editRecording(recording));
			update((recordings) => {
				const index = recordings.findIndex((r) => r.id === recording.id);
				if (index === -1) return recordings;
				recordings[index] = recording;
				return recordings;
			});
		});
	return {
		subscribe,
		sync: Effect.gen(function* (_) {
			const recordings = yield* _(recordingsDb.getAllRecordings);
			set(recordings);
		}).pipe(
			Effect.catchAll((error) => {
				console.error(error);
				toast.error(error.message);
				return Effect.succeed(undefined);
			})
		),
		addRecording: (recording: Recording) =>
			Effect.gen(function* (_) {
				yield* _(recordingsDb.addRecording(recording));
				update((recordings) => [...recordings, recording]);
			}).pipe(
				Effect.catchAll((error) => {
					console.error(error);
					toast.error(error.message);
					return Effect.succeed(undefined);
				})
			),
		editRecording: (recording: Recording) =>
			Effect.gen(function* (_) {
				yield* _(setRecording(recording));
				toast.success('Recording updated!');
			}).pipe(
				Effect.catchAll((error) => {
					console.error(error);
					toast.error(error.message);
					return Effect.succeed(undefined);
				})
			),
		deleteRecording: (id: string) =>
			Effect.gen(function* (_) {
				yield* _(recordingsDb.deleteRecording(id));
				update((recordings) => recordings.filter((recording) => recording.id !== id));
				toast.success('Recording deleted!');
			}).pipe(
				Effect.catchAll((error) => {
					console.error(error);
					toast.error(error.message);
					return Effect.succeed(undefined);
				})
			),
		transcribeRecording: (id: string) =>
			Effect.gen(function* (_) {
				const recording = yield* _(recordingsDb.getRecording(id));
				if (!recording) {
					return yield* _(
						new TranscriptionRecordingNotFoundError({
							message: `Recording with id ${id} not found`
						})
					);
				}
				yield* _(setRecording({ ...recording, transcriptionStatus: 'TRANSCRIBING' }));
				const transcribedText = yield* _(
					transcriptionService.transcribe(recording.blob, get(settings))
				);
				yield* _(setRecording({ ...recording, transcribedText, transcriptionStatus: 'DONE' }));
				return transcribedText;
			}),
		copyRecordingText: (recording: Recording) =>
			Effect.gen(function* (_) {
				if (!recording.transcribedText) return;
				yield* _(clipboardService.setClipboardText(recording.transcribedText));
				toast.success('Copied to clipboard!');
			})
	};
});
