import { AuthService } from "./classes/auth-service";
import { MyGeolocation } from "./classes/my-geolocation";
import { UserLogin } from "./interfaces/user";

const form = document.getElementById("form-login") as HTMLFormElement;
const errorText = document.getElementById("errorInfo") as HTMLElement;
const service = new AuthService();
const coords = await MyGeolocation.getLocation();

form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    try {
        const email: string = form.email.value;
        const password: string = form.password.value;
        const login: UserLogin = {
            email: email,
            password: password,
            lat: coords.latitude ?? 0,
            lng: coords.longitude ?? 0
        };

        await service.login(login);
        location.assign("index.html");
    }
    catch (e) {
        const error = e as { message?: string[] };
        const messageErros = error.message;
        messageErros?.forEach(e => {
            console.log(e);
        });
        errorText.textContent = "Error on login, email or password incorrect!";
        setTimeout(() => {
            errorText.textContent = "";
        }, 3000);
    }
});