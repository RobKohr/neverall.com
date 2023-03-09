<script>
	import Lipsum from '../../components/Lipsum.svelte';
</script>

<div>
	<div class="votebox">
		<button>+1</button> (25034)
	</div>
	<h3>Some great thing I need done</h3>
	<div class="description">
		<Lipsum paragraphs={2} />
	</div>

	<div class="status">
		<label>In Development</label>
		<div class="description">
			<Lipsum paragraphs={1} />
		</div>
	</div>
	<div class="comments">
		<div class="comment-count small-link">499 comments</div>
		<div class="tags"><tag>some-tagable-thing</tag></div>
		<div class="flag">Flag</div>
	</div>
</div>
