<script>
	import { Input, Option } from '$lib/components';
	// import { tab } from '$lib/stores/tabs.js';
	// import { onDestroy } from 'svelte';

	let tabs = 0;
	let jobs
	let variables
	let jobsNum

	// const unsubscribeTab = tab.subscribe((val) => (tabs = val));

	// onDestroy(() => {
	// 	unsubscribeTab();
	// });

	// function handleJobList(event) {
	// 	jobList = event.detail;
	// 	console.log(jobList);
	// }
</script>

<div class="w-100 min-h-screen flex flex-col gap-8 justify-center items-center p-10">
	<div class="p-5 bg-primary-500 rounded-lg text-3xl text-slate-100 font-bold shadow-xl">
		<span>Disk Scheduling Techniques</span>
	</div>
	{#if tabs == 0}
		<Input bind:jobsNum={jobsNum} bind:jobs={jobs} bind:tabs={tabs} bind:variables={variables}/>
	{:else if tabs == 1}
		<Option bind:jobsNum={jobsNum} bind:jobs={jobs} bind:tabs={tabs} bind:variables={variables}/>
	{/if}
</div>
