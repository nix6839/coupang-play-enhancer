import { Slider } from '@ark-ui/solid';
import { Suspense, createResource } from 'solid-js';
import Kbd from '../lib/components/ui/Kbd.tsx';
import {
	VIDEO_SEEK_TIME_DEFAULT,
	VIDEO_SEEK_TIME_S_KEY,
} from '../lib/core/storage.ts';

export default function App() {
	const [videSeekTimeS, { mutate: mutateVideoSeekTimeS }] = createResource(
		async () => {
			const items = await chrome.storage.sync.get({
				[VIDEO_SEEK_TIME_S_KEY]: VIDEO_SEEK_TIME_DEFAULT,
			});
			return items[VIDEO_SEEK_TIME_S_KEY] as number;
		},
	);

	return (
		<main class="px-6 mt-8 mx-auto">
			<div class="max-w-md">
				<fieldset>
					<legend class="mb-4 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
						비디오 플레이어
					</legend>

					<Suspense fallback={<p>로딩 중...</p>}>
						<div class="flex flex-col gap-2">
							<Slider.Root
								min={1}
								max={30}
								value={[videSeekTimeS() ?? 5]}
								onValueChange={(details) => {
									mutateVideoSeekTimeS(details.value[0]);
									chrome.storage.sync.set({
										[VIDEO_SEEK_TIME_S_KEY]: details.value[0],
									});
								}}
								class="flex flex-col gap-2"
							>
								<Slider.Label class="text-base leading-none break-keep">
									방향키(<Kbd>←</Kbd>, <Kbd>→</Kbd>)로 비디오 재생 위치를 조정할
									때 이동하는 시간(초)
								</Slider.Label>
								<Slider.Control class="relative flex items-center h-5">
									<Slider.Track class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
										<Slider.Range class="absolute h-full bg-primary" />
									</Slider.Track>
									<Slider.Thumb
										index={0}
										class="absolute block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
									/>
								</Slider.Control>
							</Slider.Root>
							<p class="text-sm">
								<span class="sr-only">현재 값: </span>
								{videSeekTimeS()}초
							</p>
						</div>
					</Suspense>
				</fieldset>
			</div>
		</main>
	);
}
