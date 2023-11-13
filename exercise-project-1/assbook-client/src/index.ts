import { AuthService } from "./classes/auth-service.js";
import { PostsService } from "./classes/posts-service.js";

const postService = new PostsService();
const authService = new AuthService();
const container = document.getElementById("postContainer") as HTMLDivElement;
const logout = document.getElementById("logout") as HTMLElement;

// Comprobación del Token
try{
    await authService.checkToken();
}
catch {
    location.assign("login.html");
}

// Evento para quitar el token del localStorage
logout?.addEventListener("click", () => {
    authService.logout();
});

showPosts();

// Función para mostrar todos los posts
function showPosts(): void {
    postService.getAll().then(posts => {
        posts.forEach(post => {
            container.append(postService.toHTML(post));
        });
    }).catch(error => {
        console.log(error);
    });
}