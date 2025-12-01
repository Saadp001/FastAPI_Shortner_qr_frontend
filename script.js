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


function downloadQR() {
    const qrImg = document.getElementById("qrImage").src;
    
    const link = document.createElement("a");
    link.href = qrImg;
    link.download = "qr_code.png";
    link.click();
}
