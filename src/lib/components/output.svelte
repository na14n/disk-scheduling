<script>
	import Chart from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { tab } from '$lib/stores/tabs';
	import { variables } from '$lib/stores/variables';
	import { processedJ } from '$lib/stores/processedJobs';
	import { jobList } from '$lib/stores/jobList';
	import { onMount, onDestroy } from 'svelte';
	let tabs = 2;
	let variable = {};
	let processedJobs = [];
	let jobs = [];
	let thm = 0;
	let ctx;

	const unsubscribeTab = tab.subscribe((t) => (tabs = t));
	const unsubscribeVariables = variables.subscribe((v) => (variable = v));
	const unsubscribeProcessedJobs = processedJ.subscribe((pj) => (processedJobs = pj));
	const unsubscribeJobList = jobList.subscribe((j) => (jobs = j));

	onDestroy(() => {
		unsubscribeTab();
		unsubscribeVariables();
		unsubscribeProcessedJobs();
		unsubscribeJobList();
	});

	onMount(() => {
		Chart.register(ChartDataLabels);
		const formattedData = processedJobs.map((item) => ({
			label: `Job ${item.id}`,
			data: item.track
		}));

		const labels = formattedData.map((item) => item.label);
		const data = {
			labels: labels,
			datasets: [
				{
					label: 'Disk Scheduling',
					data: formattedData.map((item) => item.data),
					fill: false,
					borderColor: 'rgb(127,120,221)',
					pointBackgroundColor: 'rgb(117,74,160)',
					tension: 0
				}
			]
		};

		const config = {
			type: 'line',
			data: data,
			options: {
				clip: false,
				responsive: true,
				interaction: {
					intersect: false,
					mode: 'index'
				},
				plugins: {
					legend: {
						display: false
					},
					datalabels: {
						// Configure the datalabels plugin
						color: 'rgb(117,74,160)',
						anchor: 'center',
						align: 'start',
						borderRadius: 5
					}
				},
				elements: {
					line: {
						borderWidth: 1
					}
				},
				scales: {
					y: {
						min: variable.starting,
						max: variable.ending,
						ticks: {
							stepSize: variable.steps,
							padding: 10,
						}
					},
					x: {
						ticks: {
							padding: 12,
						}
					}
				}
			}
		};

		var chart = new Chart(ctx, config);
	});

	for (let i = 0; i < processedJobs.length - 1; i++) {
		const currTrack = processedJobs[i].track;
		const nextTrack = processedJobs[(i + 1) % processedJobs.length].track;
		const abDiff = Math.abs(currTrack - nextTrack);
		thm += abDiff;
	}

	let st = ((variable.ending - variable.starting + 1) * variable.armMovement) / thm;
</script>

<div class="w-full h-fit grow flex flex-col justify-center items-center gap-4 xl:p-5 lg:p-0">
	<div class="w-full grow max-h-screen 2xl:px-64 md:px-0">
		<canvas id="test" bind:this={ctx} class="dark:bg-tertiary-300 rounded-lg" />
	</div>

	<div class="h-fit w-full py-5 2xl:px-64 md:px-0">
		<div
			class="w-full lg:p-5 flex justify-center items-center flex-wrap lg:gap-32 md:gap-2 md:p-0 mb-8"
		>
			<div class="font-semibold w-fit h-max p-1">
				Total Head Movement :
				<span class="font-normal text-slate-600 dark:text-slate-400"> {thm} </span>
			</div>

			<div class="font-semibold w-fit h-max p-1">
				Seek Time
				<span class="font-normal text-slate-600 dark:text-slate-400"> {st.toFixed(3)} μs </span>
			</div>
		</div>
		<button
			class="btn variant-soft-tertiary flex items-center justify-center max-w-fit"
			on:click={() => {
				tabs = 0;
				jobs = jobs;
				tab.update((prev) => (prev = 0));
				processedJ.update((prev) => (prev = []));
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
