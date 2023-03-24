<script>
	import InputText from '../../components/form-elements/InputText.svelte';
	import { enhance } from '$app/forms';
	let formValues = {
		email: 'bolder',
		password: '',
		retypePassword: ''
	};
	let touchedFields = {};
	let errors = {};
	$: {
		errors = JSON.stringify(formValues);
	}
</script>

<div>
	{errors}
</div>
<form
	method="POST"
	use:enhance={({ form, data, action, cancel }) => {
		// `form` is the `<form>` element    // `data` is its `FormData` object    // `action` is the URL to which the form is posted    // `cancel()` will prevent the submission
		return async ({ result, update }) => {
			console.log('here', result, update);
			// `result` is an `ActionResult` object      // `update` is a function which triggers the logic that would be triggered if this callback wasn't set    };
		};
	}}
>
	<InputText
		label="Email"
		name="email"
		type="email"
		bind:value={formValues.email}
		bind:touchedFields
		bind:errors
	/>
	<InputText
		label="Passsword"
		name="password"
		type="password"
		bind:value={formValues.password}
		bind:touchedFields
		bind:errors
	/>
	<InputText
		label="Retype Passsword"
		name="retypePassword"
		type="password"
		bind:value={formValues.password}
		bind:touchedFields
		bind:errors
	/>

	<button>Log in</button>
</form>
