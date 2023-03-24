import { fail } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();


        const email = data.get('email');
        const password = data.get('password');
        console.log({ email, password })
        if (!email) {
            return fail(400, { email, missing: true });
        }

        //const user = await db.getUser(email);

        //if (!user || user.password !== hash(password)) {
        if (password != '123') {
            return fail(400, { email, incorrect: true });
        }
    }
};