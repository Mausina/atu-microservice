async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");
    const uploadBtn = document.getElementById("uploadBtn");

    if (!fileInput.files.length) {
        status.textContent = "Please select a file first.";
        status.className = "error";
        return;
    }

    const file = fileInput.files[0];

    uploadBtn.disabled = true;
    status.textContent = "Requesting upload URL...";
    status.className = "info";

    try {
        const res = await fetch("YOUR_API_ENDPOINT/upload-url");
        if (!res.ok) throw new Error("Failed to get upload URL");
        const data = await res.json();

        status.textContent = "Uploading to S3...";

        const uploadRes = await fetch(data.uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: file
        });

        if (!uploadRes.ok) throw new Error("Upload failed");

        status.textContent = `Uploaded successfully as ${data.fileName}`;
        status.className = "success";
        fileInput.value = "";
    } catch (err) {
        status.textContent = "Error: " + err.message;
        status.className = "error";
    } finally {
        uploadBtn.disabled = false;
    }
}
