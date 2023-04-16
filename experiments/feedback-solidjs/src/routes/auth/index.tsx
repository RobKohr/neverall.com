import { createSignal } from "solid-js";

export default function Login() {
  const [form, setForm] = createSignal({
    email: '',
    password: '',
  })
  function formChange(e: any) {
    setForm({ ...form(), [e.target.name]: e.target.value })
    console.log(form())
    console.log(e.target.value)
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" value={form().email} onChange={formChange} />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" value={form().password} onChange={formChange} />
        </div>
      </form>
    </div>
  );
}
