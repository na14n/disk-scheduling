<script>
	import { tab } from '$lib/stores/tabs';
	import { jobList } from '$lib/stores/jobList';
	import { variables } from '$lib/stores/variables';
	import { processedJ } from '$lib/stores/processedJobs';
	import { onDestroy } from 'svelte';

	let tabs = 1;
	let jobs = [];
	let variable = {};
	let jobsNum;
	let processedJobs = [];
	let direction;

	const unsubscribeTab = tab.subscribe((t) => (tabs = t));
	const unsubscribeJobList = jobList.subscribe((j) => (jobs = j));
	processedJ.set([...jobs]);
	const unsubscribeProcessedJobs = processedJ.subscribe((pj) => (processedJobs = pj));
	const unsubscribeVariables = variables.subscribe((v) => (variable = v));

	const sp = { id: 'Starting Position', track: variable.sp };
	const ps = { id: 'Previously Served', track: variable.ps };

	if (variable.ps > variable.sp) {
		direction = false;
	} else {
		direction = true;
	}

	onDestroy(() => {
		unsubscribeTab();
		unsubscribeJobList();
		unsubscribeVariables();
		unsubscribeProcessedJobs();
	});

	async function Fifo() {
		// SORT THE INPUTS BY ID
		processedJobs.sort((a, b) => a.id - b.id);
		// ADD SP AT THE START
		processedJobs.unshift(sp);
		// SEARCH FOR PS POSITION
		//	1. WE FIND A TRACK THAT IS LESS THAN PS TRACK
		let index = processedJobs.findIndex((t) => t.track <= ps.track);
		console.log(index);
		if (index === -1) {
			//	2. IF THERE IS NONE, PS SHOULD HAVE THE SMALLEST TRACK, SO IT IS PLACED AT THE END
			processedJobs.concat(processedJobs, ps);
			processedJ.update((prev) => (prev = processedJobs));
			console.log(processedJobs);
			console.log('JOBS', jobs);
		} else if (index === 0) {
			// 3. IF THE PS IS SMALLER THAN SP, IT SHOULD NOT BE PLACED AT FIST PLACE, INSTEAD WE FIND A TRACK GREATER THAN PS AND PLACE IT BEFORE THAT
			let index = processedJobs.findIndex((t) => t.track >= ps.track);
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
			console.log(processedJobs);
			console.log('JOBS', jobs);
		} else if (processedJobs[index].track <= ps.track) {
			// 4. IF THERE IS A TRACK SMALLER THAN PS THAT IS NOT THE SP, WE PLACE SP BEFORE THAT
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
			console.log(processedJobs);
			console.log('JOBS', jobs);
		}
	}

	async function Sstf() {
		// Step 1: Sort the array in ascending order based on track
		processedJobs.sort((a, b) => {
			return a.track - b.track;
		});
		processedJobs.unshift(sp);

		let currIndex = 1;

		while (currIndex < processedJobs.length - 1) {
			const prevObj = processedJobs[currIndex - 1];
			const currObj = processedJobs[currIndex];
			const nextObj = processedJobs[currIndex + 1];

			// console.log(
			// 	'ITERATION: ',
			// 	currIndex,
			// 	'PREV OBJ: ',
			// 	prevObj,
			// 	'CURR OBJ: ',
			// 	currObj,
			// 	'NEXT OBJ: ',
			// 	nextObj,
			// 	'LAST OBJ: ',
			// 	lastObj,
			// 	'LENGTH: ',
			// 	sample.length
			// );

			const distanceToCurrent = Math.abs(currObj.track - prevObj.track);
			const distanceToNext = Math.abs(nextObj.track - prevObj.track);

			// console.log(
			// 	'CURR TRACK: ',
			// 	distanceToCurrent,
			// 	'NEXT TRACK: ',
			// 	distanceToNext,
			// 	'LAST TRACK: ',
			// 	distanceToLast
			// );

			if (distanceToNext < distanceToCurrent) {
				processedJobs.splice(currIndex + 1, 1);
				console.log(processedJobs);
				processedJobs.splice(currIndex, 0, nextObj);
				console.log(processedJobs);
			} else {
				processedJobs.splice(currIndex, 1);
				console.log(processedJobs);
				processedJobs.splice(currIndex, 0, currObj);
				console.log(processedJobs);
			}
			currIndex++;
		}

		let index = processedJobs.findIndex((t) => t.track <= ps.track);
		console.log(index);
		if (index === -1) {
			//	2. IF THERE IS NONE, PS SHOULD HAVE THE SMALLEST TRACK, SO IT IS PLACED AT THE END
			processedJobs.concat(processedJobs, ps);
			processedJ.update((prev) => (prev = processedJobs));
			console.log(processedJobs);
		} else if (index === 0) {
			// 3. IF THE PS IS SMALLER THAN SP, IT SHOULD NOT BE PLACED AT FIST PLACE, INSTEAD WE FIND A TRACK GREATER THAN PS AND PLACE IT BEFORE THAT
			let index = processedJobs.findIndex((t) => t.track >= ps.track);
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
			console.log(processedJobs);
		} else if (processedJobs[index].track <= ps.track) {
			// 4. IF THERE IS A TRACK SMALLER THAN PS THAT IS NOT THE SP, WE PLACE SP BEFORE THAT
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
			console.log(processedJobs);
		}
	}

	async function Scan() {
		processedJobs.sort((a, b) => a.track - b.track);

		if (direction == true) {
			const lower = processedJobs.filter((item) => item.track < sp.track);
			lower.sort((a, b) => b.track - a.track);
			processedJobs = processedJobs.filter((item) => item.track >= sp.track);
			processedJobs.sort((a, b) => a.track - b.track);

			processedJobs.unshift(sp);
			processedJobs.push({ id: 'last track', track: variable.ending });

			processedJobs.push(...lower);
		} else if (direction == false) {
			const higher = processedJobs.filter((item) => item.track > sp.track);
			processedJobs = processedJobs.filter((item) => item.track <= sp.track);
			processedJobs.sort((a, b) => b.track - a.track);

			processedJobs.unshift(sp);
			processedJobs.push({ id: 'first track', track: variable.starting });

			processedJobs.push(...higher);
		}

		let index = processedJobs.findIndex((t) => t.track <= ps.track);
		if (index === -1) {
			//	2. IF THERE IS NONE, PS SHOULD HAVE THE SMALLEST TRACK, SO IT IS PLACED AT THE END
			processedJobs.concat(processedJobs, ps);
			processedJ.update((prev) => (prev = processedJobs));
		} else if (index === 0) {
			// 3. IF THE PS IS SMALLER THAN SP, IT SHOULD NOT BE PLACED AT FIST PLACE, INSTEAD WE FIND A TRACK GREATER THAN PS AND PLACE IT BEFORE THAT
			let index = processedJobs.findIndex((t) => t.track >= ps.track);
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
		} else if (processedJobs[index].track <= ps.track) {
			// 4. IF THERE IS A TRACK SMALLER THAN PS THAT IS NOT THE SP, WE PLACE SP BEFORE THAT
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
		}
	}

	async function Cscan() {
		processedJobs.sort((a, b) => a.track - b.track);

		if (direction == true) {
			const lower = processedJobs.filter((item) => item.track < sp.track);
			lower.sort((a, b) => a.track - b.track);
			processedJobs = processedJobs.filter((item) => item.track >= sp.track);
			processedJobs.sort((a, b) => a.track - b.track);

			lower.unshift({ id: 'last track', track: variable.starting });
			processedJobs.unshift(sp);
			processedJobs.push({ id: 'last track', track: variable.ending });

			console.log('Lower:', lower);
			processedJobs.push(...lower);
			console.log('processedJobs:', processedJobs);
		} else if (direction == false) {
			const higher = processedJobs.filter((item) => item.track > sp.track);
			higher.sort((a, b) => b.track - a.track);
			processedJobs = processedJobs.filter((item) => item.track <= sp.track);
			processedJobs.sort((a, b) => b.track - a.track);

			higher.unshift({ id: 'last track', track: variable.ending });
			processedJobs.unshift(sp);
			processedJobs.push({ id: 'first track', track: variable.starting });

			console.log('Higher:', higher);
			processedJobs.push(...higher);
			console.log('processedJobs:', processedJobs);
		}

		let index = processedJobs.findIndex((t) => t.track <= ps.track);
		if (index === -1) {
			//	2. IF THERE IS NONE, PS SHOULD HAVE THE SMALLEST TRACK, SO IT IS PLACED AT THE END
			processedJobs.concat(processedJobs, ps);
			processedJ.update((prev) => (prev = processedJobs));
			console.log(processedJobs);
			console.log('JOBS', jobs);
		} else if (index === 0) {
			// 3. IF THE PS IS SMALLER THAN SP, IT SHOULD NOT BE PLACED AT FIST PLACE, INSTEAD WE FIND A TRACK GREATER THAN PS AND PLACE IT BEFORE THAT
			let index = processedJobs.findIndex((t) => t.track >= ps.track);
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
			console.log(processedJobs);
			console.log('JOBS', jobs);
		} else if (processedJobs[index].track <= ps.track) {
			// 4. IF THERE IS A TRACK SMALLER THAN PS THAT IS NOT THE SP, WE PLACE SP BEFORE THAT
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
			console.log(processedJobs);
			console.log('JOBS', jobs);
		}
	}

	async function Look() {
		processedJobs.sort((a, b) => a.track - b.track);

		if (direction == true) {
			const lower = processedJobs.filter((item) => item.track < sp.track);
			lower.sort((a, b) => b.track - a.track);
			processedJobs = processedJobs.filter((item) => item.track >= sp.track);
			processedJobs.sort((a, b) => a.track - b.track);

			processedJobs.unshift(sp);

			processedJobs.push(...lower);
		} else if (direction == false) {
			const higher = processedJobs.filter((item) => item.track > sp.track);
			processedJobs = processedJobs.filter((item) => item.track <= sp.track);
			processedJobs.sort((a, b) => b.track - a.track);

			processedJobs.unshift(sp);

			processedJobs.push(...higher);
		}

		let index = processedJobs.findIndex((t) => t.track <= ps.track);
		if (index === -1) {
			//	2. IF THERE IS NONE, PS SHOULD HAVE THE SMALLEST TRACK, SO IT IS PLACED AT THE END
			processedJobs.concat(processedJobs, ps);
			processedJ.update((prev) => (prev = processedJobs));
		} else if (index === 0) {
			// 3. IF THE PS IS SMALLER THAN SP, IT SHOULD NOT BE PLACED AT FIST PLACE, INSTEAD WE FIND A TRACK GREATER THAN PS AND PLACE IT BEFORE THAT
			let index = processedJobs.findIndex((t) => t.track >= ps.track);
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
		} else if (processedJobs[index].track <= ps.track) {
			// 4. IF THERE IS A TRACK SMALLER THAN PS THAT IS NOT THE SP, WE PLACE SP BEFORE THAT
			processedJobs.splice(index, 0, ps);
			processedJ.update((prev) => (prev = processedJobs));
		}
	}

	async function Clook() {
		processedJobs.sort((a, b) => a.track - b.track);

		if (direction == true) {
			const lower = processedJobs.filter((item) => item.track < sp.track);
			lower.sort((a, b) => a.track - b.track);
			processedJobs = processedJobs.filter((item) => item.track >= sp.track);
			processedJobs.sort((a, b) => a.track - b.track);

			processedJobs.unshift(sp);

			let index = lower.findIndex((t) => t.track <= ps.track);
			if (index === -1) {
				//	2. IF THERE IS NONE, PS SHOULD HAVE THE SMALLEST TRACK, SO IT IS PLACED AT THE END
				lower.concat(lower, ps);
			} else if (index === 0) {
				// 3. IF THE PS IS SMALLER THAN SP, IT SHOULD NOT BE PLACED AT FIST PLACE, INSTEAD WE FIND A TRACK GREATER THAN PS AND PLACE IT BEFORE THAT
				let index = lower.findIndex((t) => t.track >= ps.track);
				lower.splice(index, 0, ps);
			} else if (lower[index].track <= ps.track) {
				// 4. IF THERE IS A TRACK SMALLER THAN PS THAT IS NOT THE SP, WE PLACE SP BEFORE THAT
				lower.splice(index, 0, ps);
			}

			processedJobs.push(...lower);
			processedJ.update((prev) => (prev = processedJobs));
		} else if (direction == false) {
			const higher = processedJobs.filter((item) => item.track > sp.track);
			processedJobs = processedJobs.filter((item) => item.track <= sp.track);
			processedJobs.sort((a, b) => b.track - a.track);

			processedJobs.unshift(sp);
			let index = higher.findIndex((t) => t.track <= ps.track);
			if (index === -1) {
				//	2. IF THERE IS NONE, PS SHOULD HAVE THE SMALLEST TRACK, SO IT IS PLACED AT THE END
				higher.concat(higher, ps);
			} else if (index === 0) {
				// 3. IF THE PS IS SMALLER THAN SP, IT SHOULD NOT BE PLACED AT FIST PLACE, INSTEAD WE FIND A TRACK GREATER THAN PS AND PLACE IT BEFORE THAT
				let index = higher.findIndex((t) => t.track >= ps.track);
				higher.splice(index, 0, ps);
			} else if (higher[index].track <= ps.track) {
				// 4. IF THERE IS A TRACK SMALLER THAN PS THAT IS NOT THE SP, WE PLACE SP BEFORE THAT
				higher.splice(index, 0, ps);
			}

			processedJobs.push(...higher);
			processedJ.update((prev) => (prev = processedJobs));
		}
	}
