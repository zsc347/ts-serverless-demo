import fetch from "node-fetch";

const baseUrl = `http://${process.env.AWS_LAMBDA_RUNTIME_API}/2020-01-01/extension`;

export async function register(): Promise<string> {
    const res = await fetch(`${baseUrl}/register`, {
        method: "post",
        body: JSON.stringify({
            events: ["INVOKE", "SHUTDOWN"]
        }),
        headers: {
            "Content-Type": "application/json",
            // The extension name must match the file name of the extension itself that's in /opt/extensions/
            "Lambda-Extension-Name": "logs-api-extension"
        }
    });

    if (!res.ok) {
        console.error("register failed", await res.text());
        throw new Error("reigster failed");
    }
    return res.headers.get("lambda-extension-identifier")!;
}

export async function next(extensionId: string) {
    const res = await fetch(`${baseUrl}/event/next`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Lambda-Extension-Identifier": extensionId
        }
    });
    if (!res.ok) {
        console.error("next failed", await res.text());
        return null;
    }
    return await res.json();
}
