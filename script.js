fetch("update.html", { method: "HEAD" })
    .then(res => {
        if (res.ok) {
            window.location.href = "update.html";
        }
    })
    .catch(() => {});
