<script>
	import '../app.scss';
	import Navigation from './Navigation.svelte';
	export const prerender = false;
	export const ssr = false;
</script>

<header>
	<h1>My Great App</h1>
	<h3>User feedback Form</h3>
</header>
<div id="under-header">
	<Navigation />
	<div id="content">
		asdf
		<slot />
	</div>
</div>

<style type="sass">
	#under-header {
		display: flex;
		flex-direction: row-reverse;	
	}
	#content{
		background:red;
		flex-grow:1;
		padding:1em;
	}
</style>
