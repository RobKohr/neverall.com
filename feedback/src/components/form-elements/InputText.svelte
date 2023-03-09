<script>
	export let label = '';
	export let placeholder = label;
	export let value = '';
	export let filledIn = false;
	export let error = '';
	// https://colorhunt.co/palette/f9ed69f08a5db83b5e6a2c70
</script>

<div class="container">
	<input
		class="input-textbox {filledIn || value ? 'filledIn' : 'not-filledIn'} {error && 'input-error'}"
		{...$$restProps}
		bind:value
		on:keyup={(e) => {
			if (value !== '') {
				filledIn = true;
			} else {
				filledIn = false;
			}
			error = 'saldfjsdljf';
		}}
	/>
	<span class="placeholder">
		{placeholder}
	</span>
	<div class="error">
		{error}
	</div>
</div>

<style lang="scss">
	.error {
		color: red;
	}
	.container {
		position: relative;
		margin: 17px 0 18px 0;
		padding-top: 10px;
	}
	.input-error.input-textbox {
		border: 1px solid red;
		color: red;
		background: #ffdddd;
	}
	.input-textbox {
		box-sizing: border-box;
		background-color: transparent;
		border: 1px solid #c2c2c2;
		border-radius: 4px;
		width: 278px;
		height: 50px;
		font-weight: 300;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0.4px;
		padding: 0 13px;
		&:active,
		&:focus,
		&.filledIn {
			background-color: white;
			outline: none;
			&::placeholder {
				display: none;
			}
		}
	}

	label,
	.input-textbox:focus ~ .placeholder,
	.input-textbox.filledIn ~ .placeholder {
		position: absolute;
		top: 0px;
		padding: 4px;
		box-sizing: border-box;
		background: white;
		left: 9px;
		font-weight: 400;
		font-size: 11px;
		line-height: 16px;
		height: 16px;
		letter-spacing: 0.2px;
		z-index: 2;
		color: green;
	}
	.input-textbox:focus ~ .placeholder.has-label,
	.input-textbox.filledIn ~ .placeholder.has-label {
		display: none;
	}
	.input-textbox:disabled {
		background-color: #f1f1f1;
		color: #c2c2c2;
	}
	.input-error.input-textbox ~ .placeholder {
		color: red;
	}
	.placeholder {
		color: blue;
		position: absolute;
		pointer-events: none;
		left: 15px;
		top: 24px;
		transition: 0.1s ease all;
		font-weight: 300;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0.4 px;
	}
</style>
