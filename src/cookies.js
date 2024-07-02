(function() {
    const cookieExportButton = document.getElementById('cookieExportButton');
    const cookieImportButton = document.getElementById('cookieImportButton');

    cookieExportButton.onclick = function(e) {
        e.preventDefault();
        exportCookies();
    };

    cookieImportButton.onchange = function(e) {
        e.preventDefault();
        importCookies(e);
    };

    function exportCookies() {
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;
            return acc;
        }, {});

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cookies));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "cookies.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    function importCookies(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const cookies = JSON.parse(event.target.result);
            for (const [name, value] of Object.entries(cookies)) {
                document.cookie = `${name}=${value}; path=/`;
            }
        };
        reader.readAsText(file);
    }
})();