(function() {

    const exampleData = `Title	Download	Youtube
Destiny's FED UP With Red Pill	https://drive.google.com/file/d/1Pr8Xkyp0QSCyyKCyrLS5zSBjSHods7rO/view?usp=drive_link	uev-gx-Pvt8
Andrew Tate's a NET NEGATIVE	https://drive.google.com/file/d/1Pr8Xkyp0QSCyyKCyrLS5zSBjSHods7rO/view?usp=drive_link	odZa3Q65I_Y
Is Frictionless Society Really Better?	https://drive.google.com/file/d/1Pr8Xkyp0QSCyyKCyrLS5zSBjSHods7rO/view?usp=drive_link	nif4T_Y0-9c
Destiny Shreds Anti-Feminist That Shames Panelist	https://drive.google.com/file/d/1Pr8Xkyp0QSCyyKCyrLS5zSBjSHods7rO/view?usp=drive_link	w7LI9tYu61w`

    const publicSheetUrl="https://docs.google.com/spreadsheets/d/e/2PACX-1vR80u097YLBtsUGFuQhbKoGidr8GZSE95RXu99CR70Xw1QFX0tfsqa8IED5KIKPY10jIk_RpNOIxR_S/pub?gid=0&single=true&output=tsv";
    
    function tabToJson(tsv){
        console.log("in tabToJson");
        console.log(tsv);

        let lines=tsv.split("\n");
    
        let result = [];
    
        let headers=lines[0].split("\t");
        console.log(headers);
    
        for(let i=1;i<lines.length;i++){
            if (lines[i].length == 0) {
                continue;
            }
    
            let obj = {};
            let currentline=lines[i].split("\t");
    
            for(let j=0;j<headers.length;j++){
                console.log(headers[j] + ": " + currentline[j])
                obj[headers[j]] = currentline[j];
            }
    
            result.push(obj);
        }
    
        return result;
    }

    function populatePage(data) {
        console.log("RECEVIED DATA");
        console.log(data)
        console.log(data.body);
        let parsedData = tabToJson(data.body);

        let newHtml = "";
        parsedData.forEach((vid) => {
            newHtml += createVideoSnippet(vid)
        });
        document.querySelector("#clip_feed").innerHTML = newHtml;
        
    }

    function createVideoSnippet(vid) {
        return `<div class="clip"><div class="clip-frame">` + generateShortsEmbed(vid.Youtube) + `</div><div class="clip-title">` + vid.Title + `</div><div class="clip-dl"><a href="` + vid.Download + `" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg></a></div></div>` 
    }

    function generateShortsEmbed(videoCode) {
        return `<iframe width="315" height="560"
src="https://www.youtube.com/embed/` + videoCode + `"
title="YouTube video player"
frameborder="0"
allow="web-share"
align=center 
allowfullscreen></iframe>
`
    }

    function main() {
        const payload = {
            method: 'GET',
            headers: {
                'Content-Type': 'text/csv'
            }
        }
        fetch(publicSheetUrl).then(response => populatePage(response, payload));
        // populatePage(exampleData);

    }

    main();
})();