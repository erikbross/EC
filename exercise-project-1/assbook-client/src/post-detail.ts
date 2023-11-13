import { AuthService } from "./classes/auth-service";
import { PostsService } from "./classes/posts-service";

const service = new PostsService();
const authService = new AuthService();
const queryParams = new URLSearchParams(window.location.search);
const postIdString = queryParams.get("id");
const container = document.getElementById("cardContainer");
const logout = document.getElementById("logout") as HTMLElement;


const postService = new PostsService();
// Comprobación del Token
try{
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

if (!postIdString) {
    location.assign("index.html");
}
else {
    const postId: number = Number(postIdString);
    showPostDetails(postId);
}

async function showPostDetails(postId: number): Promise<void> {
    try {
        // Obtención del post
        const post = await service.get(postId);

        // Generación de la card en función de la obtención del post
        container!.append(postService.toHTML(post));
    }
    catch (e) {
        const error = e as { message?: string[] };
        const messageErros = error.message;
        messageErros?.forEach(e => {
            console.log(e);
        });
        location.assign("index.html");
    }
}