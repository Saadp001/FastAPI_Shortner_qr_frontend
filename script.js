async function shortenURL() {
    const longUrl = document.getElementById("urlInput").value;

    if (!longUrl) {
        alert("Please enter a URL!");
        return;
    }

    const response = await fetch("https://fastapi-shortner-qr.onrender.com/shorten/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ long_url: longUrl })
    });

    if (!response.ok) {
        alert("Error shortening URL");
        return;
    }

    const data = await response.json();

    // Show section
    document.getElementById("result").classList.remove("hidden");

    // Set short URL link
    const shortLink = `https://fastapi-shortner-qr.onrender.com/${data.short_url}`;
    document.getElementById("shortUrl").textContent = shortLink;
    document.getElementById("shortUrl").href = shortLink;

    // Set QR Code image
    document.getElementById("qrImage").src =
        `https://fastapi-shortner-qr.onrender.com/qr/${data.short_url}.png`;
     
    // Show Download Button
    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.classList.remove("hidden");
    downloadBtn.onclick = downloadQR;
    
}


async function downloadQR() {
    const qrImgURL = document.getElementById("qrImage").src;

    // Fetch the image as a blob (fixes CORS issues)
    const response = await fetch(qrImgURL, { mode: "cors" });
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const blobURL = URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "qr_code.png";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    URL.revokeObjectURL(blobURL);
    link.remove();
}
