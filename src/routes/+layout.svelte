<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<!-- <svelte:fragment slot="header">

		<div class="py-2 px-8 flex justify-end">
			
		</div>
	</svelte:fragment> -->
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<div class="p-2 flex justify-center items-center gap-8">
			<span class="text-slate-500 dark:text-slate-400 text-xs"
				>A Disk scheduling algorithm solver made by Ian Nicolas Antonio</span
			>
			<div class="place-self-end">
				<LightSwitch />
			</div>
		</div>
	</svelte:fragment>
	<!-- (footer) -->
</AppShell>
