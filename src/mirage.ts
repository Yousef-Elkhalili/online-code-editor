import { createServer } from "miragejs";

export function makeServer() {
  createServer({
    routes() {
      this.namespace = "/api";

      this.post("/execute", (_, request) => {
        const { language, code } = JSON.parse(request.requestBody);

        if (
          (language === "python" && code.includes("print")) ||
          (language === "go" && code.includes("fmt.Println"))
        ) {
          return { status: "success", output: "Hello, world!" };
        }
        return { status: "error", error: "SyntaxError: Unexpected token" };
      });
    },
  });
}
