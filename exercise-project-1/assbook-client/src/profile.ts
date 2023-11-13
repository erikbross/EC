// Services importeds
import { AuthService } from "./classes/auth-service";
import { UserService } from "./classes/user-service";
import { User } from "./interfaces/user";
import { MapService } from "./classes/map-service";
import { Coordinates } from "./interfaces/coordinates";

// Profile elements
const logout = document.getElementById("logout") as HTMLElement;
const avatar = document.getElementById("avatar") as HTMLImageElement;
const nameH4 = document.getElementById("name") as HTMLElement;
const emailH4 = document.getElementById("email") as HTMLElement;

// Interact elements
const changeAvatar = document.querySelector("label.btn.btn-sm.btn-danger") as HTMLLabelElement;
const editProfile = document.getElementById("editProfile") as HTMLButtonElement;
const editPassword = document.getElementById("editPassword") as HTMLButtonElement;

// Profile details - avatar file charge - divs forms for my profile - cancel's actions
const profileInfo = document.getElementById("profileInfo") as HTMLDivElement;

const avatarInput = document.getElementById("avatarInput") as HTMLInputElement;

const profileForm = document.getElementById("profileForm") as HTMLDivElement;
const passwordForm = document.getElementById("passwordForm") as HTMLDivElement;

const cancelEditProfile = document.getElementById("cancelEditProfile") as HTMLButtonElement;
const cancelEditPassword = document.getElementById("cancelEditPassword") as HTMLButtonElement;

// URL Params
const queryParams: URLSearchParams = new URLSearchParams(window.location.search);
const postIdString: number = Number(queryParams.get("id"));

// Services
const authService = new AuthService();
const userService = new UserService();

// Comprobación del Token
try {
    await authService.checkToken();
}
catch {
    location.assign("login.html");
}

// Evento para quitar el token del localStorage
logout?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    authService.logout();
});

let userPromise: Promise<User>;
if (postIdString) {
    userPromise = userService.getProfile(postIdString);
}
else {
    userPromise = userService.getProfile();
}

userPromise.then(async (user: User) => {
    avatar.src = user.avatar;
    nameH4.textContent = user.name;
    emailH4.textContent = user.email;
    const coords: Coordinates = {
        latitude: user.lat,
        longitude: user.lng
    };
    try {
        const mapsService = await MapService.createMapService(coords, "map");
        mapsService.createMarker(coords, "green");
    }
    catch (e) {
        console.log(e);
    }

    if (user.me) {
        avatarInput.addEventListener("change", (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            const reader = new FileReader();
            if (file) reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                const newAvatar = reader.result as string;
                userService.saveAvatar(newAvatar).then(() => {
                    avatar.src = newAvatar;
                }).catch((err) => {
                    console.log(err);
                });
            });
        });
        editProfile?.addEventListener("click", () => {
            profileForm.classList.remove("d-none");
            passwordForm.classList.add("d-none");
            const form1 = document.querySelector("div#profileForm form") as HTMLFormElement;
            form1.reset();
            profileInfo?.classList.toggle("d-none");
            cancelEditProfile.addEventListener("click", () => {
                profileForm.classList.add("d-none");
                profileInfo?.classList.remove("d-none");
            });
            form1.addEventListener("submit", (e) => {
                e.preventDefault();

                const name: string = (form1.name as unknown as HTMLInputElement).value;
                const email: string = form1.email.value;

                userService.saveProfile(name, email).then(() => {
                    nameH4.textContent = name;
                    emailH4.textContent = email;
                    profileForm.classList.add("d-none");
                    profileInfo?.classList.remove("d-none");
                }).catch((err) => {
                    console.log(err);
                });
            });
        });
        editPassword?.addEventListener("click", () => {
            passwordForm.classList.remove("d-none");
            profileForm.classList.add("d-none");
            const form2 = document.querySelector("div#passwordForm form") as HTMLFormElement;
            form2.reset();
            profileInfo?.classList.toggle("d-none");
            cancelEditPassword.addEventListener("click", () => {
                profileInfo?.classList.remove("d-none");
                passwordForm.classList.add("d-none");
            });
            form2.addEventListener("submit", async (e: Event) => {
                e.preventDefault();
                const pass1: string = form2.password.value;
                const pass2: string = form2.password2.value;
                if (pass1 === pass2) {
                    userService.savePassword(pass1).then(() => {
                        passwordForm.classList.add("d-none");
                        profileInfo?.classList.remove("d-none");
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            });
        });
    }
    else {
        changeAvatar?.classList.add("d-none");
        editProfile.classList.add("d-none");
        editPassword.classList.add("d-none");
    }
});