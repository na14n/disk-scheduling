<script>
	export let tabs;
	export let jobs;
	export let variables;
    export let jobsNum;

    

</script>

<div class="w-full h-max flex flex-col justify-center items-center gap-4 p-5">
	<div class="flex flex-col items-center gap-4">
		<span class="text-slate-300">Choose a Disk scheduling algorithm to use</span>
		<div class="grid grid-cols-2 gap-6">
			<button class="btn variant-ghost-primary flex flex-col gap-1 p-2">
				<span class="font-semibold uppercase text-xl">FIFO</span>
				<span class="text-slate-200">First-in-first-out</span>
			</button>
			<button class="btn variant-ghost-primary flex flex-col gap-1 p-2">
				<span class="font-semibold uppercase text-xl">SSTF</span>
				<span class="text-slate-200">Shortest Seek Time First</span>
			</button>
			<button class="btn variant-ghost-primary flex flex-col gap-1 p-2">
				<span class="font-semibold uppercase text-xl">scan</span>
				<span class="text-slate-200">Elevator Scan</span>
			</button>
			<button class="btn variant-ghost-primary flex flex-col gap-1 p-2">
				<span class="font-semibold uppercase text-xl">c-scan</span>
				<span class="text-slate-200">Circular SCAN</span>
			</button>
			<button class="btn variant-ghost-primary flex flex-col gap-1 p-2">
				<span class="font-semibold uppercase text-xl">look</span>
				<span class="text-slate-200">Advanced SCAN</span>
			</button>
			<button class="btn variant-ghost-primary flex flex-col gap-1 p-2">
				<span class="font-semibold uppercase text-xl">c-look</span>
				<span class="text-slate-200">Circular LOOK</span>
			</button>
		</div>
		<div class="w-full mt-8">
			<button
				class="btn variant-soft-tertiary flex items-center justify-center max-w-fit"
				on:click={() => {
					tabs = 0;
					jobs = jobs;
					variables = variables;
                    jobsNum = jobsNum;
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
