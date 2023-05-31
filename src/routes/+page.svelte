<script>
	import { Input, Option, Output } from '$lib/components';
	import { tab } from '$lib/stores/tabs';
	import { jobList } from '$lib/stores/jobList';
	import { variables } from '$lib/stores/variables';
	import { processedJ } from '$lib/stores/processedJobs';
	import { onMount, onDestroy } from 'svelte';

	export let tabs = 0;
	export let jobs = [];
	export let variable = {};
	export let processedJobs = [];
	let output;

	const unsubscribeTab = tab.subscribe((t) => (tabs = t));
	const unsubscribeJobList = jobList.subscribe((j) => (jobs = j));
	const unsubscribeVariables = variables.subscribe((v) => (variable = v));
	const unsubscribeProcessedJobs = processedJ.subscribe((pj) => (processedJobs = pj));

	onDestroy(() => {
		unsubscribeTab();
		unsubscribeJobList();
		unsubscribeVariables();
		unsubscribeProcessedJobs();
	});
</script>

<div class="w-100 h-full flex flex-col gap-8 justify-center items-center lg:p-10 md:p-7 xs:p-4">
	<div class="p-5 bg-primary-500 rounded-lg text-3xl text-slate-100 font-bold shadow-xl">
		<span>Disk Scheduling Techniques</span>
	</div>
	{#if tabs == 0}
		<Input />
	{:else if tabs == 1}
		<Option />
	{:else if tabs == 2}
		<Output />
	{/if}
</div>
