<script>
	import { tab } from '$lib/stores/tabs';
	import { jobList } from '$lib/stores/jobList';
	import { variables } from '$lib/stores/variables';
	import { jobsN } from '$lib/stores/jobsNum';
	import { onMount, onDestroy } from 'svelte';

	export let tabs = 0;
	export let jobsNum;
	export let jobs = [];
	export let variable = {
		starting: null,
		ending: null,
		ps: null,
		sp: null,
		armMovement: null,
		steps: null
	};

	const unsubscribeTab = tab.subscribe((t) => (tabs = t));
	const unsubscribeJobList = jobList.subscribe((j) => (jobs = j));
	const unsubscribeVariables = variables.subscribe((v) => (variable = v));
	const unsubscribeJobsNum = jobsN.subscribe((jn) => (jobsNum = jn));

	onDestroy(() => {
		unsubscribeTab();
		unsubscribeJobList();
		unsubscribeVariables();
	});

	// function updateInputs() {
	// 	jobs = Array.from({ length: jobsNum }, (_, index) => ({
	// 		id: index + 1,
	// 		track: null
	// 	}));
	// }
	function updateInputs() {
		// Check if the new jobsNum is greater than the current length of jobs
		if (jobsNum > jobs.length) {
			// Add new jobs to the existing array, preserving the existing values
			const newJobs = Array.from({ length: jobsNum - jobs.length }, (_, index) => ({
				id: jobs.length + index + 1,
				track: null
			}));
			jobs = [...jobs, ...newJobs];
		} else if (jobsNum < jobs.length) {
			// Remove excess jobs from the existing array
			jobs = jobs.slice(0, jobsNum);
		}
	}

	function deleteCurr(jobId) {
		jobs = jobs.filter((job) => job.id !== jobId);
		jobs.forEach((job, index) => {
			job.id = index + 1;
		});
		jobsNum--;
	}

	function addJob() {
		const newJob = {
			id: jobs.length + 1,
			track: null
		};
		jobs = [...jobs, newJob];
		jobsNum++;
	}
</script>

<div class="w-full h-max flex flex-col justify-center items-center gap-4 p-5">
	<label
		for="jobs"
		class="font-semibold text-slate-700 gap-1 dark:text-tertiary-200 flex flex-col min-w-[275px] w-1/5 mb-8"
		>Number of Jobs
		<input
			type="number"
			name="jobs"
			class="input font-semibold"
			placeholder="Enter the total number of jobs"
			bind:value={jobsNum}
			on:input={() => updateInputs()}
			min="0"
			required
		/></label
	>
	{#if jobs.length > 0}
		<div
			class="grid 2xl:px-32 2xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 grid-flow-column md:px-0 sm:px-0 mb-8"
		>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200 lg:w-[230px] md:w-[275"
				>Starting Track
				<input
					type="number"
					name="jobs"
					class="input mb-2 px]"
					placeholder="Enter Starting Track"
					min="0"
					required
					bind:value={variable.starting}
				/>
			</label>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200 lg:w-[230px] md:w-[275px]"
				>Ending Track
				<input
					type="number"
					name="jobs"
					class="input mb-2"
					placeholder="Enter Ending Track "
					min="0"
					required
					bind:value={variable.ending}
				/>
			</label>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200 lg:w-[230px] md:w-[275px]"
				>Starting Position
				<input
					type="number"
					name="jobs"
					class="input mb-2"
					placeholder="Enter Starting Position"
					min="0"
					required
					bind:value={variable.sp}
				/>
			</label>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200 lg:w-[230px] md:w-[275px]"
				>Previously Served
				<input
					type="number"
					name="jobs"
					class="input mb-2"
					placeholder="Enter Previously served"
					min="0"
					required
					bind:value={variable.ps}
				/>
			</label>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200 lg:w-[230px] md:w-[275px]"
				>Arm Movement
				<input
					type="number"
					name="jobs"
					class="input mb-2"
					placeholder="Enter Previously served"
					min="0"
					required
					bind:value={variable.armMovement}
				/>
			</label>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200 lg:w-[230px] md:w-[275px]"
				>Y-axis Interval
				<input
					type="number"
					name="jobs"
					class="input mb-2 ]"
					placeholder="Enter Y-axis tick interval"
					min="0"
					required
					bind:value={variable.steps}
				/>
			</label>
		</div>
	{/if}
	{#if jobs.length > 0}
		<div
			class="grid 2xl:px-32 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-8 grid-flow-column md:px-0 sm:px-0"
		>
			{#each jobs as j (j.id)}
				<div
					class="relative bg-tertiary-200 rounded-lg p-2 shadow-md min-w-[215px] max-w-fit dark:bg-tertiary-900"
				>
					<div class="bg-tertiary-100 dark:bg-tertiary-800 font-semibold py-1 px-2 rounded-md">
						Job {j.id}
					</div>
					<label
						for="jobs"
						class="font-semibold mt-2 text-slate-700 flex flex-col dark:text-tertiary-200"
						>Track number
						<input
							type="number"
							name="jobs"
							class="input mb-2"
							placeholder="Enter the Track number"
							min="0"
							required
							bind:value={j.track}
						/>
					</label>
					<button
						class="btn-icon variant-filled-error btn-icon-sm absolute -top-1 -right-1"
						on:click={() => deleteCurr(j.id)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
							/></svg
						>
					</button>
				</div>
			{/each}
			<button
				class="bg-tertiary-200/10 min-h-[110px] rounded-lg p-2 shadow-md min-w-full max-w-fit dark:bg-tertiary-900 border-2 border-tertiary-500 border-dashed flex items-center justify-center gap-2 text-tertiary-700 hover:text-tertiary-500 hover:border-tertiary-600"
				on:click={() => addJob()}
			>
				<span class="font-semibold"> Add Job </span>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"
					><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"
						><rect width="36" height="36" x="6" y="6" rx="3" /><path
							stroke-linecap="round"
							d="M24 16v16m-8-8h16"
						/></g
					></svg
				>
			</button>
		</div>
		<button
			class="btn variant-ghost-primary flex item-center justify-center gap-1 mt-6"
			type="submit"
			on:click={() => {
				tabs = 1;
				jobsNum = jobsNum;
				jobs = jobs;
				variable = variable;
				tab.update((prev) => (prev = 1));
				jobList.update((prev) => (prev = jobs));
				variables.update((prev) => (prev = variable));
				jobsN.update((prev) => (prev = jobsNum));
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M4 18h4c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm1 6h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1z"
				/></svg
			>
			<span class="font-semibold">Choose Algorithm</span>
		</button>
	{/if}
</div>