</script>

<!-- <pre>{JSON.stringify(variable, null, 2)}</pre> -->
<div class="w-full h-max flex flex-col justify-center items-center gap-4 p-5">
	<div class="flex flex-col items-center gap-16">
		<span class="dark:text-slate-300 text-center">Choose a Disk scheduling algorithm to use</span>
		<div class="grid lg:px-32 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1 gap-8 grid-flow-column md:px-0 sm:px-0 ">
			<button
				class="btn variant-ghost-primary flex flex-col gap-1 p-2 hover:text-primary-600 dark:hover:text-primary-400"
				on:click={() => {
					tabs = 2;
					tab.update((prev) => (prev = 2));
					jobs = jobs;
					Fifo();
				}}
			>
				<span class="font-semibold uppercase text-xl">FIFO</span>
				<span class="text-slate-600 dark:text-slate-400">First-in-first-out</span>
			</button>
			<button
				class="btn variant-ghost-primary flex flex-col gap-1 p-2 hover:text-primary-600 dark:hover:text-primary-400"
				on:click={() => {
					tabs = 2;
					tab.update((prev) => (prev = 2));
					jobs = jobs;
					Sstf();
				}}
			>
				<span class="font-semibold uppercase text-xl">SSTF</span>
				<span class="text-slate-600 dark:text-slate-400">Shortest Seek Time First</span>
			</button>
			<button
				class="btn variant-ghost-primary flex flex-col gap-1 p-2 hover:text-primary-600 dark:hover:text-primary-400"
				on:click={() => {
					tabs = 2;
					tab.update((prev) => (prev = 2));
					jobs = jobs;
					Scan();
				}}
			>
				<span class="font-semibold uppercase text-xl">scan</span>
				<span class="text-slate-600 dark:text-slate-400">Elevator Scan</span>
			</button>
			<button
				class="btn variant-ghost-primary flex flex-col gap-1 p-2 hover:text-primary-600 dark:hover:text-primary-400"
				on:click={() => {
					tabs = 2;
					tab.update((prev) => (prev = 2));
					jobs = jobs;
					Cscan();
				}}
			>
				<span class="font-semibold uppercase text-xl">c-scan</span>
				<span class="text-slate-600 dark:text-slate-400">Circular SCAN</span>
			</button>
			<button
				class="btn variant-ghost-primary flex flex-col gap-1 p-2 hover:text-primary-600 dark:hover:text-primary-400"
				on:click={() => {
					tabs = 2;
					tab.update((prev) => (prev = 2));
					jobs = jobs;
					Look();
				}}
			>
				<span class="font-semibold uppercase text-xl">look</span>
				<span class="text-slate-600 dark:text-slate-400">Advanced SCAN</span>
			</button>
			<button
				class="btn variant-ghost-primary flex flex-col gap-1 p-2 hover:text-primary-600 dark:hover:text-primary-400"
				on:click={() => {
					tabs = 2;
					tab.update((prev) => (prev = 2));
					jobs = jobs;
					Clook();
				}}
			>
				<span class="font-semibold uppercase text-xl">c-look</span>
				<span class="text-slate-600 dark:text-slate-400">Circular LOOK</span>
			</button>
		</div>
		<div class="w-full mt-8">
			<button
				class="btn variant-soft-tertiary flex items-center justify-center max-w-fit"
				on:click={() => {
					tabs = 0;
					jobs = jobs;
					variable = variable;
					jobsNum = jobsNum;
					tab.update((prev) => (prev = 0));
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42Z"
					/></svg
				>
				<span class="font-semibold uppercase">return</span>
			</button>
		</div>
	</div>
</div>
