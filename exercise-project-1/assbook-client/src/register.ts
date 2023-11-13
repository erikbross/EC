import { AuthService } from "./classes/auth-service";
import { MyGeolocation } from "./classes/my-geolocation";
import { User } from "./interfaces/user";

const service = new AuthService();
const form = document.getElementById("form-register") as HTMLFormElement;
const imgPreview = document.getElementById("imgPreview") as HTMLImageElement;
const coords = await MyGeolocation.getLocation();
const errorText = document.getElementById("errorInfo") as HTMLElement;

form.lat.value = coords.latitude ?? 0;
form.lng.value = coords.longitude ?? 0;

form.avatar.addEventListener("change", (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    const reader = new FileReader();
    if (file) reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
        imgPreview!.src = reader.result as string;
        imgPreview.className = "img-thumbnail";
    });
});

form.addEventListener("submit", async (e: Event) => {
    try {
        e.preventDefault();

        const name: string = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email: string = form.email.value;
        const email2: string = form.email2.value;
        const password: string = form.password.value;
        const lat: number = coords.latitude ?? 0;
        const lng: number = coords.longitude ?? 0;
        const avatar: string = form.imgPreview.src;

        if (email === email2) {
            const newUser: User = {
                name: name,
                email: email,
                password: password,
                avatar: avatar,
                lat: lat,
                lng: lng
            };
            await service.register(newUser);
            location.assign("login.html");
        }
        else {
            errorText.textContent = "Error on form!";
            setTimeout(() => {
                errorText.textContent = "";
            }, 3000);
        }
    }
    catch (e) {
        const error = e as { message?: string[] };
        const messageErros = error.message;
        messageErros?.forEach(e => {
            console.log(e);
        });
    }
});
