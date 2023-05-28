<script>
	export let tabs = 0;
	export let jobsNum;
	export let jobs = [];
	export let variables = {
		starting: null,
		ending: null,
		ps: null,
		sp: null,
		armMovement: null,
	}


	function updateInputs() {
		jobs = Array.from({ length: jobsNum }, (_, index) => ({
			id: index + 1,
			track: null,
			// arrival: null
		}));
	}

</script>

<div class="w-full h-max flex flex-col justify-center items-center gap-4 p-5">
	<div class="w-1/6">
		<label
			for="jobs"
			class="font-semibold text-slate-700 gap-1 dark:text-tertiary-200 flex flex-col"
			>Number of Jobs</label
		>
		<input
			type="number"
			name="jobs"
			class="input font-semibold"
			placeholder="Enter the total number of jobs"
			bind:value={jobsNum}
			on:input={updateInputs}
			min="0"
			required
		/>
	</div>
	{#if jobs.length > 0}
		<div class="w-full flex gap-4 justify-center mb-8 mt-4">
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200"
				>Starting Track
				<input
					type="number"
					name="jobs"
					class="input mb-2 w-fit"
					placeholder="Enter Starting Track"
					min="0"
					required
					bind:value={variables.starting}
				/>
			</label>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200"
				>Ending Track
				<input
					type="number"
					name="jobs"
					class="input mb-2 w-fit"
					placeholder="Enter Ending Track "
					min="0"
					required
					bind:value={variables.ending}
				/>
			</label>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200"
				>Starting Position
				<input
					type="number"
					name="jobs"
					class="input mb-2 w-fit"
					placeholder="Enter Starting Position"
					min="0"
					required
					bind:value={variables.sp}
				/>
			</label>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200"
				>Previously Served
				<input
					type="number"
					name="jobs"
					class="input mb-2 w-fit"
					placeholder="Enter Previously served"
					min="0"
					required
					bind:value={variables.ps}
				/>
			</label>
			<label
				for="jobs"
				class="font-semibold text-slate-700 flex flex-col gap-1 dark:text-tertiary-200"
				>Arm Movement
				<input
					type="number"
					name="jobs"
					class="input mb-2 w-fit"
					placeholder="Enter Previously served"
					min="0"
					required
					bind:value={variables.armMovement}
				/>
			</label>
		</div>
	{/if}
	<div class="grid grid-flow-column gap-8 grid-cols-5">
		{#each jobs as j (j.id)}
			<div class="bg-tertiary-200 rounded-lg p-5 shadow-md dark:bg-tertiary-900">
				<span class="badge variant-filled-tertiary text-lg px-2">Job {j.id}</span>
				<label
					for="jobs"
					class="font-semibold mt-4 text-slate-700 flex flex-col dark:text-tertiary-200"
					>Track number
					<input
						type="number"
						name="jobs"
						class="input mb-2 w-fit"
						placeholder="Enter the Track number"
						min="0"
						required
						bind:value={j.track}
					/>
				</label>
				<!-- <label for="jobs" class="font-semibold text-slate-700 flex flex-col dark:text-tertiary-200"
					>Arrival Time
					<input
						type="number"
						name="jobs"
						class="input mb-2 w-fit"
						placeholder="Enter the job Arrival time"
						min="0"
						required
						bind:value={j.arrival}
					/>
				</label> -->
			</div>
		{/each}
	</div>
	{#if jobs.length > 0}
		<button
			class="btn variant-ghost-primary flex item-center justify-center gap-1 mt-8"
			type="submit"
			on:click={() => {
				// tab.update((prev) => (prev = 1));
				// jobList.update((prev) => (prev = jobs));
				tabs = 1;
				jobs = jobs;
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
